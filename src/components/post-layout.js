/** @jsx jsx */
import { Styled, jsx, Box } from 'theme-ui'
import { Helmet } from 'react-helmet'
import Header from './header'

export default ({ children, title }) => (
  <Styled.root
    sx={{
      header: {
        paddingX: 0,
        marginX: 0,
      },
    }}
  >
    <Helmet title={title} />
    <Header title={title} />
    <article>{children}</article>
  </Styled.root>
)
