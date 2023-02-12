const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyName:{
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
    phoneNumber:{
        type: String,
    },
    img: {
      type: String,
    },
    jobsPosted:{
      type: [String],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);