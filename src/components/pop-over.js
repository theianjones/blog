/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Markdown from 'react-markdown'
import get from 'lodash/get'
export default function ({ reference }) {
  const excerpt = get(reference, 'childMdx.excerpt')

  return (
    <div
      sx={{
        backgroundColor: 'darker-background',
        maxWidth: excerpt ? 300 : 1000,
        borderRadius: 3,
      }}
    >
      {excerpt && (
        <Markdown
          source={excerpt}
          sx={{
            fontSize: 16,
            maxHeight: 150,
            overflow: 'auto',
            pt: 2,
            px: 2,
            color: 'text',
            a: { color: 'primary' },
            p: {
              mb: 2,
            },
          }}
        />
      )}
      <span
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Styled.a
          href={`${reference.slug}`}
          sx={{
            color: 'primary',
            mr: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {reference.title}
        </Styled.a>
      </span>
    </div>
  )
}
