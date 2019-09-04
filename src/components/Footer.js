/** @jsx jsx */
import SubscribeForm from './Forms/Subscribe'
import { Twitter, GitHub } from './Social'
import { jsx, Container } from 'theme-ui'

const Footer = ({ author, noSubscribeForm }) => (
  <footer>
    <Container
      sx={{
        paddingTop: 0,
      }}
    >
      {!noSubscribeForm && (
        <div>
          <SubscribeForm />
          <br />
          <br />
        </div>
      )}
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          sx={{
            fontSize: '90%',
            opacity: 0.7,
          }}
        >
          {author && `${author} \u00A9 ${new Date().getFullYear()}`}
        </div>
        <div>
          <Twitter />
          <GitHub />
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
