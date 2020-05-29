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
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            excerpt
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  `)

  return <PostList posts={data.allBlogPost.edges} />
}
