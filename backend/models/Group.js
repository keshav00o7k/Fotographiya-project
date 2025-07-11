const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileData: String,
  uploadedAt: { type: Date, default: Date.now },
});

const groupSchema = new mongoose.Schema({
  name: String,
  privacy: { type: String, default: "personal" },
  media: [mediaSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", groupSchema);
