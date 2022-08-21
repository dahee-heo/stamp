import { atom } from "recoil";

export const initialAuthState = {
  _id: null,
  id: null,
  name: null,
  department: null,
  token: null,
  state: null,
  role: null,
}

export const authState = atom({
  key: 'authState',
  default: initialAuthState,
  // effects: [
  //   setToken
  // ]
})
