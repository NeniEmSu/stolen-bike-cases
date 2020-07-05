const express = require('express')
const router = express.Router()

const casesController = require('../controllers/casesController')

router.get('/', casesController.getAllCases)

router.get('/:caseId', casesController.getCase)

router.post('/', casesController.addNewCase)

router.put('/:caseId', casesController.resolveCase)

router.delete('/:caseId', casesController.deleteCase)

module.exports = router
