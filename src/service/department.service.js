import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";


const hostUrl = getHostUrl()

export const departmentGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/department`, paginationMeta)
  return await axios.get(url)
}

export const departmentRegist = async (params) => {
  return await axios.post(`${hostUrl}/department`, params)
}

export const departmentUpdate = async (params) => {
  return await axios.put(`${hostUrl}/department`, params)
}

export const departmentDelete = async (params) => {
  return await axios.delete(`${hostUrl}/department/${params}`)
}
