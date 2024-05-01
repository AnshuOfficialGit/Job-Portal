const express = require('express')
const router = express.Router();
const authController = require('../app/controller/auth/authController');
router.post('/register/recruiter',authController.registerRecruiter);
router.post('/login',authController.login);
module.exports = router

