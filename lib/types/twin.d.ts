import 'twin.macro'
import { css as cssImport } from '@emotion/css'
import { CSSInterpolation } from '@emotion/serialize'
import styledImport from '@emotion/styled'

declare module 'twin.macro' {
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation
  }

  interface SVCProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation
  }
}
