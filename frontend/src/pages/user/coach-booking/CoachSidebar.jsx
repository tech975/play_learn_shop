import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from 'react-calendar';
import { bookCoachSlot, getCoachSlots } from '../../../features/coach/coachBookingSlice';

const CoachSidebar = ({ isOpen, onClose, coach, price }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { token } = useSelector((state) => state.auth.user || {});
  const { slots, loading, error } = useSelector((state) => state.coaches);
  
  const formatDateForBackend = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formattedDate = useMemo(
    () => (selectedDate ? formatDateForBackend(selectedDate) : null),
    [selectedDate]
  );

useEffect(() => {
  dispatch(getCoachSlots({ coachId: coach?._id, date: formattedDate }));
}, [dispatch, coach?._id, formattedDate]);

  const handleSlotClick = useCallback(
    (slotId) => {
      setSelectedSlots((prev) =>
        prev.includes(slotId)
          ? prev.filter((id) => id !== slotId)
          : [...prev, slotId]
      );
    },
    []
  );

  const handleBookNow = async () => {
    if (selectedSlots.length === 0) return;
    setBookingLoading(true);
    try {
      await dispatch(bookCoachSlot({ slotIds: selectedSlots })).unwrap();
      alert("Booking confirmed!");
      setSelectedSlots([]);
      onClose();
    } catch (error) {
      alert(error || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl p-6 overflow-y-auto z-50"
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold mb-4">Book {coach.name}</h2>
          <p className="mb-2">Price: ₹{price}</p>

          {/* Calendar */}
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            className="mb-4"
          />

          {/* Slots */}
          <div>
            <h3 className="font-semibold mb-2">Available Slots</h3>
            {/* {loading && <p>Loading slots...</p>} */}
            {/* {error && <p className="text-red-500">{error}</p>} */}
            {!loading && slots?.length === 0 && (
              <p className="text-gray-500">No slots available for this date.</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {slots?.map((slot) => {
              const isSelected = selectedSlots.includes(slot._id); // ✅ check if slot is selected
              const isBooked = slot.status === "booked";

              return (
                <button
                  key={slot._id}
                  onClick={() => !isBooked && handleSlotClick(slot._id)}
                  disabled={isBooked}
                  className={`p-2 rounded-lg border ${
                    isBooked
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : isSelected   // ⚡ use here
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {slot.startISO?.slice(11,16)} - {slot.endISO?.slice(11,16)}
                  {/* {isBooked && " (Booked)"} */}
                </button>
              );
            })}

            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookNow}
            disabled={selectedSlots.length === 0}
            className={`mt-6 w-full py-2 rounded-lg ${
              selectedSlots.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Pay to confirm
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CoachSidebar