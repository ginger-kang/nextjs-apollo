import React, { useEffect, useState } from 'react'
import {getPoke} from '../api/getPoke'

const Pokemon = ({ data }) => {
  const [poke, setPoke] = useState([])
  console.log(data)

  return (
    <ul>
      {data.results.map((poke) => (
        <li key={poke.name}>
          {poke.name}
        </li>
      ))}
    </ul>
  )
}

export default Pokemon