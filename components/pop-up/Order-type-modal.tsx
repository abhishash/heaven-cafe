"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Armchair, Truck } from "lucide-react";

export default function OrderTypeModal() {
  const [open, setOpen] = useState(false);
  const [orderType, setOrderType] = useState<string | null>(null);

  // Check localStorage on page load
  useEffect(() => {
    const storedType = localStorage.getItem("orderType");

    if (storedType) {
      setOrderType(storedType);
      setOpen(false); // don't show modal
    } else {
      // open modal after 3 seconds
      const timer = setTimeout(() => {
        setOpen(true);
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, []);

  const handleSelect = (type: string) => {
    setOrderType(type);
    localStorage.setItem("orderType", type);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center flex gap-y-3 justify-center flex-col items-center">
            <Image
              src="/logo/main-logo.png"
              alt="main-logo"
              width={200}
              height={120}
            />

            <p className="text-2xl text-primary">
              Select Order Type
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleSelect("dining")}
            className="flex-1 flex-col text-xl cursor-pointer items-center flex bg-transparent border border-primary text-primary p-3 rounded-lg hover:bg-green-700 hover:text-white"
          >
            <Armchair className="size-10 stroke-1" />
            Dining Table
          </button>

          <button
            onClick={() => handleSelect("delivery")}
            className="flex-1 flex-col text-xl cursor-pointer items-center flex bg-transparent border border-primary text-primary p-3 rounded-lg hover:bg-green-700 hover:text-white"
          >
            <Truck className="size-10 stroke-1" />
            Delivery
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}