
const axios = require("axios");

async function sendMessage(req, res) {
  try {
    const { question } = req.body;
    const sessionId = req.user._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      question,
      overrideConfig: {
        sessionId,
      },
    };

    // Send the message to the specified endpoint
    const response = await axios.post(
      "https://qamxrrxn.cloud.sealos.io/api/v1/prediction/3eadea6e-3b80-4267-8305-ce94ae2e955a",
      data,
      config
    );

    // Send the response back to the client
    res
      .status(200)
      .json({ message: "Message sent successfully", response: response.data });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/*
async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error getting messages:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
*/
module.exports = { sendMessage };
