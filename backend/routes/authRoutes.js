const express = require('express');
const AuthController = require('../controllers/authController');
const authRoutes = express.Router();

authRoutes.post('/doctor/register', AuthController.DoctorRegister);
authRoutes.post('/doctor/login',  AuthController.DoctorLogin);
authRoutes.post('/patient/register', AuthController.PatientRegister);
authRoutes.post('/patient/login',  AuthController.PatientLogin);

module.exports = authRoutes;