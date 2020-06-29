const Case = require('../models/casesModel')
const Officer = require('../models/officersModel')

async function findAvailableOfficer(caseData) {
  const availableOfficer = await Officer.findOne({ _caseId: null }).sort({
    updatedAt: -1,
  })

  if (availableOfficer) {
    caseData._officerId = availableOfficer.id
    caseData.status = 'In Progress'
  }

  const createdCase = await caseData.save()

  if (availableOfficer) {
    availableOfficer._caseId = createdCase._id
    await availableOfficer.save()
  }

  return createdCase
}

exports.addNewCase = async (req, res, next) => {
  try {
    const caseData = new Case({
      owners_name: req.body.owners_name,
      bike_description: req.body.bike_description,
      type: req.body.type,
      theft_date: req.body.theft_date,
      theft_location: req.body.theft_location,
      theft_description: req.body.theft_description,
      status: 'pending',
      _officerId: null,
    })

    const newCase = await findAvailableOfficer(caseData)

    res.status(201).json({
      type: 'success',
      message: 'Case Added successfully!',
      newCase,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 })
    res.status(200).json({
      type: 'success',
      cases,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}
