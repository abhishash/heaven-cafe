"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAddress } from "@/lib/types";
import { ucs2 } from "punycode";
import { useSetDefaultAddressMutation } from "@/store/services/address-api";
import { toast } from "sonner";
import LocationModal from "@/components/location/LocationModal";
import { useState } from "react";

export default function AddressPopUp({ setOpen, open, addresses, refetch }: { setOpen: (value: boolean) => void, open: boolean, addresses: UserAddress[], refetch: () => void }) {
  const [openNewAddressPopUp, setOpenNewAddressPopUp] = useState(false);
  const [setDefaultAddress, { isLoading }] = useSetDefaultAddressMutation();

  const changeAddress = async (addressId: number) => {
    await setDefaultAddress({
      address_id: addressId
    }).then((res) => {
      const response = res?.data;
      if (response?.status) {
        refetch();
        return;
      }
      toast.error(response?.message || "Something Wrong Please Try Again");

    }).catch((error) => {
      toast.error(error?.message || "Something Wrong Please Try Again");
    }).finally(() => {
      setOpen(false);
    });
  };

  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-1">

            <p className="text-xl font-semibold text-primary">
              Select Delivery Address 📍
            </p>

            <p className="text-sm text-muted-foreground">
              Choose your saved address or add a new one
            </p>

          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-3 max-h-[300px] no-scrollbar overflow-y-auto">
          {/* OTHER ADDRESSES */}
          {addresses?.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl p-3 hover:border-primary cursor-pointer ${item.is_default === 1 ? "bg-primary/10" : "bg-white"} `}
              onClick={() => changeAddress(item.id)}
            >
              <p className="text-sm font-medium truncate">
                📍 {item.address}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.person} - {item.contact}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.street}
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <button
            onClick={() => {
              setOpen(false);
              setOpenNewAddressPopUp(true);
            }}
            className="w-full border border-primary text-primary py-2.5 rounded-xl font-medium hover:bg-primary/10 transition"
          >
            + Add New Address
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <LocationModal setOpen={setOpenNewAddressPopUp} refetch={refetch} open={openNewAddressPopUp} />
    </>
  );
}