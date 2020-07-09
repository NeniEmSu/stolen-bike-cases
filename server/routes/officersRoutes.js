const express = require('express')
const router = express.Router()

const officersController = require('../controllers/officersController')

router.post('/', officersController.addNewOfficer)

router.get('/:officerId', officersController.getOfficer)

router.get('/', officersController.getAllOfficers)

router.delete('/:officerId', officersController.deleteOfficer)

module.exports = router
