const bcrypt = require("bcryptjs");
const Student = require("../models/studentSchema");
const JobPost = require("../models/jobPostSchema");
const { generateToken } = require("../utils/helper");

// @desc    Get jobs
// @route   GET /api/student
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find();
    res.status(200).json(jobs);
  } catch (e) {
    console.log(e);
  }
};

// @desc    Rgister User
// @route   POST /api/student/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = await Student.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Hashing password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    // Create user
    const user = await Student.create({
      ...req.body,
      password: hash,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (e) {
    console.log(e);
  }
};

// @desc    logs in
// @route   POST /api/student/login
// @access  Public
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await Student.findOne({ email });

    console.log(user);
    if (user && (await bcrypt.compareSync(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
  }
};

// @desc    get user details
// @route   GET /api/student/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};

// @desc    get user details
// @route   POST /api/student/apply/:id
// @access  Private
const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    const job = await JobPost.findById(jobId);
    if (job.applied.includes(userId)) {
      return res.json("You have already applied for the role.");
    }
    job.applied.push(userId);
    await job.save();
    res.status(200).json("Applied");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getJobs,
  registerStudent,
  loginStudent,
  getMe,
  applyForJob,
};
