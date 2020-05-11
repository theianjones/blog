import React from 'react'
import { graphql } from 'gatsby'
import BrainNote from '../components/BrainNote'

export default ({ data, location }) => {
  return <BrainNote note={data.brainNote} location={location} />
}

export const query = graphql`
  query BrainNoteWithRefsBySlug($slug: String!) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      childMdx {
        body
        excerpt
      }
      inboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
      outboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
    }
  }
`
