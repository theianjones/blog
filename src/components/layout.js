/** @jsx jsx */
import { Styled, jsx, Box } from 'theme-ui'
import { Helmet } from 'react-helmet'
import Header from './header'

export default ({ children, title }) => (
  <Styled.root>
    <Helmet title={title} />
    <Header title={title} />
    <Box>{children}</Box>
  </Styled.root>
)
