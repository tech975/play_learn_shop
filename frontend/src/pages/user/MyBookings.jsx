import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../features/bookings/bookingSlice';
import Navbar from '../../components/Navbar';
import HeroSlider from '../public/HeroSlider';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserBookings(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Navbar />
      <HeroSlider />
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}

      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking._id}
            className="border rounded-lg p-4 bg-white/80 text-black"
          >
            <div>
              <strong>Venue:</strong> {booking.venue?.name || "N/A"}
            </div>

            <div className="mt-2">
              <strong>Booking Date:</strong>{" "}
                {dayjs(booking.date).format("YYYY-MM-DD")}
            </div>

            <div className="mt-2">
              <strong>Slot Date:</strong>{" "}
              {booking.slots && booking.slots.length > 0
                ? dayjs(booking.slots[0].date).format("YYYY-MM-DD")
                : "N/A"}

              <div className="flex flex-wrap gap-2 mt-2">
                {booking.slots && booking.slots.length > 0 ? (
                  booking.slots.map((slot) => (
                    <button
                      key={slot._id}
                      disabled
                      className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-sm cursor-not-allowed"
                    >
                      {dayjs(slot.startTime).tz("Asia/Kolkata").format("hh:mm A")} - {dayjs(slot.endTime).tz("Asia/Kolkata").format("hh:mm A")}
                    </button>
                  ))
                ) : (
                  <span className="ml-2">No slots</span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="mt-2">
              <strong>Status:</strong> {booking.status}
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default MyBookings;