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
      <Styled.h2 sx={{ fontFamily: 'heading' }}>
        👋 I'm Ian, I live and work remotely in Northern Virginia building
        egghead.io
      </Styled.h2>

      <Flex
        sx={{
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 30,
          justifyContent: 'space-between',
        }}
      >
        <Styled.h3 sx={{ color: 'primary', marginBottom: 15 }}>
          Featured Articles
        </Styled.h3>
      </Flex>
      <PostList posts={data.allBrainNote.edges} />
    </Box>
  )
}
