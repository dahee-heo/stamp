import { Outlet } from 'react-router-dom';
import { styled } from '../config/stitches.config';

export const SectionStyled = styled("section", {
  padding: "45px 200px 0 80px",
  fontFamily: "$system",
  flex: "1",
  ".admin-section-wrap, .employee-section-wrap": {
    display: "flex",
    flexDirection: "column",
  },
  "h2": {
    fontSize: "$3",
    fontWeight: "$bold",
    marginBottom: "40px"
  },
  ".filter-wrap": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "label": {
      marginRight: "20px"
    },
  },
  "label.filter-label": {
    fontWeight: "$bold",
  },
  ".add-btn": {
    display: "flex",
    justifyContent: "flex-end",
  },
  "table": {
    marginTop: "20px",
  },
  ".date-reset": {
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: '700',
    color: '$gray500',
    cursor: 'pointer',
  },
  "@sm": { 
    width: "100%",
    padding: "36px 25px", 
    ".filter-wrap": {
      flexWrap: "wrap",
    },
    ".css-xumdn4, .css-1zts0j": {
      padding: "12px 15px",
    }
  },
})
