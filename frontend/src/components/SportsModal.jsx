import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { X, User, Users, Play } from "lucide-react";

const SportsModal = ({ isOpen, onClose, selectedSport }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleOptionClick = (option) => {
    if (!user) {
      // Redirect to login with next route
      const nextRoute = option === "coach" ? "/user/bookings/coach" : "/user/bookings/turf";
      navigate("/login", { state: { nextRoute } });
    } else {
      // Navigate directly to the appropriate page
      if (option === "coach") {
        navigate("/user/bookings/coach");
      } else if (option === "play") {
        navigate("/user/bookings/turf");
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00df9a] to-[#00b87d] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-2">Choose Your Path</h2>
          <p className="text-white/90">What would you like to do with {selectedSport}?</p>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          {/* Coach Option */}
          <button
            onClick={() => handleOptionClick("coach")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <User size={24} />
              <div className="text-left">
                <h3 className="font-semibold text-lg">Find a Coach</h3>
                <p className="text-blue-100 text-sm">Learn from professional trainers</p>
              </div>
            </div>
          </button>

          {/* Play Option */}
          <button
            onClick={() => handleOptionClick("play")}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <Play size={24} />
              <div className="text-left">
                <h3 className="font-semibold text-lg">Book a Venue</h3>
                <p className="text-green-100 text-sm">Find and book sports venues</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-gray-600 text-sm">
            {!user ? "Please login to continue" : "Select an option to proceed"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SportsModal;
