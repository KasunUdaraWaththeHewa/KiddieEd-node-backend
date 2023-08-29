const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
  {
    lessonId: { type: String, required: true },
    displayName: { type: String, required: true },
    image: { type: String, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lessons", LessonSchema);
