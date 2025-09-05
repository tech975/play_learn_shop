import { MapPin, Star, Clock } from "lucide-react";

const VenueCard = ({ venue, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {venue.media?.gallery?.length > 0 ? (
          <img
            src={venue.media.gallery[0]}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-lg">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        {venue.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-800">{venue.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{venue.name}</h3>
          <div className="text-right">
            <p className="text-[#00df9a] font-bold text-lg">₹{venue.price}/hr</p>
            {/* <p className="text-gray-500 text-xs">per {venue.pricing?.type}</p> */}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm line-clamp-1">
            {venue.location}
          </span>
        </div>

        {/* Sports */}
        <div className="flex flex-wrap gap-1 mb-3">
          {venue.sports?.slice(0, 3).map((sport, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {sport}
            </span>
          ))}
          {venue.sports?.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              +{venue.sports.length - 3} more
            </span>
          )}
        </div>

        {/* Timing */}
        <div className="flex items-center text-gray-600">
          <Clock size={14} className="mr-1" />
          <span className="text-sm">
            {venue.timing?.open} - {venue.timing?.close}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
