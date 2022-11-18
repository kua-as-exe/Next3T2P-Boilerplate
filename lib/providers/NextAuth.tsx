import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"


const NextAuthProvider: React.FC<{ 
  session: Session,
  children: React.ReactElement
}> = ({ children, session }) => {

  return (
    <SessionProvider
      session={session}
      
    >
      {children}
    </SessionProvider>
  )

}
export default NextAuthProvider
