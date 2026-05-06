const express = require ('express')
const router = express.Router()

////////////////////////////////////////
const matchController = require("../controller/matchController")


router.post("/", matchController.createMatch)
router.get('/',matchController.getAllMatch)
router.get('/:id',matchController.getMatchById)
router.put('/:id',matchController.updateMatch)
router.delete('/:id',matchController.deleteMatch)


module.exports = router
