const CmsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 animate-pulse">

            {/* Column Skeleton */}
            {[1, 2, 3].map((col) => (
                <div key={col} className="space-y-4">

                    {/* Category Title */}
                    <div className="h-5 w-24 bg-gray-300 rounded"></div>

                    {/* Links */}
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-4 w-32 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>

                </div>
            ))}

        </div>
    )
}

export default CmsSkeleton