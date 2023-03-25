const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    companyRef: {
      type: String, // id of the company posting the job
      required: true,
    },
    companyName: {
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
    skills: {
      type: [String], // tags of role
      default: [],
      required: true,
    },
    stipend: {
      type: String,
      required: true, //in Rs.

    },
    duration: {
      type: String, // internship duration in months
      required: true,
    },
    type: {
      type: String, // full-time, part-time or semi-full-time
      required: true,
    },
    mode: {
      type: String, // in-office, hybrid, WFH
      required: true,
    },
    positions: {
      type: String, // No. of position for a role
      required: true
    },
    applied: {
      type: [String], // Stores id of student
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
