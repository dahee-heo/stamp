import axios from "axios"
import * as qs from 'qs'

export const getHostUrl = () => {
  return `http://localhost:3000`
}

export const getSearchUrl = (reqUrl, paginationMeta) => {
  const qsString = qs.stringify(paginationMeta)
  if (qsString.length) reqUrl += '?' + qsString
  return reqUrl
}

export const setInterceptor = (token) => {

  // axios.interceptors.request.use(
  //   (config) => {
  //     if (!config?.headers) return config

  //     if (!token) {
  //       delete config.headers.Authorization
  //       return config
  //     }

  //     config.headers["Authorization"] = `Bearer ${token}`
  //     return config
  //   },
  //   (error) => Promise.reject(error)
  // )

  if (!token) return false
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  return true

}