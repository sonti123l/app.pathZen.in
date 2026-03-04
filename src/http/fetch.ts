import Cookies from 'js-cookie'
import prepareURLEncodedParams from './prepareUrlEncodedParams'
import type { IAPIResponse } from './interfaces/app'

export const urlConstants = {
  default: import.meta.env.VITE_PUBLIC_API_URL,
}

let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

class FetchService {
  authStatusCodes: Array<number> = [401]
  authErrorURLs: Array<string> = [
    '/auth/signin-with-phone',
    '/auth/signin-with-email',
    '/auth/signup-or-signin-verify-in-phone',
    '/auth/signup-or-signin-verify-in-email',
  ]
  private activeRequests = new Map<string, AbortController>()

  private _fetchType: string
  private type: keyof typeof urlConstants

  private requestCounter = 0

  constructor(
    fetchTypeValue = 'json',
    url: keyof typeof urlConstants = 'default',
  ) {
    this._fetchType = fetchTypeValue
    this.type = url
  }

  configureAuthorization(config: any) {
    const accessToken = Cookies.get('token') || ''

    config.headers['Authorization'] = 'Bearer ' + accessToken
  }

  setHeader(config: any) {
    config.headers = {}
  }

  setDefaultHeaders(config: any) {
    config.headers = config.headers || {}
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
  }

  checkToLogOutOrNot(path: string) {
    return this.authErrorURLs.some((arrayUrl: string) =>
      path.includes(arrayUrl),
    )
  }

  isAuthRequest(path: string) {
    return this.authErrorURLs.includes(path)
  }

  private getRequestKey(
    path: string,
    method: string = 'GET',
    allowConcurrent: boolean = false,
  ): string {
    if (allowConcurrent) {
      return `${method}-${path}-${++this.requestCounter}`
    }
    return `${method}-${path}`
  }

  logoutToMainPage() {
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    Cookies.remove('userData')
    window.location.href = '/login'
  }

  async refreshAccessToken(): Promise<string | null> {
    if (isRefreshing && refreshPromise) {
      return refreshPromise
    }

    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken) {
      this.logoutToMainPage()
      return null
    }

    isRefreshing = true

    refreshPromise = (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/auth/refresh-token`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
          },
        )

        if (response.status === 401 || !response.ok) {
          this.logoutToMainPage()
          return null
        }

        const data = await response.json()

        const accessToken = data?.data?.access_token
        const newRefreshToken = data?.data?.refresh_token

        if (!accessToken || !newRefreshToken) {
          this.logoutToMainPage()
          return null
        }

        Cookies.set('token', accessToken, { expires: 30 })
        Cookies.set('refreshToken', newRefreshToken, { expires: 90 })

        return accessToken
      } catch (error) {
        this.logoutToMainPage()
        return null
      } finally {
        isRefreshing = false
        refreshPromise = null
      }
    })()

    return refreshPromise
  }

  async hit(...args: any): Promise<IAPIResponse> {
    const [path, config] = args

    const method = config.method || 'GET'
    const allowConcurrent =
      config.allowConcurrent ??
      (method === 'POST' || method === 'PUT' || method === 'PATCH')
    const requestKey = this.getRequestKey(path, method, allowConcurrent)

    if (!allowConcurrent) {
      const existingController = this.activeRequests.get(requestKey)
      if (existingController) {
        existingController.abort()
      }
    }

    const abortController = new AbortController()
    config.signal = abortController.signal
    this.activeRequests.set(requestKey, abortController)

    config.headers = config.headers || {}
    if (!config.headers['Content-Type']) {
      this.setDefaultHeaders(config)
    }

    if (!this.isAuthRequest(path)) {
      this.configureAuthorization(config)
    }

    const url = urlConstants[this.type] + path
    let response: any

    try {
      response = await fetch(url, config)

      if (
        !response.ok &&
        response.status === 401 &&
        !this.checkToLogOutOrNot(path)
      ) {
        let responseBody
        try {
          responseBody = await response.clone().json()
        } catch {
          responseBody = {}
        }

        if (responseBody?.name === 'GoogleOAuthReauthRequiredException') {
          this.activeRequests.delete(requestKey)
          setTimeout(() => {
            window.location.href = '/google-consent?permission=false'
          }, 5000)
          return {
            success: false,
            status: response.status,
            data: responseBody,
            message: response.statusText,
          }
        }

        const newToken = await this.refreshAccessToken()

        if (newToken) {
          config.headers['Authorization'] = 'Bearer ' + newToken
          response = await fetch(url, config)
        }
      }
    } catch (error: any) {
      this.activeRequests.delete(requestKey)

      if (error.name === 'AbortError') {
        return {
          success: false,
          status: 0,
          data: null,
          message: 'Request cancelled',
        }
      }
      throw {
        success: false,
        status: 0,
        data: null,
        message: error.message || 'Network error',
      }
    }

    this.activeRequests.delete(requestKey)

    if (!response.ok) {
      if (
        this.authStatusCodes.includes(response.status) &&
        !this.checkToLogOutOrNot(path)
      ) {
        const contentType = response.headers.get('Content-Type') || ''
        let errorData
        try {
          errorData = contentType.includes('text/html')
            ? await response.text()
            : await response.json()
        } catch {
          errorData = { message: response.statusText }
        }
        return {
          success: false,
          status: response.status,
          data: errorData,
          message: response.statusText,
        }
      }

      const contentType = response.headers.get('Content-Type') || ''
      let errorData
      try {
        errorData = contentType.includes('text/html')
          ? await response.text()
          : await response.json()
      } catch {
        errorData = { message: response.statusText }
      }
      const err: any = new Error(errorData.message || response.statusText)
      err.data = errorData
      err.status = response.status
      throw err
    }

    if (this._fetchType === 'response') {
      return response
    } else {
      const contentType = response.headers.get('Content-Type') || ''
      if (contentType.includes('text/html')) {
        return {
          success: true,
          status: response.status,
          data: await response.text(),
        }
      }
      return {
        success: true,
        status: response.status,
        data: await response.json(),
      }
    }
  }

  async post(url: string, payload?: any) {
    return await this.hit(url, {
      method: 'POST',
      body: payload ? JSON.stringify(payload) : undefined,
    })
  }

  async postFormData(url: string, file?: File) {
    return await this.hit(url, {
      method: 'POST',
      body: file,
    })
  }

  async get(url: string, queryParams = {}, contentType?: string) {
    if (Object.keys(queryParams).length) {
      url = prepareURLEncodedParams(url, queryParams)
    }
    const config: any = {
      method: 'GET',
      headers: {},
    }
    this.setDefaultHeaders(config)
    if (contentType) {
      config.headers['Content-Type'] = contentType
      config.headers['Accept'] = contentType
    }
    return this.hit(url, config)
  }

  async delete(url: string, payload = {}) {
    return this.hit(url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
    })
  }

  async deleteWithOutPayload(url: string) {
    return this.hit(url, {
      method: 'DELETE',
    })
  }

  async put(url: string, payload = {}) {
    return this.hit(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  async patch(url: string, payload = {}) {
    return this.hit(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
  }

  cancelAll() {
    this.activeRequests.forEach((controller) => controller.abort())
    this.activeRequests.clear()
  }
}

export const $fetch = new FetchService()
