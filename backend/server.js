// backend/server.js

// Load environment variables from .env file
// You'll need to create a .env file in your 'backend' directory for your MongoDB URI and OpenAI API Key
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const OpenAI = require('openai'); // We will comment this out as we are mocking the AI response

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables CORS for all routes, allowing frontend to communicate
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
// Replace process.env.MONGO_URI with your actual MongoDB connection string in a .env file
// Example .env entry: MONGO_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
// Or for local: MONGO_URI="mongodb://localhost:27017/resume_builder_db"
mongoose.connect(process.env.MONGODB_URI) // Use MONGODB_URI from .env
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose Schema for the Resume
const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String], // Array of strings
  experience: [{
    company: String,
    position: String,
    duration: String, // You might want to add duration if your form supports it, or keep it simple
  }],
  education: [{
    institution: String,
    degree: String,
    year: String,
  }],
  summary: String, // Added a summary field for AI suggestions or manual input
  // Add more fields as per your resume structure
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Resume = mongoose.model('Resume', resumeSchema);

// Initialize OpenAI client - COMMENTED OUT FOR MOCKING
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// API Routes

// GET all resumes
app.get('/api/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find({});
    res.json(resumes);
  } catch (err) {
    console.error('Error fetching resumes:', err);
    res.status(500).json({ message: 'Error fetching resumes', error: err.message });
  }
});

// POST a new resume
app.post('/api/resumes', async (req, res) => {
  const { name, email, skills, experience, education, summary } = req.body;
  try {
    const newResume = new Resume({ name, email, skills, experience, education, summary });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (err) {
    console.error('Error saving resume:', err);
    res.status(500).json({ message: 'Error saving resume', error: err.message });
  }
});

// PUT (update) a resume by ID - Optional for now, but good to have
app.put('/api/resumes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, skills, experience, education, summary } = req.body;
  try {
    const updatedResume = await Resume.findByIdAndUpdate(id, { name, email, skills, experience, education, summary }, { new: true });
    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(updatedResume);
  } catch (err) {
    console.error('Error updating resume:', err);
    res.status(500).json({ message: 'Error updating resume', error: err.message });
  }
});

// DELETE a resume by ID - Optional for now
app.delete('/api/resumes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResume = await Resume.findByIdAndDelete(id);
    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Error deleting resume:', err);
    res.status(500).json({ message: 'Error deleting resume', error: err.message });
  }
});


// POST for AI suggestions - MOCKED VERSION
app.post('/api/suggestions', async (req, res) => {
  const { name, skills, experience, education } = req.body;

  // Simulate a delay for a more realistic "AI thinking" experience
  await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay

  let mockSuggestions = [
    "Consider adding specific achievements and quantifiable results to your experience descriptions.",
    "Elaborate on your key skills with examples of how you applied them.",
    "Tailor your resume to the specific job description you're applying for by using relevant keywords.",
    "Ensure consistent formatting throughout the resume, especially for dates and bullet points.",
    "Add a brief professional summary at the top to highlight your value proposition."
  ];

  // You can make suggestions slightly dynamic based on input
  if (skills && skills.length > 0) {
      mockSuggestions.unshift(`Highlight your proficiency in ${skills[0]} with a project example.`);
  }
  if (experience && experience.length > 0 && experience[0].company) {
      mockSuggestions.unshift(`For ${experience[0].company}, quantify your impact (e.g., "Increased sales by 15%").`);
  }
  if (!name || !skills || !experience || !education) {
      mockSuggestions.push("Please fill in all resume sections for more tailored suggestions!");
  }


  const suggestionsText = mockSuggestions.join('\n- '); // Format as bullet points
  res.json({ suggestions: suggestionsText });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Node.js backend server listening on port ${PORT}`);
});
