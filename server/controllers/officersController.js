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

exports.deleteOfficer = async (req, res) => {
  try {
    const id = req.params.officerId
    const officer = await Officer.findOne({ _id: id })
    if (!officer._caseId) {
      await Officer.deleteOne({ _id: id })
      return res
        .status(200)
        .json({ type: 'success', message: 'Officer successfully removed.' })
    }

    const caseObj = await Case.findOne({ _id: officer._caseId })
    caseObj.status = 'pending'
    caseObj._officerId = null
    const unresolvedCase = await caseObj.save()
    await Officer.deleteOne({ _id: id })
    const editedCase = await findAvailableOfficer(unresolvedCase)

    res.status(200).json({
      type: 'success',
      message: editedCase.reponseMessage,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

async function findAvailableOfficer(caseData) {
  const availableOfficer = await Officer.findOne({ _caseId: null }).sort({
    updatedAt: -1,
  })

  let reponseMessage =
    'The Officer was successfully removed and his unresolved case will be reasigned once and officer is availble.'

  if (availableOfficer) {
    caseData._officerId = availableOfficer._id
    caseData.status = 'In Progress'
    reponseMessage =
      'The Officer was successfully removed and his unresolved case has been reasigned to an availble officer.'
  }

  const updatedCase = await caseData.save()

  if (availableOfficer) {
    availableOfficer._caseId = updatedCase._id
    await availableOfficer.save()
  }

  return { updatedCase, reponseMessage }
}
