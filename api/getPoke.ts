import axios from 'axios'

export const getPoke = async () => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`
  );
  return data;
}