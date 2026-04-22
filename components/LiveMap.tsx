"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useAddNewAddressMutation } from "@/store/services/address-api";

/* ---------------- Recenter ---------------- */
function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15, { duration: 1.2 });
  }, [position, map]);

  return null;
}

/* ---------------- Click Handler ---------------- */
function MapClickHandler({
  setPosition,
  setAddress,
}: {
  setPosition: (pos: [number, number]) => void;
  setAddress: (addr: any) => void;
}) {
  useMapEvents({
    click: async (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPosition([lat, lng]);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();

      setAddress((prev: any) => ({
        ...prev,
        autoAddress: data.display_name || "Unknown area",
        lat,
        lng,
      }));
    },
  });

  return null;
}

/* ---------------- Input UI ---------------- */
const Input = (props: any) => (
  <input
    {...props}
    className="w-full px-4 py-3 border rounded-xl bg-white shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-black/10 
    transition text-sm"
  />
);

export default function LiveMap({
  setAddress,
}: {
  setAddress?: (addr: any) => void;
}) {
  const [position, setPosition] = useState<[number, number]>([
    28.6139, 77.209,
  ]);

  const [address, setAddressState] = useState({
    persion: "",
    contact: "",
    street: "",
    landmark: "",
    address_type: "Home",
    address: "",
    lat: 0,
    lng: 0,
  });

  const [addAddress, { isLoading }] = useAddNewAddressMutation();

  /* ---------------- GPS detect ---------------- */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setPosition([lat, lng]);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();

      setAddressState((prev) => ({
        ...prev,
        address: data.display_name,
        lat,
        lng,
      }));

      setAddress?.({
        ...address,
        address: data.display_name,
        lat,
        lng,
      });
    });
  }, []);

  const updateField = (key: string, value: string) => {
    const updated = { ...address, [key]: value };
    setAddressState(updated);
    setAddress?.(updated);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* 🗺️ MAP SECTION */}
      <div className="h-[260px] w-full p-2">
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border relative">

          <MapContainer
            center={position}
            zoom={15}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler
              setPosition={setPosition}
              setAddress={setAddressState}
            />

            <RecenterMap position={position} />

            <Marker position={position}>
              <Popup>Selected Location 📍</Popup>
            </Marker>
          </MapContainer>

          {/* 📍 Floating hint */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs shadow">
            Tap on map to select location
          </div>

        </div>
      </div>

      {/* 📍 ADDRESS CARD */}
      <div className="px-4">
        <div className="bg-white border shadow-sm rounded-2xl p-4">

          <p className="text-xs text-gray-500 mb-1">Selected Area</p>
          <p className="text-sm font-medium text-gray-800 leading-snug">
            {address.address || "Detecting location..."}
          </p>

        </div>
      </div>

      {/* 🧾 FORM */}
      <div className="flex-1 no-scrollbar overflow-y-auto px-4 mt-4 space-y-3">

        <Input
          placeholder="persion Name"
          value={address.persion}
          onChange={(e: any) => updateField("persion", e.target.value)}
        />

        <Input
          placeholder="contact Number"
          value={address.contact}
          onChange={(e: any) => updateField("contact", e.target.value)}
        />

        <Input
          placeholder="Street Address"
          value={address.street}
          onChange={(e: any) => updateField("street", e.target.value)}
        />

        <Input
          placeholder="Landmark (optional)"
          value={address.landmark}
          onChange={(e: any) => updateField("landmark", e.target.value)}
        />

        {/* SELECT */}
        <select
          value={address.address_type}
          onChange={(e) => updateField("address_type", e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-white shadow-sm text-sm"
        >
          <option value="Home">🏠 Home</option>
          <option value="Work">💼 Work</option>
          <option value="Other">📍 Other</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={async () => {
            await addAddress({
              ...address,
              lat: position[0],
              lng: position[1],
              is_default: true,
            });
          }}
          className="w-full py-3 cursor-pointer bg-primary text-white rounded-xl shadow-md active:scale-95 transition"
        >
          Save Address
        </button>

      </div>
    </div>
  );
}