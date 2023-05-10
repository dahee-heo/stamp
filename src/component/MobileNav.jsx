import React from 'react'
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FiHome, FiCheckSquare, FiUsers, FiMessageSquare, FiX } from "react-icons/fi";
import { MdWorkspacesOutline } from "react-icons/md";
import { styled } from '../config/stitches.config';

const MobileNavStyled = styled("nav", {
  position: "fixed",
  zIndex: "999",
  backgroundColor: "$white",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  borderRight: "1px solid #e6e6e6",
  fontSize: "16px",
  fontWeight: "500",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "40px",
  "li": { 
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    color: "$gray400",
    "&:hover": {
      color: "$gray500",
      fontWeight: "800",
    },
    "&.active": {
      color: "$primary",
      fontWeight: "800",
    }
  },
  ".close-btn": {
    display: "flex",
    justifyContent: "end",
    width: "100%",
    "svg": { 
      margin: 0, 
      width: "20px",
      height: "20px"
    }
  },
  "svg": { marginRight: "12px" },
  "@md": { 
    padding: "24px 24px",
    // minWidth: "180px" 
  },
  // "@sm": { display: "none" },
})

export const MobileNav = ({ setMobileNavOpen, pathname }) => {
  const navigate = useNavigate();
  const menuClick = (nav) => {
    navigate(`/admin/${nav}`)
    setMobileNavOpen(false)
  }
  const activeClass = (path) => {
    if(pathname === `/admin/${path}`) {
      return "active"
    } else { 
      return ""
    }
  }
  return (
    <MobileNavStyled>
      <div className='close-btn' onClick={() => setMobileNavOpen(false)}><FiX/></div>
      <ul>
        {/* <li 
          className={activeClass('home')}
          onClick={()=>{menuClick('home')}}
        ><FiHome/>홈</li> */}
        <li 
          className={activeClass('attendance')}
          onClick={()=>{menuClick('attendance')}}
        ><FiCheckSquare/>직원출결현황</li>
        <li 
          className={activeClass('employee')}
          onClick={()=>{menuClick('employee')}}
        ><FiUsers/>직원관리</li>
        <li 
          className={activeClass('department')}
          onClick={()=>{menuClick('department')}}
        ><FiUsers/>직원관리</li>
        <li 
          className={activeClass('notice')}
          onClick={()=>{menuClick('notice')}}
        ><FiMessageSquare/>공지사항</li>
      </ul>
      {/* <NavLink to="/admin/home" onClick={() => setMobileNavOpen(false)}><FiHome/>홈</NavLink>
      <NavLink to="/admin/attendance"><FiCheckSquare/>직원출결현황</NavLink>
      <NavLink to="/admin/employee"><FiUsers/>직원관리</NavLink>
      <NavLink to="/admin/department"><MdWorkspacesOutline/> 부서관리</NavLink>
      <NavLink to="/admin/notice"><FiMessageSquare/>공지사항</NavLink> */}
    </MobileNavStyled>
  )
}
