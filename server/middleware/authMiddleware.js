const jwt = require('jsonwebtoken')
const Student = require('../models/studentSchema')
const Company = require('../models/companySchema')

const protect = async (req, res, next) => {
  let token

  // headers.authorization contains token as "Bearer token"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const student = await Student.findById(decoded.id).select('-password')
      const company = await Company.findById(decoded.id).select('-password')

      req.user = student || company
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

module.exports = { protect }