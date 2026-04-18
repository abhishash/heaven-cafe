'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

export default function DineDeliveryToggle() {
    const [isDineIn, setIsDineIn] = useState(false)

    // Check localStorage on page load
    useEffect(() => {
        const storedType = localStorage.getItem("orderType");

        if (storedType === "dining") {
            setIsDineIn(true);
        } else {
            setIsDineIn(false);
        }
    }, []);

    return (
        <div className="flex sm:flex-row flex-row-reverse items-center justify-start px-4 sm:justify-center gap-4">
            {/* Toggle Switch */}
            <button
                onClick={() => { setIsDineIn(!isDineIn); localStorage.setItem("orderType", isDineIn ? "delivery" : "dining"); }}
                className={`relative cursor-pointer inline-flex h-5 min-w-12 items-center rounded-full transition-colors duration-300 bg-secondary`}
                aria-label="Toggle between delivery and dine-in"
            >
                {/* Animated Circle */}
                <div
                    className={`inline-flex w-4 h-4 transform items-center justify-center rounded-full bg-primary shadow-md transition-transform duration-300 ${isDineIn ? 'translate-x-7' : 'translate-x-1'
                        }`}
                />
            </button>

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
                    {isDineIn ? "DELIVERY" : "DINE-IN / TAKEAWAY"}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}
