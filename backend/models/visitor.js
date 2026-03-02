const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  flatNumber: { type: String, required: true },
  purpose: { type: String },

  entryTime: {
    type: Date,
    default: Date.now   //  auto time created
  },

  exitTime: {
    type: Date,
    default: null
  },

  status: {
    type: String,
    enum: ["Entered", "Exited"],
    default: "Entered"
  }
});

module.exports = mongoose.model("Visitor", visitorSchema);