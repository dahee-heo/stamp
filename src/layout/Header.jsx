import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useRecoilState } from 'recoil';
import { authState, initialAuthState } from '../atom/auth.atom';
import { useLocation, useNavigate } from 'react-router-dom';
import { authLogout } from '../service/auth.service';
import { styled } from '../config/stitches.config';

const HeaderStyled = styled("header", {
  width: "100%",
  height: "68px",
  backgroundColor: "$primary",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px",
  color: "white",
  
  ".title" : {
    display: "flex",
    alignItems: "center",
    "h1": { 
      fontSize: "20px",
      fontWeight: "800",
    },
    "p": { fontWeight: "400", marginLeft: "8px", }
  },
  "ul": {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "li": { 
      fontSize: "14px",
      fontWeight: "500",
      "&:first-child::after": {
        content: "",
        borderRight: "1px solid white",
        margin: "0 8px",
        display: "inline-block",
        height: "10px",
      },
      "svg": { marginLeft: "12px", }
    }
  }
})

export const Header = () => {
  const nav = useNavigate()
  const location = useLocation();

  const [auth, setAuth] = useRecoilState(authState)
  const logout = async function () {
    await authLogout()
    setAuth(initialAuthState)
    nav('/')
  }

  return (
    <HeaderStyled>
      <div className='title'>
        <h1>Stamp</h1>
        {location.pathname.includes("/admin") && <p>관리자페이지</p>}
      </div>
      <div>
        <ul>
          <li>{auth?.name}</li>
          <li></li>
          <li onClick={logout}><FiLogOut/></li>
        </ul>
      </div>
    </HeaderStyled>
  )
}
