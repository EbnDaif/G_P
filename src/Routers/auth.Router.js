const { login, NewUser, logout } = require("../Controllers/auth.Controller")
const {NewUserSchema,loginSchema}=require("../services/vaildation/User.vaildation")
const { validationMiddleware } = require("../middlewares/validator")
const router = require("express").Router()
router.post("/register", validationMiddleware(NewUserSchema), NewUser);
router.post("/login",validationMiddleware(loginSchema),login)
router.post("/logout", logout)
module.exports=router