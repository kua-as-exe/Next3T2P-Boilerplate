import React from 'react'
import Layout from '@components/Layout'
import tw, { css } from 'twin.macro'

import { API } from 'lib/utils/trpc'
import { Button } from 'primereact/button'

export default function Home() {

  const a = API.hello.useQuery({ text: 'jorge' })

  return (
    <Layout
      title="Laprise Band"
      description="Nyatzu"
    >
    
      <span>Hola</span>
      <pre>{a.data}</pre>
      <Button>Hola owo</Button>
      
    </Layout>
  )
}
