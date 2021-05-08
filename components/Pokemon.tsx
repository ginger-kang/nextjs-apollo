import React, { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { getPoke } from '../api/getPoke'
import { useQueryClient } from 'react-query'

const Pokemon = () => {
  const { data, fetchNextPage } = useInfiniteQuery('poke', 
    ({ pageParam = '' }) => getPoke(pageParam), 
    {
      getNextPageParam: (lastPage) => {
        const lastOffset = lastPage.results[lastPage.results.length - 1].url.split('/')[6]
        if (lastOffset > 1118) {
          return undefined
        }
        return lastOffset
      },
      staleTime: 1000,
    }
  )

  return (
    <>
      <ul>
        {data.pages.map((page) => (
          page.results.map((poke) => (
            <li key={poke.name}>{poke.name}</li>
          ))
        ))}
      </ul>
      <button onClick={() => fetchNextPage()}>Load More</button>
    </>
  )
}

export default Pokemon