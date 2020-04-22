/** @jsx jsx */
import { jsx, Styled, Flex, Box } from "theme-ui"
import { useStaticQuery, graphql, Link } from "gatsby"
import PostList from "./post-list"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allBlogPost(limit: 5, sort: { fields: date, order: DESC }) {
        edges {
          node {
            title
            tags
            slug
            keywords
            body
            date
            excerpt
            id
          }
        }
      }
    }
  `)
  return (
    <Box sx={{ marginBottom: 30 }}>
      <Flex
        sx={{
          alignItems: "center",
          marginBottom: 10,
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        <Styled.h3 sx={{ margin: 0, color: "primary" }}>
          Latest Articles
        </Styled.h3>
        <Styled.a as={Link} to="/blog" aria-label="Visit blog page">
          all articles
        </Styled.a>
      </Flex>
      <PostList posts={data.allBlogPost.edges} />
    </Box>
  )
}
