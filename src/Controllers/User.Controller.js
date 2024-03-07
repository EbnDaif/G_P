const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const handler = require("./actionHandler");
const ApiError = require("../utils/apiError");

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
        phone: req.body.phone,
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
        phone: req.body.phone,
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
  res.json({"user":userobj});
});
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id);

  res.status(204).json({ status: "Success" });
});
