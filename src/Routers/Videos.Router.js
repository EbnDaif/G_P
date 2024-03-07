const express = require("express");
const router = express.Router();

const {getvideos}=require("../Controllers/Videos.controller");
const { authantication } = require("../middlewares/auth");
router.get("/get-videos",authantication , getvideos)
module.exports=router