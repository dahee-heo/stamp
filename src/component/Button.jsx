import { styled } from '../config/stitches.config';

export const Button = styled("button", {

  // reset
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // base styles
  display: "flex",
  border: "none",
  borderRadius: "5px",
  color: "$white",
  cursor: "pointer",
  backgroundColor: "none",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",

  "& svg": {
    width: "25px",
    height: "25px",
    marginLeft: "10px",
  },

  variants: {
    size: {
      md: {
        fontSize: "16px",
        padding: "6px 12px",
      },
      sm: {
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "4px"
      }
    },
    color: {
      primary: {
        backgroundColor: "$primary",
        "&:hover": {
          backgroundColor: "$primaryDarker",
        },
      },
      outline: {
        border: "1px solid $gray400",
        color: "$gray500",
        "&:hover": {
          backgroundColor: "$white",
          border: "1px solid $gray900",
          color: "$gray900",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        border: "none",
        color: "$primary",
        "&:hover": {
          backgroundColor: "$white",
        },
      },
    },
  },
});