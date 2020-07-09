/** @jsx jsx */
import { Styled, jsx, Box } from 'theme-ui'
import { Link } from 'gatsby'
export default function ({ references = [] }) {
  if (!references || references.length === 0) {
    return null
  }
  return (
    <Box
      sx={{
        backgroundColor: 'muted',
        padding: '1rem',
        borderRadius: '.5rem',
        marginBottom: '1rem',
      }}
    >
      <Styled.h3 sx={{ color: 'gray', fontWeight: 600 }}>Referred in</Styled.h3>
      <Box className="mb-4">
        {references.map((reference) => (
          <Styled.a
            as={Link}
            sx={{
              textDecoration: 'none',
            }}
            to={`${reference.slug}`}
            key={reference.slug}
          >
            <Box
              sx={{
                padding: 10,
                color: 'gray',
                ':hover': {
                  color: 'primary',
                },
              }}
            >
              <h5
                sx={{
                  fontFamily: 'heading',
                  margin: 0,
                  fontSize: 5,
                  fontWeight: 500,
                }}
              >
                {reference.title}
              </h5>
              <p sx={{ marginTop: 0 }}>{reference.childMdx.excerpt}</p>
            </Box>
          </Styled.a>
        ))}
      </Box>
      <Styled.hr />
    </Box>
  )
}
