const User = require("../models/User.model");
const asynchandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const loggerEvent = require("../services/logger.services");
const { log } = require("winston");
const logger = loggerEvent("auth");
exports.NewUser = asynchandler(async (req, res, next) => {
  if (!req.body.keywords) {
    req.body.keywords = [
      "meditation",
      "Mental health",
      "relax",
      "motivation",
      "calm",
    ];
  }
  const data = req.body;
  logger.info(req.body);

  let dublicatedemail = await User.findOne({ email: data.email });

  if (!dublicatedemail) {
    const newuser = new User(data);
    await newuser.save();
    logger.info("created email");
    res.status(201).json(newuser);
  } else {
    return next(new ApiError("this email is already taken", 403));
  }
});
exports.NewUserGoogle = asynchandler(async (req, res, next) => {
  if (!req.body.keywords) {
    req.body.keywords = [
      "meditation",
      "Mental health",
      "relax",
      "motivation",
      "calm",
    ];
  }
  const data = req.body;
  logger.info(req.body);

  let dublicatedemail = await User.findOne({ email: data.email });

  if (!dublicatedemail) {
    const newuser = new User(data);
    await newuser.save();
    logger.info("created email");
    res.status(201).json(newuser);
  } else {
    return next(new ApiError("this email is already taken", 403));
  }
});
exports.login = asynchandler(async (req, res,next) => {
  try {
    logger.info(req.body);

    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generatetokens();

    res.cookie("accessToken", `Bearer ${token}`, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "None",
      //  maxAge: 1000 * 60 * 60 * 48, // 48 hours in milliseconds
    });
    res.status(200).send({ user });
  } catch (error) {
    logger.error(error.message);
    return next(new ApiError("Invalid credentials", 401));
  }
});
exports.logingoogle = asynchandler(async (req, res,next) => {
  try {
    logger.info(req.body);
    const user = await User.findByUIDCredentials(
      req.body.email,
      req.body.UID
    );

    const token = await user.generatetokens();

    res.cookie("accessToken", `Bearer ${token}`, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "None", //  maxAge: 1000 * 60 * 60 * 48, // 48 hours in milliseconds
    });
    res.status(200).send({ user });
  } catch (error) {
    logger.error(error.message);

    return next(new ApiError("Invalid credentials", 401));
  }
});
exports.loginfaceio = asynchandler(async (req, res,next) => {
  try {
    console.log( req.body );
const user = await User.findOne({ facialid: req.body.facialid });

    const token = await user.generatetokens();

    res.cookie("accessToken", `Bearer ${token}`, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "None", //  maxAge: 1000 * 60 * 60 * 48, // 48 hours in milliseconds
    });
    res.status(200).send({ user });
  } catch (error) {
    logger.error(error.message);

    return next(new ApiError("Invalid credentials no user with this face", 401));
  }
});

exports.logout = asynchandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.send({ success: true });
});
