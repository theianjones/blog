/** @jsx jsx */
import { jsx, Styled, Container, Flex } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'

const Hero = ({ site: { siteMetadata } }) => (
  <section
    sx={{
      bg: 'background',
      width: '100%',
      fontFamily: 'body',
      display: 'flex',
    }}
  >
    <Container>
      <Styled.h1
        sx={{
          position: 'relative',
          zIndex: 5,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        My name is Ian Jones. I live and work remotely in Northern Virginia
        building{' '}
        <Styled.a href={siteMetadata.social.eggheadUrl}>egghead.io</Styled.a>.
      </Styled.h1>
    </Container>
  </section>
)

export default function Index({ data: { site, allMdx } }) {
  return (
    <Styled.root>
      <Layout site={site}>
        <Hero site={site} />
        <Container>
          <Flex
            sx={{
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            <Styled.h2 sx={{ margin: 0, color: 'primary' }}>
              Latest Articles
            </Styled.h2>
            <Styled.a sx={{}} as={Link} to="/blog" aria-label="Visit blog page">
              all articles
            </Styled.a>
          </Flex>
          <Flex sx={{ flexDirection: 'column', marginBottom: 40 }}>
            {allMdx.edges.map(({ node: post }) => (
              <Styled.a
                key={post.id}
                as={Link}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '.5rem',
                  margin: '0 -0.5rem',
                  ':hover': {
                    backgroundColor: 'muted',
                  },
                }}
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}{' '}
              </Styled.a>
            ))}
          </Flex>

          <hr />
        </Container>
      </Layout>
    </Styled.root>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
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
            description
            slug
            keywords
          }
        }
      }
    }
  }
`
