const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    lessonName: { type: String, required: true },
    image: { type: String, required: false },
    payment: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lessons", LessonSchema);
