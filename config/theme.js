import { darken, lighten } from 'polished'
import { fonts } from '../src/lib/typography'
import { themeColor, backgroundColor } from './website'
const brand = {
  primary: themeColor,
  secondary: backgroundColor,
}

const colors = {
  primary_light: `${lighten(0.55, brand.primary)}`,
  primary_dark: `${darken(0.55, brand.primary)}`,
  gray: '#D3D3D3',
  black: '#000',
  white: '#fff',
  bg_color: '#fafafa',
  body_color: 'rgba(0,0,0,0.85)',
  link_color: brand.primary,
  link_color_hover: `${darken(0.07, brand.primary)}`,
  red: '#E86C60',
  green: '#29B573',
}

const theme = {
  colors,
  fonts,
  brand,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '2rem',
    vertical: '3rem',
  },
  transition: {
    ease: 'all 150ms ease',
  },
}

export default theme