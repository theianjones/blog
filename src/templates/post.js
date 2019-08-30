/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from 'components/SEO'
import Layout from '../components/Layout'
import Share from '../components/Share'
import config from '../../config/website'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  const author = mdx.frontmatter.author || config.author
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Container>
          <Styled.h1
            sx={{
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {title}
          </Styled.h1>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
              'h3,span': {
                textAlign: 'center',
                fontSize: 15,
                opacity: 0.6,
                margin: '0 5px',
              },
            }}
          >
            {author && <Styled.h3>{author}</Styled.h3>}
            {author && <span>—</span>}
            {date && <Styled.h3>{date}</Styled.h3>}
          </div>
          <br />
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container>
        <Share
          url={`${config.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        slug
        keywords
      }
      body
    }
  }
`
