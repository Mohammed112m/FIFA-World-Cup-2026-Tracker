const Stadium = require("../models/Stadium")
const stadium = require("../models/Stadium")

//////////////////// create stadium ////////////////////

const createStadium = async (req, res) => {
  try {
    const { name, country, city, capacity, image, location } = req.body
    const stadium = await Stadium.create({
      name,
      country,
      city,
      capacity,
      image,
      location,
    })

    res.status(201).json(stadium)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " error creating stadium" })
  }
}

//////////////////// get all stadiums ////////////////////

const getAllStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find()

    res.json(stadiums)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error getting stadiums" })
  }
}

//////////////////// get stadium by id ////////////////////

const getStadiumById = async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id)
    if (!stadium) {
      return res.status(404).json({ message: "Stadium not found" })
    }

    res.json(stadium)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error getting stadium" })
  }
}

//////////////////// get stadium by city  ////////////////////

const getStadiumsByCity = async (req, res) => {
  try {
    const stadiums = await Stadium.find({ city: req.params.city })
    res.json(stadiums)
  } catch (error) {
    res.status(500).json({ message: "error filter stadiums" })
  }
}

//////////////////// update stadium ////////////////////

const updateStadium = async (req, res) => {
  try {
    const updatedStadium = await Stadium.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedStadium) {
      return res.status(404).json({ message: "Stadium not found" })
    }
    res.json(updatedStadium)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating stadium" })
  }
}

//////////////////// delete stadium ////////////////////

const deleteStadium = async (req, res) => {
  try {
    const stadium = await Stadium.findByIdAndDelete(req.params.id)
    if (!stadium) {
      return res.status(404).json({ message: "Stadium not found" })
    }
    res.json({ message: "Stadium deleted successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error deleting stadium" })
  }
}

////////////////////////////////////////////////////////

module.exports = {
  createStadium,
  getAllStadiums,
  getStadiumById,
  getStadiumsByCity,
  updateStadium,
  deleteStadium,
}
