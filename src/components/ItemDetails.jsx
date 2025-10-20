import React from 'react';

export default function ItemDetails({ data, onClose }) {
  if (!data) return null;

  const { name, sprites, types, height, weight, abilities, stats } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full overflow-auto animate-fadeIn">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="capitalize text-2xl font-bold">{name}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-lg">✕</button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <img
              src={sprites?.other?.['official-artwork']?.front_default || sprites?.front_default}
              alt={name}
              className="w-40 h-40 object-contain"
            />
            <div className="mt-4 flex gap-2 flex-wrap">
              {types.map((t) => (
                <span key={t.type.name} className="px-2 py-1 bg-gray-100 rounded text-sm capitalize">{t.type.name}</span>
              ))}
            </div>
          </div>

          <div>
            <p><strong>Altura:</strong> {height / 10} m</p>
            <p><strong>Peso:</strong> {weight / 10} kg</p>

            <div className="mt-4">
              <h4 className="font-semibold">Habilidades</h4>
              <ul className="list-disc ml-5">
                {abilities.map((a) => <li key={a.ability.name} className="capitalize">{a.ability.name}</li>)}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Status</h4>
              <ul className="ml-0">
                {stats.map((s) => (
                  <div key={s.stat.name} className="flex items-center gap-2 mt-2">
                    <div className="w-24 text-sm capitalize">{s.stat.name}</div>
                    <div className="flex-1 bg-gray-100 rounded h-3 overflow-hidden">
                      <div className="h-3 bg-indigo-500" style={{ width: `${(s.base_stat / 200) * 100}%` }} />
                    </div>
                    <div className="w-10 text-right text-sm">{s.base_stat}</div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 border-t text-right">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-50">Fechar</button>
        </div>
      </div>
    </div>
  );
}