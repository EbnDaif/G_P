const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your client URL
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/GP", require("../Routers/Routers"));

// Error handler middleware (must be placed at the end)
const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};
app.use(errorHandler);

module.exports = app;
