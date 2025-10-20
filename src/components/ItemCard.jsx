import React from 'react';

export default function ItemCard({ pokemon, onSelect }) {
  return (
    <button
      onClick={() => onSelect(pokemon)}
      className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center gap-2 hover:scale-105 transform transition duration-200 focus:outline-none"
    >
      {pokemon.image ? (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-20 h-20 object-contain"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-xs text-gray-400">sem imagem</span>
        </div>
      )}
      <h3 className="capitalize font-semibold text-center">{pokemon.name}</h3>
    </button>
  );
}
