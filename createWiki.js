const _ = require('lodash')
const path = require('path')

const toNotesPath = (basePath, node) => {
  const { dir } = path.parse(node.parent.relativePath)
  return path.join(basePath, dir, node.parent.name)
}

function createWiki(createPage, options) {
  const wikiNodes = _.get(options, 'wikiNodes', [])
  const basePath = _.get(options, 'basePath', '/wiki')

  if (_.isEmpty(wikiNodes)) {
    console.error(`Could not find any files in ${basePath}.`)
    return
  }

  const Note = require.resolve('./src/templates/wiki-note')
  const WikiTopic = require.resolve('./src/templates/wiki-topic')

  // Create notes pages
  wikiNodes.forEach(({ node }) => {
    createPage({
      path: toNotesPath(basePath, node),
      context: {
        ...node,
        topic: node.parent.name,
      },
      component: Note,
    })
  })

  const wikiUrls = wikiNodes.map(({ node }) => toNotesPath(basePath, node))

  const groupedNotes = wikiNodes.reduce((acc, { node }) => {
    const { dir } = path.parse(node.parent.relativePath)
    if (!dir) {
      return acc
    }

    acc[dir] = acc[dir] || []
    acc[dir].push({
      pagePath: path.join(basePath, dir),
      url: toNotesPath(basePath, node),
      ...node,
    })

    return acc
  }, {})

  Object.entries(groupedNotes).map(([key, value]) => {
    createPage({
      path: path.join(basePath, key),
      context: {
        urls: value.map(v => v.url),
        groupedNotes,
      },
      component: WikiTopic,
    })
  })

  createPage({
    path: basePath,
    context: {
      urls: wikiUrls,
      groupedNotes,
    },
    component: WikiTopic,
  })
}

module.exports = {
  createWiki,
  toNotesPath,
}
