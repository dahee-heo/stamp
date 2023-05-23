import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";


const hostUrl = getHostUrl()

export const postImg = async (paginationMeta) => {
  const url = `${hostUrl}/img/formData`
  return await axios.post(url)
}