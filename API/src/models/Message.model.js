const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: {
    type: String,
  },
  sender: { enum: ["User,Agent"] },
  reseaver: { enum: ["User,Agent"] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Chat = mongoose.model("Mesaage", messageSchema);
