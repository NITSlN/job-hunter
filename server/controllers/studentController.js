const bcrypt = require('bcryptjs')
const Student = require('../models/studentSchema')
const Jobs = require('../models/jobSchema')
const { generateToken } = require('../utils/helper')

// @desc    Get jobs
// @route   GET /api/student
// @access  Public
const getJobs = async (req, res) => {
  try {
    let jobs = await Jobs.find()
    const appliedJobs = req.user.applications // convert ObjectIds to strings
    console.log(appliedJobs)
    // Filter out jobs that have an id in the appliedJobs array
    jobs = jobs.filter((job) => !appliedJobs.includes(job.id))

    // Return the remaining jobs
    res.status(200).json(jobs)
  } catch (e) {
    console.log(e)
  }
}

// @desc    Rgister User
// @route   POST /api/student/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await Student.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    // Hashing password
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    // Create user
    const user = await Student.create({
      ...req.body,
      password: hash,
    })

    if (user) {
      res
        .cookie('access_token', generateToken(user._id), {
          expires: new Date(Date.now() + 25892000000), // expire in 30 days
          httpOnly: true,
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
  } catch (e) {
    console.log(e)
  }
}

// @desc    logs in
// @route   POST /api/student/login
// @access  Public
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await Student.findOne({ email })

    console.log(user)
    if (user && (await bcrypt.compareSync(password, user.password))) {
      res
        .cookie('access_token', generateToken(user._id), {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
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
  } catch (e) {
    console.log(e)
  }
}

// @desc    get user details
// @route   GET /api/student/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log(error)
  }
}

// @desc    get user details
// @route   POST /api/student/apply/:id
// @access  Private
const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id
    const userId = req.user.id
    console.log(jobId, userId)
    if (job.applied.includes(userId)) {
      return res.json('You have already applied for the role.')
    }
    await Jobs.findOneAndUpdate(
      { _id: jobId },
      { $addToSet: { applied: userId } },
      { new: true },
    )

    await Student.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { applications: jobId } },
      { new: true },
    )
    res.status(200).json('Applied')
  } catch (error) {
    console.log(error)
  }
}

// @desc    Add education
// @route   POST /api/student/education
// @access  Private
const addEducation = async (req, res) => {
  const { school, degree, fieldOfStudy, startYear, endYear } = req.body
  const studentId = req.user.id

  try {
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' })
    }

    student.education.push({ school, degree, fieldOfStudy, startYear, endYear })
    await student.save()

    res.json(student)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @desc    Del education
// @route   POST /api/student/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  const studentId = req.user.id
  const educationId = req.params.id

  try {
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    student.education = student.education.filter(
      (edu) => edu._id != educationId,
    )
    await student.save()

    res.json({ message: 'Education deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Add Work Exp
// @route   POST /api/student/work-experience
// @access  Private
const addExperience = async (req, res) => {
  try {
    const { company, position, description, startDate, endDate } = req.body
    const student = await Student.findById(req.user.id) // Assuming you're using passport.js for authentication and have access to the user id through req.user

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    const newWorkExperience = {
      company,
      position,
      description,
      startDate,
      endDate,
    }

    student.workExperience.push(newWorkExperience)
    await student.save()
    res.status(201).json(student.workExperience)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Del Work Exp
// @route   POST /api/student/work-experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  const studentId = req.user.id
  const workExperienceId = req.params.id

  try {
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Filter out the work experience with the given id
    const filteredWorkExperience = student.workExperience.filter((workExp) => workExp.id !== workExperienceId)

    // Update the student's work experience array
    student.workExperience = filteredWorkExperience

    // Save the updated student document
    await student.save()

    res.json({ message: 'Work experience deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
// @desc    Add skills
// @route   POST /api/student/skills
// @access  Private
const addSkills = async (req, res) => {
  const { skills } = req.body;
  const trimmedSkills = skills?.split(",").map((skill) => skill.trim()) || [];

  try {
    const student = await Student.findById(req.user.id);

    if (skills.length === 0) {
      student.skills = [];
      await student.save();
      return res.status(400).json({ message: "Please provide at least one skill" });
    }

    student.skills = trimmedSkills;
    await student.save();

    res.status(200).json({ message: "Skills added successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const logoutStudent = (req, res) => {
  res.cookie('access_token', '', { maxAge: 1 }).json({})
}
module.exports = {
  getJobs,
  registerStudent,
  loginStudent,
  getMe,
  applyForJob,
  logoutStudent,
  addEducation,
  deleteEducation,
  addExperience,
  deleteExperience,
  addSkills,
}
