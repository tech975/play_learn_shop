import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { bookSlot } from "../../features/bookings/bookingSlice";
import { generateSlots } from "../../utils/slotUtils";

const BookingSidebar = ({ isOpen, onClose, venue, price, bookings, selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [slots, setSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Prevent past date selection
  const handleDateChange = (date) => {
    const today = new Date();
    if (date.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
      toast.error("Cannot select a past date");
      return;
    }
    setSelectedDate(date);
  };

  // Generate slots whenever date or bookings change
  useEffect(() => {
    if (!venue) return;

    // Get booked slots for the selected date
    const bookedSlots = bookings
      .filter(b => new Date(b.date).toDateString() === selectedDate.toDateString())
      .map(b => b.slot.startTime);

    const generatedSlots = generateSlots(9, 24, bookedSlots); // 9AM to 12AM
    // Add unique _id for React keys
    const slotsWithId = generatedSlots.map((s, idx) => ({
      ...s,
      _id: `${selectedDate.toDateString()}-${s.startTime}-${idx}`,
      isBooked: bookedSlots.includes(s.startTime),
    }));

    setSlots(slotsWithId);
    setSelectedSlots([]); // Reset selection when date changes
  }, [bookings, venue, selectedDate]);

  // Filter available slots
  useEffect(() => {
    setAvailableSlots(slots);
  }, [slots]);

  // Group slots by Morning / Afternoon / Evening
  const groupedSlots = {
    Morning: availableSlots.filter(s => parseInt(s.startTime.split(":")[0]) < 12),
    Afternoon: availableSlots.filter(s => parseInt(s.startTime.split(":")[0]) >= 12 && parseInt(s.startTime.split(":")[0]) < 17),
    Evening: availableSlots.filter(s => parseInt(s.startTime.split(":")[0]) >= 17),
  };

  const toggleSlotSelection = (slot) => {
    if (slot.isBooked) return; // can't select booked slot
    const exists = selectedSlots.find(s => s._id === slot._id);
    if (exists) {
      setSelectedSlots(selectedSlots.filter(s => s._id !== slot._id));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleBook = async () => {
    if (selectedSlots.length === 0) return toast.error("Select at least one slot");

    try {
      for (let slot of selectedSlots) {
        const bookingData = {
          user: user._id,
          venue: venue._id,
          slot: slot._id,
          date: selectedDate,
          amount: price,
        };
        await dispatch(bookSlot(bookingData)).unwrap();
      }
      toast.success("Slots booked successfully!");
      setSelectedSlots([]);
      onClose();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-96 h-full bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            {/* Calendar */}
            <h2 className="text-2xl font-bold mb-4">Select Date</h2>
            <div className="rounded-lg border p-2 shadow-sm mb-4">
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
              />
            </div>

            {/* Slots */}
            {["Morning", "Afternoon", "Evening"].map(period => (
              <div key={period} className="mb-4">
                <h3 className="font-semibold mb-2">{period}</h3>
                <div className="flex flex-wrap gap-2">
                  {groupedSlots[period].length > 0
                    ? groupedSlots[period].map(slot => {
                        const isSelected = selectedSlots.find(s => s._id === slot._id);
                        return (
                          <button
                            key={slot._id}
                            onClick={() => toggleSlotSelection(slot)}
                            disabled={slot.isBooked}
                            className={`px-3 py-2 rounded-lg border transition-all duration-200
                              ${slot.isBooked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
                              ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'}
                            `}
                          >
                            {slot.startTime} - {slot.endTime}
                          </button>
                        );
                      })
                    : <p className="text-gray-500 text-sm">No slots</p>
                  }
                </div>
              </div>
            ))}

            {/* Book Button */}
            <button
                className={`mt-4 w-full py-2 rounded-lg text-white transition-colors duration-200
                    ${selectedSlots.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}
                `}
                onClick={handleBook}
                disabled={selectedSlots.length === 0} // disable if no slot selected
                >
                Book Slot
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingSidebar;
