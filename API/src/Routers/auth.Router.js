const {
  login,
  NewUser,
  logout,
  logingoogle,
  registerUser,
  similarity,
  NewUserGoogle,
  loginfaceio,
} = require("../Controllers/auth.Controller");
const {
  NewUsergoogleSchema,
  logingoogleSchema,
  loginfaceSchema,
  NewUserSchema,
  loginSchema,
} = require("../services/vaildation/User.vaildation");
const { validationMiddleware } = require("../middlewares/validator");
const { upload } = require("../middlewares/uploadimage");

const router = require("express").Router();
router.post(
  "/register",
  validationMiddleware(NewUserSchema),
  NewUser
);
router.post(
  "/registergoogle",
  validationMiddleware(NewUsergoogleSchema),
  NewUserGoogle
);
router.post("/login", validationMiddleware(loginSchema), login);
router.post("/loginfaceio", validationMiddleware(loginfaceSchema), loginfaceio);

router.post(
  "/logingoogle",
  validationMiddleware(logingoogleSchema),
  logingoogle
);
router.post("/logout", logout);
module.exports = router;
