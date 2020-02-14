/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from 'components/SEO'
import Layout from '../components/Layout'
import Share from '../components/Share'
import config from '../../config/website'
import Markdown from 'react-markdown'
export default function Post({ data: { site, mdx } }) {
  const {
    author = config.author,
    date,
    title,
    banner,
    slug,
    bannerCredit,
    editLink
  } = mdx.fields
  
  const blogPostUrl = `${config.siteUrl}/${slug}`

  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        sx={{
          width: '100%',
          display: 'flex',
          bg: 'background',
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
          {banner && (
            <div
              sx={{
                textAlign: 'center',
                p: { marginTop: 0 },
                a: {
                  color: 'primary',
                },
              }}
            >
              <Img
                fluid={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
              {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
            </div>
          )}
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
      <Container mv="0" pv="0">
        <p sx={{ textAlign: 'right', marginBottom: 0 }}>
          <Styled.a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl
            )}`}
          >
            Discuss on Twitter
          </Styled.a>
          <span sx={{ marginLeft: 10, marginRight: 10 }}>{` • `}</span>
          <Styled.a target="_blank" rel="noopener noreferrer" href={editLink}>
            Edit post on GitHub
          </Styled.a>
        </p>
      </Container>
      <Container>
        <Share
          url={blogPostUrl}
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
      fields {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        slug
        keywords
        editLink
        banner {
          childImageSharp {
            fluid(maxWidth: 720, traceSVG: { color: "#573ede" }, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        bannerCredit
      }
      body
    }
  }
`
