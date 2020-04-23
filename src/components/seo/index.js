import path from 'path'
import React from './node_modules/react'
import { Helmet } from './node_modules/react-helmet'
import { StaticQuery, graphql } from './node_modules/gatsby'
import PropTypes from './node_modules/prop-types'
import SchemaOrg from './schema-org'

const SEO = ({ metaData = {}, isBlogPost }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            image
            author
            twitterHandle
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta = metaData || {}
      const title = isBlogPost ? postMeta.title : seo.title
      const description = postMeta.description || seo.description
      const image = seo.image
      const url = postMeta.slug
        ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}`
        : seo.canonicalUrl
      const datePublished = isBlogPost ? postMeta.datePublished : false
      const twitter = seo.twitterHandle
      const ogImage = `https://pedantic-payne-0af77d.netlify.app/opengraph?title=${title}&author=${twitter}&v=0.0.4`
      return (
        <>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            {/* Twitter Card tags */}
            <meta
              name="twitter:card"
              content={isBlogPost ? 'summary_large_image' : 'summary'}
            />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            canonicalUrl={seo.canonicalUrl}
            author={seo.author}
            defaultTitle={seo.title}
          />
        </>
      )
    }}
  />
)

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
}

export default SEO
