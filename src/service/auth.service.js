import { getHostUrl } from "../util/http.util";
import axios from "axios";

const hostUrl = getHostUrl()

export const authLogin = async (loginParams) => {
  return await axios.post(`${hostUrl}/auth/login`, loginParams)
}

export const authRegist = async (resgistParams) => {
  return await axios.post(`${hostUrl}/auth/sign-up`, resgistParams)
}

export const userRegist = async (userParams) => {
  return await axios.post(`${hostUrl}/auth/user-regist`, userParams)
}

export const departmentRegist = async (departmentRegistParams) => {
  return await axios.post(`${hostUrl}/department`, departmentRegistParams)
}

export const departmentUpdate = async (departmentUpdateParams) => {
  return await axios.put(`${hostUrl}/department`, departmentUpdateParams)
}

export const departmentDelete = async (departmentDeleteId) => {
  return await axios.delete(`${hostUrl}/department/${departmentDeleteId}`)
}
