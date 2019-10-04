/** @jsx jsx */
import { jsx, Styled, Container, useColorMode } from 'theme-ui'
import { Link, graphql } from 'gatsby'
import Button from './Button'

const themeModes = ['light', 'swiss', 'deep', 'funk', 'tosh']

const Header = ({ siteTitle }) => {
  const [mode, setMode] = useColorMode()

  const cycleMode = e => {
    const i = themeModes.indexOf(mode)
    const next = themeModes[(i + 1) % themeModes.length]
    setMode(next)
  }
  return (
    <header
      sx={{
        width: '100%',
        flexShrink: 0,
        padding: '30px 0 0 0',
        bg: 'secondary',
      }}
    >
      <Container>
        <nav
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Styled.a
            as={Link}
            to="/"
            aria-label="go to homepage"
            activeClassName="active"
            sx={{ color: 'white', textDecoration: 'none' }}
          >
            {siteTitle}
          </Styled.a>
          <Button
            sx={{
              ml: 2,
            }}
            onClick={cycleMode}
          >
            {mode}
          </Button>
        </nav>
      </Container>
    </header>
  )
}

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
