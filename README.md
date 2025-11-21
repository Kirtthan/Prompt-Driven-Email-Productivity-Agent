# Prompt-Driven Email Productivity Agent

An intelligent, prompt-driven email agent that categorizes emails, extracts action items, and drafts replies using a local LLM (mocked for this demo).

## Features
- **Inbox Ingestion**: Loads emails from a mock source and processes them using AI.
- **Prompt Brain**: Configurable system prompts that drive the agent's behavior.
- **Email Agent Chat**: Chat with your inbox to summarize emails or ask questions.
- **Draft Review**: Review and edit AI-generated drafts before sending (simulated).
- **Safety**: No emails are sent automatically; all outputs go to a "Drafts" state.

## Project Structure
- `/backend`: FastAPI application (Python)
- `/frontend`: React application (Vite + Tailwind CSS)
- `/data`: Contains `mock_inbox.json` and the SQLite database

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Backend Setup
1. Navigate to the root directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   python -m uvicorn backend.main:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The UI will be available at `http://localhost:5173`.

## Usage Guide

### Loading the Mock Inbox
1. Open the application in your browser.
2. The inbox might be empty initially.
3. To load data, you can trigger the ingestion endpoint (or wait for auto-load if implemented).
   - *Note: In this version, ingestion is triggered via API or automatically on first run if configured.*
   - You can manually trigger it via: `curl -X POST http://localhost:8000/inbox/ingest`

### Configuring Prompts
1. Navigate to the "Prompt Brain" tab.
2. You will see default prompts for Categorization, Action Extraction, and Drafting.
3. Click "Edit" to modify the prompt templates. The agent's behavior will change immediately for new operations.

### Using the Agent
1. Click on an email in the Inbox.
2. Switch to the "Agent Chat" tab.
3. Ask questions like "What is this about?" or "Draft a reply".

### Reviewing Drafts
1. When you ask the agent to draft a reply, it is saved to "Drafts".
2. Go to the "Drafts" tab to view, edit, or approve them.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: SQLite
- **AI**: Modular LLM Service (Mocked for demonstration)
