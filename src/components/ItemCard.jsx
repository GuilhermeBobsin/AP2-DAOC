import React from 'react';

export default function ItemCard({ pokemon, onSelect }) {
  return (
    <button
      onClick={() => onSelect(pokemon)}
      className="relative bg-white border-4 border-red-500 rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center gap-3 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out group"
    >
      {}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:rotate-12 transition-transform duration-300">
        {}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>
        {}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
        {}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-black transform -translate-y-1/2"></div>
        {}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-black transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
      </div>

      {pokemon.image ? (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain mt-4 drop-shadow-md group-hover:drop-shadow-lg transition-all"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center mt-4">
          <span className="text-xs text-gray-400">sem imagem</span>
        </div>
      )}

      <h3 className="capitalize font-bold text-gray-800 text-lg tracking-wide drop-shadow-sm">
        {pokemon.name}
      </h3>

      {}
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-red-500 rounded-b-xl border-t-4 border-white"></div>
    </button>
  );
}
