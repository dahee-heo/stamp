import { getHostUrl } from "../util/http.util";
import axios from "axios";

const hostUrl = getHostUrl()

export const departmentRegist = async (departmentRegistParams) => {
  return await axios.post(`${hostUrl}/department`, departmentRegistParams)
}

export const departmentUpdate = async (departmentUpdateParams) => {
  return await axios.put(`${hostUrl}/department`, departmentUpdateParams)
}

export const departmentDelete = async (departmentDeleteId) => {
  return await axios.delete(`${hostUrl}/department/${departmentDeleteId}`)
}
