const Session = require("../models/Session.model");
const asyncHandler = require("express-async-handler");

// Create a new session
const createSession = asyncHandler(async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.status(201).json(session);
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
  const userId = req.user.id; // Assuming the user ID is added to req.user by authentication middleware
  const sessions = await Session.find({ userId: userId });
  res.status(200).json(sessions);
});



module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSessionById,
  deleteSessionById,
  getUserSessions,
};
