/** @jsx jsx */
import React from 'react'
import { Styled, jsx } from 'theme-ui'

const AnchorTag = (props) => {
  const tooltipRef = React.useRef(null)

  const onMouseEnter = (e) => {
    tooltipRef.current = document.getElementById(props.href.replace(/^\//, ''))
    if (tooltipRef.current) {
      const { right, top, height } = e.target.getBoundingClientRect()
      const tooltipHeight = 150
      console.log({
        top: top + height / 2 - tooltipHeight / 2,
        left: right + 8,
      })
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
  const linkWithoutBrackets = props.children.replace(/\[\[(.*?)\]\]/g, '$1')
  return (
    <Styled.a
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {linkWithoutBrackets}
    </Styled.a>
  )
}

export default {
  a: AnchorTag,
}
