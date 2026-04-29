'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import LocationModal from '../location/LocationModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOrderType } from '@/lib/redux/slice/orderTypeSlice';
import { RootState } from '@/lib/redux/store';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export default function DineDeliveryToggle() {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const isDineIn = useSelector((state: RootState) => state.orderType.isDineIn);
    const { data: session } = useSession();

    const getLocationAndOpen = () => {
        const isClosed = localStorage.getItem("locationModalClosed");

        if (isClosed === "true") return;

        navigator.geolocation.getCurrentPosition(
            () => {
                if (!session?.user?.isAddress) {
                    setOpen(true);
                }
            },
            () => {
                toast.warning("Please allow location access to continue.");
                setOpen(false);
            }
        );
    };

    useEffect(() => {
        if (isDineIn) return; // ✅ STOP for dine-in

        if (!navigator.permissions) {
            getLocationAndOpen();
            return;
        }

        navigator.permissions
            .query({ name: "geolocation" as PermissionName })
            .then((result) => {
                if (result.state === "granted" || result.state === "prompt") {
                    getLocationAndOpen();
                }
            });
    }, [isDineIn]); // ✅ important dependency

    return (
        <div className="flex sm:flex-row flex-row-reverse items-center justify-start px-4 sm:justify-center gap-4">
            {/* Toggle Switch */}
            <button
                onClick={() => {
                    dispatch(toggleOrderType());

                    const goingToDelivery = isDineIn; // because state will flip

                    if (goingToDelivery && !session?.user?.isAddress) {
                        getLocationAndOpen();
                    }
                }}
                className={`relative cursor-pointer inline-flex h-5 min-w-12 items-center rounded-full transition-colors duration-300 bg-secondary`}
                aria-label="Toggle between delivery and dine-in"
            >
                {/* Animated Circle */}
                <div
                    className={`inline-flex w-4 h-4 transform items-center justify-center rounded-full bg-primary shadow-md transition-transform duration-300 ${isDineIn ? 'translate-x-7' : 'translate-x-1'
                        }`}
                />
            </button>
            <LocationModal open={open} setOpen={(val) => {
                setOpen(val);

                // ❗ when user closes modal → save flag
                if (!val) {
                    localStorage.setItem("locationModalClosed", "true");
                }
            }} />
            {/* Dine-in/Takeaway Label */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={isDineIn ? "delivery" : "dinein"} // 🔑 important for re-render animation
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm text-nowrap text-white cursor-pointer font-semibold"
                >
                    {isDineIn ? "DINE-IN / TAKEAWAY" : "DELIVERY"}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}