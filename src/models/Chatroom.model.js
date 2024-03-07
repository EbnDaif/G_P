const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    message: 
     [ {type: mongoose.Types.ObjectId,
      ref: "Messages",}]
    ,
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    CreatedAt: {
      type: Date,
      default: Date.now
    }
  },
);
chatSchema.virtual("roomowner", {
  ref: "User",
  localField: "owner",
  foreignField: "_id",
  justOne: true,
});
chatSchema.virtual("messages", {
  ref: "Mesaages",
  localField: "message",
  foreignField: "_id",
  justOne: true,
});

const Chat = mongoose.model("Chat", chatSchema);
