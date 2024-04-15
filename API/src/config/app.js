const express = require("express");
const app = express();

const cors = require("cors");
const cookieparser = require("cookie-parser");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cookieparser());
app.use(express.json());
app.use("/GP", require("../Routers/Routers"));
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  try {
    //test error
    throw new Error("error");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
