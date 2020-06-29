const express = require('express')
const router = express.Router()

const casesController = require('../controllers/casesController')

router.post('/', casesController.addNewCase)

router.get('/', casesController.getAllCases)

module.exports = router
