/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Markdown from 'react-markdown'
import Link from '../Link'

export default ({
  illustration,
  title,
  body,
  note,
  fullscreen = false,
  articleTitle,
  articleSlug,
}) => (
  <div
    sx={{
      minHeight: fullscreen ? '70vh' : 'auto',
      width: '100vw',
      maxWidth: '100% !important',
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      p: {
        marginTop: 10,
        maxWidth: 400,
        lineHeight: 1.5,
        fontWeight: 400,
        strong: {
          fontWeight: 600,
        },
      },
      h2: {
        fontSize: 26,
        fontWeight: 400,
        marginBottom: 0,
        marginTop: 25,
      },
    }}
  >
    <div>{illustration}</div>
    <Styled.h2>{title}</Styled.h2>
    {body && <Markdown>{body}</Markdown>}
    {note && (
      <div
        sx={{
          color: 'rgba(0, 0, 0, 0.7)',
          transform: 'scale(0.85)',
          'span:hover': {
            opacity: 1,
            color: 'rgba(0, 0, 0, 1)',
          },
        }}
      >
        <span>
          <Markdown>{note}</Markdown>
        </span>
      </div>
    )}
    {articleTitle && (
      <Styled.a as={Link} to={`/${articleSlug}`}>
        {articleTitle}
      </Styled.a>
    )}
  </div>
)
