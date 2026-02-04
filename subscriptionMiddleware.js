const Subscription = require("../models/Subscription");

exports.requireActiveSubscription = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return next();
    }

    const subscription = await Subscription.findOne({
      userId: req.user.id,
      grade: req.user.grade,
      status: "active",
    });

    if (!subscription) {
      return res
        .status(403)
        .json({ message: "No active subscription" });
    }

    if (new Date(subscription.endDate) < new Date()) {
      subscription.status = "expired";
      await subscription.save();

      return res
        .status(403)
        .json({ message: "Subscription expired" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
