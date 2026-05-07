const express = require("express")

const router = express.Router()

const eventController = require("../controller/eventController")

// router.post("/", verifyToken, isAdmin, createEvent)

router.post("/", eventController.createEvent)
router.get("/", eventController.getAllEvents)
router.get("/:id", eventController.getEventById)
router.get("/city/:city", eventController.getEventByCity)
router.put('/:id',eventController.updateEvent)
router.delete('/:id',eventController.deleteEvent)

module.exports = router
