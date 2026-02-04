const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const { createLiveClass } = require("../controllers/adminController");

const router = express.Router();

router.post("/create-class", protect, isAdmin, createLiveClass);

module.exports = router;
