const mongoose = require("mongoose");

const EmergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
});

const MedicalHistorySchema = new mongoose.Schema({
  allergies: {
    type: String,
    default: "",
  },
  currentMedications: {
    type: String,
    default: "",
  },
  chronicConditions: {
    type: String,
    default: "",
  },
});

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleid: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileImage: {
    type: String,
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  emergencyContact : EmergencyContactSchema,
  medicalHistory : MedicalHistorySchema,
},{timestamps:true});

module.exports = mongoose.model("Patient", patientSchema);
