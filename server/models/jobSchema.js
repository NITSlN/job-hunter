const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
  {
    companyRef: {
      type: String, // id of the company posting the job
      required: true, 
    },
    companyName:{
      type: String, // id of the company posting the job
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // tags of role
      default: [],
      required: true,
    },
    stipend: {
      type: String,
      default: '5k',
    },
    duration: {
      type: String,  // internship duration
      default: '1 M',
    },
    type: {
      type: String, // full-time, part-time or semi-full-time
      required: true,
    },
    mode: {
      type: String, // in-office, hybrid, WFH
      // required: true,
    },
    positions: {
      type: String, // No. of position for a role
      default: '1',
    },
    applied:{
      type:[String],  // Stores id of student
    }
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Job', jobSchema)
