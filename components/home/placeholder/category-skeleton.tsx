const CategorySkeleton = ({ length = 4, title }: { length?: number, title: string }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl px-2 sm:text-3xl text-primary font-bold">
                {title}
            </h2>
            <div className="grid grid-cols-2 gap-4">

                {[...Array(length)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow p-4 flex flex-col items-center animate-pulse"
                    >
                        {/* Image Skeleton */}
                        <div className="w-24 h-24 rounded-sm bg-primary/50 mb-3"></div>

                        {/* Bottom Title */}
                        <div className="h-4 w-20 bg-primary/50 rounded"></div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default CategorySkeleton;