export default function PaymentMethodsSkeleton() {
    return (
        <div className="space-y-4">

            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="flex items-center justify-between p-4 rounded-2xl border shadow-sm animate-pulse"
                >
                    <div className="flex items-center gap-4">

                        {/* Icon Skeleton */}
                        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>

                        {/* Text Skeleton */}
                        <div className="space-y-2">
                            <div className="w-40 h-4 bg-gray-300 rounded"></div>
                            <div className="w-28 h-3 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        {/* Badge */}
                        <div className="w-24 h-6 bg-gray-200 rounded-full"></div>

                        {/* Check Icon */}
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            ))}

        </div>
    );
}