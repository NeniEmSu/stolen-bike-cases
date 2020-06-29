const Officer = require('../models/officersModel')

exports.addNewOfficer = async (req, res, next) => {
  try {
    const officersData = new Officer({
      name: req.body.name,
    })
    const newOfficer = await officersData.save()

    res.status(201).json({
      type: 'success',
      message: 'Officer Added successfully!',
      newOfficer,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.getAllCases = async (req, res) => {
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
