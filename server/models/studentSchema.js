const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  imgUrl:String,
  password: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startYear: Number,
      endYear: Number,
    },
  ],
  resumeLink:{
    type:String,
  },
  workExperience: [
    {
      company: String,
      position: String,
      description: String,
      startDate: Date, // date
      endDate: Date,
    },
  ],
  skills: [String],
  certifications: [
    {
      certificateName: String,
      issuingOrganization: String,
      certificateLink:String,
      issueDate: Date,
    },
  ],
  savedJobs: [
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
      companyName: String,
      title: String,
      dateApplied: Date,
      status: String,
    },
  ],
  applications: [String],
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

module.exports = Student;
