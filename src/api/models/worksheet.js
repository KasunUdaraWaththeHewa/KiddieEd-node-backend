const mongoose = require("mongoose");

const WorksheetSchema = new mongoose.Schema(
  {
    sheetName: { type: String, required: true },
    image: { type: String, required: true },
    payment: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("worksheets", WorksheetSchema);
