/** @jsx jsx */
import React from 'react'
import { Styled, jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { isString, isEmpty } from 'lodash'
import PopOver from './pop-over'
const EXTERNAL_LINK_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
import Tippy from '@tippyjs/react'

const ExternalAnchorTag = ({ href, ...restProps }) => {
  return (
    <Tippy
      content={
        <PopOver
          reference={{ title: href }}
          animation="scale"
          delay={[2000, 100]}
        />
      }
    >
      <Styled.a {...restProps} href={href} />
    </Tippy>
  )
}

const AnchorTag = ({ href, children, ...restProps }) => {
  const tooltipRef = React.useRef(null)
  const isExternalLink = href && !isEmpty(href.match(EXTERNAL_LINK_REGEX))
  if (isExternalLink) {
    return (
      <ExternalAnchorTag {...restProps} href={href}>
        {children}
      </ExternalAnchorTag>
    )
  }

  const showToolTip = (e) => {
    let tooltipHeight = 150
    tooltipRef.current = document.getElementById(href.replace(/^\//, ''))
    if (tooltipRef.current) {
      const { right, top, height } = e.target.getBoundingClientRect()
      tooltipRef.current.style.top = top + height / 2 - tooltipHeight / 2 + 'px'
      tooltipRef.current.style.left = right + 8 + 'px'
      tooltipRef.current.style.display = 'block'
    }
  }
  const hideToolTip = (e) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none'
    }
  }
  let renderedLink = children
  if (isString(children)) {
    renderedLink = children.replace(/\[\[(.*?)\]\]/g, '$1')
  }
  return (
    <>
      <Styled.a
        {...restProps}
        to={href}
        onMouseEnter={showToolTip}
        onMouseLeave={hideToolTip}
        onFocus={showToolTip}
        onBlur={hideToolTip}
        as={Link}
      >
        {renderedLink}
      </Styled.a>
    </>
  )
}

export default {
  a: AnchorTag,
}
