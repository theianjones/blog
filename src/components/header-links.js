/** @jsx jsx */
import { jsx, Link as ThemeLink } from 'theme-ui'
import { Link } from 'gatsby'

export default () => {
  if (typeof window == 'undefined') {
    return null
  }

  return (
    <nav>
      <ThemeLink
        sx={{
          variant: 'styles.navlink',
          color: location.pathname === '/articles' ? 'primary' : 'darkGray',
        }}
        as={location.pathname === '/articles' ? 'div' : Link}
        to={'/articles'}
      >
        Articles
      </ThemeLink>
    </nav>
  )
}
