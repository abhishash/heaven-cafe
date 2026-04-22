'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MapPicker from '@/components/MapPicker';

export default function LocationModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Select Delivery Location
          </DialogTitle>
        </DialogHeader>

        {/* 🗺️ Map Picker */}
        <div className="mt-2">
          <MapPicker />
        </div>
      </DialogContent>
    </Dialog>
  );
}