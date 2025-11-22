# 🌿 Nexus: Your Intelligent Email Sanctuary

Welcome to **Nexus**, a reimagined email experience designed to bring calm, focus, and intelligence to your inbox.

We built Nexus because we believe email shouldn't be a chore. It should be a place where you feel in control, supported by intelligent tools that understand your context.

## ✨ The "Kozowood" Design Philosophy

Nexus isn't just about features; it's about *feeling*. We've adopted the **Kozowood** design system—an aesthetic grounded in nature, serenity, and warmth.

- **Earthy & Serene**: A palette of Warm Off-White, Slate Gray, and accents of Sky Blue, Fern Green, and Clay.
- **Glassmorphism**: Subtle transparencies that create depth and a modern, airy feel.
- **Fluid Motion**: Smooth, organic animations that make every interaction feel alive.
- **Focus-First**: A clean, distraction-free interface that puts your content center stage.

## 🧠 Powered by Intelligence

Under the hood, Nexus connects directly to the **Gemini 2.5 Flash** model. It doesn't just "generate text"; it *understands* your inbox.

- **Context-Aware**: Ask "Find emails about Project X", and Nexus will search your actual emails to give you a specific answer.
- **Smart Drafting**: Need to reply to a client? Nexus drafts professional, context-relevant responses in seconds.
- **Prompt Brain**: A dedicated space to manage and refine the prompts that power your assistant.

## 🚀 Getting Started

You can run Nexus in two modes: **Frontend-Only** (lightweight, uses mock data) or **Full Stack** (with a Python backend).

### Prerequisites
- Node.js (v18+)
- A Gemini API Key (for the AI features)

### 1️⃣ Quick Start (Frontend Only)
This is the easiest way to experience the UI and AI features immediately.

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Kirtthan/Prompt-Driven-Email-Productivity-Agent.git
    cd Prompt-Driven-Email-Productivity-Agent/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the app:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` and enjoy!

### 2️⃣ Full Stack Setup (Optional)
If you want to extend the backend with your own Python logic:

1.  **Install Backend Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Start the Backend:**
    ```bash
    python -m uvicorn backend.main:app --reload
    ```

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Icons**: Lucide React
- **Backend**: FastAPI (Optional)

## 🤝 Join the Journey

Nexus is a labor of love. We're constantly exploring new ways to make digital communication more human.

Feel free to fork, star, or contribute!

---
*Crafted with ❤️ and a touch of magic.*
