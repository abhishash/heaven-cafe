"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setTableNumber } from "@/lib/redux/slice/orderTypeSlice";
import { RootState } from "@/lib/redux/store";

export default function TableNumber({ setOpen, open }: { setOpen: (value: boolean) => void, open: boolean }) {
  const [tableInput, setTableInput] = useState("");
  const tableNumber = useSelector((state: RootState) => state.orderType?.tableNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tableNumber) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [tableNumber]);

  const handleSubmit = () => {
    if (!tableInput) return;
    dispatch(setTableNumber(tableInput));

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <Image
              src="/favicon.png"
              alt="logo"
              width={90}
              height={60}
              priority
            />

            <p className="text-xl font-semibold text-primary">
              Welcome 👋
            </p>

            <p className="text-sm text-muted-foreground">
              Enter your table number to continue
            </p>
          </DialogTitle>
        </DialogHeader>

        {/* INPUT */}
        <div className="flex flex-col gap-3 mt-3">
          <input
            type="number"
            placeholder="e.g. Table 12"
            value={tableInput}
            onChange={(e) => setTableInput(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            onClick={handleSubmit}
            className="bg-primary cursor-pointer text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition"
          >
            Confirm Table
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}