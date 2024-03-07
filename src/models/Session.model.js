const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema(
    {
        owner: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        articles: [{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Articles",
        }],
        videos: [
            {
                link: String,
                timewatched:String
            }
        ],
        apptime:{ type:String,required:true},
        chattime: String, 
        videostime:String
    },
  { timestamps: true }
);
sessionSchema.virtual("readedarticles", {
  ref: "Articles",
  localField: "articles",
  foreignField: "_id",
  justOne: true,
});

const Session = mongoose.model("Session", sessionSchema);
