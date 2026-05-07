const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
  },
  { Timestamps: true }
)

module.exports = mongoose.model("Event", eventSchema)
