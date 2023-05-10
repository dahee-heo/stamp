import { styled } from '../config/stitches.config';

export const RegistEditPageStyled = styled("div", {
  width: "99%",
  maxWidth: "800px",
  ".ck.ck-editor": {
    margin: "10px 0"
  },
  ".ck.ck-editor__editable:not(.ck-editor__nested-editable)": {
    minHeight: "500px",
    width: "100%",
  }
})
