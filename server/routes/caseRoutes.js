const express = require('express')
const router = express.Router()

const casesController = require('../controllers/casesController')

router.post('/', casesController.addNewCase)

module.exports = router
