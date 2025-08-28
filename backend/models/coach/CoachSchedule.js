const mongoose = require("mongoose");

const dayEnum = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

const scheduleSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach", required: true, index: true },
  // weekly template
  weekly: [{
    day: { type: String, enum: dayEnum, required: true },
    windows: [{
      start: { type: String, required: true },
      end:   { type: String, required: true },
      slotMinutes: { type: Number, default: 60 }
    }]
  }],
  // date-specific overrides (vacation, special camp, custom slots)
  overrides: [{
    date: { type: String, required: true },
    windows: [{
      start: String, end: String, slotMinutes: Number
    }],
    isClosed: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model("CoachSchedule", scheduleSchema);
