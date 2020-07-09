import prism from '@theme-ui/prism/presets/theme-ui'

export default {
  useCustomProperties: true,
  sizes: {
    container: 864,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Source Serif Pro", serif',
    heading: 'Open Sans, "Avenir Next", Helvetica, Arial, sans-serif',
    monospace: 'Lato, sans-serif',
  },
  fontSizes: [9.22, 11.52, 14.4, 18.0, 22.5, 28.13, 35.16, 43.95, 54.93],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.7,
    heading: 1.14,
  },
  colors: {
    text: '#233044',
    background: '#fff',
    primary: '#7B14D1',
    secondary: '#C320D6',
    muted: '#f5f2ed',
    darkGray: '#545977',
    gray: '#777C9B',
    lightGray: '#C5C9DB',
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6, 7],
      letterSpacing: '-0.04em',
      mt: 3,
    },
  },
  styles: {
    header: {
      maxWidth: 'container',
      mb: [4, 5, 6],
    },
    postlist: {
      listStyleType: 'none',
      m: 0,
      p: 0,
    },
    postlink: {
      textDecoration: 'none',
      color: 'text',
    },
    postlistitem: {
      padding: '.5rem',
      margin: '0 -0.5rem',
      borderRadius: 5,
      ':hover': {
        backgroundColor: 'muted',
      },
    },
    navlink: {
      color: 'darkGray',
      textDecoration: 'none',
      fontWeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: '0.5px',
      '&:hover': {
        color: 'primary',
        textDecorationColor: '#000',
      },
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontSize: [3, 3, 4],
      padding: [10, 10, 10, 0],
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      maxWidth: 'container',
      margin: 'auto',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 8,
    },
    h2: {
      color: 'text',
      fontFamily: 'body',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 7,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 6,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 4,
    },
    a: {
      color: 'primary',
      fontFamily: 'body',
      textDecorationColor: '#c0bfc0',
      '&:hover': {
        color: 'text',
        textDecorationColor: '#000',
      },
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 3,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      ...prism,
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid',
      },
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px',
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px',
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted',
    },
  },
  images: {
    tiny: {
      width: 25,
      height: 25,
      borderRadius: 99999,
    },
  },
}
