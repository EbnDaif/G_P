const express = require("express");
const router = express.Router();
const sessionController = require("../Controllers/Session.Controllers");

// Create a new session
router.post("/", sessionController.createSession);

// Get all sessions
router.get("/", sessionController.getAllSessions);

// Get a session by ID
router.get("/:id", sessionController.getSessionById);

// Update a session by ID
router.put("/:id", sessionController.updateSessionById);

// Delete a session by ID
router.delete("/:id", sessionController.deleteSessionById);

module.exports = router;
        