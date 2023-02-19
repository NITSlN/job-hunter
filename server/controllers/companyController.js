const bcrypt = require('bcryptjs')
var mongoose = require('mongoose')

const JobPost = require('../models/jobPostSchema')
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
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (e) {
    console.log(e)
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

    console.log(user)
    if (user && (await bcrypt.compareSync(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  } catch (e) {
    console.log(e)
  }
}

// @desc    Get jobs
// @route   GET /api/company
// @access  Private
const getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find({company:req.user.id}).sort({_id:-1})
    res.status(200).json(jobs)
  } catch (err) {
    console.log(err)
  }
}

// @desc    Create jobs
// @route   GET /api/company
// @access  Private
const createJob = async (req, res) => {
  try {
    // getting tags
    const tags = req.body.tags?.split(',')
    // finding company using user id
    const company = await Company.findById(req.user.id)
    // creating Job in db
    const post = await JobPost.create({ company:company.id,companyName:company.name, ...req.body, tags })
    // adding this job to company's posted job array
    company.jobsPosted.push(post.id)
    await company.save()
    // sending the job back
    res.json(post)
  } catch (err) {
    console.log(err)
  }
}
// @desc    Update jobs
// @route   GET /api/company/updatePost/id
// @access  Private
const updateJob = async (req, res) => {
  try {
    var tags = req.body.tags?.split(',')
    tags = tags.map((tag)=> tag.trim())
    const post = await JobPost.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, tags },
      { new: true },
    )
    res.json(post)
  } catch (err) {
    console.log(err)
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
    await JobPost.deleteOne({_id:mongoose.Types.ObjectId(req.params.id)},{new:true})
    res.json('Post Deleted')
  } catch (err) {
    console.log(err)
  }
}

// @desc    get user details
// @route   GET /api/company/me
// @access  Private
const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log(error)
  }
}
// @desc    get user details
// @route   GET /api/company/profile/job/:id
// @access  Private
const getStudents = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id)
    const studentsApplied = job.applied.map((id)=> Student.findById(id))
    const appliedStudentDetails = await Promise.all(studentsApplied).then((studentDetail)=>{
      return studentDetail;
    }).catch((error) => {
      console.log(error)
    });
    res.status(200).json(appliedStudentDetails)
  } catch (error) {
    console.log(error)
  }
}



module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  loginCompany,
  registerCompany,
  getProfile,
  getStudents
}
