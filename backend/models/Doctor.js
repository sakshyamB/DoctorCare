const mongoose = require("mongoose");

export const healthcareCategoriesList = [
  "Primary Care",
  "Manage Your Condition",
  "Mental and Behavioral Health",
  "Sexual Health",
  "Children's Health",
  "Senior Citizen Health",
  "Women's Health",
  "Men's Health",
  "Wellness",
];

const doctorSchema = new mongoose.Schema(
  {
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
    Specialization: {
      type: String,
      enum: [
        "Cardiologist",
        "Dermatologist",
        "Orthopedic",
        "Pediatrician",
        "Neurologist",
        "Gynecologist",
        "General Physician",
        "ENT Specialist",
        "Psyciatrist",
        "Ophthalmologist",
      ],
    },
    category: {
      type: String,
      enum: healthcareCategoriesList,
      required: false,
    },
    qualification: {
      type: String,
      required: false,
    },
    experience: {
      type: Number,
    },
    fees: {
      type: Number
    },
    hospitalInfo: {
        name: String,
        address: String
    }
  });

module.exports = mongoose.model("Doctor", doctorSchema);
