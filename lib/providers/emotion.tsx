import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import Global from '@styles/global'

const EmotionProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {

  return (<>
      <CacheProvider value={cache}>
        <Global />
        { children } 
      </CacheProvider>
</>)
  
}

export default EmotionProvider
