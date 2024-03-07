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
exports.login = asynchandler(async (req, res) => {
  const user = await User.findbycridintials(req.body.email, req.body.password);
            const token = await user.generatetokens();
            res.cookie("access_token", `Bearer ${token}`, {
              httpOnly: true,
              maxage: 1000 * 60 * 60 * 48,
            });
  res.status(200).send({ user, token });
});
exports.logout = asynchandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send({ success: true });
});
