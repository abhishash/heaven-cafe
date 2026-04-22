'use client';

import { useEffect, useState } from 'react';
import AddressForm from './pop-up/address-form';
import L from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';

// 🔧 Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultCenter = {
    lat: 28.6139,
    lng: 77.2090,
};

// 📍 Handle map movement
function MapEvents({ setCenter, fetchAddress }: any) {
    useMapEvents({
        moveend(e) {
            const map = e.target;
            const center = map.getCenter();

            const lat = center.lat;
            const lng = center.lng;

            setCenter({ lat, lng });
            fetchAddress(lat, lng);
        },
    });

    return null;
}



export default function MapPicker() {
    const [center, setCenter] = useState(defaultCenter);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    // 🌍 Reverse geocoding (FREE)
    const fetchAddress = async (lat: number, lng: number) => {
        try {
            setLoading(true);

            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();

            setAddress(data.display_name || '');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detectLocation();
    }, []);

    // 📍 Detect current location
    const detectLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                setCenter({
                    lat: latitude,
                    lng: longitude,
                });

                fetchAddress(latitude, longitude);
            },
            () => {
                alert('Permission denied');
            }
        );
    };

    return (
        <div className="relative">
            {/* 📍 Button */}
            <button
                onClick={detectLocation}
                className="mb-2 px-3 py-1 bg-blue-600 text-white rounded"
            >
                Use my location
            </button>

            <MapContainer
                center={center}
                zoom={15}
                style={{ width: '100%', height: '400px', zIndex: 0 }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapEvents setCenter={setCenter} fetchAddress={fetchAddress} />

                {/* ✅ REAL PIN */}
                <Marker position={center} />
            </MapContainer>

            {/* 📍 Fixed center pin */}
            <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-[100%] text-4xl pointer-events-none drop-shadow-lg">
                📍
            </div>

            {/* 🧠 Address Preview */}
            <div className="mt-2 text-sm text-gray-700">
                {loading ? 'Fetching address...' : address}
            </div>

            {/* 📦 Address Form */}
            <AddressForm baseAddress={address} coords={center} />
        </div>
    );
}