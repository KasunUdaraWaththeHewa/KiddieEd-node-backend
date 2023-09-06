const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    image: { type: String, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lesson-plans", PlanSchema);
