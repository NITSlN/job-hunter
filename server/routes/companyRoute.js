const express = require('express')
const router = express.Router()
const {getJobs,createJob,updateJob,deleteJob, registerCompany, loginCompany, getProfile, getStudents, logoutCompany} = require('../controllers/companyController')
const { companyProtect } = require('../middleware/authMiddleware')


// base URL - /api/company

// Register Company
router.post('/register', registerCompany)
// Login Company
router.post('/login', loginCompany)
router.post('/logout', logoutCompany)
// Gets all Jobs posted by a company
router.get('/',companyProtect, getJobs)
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