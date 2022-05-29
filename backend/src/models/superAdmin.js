const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const superAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'SuperAdmin',
    },
    superAdminInviteId: {
      tpye: Object,
    },
    organizationAdminInviteId: {
      tpye: Object,
    },
    sessionId: String,
    dateOfBirth: {
      type: String,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        autopopulate: { maxDepth: 2 },
      },
    ],
  },
  { timestamps: true }
)

superAdminSchema.plugin(autopopulate)

module.exports = mongoose.model('superAdmin', superAdminSchema)
