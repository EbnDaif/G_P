const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");


const corsOptions = {
  origin: "http://localhost:5173", // Replace with your client URL
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/GP", require("../Routers/Routers"));
app.options("*", cors(corsOptions));

// Error handler middleware (must be placed at the end)
const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};
app.use(errorHandler);

module.exports = app;
