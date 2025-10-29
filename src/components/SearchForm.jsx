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
      <button
        type="submit"
        className="relative px-5 py-2 bg-white border-4 border-red-500 rounded-full text-red-600 font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out"
      >
        {}
        <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
        Buscar
      </button>
    </form>
  );
}
