const Joi = require("joi");
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const passwordmsg =
  "TOO Weak Pssword try to add a spicial character, capital letters,small letters";
const NewUserSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  keywords: Joi.array().default([
    "meditation",
    "Mental health",
    "relax",
    "motivation",
    "calm",
  ]),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(passwordmsg)
    .min(8)
    .required(),
  email: Joi.string().email().required(),
  age: Joi.string(),
  gender: Joi.string().valid("male", "female"),
});
const NewUsergoogleSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  keywords: Joi.array().default([
    "meditation",
    "Mental health",
    "relax",
    "motivation",
    "calm",
  ]),


  UID: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.string(),
  gender: Joi.string().valid("male", "female"),
});
const updateUserSchema = Joi.object({
  age: Joi.number().integer().messages({
    "number.base": "Age must be a valid integer.",
  }),
  firstname: Joi.string(),
  lastname: Joi.string(),
  phone: Joi.string(),
  keywords: Joi.array(),
  
  keywords: Joi.array().default([
    "meditation",
    "Mental health",
    "relax",
    "motivation",
    "calm",
  ]),
  preferance: Joi.array(),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(passwordmsg)
    .min(8),
  mobileNumber: Joi.number().integer().messages({
    "number.base": "Mobile number must be a valid integer.",
  }),
});
const loginSchema = Joi.object({
  password: Joi.string().pattern(passwordRegex).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password must not be empty.",
    "string.pattern.base":
      "Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.",
  }),
  email: Joi.string().email().required(),
});
const logingoogleSchema = Joi.object({

  email: Joi.string().email().required(),
  UID: Joi.string().required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(passwordRegex)
    .min(8)
    .required(),
});




module.exports = {
  NewUserSchema: NewUserSchema,
  NewUsergoogleSchema: NewUsergoogleSchema,
  loginSchema: loginSchema,
  logingoogleSchema: logingoogleSchema,
  updateUserSchema: updateUserSchema,
  forgetPasswordSchema: forgetPasswordSchema,
  resetPasswordSchema:resetPasswordSchema
};
