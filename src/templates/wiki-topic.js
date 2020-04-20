import React from 'react'

import WikiTopic from '../components/WikiTopic'

export default ({
  pageContext: { groupedNotes, urls, breadcrumbs },
  location,
}) => {
  return (
    <WikiTopic
      directories={groupedNotes}
      files={urls}
      breadcrumbs={breadcrumbs}
      location={location}
    />
  )
}
