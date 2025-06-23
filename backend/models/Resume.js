const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String],
  experience: [
    {
      company: String,
      position: String,
      duration: String
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      year: String
    }
  ]
});

module.exports = mongoose.model('Resume', resumeSchema);
