const express = require("express");
const router = express.Router();
const sessionController = require("../Controllers/Session.Controllers");
const { validationMiddleware } = require("../middlewares/validator");
const {
  newsessionValidation,
  updatesessionValidation,
} = require("../services/vaildation/Session.validation");
const { authantication, authorization } = require("../middlewares/auth");
// Create a new session
router.post(
  "/create",
  validationMiddleware(newsessionValidation),
  authantication,
  sessionController.createSessions
);

// Get all sessions
router.get("/all", authorization, sessionController.getAllSessions);
router.get("/current", authantication, sessionController.getUserSessions);

// Get a session by ID
router.get("/:id", authantication, sessionController.getSessionById);

// Update a session by ID
router.patch(
  "/:id",
  authorization,
  validationMiddleware(updatesessionValidation),
  sessionController.updateSessionById
);

// Delete a session by ID
router.delete("/:id", authorization, sessionController.deleteSessionById);

module.exports = router;
