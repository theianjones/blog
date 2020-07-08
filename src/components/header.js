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
        justifyContent: 'space-between',
        variant: 'styles.header',
        pt: [4, 5, 6],
        marginBottom: 50,
      }}
    >
      <Logo />
      <HeaderLinks title={title} />
    </header>
  )
}
