const express = require('express')
const router = express.Router()

const casesController = require('../controllers/casesController')

router.post('/', casesController.addNewCase)

router.get('/', casesController.getAllCases)

router.put('/:caseId', casesController.resolveCase)
module.exports = router
