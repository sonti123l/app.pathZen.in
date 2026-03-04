import { $fetch } from '@/http/fetch'

export const authLogin = async (payload: {
  email: string
  password: string
}) => {
  try {
    const response = await $fetch.post(`/api/login`, payload)
    return response
  } catch (err: any) {
    return err
  }
}

export const authRegister = async (payload: {
  name: string
  email: string
  password: string
  rollNo: string
}) => {
  try {
    const response = await $fetch.post(`/api/register`, payload)
    return response
  } catch (err: any) {
    return err
  }
}
