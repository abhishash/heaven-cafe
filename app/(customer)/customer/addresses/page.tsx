"use client";

import { useState } from "react";
import { mockAddresses } from "@/lib/mockData";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { AddressCard } from "@/components/customer/AddressCard";
import { Coffee, MapPin, MessageCircle, Plus, RotateCcw } from "lucide-react";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from "@/store/services/api";
import { AddressResponse } from "@/lib/types";
import LocationModal from "@/components/location/LocationModal";

export default function AddressesPage() {
  const [addressess, setAddresses] = useState(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const { data, isLoading } = useGetAddressesQuery<{
    data: AddressResponse;
    isLoading: boolean;
  }>(null);
  const addresses = data?.data || [];
  const [open, setOpen] = useState(false);

  const [deleteAddress] = useDeleteAddressMutation();

  const handleDelete = async (id: number) => {
    const result = await deleteAddress(id);
    console.log(result);
  };

  const handleEdit = () => {
    // In a real app, this would open an edit modal/form
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
    // In a real app, this would save the address
  };

  return (
    <div className="px-4 mt-10 sm:mt-0">
      {/* Header */}
      <div className="mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
          Delivery Addresses
        </h1>
        <p className="text-base text-muted-foreground">
          Manage your delivery addresses for faster checkout
        </p>
      </div>

      <div>
        <button
          onClick={() => setOpen(true)}
          className="w-full mb-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 sm:py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
        <LocationModal open={open} setOpen={setOpen} />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        //  {/* Addresses List */}
        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <main className="bg-gradient-to-b from-secondary via-secondary to-white flex items-center justify-center px-4 py-8">
              <div className="w-full max-w-xl">
                {/* Decorative Icon Section */}
                <div className="flex justify-center mb-4 sm:mb-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-xl opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-8 shadow-2xl">
                      <MapPin className="sm:w-14 h-10 w-10 sm:h-14 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Main Content Card */}
                <div className=" rounded-3xl shadow-none sm:shadow-2xl overflow-hidden">
                  <div className="p-0 sm:p-8 md:p-10 space-y-6">
                    {/* Heading */}
                    <p className="text-orange-600 text-2xl text-center sm:text-4xl font-semibold">
                      Address not Found.
                    </p>

                    {/* Main Description */}
                    <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed">
                      Add a delivery address to get started. This helps us show accurate delivery options and faster checkout.
                    </p>

                    {/* Helpful Actions Box */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-100 rounded-2xl p-6 space-y-4">
                      <h2 className="font-bold text-gray-900 text-center text-lg">How can we help?</h2>

                      {/* Action Items */}
                      <div className="space-y-3">
                        {/* Try Different Address */}
                        <div className="flex gap-4 items-start p-4 bg-white rounded-xl hover:bg-orange-50 transition-colors duration-200">
                          <div className="bg-orange-100 rounded-lg p-2.5 flex-shrink-0">
                            <RotateCcw className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Try another address</p>
                            <p className="text-xs sm:text-sm text-gray-600">Enter a nearby location in our delivery zone</p>
                          </div>
                        </div>

                        {/* Get Notified */}
                        <div className="flex gap-4 items-start p-4 bg-white rounded-xl hover:bg-orange-50 transition-colors duration-200">
                          <div className="bg-orange-100 rounded-lg p-2.5 flex-shrink-0">
                            <MessageCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Get notified when we arrive</p>
                            <p className="text-xs sm:text-sm text-gray-600">We&apos;ll let you know as soon as we expand to your area</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-blue-50 border-l-4 mx-2 border-blue-400 p-4 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">💡 Tip:</span> Try entering a nearby neighborhood or office address that might be within our zone.
                      </p>
                    </div>
                  </div>                  
                </div>
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
}
