const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../Controllers/Chat.Controller");
const { authantication } = require("../middlewares/auth");

router.post("/send",authantication, sendMessage);
//router.get("/messages",authantication, getMessages);

module.exports = router;
