const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 220 220"
                width="220"
                height="220"
                fill="none"
            >
                <defs>
                    <linearGradient id="bgGlow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#FDBA74" />
                        <stop offset="100%" stop-color="#F97316" />
                    </linearGradient>

                    <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#FB923C" />
                        <stop offset="100%" stop-color="#EA580C" />
                    </linearGradient>

                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow
                            dx="0"
                            dy="8"
                            stdDeviation="8"
                            flood-color="#FDBA74"
                            flood-opacity="0.45"
                        />
                    </filter>
                </defs>

                {/* <!-- Rotating Outer Ring --> */}
                <g>
                    <circle
                        cx="110"
                        cy="110"
                        r="90"
                        stroke="#FED7AA"
                        stroke-width="10"
                        stroke-dasharray="30 18"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 110 110"
                            to="360 110 110"
                            dur="6s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>

                {/* <!-- Floating Glow --> */}
                <circle
                    cx="110"
                    cy="110"
                    r="65"
                    fill="url(#bgGlow)"
                    opacity="0.12"
                >
                    <animate
                        attributeName="r"
                        values="62;68;62"
                        dur="2.2s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* <!-- Burger --> */}
                <g filter="url(#shadow)">
                    {/* <!-- Top Bun --> */}
                    <path
                        d="M65 95C65 68 86 52 110 52C134 52 155 68 155 95Z"
                        fill="#F59E0B"
                    />

                    {/* <!-- Sesame --> */}
                    <circle cx="90" cy="72" r="2.2" fill="white" />
                    <circle cx="105" cy="67" r="2.2" fill="white" />
                    <circle cx="120" cy="74" r="2.2" fill="white" />
                    <circle cx="132" cy="68" r="2.2" fill="white" />

                    {/* <!-- Lettuce --> */}
                    <path
                        d="M68 98C80 88 92 106 104 98C116 90 128 106 152 96"
                        stroke="#22C55E"
                        stroke-width="8"
                        stroke-linecap="round"
                    />

                    {/* <!-- Patty --> */}
                    <rect
                        x="72"
                        y="102"
                        width="76"
                        height="16"
                        rx="8"
                        fill="#7C2D12"
                    />

                    {/* <!-- Cheese --> */}
                    <path
                        d="M84 118H136L126 130H94Z"
                        fill="#FACC15"
                    />

                    {/* <!-- Bottom Bun --> */}
                    <rect
                        x="68"
                        y="128"
                        width="84"
                        height="18"
                        rx="9"
                        fill="#FB923C"
                    />
                </g>

                {/* <!-- Magnifying Glass --> */}
                <g>
                    <circle
                        cx="148"
                        cy="150"
                        r="24"
                        stroke="url(#glassGradient)"
                        stroke-width="8"
                        fill="rgba(255,255,255,0.65)"
                    >
                        <animate
                            attributeName="r"
                            values="22;25;22"
                            dur="1.4s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    <path
                        d="M165 167L184 186"
                        stroke="#EA580C"
                        stroke-width="10"
                        stroke-linecap="round"
                    />
                </g>

                {/* <!-- Scanning Dot --> */}
                <circle cx="85" cy="110" r="5" fill="#fff">
                    <animate
                        attributeName="cx"
                        values="82;138;82"
                        dur="1.6s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    )
}

export default Loading;