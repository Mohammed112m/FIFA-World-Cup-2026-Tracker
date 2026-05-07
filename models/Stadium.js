const mongoose = require("mongoose")

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true
  },
},
  { timestamps: true}

)


module.exports = mongoose.model ("Stadium",stadiumSchema)
