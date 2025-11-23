# Nexus - Email Productivity Agent

A modern email management application with AI-powered assistance using Google's Gemini API.

## Features

- **Smart Inbox**: Clean, organized email interface with search and filtering
- **AI Agent Chat**: Ask questions about your emails and get intelligent responses
- **Draft Editor**: Compose and manage email drafts
- **Prompt Brain**: Manage and customize AI prompts
- **Theme Support**: Switch between light and dark modes
- **Modern UI**: Built with the "Kozowood" design system featuring earthy tones and smooth animations

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini API
- **Database**: SQLite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.13+
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kirtthan/Prompt-Driven-Email-Productivity-Agent.git
cd Prompt-Driven-Email-Productivity-Agent
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ..
pip install -r requirements.txt
```

4. Set up your Gemini API key in the frontend code (or use environment variables)

### Running the Application

**Start the backend:**
```bash
python -m uvicorn backend.main:app --reload
```

**Start the frontend (in a new terminal):**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── backend/              # FastAPI backend
│   ├── main.py          # Main application
│   ├── models.py        # Database models
│   ├── routers/         # API routes
│   └── services/        # Business logic
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.jsx      # Main app component
│   └── package.json
├── data/                # Mock data and database
└── requirements.txt     # Python dependencies
```

## License

MIT License - feel free to use this project for learning or production!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
