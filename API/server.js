require("dotenv").config();
const bcryptjs = require("bcryptjs")

const http = require("http");
const socketIo = require("socket.io");
const app = require("./src/config/app");
const { connectdb } = require("./src/config/database");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages from the user
  socket.on("userMessage", async (data) => {
    try {
      const userMessage = await messageController.saveUserMessage(data);

      const aiResponse =
        "AI: Thank you for your message. I will get back to you shortly.";

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

connectdb().then(() => {
  app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);
});
});
