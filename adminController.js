const LiveClass = require("../models/LiveClass");

exports.createLiveClass = async (req, res) => {
  try {
    const { grade, teacherId, zoomLink, startTime } = req.body;

    const liveClass = await LiveClass.create({
      grade,
      teacherId,
      zoomLink,
      startTime,
    });

    res.status(201).json(liveClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
