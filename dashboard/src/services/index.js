import axios from 'axios'

import AuthService from './auth'
import { useRouter } from 'vue-router'
import { setGlobalLoading } from '@/stores/global.store'

const router = useRouter()

const API_ENVS = {
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

// para os errors não cair catch
httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false)
    return response
  },
  (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500

    if (canThrowAnError) {
      setGlobalLoading(false)
      throw new Error(error.message)
    }

    if (error.response.status === 401) {
      router.push({ name: 'home' })
    }

    setGlobalLoading(false)
    return error
  }
)

export default {
  auth: AuthService(httpClient)
}
