const express = require("express")

const router = express.Router()

const stadiumController = require("../controller/stadiumController")


router.post("/", stadiumController.createStadium)
router.get("/", stadiumController.getAllStadiums)
router.get("/:id", stadiumController.getStadiumById)
router.get("/city/:city", stadiumController.getStadiumsByCity)
router.put("/:id", stadiumController.updateStadium)
router.delete("/:id", stadiumController.deleteStadium)

module.exports = router
