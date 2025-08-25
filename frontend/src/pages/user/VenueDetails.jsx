import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVenueDetails } from "../../features/venues/venueSlice";
import Navbar from "../../components/Navbar";
import HeroSlider from "../public/HeroSlider";
import BookingSidebar from "./BookingSidebar";
import { useState } from "react";
import axios from "../../api/axios";

const VenueDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { venue, error, loading } = useSelector((state) => state.venues);
  console.log("venue: ", venue)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(getVenueDetails(id));
  }, [dispatch, id]);

// Fetch bookings for selected date
  const fetchBookings = async (date) => {
    if (!venue) return;
    try {
      const res = await axios.get("/api/bookings", {
        params: { venueId: venue._id, date: date.toISOString() }
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings(selectedDate);
  }, [venue, selectedDate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!venue) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-24">
        <Navbar /> 
        <HeroSlider />
      {/* Venue Image */}
      {venue.image && (
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Venue Info */}
      <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
      <p className="text-gray-600 mb-4">{venue.location}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p><span className="font-semibold">Sport:</span> {venue.sport}</p>
        <p><span className="font-semibold">Price:</span> ₹{venue.price}</p>
        <p><span className="font-semibold">Status:</span> {venue.status}</p>
        <p><span className="font-semibold">Created At:</span> {new Date(venue.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Ratings */}
      <div className="mb-4">
        <p className="font-semibold">Rating: ⭐ {venue.rating} / 5</p>
        <p className="text-sm text-gray-500">({venue.numReviews} reviews)</p>
      </div>

      {/* Slots */}
      {/* {venue.slots && venue.slots.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
          <ul className="list-disc list-inside">
            {venue.slots.map((slot) => (
                <li key={slot._id}>
                {slot.date} — {slot.startTime} to {slot.endTime} 
                {slot.isBooked ? " (Booked)" : " (Available)"}
                </li>
            ))}
         </ul>
        </div>
      ) : (
        <p className="text-gray-500">No slots available</p>
      )} */}

      {/* Book Button */}
      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => setIsSidebarOpen(true)}>
        Book Now
      </button>

      {/* Sidebar */}
      {/* <BookingSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        venue={venue}
        slots={venue?.slots}
        venueId={venue?._id}
        price={venue?.price}
        bookings={bookings}
      /> */}
      <BookingSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        venue={venue}
        price={venue.price}
        bookings={bookings}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

    </div>
  );
};

export default VenueDetails;
