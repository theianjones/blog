/** @jsx jsx */
import { jsx } from 'theme-ui'

import { TwitterShareButton, FacebookShareButton } from 'react-share'

const Share = ({ url, title, twitterHandle }) => (
  <div
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      div: {
        marginRight: 20,
        cursor: 'pointer',
        ':hover': {
          color: 'primary',
        },
      },
      span: {
        marginRight: 20,
        fontSize: '70%',
        textTransform: 'uppercase',
        lineHeight: 2.5,
        opacity: 0.7,
      },
    }}
  >
    <div
      sx={{
        flexGrow: 1,
        borderTop: `1px solid gray`,
      }}
    />
    <span>Share article</span>
    <TwitterShareButton
      url={url}
      quote={title}
      via={twitterHandle.split('@').join('')}
    >
      Twitter
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={title}
      via={twitterHandle.split('@').join('')}
      sx={{
        cursor: 'pointer',
      }}
    >
      Facebook
    </FacebookShareButton>
  </div>
)

export default Share
