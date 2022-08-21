import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";

const hostUrl = getHostUrl()

export const attendanceCreate = async (attendanceParams) => {
  return await axios.post(`${hostUrl}/attendance`, attendanceParams)
}

export const attendanceGetList = async (paginationMeta) => {
  // return await axios.get(`${hostUrl}/attendance`, paginationMeta)
  const url = getSearchUrl(`${hostUrl}/attendance`, paginationMeta)
  return await axios.get(url)
}

export const attendanceRead = async (attendanceReadParams) => {
  return await axios.get(`${hostUrl}/attendance/state`, attendanceReadParams)
}