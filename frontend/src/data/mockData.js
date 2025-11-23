// Mock email data shared across components
export const mockEmails = [
    {
        id: 1,
        sender: "Sarah Wilson",
        email: "sarah.w@techcorp.com",
        subject: "Q4 Project Roadmap Review",
        preview: "Hi Alex, I've attached the updated roadmap for Q4. Please review the timeline changes...",
        date: "10:30 AM",
        unread: true,
        starred: true,
        labels: ["Urgent", "Work"],
        body: "Hi Alex,\n\nI've attached the updated roadmap for Q4. Please review the timeline changes we discussed in yesterday's meeting.\n\nKey updates:\n- Phase 1 timeline extended by 2 weeks\n- Resource allocation adjusted for the mobile team\n- New milestone added for beta testing\n\nLet me know if you have any concerns before I present this to the board on Friday.\n\nBest,\nSarah",
        actionItems: [
            { task: "Review Q4 roadmap timeline changes", deadline: "Friday" }
        ]
    },
    {
        id: 2,
        sender: "Product Team",
        email: "notifications@linear.app",
        subject: "[Linear] New comment on issue #PRO-123",
        preview: "James commented: 'I think we should reconsider the layout for the dashboard...'",
        date: "09:15 AM",
        unread: true,
        starred: false,
        labels: ["Updates"],
        body: "James commented on issue #PRO-123:\n\n'I think we should reconsider the layout for the dashboard. The current design feels a bit cluttered on smaller screens. I've attached a few mockups with alternative approaches.'\n\nView Issue ->",
        actionItems: []
    },
    {
        id: 3,
        sender: "Alex Chen",
        email: "alex.chen@design.co",
        subject: "Design Assets for Campaign",
        preview: "Here are the final assets for the marketing campaign. Let me know if you need...",
        date: "Yesterday",
        unread: false,
        starred: false,
        labels: ["Design", "Marketing"],
        body: "Hey Alex,\n\nHere are the final assets for the marketing campaign. I've included the social media banners, email headers, and the landing page hero image.\n\nLet me know if you need any resizing or format changes.\n\nCheers,\nAlex",
        actionItems: []
    },
    {
        id: 4,
        sender: "Newsletter Weekly",
        email: "weekly@techdigest.com",
        subject: "Top Tech Trends of 2025",
        preview: "This week: AI agents taking over, the rise of spatial computing, and more...",
        date: "Yesterday",
        unread: false,
        starred: false,
        labels: ["Newsletter"],
        body: "This week in Tech Digest:\n\n1. AI Agents: The new workforce?\n2. Spatial Computing: Beyond the headset\n3. Rust vs Go: The eternal debate continues\n\nRead the full article on our website.",
        actionItems: []
    },
    {
        id: 5,
        sender: "HR Department",
        email: "hr@company.com",
        subject: "Open Enrollment Reminder",
        preview: "Just a reminder that open enrollment for benefits ends this Friday...",
        date: "Nov 20",
        unread: false,
        starred: true,
        labels: ["Important"],
        body: "Hi Team,\n\nJust a reminder that open enrollment for benefits ends this Friday. Please log in to the portal to make your elections for the upcoming year.\n\nIf you have any questions, feel free to reach out to the HR team.\n\nRegards,\nHR",
        actionItems: [
            { task: "Complete benefits enrollment", deadline: "Friday" }
        ]
    },
    {
        id: 6,
        sender: "Michael Rodriguez",
        email: "m.rodriguez@clientcorp.com",
        subject: "Meeting Request: Project Kickoff",
        preview: "Hi, I'd like to schedule a kickoff meeting for the new integration project...",
        date: "Nov 20",
        unread: true,
        starred: false,
        labels: ["Meeting", "Urgent"],
        body: "Hi Alex,\n\nI'd like to schedule a kickoff meeting for the new integration project. Would you be available next Tuesday or Wednesday afternoon?\n\nPlease send me your availability and I'll send a calendar invite.\n\nThanks,\nMichael",
        actionItems: [
            { task: "Send availability for project kickoff meeting", deadline: "ASAP" }
        ]
    },
    {
        id: 7,
        sender: "Spam Bot",
        email: "winner@lottery-scam.xyz",
        subject: "CONGRATULATIONS! You've Won $1,000,000!!!",
        preview: "Click here to claim your prize now! Limited time offer...",
        date: "Nov 19",
        unread: false,
        starred: false,
        labels: ["Spam"],
        body: "CONGRATULATIONS!!!\n\nYou have been selected as the winner of our international lottery! Click the link below to claim your $1,000,000 prize!\n\n[SUSPICIOUS LINK]\n\nAct now before this offer expires!",
        actionItems: []
    },
    {
        id: 8,
        sender: "Jennifer Lee",
        email: "j.lee@company.com",
        subject: "ACTION REQUIRED: Budget Approval Needed",
        preview: "Please review and approve the Q1 marketing budget by EOD tomorrow...",
        date: "Nov 19",
        unread: true,
        starred: true,
        labels: ["Urgent", "To-Do"],
        body: "Hi Alex,\n\nI need your approval on the Q1 marketing budget. The deadline is tomorrow EOD.\n\nKey items:\n- Total budget: $150,000\n- Social media campaigns: $60,000\n- Content creation: $40,000\n- Events: $50,000\n\nPlease review the attached spreadsheet and reply with your approval or any changes needed.\n\nThanks,\nJennifer",
        actionItems: [
            { task: "Review and approve Q1 marketing budget", deadline: "Tomorrow EOD" }
        ]
    },
    {
        id: 9,
        sender: "GitHub",
        email: "noreply@github.com",
        subject: "[Repo] Pull Request #42 needs your review",
        preview: "John Smith requested your review on: Fix authentication bug...",
        date: "Nov 18",
        unread: false,
        starred: false,
        labels: ["Updates", "To-Do"],
        body: "John Smith requested your review on Pull Request #42\n\nTitle: Fix authentication bug in login flow\n\nDescription: This PR fixes the issue where users were getting logged out unexpectedly. I've added additional session validation.\n\nPlease review when you have a chance.\n\nView Pull Request ->",
        actionItems: [
            { task: "Review Pull Request #42", deadline: "When available" }
        ]
    },
    {
        id: 10,
        sender: "Marketing Automation",
        email: "promo@shopnow.com",
        subject: "50% OFF Everything - Black Friday Sale!",
        preview: "Don't miss our biggest sale of the year! Shop now and save...",
        date: "Nov 18",
        unread: false,
        starred: false,
        labels: ["Newsletter", "Spam"],
        body: "BLACK FRIDAY MEGA SALE!\n\n50% OFF EVERYTHING IN STORE!\n\nUse code: BLACKFRIDAY50\n\nHurry! Sale ends Sunday!\n\nShop Now ->",
        actionItems: []
    },
    {
        id: 11,
        sender: "David Park",
        email: "d.park@company.com",
        subject: "Team Standup Notes - Nov 18",
        preview: "Here are the notes from today's standup meeting...",
        date: "Nov 18",
        unread: false,
        starred: false,
        labels: ["Work"],
        body: "Team Standup Notes - November 18\n\nCompleted:\n- Feature X deployment\n- Bug fixes for issue #234\n\nIn Progress:\n- API refactoring\n- Mobile app updates\n\nBlocked:\n- Waiting for design approval on new dashboard\n\nNext standup: Tomorrow 9 AM",
        actionItems: []
    },
    {
        id: 12,
        sender: "Emily Watson",
        email: "e.watson@vendor.com",
        subject: "Invoice #INV-2024-1156",
        preview: "Please find attached invoice for services rendered in November...",
        date: "Nov 17",
        unread: false,
        starred: false,
        labels: ["Important"],
        body: "Dear Alex,\n\nPlease find attached invoice #INV-2024-1156 for consulting services provided in November.\n\nAmount Due: $5,000\nDue Date: December 1, 2024\n\nPlease process payment at your earliest convenience.\n\nBest regards,\nEmily Watson",
        actionItems: [
            { task: "Process payment for invoice #INV-2024-1156", deadline: "December 1, 2024" }
        ]
    },
    {
        id: 13,
        sender: "LinkedIn",
        email: "notifications@linkedin.com",
        subject: "You have 5 new connection requests",
        preview: "Sarah Johnson, Mike Chen, and 3 others want to connect with you...",
        date: "Nov 17",
        unread: false,
        starred: false,
        labels: ["Newsletter"],
        body: "You have 5 new connection requests:\n\n- Sarah Johnson (Product Manager at TechCo)\n- Mike Chen (Software Engineer at StartupXYZ)\n- Lisa Brown (Designer at Creative Agency)\n- Tom Wilson (CTO at Enterprise Inc)\n- Anna Davis (Marketing Director at Growth Co)\n\nView all connection requests ->",
        actionItems: []
    },
    {
        id: 14,
        sender: "Robert Taylor",
        email: "r.taylor@company.com",
        subject: "URGENT: Server Downtime Scheduled",
        preview: "Maintenance window scheduled for this Saturday 2-4 AM...",
        date: "Nov 16",
        unread: false,
        starred: true,
        labels: ["Urgent", "Important"],
        body: "URGENT: Scheduled Maintenance\n\nOur hosting provider will be performing critical infrastructure upgrades.\n\nDowntime Window: Saturday, Nov 23, 2:00 AM - 4:00 AM EST\n\nImpact:\n- All services will be unavailable\n- Database backups will be performed\n- No action required from your end\n\nPlease plan accordingly.\n\nRobert",
        actionItems: []
    },
    {
        id: 15,
        sender: "Customer Support",
        email: "support@saas-tool.com",
        subject: "Your ticket #12345 has been resolved",
        preview: "Good news! We've resolved your support ticket regarding API rate limits...",
        date: "Nov 16",
        unread: false,
        starred: false,
        labels: ["Updates"],
        body: "Hello,\n\nYour support ticket #12345 has been resolved.\n\nIssue: API rate limit errors\nResolution: We've increased your rate limit to 10,000 requests/hour\n\nThe changes are now live. Please let us know if you experience any further issues.\n\nBest regards,\nCustomer Support Team",
        actionItems: []
    }
];

// Default prompt templates
export const defaultPrompts = {
    categorization: `Categorize emails into: Important, Newsletter, Spam, To-Do, Meeting, Work, Updates.
To-Do emails must include a direct request requiring user action.
Meeting emails should contain meeting requests or scheduling.
Spam should include promotional content or suspicious messages.`,

    actionItemExtraction: `Extract tasks from the email. Respond in JSON format:
{ "task": "description of the task", "deadline": "when it's due or 'Not specified'" }.
If no tasks are found, return an empty array.`,

    autoReplyDraft: `If an email is a meeting request, draft a polite reply asking for an agenda and confirming availability.
If it's a task request, acknowledge receipt and provide an estimated completion time.
Keep the tone professional and concise.`
};
