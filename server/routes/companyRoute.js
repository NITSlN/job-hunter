const express = require('express')
const router = express.Router()
const {getJobs,createJob,updateJob,deleteJob, registerCompany, loginCompany, getProfile, getStudents} = require('../controllers/companyController')
const { companyProtect } = require('../middleware/authMiddleware')


// Register Company
router.post('/register', registerCompany)
// Login Company
router.post('/login', loginCompany)
// Gets all Jobs posted by a company
router.get('/',protect, getJobs)
// Get the company profile
router.get('/profile',companyProtect, getProfile)

// Get all the students applied on a job
router.get('/profile/job/:id',companyProtect, getStudents)

// Post job
router.post('/postJob',companyProtect, createJob)
// Update Job
router.put('/updatePost/:id',companyProtect,updateJob)
// Delete Job
router.delete('/deletePost/:id',companyProtect,deleteJob)


module.exports = router