
import { getHostUrl } from "../util/http.util";
import axios from "axios";

const hostUrl = getHostUrl()

export const attendanceCreate = async (attendanceParams) => {
  return await axios.post(`${hostUrl}/attendance`, attendanceParams)
}
