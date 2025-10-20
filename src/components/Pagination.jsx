import React from 'react';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 hover:bg-indigo-700 transition"
      >
        Anterior
      </button>
      <span className="text-gray-700 font-medium">
        Página {page} de {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 hover:bg-indigo-700 transition"
      >
        Próxima
      </button>
    </div>
  );
}
