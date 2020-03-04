/** @jsx jsx */
import { jsx } from 'theme-ui'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Header from './Header'
import config from '../../config/website'
import Footer from '../components/Footer'

export default ({
  site,
  frontmatter = {},
  children,
  dark,
  headerBg,
  headerColor,
  noFooter,
  noSubscribeForm,
}) => {
  const {
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(', ')
  const description = frontmatterDescription || siteDescription

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
      }}
    >
      <Helmet
        title={config.siteTitle}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
        <noscript>This site runs best with JavaScript enabled.</noscript>
      </Helmet>
      <Header
        siteImage={site.siteMetadata.image}
        dark={dark}
        bgColor={headerBg}
        headerColor={headerColor}
      />
      {children}
      {!noFooter && <Footer author={site.siteMetadata.author.name} />}
    </div>
  )
}

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      image
      description
      author {
        name
      }
      social {
        twitter
        twitterUrl
        github
        githubUrl
        eggheadUrl
      }
      keywords
    }
  }
`
