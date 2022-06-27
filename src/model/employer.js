const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employerSchema = new Schema({
  employerName: {
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
  password: {
    type: String,
    required: true,
  },
  employees:[{
    type:Schema.Types.ObjectId,
    ref: 'Employee'
  }],
});

module.exports = mongoose.model("Employer", employerSchema);
