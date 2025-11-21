# Prompt-Driven Email Productivity Agent

An intelligent email assistant powered by AI that helps you manage your inbox with natural language prompts.

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- Node.js 18+
- Gemini API Key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kirtthan/Prompt-Driven-Email-Productivity-Agent.git
   cd Prompt-Driven-Email-Productivity-Agent
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   API_KEY=your_gemini_api_key_here
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Use the start script (Windows)
```powershell
.\start.ps1
```

#### Option 2: Manual start

**Terminal 1 - Backend:**
```bash
python -m uvicorn backend.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

## 📧 Features

### ✨ Interactive Draft Generation
- Ask the agent to draft email replies
- Get 3 options with different tones (Professional, Friendly, Brief)
- Copy drafts to clipboard or save them directly

### 🎨 Beautiful UI
- Modern, responsive design
- Markdown rendering for rich text
- Interactive draft cards
- Quick action buttons

### 🤖 AI-Powered
- Natural language email categorization
- Action item extraction
- Smart reply suggestions
- Context-aware responses

### 📝 Prompt Brain
- Customize AI behavior with custom prompts
- Define categorization rules
- Configure response styles

## 🛠️ Useful Scripts

### Reset Database
When you update `mock_inbox.json`, run this to reload the emails:
```powershell
.\reset-database.ps1
```

This will:
1. Stop the backend server
2. Delete the old database
3. Restart the server with fresh mock data

## 📁 Project Structure

```
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── routers/             # API endpoints
│   │   ├── inbox.py
│   │   ├── prompts.py
│   │   └── agent.py
│   └── services/            # Business logic
│       ├── llm_service.py   # LLM integration
│       └── ingestion.py     # Email ingestion
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application
│   │   └── components/      # React components
│   │       ├── InboxViewer.jsx
│   │       ├── AgentChat.jsx
│   │       ├── DraftCard.jsx
│   │       ├── DraftReview.jsx
│   │       └── PromptBrain.jsx
│   └── package.json
├── data/
│   └── mock_inbox.json      # Sample emails
├── start.ps1                # Quick start script
├── reset-database.ps1       # Database reset script
└── requirements.txt         # Python dependencies
```

## 🔧 API Endpoints

- `GET /inbox/` - List all emails
- `GET /inbox/{email_id}` - Get specific email
- `POST /inbox/ingest` - Reload emails from mock data
- `POST /agent/chat` - Chat with AI agent
- `POST /agent/draft` - Create email draft
- `GET /prompts/` - List all prompts
- `POST /prompts/` - Create new prompt

API Documentation: http://127.0.0.1:8000/docs

## 🎯 Usage Examples

### Draft a Reply
1. Select an email from the inbox
2. Click "Draft Reply" or type "draft a reply to this email"
3. Choose from 3 tone options
4. Copy or save the draft

### Ask Questions
- "Summarize this email"
- "What action items are in this email?"
- "Is this email urgent?"

### Customize Behavior
1. Go to "Prompt Brain"
2. Edit the system prompts
3. Define custom categorization rules

## 🚀 Deployment

The application is configured for Vercel deployment:
- Backend: Serverless functions
- Frontend: Static site
- See `vercel.json` for configuration

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.
