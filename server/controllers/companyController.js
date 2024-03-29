const bcrypt = require('bcryptjs')
var mongoose = require('mongoose')

const JobPost = require('../models/jobSchema')
const Company = require('../models/companySchema')
const Student = require('../models/studentSchema')

const { generateToken } = require('../utils/helper')

// @desc    Rgister Company
// @route   GET /api/student/register
// @access  Public

const registerCompany = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body
    if (!name || !email || !password || !companyName) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await Company.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    // Hashing password
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    // Create user
    const user = await Company.create({
      ...req.body,
      password: hash,
    })

    if (user) {
      res
        .cookie('access_token', generateToken(user._id), {
          expires: new Date(Date.now() + 25892000000), // expire in 30 days
          httpOnly: true,
          secure:true,
          sameSite: "None",
        })
        .status(200)
        .json({
          _id: user.id,
          name: user.name,
          email: user.email,
        })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// @desc    logs in company
// @route   GET /api/company/login
// @access  Public
const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await Company.findOne({ email })

    if (user && (await bcrypt.compareSync(password, user.password))) {
      res
        .cookie('access_token', generateToken(user._id), {
          expires: new Date(Date.now()+25892000000),
          httpOnly: true,
          secure:true,
          sameSite: "None",
        })
        .status(200)
        .json({
          _id: user.id,
          name: user.name,
          email: user.email,
        })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// @desc    Get jobs
// @route   GET /api/company
// @access  Private
const getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find({ company: req.user.id }).sort({ _id: -1 })
    res.status(200).json(jobs)
  } catch (err) {
    res.status(500).json(err)
  }
}

// @desc    Create jobs
// @route   GET /api/company
// @access  Private
const createJob = async (req, res) => {
  try {
    // getting tags
    let skills = req.body.skills?.split(',');
    skills = skills.map(skill=>skill.trim())
    // finding company using user id
    const company = req.user
    // creating Job in db
    const post = await JobPost.create({
      companyRef: company._id,
      companyName: company.companyName,
      ...req.body,
      skills,
    })
    // adding this job to company's posted job array
    company.jobsPosted.push(post._id)
    await company.save()
    // sending the job back
    res.json(post)
  } catch (err) {
    res.status(500).json(err)
  }
}
// @desc    Update jobs
// @route   GET /api/company/updatePost/id
// @access  Private
const updateJob = async (req, res) => {
  try {
    var tags = req.body.tags?.split(',')
    tags = tags.map((tag) => tag.trim())
    const post = await JobPost.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, tags },
      { new: true },
    )
    res.json(post)
  } catch (err) {
    res.status(500).json(err)
  }
}

// @desc    Delete jobs
// @route   GET /api/company/deletePost/id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id)
    company.jobsPosted.remove(req.params.id)
    company.save()
    await JobPost.deleteOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { new: true },
    )
    res.json('Post Deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}

// @desc    get user details
// @route   GET /api/company/me
// @access  Private
const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json(error)
  }
}
// @desc    get applied students
// @route   GET /api/company/profile/job/:id
// @access  Private
const getStudents = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id)
    const studentsApplied = job.applied.map((id) => Student.findById(id))
    const appliedStudentDetails = await Promise.all(studentsApplied)
      .then((studentDetail) => {
        return studentDetail
      })
      .catch((error) => {
        res.status(500).json(error)
      })
      console.log(appliedStudentDetails);
    res.status(200).json(appliedStudentDetails)
  } catch (error) {
    res.status(500).json(error)
  }
}
// @desc    Update company details
// @route   GET /api/company/profile/update/
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const companyId = req.user.id;

    // Update the company profile with the new data
    const updatedProfile = await Company.findByIdAndUpdate(
      companyId,
      req.body,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company profile updated successfully', company: updatedProfile });
  } catch (error) {
    res.status(500).json(error);
  }
}
// @desc    Update company details by id
// @route   GET /api/company/profile/:id
// @access  Public
const getCompanyProfile = async (req, res) => {
  try {
    const companyId = req.params.id;
  
    // Retrieve company profile from MongoDB based on companyId
    const companyProfile = await Company.findById(companyId);

    if (!companyProfile) {
      // Handle case when company profile is not found
      return res.status(404).json({ error: 'Company profile not found' });
    }

    res.json( companyProfile );
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error('Error retrieving company profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const logoutCompany = (req, res) => {
  res.cookie('access_token', '', { maxAge: 1 }).json({})
}
module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  loginCompany,
  registerCompany,
  getProfile,
  getStudents,
  logoutCompany,
  updateProfile,
  getCompanyProfile
}
