const LoadingCard = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 animate-pulse rounded-xl ${className}`}>
      <div className="h-48 bg-gray-300 rounded-t-xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
