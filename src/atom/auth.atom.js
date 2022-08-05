import { atom } from "recoil";
import { setInterceptor } from "../util/http.util";

export const initialAuthState = {
  _id: null,
  id: null,
  name: null,
  department: null,
  token: null,
  state: null,
}

// const setToken = ({ onSet }) => {
//   onSet((userInfo) => {
//     console.log('userInfo: ', userInfo);
//     setInterceptor(userInfo?.token)
//   })
// }

export const authState = atom({
  key: 'authState',
  default: initialAuthState,
  // effects: [
  //   setToken
  // ]
})
