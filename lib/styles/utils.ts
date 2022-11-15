import tw, { css } from "twin.macro";

export const HideScrollbar = css`
  ::-webkit-scrollbar {
    display: none;
  }
`

export const twCard = css`
  ${ tw`
    bg-tiber rounded-md shadow-lg
    border border-keppel-300 border-opacity-20
  ` }
`
