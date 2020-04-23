/** @jsx jsx */
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { Styled, jsx, Box } from 'theme-ui'
import Portal from '@reach/portal'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../../../components/layout'
import components from '../../../components/note-mdx-components'

const BrainNote = ({ note }) => {
  let references = []
  let referenceBlock
  if (note.inboundReferenceNotes != null) {
    references = note.inboundReferenceNotes.map((reference) => (
      <Styled.a
        sx={{ textDecoration: 'none', color: 'highlight' }}
        href={`${reference.slug}`}
        key={reference.slug}
      >
        <Box sx={{ padding: 10 }}>
          <Styled.h5 sx={{ margin: 0 }}>{reference.title}</Styled.h5>
          <Styled.p>{reference.childMdx.excerpt}</Styled.p>
        </Box>
      </Styled.a>
    ))
    if (references.length > 0) {
      referenceBlock = (
        <Box
          sx={{
            backgroundColor: 'muted',
            padding: '1rem',
            borderRadius: '.5rem',
            marginBottom: '1rem',
          }}
        >
          <Styled.h3 sx={{ color: 'highlight' }}>Referred in</Styled.h3>
          <Box className="mb-4">{references}</Box>
          <Styled.hr />
        </Box>
      )
    }
  }
  return (
    <MDXProvider components={components}>
      <Layout title={`${note.title} - Ian's notes`}>
        <Styled.h1>{note.title}</Styled.h1>
        <MDXRenderer>{note.childMdx.body}</MDXRenderer>
        {referenceBlock}
        {note.outboundReferenceNotes &&
          note.outboundReferenceNotes.map((ln, i) => (
            <Portal key={ln.slug}>
              <Box
                id={`notes/${ln.slug}`}
                sx={{
                  position: 'absolute',
                  width: '30rem',
                  padding: '1rem',
                  backgroundColor: 'highlight',
                  borderRadius: '.5rem',
                  display: 'none',
                  height: 150,
                }}
              >
                <Styled.h5 sx={{ marginBottom: '1rem' }}>{ln.title}</Styled.h5>
                <Styled.p sx={{ margin: 0 }}>{ln.childMdx.excerpt}</Styled.p>
              </Box>
            </Portal>
          ))}
      </Layout>
    </MDXProvider>
  )
}

export default BrainNote
