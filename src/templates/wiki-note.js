import { graphql } from 'gatsby'

import WikiNote from '../components/WikiNote'

export default WikiNote

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    note: mdx(id: { eq: $id }) {
      id
      body
      fileAbsolutePath
    }
  }
`
