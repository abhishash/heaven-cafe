'use client'

import { useEffect, useState } from 'react'

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
        <div className="flex items-center justify-normal px-4 sm:justify-center gap-4">
            {/* Delivery Label */}
            <span
                className={`text-xs sm:text-lg font-semibold transition-colors duration-300 ${!isDineIn ? 'text-primary' : 'text-secondary'
                    }`}
            >
                DELIVERY
            </span>

            {/* Toggle Switch */}
            <button
                onClick={() => { setIsDineIn(!isDineIn); localStorage.setItem("orderType", isDineIn ? "delivery" : "dining"); }}
                className={`relative cursor-pointer inline-flex h-6 sm:h-7 min-w-16 items-center rounded-full transition-colors duration-300 bg-secondary`}
                aria-label="Toggle between delivery and dine-in"
            >
                {/* Animated Circle */}
                <div
                    className={`inline-flex sm:h-6 w-5 h-5 sm:w-6 transform items-center justify-center rounded-full bg-primary shadow-md transition-transform duration-300 ${isDineIn ? 'translate-x-10 sm:translate-x-9' : 'translate-x-1'
                        }`}
                />
            </button>

            {/* Dine-in/Takeaway Label */}
            <span
                className={`text-xs sm:text-lg cursor-pointer font-semibold transition-colors duration-300 ${isDineIn ? 'text-primary' : 'text-secondary'
                    }`}
            >
                DINE-IN/ <br className="hidden sm:block" /> TAKEAWAY
            </span>
        </div>
    )
}
