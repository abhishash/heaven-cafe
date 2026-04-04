'use client'

import { useState } from 'react'

export default function DineDeliveryToggle() {
    const [isDineIn, setIsDineIn] = useState(false)

    return (
        <div className="flex items-center justify-center gap-4">
            {/* Delivery Label */}
            <span
                className={`text-lg font-semibold transition-colors duration-300 ${!isDineIn ? 'text-secondary' : 'text-gray-400'
                    }`}
            >
                DELIVERY
            </span>

            {/* Toggle Switch */}
            <button
                onClick={() => setIsDineIn(!isDineIn)}
                className={`relative cursor-pointer inline-flex h-7 w-16 items-center rounded-full transition-colors duration-300 bg-secondary`}
                aria-label="Toggle between delivery and dine-in"
            >
                {/* Animated Circle */}
                <div
                    className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-primary shadow-md transition-transform duration-300 ${isDineIn ? 'translate-x-9' : 'translate-x-1'
                        }`}
                />
            </button>

            {/* Dine-in/Takeaway Label */}
            <span
                className={`text-lg cursor-pointer font-semibold transition-colors duration-300 ${isDineIn ? 'text-secondary' : 'text-gray-400'
                    }`}
            >
                DINE-IN/ <br /> TAKEAWAY
            </span>
        </div>
    )
}
