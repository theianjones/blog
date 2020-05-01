/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
export default (props) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <button
      sx={{
        appearance: 'none',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        fontWeight: 'bold',
        color: 'text',
        backgroundColor: 'background',
        m: 0,
        px: 3,
        py: 2,
        border: 0,
        borderRadius: 4,
        variant: 'buttons.primary',
      }}
      onClick={(e) => {
        setColorMode(colorMode === 'default' ? 'light' : 'default')
      }}
    >
      Toggle {colorMode === 'default' ? 'Light' : 'Dark'}
    </button>
  )
}
