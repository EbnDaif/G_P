const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const handler = require("./actionHandler");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendEmail } = require("../utils/nodemailer");
const { log } = require("winston");
exports.getusers = handler.getall(User);
exports.getuser = handler.getone(User);
exports.createuser = handler.createone(User);
exports.updateuser = asyncHandler(async (req, res, next) => {
  if (req.body.password) {
    const document = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
      },
      { new: true }
    );
  } else {
    const document = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true }
    );
  }
  if (!document) {
    return next(new ApiError(`no User found with this Id${req.params.id}`));
  }
  res.status(200).json({ data: document });
});
exports.deleteuser = handler.deleteone(User);
exports.getloggeduser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const userobj = user.toObject();
  delete userobj.password;
  delete userobj.tokens;
  res.json({ user: userobj });
});
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(200).json({ data: updatedUser });
});
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({ status: "Success" });
});
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ApiError("Please provide an Email", 400));
  }

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_SALT, {
    expiresIn: "10m",
  });
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 600000; // Token expires in 10 minutes
  await user.save();

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  let resetUrl = `https://g-p-1k1q.onrender.com/GP/user/reset-password/${token}`;

  if (req.hostname === "localhost" || req.hostname === "127.0.0.1") {
    resetUrl = `${baseUrl}/GP/user/reset-password/${token}`;
  }

  const emailContent = `Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`;
  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: emailContent,
  });

  res.status(200).json({ message: "Reset password link sent to your email" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;
  const { token } = req.params; // Use req.params directly
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Invalid or expired token", 400));
  }

  // Update the password
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});
