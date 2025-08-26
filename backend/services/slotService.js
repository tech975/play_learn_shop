const Slot = require('../models/Slot');
const Venue = require('../models/Venue');

exports.generateSlotsForVenue = async ({ venue, startDate, endDate, startHour, endHour, slotDuration = 60 }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let slotsToInsert = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = new Date(d);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + slotDuration);

      slotsToInsert.push({
        venue,
        date: new Date(d),
        startTime,
        endTime,
        isBooked: false,
      });
    }
  }

  const createdSlots = await Slot.insertMany(slotsToInsert, { ordered: false });
  await Venue.findByIdAndUpdate(
    venue,
    { $push: { slots: { $each: createdSlots.map(slot => slot._id) } } },
    { new: true }
  );
  return createdSlots;
};
