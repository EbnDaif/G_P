const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const asynchandler = require("express-async-handler");

exports.authantication = asynchandler(async (req, res, next) => {
 console.log(req.cookies);
  if (!req.cookies || !req.cookies.accessToken) {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    console.log(baseUrl);

    return res.status(401).send({ Message: "unauthorized user" });
  }

  const token = req.cookies.accessToken.split(" ")[1];
  const secret_key = process.env.SALT;

  const Valid = jwt.verify(token, secret_key);
  if (!Valid) {
    return res.status(401).send({ Message: "unauthorized user" });
  }
  // console.log(Valid);
  const user = await User.findById(Valid._id);

  if (!user) {
    return res.status(401).send({ Message: "unauthorized user" });
  }
  if (!user.tokens.includes(token)) {
    return res.status(401).send({ Message: "unauthorized user" });
  }

  req.user = user;
  req.token = token;

  next();
});
exports.authorization = asynchandler(async (req, res, next) => {
  this.authantication(req, res, () => {
    console.log(req.user);
    if (!req.user.isAdmin) {
      console.log(req.user.isAdmin);

      return res.status(401).send({ Message: "unauthorized admin" });
    }
    next();
  });
});
