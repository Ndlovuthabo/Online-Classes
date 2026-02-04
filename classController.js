const LiveClass = require("../models/LiveClass");

exports.getMyLiveClass = async (req, res) => {
  const liveClass = await LiveClass.findOne({
    grade: req.user.grade,
  }).sort({ startTime: 1 });

  if (!liveClass) {
    return res.json({ message: "No live class scheduled" });
  }

  res.json(liveClass);
};
