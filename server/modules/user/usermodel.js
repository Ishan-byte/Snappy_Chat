const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Username
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },

  // Email
  email: {
    type: String,
    unique: true,
    required: true,
    max: 50,
  },

  //Password
  password: {
    type: String,
    required: true,
    min: 8,
  },

  //AvatarIMage set
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },

  //AvatarImage
  avatarImage: {
    type: String,
    default: "",
  },
});

userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("Users", userSchema);
