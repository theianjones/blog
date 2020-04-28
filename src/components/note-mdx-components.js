/** @jsx jsx */
import React from 'react'
import { Styled, jsx, Box } from 'theme-ui'
import Portal from '@reach/portal'
import { isString, isEmpty } from 'lodash'
const EXTERNAL_LINK_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
const AnchorTag = (props) => {
  const tooltipRef = React.useRef(null)
  const isExternalLink =
    props.href && !isEmpty(props.href.match(EXTERNAL_LINK_REGEX))
  const onMouseEnter = (e) => {
    let tooltipHeight = 150
    tooltipRef.current = document.getElementById(props.href.replace(/^\//, ''))
    if (isExternalLink) {
      tooltipHeight = 50
    }
    if (tooltipRef.current) {
      const { right, top, height } = e.target.getBoundingClientRect()
      tooltipRef.current.style.top = top + height / 2 - tooltipHeight / 2 + 'px'
      tooltipRef.current.style.left = right + 8 + 'px'
      tooltipRef.current.style.display = 'block'
    }
  }
  const onMouseLeave = (e) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none'
    }
  }
  let renderedLink = props.children
  if (isString(props.children)) {
    renderedLink = props.children.replace(/\[\[(.*?)\]\]/g, '$1')
  }
  return (
    <>
      <Styled.a
        {...props}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderedLink}
      </Styled.a>
      <Portal key={props.href}>
        <Box
          id={props.href}
          sx={{
            position: 'absolute',
            padding: '.25rem',
            backgroundColor: 'highlight',
            borderRadius: '.5rem',
            display: 'none',
          }}
        >
          <Styled.p sx={{ margin: 0 }}>{props.href}</Styled.p>
        </Box>
      </Portal>
    </>
  )
}

export default {
  a: AnchorTag,
}
