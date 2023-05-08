import { styled } from '../config/stitches.config';

export const Container = styled("div", {
  // Reset
  boxSizing: 'border-box',
  flexShrink: 0,
  margin: "0 auto",
  
  variants: {
    size: {
      xm: {
        maxWidth: '$xm',
      },
      sm: {
        maxWidth: '$sm',
      },
      md: {
        maxWidth: '$md',
      },
      lg: {
        maxWidth: '$lg',
      },
      default: {
        maxWidth: 'none',
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
})