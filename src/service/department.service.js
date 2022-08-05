import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";


const hostUrl = getHostUrl()

export const departmentGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/department`, paginationMeta)
  return await axios.get(url)
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
