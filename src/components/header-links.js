/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
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

  return <nav></nav>
}
