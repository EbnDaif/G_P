const User = require("../models/User.model");
const asynchandler = require("express-async-handler");
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
    return res.status(403).json({ Error: "this email is already taken" });
  }
  const newuser = new User(data);
  await newuser.save();
  res.status(200).json({ message: "Created" });
});
(
  exports.login = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.email);

  const userExist = await User.findOne({ email: email });
  if (!userExist)
    return res
      .status(400)
      .json({
        error:
          "Incorrect email or password. Please check your credentials and try again",
      });
  const matchPassword = await userExist.comparePassword(password);
  if (!matchPassword)
    return res.status(400).json({
      error:
        "Incorrect email or password. Please check your credentials and try again",
    });
  const token = userExist.generatetokens();
  res.cookie("accessToken", token, { httpOnly: true });
  res.status(200).json({ success: true, data: userExist });
})),
  (exports.logout = asynchandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.send({ success: true });
  }));
