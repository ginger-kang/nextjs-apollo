import Pokemon from '../components/Pokemon'
import { getPoke } from '../api'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

const Poke = () => {
  return (
    <Pokemon />
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()
  console.log('ctx: ', ctx)

  await queryClient.prefetchInfiniteQuery('poke', () => getPoke(), { staleTime: 1000 })

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    }
  }
}

export default Poke