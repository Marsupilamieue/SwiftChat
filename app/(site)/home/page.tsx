import EmptyState from '../../components/EmptyState'

export default async function Home() {
  return (
    <div className='hidden lg:block lg:pl-80 h-screen'>
      <EmptyState/>
    </div>
  )
}
