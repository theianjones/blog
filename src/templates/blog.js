/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { bpMaxSM } from '../lib/breakpoints'

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, categories },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page
    .map(id =>
      allMdx.edges.find(
        edge =>
          edge.node.id === id && edge.node.parent.sourceInstanceName !== 'pages'
      )
    )
    .filter(post => post !== undefined)

  return (
    <Layout site={site}>
      <SEO />
      <Container>
        {posts.map(({ node: post }) => (
          <div
            key={post.id}
            sx={{
              ':not(:first-of-type)': {
                marginTop: 20,
              },
              ':first-of-type': {
                marginTop: 20,
              },
              background: 'white',
              padding: [40, 20],
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {post.frontmatter.banner && (
              <div
                sx={{
                  padding: ['60px 60px 40px 60px', '20px'],
                }}
              >
                <Styled.a
                  as={Link}
                  aria-label={`View ${post.frontmatter.title} article`}
                  to={post.fields.slug}
                >
                  <Img sizes={post.frontmatter.banner.childImageSharp.fluid} />
                </Styled.a>
              </div>
            )}
            <h2
              css={css`
                margin-top: 30px;
                margin-bottom: 10px;
              `}
            >
              <Styled.a
                as={Link}
                aria-label={`View ${post.frontmatter.title} article`}
                to={post.fields.slug}
              >
                {post.frontmatter.title}
              </Styled.a>
            </h2>
            {/* <small>{post.frontmatter.date}</small> */}
            <p
              css={css`
                margin-top: 10px;
              `}
            >
              {post.excerpt}
            </p>{' '}
            <Styled.a
              as={Link}
              to={post.fields.slug}
              aria-label={`view "${post.frontmatter.title}" article`}
            >
              Read Article →
            </Styled.a>
          </div>
        ))}
        <br />
        <br />
        <div
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {previousPagePath && (
            <Styled.a
              as={Link}
              to={previousPagePath}
              aria-label="View previous page"
            >
              ← Previous Page
            </Styled.a>
          )}
          {nextPagePath && (
            <Styled.a as={Link} to={nextPagePath} aria-label="View next page">
              Next Page →
            </Styled.a>
          )}
        </div>
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            keywords
          }
        }
      }
    }
  }
`
