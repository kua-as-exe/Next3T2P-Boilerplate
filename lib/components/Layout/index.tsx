import { NextSeo, NextSeoProps } from 'next-seo';
import { ReactElement } from 'react'

const LayoutComponent: React.FC<{
  children: ReactElement | ReactElement[]
} & Omit<NextSeoProps, "children">> = ({ children, ...SeoProps }) => {
  return (
    <>
      <NextSeo {...SeoProps} />

      <main>
        {children}
      </main>
    </>
  )
}

export default LayoutComponent
