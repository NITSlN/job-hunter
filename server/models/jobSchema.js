const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    companyRef: {
      type: mongoose.Schema.Types.ObjectId, // id of the company posting the job
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
      type: Number,
      required: true, //in Rs.

    },
    duration: {
      type: Number, // internship duration in months
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
      type: Number, // No. of position for a role
      required: true
    },
    applied: { // Stores id of student
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
      ], 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
