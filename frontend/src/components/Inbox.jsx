import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Star, Trash2, Archive, Reply, Forward, Paperclip, ChevronLeft, ChevronRight, Mail, ArrowLeft, FileText, Image as ImageIcon } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Badge from './ui/Badge';

const mockEmails = [
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
        body: "Hi Alex,\n\nI've attached the updated roadmap for Q4. Please review the timeline changes we discussed in yesterday's meeting.\n\nKey updates:\n- Phase 1 timeline extended by 2 weeks\n- Resource allocation adjusted for the mobile team\n- New milestone added for beta testing\n\nLet me know if you have any concerns before I present this to the board on Friday.\n\nBest,\nSarah"
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
        body: "James commented on issue #PRO-123:\n\n'I think we should reconsider the layout for the dashboard. The current design feels a bit cluttered on smaller screens. I've attached a few mockups with alternative approaches.'\n\nView Issue ->"
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
        body: "Hey Alex,\n\nHere are the final assets for the marketing campaign. I've included the social media banners, email headers, and the landing page hero image.\n\nLet me know if you need any resizing or format changes.\n\nCheers,\nAlex"
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
        body: "This week in Tech Digest:\n\n1. AI Agents: The new workforce?\n2. Spatial Computing: Beyond the headset\n3. Rust vs Go: The eternal debate continues\n\nRead the full article on our website."
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
        body: "Hi Team,\n\nJust a reminder that open enrollment for benefits ends this Friday. Please log in to the portal to make your elections for the upcoming year.\n\nIf you have any questions, feel free to reach out to the HR team.\n\nRegards,\nHR"
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
        body: "Hi Alex,\n\nI'd like to schedule a kickoff meeting for the new integration project. Would you be available next Tuesday or Wednesday afternoon?\n\nPlease send me your availability and I'll send a calendar invite.\n\nThanks,\nMichael"
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
        body: "CONGRATULATIONS!!!\n\nYou have been selected as the winner of our international lottery! Click the link below to claim your $1,000,000 prize!\n\n[SUSPICIOUS LINK]\n\nAct now before this offer expires!"
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
        body: "Hi Alex,\n\nI need your approval on the Q1 marketing budget. The deadline is tomorrow EOD.\n\nKey items:\n- Total budget: $150,000\n- Social media campaigns: $60,000\n- Content creation: $40,000\n- Events: $50,000\n\nPlease review the attached spreadsheet and reply with your approval or any changes needed.\n\nThanks,\nJennifer"
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
        body: "John Smith requested your review on Pull Request #42\n\nTitle: Fix authentication bug in login flow\n\nDescription: This PR fixes the issue where users were getting logged out unexpectedly. I've added additional session validation.\n\nPlease review when you have a chance.\n\nView Pull Request ->"
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
        body: "BLACK FRIDAY MEGA SALE!\n\n50% OFF EVERYTHING IN STORE!\n\nUse code: BLACKFRIDAY50\n\nHurry! Sale ends Sunday!\n\nShop Now ->"
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
        body: "Team Standup Notes - November 18\n\nCompleted:\n- Feature X deployment\n- Bug fixes for issue #234\n\nIn Progress:\n- API refactoring\n- Mobile app updates\n\nBlocked:\n- Waiting for design approval on new dashboard\n\nNext standup: Tomorrow 9 AM"
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
        body: "Dear Alex,\n\nPlease find attached invoice #INV-2024-1156 for consulting services provided in November.\n\nAmount Due: $5,000\nDue Date: December 1, 2024\n\nPlease process payment at your earliest convenience.\n\nBest regards,\nEmily Watson"
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
        body: "You have 5 new connection requests:\n\n- Sarah Johnson (Product Manager at TechCo)\n- Mike Chen (Software Engineer at StartupXYZ)\n- Lisa Brown (Designer at Creative Agency)\n- Tom Wilson (CTO at Enterprise Inc)\n- Anna Davis (Marketing Director at Growth Co)\n\nView all connection requests ->"
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
        body: "URGENT: Scheduled Maintenance\n\nOur hosting provider will be performing critical infrastructure upgrades.\n\nDowntime Window: Saturday, Nov 23, 2:00 AM - 4:00 AM EST\n\nImpact:\n- All services will be unavailable\n- Database backups will be performed\n- No action required from your end\n\nPlease plan accordingly.\n\nRobert"
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
        body: "Hello,\n\nYour support ticket #12345 has been resolved.\n\nIssue: API rate limit errors\nResolution: We've increased your rate limit to 10,000 requests/hour\n\nThe changes are now live. Please let us know if you experience any further issues.\n\nBest regards,\nCustomer Support Team"
    }
];

const Inbox = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelection = (id, e) => {
        e.stopPropagation();
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const filteredEmails = mockEmails.filter(email =>
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in font-sans">
            {/* Email List */}
            <div className={`${selectedEmail ? 'hidden lg:flex lg:w-1/3' : 'w-full'} flex-col gap-4`}>
                <div className="flex items-center gap-3 mb-2">
                    <Input
                        placeholder="Search emails..."
                        icon={<Search size={18} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-white border-border-light text-text-primary placeholder-text-tertiary focus:border-accent-blue focus:ring-accent-blue/20"
                    />
                    <Button variant="secondary" size="icon" className="bg-white border-border-light text-text-secondary hover:text-text-primary hover:border-border-medium">
                        <Filter size={18} />
                    </Button>
                </div>

                <Card className="flex-1 overflow-hidden flex flex-col p-0 bg-white/50 backdrop-blur-sm border border-border-light shadow-sm">
                    <div className="p-3 border-b border-border-light flex items-center justify-between bg-bg-tertiary/50">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="rounded border-border-medium bg-white text-accent-blue focus:ring-accent-blue"
                                checked={selectedIds.length === filteredEmails.length && filteredEmails.length > 0}
                                onChange={() => {
                                    if (selectedIds.length === filteredEmails.length) {
                                        setSelectedIds([]);
                                    } else {
                                        setSelectedIds(filteredEmails.map(e => e.id));
                                    }
                                }}
                            />
                            <span className="text-sm text-text-secondary">
                                {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Select all'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover">
                                <Archive size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-status-error hover:bg-status-error/10">
                                <Trash2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover">
                                <MoreVertical size={16} />
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {filteredEmails.map((email) => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className={`
                  p-4 rounded-xl border cursor-pointer transition-all duration-200
                  ${selectedEmail?.id === email.id
                                        ? 'bg-white border-accent-blue shadow-md transform -translate-y-0.5'
                                        : 'bg-white border-border-light hover:border-border-medium hover:shadow-md hover:-translate-y-0.5'}
                  ${email.unread ? 'border-l-4 border-l-accent-blue bg-gradient-to-br from-white to-bg-hover' : ''}
                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(email.id)}
                                            onChange={() => toggleSelectEmail(email.id)}
                                            className="rounded border-border-medium bg-white text-accent-blue focus:ring-accent-blue"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-sm font-medium truncate ${email.unread ? 'text-text-primary font-bold' : 'text-text-secondary'}`}>
                                                {email.sender}
                                            </span>
                                            <span className="text-xs text-text-tertiary whitespace-nowrap ml-2">{email.date}</span>
                                        </div>
                                        <h4 className={`text-sm mb-1 truncate ${email.unread ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}>
                                            {email.subject}
                                        </h4>
                                        <p className="text-xs text-text-tertiary truncate mb-2">
                                            {email.preview}
                                        </p>
                                        <div className="flex gap-2">
                                            {email.labels.map(label => (
                                                <span key={label} className={`
                                                    px-2 py-0.5 rounded-full text-[10px] font-medium border
                                                    ${label === 'Urgent' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        label === 'Work' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                            'bg-bg-tertiary text-text-secondary border-border-light'}
                                                `}>
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="text-text-tertiary hover:text-yellow-400 transition-colors">
                                        <Star size={16} className={email.starred ? "fill-yellow-400 text-yellow-400" : ""} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Email Detail View */}
            <div className={`${selectedEmail ? 'flex' : 'hidden lg:flex'} flex-1 flex-col h-full`}>
                {selectedEmail ? (
                    <Card className="h-full flex flex-col p-0 overflow-hidden animate-fade-in bg-white border border-border-light shadow-lg rounded-2xl">
                        {/* Detail Toolbar */}
                        <div className="p-4 border-b border-border-light flex justify-between items-center bg-bg-tertiary/30">
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" icon={<ArrowLeft size={18} />} className="lg:hidden text-text-secondary hover:text-text-primary" onClick={() => setSelectedEmail(null)} />
                                <Button variant="ghost" size="icon" icon={<Archive size={18} />} className="text-text-secondary hover:text-text-primary hover:bg-bg-hover" />
                                <Button variant="ghost" size="icon" icon={<Trash2 size={18} />} className="text-text-secondary hover:text-status-error hover:bg-status-error/10" />
                                <Button variant="ghost" size="icon" icon={<Mail size={18} />} className="text-text-secondary hover:text-text-primary hover:bg-bg-hover" />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" icon={<ChevronLeft size={18} />} className="text-text-secondary hover:text-text-primary" />
                                <span className="text-xs text-text-tertiary pt-2">1 of {filteredEmails.length}</span>
                                <Button variant="ghost" size="icon" icon={<ChevronRight size={18} />} className="text-text-secondary hover:text-text-primary" />
                            </div>
                        </div>

                        {/* Email Content */}
                        <div className="flex-1 overflow-y-auto p-8 bg-white">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        {selectedEmail.labels.map(label => (
                                            <span key={label} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-br from-accent-blue to-[#38BDF8] text-white shadow-sm">
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl font-bold text-text-primary mb-2 font-display">{selectedEmail.subject}</h2>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" icon={<Reply size={16} />} className="text-text-secondary border-border-light hover:border-accent-sand">Reply</Button>
                                    <Button variant="secondary" size="sm" icon={<Forward size={16} />} className="text-text-secondary border-border-light hover:border-accent-sand">Forward</Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-light">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-[#38BDF8] flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {selectedEmail.sender[0]}
                                    </div>
                                    <div>
                                        <p className="text-text-primary font-bold">{selectedEmail.sender}</p>
                                        <p className="text-sm text-text-secondary">{selectedEmail.email}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-text-tertiary">{selectedEmail.date}</p>
                            </div>

                            <div className="prose prose-slate max-w-none text-text-primary leading-relaxed whitespace-pre-line">
                                {selectedEmail.body}
                            </div>

                            {/* Attachments Mock */}
                            <div className="mt-8 pt-6 border-t border-border-light">
                                <h4 className="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
                                    <Paperclip size={16} />
                                    2 Attachments
                                </h4>
                                <div className="flex gap-4">
                                    <div className="p-3 rounded-xl bg-bg-hover border border-border-light flex items-center gap-3 cursor-pointer hover:border-accent-blue hover:shadow-sm transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-primary font-medium">Q4_Roadmap.pdf</p>
                                            <p className="text-xs text-text-tertiary">2.4 MB</p>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-bg-hover border border-border-light flex items-center gap-3 cursor-pointer hover:border-accent-blue hover:shadow-sm transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center">
                                            <ImageIcon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-primary font-medium">Timeline_v2.png</p>
                                            <p className="text-xs text-text-tertiary">1.8 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-text-tertiary bg-white/50 rounded-2xl border border-border-light border-dashed">
                        <div className="w-24 h-24 rounded-full bg-bg-tertiary flex items-center justify-center mb-4 text-text-tertiary">
                            <Search size={48} />
                        </div>
                        <p className="text-lg font-medium">Select an email to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
