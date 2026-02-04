const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      enum: ["10", "11", "12"],
      required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    zoomLink: {
      type: String,
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);
