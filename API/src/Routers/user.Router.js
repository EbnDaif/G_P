const express = require("express");
const router = express.Router();
const { updateLoggedUserData, updateuser, getloggeduser, deleteLoggedUserData, deleteuser,getuser,getusers } = require("../Controllers/User.Controller")
const { updateUserSchema } = require("../services/vaildation/User.vaildation");
const { authantication, authorization } = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectIdMiddleware");
const { validationMiddleware } = require("../middlewares/validator");
router.get("/getall",authorization,getusers );
router.get("/get-one/:id", validateObjectId,authorization,getuser);
router.get("/getme", authantication, getloggeduser);
router.patch(
  "/update-me",
  authantication,
  validationMiddleware(updateUserSchema),
  updateLoggedUserData
);
router.patch("/update-one/:id", authorization, validateObjectId,updateuser)
router.delete("/delete-me", authantication, deleteLoggedUserData)
router.delete("/delete-one/:id",authorization,validateObjectId,deleteuser)

module.exports=router
