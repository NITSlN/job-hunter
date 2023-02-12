const express = require('express')
const { registerStudent, loginStudent, getMe, getJobs, applyForJob } = require('../controllers/StudentController')
const { protect } = require('../middleware/authMiddleware')
// const JobPost = require('../models/jobPostSchema')
const router = express.Router()

// base URL - /api/student

router.post('/register', registerStudent)
router.post('/login', loginStudent)
// get user details
router.get('/me',protect, getMe)
// gets all the jobs posted
router.get('/', getJobs)
// apply for a job
router.post('/apply/:id',protect,applyForJob)

module.exports = router