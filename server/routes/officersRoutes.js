const express = require('express')
const router = express.Router()

const officersController = require('../controllers/officersController')

router.post('/', officersController.addNewOfficer)

router.get('/', officersController.getAllOfficers)

module.exports = router
