import axios from "axios"
import { getHostUrl, getSearchUrl } from "../util/http.util"

const hostUrl = getHostUrl()

export const userGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/users`, paginationMeta)
  return await axios.get(url)
}