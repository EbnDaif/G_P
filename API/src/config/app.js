const express = require("express");
const app = express();
const ApiError = require("../utils/apiError");

const cors = require("cors");
const cookieparser = require("cookie-parser");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cookieparser());
app.use(express.json());
app.use(cors(corsOptions));
app.use("/GP", require("../Routers/Routers"));

// Error handler middleware (must be placed at the end)
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statuscode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
app.use(errorHandler);

// Example route handler with error throwing
app.get("/", (req, res, next) => {
  try {
    // Test error
    throw new Error("error");
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

module.exports = app;

