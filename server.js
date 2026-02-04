const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));

  //connecting a routes to server
  const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


 // connecting student routes to server
 const studentRoutes = require("./routes/studentRoutes");
app.use("/api/student", studentRoutes);

 // connecting to class routes to server
 const classRoutes = require("./routes/classRoutes");
app.use("/api/classes", classRoutes);

// connecting payment routes to server
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

// connecting admin routes to the server
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
