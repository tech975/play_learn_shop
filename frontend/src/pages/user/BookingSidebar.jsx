import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { bookSlot, fetchSlotsByVenue } from "../../features/bookings/bookingSlice";

const BookingSidebar = ({ isOpen, onClose, venue, price, selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Prevent past date selection
  const handleDateChange = (date) => {
    const today = new Date();
    if (date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      toast.error("Cannot select a past date");
      return;
    }
    setSelectedDate(date);
  };

  // Fetch available slots for the venue on the selected date
  useEffect(() => {
    if (!venue || !selectedDate) return;

    const fetchSlots = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await dispatch(fetchSlotsByVenue({ venueId: venue._id, date: formattedDate })).unwrap();
        setSlots(response);
        setSelectedSlots([]); // reset selection when date changes
      } catch (err) {
        toast.error(err.message || "Failed to fetch slots");
      }
    };

    fetchSlots();
  }, [venue, selectedDate, dispatch]);

  // Group slots by Morning / Afternoon / Evening
  const groupedSlots = {
    Morning: slots.filter(s => new Date(s.startTime).getHours() < 12),
    Afternoon: slots.filter(s => {
      const hour = new Date(s.startTime).getHours();
      return hour >= 12 && hour < 17;
    }),
    Evening: slots.filter(s => new Date(s.startTime).getHours() >= 17),
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
      const slotIds = selectedSlots.map(s => s._id);
      const bookingData = { slotIds, amount: price * selectedSlots.length };

      await dispatch(bookSlot(bookingData)).unwrap();
      // const paymentSuccess = await simulatePaymentGateway(booking.amount); 

      // if (paymentSuccess) {
      //   // 3. Update booking after payment
      //   await dispatch(handlePayment(bookingData._id)).unwrap();
      //   toast.success("Booking confirmed and payment updated!");
      //   setSelectedSlots([]);
      //   onClose();
      // }
      toast.success("Slots booked successfully!");
      setSelectedSlots([]);
      onClose();
    } catch (err) {
      toast.error(err.message || "Booking failed");
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
                              ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'}`}
                          >
                            {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            {" - "}
                            {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                  : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={handleBook}
              disabled={selectedSlots.length === 0}
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
