/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import Header from './header'
import SEO from './seo'
export default ({ children, title, displayTitle, excerpt, isBlogPost }) => {
  return (
    <Styled.root>
      <SEO metaData={{ title, excerpt, isBlogPost }} />
      <Header title={title} />
      {displayTitle && <Styled.h1 sx={{ color: 'text' }}>{title}</Styled.h1>}
      {children}
    </Styled.root>
  )
}
