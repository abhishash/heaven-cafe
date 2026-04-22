'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';

export interface SearchResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export default function AddressSearch() {
  const map = useMap(); // ✅ requires inside MapContainer

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [show, setShow] = useState(false);

  const searchLocation = useCallback(async (q: string) => {
    if (q.length < 3) {
      setResults([]);
      setShow(false);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`
      );

      const data = await res.json();

      const formatted = data.map((item: any) => ({
        name: item.display_name.split(',')[0],
        address: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));

      setResults(formatted);
      setShow(true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchLocation(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, searchLocation]);

  const handleSelect = (place: SearchResult) => {
    setQuery(place.name);
    setShow(false);

    map.flyTo([place.lat, place.lng], 16);
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] w-[300px] bg-white rounded-xl shadow-lg p-2">
      
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg outline-none"
      />

      {show && results.length > 0 && (
        <div className="mt-2 max-h-60 overflow-auto">
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => handleSelect(r)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {r.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}