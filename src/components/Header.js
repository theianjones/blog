/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import { Link } from 'gatsby'
import Button from './Button'

const Header = ({ siteImage }) => {
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
              color: 'white',
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
