const express = require('express')
const router = express.Router();
const collegeController = require('../Controller/CollegeController')
const internController = require('../Controller/internController')

// POST /functionup/colleges
router.post("/functionup/colleges", collegeController.createCollege)

// POST /functionup/interns
router.post("/functionup/interns", internController.createIntern)

// GET /functionup/collegeDetails
router.get("/functionup/collegeDetails", collegeController.getInterns)


module.exports = router