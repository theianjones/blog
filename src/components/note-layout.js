/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import Header from './header'
import Breadcrumbs from './breadcrumbs'
import SEO from './seo'
import { useBreadcrumb } from 'gatsby-plugin-breadcrumb'

export default ({
  children,
  title,
  location,
  crumbLabel,
  excerpt,
  isBlogPost,
}) => {
  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel: crumbLabel,
  })

  return (
    <Styled.root>
      <SEO metaData={{ title, excerpt, isBlogPost }} />
      <Header title={title} />
      <div
        sx={{
          fontSize: '3',
        }}
      >
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <h1 sx={{ fontFamily: 'heading', fontWeight: 'heading', mt: 0 }}>
        {title}
      </h1>
      {children}
    </Styled.root>
  )
}
