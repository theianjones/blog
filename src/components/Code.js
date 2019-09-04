/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Prism from '@theme-ui/prism'
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'

const scope = {
  jsx,
  Styled,
  Link: props => {
    if (props.activeClassName)
      return <span className={props.activeClassName} {...props} />
    return <span {...props} sx={{ cursor: 'pointer' }} />
  },
}

const transformCode = src => `/** @jsx jsx */\n${src}`

const liveTheme = { styles: [] }

export const LiveCode = ({ children, preview, xray }) => {
  if (preview) {
    return (
      <LiveProvider
        theme={liveTheme}
        code={children}
        scope={scope}
        transformCode={transformCode}
      >
        <LivePreview />
      </LiveProvider>
    )
  }

  return (
    <LiveProvider
      theme={liveTheme}
      code={children}
      scope={scope}
      transformCode={transformCode}
    >
      <div
        sx={{
          p: 3,
          variant: xray ? 'styles.xray' : null,
          border: t => `1px solid ${t.colors.muted}`,
        }}
      >
        <LivePreview />
        <LiveError
          sx={{
            p: 3,
            fontFamily: 'monospace',
            fontSize: 0,
            color: 'secondary',
            bg: 'highlight',
          }}
        />
      </div>
      <Styled.pre
        sx={{
          my: 0,
        }}
      >
        <LiveEditor padding={0} />
      </Styled.pre>
    </LiveProvider>
  )
}

export default props => {
  if (props.live) {
    return <LiveCode {...props} />
  }
  return <Prism {...props} />
}
