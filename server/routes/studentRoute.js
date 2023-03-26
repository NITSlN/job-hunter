const express = require("express");
const {
  registerStudent,
  loginStudent,
  getMe,
  getJobs,
  applyForJob,
  logoutStudent,
} = require("../controllers/studentController");
const { studentProtect } = require("../middleware/authMiddleware");
const router = express.Router();

// base URL - /api/student

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/logout", logoutStudent);
// get user details
router.get("/me", studentProtect, getMe);
// gets all the jobs posted
router.get("/", getJobs);
// apply for a job
router.post("/apply/:id", studentProtect, applyForJob);

module.exports = router;
