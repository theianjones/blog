/** @jsx jsx */
import React from "react"
import { jsx, Styled, Flex } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import List from "./list"

const collections = [
  {
    title: "Introduction to Urql: A React GraphQL Client",
    http_url:
      "https://egghead.io/playlists/introduction-to-urql-a-react-graphql-client-faaa2bf5?af=ay44db",
    path: "/playlists/introduction-to-urql-a-react-graphql-client-faaa2bf5",
    slug: "introduction-to-urql-a-react-graphql-client-faaa2bf5",
    item_count: 8,
    type: "playlist",
    duration: 1579,
    image_thumb_url:
      "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/thumb/graphqllogo.png",
  },
  {
    title: "Introduction to RedwoodJS: full-stack framework for JAMstack",
    http_url:
      "https://egghead.io/playlists/introduction-to-redwoodjs-full-stack-jamstack-framework-2b10?af=ay44db",
    path:
      "/playlists/introduction-to-redwoodjs-full-stack-jamstack-framework-2b10",
    slug: "introduction-to-redwoodjs-full-stack-jamstack-framework-2b10",
    item_count: 4,
    type: "playlist",
    duration: 311,
    image_thumb_url:
      "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/285/thumb/big-redwood.png",
  },
  {
    title: "Yarn 2 AKA Berry",
    http_url: "https://egghead.io/playlists/yarn-2-4526?af=ay44db",
    path: "/playlists/yarn-2-4526",
    slug: "yarn-2-4526",
    item_count: 4,
    type: "playlist",
    duration: 311,
    image_thumb_url:
      "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/963/thumb/yarn.png",
  },
  {
    title: "Introduction to Client Side Web APIs",
    http_url:
      "https://egghead.io/playlists/introduction-to-client-side-web-apis-72d0?af=ay44db",
    path: "/playlists/introduction-to-client-side-web-apis-72d0",
    slug: "introduction-to-client-side-web-apis-72d0",
    item_count: 4,
    type: "playlist",
    duration: 426,
    image_thumb_url:
      "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/205/thumb/javascriptlang.png",
  },
  {
    title: "Intro to Stimulus",
    http_url: "https://egghead.io/playlists/intro-to-stimulus-733b?af=ay44db",
    path: "/playlists/intro-to-stimulus-733b",
    slug: "intro-to-stimulus-733b",
    item_count: 3,
    type: "playlist",
    duration: 361,
    image_thumb_url:
      "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/205/thumb/javascriptlang.png",
  },
]

const EggheadCollections = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          eggheadUrl
        }
      }
    }
  `)
  return (
    <>
      <Flex
        sx={{
          alignItems: "center",
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <Styled.h3 sx={{ margin: 0, color: "primary" }}>
          Latest egghead Collections
        </Styled.h3>
        <Styled.a
          href={site.siteMetadata.eggheadUrl}
          aria-label="Visit Ian's Collections"
        >
          all collections
        </Styled.a>
      </Flex>
      <List collections={collections} />
    </>
  )
}

export default EggheadCollections
