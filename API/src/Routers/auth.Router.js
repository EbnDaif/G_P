const {
  login,
  NewUser,
  logout,
  logingoogle,
  registerUser,
  similarity,
  NewUserGoogle,
} = require("../Controllers/auth.Controller");
const {
  NewUsergoogleSchema,
  logingoogleSchema,
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

router.post(
  "/logingoogle",
  validationMiddleware(logingoogleSchema),
  logingoogle
);
router.post("/face/register", upload.single("image"), registerUser);

router.post("/face/authenticate", similarity);
//router.post("/face/authenticate", upload.single("image"),authenticateUser);
router.post("/logout", logout);
module.exports = router;
