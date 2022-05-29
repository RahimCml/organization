const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
// const User = require('./user')

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    users: {
      type: 'ObjectId',
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  },
  { timestamps: true }
)

TeamSchema.plugin(autopopulate)

module.exports = mongoose.model('Team', TeamSchema)
