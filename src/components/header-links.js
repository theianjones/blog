/** @jsx jsx */
import { jsx, Styled, Link as ThemeLink } from 'theme-ui'
import { Link, useStaticQuery, graphql } from 'gatsby'

export default ({ title }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
