import { getHostUrl, getSearchUrl } from "../util/http.util";
import axios from "axios";

const hostUrl = getHostUrl()


export const adminAttendanceGetList = async (paginationMeta) => {
  const url = getSearchUrl(`${hostUrl}/admin-attendance`, paginationMeta)
  return await axios.get(url)
}
