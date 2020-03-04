/** @jsx jsx */
import { jsx, Styled, Container, useColorMode } from 'theme-ui'
import { Link } from 'gatsby'

const Header = ({ siteImage }) => {
  const [colorMode, setColorMode] = useColorMode()
  setColorMode('deep')
  return (
    <header
      sx={{
        width: '100%',
        flexShrink: 0,
        padding: '30px 0 0 0',
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
            sx={{
              textDecoration: 'none',
              width: 50,
              height: 50,
            }}
          >
            <img src={siteImage} />
          </Styled.a>
        </nav>
      </Container>
    </header>
  )
}

export default Header
