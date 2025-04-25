const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
