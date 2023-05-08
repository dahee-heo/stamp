import { Outlet } from 'react-router-dom';
import { styled } from '../config/stitches.config';

const SectionStyled = styled("section", {
  padding: "45px 80px 0",
  fontFamily: "$system",
  flex: "1",
  ".admin-section-wrap": {
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
    "label": {
      marginRight: "20px"
    },
  },
  "label": {
    fontWeight: "$bold",
  },
  ".add-btn": {
    display: "flex",
    justifyContent: "flex-end",
  },
  "table": {
    marginTop: "20px",
  },
  "@sm": { 
    padding: "45px 40px" 
  },
})

export const Section = () => {
  return (
    <SectionStyled>
      <Outlet></Outlet>
    </SectionStyled>
  )
}