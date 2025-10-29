import React, { useMemo, useState, useCallback } from 'react';
import SearchForm from '../components/SearchForm';
import ItemList from '../components/ItemList';
import ItemDetails from '../components/ItemDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';
import { fetchPokemonList, fetchPokemonDetailsByUrl } from '../services/api';

const POKEMON_YELLOW = '#FFCB05';
const POKEMON_BLUE = '#3C5AA6';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { data: list, loading, error } = useFetch(() => fetchPokemonList(151, 0), []);

  const items = useMemo(() => {
    if (!list) return [];
    return list
      .map((p) => {
        const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
        const id = idMatch ? idMatch[1] : null;
        const image = id
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          : null;
        return { name: p.name, url: p.url, image };
      })
      .filter(Boolean);
  }, [list]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase().trim();
    return items.filter((it) => it.name.includes(q));
  }, [items, query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleSelect = useCallback(async (pokemon) => {
    setSelected({ loading: true });
    try {
      const details = await fetchPokemonDetailsByUrl(pokemon.url);
      setSelected(details);
    } catch (err) {
      setSelected({ error: true });
    }
  }, []);

  const handleCloseDetails = () => setSelected(null);
  const handleSubmit = (e) => {
    e?.preventDefault();
    setPage(1);
  };
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <main className="w-full min-h-screen p-4 bg-gradient-to-b from-red-600 via-yellow-100 to-white flex flex-col font-sans">
      <header className="mb-4 text-center">
        {}
        <div className="flex items-center justify-center mb-1">
          <div className="relative w-14 h-14 rounded-full border-4 border-black overflow-hidden shadow-md">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
            <div className="absolute top-1/2 left-0 w-full h-[5px] bg-black transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-white border-4 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {}
        <img
          src="/img/unnamed.png" 
          alt="Pokédex dos Guri"
          className="mx-auto w-[270px] md:w-[370px] drop-shadow-[2px_2px_0px_#3C5AA6]"
          style={{
            filter: 'drop-shadow(2px 2px 0 #3C5AA6)',
            marginTop: '-10px', 
          }}
        />

    
      </header>

      <section className="w-full max-w-lg mx-auto mb-6">
        <SearchForm value={query} onChange={setQuery} onSubmit={handleSubmit} />
      </section>

      <section className="flex-1">
        {loading && <LoadingSpinner />}
        {error && (
          <p className="text-center text-red-700 font-semibold">
            Erro ao carregar lista.
          </p>
        )}
        {!loading && !error && (
          <ItemList items={paginatedItems} onSelect={handleSelect} />
        )}
      </section>

      {!loading && !error && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {selected &&
        (selected.loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-xl font-semibold text-gray-700">
              Carregando Pokémon...
            </div>
          </div>
        ) : selected.error ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-xl font-semibold text-red-600">
              Erro ao carregar detalhes.
            </div>
          </div>
        ) : (
          <ItemDetails data={selected} onClose={handleCloseDetails} />
        ))}
    </main>
  );
}
