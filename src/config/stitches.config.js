import { createStitches, globalCss } from '@stitches/react';

export const { 
  styled, 
  getCssText, 
  css 
} = createStitches({
  theme: {
    fonts: {
      system: "Pretendard Variable, Pretendard, apple-system, sans-serif",
    },
    colors: {
      gray100: "#f5f5f5",
      gray200: "#eeeeee",
      gray300: "#e0e0e0",
      gray400: "#bdbdbd",
      gray500: "#9e9e9e",
      gray900: "#212121",
      backgroundGray: "#f8f8f8",
      primary: "#0987A0",
      primaryDarker: "#00788F",
      black: "#181818",
      white: "#ffffff",
      tableBorder: "#edf2f7",
    },
    fontSizes: {
      1: "36px",
      2: "30px",
      3: "24px",
      4: "20px",
      5: "18px",
      6: "16px",
      7: "14px",
      8: "12px",
    },
    fontWeights: {
      light: "300",
      normal: "500",
      bold: "700",
      black: "900",
    },
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  media: {
    xs: "(max-width: 320px)",
    sm: "(max-width: 640px)",
    md: "(max-width: 768px)",
    lg: "(max-width: 1024px)",
  },
});

export const globalStyles = globalCss({
  "*, *::before, *::after": { boxSizing: "border-box" },
  "body": {
    backgroundColor: "#ffffff",
  },
  "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
    margin: 0,
  },
  "ul[role='list'], ol[role='list']": { listStyle: "none" },
  "ul": {margin: "0px", padding: "0px"},
  "html:focus-within": { scrollBehavior: "smooth" },
  body: {
    fontFamily: "Inter",
    minHeight: "100vh",
    textRendering: "optimizeSpeed",
    lineHeight: 1.5,
  },
  "a:not([class])": { textDecorationSkipInk: "auto" },
  "img,picture": { maxWidth: "100%", display: "block" },
  "input,button,textarea,select": { font: "inherit" },
  "@media (prefers-reduced-motion: reduce)": {
    "html:focus-within": { scrollBehavior: "auto" },
    "*, *::before, *::after": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
      scrollBehavior: "auto !important",
    },
  },
});