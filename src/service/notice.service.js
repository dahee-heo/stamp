import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";


const hostUrl = getHostUrl()

//notice 게시글
export const noticeGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/notice`, paginationMeta)
  return await axios.get(url)
}

export const noticeGet = async (noticeGetParams) => {
  const url = getSearchUrl(`${hostUrl}/notice/${noticeGetParams}`)
  return await axios.get(url)
}

export const noticeRegist = async (noticeRegistParams) => {
  return await axios.post(`${hostUrl}/notice`, noticeRegistParams)
}

export const noticeUpdate = async (noticeUpdateParams) => {
  return await axios.put(`${hostUrl}/notice`, noticeUpdateParams)
}

export const noticeDelete = async (noticeDeleteId) => {
  return await axios.delete(`${hostUrl}/notice/${noticeDeleteId}`)
}

//notice 댓글
export const commentRegist = async (noticeCommentRegistParams) => {
  return await axios.post(`${hostUrl}/notice/${noticeCommentRegistParams.noticeId}/comment`, noticeCommentRegistParams)
}

export const commentGet = async (noticeCommentGetParams) => {
  return await axios.get(`${hostUrl}/notice/${noticeCommentGetParams}/comment`)
}