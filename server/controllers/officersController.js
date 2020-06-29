const Officer = require('../models/officersModel')
const Case = require('../models/casesModel')

async function findUnasignedCaseAndAssignIt(officerData) {
  const availableCase = await Case.findOne({ _officerId: null }).sort({
    updatedAt: 1,
  })

  if (availableCase) {
    officerData._caseId = availableCase.id
  }

  const createdOfficer = await officerData.save()

  if (availableCase) {
    availableCase._officerId = createdOfficer._id
    availableCase.status = 'In Progress'
    await availableCase.save()
  }

  return createdOfficer
}

exports.addNewOfficer = async (req, res, next) => {
  try {
    const officersData = new Officer({
      name: req.body.name,
      _caseId: null,
    })

    const newOfficer = await findUnasignedCaseAndAssignIt(officersData)

    res.status(201).json({
      type: 'success',
      message: 'Officer Added successfully!',
      newOfficer,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.getAllOfficers = async (req, res) => {
  try {
    const officers = await Officer.find().sort({ createdAt: -1 })
    res.status(200).json({
      type: 'success',
      officers,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}
