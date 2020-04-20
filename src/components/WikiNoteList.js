import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default ({ directories, location }) => {
  const path = location.pathname.slice(6)
  return (
    <ul>
      {Object.entries(directories)
        .filter(page => page[0] === path)
        .map(page => {
          return page[1].map(item => {
            return (
              <div
                key={item.url}
                className="border-t-2 border-grey-900 border-dashed mt-6 pt-4"
              >
                <li className="py-4">
                  <a href={item.url}>{item.url}</a>
                </li>
                <MDXRenderer>{item.body}</MDXRenderer>
              </div>
            )
          })
        })}
    </ul>
  )
}
