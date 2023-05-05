import React from 'react';
import './header.component.scss'
import { FiLogOut } from "react-icons/fi";
import { useRecoilState } from 'recoil';
import { authState, initialAuthState } from '../atom/auth.atom';
import { useLocation, useNavigate } from 'react-router-dom';
import { authLogout } from '../service/auth.service';

export const HeaderComponent = () => {
  const nav = useNavigate()
  const location = useLocation();

  const [auth, setAuth] = useRecoilState(authState)
  const logout = async function () {
    await authLogout()
    setAuth(initialAuthState)
    nav('/')
  }

  return (
    <header>
      <div className='title'>
        <h1>Stamp</h1>
        {location.pathname.includes("/admin") && <p>관리자페이지</p>}
      </div>
      <div>
        <ul>
          <li>hong</li>
          <li>경영지원팀</li>
          <li onClick={logout}><FiLogOut/></li>
        </ul>
      </div>
    </header>
  )
}
