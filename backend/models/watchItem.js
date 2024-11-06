const mongoose = require("mongoose");

const watchItemSchema = {
  symbol: String,
  dateCreated: { type: Date, default: Date.now },
};

const watchItem = mongoose.model("WatchItem", watchItemSchema);

module.exports = watchItem;
