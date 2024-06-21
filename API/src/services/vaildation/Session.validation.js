const Joi = require("joi");

const newsessionValidation = Joi.object({
  appTime: Joi.string().required(),
  
  articles: Joi.array(),
  videos: Joi.array(),
  name: Joi.string(),
  chatTime: Joi.string(),
  videostime: Joi.string(),
});
const newmultisessionValidation = Joi.array().items(
  Joi.object({
    appTime: Joi.string().required(),
    articles: Joi.array().items(Joi.any()), // Assuming articles can be any type, adjust accordingly
    videos: Joi.array().items(Joi.any()), // Assuming videos can be any type, adjust accordingly
    name: Joi.string().optional(), // If name is not required, use .optional()
    chatTime: Joi.string().optional(), // If chatTime is not required, use .optional()
    videostime: Joi.string().optional(), // If videostime is not required, use .optional()
  })
);


const updatesessionValidation = Joi.object({
  appTime: Joi.string(),
  articles: Joi.array(),
  videos: Joi.array(),
  chatTime: Joi.string(),
  videostime: Joi.string(),
});


module.exports = { newsessionValidation,newmultisessionValidation, updatesessionValidation };
