/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Layout from '../components/note-layout'
import { graphql } from 'gatsby'
import PostList from '../components/post-list'

function Articles(props) {
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
    allBrainNote(sort: { fields: [title], order: DESC }) {
      edges {
        node {
          slug
          title
          childMdx {
            frontmatter {
              growthStage
              tags
            }
          }
        }
      }
    }
  }
`
