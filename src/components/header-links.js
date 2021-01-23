/** @jsx jsx */
import {jsx, Link as ThemeLink} from 'theme-ui'
import {Link} from 'gatsby'

export default () => {
  if (typeof window == 'undefined') {
    return null
  }

  return (
    <nav
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ThemeLink
        sx={{
          variant: 'styles.navlink',
          marginRight: 20,
          fontSize: 3,
          fontWeight: 'body',
          transition: 'all 400ms ease',
          ':hover': {
            color: 'primary',
          },
        }}
        as={Link}
        to={'/lessons'}
      >
        Courses
      </ThemeLink>
      <ThemeLink
        sx={{
          variant: 'styles.navlink',
          fontSize: 3,
          marginRight: 20,
          fontWeight: 'body',
          transition: 'all 400ms ease',
          ':hover': {
            color: 'primary',
          },
        }}
        as={Link}
        to={'/articles'}
      >
        Articles
      </ThemeLink>
      <ThemeLink
        sx={{
          variant: 'styles.navlink',
          fontSize: 3,
          fontWeight: 'body',
          transition: 'all 400ms ease',
          ':hover': {
            color: 'primary',
          },
        }}
        as={Link}
        to={'/about-me'}
      >
        About Me
      </ThemeLink>
    </nav>
  )
}
