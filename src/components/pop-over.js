/** @jsx jsx */
import { jsx } from 'theme-ui'
export default function ({ reference }) {
  return (
    <div
      sx={{
        background: 'highlight',
        padding: 16,
        width: 'auto',
        borderRadius: '.3rem',
      }}
    >
      <h5 sx={{ color: 'text' }}>{reference.title}</h5>
      {reference.childMdx && (
        <p sx={{ color: 'text' }}>{reference.childMdx.excerpt}</p>
      )}
    </div>
  )
}
