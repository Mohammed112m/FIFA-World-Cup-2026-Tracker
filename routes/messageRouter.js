const express = require("express")
const router = express.Router()

const messageController = require("../controller/messageController")

const verifyToken = require("../middleware/verifyToken")


router.post("/", verifyToken, messageController.createMessage)
router.get("/", messageController.getAllMessages)
router.get("/:id", messageController.getMessageById)
router.delete("/:id", verifyToken, messageController.deleteMessage)

module.exports = router
