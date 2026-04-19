const CardSkeleton = () => {
  return (
    <div className="border rounded-2xl p-4 shadow-sm animate-pulse">
      
      {/* Card Image */}
      <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>

      {/* Text Lines */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Button / Status */}
      <div className="mt-4 h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default CardSkeleton;