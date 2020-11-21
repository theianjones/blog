/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Flex, Image } from 'theme-ui'
import { map } from 'lodash'

export default function List({ collections = [] }) {
  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {map(collections, (collection) => (
        <Styled.a
          key={collection.id || collection.slug}
          href={collection.http_url}
          aria-label={`View ${collection.title}`}
          sx={{
            textDecoration: 'none',
            maxWidth: 260,
            marginRight: 20,
            marginBottom: 20,
            padding: 1,
            transition: 'all 400ms ease-in-out',
            borderWidth: '1px 1px 1px 1px',
            borderColor: 'rgba(231, 236, 240, 1)',
            borderRadius: '4',
            borderStyle: 'solid',
            boxShadow: '0px 3px 10px 2px rgba(198, 204, 217, 0.2)',
            ':hover': {
              borderStyle: 'solid',
              boxShadow: '0px 10px 16px 4px rgba(198, 204, 217, 0.3)',
            },
          }}
        >
          <img src={collection.square_cover_480_url || collection.image} height="auto" width="250" />
          <Flex sx={{ alignItems: 'center', padding: 10 }}>
            {collection.image_thumb_url && (
              <img
                src={collection.image_thumb_url}
                width="25"
                height="25"
                sx={{ borderRadius: 999 }}
              />
            )}
            <Styled.p
              sx={{
                marginLeft: 10,
                color: 'text',
                maxWidth: 230,
                fontFamily: 'heading',
                fontSize: 3,
              }}
            >
              {collection.title}{' '}
            </Styled.p>
          </Flex>
        </Styled.a>
      ))}
    </Flex>
  )
}
