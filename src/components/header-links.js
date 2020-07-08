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
      <ThemeLink sx={{ variant: 'styles.navlink' }} as={Link} to={'/blog'}>
        Articles
      </ThemeLink>
    </nav>
  )
}
