import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues } from "../../features/venues/venueSlice";
import Navbar from "../../components/Navbar";
import HeroSlider from "../public/HeroSlider";
import Searchbar from "../../components/Searchbar";
import SportsCard from "../public/SportsCard";
import { sports } from "../../cluster/sportsData";
import { useNavigate } from "react-router-dom";



const VenueList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { venues, loading, error } = useSelector((state) => state.venues);

  console.log("venues: ", venues);

  // Filters for backend
  const [filters, setFilters] = useState({
    sport: null,
    location: "",
  });

  useEffect(() => {
    dispatch(fetchVenues(filters));
  }, [dispatch, filters]);

  return (
    <div className="md:px-24 mt-16">
      <Navbar />
      <HeroSlider />

      {/* Sports cards */}
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

      {/* Venue cards */}
      <div className="h-xl grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer px-4">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center">
            Loading venues...
          </p>
        ) : error ? (
          <p className="text-red-500 col-span-full text-center">{error}</p>
        ) : venues.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No venues found
          </p>
        ) : (
          venues.map((venue) => (
            <div
              key={venue._id}
              onClick={() => navigate(`./${venue._id}`)}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer p-2"
            >
              {/* Image Section */}
              {venue.images && venue.images.length > 0 ? (
                // <Swiper
                //   modules={[Autoplay]}
                //   autoplay={{ delay: 3000, disableOnInteraction: false }}
                //   loop
                //   className="w-full h-56m-1"  // 👈 Increased height
                //   speed={1000}
                // >
                //   {venue?.images?.map((slide, index) => (
                //     <SwiperSlide key={index}>
                //       <img
                //         src={typeof slide === "string" ? slide : slide.img}
                //         alt={venue.groundName}
                //         className="w-full h-56 object-cover rounded-2xl" t
                //       />
                //     </SwiperSlide>
                //   ))}
                // </Swiper>
                <div>
                  <img
                    src={venue && venue?.images[0]}
                    alt={venue?.groundName}
                    className="w-full h-56 object-cover rounded-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Info Section */}
              <div className="p-4">
                <div className="flex items-center mb-2 gap-2">
                  <span>Name: </span>
                  <h2 className="text-lg font-bold text-gray-800">
                    {venue.groundName}
                  </h2>
                </div>
                <div className="flex items-center">
                  <span>Price:</span>
                  <p className="text-green-600 font-semibold">₹ {venue.price} / {venue.priceType}</p>
                </div>
                {venue.rating ? (
                  <span className="text-yellow-500 font-semibold text-sm">
                    ⭐ {venue.rating.toFixed(1)}
                  </span>
                ) : null}

                {/* Location (optional) */}
                <div className="flex mb-2 gap-2">
                  <span>Location: </span>
                  <p className="text-gray-600 text-sm">{venue.groundAddress}</p>
                </div>
              </div>
            </div>
            // </div>
          ))
        )}
      </div>
    </div >
  );
};

export default VenueList;
