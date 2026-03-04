import { $fetch } from '@/http/fetch'

export const authLogin = async (payload: {email: string, password: string}) => {
  try {
    const response = await $fetch.post(`/auth/login`, payload)
    return response
  } catch (err) {
    return err;
  }
}
