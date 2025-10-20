const BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 151, offset = 0) {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Erro ao buscar lista de pokemons');
  const data = await res.json();
  return data.results;
}

export async function fetchPokemonDetailsByUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar detalhes do pokemon');
  const data = await res.json();
  return data;
}

export async function fetchPokemonDetailsByName(name) {
  const res = await fetch(`${BASE}/pokemon/${name}`);
  if (!res.ok) throw new Error('Erro ao buscar detalhes do pokemon');
  const data = await res.json();
  return data;
}
