"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import Image from "next/image";
import { motion } from "framer-motion";
import { Armchair, Truck } from "lucide-react";
import { toggleOrderType } from "@/lib/redux/slice/orderTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function OrderTypeModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isDineIn = useSelector((state: RootState) => state.orderType.isDineIn);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenOrderTypeModal");

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 3000); // 3 seconds delay
  
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = () => {
    localStorage.setItem("hasSeenOrderTypeModal", "true");
    setOpen(false);
  };

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-1">
            <Image
              src="/favicon.png"
              alt="logo"
              width={110}
              height={70}
              priority
            />

            <p className="text-xl font-semibold text-primary">
              Welcome Back 👋
            </p>

            <p className="text-sm text-muted-foreground">
              Choose how you'd like to enjoy your meal
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 mt-1">

          {/* DINING */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { dispatch(toggleOrderType()); handleOpenChange(); }}
            className={`relative flex-1 text-xl cursor-pointer items-center flex px-3 py-1.5 rounded-lg border transition-all duration-300
        ${isDineIn
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-primary border-primary hover:bg-primary/10"
              }`}
          >
            <Armchair className="size-12 stroke-1" />
            <div className="flex flex-col">
              <p> Dining Table</p>
              <span className="text-xs opacity-80">
                Enjoy at restaurant
              </span>
            </div>

            {/* Active Glow */}
            {isDineIn && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-primary -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>

          {/* DELIVERY */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { dispatch(toggleOrderType()); handleOpenChange(); }}
            className={`relative flex-1 gap-x-1 text-xl cursor-pointer items-center flex p-3 rounded-lg border transition-all duration-300
        ${!isDineIn
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-primary border-primary hover:bg-primary/10"
              }`}
          >
            <Truck className="size-12 stroke-1" />
            <div className="flex flex-col items-start">
              <p>Delivery</p>
              <span className="text-xs opacity-80">
                Order to your doorstep
              </span>
            </div>

            {!isDineIn && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-primary -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}