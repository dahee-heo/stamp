import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom'
import { FiHome, FiCheckSquare, FiUsers, FiMessageSquare } from "react-icons/fi";
import { MdWorkspacesOutline } from "react-icons/md";
import { styled } from '../config/stitches.config';

const NavStyled = styled("nav", {
  minWidth: "260px",
  minHeight: "100vh",
  overflow: "hidden",
  borderRight: "1px solid #e6e6e6",
  fontSize: "16px",
  fontWeight: "500",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingTop: "40px",
  paddingLeft: "40px",
  "a": { 
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    color: "$gray400",
    "&.active": {
      color: "$primary",
      fontWeight: "800",
    }
  },
  "svg": { marginRight: "12px" },
  "@md": { paddingLeft: "24px", minWidth: "180px" },
  "@sm": { display: "none" },
})

export const Nav = () => {
  return (
    <NavStyled>
      <NavLink to="/admin/home"><FiHome/>홈</NavLink>
      <NavLink to="/admin/attendance"><FiCheckSquare/>직원출결현황</NavLink>
      <NavLink to="/admin/employee"><FiUsers/>직원관리</NavLink>
      <NavLink to="/admin/department"><MdWorkspacesOutline/> 부서관리</NavLink>
      <NavLink to="/admin/notice"><FiMessageSquare/>공지사항</NavLink>
    </NavStyled>
  )
}
