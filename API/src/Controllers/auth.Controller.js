const User = require("../models/User.model");
const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
exports.NewUser = asynchandler(async (req, res) => {
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
     let dublicatedemail = await User.findOne({ email: data.email });
  console.log(req.body);
  if (dublicatedemail) {
    return next(new ApiError("this email is already taken", 403));

  }
  const newuser = new User(data);
  await newuser.save();
  res.status(200).json({ message: "Created" });
});
(
  exports.login = asynchandler(async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password); 

      const token = await user.generatetokens();

      console.log(token);
      res.cookie("accessToken", `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 48, // 48 hours in milliseconds
      });
      res.status(200).send({ user, token });
    } catch (error) {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  }))
  
  exports.logout = asynchandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.send({ success: true });
  });
  