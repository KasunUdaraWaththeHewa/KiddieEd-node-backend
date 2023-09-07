const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    image: { type: String },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User",UserSchema);
