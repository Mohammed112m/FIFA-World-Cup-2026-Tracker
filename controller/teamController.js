const Team = require("../models/Team")

//////////////////// create team ////////////////////

const createTeam = async (req, res) => {
  try {
    const { name, coach, players, country, flag, groups } = req.body

    const team = await Team.create({
      name,
      coach,
      players,
      country,
      flag,
      groups,
    })

    res.status(201).json(team)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating team" })
  }
}

//////////////////// get all teams ////////////////////

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()

    res.json(teams)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error getting teams" })
  }
}

//////////////////// get team by id ////////////////////

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    res.json(team)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error getting team" })
  }
}

//////////////////// get team by country ////////////////////

const getTeamsByCountry = async (req, res) => {
  try {
    const teams = await Team.find({ country: req.params.country })
    res.json(teams)
  } catch (error) {
    res.status(500).json({ message: "Error filtering teams" })
  }
}

//////////////////// get team by Group ////////////////////

const getTeamsByGroup = async (req, res) => {
  try {
    const teams = await Team.find({ groups: req.params.group })
    res.json(teams)
  } catch (error) {
    res.status(500).json({ message: "Error filtering teams" })
  }
}

//////////////////// update team ////////////////////

const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" })
    }
    res.json(updatedTeam)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating team" })
  }
}

//////////////////// delete team ////////////////////

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id)

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    res.json({ message: "Team deleted successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error deleting team" })
  }
}

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  getTeamsByCountry,
  getTeamsByGroup,
  updateTeam,
  deleteTeam,
}
