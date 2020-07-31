/** @jsx jsx */
import React from 'react'
import { Styled, jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { isString, isEmpty } from 'lodash'
import PopOver from './pop-over'
const EXTERNAL_LINK_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
import Tippy from '@tippyjs/react/headless'
import { inlinePositioning } from 'tippy.js'
import ColorModeToggle from './color-mode-toggle'
import HomeContent from './home-content'
import EggheadCollections from './egghead-collections'
import PopulatedPostList from './populated-posts-list'
import Social from './social'
import SideNote from './side-note'
const ExternalAnchorTag = ({ href, ...restProps }) => {
  return (
    <Tippy
      appendTo={() => document.body}
      render={(attrs) => (
        <PopOver
          arrow={false}
          reference={{ title: href }}
          animation="scale"
          delay={[2000, 100]}
          {...attrs}
        />
      )}
    >
      <Styled.a {...restProps} href={href} sx={{ color: 'secondary' }} />
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
  const popUpKey = href.replace(/^\//, '').split('/')[0]
  if (!isExternalLink) {
    return (
      <Tippy
        appendTo={() => document.body}
        render={(attrs) => popups[popUpKey]}
        placement="top"
        plugins={[inlinePositioning]}
        inlinePositioning={true}
        theme="light"
        interactive={true}
        interactiveBorder={5}
        touch={false}
      >
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

const Image = (props) => <img height="auto" width={864} {...props} />

export default {
  a: AnchorTag,
  img: Image,
  ColorModeToggle,
  HomeContent,
  EggheadCollections,
  PopulatedPostList,
  Social,
  SideNote,
}
