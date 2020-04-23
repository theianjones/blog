/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import SEO from './seo'
import Header from './header'

export default ({ children, post }) => (
  <Styled.root
    sx={{
      header: {
        paddingX: 0,
        marginX: 0,
      },
    }}
  >
    <SEO metaData={post} isBlogPost />
    <Header title={post.title} />
    <article>{children}</article>
  </Styled.root>
)
