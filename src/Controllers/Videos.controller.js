const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const searchVideos = require("../services/ThirdParty/Youtupe.api");

exports.getvideos = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const keywords = user.keywords;
  let searchResults = [];
  for (const keyword of keywords) {
    const results = await searchVideos(keyword);
    searchResults.push(...results);
  }
  searchResults.sort(() => Math.random() - 0.5);

  res.send(searchResults);
});
