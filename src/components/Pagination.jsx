import React from 'react';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      {}
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="relative px-5 py-2 bg-white border-4 border-red-500 rounded-full text-red-600 font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out disabled:opacity-50 disabled:scale-100"
      >
        {}
        <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
        Anterior
      </button>

      {}
      <span className="text-gray-800 font-semibold text-lg tracking-wide">
        Página {page} de {totalPages}
      </span>

      {}
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="relative px-5 py-2 bg-white border-4 border-red-500 rounded-full text-red-600 font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out disabled:opacity-50 disabled:scale-100"
      >
        {}
        <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
        Próxima
      </button>
    </div>
  );
}
