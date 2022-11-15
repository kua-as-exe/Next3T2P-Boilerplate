import React from 'react'
import { Global } from '@emotion/react'
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  html, body, body>div { 
    ${tw` h-full `} 
  };

  body {
    ${tw`antialiased overflow-hidden p-0 m-0 `};
  }

  html,
  body {

  }
  main {
    ${tw` overflow-y-auto h-full `}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
