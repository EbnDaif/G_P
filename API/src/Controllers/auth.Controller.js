const User = require("../models/User.model");
const asynchandler = require("express-async-handler");
const fastapi = require("../services/ThirdParty/recognition");

const ApiError = require("../utils/apiError");
const loggerEvent = require('../services/logger.services');
const { log } = require("winston");
const logger = loggerEvent('auth')
exports.NewUser = asynchandler(async (req, res,next) => {
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
      logger.info(req.body)

  let dublicatedemail = await User.findOne({ email: data.email });
  
  if (!dublicatedemail) {
 
  const newuser = new User(data);
  await newuser.save();
  logger.info("created email")
  res.status(200).json({ message: "Created" });
  }
  else {
    return next( new ApiError("this email is already taken", 403));
  }


});
(
  exports.login = asynchandler(async (req, res) => {
    try {
      logger.info(req.body)

      const user = await User.findByCredentials(req.body.email, req.body.password); 

      const token = await user.generatetokens();

      console.log(token);
      res.cookie("accessToken", `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 48, // 48 hours in milliseconds
      });
      res.status(200).send({ user });
    } catch (error) {
      logger.error(error.message);

      res.status(401).send({ error: 'Invalid credentials' });
    }
  }))
  
  exports.logout = asynchandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.send({ success: true });
  });
  // Register user middleware
exports.registerUser = asynchandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const feature_vectors = await fastapi.uploadImagesAndGetFeatureVectors(
      req.file
    ); // Wait for the feature vectors to be extracted
    const user = await User.findOne({ email: email });

    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    user.feature_vectors = feature_vectors;

    await user.save();

    logger.info(`User '${user.email}' registered successfully.`);
    res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    logger.error("Error registering user:", error);
    return next(error);
  }
});


exports.authenticateUser = async (req, res, next) => {
  try {
    const detectedDescriptors = await fastapi.uploadImagesAndGetFeatureVectors(
      req.file
    );
    console.log(detectedDescriptors);
    const preRegisteredUsers = await User.find(
      { feature_vectors: { $exists: true, $ne: null } },
      "feature_vectors"
    );

    let authenticatedUser = null;

    for (const detectedDescriptor of detectedDescriptors) {
      for (const user of preRegisteredUsers) {
        const faceDescriptors = Array.isArray(user.feature_vectors)
          ? user.feature_vectors
          : [user.feature_vectors];

        for (const preRegisteredDescriptor of faceDescriptors) {
          try {
            const similarity = await fastapi.calculateCosineSimilarity(
              preRegisteredDescriptor[0],
              detectedDescriptor[0]
            );
            if (similarity[1]) {
              console.log(similarity[0]);
              authenticatedUser = user;
              break;
            } else {
                            authenticatedUser = null
}
            
          } catch (error) {
            logger.error("Error calculating cosine similarity:", error);
          }
        }

        if (authenticatedUser) {
          break; // Exit the middle loop once authenticated
        }
      }

      if (authenticatedUser) {
        break; // Exit the outer loop once authenticated
      }
    }

    if (authenticatedUser) {
     const user = await User.findById(authenticatedUser._id);
      const token = await user.generatetokens();

      return res
        .status(200).cookie("accessToken", `Bearer ${token}`, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 48, // 48 hours in milliseconds
        })
        .json({ authenticated: true, name: authenticatedUser })
        
    } else {
      return res.status(200).json({ authenticated: false });
    }
  } catch (error) {
    logger.error("Error authenticating user:", error);
    return next(error);
  }
};



