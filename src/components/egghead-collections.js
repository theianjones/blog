/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Flex } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import List from './list'

const collections = [
  {
    title: 'Introduction to Urql: A React GraphQL Client',
    http_url:
      'https://egghead.io/playlists/introduction-to-urql-a-react-graphql-client-faaa2bf5?af=ay44db',
    path: '/playlists/introduction-to-urql-a-react-graphql-client-faaa2bf5',
    slug: 'introduction-to-urql-a-react-graphql-client-faaa2bf5',
    item_count: 8,
    type: 'playlist',
    duration: 1579,
    image:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1594244751/blog/urql_share_prmmbk.jpg',
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/thumb/graphqllogo.png',
  },
  {
    title: 'Introduction to RedwoodJS: full-stack framework for JAMstack',
    http_url:
      'https://egghead.io/playlists/introduction-to-redwoodjs-full-stack-jamstack-framework-2b10?af=ay44db',
    path:
      '/playlists/introduction-to-redwoodjs-full-stack-jamstack-framework-2b10',
    slug: 'introduction-to-redwoodjs-full-stack-jamstack-framework-2b10',
    item_count: 4,
    type: 'playlist',
    duration: 311,
    image:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1594244754/blog/redwood_share_cktjtg.jpg',
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/285/thumb/big-redwood.png',
  },
  {
    title: 'Yarn 2 AKA Berry',
    http_url: 'https://egghead.io/playlists/yarn-2-4526?af=ay44db',
    path: '/playlists/yarn-2-4526',
    slug: 'yarn-2-4526',
    item_count: 4,
    type: 'playlist',
    duration: 311,
    image:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1594244749/blog/yarn_share_vw9p0n.jpg',
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/963/thumb/yarn.png',
  },
  {
    title: 'Introduction to Client Side Web APIs',
    http_url:
      'https://egghead.io/playlists/introduction-to-client-side-web-apis-72d0?af=ay44db',
    path: '/playlists/introduction-to-client-side-web-apis-72d0',
    slug: 'introduction-to-client-side-web-apis-72d0',
    item_count: 4,
    type: 'playlist',
    duration: 426,
    image:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1594244752/blog/dom_share_ijfhhj.jpg',
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/205/thumb/javascriptlang.png',
  },
  {
    title: 'Intro to Stimulus',
    http_url: 'https://egghead.io/playlists/intro-to-stimulus-733b?af=ay44db',
    path: '/playlists/intro-to-stimulus-733b',
    slug: 'intro-to-stimulus-733b',
    item_count: 3,
    type: 'playlist',
    duration: 361,
    image:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1594244793/blog/stimulus_share_ac2wur.jpg',
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/205/thumb/javascriptlang.png',
  },
  {
    type: 'playlist',
    id: 377056,
    title: 'Upgrade Your Terminal and Make It a Joy to Work with',
    description:
      '🚀 In this collection, I will be going over some command line tools I use on a daily basis that make my life a lot easier.\n\n[First up is fzf](https://github.com/junegunn/fzf).\n\n> fzf is a general-purpose command-line fuzzy finder.',
    slug: 'upgrade-your-terminal-and-make-it-a-joy-to-work-with-13f1',
    duration: 224,
    url:
      'https://egghead.io/api/v1/playlists/upgrade-your-terminal-and-make-it-a-joy-to-work-with-13f1',
    path:
      '/playlists/upgrade-your-terminal-and-make-it-a-joy-to-work-with-13f1',
    http_url:
      'https://egghead.io/playlists/upgrade-your-terminal-and-make-it-a-joy-to-work-with-13f1',
    lessons_url:
      'https://egghead.io/api/v1/playlists/upgrade-your-terminal-and-make-it-a-joy-to-work-with-13f1/items?flatten=true',
    icon_url:
      'https://res.cloudinary.com/dg3gyk0gu/image/upload/v1567198446/og-image-assets/eggo.svg',
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/218/thumb/bash_shell.png',
    image:
      'https://res.cloudinary.com/dzsq0psas/image/upload/v1594244950/blog/terminal_share_f8wl6e.jpg',
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
      <Styled.h3 sx={{ color: 'primary' }}>egghead Video Lessons</Styled.h3>
      <List collections={collections} />
    </>
  )
}

export default EggheadCollections
