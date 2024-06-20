const Joi = require("joi");

const newsessionValidation = Joi.object({
  appTime: Joi.string().required(),
  articles: Joi.array(),
  videos: Joi.string(),
  chatTime: Joi.string(),
  videosTime: Joi.string(),
});

const updatesessionValidation = Joi.object({
  appTime: Joi.string(),
  articles: Joi.array(),
  videos: Joi.string(),
  chatTime: Joi.string(),
  videosTime: Joi.string(),
});


module.exports = { newsessionValidation, updatesessionValidation };
