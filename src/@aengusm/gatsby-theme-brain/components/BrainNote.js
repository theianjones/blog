/** @jsx jsx */
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Styled, jsx, Box } from 'theme-ui'
import Portal from '@reach/portal'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../../../components/layout'
import components from '../../../components/note-mdx-components'
import ReferenceBlock from '../../../components/reference-block'
import PopOver from '../../../components/pop-over'

const BrainNote = ({ note }) => {
  return (
    <MDXProvider components={components}>
      <Layout
        title={`${note.title} - Ian's notes`}
        excerpt={note.childMdx.excerpt}
        isBlogPost
      >
        <div id="note">
          <Styled.h1>{note.title}</Styled.h1>
          <MDXRenderer>{note.childMdx.body}</MDXRenderer>
          <ReferenceBlock references={note.inboundReferenceNotes || []} />
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
