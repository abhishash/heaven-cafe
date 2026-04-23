'use client';

import { useState } from 'react';

export default function AddressForm({ baseAddress, coords }) {
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [type, setType] = useState<'home' | 'work' | 'other'>('home');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    if (!flat) {
      alert('Flat / House No. is required');
      return;
    }

    const payload = {
      flat,
      area,
      landmark,
      type,
      phone,
      address: baseAddress,
      lat: coords.lat,
      lng: coords.lng,
    };

    localStorage.setItem('deliveryAddress', JSON.stringify(payload));

    console.log('Saved Address:', payload);
  };

  return (
    <div className="p-4 border rounded-lg mt-4 bg-white">
      <h3 className="font-semibold mb-2">Complete Address</h3>

      <input
        placeholder="Flat / House No. *"
        value={flat}
        onChange={(e) => setFlat(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        placeholder="Area / Street"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        placeholder="Landmark (optional)"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      {/* Address Type */}
      <div className="flex gap-2 my-2">
        {['home', 'work', 'other'].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as any)}
            className={`px-3 py-1 rounded border ${
              type === t ? 'bg-green-600 text-white' : ''
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Auto detected address */}
      <div className="text-sm text-gray-600 mb-2">
        📍 {baseAddress}
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Save Address
      </button>
    </div>
  );
}