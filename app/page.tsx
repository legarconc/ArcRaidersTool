'use client';

import { useState } from 'react';
import { lootDb } from '@/lib/lootDb';
import { Search, CheckCircle, DollarSign, Recycle } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLoot = lootDb.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusStyles = {
    KEEP: {
      borderColor: 'border-green-500',
      textColor: 'text-green-500',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    SELL: {
      borderColor: 'border-red-500',
      textColor: 'text-red-500',
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
    },
    RECYCLE: {
      borderColor: 'border-blue-500',
      textColor: 'text-blue-500',
      icon: <Recycle className="h-5 w-5 text-blue-500" />,
    },
  };

  return (
    <main className="bg-zinc-900 min-h-screen text-white">
      <div className="sticky top-0 z-10 p-4 bg-zinc-900/80 backdrop-blur-sm">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search for loot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLoot.map((item) => {
            const styles = statusStyles[item.status];
            return (
              <div
                key={item.name}
                className={`bg-zinc-800 rounded-lg border-2 ${styles.borderColor} p-4 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`text-xl font-bold ${styles.textColor}`}>{item.name}</h2>
                    {styles.icon}
                  </div>
                  <div className="flex items-center mb-2">
                     <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${styles.textColor} bg-opacity-20`}>
                       {item.status}
                     </span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block bg-yellow-500 text-zinc-900 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.reason}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mt-4">{item.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}