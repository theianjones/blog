/** @jsx jsx */
import { jsx, Styled, Flex } from 'theme-ui'
import Layout from '../components/note-layout'
import PopulatedPostList from '../components/populated-posts-list'
function Articles() {
  return (
    <Layout>
      <Styled.h1>Articles</Styled.h1>
      <PopulatedPostList />
    </Layout>
  )
}

export default Articles
