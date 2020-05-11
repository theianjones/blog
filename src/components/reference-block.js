/** @jsx jsx */
import { Styled, jsx, Box } from 'theme-ui'
import { Link } from 'gatsby'
export default function ({ references = [] }) {
  if (!references || references.length === 0) {
    return null
  }
  console.log({ references })
  return (
    <Box
      sx={{
        backgroundColor: 'muted',
        padding: '1rem',
        borderRadius: '.5rem',
        marginBottom: '1rem',
      }}
    >
      <Styled.h3 sx={{ color: 'highlight' }}>Referred in</Styled.h3>
      <Box className="mb-4">
        {references.map((reference) => (
          <Styled.a
            as={Link}
            sx={{ textDecoration: 'none', color: 'highlight' }}
            to={`${reference.slug}`}
            key={reference.slug}
          >
            <Box sx={{ padding: 10 }}>
              <Styled.h5 sx={{ margin: 0 }}>{reference.title}</Styled.h5>
              <Styled.p>{reference.childMdx.excerpt}</Styled.p>
            </Box>
          </Styled.a>
        ))}
      </Box>
      <Styled.hr />
    </Box>
  )
}
