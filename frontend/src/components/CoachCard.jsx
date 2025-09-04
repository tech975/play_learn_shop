import { MapPin, Star, Award } from "lucide-react";

const CoachCard = ({ coach, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
    >
      
      <div className="relative h-48 overflow-hidden">
        {coach.media?.gallery?.length > 0 ? (
          <img
            src={coach.media.gallery[0]}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <span className="text-blue-600 text-lg font-semibold">{coach.name?.charAt(0)}</span>
          </div>
        )}
        
        {/* Rating Badge */}
        {coach.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-800">{coach.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{coach.name}</h3>
          <div className="text-right">
            <p className="text-[#00df9a] font-bold text-lg">₹{coach.pricing?.amount}</p>
            <p className="text-gray-500 text-xs">per {coach.pricing?.type}</p>
          </div>
        </div>

        {/* Sport */}
        <div className="flex items-center text-blue-600 mb-2">
          <Award size={14} className="mr-1" />
          <span className="text-sm font-medium">{coach.sport}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm line-clamp-1">
            {coach.location?.address}, {coach.location?.city}
          </span>
        </div>

        {/* Experience */}
        {coach.experience && (
          <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full inline-block">
            {coach.experience} years experience
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachCard;
