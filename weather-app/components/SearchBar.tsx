'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    router.push(`/search?name=${encodeURIComponent(city.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 px-5 py-4 rounded-xl bg-white/95 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-white shadow-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-4 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  );
}
