/** @jsx jsx */
import React from 'react'
import map from 'lodash/map'
import { jsx, Styled, Flex, Image } from 'theme-ui'

export default function List({ collections = [] }) {
  return (
    <>
      {map(collections, collection => (
        <Flex
          sx={{
            alignItems: 'center',
            padding: '.5rem',
            margin: '0 -0.5rem',
            ':hover': {
              backgroundColor: 'highlight',
            },
          }}
        >
          {collection.image_thumb_url && (
            <Image src={collection.image_thumb_url} variant="tiny" />
          )}
          <Styled.a
            key={collection.slug || collection.id}
            sx={{
              marginLeft: 10,
              color: 'text',
              textDecoration: 'none',
            }}
            href={collection.http_url}
            aria-label={`View ${collection.title}`}
          >
            {collection.title}{' '}
          </Styled.a>
        </Flex>
      ))}
    </>
  )
}

const collections = [
  {
    title: 'Intro to Stimulus',
    http_url: 'https://egghead.io/playlists/intro-to-stimulus-733b?af=ay44db',
    path: '/playlists/intro-to-stimulus-733b',
    slug: 'intro-to-stimulus-733b',
    item_count: 3,
    type: 'playlist',
    duration: 361,
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/205/thumb/javascriptlang.png',
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
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/205/thumb/javascriptlang.png',
  },
  {
    title: 'Yarn 2 AKA Berry',
    http_url: 'https://egghead.io/playlists/yarn-2-4526?af=ay44db',
    path: '/playlists/yarn-2-4526',
    slug: 'yarn-2-4526',
    item_count: 4,
    type: 'playlist',
    duration: 311,
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/963/thumb/yarn.png',
  },
  {
    title: 'Introduction to Urql: A React GraphQL Client',
    http_url:
      'https://egghead.io/playlists/introduction-to-urql-a-react-graphql-client-faaa2bf5?af=ay44db',
    path: '/playlists/introduction-to-urql-a-react-graphql-client-faaa2bf5',
    slug: 'introduction-to-urql-a-react-graphql-client-faaa2bf5',
    item_count: 8,
    type: 'playlist',
    duration: 1579,
    image_thumb_url:
      'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/thumb/graphqllogo.png',
  },
]

export const EggheadCollections = () => {
  return <List collections={collections} />
}
