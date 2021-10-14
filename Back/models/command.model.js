const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
});
const CommandModel = mongoose.model("command", commandSchema);
module.exports = CommandModel;
