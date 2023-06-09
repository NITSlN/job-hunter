const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    description: {
      type: String,
    },
    companySize: {
      type: String, // 1-10, 11-50 ...
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    address: {
      type: String,
    },
    jobsPosted: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
          required: true,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.model.Company || mongoose.model("Company", CompanySchema);
