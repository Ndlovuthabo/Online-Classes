const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createPayment,
  payfastNotify,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/pay", protect, createPayment);
router.post("/notify", payfastNotify);

module.exports = router;
