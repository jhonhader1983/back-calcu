const mongoose = require("mongoose");

const PriceSnapshotSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  prices: { type: Object },
});

module.exports = mongoose.model("PriceSnapshot", PriceSnapshotSchema);
