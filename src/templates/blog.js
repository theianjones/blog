/** @jsx jsx */
import { jsx, Container, Styled, Flex } from 'theme-ui'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'

const Blog = ({ data: { site, allMdx } }) => {
  const posts = allMdx.edges.filter(post => post !== undefined)

  return (
    <Layout site={site}>
      <SEO />
      <Container>
        <Styled.h1>All Articles</Styled.h1>
        <Flex sx={{ flexDirection: 'column', marginBottom: 40 }}>
          {posts.map(({ node: post }) => (
            <Styled.a
              key={post.id}
              sx={{
                color: 'text',
                textDecoration: 'none',
                padding: '.5rem',
                margin: '0 -0.5rem',
                borderRadius: 5,
                ':hover': {
                  backgroundColor: 'muted',
                },
              }}
              as={Link}
              aria-label={`View ${post.fields.title} article`}
              to={post.fields.slug}
            >
              {post.fields.title}
            </Styled.a>
          ))}
        </Flex>
        <hr
          sx={{
            margin: '50px 0',
          }}
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
          }
        }
      }
    }
  }
`
