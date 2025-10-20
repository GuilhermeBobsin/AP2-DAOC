import React from 'react';
import ItemCard from './ItemCard';

export default function ItemList({ items, onSelect }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500 p-6">Nenhum item encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
      {items.map((p) => (
        <ItemCard key={p.name} pokemon={p} onSelect={onSelect} />
      ))}
    </div>
  );
}
