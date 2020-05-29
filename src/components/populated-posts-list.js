import React from 'react'
import PostList from './post-list'
import { useStaticQuery, graphql } from 'gatsby'
export default () => {
  const data = useStaticQuery(graphql`
    query MyPostsQuery {
      site {
        siteMetadata {
          title
          social {
            name
            url
          }
        }
      }
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
  `)

  return <PostList posts={data.allBrainNote.edges} />
}
