const express = require('express')
const router = express.Router()
const {getJobs,createJob,updateJob,deleteJob, registerCompany, loginCompany, getProfile, getStudents} = require('../controllers/companyController')
const { protect } = require('../middleware/authMiddleware')

// Register Company
router.post('/register', registerCompany)
// Login Company
router.post('/login', loginCompany)
// Gets all Jobs posted by a company
router.get('/',protect, getJobs)
// Get the company profile
router.get('/profile',protect, getProfile)

// Get all the students applied on a job
router.get('/profile/job/:id',protect, getStudents)

// Post job
router.post('/postJob',protect, createJob)
// Update Job
router.put('/updatePost/:id',protect,updateJob)
// Delete Job
router.delete('/deletePost/:id',protect,deleteJob)


module.exports = router