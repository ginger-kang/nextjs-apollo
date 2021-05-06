import Pokemon from '../components/Pokemon'
import { getPoke } from '../api/getPoke'

const Poke = (props) => {
  return (
    <Pokemon data={props}/>
  )
}

export async function getServerSideProps() {
  const response = await getPoke()
  const { results } = response
  
  return { props: { results } }
}

export default Poke