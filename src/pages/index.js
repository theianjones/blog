/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'

const Hero = ({ site: { siteMetadata } }) => (
  <section
    sx={{
      bg: 'secondary',
      width: '100%',
      fontFamily: 'body',
      padding: '20px 0 30px 0',
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
          color: 'white',
        }}
      >
        I live and work remotely in Arlington, VA building eggheadio.
      </Styled.h1>

      <div
        sx={{
          a: {
            marginRight: 10,
            color: 'white',
            ':hover': {
              color: 'primary'
            }
          },
        }}
      >
        <Styled.a href={siteMetadata.social.twitterUrl}>twitter</Styled.a>
        <Styled.a href={siteMetadata.social.githubUrl}>github</Styled.a>
        <Styled.a href={siteMetadata.social.eggheadUrl}>egghead</Styled.a>
      </div>
      <div
        sx={{
          height: 150,
          overflow: 'hidden',
        }}
      />
    </Container>
  </section>
)

export default function Index({ data: { site, allMdx } }) {
  return (
    <Styled.root>
      <Layout site={site}>
        <Hero site={site} />
        <Container>
          {allMdx.edges.map(({ node: post }) => (
            <div
              key={post.id}
              sx={{
                marginBottom: 40,
              }}
            >
              <Styled.h2>
                <Styled.a as={Link} to={post.frontmatter.slug} aria-label={`View ${post.frontmatter.title}`}>{post.frontmatter.title} </Styled.a>
              </Styled.h2>
              <p
                sx={{
                  marginBottom: 10,
                  display: 'inline-block',
                }}
              >
                {post.excerpt}{' '}
                <Styled.a as={Link}
                  to={post.frontmatter.slug}
                  aria-label={`View ${post.frontmatter.title}`}
                >
                  Read Article →
                </Styled.a>
              </p>
            </div>
          ))}
          <Styled.a as={Link}
            to="/blog"
            aria-label="Visit blog page"
            
          >
            View all articles
          </Styled.a>
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
