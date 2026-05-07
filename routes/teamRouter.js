const express = require("express")
const router = express.Router()

////////////////////////////////////////
const teamController = require("../controller/teamController")

router.post("/", teamController.createTeam)
router.get("/", teamController.getAllTeams)
router.get("/:id", teamController.getTeamById)
router.get("/country/:country", teamController.getTeamsByCountry)
router.get("/group/:group", teamController.getTeamsByGroup)
router.put("/:id", teamController.updateTeam)
router.delete("/:id", teamController.deleteTeam)

module.exports = router
