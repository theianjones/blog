/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Flex, Image } from 'theme-ui'
import { map } from 'lodash'

export default function List({ collections = [] }) {
  return (
    <>
      {map(collections, (collection) => (
        <Flex
          key={collection.id || collection.slug}
          sx={{
            alignItems: 'center',
            variant: 'styles.postlistitem',
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
