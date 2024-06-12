const express = require("express");
const router = express.Router();
const sessionController = require("../Controllers/Session.Controllers");
const { authantication, authorization } = require("../middlewares/auth");

// Create a new session
router.post("/create", authantication, sessionController.createSession);

// Get all sessions
router.get("/all",authorization, sessionController.getAllSessions);
router.get("/current", authantication, sessionController.getUserSessions);


// Get a session by ID
router.get("/:id", sessionController.getSessionById);

// Update a session by ID
router.put("/:id", sessionController.updateSessionById);

// Delete a session by ID
router.delete("/:id", sessionController.deleteSessionById);

module.exports = router;
        