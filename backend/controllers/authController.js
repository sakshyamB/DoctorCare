const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");

exports.DoctorRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Doctor name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Doctor name must be between 3 and 20 characters")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Doctor name must contain only alphabets and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return res
          .status(409)
          .json({ error: "Doctor with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newDoctor = await Doctor.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Doctor created successfully",
        doctor: {
          id: newDoctor._id,
          name: newDoctor.name,
          email: newDoctor.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];

exports.DoctorLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: doctor._id, name: doctor.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        doctor: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];

exports.PatientRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Patient name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Patient name must be between 3 and 20 characters")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Patient name must contain only alphabets and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      const existingPatient = await Patient.findOne({ email });
      if (existingPatient) {
        return res
          .status(409)
          .json({ error: "Patient with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newPatient = await Patient.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Patient created successfully",
        patient: {
          id: newPatient._id,
          name: newPatient.name,
          email: newPatient.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];

exports.PatientLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const patient = await Patient.findOne({ email });
      if (!patient) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: patient._id, name: patient.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        patient: {
          id: patient._id,
          name: patient.name,
          email: patient.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];
