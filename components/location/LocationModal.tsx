"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("../LiveMap"), {
  ssr: false,
});

export default function LocationModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [address, setAddress] = useState<any>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md py-1  px-0 max-h-[96vh] no-scrollbar overflow-y-auto overflow-x-hidden rounded-2xl">

        {/* MAP + FORM */}
        <div className="p-0">
          <LiveMap setAddress={setAddress} />
        </div>
      </DialogContent>
    </Dialog>
  );
}