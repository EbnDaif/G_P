const Session = require("../models/Session.model");
const asyncHandler = require("express-async-handler");

// Create new sessions (accepts a single session or an array of sessions)
const createSessions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const sessions = req.body;

  // Check if input is an array
  if (Array.isArray(sessions)) {
    // Add owner to each session object
    const sessionsWithOwner = sessions.map((session) => ({
      ...session,
      owner: userId,
    }));

    // Save all sessions if input is an array
    const createdSessions = await Session.insertMany(sessionsWithOwner);
    return res.status(201).json(createdSessions);
  }

  // Check if input is a single object
  if (typeof sessions === "object" && sessions !== null) {
    const session = new Session({ ...sessions, owner: userId });
    const createdSession = await session.save();
    return res.status(201).json(createdSession);
  }

  // If input is neither an array nor an object, return an error
  return res.status(400).json({
    message: "Input should be a session object or an array of sessions",
  });
});

// Get all sessions
const getAllSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({});
  res.status(200).json(sessions);
});

// Get a session by ID
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.status(200).json(session);
});

// Update a session by ID
const updateSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.status(200).json(session);
});

// Delete a session by ID
const deleteSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findByIdAndDelete(req.params.id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.status(200).json({ message: "Session deleted" });
});
// Get sessions for the current user
const getUserSessions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const sessions = await Session.find({ owner: userId });

  res.status(200).json(sessions);
});

module.exports = {
  createSessions,
  getAllSessions,
  getSessionById,
  updateSessionById,
  deleteSessionById,
  getUserSessions,
};
