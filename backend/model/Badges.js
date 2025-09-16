// models/Badge.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BadgeSchema = new Schema({
  name: String,
  description: String,
  criteria: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Badge", BadgeSchema);
