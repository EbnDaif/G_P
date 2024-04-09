const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { string } = require("joi");
const ApiError = require("../utils/apiError");
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  lastname: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  age: {
    type: Number,
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
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};

UserSchema.methods.generatetokens = async function () {
  const user = this
  const secret_key=process.env.SALT
    const token = jwt.sign({ _id: user._id.toString() }, secret_key)

  user.tokens = user.tokens.concat(token)
  
   await user.save()
  return token;
}
UserSchema.methods.toJson = function () {
  const user = this;
  const userobj = user.toObject();
  delete userobj.password;
  delete userobj.tokens;
  return userobj;
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
