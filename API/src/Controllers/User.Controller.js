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
 if (req.file) {
   req.body.profileImage = req.file.path;
 }
 console.log(req.body);

  const document = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  
  if (!document) {
    return next(new ApiError(`no User found with this Id${req.params.id}`));
  }
  document.save();
  res.status(200).json({ data: document });
});
exports.updateuserpassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByCredentials(req.user.email, req.body.password);
  if (!user) {
    return next(
      new ApiError(`No user found with this ID: ${req.user._id}`, 404)
    );
  }

  // Update the password
  user.password = req.body.newPassword;
  await user.save(); // This will trigger the 'save' middleware and hash the password

  res.status(200).json({ data: "Password changed successfully" });
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
  if (req.file) {
    req.body.profileimage = req.file.path;
  }

  console.log(req.body);

  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  Object.assign(user, req.body);
  await user.save();

  res.status(200).json({ updatedUser: user });
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
