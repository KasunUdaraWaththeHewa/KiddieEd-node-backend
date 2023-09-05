const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema(
  {
    homeName: { type: String, required: true },
    image: { type: String, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("homes", HomeSchema);
