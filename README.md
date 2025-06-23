# 💼 Smart Resume Builder with AI Suggestions

A full-stack web application that helps users build professional resumes, receive real-time AI suggestions for improvements, and export resumes as PDFs — all in one place.

## 🚀 Features

- 📝 Dynamic Resume Form using React
- 🤖 AI Suggestions using OpenAI API (Free Tier)
- 📦 Backend with Node.js & Express for storing and retrieving resumes
- 🗃️ MongoDB integration for persistent storage
- 🖨️ Export resume + AI suggestions to PDF (using `html2canvas` and `jsPDF`)
- 🎨 Responsive UI with Tailwind CSS
- 🔐 Modern, minimal, and easy-to-use design

---

## 📁 Project Structure

/elevate7
│
├── backend # Node.js + Express backend
│ ├── server.js
│ └── routes / models / utils ...
│
├── client # React.js frontend
│ ├── src
│ │ ├── App.js
│ │ ├── components/
│ │ └── index.js
│ ├── public/
│ └── tailwind.config.js
│
├── .gitignore
└── README.md

yaml
Copy
Edit

---

## 🧰 Tech Stack

| Frontend        | Backend         | AI API      | Styling       | Database     |
|----------------|------------------|-------------|----------------|---------------|
| React.js       | Node.js + Express | OpenAI (GPT-3.5 Free Tier) | Tailwind CSS | MongoDB (Atlas/local) |

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/HaripriyaDhanireddy/Smart-Resume-Builder-with-AI-Suggestions.git
cd Smart-Resume-Builder-with-AI-Suggestions
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
node server.js
✅ Make sure MongoDB is running locally or provide your MongoDB Atlas URI in server.js.

3️⃣ Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start
🌐 Visit: http://localhost:3000

💡 How AI Suggestions Work
Resume data is sent to a Node.js backend endpoint.

The backend sends a prompt to OpenAI's GPT-3.5 model using your free API key.

GPT returns detailed suggestions which are shown in the UI and included in the exported PDF.

🧾 Export as PDF
The entire resume, including AI suggestions, can be exported using:

html2canvas for DOM capture

jsPDF for generating a downloadable PDF

