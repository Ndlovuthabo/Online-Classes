const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");
const { getMyLiveClass } = require("../controllers/classController");

const router = express.Router();

router.get(
  "/live",
  protect,
  requireActiveSubscription,
  getMyLiveClass
);

module.exports = router;
