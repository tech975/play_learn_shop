export const generateSlots = (startHour = 9, endHour = 24, bookedSlots = [], slotDuration = 1) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour += slotDuration) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + slotDuration).toString().padStart(2, "0")}:00`;
    const isBooked = bookedSlots.includes(startTime);
    slots.push({ startTime, endTime, isBooked });
  }
  return slots;
};
