const CoachSchedule = require("../../models/coach/CoachSchedule");

exports.createSchedule = async (req, res) => {
    try {
        const { coach, weekly, overrides } = req.body;

        if (!coach) return res.status(400).json({ message: "Coach is required" });

        const schedule = await CoachSchedule.create({ coach, weekly, overrides });

        res.json(schedule);
    } catch (error) {
        console.log("error, while creating schedule: ", error);
        res.status(500).json({ message: "Error creating schedule" });
    }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await CoachSchedule.find().populate("coach", "name sport");
    res.json(schedules);
  } catch (error) {
    console.log("error, while getting all schedules: ", error);
    res.status(500).json({ message: "Error fetching schedules", error: error.message });
  }
};

exports.getScheduleByCoach = async (req, res) => {
  try {
    const { coachId } = req.params;
    const schedule = await CoachSchedule.findOne({ coach: coachId }).populate("coach", "name sport");

    if (!schedule) return res.status(404).json({ message: "Schedule not found for this coach" });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coach schedule", error: error.message });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await CoachSchedule.findById(req.params.id).populate("coach");
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule", error: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const updated = await CoachSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Schedule not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const deleted = await CoachSchedule.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Schedule not found" });

    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting schedule", error: error.message });
  }
};

exports.addWeeklyDay = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, windows } = req.body;
    console.log(id)
    const schedule = await CoachSchedule.findById(id);

    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    if (schedule.weekly.some(dayObj => dayObj.day.toLowerCase() === day.toLowerCase())) {
        return res.status(400).json({ message: "Day already exists in weekly schedule" });
    }

    schedule.weekly.push({ day, windows });
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error adding weekly day", error: error.message });
  }
};

exports.updateWeeklyDay = async (req, res) => {
  try {
    const { dayIndex } = req.params; // index of weekly array
    const { day, windows } = req.body;

    const schedule = await CoachSchedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    if (!schedule.weekly[dayIndex]) return res.status(404).json({ message: "Weekly day not found" });

    if (day && schedule.weekly.some((entry, idx) => idx !== Number(dayIndex) && entry.day.toLowerCase() === day.toLowerCase())) {
      return res.status(400).json({ message: `Schedule for ${day} already exists. Please choose another day.` });
    }

    schedule.weekly[dayIndex] = { day, windows };
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error updating weekly day", error: error.message });
  }
};

exports.removeWeeklyDay = async (req, res) => {
  try {
    const { dayIndex } = req.params;
    const schedule = await CoachSchedule.findById(req.params.id);

    console.log(dayIndex)

    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    schedule.weekly.splice(dayIndex, 1);
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error removing weekly day", error: error.message });
  }
};

exports.addOverride = async (req, res) => {
  try {
    const { date, windows, isClosed } = req.body;
    const schedule = await CoachSchedule.findById(req.params.id);

    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    schedule.overrides.push({ date, windows, isClosed });
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error adding override", error: error.message });
  }
};


exports.updateOverride = async (req, res) => {
  try {
    const { overrideIndex } = req.params;
    const { date, windows, isClosed } = req.body;

    const schedule = await CoachSchedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    if (!schedule.overrides[overrideIndex]) return res.status(404).json({ message: "Override not found" });

    schedule.overrides[overrideIndex] = { date, windows, isClosed };
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error updating override", error: error.message });
  }
};

exports.removeOverride = async (req, res) => {
  try {
    const { overrideIndex } = req.params;
    const schedule = await CoachSchedule.findById(req.params.id);

    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    schedule.overrides.splice(overrideIndex, 1);
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error removing override", error: error.message });
  }
};