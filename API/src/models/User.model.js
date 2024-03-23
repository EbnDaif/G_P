const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { string } = require("joi");
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  // address:{type:String,}
  email: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  preferance: [{ type: String, trim: true }],
  profileimage: String,
  moood: [
    {
      mood: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  keywords: [
    {
      type: String,
    },
  ],
  phone: {
    type: String,
    trim: true,
  },
  tokens: [
    {
      required: true,
      type: String,
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
UserSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};
UserSchema.methods.generatetokens = async function () {
  user = this;
  const secret_key = process.env.SALT;
  const token = jwt.sign({ _id: user._id.toString() }, secret_key);
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};
UserSchema.methods.toJson = function () {
  const user = this;
  const userobj = user.toObject();
  delete userobj.password;
  delete userobj.tokens;
  return userobj;
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
