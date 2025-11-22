# Demo Video Script

## Introduction (30 seconds)
"Hello! I'm going to demonstrate the Nexus Email Productivity Agent - an intelligent, prompt-driven system that helps manage your inbox using AI."

## Part 1: Loading the Inbox (1 minute)
1. **Show the application**
   - "Here's the main interface with our inbox on the left"
   - "We have 15 sample emails including meeting requests, newsletters, spam, task requests, and project updates"
   
2. **Navigate through emails**
   - Click on different emails to show variety
   - Point out the categories: "Notice how emails are pre-categorized - Urgent, Work, Newsletter, Spam, To-Do"
   - "Each email shows sender, subject, preview, and timestamp"

## Part 2: Prompt Brain - Custom Prompts (2 minutes)
1. **Navigate to Prompt Brain**
   - Click on "Prompt Brain" in the sidebar
   - "This is where we configure how the AI agent behaves"
   
2. **Show existing prompts**
   - "We have three types of prompts:"
   - "1. Categorization Prompt - tells the AI how to categorize emails"
   - "2. Action Item Extraction - extracts tasks and deadlines"
   - "3. Auto-Reply Draft - generates appropriate responses"

3. **Edit a prompt** (if functionality exists)
   - Click "Edit" on a prompt
   - Modify the categorization rules
   - "Notice how changing this prompt will affect how the agent processes emails"
   - Save the changes

## Part 3: Email Agent Chat (3 minutes)
1. **Navigate to Agent Chat**
   - Click on "Agent Chat" in sidebar
   - "This is our AI assistant that can help with inbox tasks"

2. **Ask about emails**
   - Type: "What urgent emails do I have?"
   - Show the AI response listing urgent emails
   
3. **Summarize an email**
   - Type: "Summarize the email from Sarah Wilson"
   - Show AI providing a concise summary

4. **Extract action items**
   - Type: "What tasks do I need to do?"
   - Show AI listing all action items with deadlines:
     * Review Q4 roadmap (Friday)
     * Complete benefits enrollment (Friday)
     * Send meeting availability (ASAP)
     * Approve marketing budget (Tomorrow EOD)
     * Review Pull Request #42
     * Process invoice payment (Dec 1)

5. **Draft a reply**
   - Type: "Draft a reply to Michael Rodriguez's meeting request"
   - Show AI generating a professional response asking for agenda

## Part 4: Draft Management (2 minutes)
1. **Navigate to Drafts**
   - Click on "Drafts" in sidebar
   - "Here we can see all our email drafts"
   - "Notice: The system NEVER sends emails automatically - everything is saved as a draft for review"

2. **Show draft editor**
   - Click on a draft
   - "We can edit the subject, body, and format"
   - "The draft includes metadata like category and action items"

3. **Create new draft**
   - Click "New Draft"
   - Show the clean editor interface
   - "We can compose from scratch or ask the agent to help"

## Part 5: Automatic Categorization Demo (1.5 minutes)
1. **Show categorization in action**
   - Go back to Inbox
   - Point out different categories:
     * "Spam" - lottery scam email
     * "Meeting" - Michael's meeting request
     * "To-Do" - Budget approval, PR review
     * "Newsletter" - Tech Digest, LinkedIn
     * "Urgent" - Server downtime, budget approval

2. **Explain the process**
   - "When emails are ingested, the system:"
   - "1. Runs them through the categorization prompt"
   - "2. Extracts action items using the extraction prompt"
   - "3. Stores results for quick access"
   - "4. Updates the UI with categories and badges"

## Part 6: Settings & Theme (30 seconds)
1. **Show Settings**
   - Click on "Settings"
   - "Users can customize appearance"
   - Toggle between light and dark mode
   - "The Kozowood design system provides a beautiful, earthy aesthetic"

## Conclusion (30 seconds)
"To summarize, the Nexus Email Productivity Agent provides:
- Intelligent email categorization
- Automatic action item extraction
- AI-powered chat for inbox queries
- Safe draft generation - never auto-sends
- Customizable prompts to control AI behavior
- Beautiful, modern interface

All of this is powered by Google's Gemini AI and built with React and FastAPI. Thank you for watching!"

---

## Technical Notes for Recording

### Before Recording:
1. Make sure dev server is running: `npm run dev`
2. Clear browser cache for clean demo
3. Have 2-3 test queries ready in a text file
4. Test the agent responses beforehand

### Screen Recording Settings:
- Resolution: 1920x1080
- Frame rate: 30fps
- Show cursor
- Record system audio if adding voiceover later

### What to Show:
- ✅ Inbox with 15 emails
- ✅ Email categorization (labels/badges)
- ✅ Prompt Brain interface
- ✅ Agent Chat with real responses
- ✅ Action item extraction
- ✅ Draft editor
- ✅ Theme switching
- ✅ Clean, modern UI

### Key Points to Emphasize:
1. **Prompt-Driven**: Everything is controlled by user-defined prompts
2. **Safe**: Never auto-sends, only creates drafts
3. **Intelligent**: Uses Gemini AI for understanding context
4. **Organized**: Clear categorization and action items
5. **Beautiful**: Modern Kozowood design system
