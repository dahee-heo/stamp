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


export const userUpdate = async (userUpdateParams) => {
  return await axios.patch(`${hostUrl}/auth/user-update`, userUpdateParams)
}

export const myInfoIdUpdate = async (params) => {
  return await axios.put(`${hostUrl}/auth/myinfo-id-update`, params)
}
export const myInfoPwUpdate = async (params) => {
  return await axios.put(`${hostUrl}/auth/myinfo-pw-update`, params)
}

export const employeeDelete = async (params) => {
  return await axios.delete(`${hostUrl}/auth/${params}`)
}

export const sessionVerify = async () => {
  return await axios.get(`${hostUrl}/auth/session-verify`)
}