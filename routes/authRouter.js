const express = require("express")
const router = express.Router()

////////////////////////////////////////

const authController = require("../controller/authController")

router.post("/sign-up", authController.signUp)
router.post("/sign-in", authController.SingIn)

module.exports = router
