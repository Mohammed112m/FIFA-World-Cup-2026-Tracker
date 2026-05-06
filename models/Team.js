const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coach: {
      type: String,
      required: true,
    },
    players: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    flag:{
      type:String,
      required: true
    },
    groups:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Team", teamSchema)
