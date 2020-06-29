const Case = require('../models/casesModel')
const Officer = require('../models/officersModel')

async function findAvailableOfficer(caseData) {
  const availableOfficer = await Officer.findOne({ _caseId: null }).sort({
    updatedAt: -1,
  })

  if (availableOfficer) {
    caseData._officerId = availableOfficer._id
    caseData.status = 'In Progress'
  }

  const createdCase = await caseData.save()

  if (availableOfficer) {
    availableOfficer._caseId = createdCase._id
    await availableOfficer.save()
  }

  return createdCase
}

async function assignCase(officerId) {
  const unassignedCase = await Case.findOne({ status: 'pending' }).sort({
    createdAt: 1,
  })
  if (unassignedCase) {
    await Officer.updateOne(
      {
        _id: officerId,
      },
      {
        _caseId: unassignedCase._id,
      }
    )

    unassignedCase._officerId = officerId
    unassignedCase.status = 'In Progress'
    return await unassignedCase.save()
  }
  return false
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

exports.resolveCase = async (req, res, next) => {
  try {
    const id = req.params.caseId
    const caseObj = await Case.findOne({ _id: id })
    if (!caseObj) {
      throw new Error('Case not found')
    }
    if (caseObj.status === 'pending') {
      throw new Error('Case is not yet assigned')
    }
    if (caseObj.status === 'Found') {
      throw new Error('Case already resolved')
    }

    caseObj.status = 'Found'
    const resolvedCase = await caseObj.save()
    await Officer.update(
      {
        _id: caseObj._officerId,
      },
      {
        _caseId: null,
      }
    )
    const caseAssigned = await assignCase(caseObj._officerId)

    res.status(200).json({
      type: 'success',
      message: 'The bike has been found and case resolved!',
      resolvedCase,
      caseAssigned,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}
