/** @jsx jsx */
import { jsx, Styled, Flex } from 'theme-ui'
import Layout from '../components/note-layout'
import { graphql } from 'gatsby'
import PostList from '../components/post-list'


function Articles(props) {
  console.log(props.data )
  return (
    <Layout>
      <Styled.h1>Articles</Styled.h1>
      <PostList posts={props.data.allBrainNote.edges} />
    </Layout>
  )
}

export default Articles

export const pageQuery = graphql`
  query ArticlesQuery {
    allBrainNote(
      sort: { fields: [childMdx___frontmatter___date, title], order: DESC }
      filter: { childMdx: { frontmatter: { type: { eq: "post" } } } }
    ) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`
