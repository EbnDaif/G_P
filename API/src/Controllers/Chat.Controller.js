// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const messageController = require("./controllers/messageController");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Handle incoming socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages from the user
  socket.on("userMessage", async (data) => {
    try {
      // Save the user's message to the database
      const userMessage = await messageController.saveUserMessage(data);

      // Simulate AI chatbot response
      const aiResponse =
        "AI: Thank you for your message. I will get back to you shortly.";

      // Save the chatbot's response to the database
      const aiMessage = await messageController.saveChatbotMessage(aiResponse);

      // Emit the AI chatbot response to the user
      socket.emit("chatbotMessage", aiResponse);
    } catch (error) {
      console.error(error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
