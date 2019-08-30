/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import { Link, graphql } from 'gatsby'

const Header = ({ siteTitle }) => (
  <header
    sx={{
      width: '100%',
      flexShrink: 0,
      padding: '30px 0 0 0',
      bg: 'background',
    }}
  >
    <Container>
      <nav
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'primary',
        }}
      >
        <Styled.a
          as={Link}
          to="/"
          aria-label="go to homepage"
          activeClassName="active"
        >
          {siteTitle}
        </Styled.a>
      </nav>
    </Container>
  </header>
)

export default Header

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
