/** @jsx jsx */
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { jsx } from 'theme-ui'
import Portal from '@reach/portal'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../../../components/note-layout'
import components from '../../../components/note-mdx-components'
import ReferenceBlock from '../../../components/reference-block'
import PopOver from '../../../components/pop-over'
import get from 'lodash/get'

const BrainNote = ({ note, location }) => {
  const inboundReferenceNotes = get(note, 'inboundReferenceNotes') || []
  const outboundReferenceNotes = get(note, 'outboundReferenceNotes') || []

  const popups = {}
  if (outboundReferenceNotes) {
    outboundReferenceNotes.forEach((ln, i) => {
      popups[ln.slug] = <PopOver reference={ln} />
    })
  }

  const AnchorTag = (props) => <components.a {...props} popups={popups} />

  return (
    <MDXProvider components={{ a: AnchorTag }}>
      <Layout
        title={`${note.title} - Ian's notes`}
        excerpt={note.childMdx.excerpt}
        isBlogPost
        location={location}
        crumbLabel={note.title}
      >
        <div id="note">
          <MDXRenderer>{note.childMdx.body}</MDXRenderer>
          <ReferenceBlock
            references={
              inboundReferenceNotes.map((note) => ({
                ...note,
                slug: `notes/${note.slug}`,
              })) || []
            }
          />
        </div>
        {note.outboundReferenceNotes &&
          note.outboundReferenceNotes.map((ln, i) => (
            <Portal key={ln.slug}>
              <div
                id={`notes/${ln.slug}`}
                style={{ display: 'none', position: 'fixed' }}
              >
                <PopOver reference={ln} />
              </div>
            </Portal>
          ))}
      </Layout>
    </MDXProvider>
  )
}

export default BrainNote
