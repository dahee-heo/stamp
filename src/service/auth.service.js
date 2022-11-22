import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";

const hostUrl = getHostUrl()

export const authLogin = async (loginParams) => {
  return await axios.post(`${hostUrl}/auth/login`, loginParams)
}

export const authLogout = async () => {
  return await axios.get(`${hostUrl}/auth/logout`)
}

export const authRegist = async (resgistParams) => {
  return await axios.post(`${hostUrl}/auth/sign-up`, resgistParams)
}

export const userRegist = async (userParams) => {
  return await axios.post(`${hostUrl}/auth/user-regist`, userParams)
}
export const userGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/auth/user-list`, paginationMeta)
  return await axios.get(url)
}

export const userUpdate = async (userUpdateParams) => {
  return await axios.put(`${hostUrl}/auth/user-update`, userUpdateParams)
}

export const myInfoIdUpdate = async (myInfoUpdateParams) => {
  return await axios.put(`${hostUrl}/auth/myinfo-id-update`, myInfoUpdateParams)
}
export const myInfoPwUpdate = async (myInfoUpdateParams) => {
  return await axios.put(`${hostUrl}/auth/myinfo-pw-update`, myInfoUpdateParams)
}

export const employeeDelete = async (employeeDeleteParams) => {
  return await axios.delete(`${hostUrl}/auth/${employeeDeleteParams}`)
}

export const sessionVerify = async () => {
  return await axios.get(`${hostUrl}/auth/session-verify`)
}