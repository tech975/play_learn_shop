import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCoaches } from "../../../features/coach/coachBookingSlice";
import Navbar from "../../../components/Navbar";
import HeroSlider from "../../public/HeroSlider";
import { sports } from "../../../cluster/sportsData";
import SportsCard from "../../public/SportsCard";

const CoachList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { coaches, loading, error } = useSelector((state) => state.coaches);

  // Filters for sport/location
  const [filters, setFilters] = useState({
    sport: null,
    location: "",
  });

  useEffect(() => {
    dispatch(fetchCoaches(filters));
  }, [dispatch, filters]);

  return (
    <div className="md:px-24 mt-16">
      <Navbar />
      <HeroSlider />

      {/* Sport Filter Buttons */}
      <div className="max-w-6xl mx-auto px-4 py-12 mb-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Explore Multiple Sports
        </h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {/* All button */}
          <div
            onClick={() => setFilters({ ...filters, sport: null })}
            className="bg-gray-800 text-white flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            All
          </div>

          {/* Sport filter buttons */}
          {sports.map((sport) => (
            <div
              key={sport.id}
              onClick={() => setFilters({ ...filters, sport: sport.name })}
              className={`cursor-pointer ${filters.sport === sport.name ? "ring-4 ring-[#00df9a]" : ""
                }`}
            >
              <SportsCard {...sport} />
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center mt-8">
          <Searchbar
            placeholder={"Search venues or locations..."}
            customIcon={true}
            onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
         />
        </div> */}
      </div>

      {/* Coach Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer px-4">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">Loading coaches...</p>
        ) : error ? (
          <p className="text-red-500 col-span-full text-center">{error}</p>
        ) : coaches.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No coaches found</p>
        ) : (
          coaches.map((coach) => (
            <div
              key={coach._id}
              onClick={() => navigate(`./${coach._id}`)}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              {/* Image */}
              {coach.media?.gallery?.length > 0 ? (
                <img
                  src={coach.media.gallery[0]}
                  alt={coach.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Name + Sport + Rating */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800">{coach.name}</h2>
                {coach.rating ? (
                  <span className="text-yellow-500 font-semibold text-sm">
                    ⭐ {coach.rating.toFixed(1)}
                  </span>
                ) : null}
              </div>

              {/* Sport */}
              <p className="text-gray-600 text-sm mb-1">Sport: {coach.sport}</p>

              {/* Location */}
              <p className="text-gray-600 text-sm mb-3">
                Location: {coach.location?.address}, {coach.location?.city}
              </p>

              {/* Price */}
              <p className="text-gray-800 font-semibold mt-2">
                ₹{coach.pricing?.amount} / {coach.pricing?.type}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default CoachList;
