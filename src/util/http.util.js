import axios from "axios"

export const getHostUrl = () => {
  return `http://localhost:3000`
}

export const setInterceptor = (token) => {

  axios.interceptors.request.use(
    (config) => {
      if (!config?.headers) return config

      if (!token) {
        delete config.headers.Authorization
        return config
      }

      config.headers["Authorization"] = `Bearer ${token}`
      return config
    },
    (error) => Promise.reject(error)
  )

}