const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "email already exists in database"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  department:{
    type: String,
    required: [true, 'Department name required'],
  },
  currentPosition: {
    type: String,
    required: [true, "Please enter the employee position"],
  },
  experience: {
    type: Number,
    required: true,
  },
  reportingHead: {
    type: String,
    required: [true, "Name of Reporing Head Required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary can not be empty"],
  },
  employers:[{
    type: Schema.Types.ObjectId,
    ref: 'Employer'
  }]
});
module.exports = mongoose.model("Employee", employeeSchema);
