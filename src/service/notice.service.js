import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";


const hostUrl = getHostUrl()

//notice 게시글
export const noticeGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/notice`, paginationMeta)
  return await axios.get(url)
}

export const noticeGet = async (params) => {
  const url = getSearchUrl(`${hostUrl}/notice/${params}`)
  return await axios.get(url)
}

export const noticeRegist = async (params) => {
  return await axios.post(`${hostUrl}/notice`, params)
}

export const noticeUpdate = async (params) => {
  return await axios.patch(`${hostUrl}/notice`, params)
}

export const noticeDelete = async (params) => {
  return await axios.delete(`${hostUrl}/notice/${params}`)
}

//notice 댓글
export const commentRegist = async (params) => {
  return await axios.post(`${hostUrl}/notice/${params.noticeId}/comment`, params)
}

export const commentGet = async (params) => {
  return await axios.get(`${hostUrl}/notice/${params}/comment`)
}

