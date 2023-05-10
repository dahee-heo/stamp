import { styled } from '../config/stitches.config';

export const DetailPageStyled = styled("div", {
  ".title-wrap": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid $gray500",
    borderBottom: "1px solid $gray300",
    padding: "8px",
  },
  "h3.title": {
    fontSize: "$4",
    fontWeight: "$bold",
  },
  ".content": {
    padding: "20px 0",
    borderBottom: "1px solid $gray300",
  },
  ".comment": {
    padding: "20px 0",
    "p": { fontSize: "$7", marginBottom: "10px" },
    ".comment-length": { fontWeight: "$bold", color: "$primary" }
  },
  ".comment-submit-btn":{
    marginTop: "8px",
    width: "100%",
    marginBottom: "40px",
  },
  ".comment-list": {
    marginTop: "20px",
    borderTop: "1px solid $gray300",
  },
  ".comment-list-wrap": {
    display: "flex",
    flexDirection: "column",
    margin: "8px 0",
    borderBottom: "1px solid $gray300",
  },
  ".comment-edit-wrap": {
    marginBottom: "8px"
  },
  ".comment-list-info": {
    display: "flex",
    margin: "8px 0",
    alignItems: "center"
  },
  ".comment-list-content": {
    display: "flex",
    margin: "8px 0",
    alignItems: "flex-start",
    justifyContent: "space-between",
    "p": {
      width: "80%"
    }
  },
  ".write-date": {
    fontSize: "$8",
    marginLeft: "10px",
    color: "$gray500"
  },
  "input": {
    height: "50px",
    marginBottom: "4px"
  }
})
