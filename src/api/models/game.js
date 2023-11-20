const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    gameName: { type: String, required: true },
    image: { type: String, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("game",GameSchema);
