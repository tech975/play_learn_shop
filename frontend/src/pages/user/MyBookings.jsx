import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../features/bookings/bookingSlice';
import Navbar from '../../components/Navbar';
import HeroSlider from '../public/HeroSlider';

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
          <li key={booking._id} className="border rounded-lg p-4 bg-white/80 text-black">
            <div><strong>Venue:</strong> {booking.venue?.name || 'N/A'}</div>
            <div><strong>Date:</strong> {booking.date}</div>
            <div><strong>Slot:</strong> {booking.slot?.time || 'N/A'}</div>
            <div><strong>Status:</strong> {booking.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;