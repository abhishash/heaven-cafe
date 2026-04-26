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
import L from "leaflet";
import { useAddNewAddressMutation } from "@/store/services/address-api";
import AddressSearch from "./AddressSearch";
import { toast } from "sonner";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

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
const Input = ({ errors, ...props }: any) => (
  <input
    {...props}
    className={`w-full px-4 py-3 border rounded-xl bg-white shadow-sm 
    focus:outline-none focus:ring-2 transition text-sm
    ${errors
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-primary/40"
      }`}
  />
);

export default function LiveMap({
  setOpen,
  refetch
}: {
  setOpen: (val: boolean) => void;
  refetch?: () => void
}) {
  const [position, setPosition] = useState<[number, number]>([
    28.6139, 77.209,
  ]);

  const [address, setAddressState] = useState({
    person: "",
    contact: "",
    street: "",
    landmark: "",
    address_type: "Home",
    address: "",
    lat: 0,
    lng: 0,
  });
  const [errors, setErrors] = useState<any>({});

  const [addAddress, { isLoading }] = useAddNewAddressMutation();

  const validate = () => {
    let newErrors: any = {};

    if (!address.person.trim()) {
      newErrors.person = "Person name is required";
    }

    if (!address.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(address.contact)) {
      newErrors.contact = "Enter valid 10-digit number";
    }

    if (!address.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!address.address) {
      newErrors.address = "Location is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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
    });
  }, []);

  const updateField = (key: string, value: string) => {
    const updated = { ...address, [key]: value };
    setAddressState(updated);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await addAddress({
      ...address,
      lat: position[0],
      lng: position[1],
      is_default: true,
    }).then((res) => {
      toast.success("Address saved successfully!");
      refetch && refetch()
    }).catch((error) => {
      console.log(error);
    }).finally(() => {

      setOpen(false);
    });
    // toast.success("Address saved successfully!");

  }


  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 🗺️ MAP SECTION */}
      <div className="h-[200px] sticky top-0 z-10 w-full p-2 bg-gray-50">
        <div className="h-full relative w-full rounded-2xl overflow-hidden shadow-lg border relative">
          {/* 🔍 SEARCH BAR */}
          <AddressSearch
            setPosition={setPosition}
            setAddress={setAddressState}
          />
          <MapContainer
            center={position}
            zoom={15}
            attributionControl={false}
            className="w-full h-full cursor-grab active:cursor-grabbing"
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
        </div>
      </div>

      {/* 📍 ADDRESS CARD */}
      <div className="px-4">
        <div className="bg-white border shadow-sm rounded-2xl py-2 px-4">
          <p className="text-xs text-gray-500 mb-1">Selected Area</p>
          <p className="text-xs font-medium text-gray-800 leading-snug">
            {address.address || "Detecting location..."}
          </p>
        </div>
      </div>

      {/* 🧾 FORM */}
      <div className="flex-1 no-scrollbar overflow-y-auto px-4 mt-4 space-y-2">
        <div className="flex gap-x-2 mt-0.5">
          <Input
            placeholder="Person Name"
            value={address.person}
            onChange={(e: any) => updateField("person", e.target.value)}
            errors={errors.person}
          />

          <Input
            placeholder="contact Number"
            value={address.contact}
            onChange={(e: any) => updateField("contact", e.target.value)}
            errors={errors.contact}
          />
        </div>
        <Input
          placeholder="Street Address"
          value={address.street}
          onChange={(e: any) => updateField("street", e.target.value)}
          errors={errors.street}
        />

        <Input
          placeholder="Landmark (optional)"
          value={address.landmark}
          onChange={(e: any) => updateField("landmark", e.target.value)}
          errors={errors.landmark}
        />

        {/* SELECT */}
        <div className="flex gap-2">
          {[
            { label: "Home", icon: "🏠" },
            { label: "Work", icon: "💼" },
            { label: "Other", icon: "📍" },
          ].map((item) => {
            const active = address.address_type === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => updateField("address_type", item.label)}
                className={`flex-1 cursor-pointer flex items-center justify-center gap-1 px-4 py-2 rounded-xl border text-sm transition
          ${active
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-700 border-gray-300"
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 cursor-pointer bg-primary text-white rounded-xl shadow-md active:scale-95 transition"
        > {
            isLoading ? "Saving..." : "Save Address"
          }
        </button>
      </div>
    </div>
  );
}