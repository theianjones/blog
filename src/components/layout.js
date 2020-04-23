/** @jsx jsx */
import { Styled, jsx, Box } from 'theme-ui'
import Header from './header'
import SEO from './seo'

export default ({ children, title }) => (
  <Styled.root>
    <SEO metaData={{ title }} />
    <Header title={title} />
    <Box>{children}</Box>
  </Styled.root>
)
