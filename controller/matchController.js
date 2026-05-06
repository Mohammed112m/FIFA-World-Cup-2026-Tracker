const Match = require("../models/Match")

////////////////first create new match////////////////////////

const createMatch = async (req, res) => {
  try {
    const { name, date, time, team1, team2, stadium } = req.body

    const match = await Match.create({
      name,
      date,
      time,
      team1,
      team2,
      stadium,
    })

    res.status(201).json(match)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " Error creating match" })
  }
}

//////////////////second we get all matches//////////////////////

const getAllMatch = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("team1")
      .populate("team2")
      .populate("stadium")

    res.json(matches)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " Error get matches" })
  }
}

////////////////call only one match
////////////////////////

const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.prams.id)
      .populate("team1")
      .populate("team2")
      .populate("stadium")

    if (!match) {
      return res.status(404).json({ message: " Match not found" })
    }

    res.json(match)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " error get match" })
  }
}

//////////////here we update the match//////////////////////////

const updateMatch = async (React, res) => {
  try {
    const updateMatch = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!updateMatch) {
      return res.status(404).json({ message: "Match nlt found" })
    }
    res.json(updateMatch)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " error updating match" })
  }
}

////////////////////// Here We delete the match //////////////////

const deleteMatch = async (req, res) => {
  try {
    const deleteMatch = await Match.findByIdAndDelete(req.params.id)

    if (!deleteMatch) {
      return res.status(404).json({ message: "match not found" })
    }
    res.json({ message: " Match deleted Successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error deleting match" })
  }
}

////////////////////////////////////////

module.exports = {
  createMatch,
  getAllMatch,
  getMatchById,
  updateMatch,
  deleteMatch,
}
