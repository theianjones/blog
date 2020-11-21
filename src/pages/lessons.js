/** @jsx jsx */
import { jsx, Styled, Flex } from 'theme-ui'
import { graphql } from 'gatsby'
import List from '../components/list'
import Layout from '../components/layout'

const Collections = ({ data: { allCollectionsJson } }) => {
  return (
    <Layout>
      <Styled.h1>egghead Courses</Styled.h1>
      <List collections={allCollectionsJson.nodes} />
    </Layout>
  )
}

export default Collections

export const query = graphql`
  query {
    allCollectionsJson(sort: { fields: id, order: ASC }) {
      nodes {
        description
        duration
        http_url
        icon_url
        id
        image
        image_thumb_url
        path
        slug
        title
        type
        url
      }
    }
  }
`
