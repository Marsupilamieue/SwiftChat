import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from './utils/auth'
import LogoutButton from './components/LogoutButton'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <>
        <h1>Logged</h1>
        <LogoutButton/>

        </>
      ) : (
        <h1>Anonymous</h1>
      )}
    </main>
  )
}
