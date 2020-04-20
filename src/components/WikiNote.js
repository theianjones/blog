import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './Layout'

const NotePage = props => {
  const homeBlock = (
    <div>
      <button
        className="post-single__home-button"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  )
  return (
    <Layout>
      {homeBlock}
      <MDXRenderer>{props.data.note.body}</MDXRenderer>
    </Layout>
  )
}

export default NotePage
