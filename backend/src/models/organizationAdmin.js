const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const organizationAdmin = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      default: 'OrgazinationAdmin',
    },
    sessionId: String,
    dateOfBirth: {
      type: String,
    },
  },
  { timestamps: true }
)

organizationAdmin.plugin(autopopulate)

module.exports = mongoose.model('organizationAdmin', organizationAdmin)
