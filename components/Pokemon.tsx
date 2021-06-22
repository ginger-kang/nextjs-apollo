import React from 'react'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import { getPoke } from '../api'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const Pokemon = () => {
  const loadMoreButtonRef = React.useRef()
  const queryClient = useQueryClient()

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery('poke',
    ({ pageParam = '' }) => getPoke(pageParam), 
    {
      getNextPageParam: (lastPage) => {
        const lastOffset = lastPage.results[lastPage.results.length - 1].url.split('/')[6]
        if (lastOffset > 1118) {
          return undefined
        }
        return lastOffset
      },
      staleTime: 3000,
      refetchOnWindowFocus: false,
    }
  )

  const inValidateQuery = () => {
    queryClient.resetQueries('poke')
  }

  useIntersectionObserver({
    root: null,
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  return (
    <>
      <ul>
        {data.pages.map((page) => (
          page.results.map((poke) => (
            <li key={poke.name} style={{ padding: '20px', fontWeight: 'bold'}}>{poke.name}</li>
          ))
        ))}
      </ul>
      <button onClick={() => fetchNextPage()}>Load More</button>
      <button onClick={() => inValidateQuery()}>Invalidate</button>
      <div ref={loadMoreButtonRef}/>
    </>
  )
}

export default Pokemon