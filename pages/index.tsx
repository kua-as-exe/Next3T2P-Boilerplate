import React from 'react'
import Layout from '@components/Layout'
import tw, { css } from 'twin.macro'

import { API } from 'lib/utils/trpc'
import { Button } from 'primereact/button'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const a = API.hello.useQuery({ text: 'jorge' })

  const { data: session } = useSession()

  return (
    <Layout
      title="Laprise Band"
      description="Nyatzu"
    >

      <span>Hola</span>
      <pre>{a.data}</pre>
      <Button>Hola owo</Button>

      {
        (session) ? (
          <>
            Signed in as {session?.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )

      }

    </Layout>
  )
}
