import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app'
import React from 'react'

import EmotionProvider from '@providers/emotion'
import TrpcProvider from '@providers/TrpcProvider'
import { Provider as JotaiProvider } from 'jotai'

import NextSeoDefault from 'lib/utils/seo';

import '@styles/globals.scss'

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <DefaultSeo {...NextSeoDefault} />
      <EmotionProvider>
        <JotaiProvider>
          <TrpcProvider>
            <Component {...pageProps} />
          </TrpcProvider>
        </JotaiProvider>
      </EmotionProvider>
    </>
  )

}

export default App
