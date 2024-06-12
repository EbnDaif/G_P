const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    articles: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Articles",
      },
    ],
    videos: [
      {
        link: String,
        timeWatched: String, // Consider changing to Number or Date if it represents time
      },
    ],
    appTime: { type: String, required: true }, // Consider changing to Number or Date if it represents time
    chatTime: String, // Consider changing to Number or Date if it represents time
    videosTime: String, // Consider changing to Number or Date if it represents time
  },
  { timestamps: true }
);

sessionSchema.virtual("readedArticles", {
  ref: "Articles",
  localField: "articles",
  foreignField: "_id",
  justOne: false, // Should be false for an array of references
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
