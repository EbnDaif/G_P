const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadimage");

const { updateLoggedUserData, updateuser, getloggeduser, deleteLoggedUserData, deleteuser,getuser,getusers ,resetPassword,forgetPassword, updateuserpassword} = require("../Controllers/User.Controller")
const {
  updateUserSchema,
  resetPasswordSchema,
forgetPasswordSchema,
updatePasswordSchema} = require("../services/vaildation/User.vaildation");
const { authantication, authorization } = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectIdMiddleware");
const { validationMiddleware } = require("../middlewares/validator");
router.get("/getall",authorization,getusers );
router.get("/get-one/:id", validateObjectId,authorization,getuser);
router.get("/getme", authantication, getloggeduser);
router.patch(
  "/update-me",
  authantication,
  upload.single("profileimage"),

  validationMiddleware(updateUserSchema),
  updateLoggedUserData
);
router.patch(
  "/changepassword",
  authantication,
  validationMiddleware(updatePasswordSchema),
  updateuserpassword
);
    router.post(
      "/forget-password",
      validationMiddleware(forgetPasswordSchema),
      forgetPassword
    );
router.post(
  "/reset-password/:token",
  validationMiddleware(resetPasswordSchema),
  resetPassword
);
router.patch(
  "/update-one/:id",
  upload.single("profileimage"),
  authorization,
  validateObjectId,
  validationMiddleware(updateUserSchema),
  updateuser
);
router.delete("/delete-me", authantication, deleteLoggedUserData)
router.delete("/delete-one/:id",authorization,validateObjectId,deleteuser)

module.exports=router
 