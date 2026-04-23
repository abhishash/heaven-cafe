import { useState } from "react";

export default function AddressSearch({
  setPosition,
  setAddress,
}: {
  setPosition: (pos: [number, number]) => void;
  setAddress: (addr: any) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async (value: string) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );
    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  const handleSelect = (place: any) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    setPosition([lat, lng]);

    setAddress((prev: any) => ({
      ...prev,
      address: place.display_name,
      lat,
      lng,
    }));

    setResults([]);
    setQuery(place.display_name);
  };

  return (
    <div className="absolute top-1 left-3 right-2 z-[1000]">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <input
          value={query}
          onChange={(e) => searchLocation(e.target.value)}
          placeholder="Search address..."
          className="w-full px-4 py-2 text-sm outline-none"
        />

        {loading && (
          <div className="px-4 py-2 text-xs text-gray-400">
            Searching...
          </div>
        )}

        {results.length > 0 && (
          <div className="max-h-60 overflow-y-auto border-t">
            {results.map((item, i) => (
              <div
                key={i}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 text-xs cursor-pointer hover:bg-gray-100"
              >
                {item.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}