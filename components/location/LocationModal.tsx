"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import LiveMap from "./LiveMap";

export default function LocationModal({
  open,
  setOpen,
  refetch
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void
}) {

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md py-1 px-0 max-h-[80dvh] sm:max-h-[96vh] no-scrollbar overflow-y-auto overflow-x-hidden rounded-2xl">
          {/* MAP + FORM */}
          <div className="p-0">
            <LiveMap setOpen={setOpen} refetch={refetch} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}