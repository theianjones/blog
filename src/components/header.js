/** @jsx jsx */
import { jsx } from 'theme-ui'

import Logo from './logo'
import HeaderLinks from './header-links'

export default ({ title }) => {
  return (
    <header
      sx={{
        display: 'flex',
        alignItems: 'center',
        variant: 'styles.header',
        pt: [4, 5, 6],
      }}
    >
      <Logo />
      <HeaderLinks title={title} />
    </header>
  )
}
