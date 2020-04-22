/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          # Specify a fixed image and fragment.
          # The default width is 400 pixels
          fixed(width: 48, height: 48) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Link
      to="/"
      sx={{
        height: 48,
      }}
    >
      <Img fixed={data.file.childImageSharp.fixed} alt="Ian Jones Logo" />
    </Link>
  )
}
