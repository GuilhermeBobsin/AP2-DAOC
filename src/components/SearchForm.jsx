import React from 'react';

export default function SearchForm({ value, onChange, onSubmit }) {
  return (
    <form className="flex gap-2 w-full" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nome (ex: pikachu)"
        className="flex-1 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </form>
  );
}
