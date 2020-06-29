const mongoose = require('mongoose')

const officerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    _caseId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Officer = mongoose.model('officer', officerSchema)
module.exports = Officer
