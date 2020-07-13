/** @jsx jsx */
import { jsx, Styled, Flex, Box } from 'theme-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import PostList from './post-list'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allBrainNote(
        limit: 1000
        sort: { fields: childMdx___frontmatter___date, order: DESC }
        filter: { childMdx: { frontmatter: { tags: { in: "featured" } } } }
      ) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)
  return (
    <Box sx={{ marginBottom: 30 }}>
      <Styled.h1 sx={{ fontFamily: 'heading' }}>
        👋 I'm Ian, I live and work remotely in Northern Virginia building
        egghead.io
      </Styled.h1>

      <Flex
        sx={{
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 30,
          justifyContent: 'space-between',
        }}
      >
        <Styled.h2 sx={{ color: 'darkGray', marginBottom: 15 }}>
          Featured Articles
        </Styled.h2>
      </Flex>
      <PostList posts={data.allBrainNote.edges} />
    </Box>
  )
}
