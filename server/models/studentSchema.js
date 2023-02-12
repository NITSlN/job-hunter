const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    img: {
      type: String,
    },
    phoneNumber:{
        type: String,
    },
    collegeName:{
      type: String,
    },
    yearOfPassing:{
      type: String,
    },
    gitHub:{
      type: String,
    },
    LinkedIn:{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);