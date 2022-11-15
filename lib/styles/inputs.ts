import tw, { css } from "twin.macro";

export const twInput = () => css`
  ${tw`
    px-2 py-1 rounded m-0.5 
    bg-black bg-opacity-20 
    text-white transition-all 
    cursor-pointer
  `}

  &:disabled {
    ${ tw`
      text-opacity-50
      placeholder:opacity-50
  ` }
  }

`
