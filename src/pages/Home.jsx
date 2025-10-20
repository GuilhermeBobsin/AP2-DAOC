import React, { useMemo, useState, useCallback } from 'react';
import SearchForm from '../components/SearchForm';
import ItemList from '../components/ItemList';
import ItemDetails from '../components/ItemDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';
import { fetchPokemonList, fetchPokemonDetailsByUrl } from '../services/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { data: list, loading, error } = useFetch(
    () => fetchPokemonList(151, 0),
    []
  );

  const items = useMemo(() => {
    if (!list) return [];
    return list.map((p) => {
      const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
      const id = idMatch ? idMatch[1] : null;
      const image = id
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        : null;
      return { name: p.name, url: p.url, image };
    }).filter(Boolean);
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
    <main className="w-full min-h-screen p-4 bg-gray-50 flex flex-col">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Pokedéx dos guris</h1>
        <p className="text-gray-600 mt-1">Clique em algum pokemon para saber mais.</p>
      </header>

      <section className="w-full mb-4">
        <SearchForm value={query} onChange={setQuery} onSubmit={handleSubmit} />
      </section>

      <section className="w-full">
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">Erro ao carregar lista.</p>}
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

      {selected && (selected.loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow">Carregando...</div>
        </div>
      ) : selected.error ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow">Erro ao carregar detalhes.</div>
        </div>
      ) : (
        <ItemDetails data={selected} onClose={handleCloseDetails} />
      ))}
    </main>

  );
}
