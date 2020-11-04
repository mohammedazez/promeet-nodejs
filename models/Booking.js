const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  codeInvoice: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  transferId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending, Proses", "Success", "Failed"],
    default: "Pending",
  },
});

const Booking = new mongoose.model("bookings", bookingSchema);
module.exports = { Booking };
