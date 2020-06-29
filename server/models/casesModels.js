const mongoose = require('mongoose')

const caseSchema = mongoose.Schema(
  {
    owners_name: {
      type: String,
      required: true,
    },
    bike_description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    theft_date: {
      type: String,
      required: true,
    },
    theft_location: {
      type: String,
      required: true,
    },
    theft_description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    _officerId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Case = mongoose.model('case', caseSchema)
module.exports = Case
