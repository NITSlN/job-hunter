const express = require('express')
const {
  registerStudent,
  loginStudent,
  getMe,
  getJobs,
  applyForJob,
  logoutStudent,
  addEducation,
  deleteEducation,
  addExperience,
  deleteExperience,
  addSkills,
  addCertificate,
  deleteCertificate,
  updateResumeLink,
  getStudentProfile,
} = require('../controllers/studentController')
const { studentProtect } = require('../middleware/authMiddleware')
const router = express.Router()

// base URL - /api/student

router.post('/register', registerStudent)
router.post('/login', loginStudent)
router.post('/logout', logoutStudent)
// get user details
router.get('/me', studentProtect, getMe)
router.get('/profile/:id', getStudentProfile)
// gets all the jobs posted
router.get('/', studentProtect, getJobs)
// apply for a job
router.post('/apply/:id', studentProtect, applyForJob)
// Add Education
router.post('/education', studentProtect, addEducation)

router.delete('/education/:id', studentProtect, deleteEducation)

router.post('/work-experience', studentProtect, addExperience)

// DELETE /api/student/work-experience/:id
router.delete('/work-experience/:id', studentProtect, deleteExperience)

// Add Skill
router.put('/skills', studentProtect, addSkills)

router.put('/certificates', studentProtect, addCertificate)

router.delete('/certificates/:id', studentProtect, deleteCertificate)

router.put('/resume', studentProtect,updateResumeLink);

module.exports = router
