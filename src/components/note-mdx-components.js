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

const AnchorTag = ({ href, children, popups, ...restProps }) => {
  if (!href && !children) {
    return <a href={href} children={children} {...restProps} />
  }
  const isExternalLink = href && !isEmpty(href.match(EXTERNAL_LINK_REGEX))
  let renderedLink = children
  if (isString(children)) {
    renderedLink = children.replace(/\[\[(.*?)\]\]/g, '$1')
  }
  const popUpKey = href.replace(/^\//, '').split('/')[1]
  if (!isExternalLink) {
    return (
      <Tippy content={popups[popUpKey]} placement="top" animation="shift-away">
        <Styled.a {...restProps} to={href} as={Link}>
          {renderedLink}
        </Styled.a>
      </Tippy>
    )
  }

  return (
    <ExternalAnchorTag {...restProps} href={href}>
      {children}
    </ExternalAnchorTag>
  )
}

export default {
  a: AnchorTag,
}
