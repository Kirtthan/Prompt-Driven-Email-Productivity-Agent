import React, { useState } from 'react';
import { Save, Clock, Send, MoreHorizontal, Bold, Italic, List, Link, Image, RotateCcw } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Badge from './ui/Badge';

const DraftEditor = () => {
    const [drafts, setDrafts] = useState([
        { id: 1, subject: "Re: Q4 Project Roadmap Review", to: "Sarah Wilson", lastEdited: "2 mins ago", status: "Draft" },
        { id: 2, subject: "Meeting Notes: Design Sync", to: "Alex Chen", lastEdited: "1 hour ago", status: "Review" },
        { id: 3, subject: "Weekly Update", to: "Team", lastEdited: "Yesterday", status: "Draft" },
    ]);
    const [selectedDraft, setSelectedDraft] = useState(drafts[0]);

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in font-sans">
            {/* Draft List */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-text-primary font-display">Drafts</h2>
                    <Button variant="primary" size="sm" className="shadow-md shadow-accent-blue/20">New Draft</Button>
                </div>
                <Card className="flex-1 overflow-hidden p-0 bg-white/50 backdrop-blur-sm border border-border-light shadow-sm">
                    <div className="overflow-y-auto h-full p-2 space-y-2">
                        {drafts.map((draft) => (
                            <div
                                key={draft.id}
                                onClick={() => setSelectedDraft(draft)}
                                className={`
                  p-4 rounded-xl border cursor-pointer transition-all duration-200
                  ${selectedDraft?.id === draft.id
                                        ? 'bg-white border-accent-blue shadow-md transform -translate-y-0.5'
                                        : 'bg-white border-border-light hover:border-border-medium hover:shadow-md hover:-translate-y-0.5'}
                `}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-text-primary truncate">{draft.subject}</span>
                                    <span className="text-xs text-text-tertiary whitespace-nowrap">{draft.lastEdited}</span>
                                </div>
                                <p className="text-sm text-text-secondary truncate mb-2">To: {draft.to}</p>
                                <Badge variant={draft.status === 'Review' ? 'warning' : 'secondary'} className="text-[10px]">
                                    {draft.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Editor */}
            <Card className="hidden lg:flex flex-1 flex-col p-0 overflow-hidden bg-white border border-border-light shadow-lg rounded-2xl">
                {/* Header */}
                <div className="p-4 border-b border-border-light bg-bg-tertiary/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Clock size={16} className="text-text-tertiary" />
                        <span>Last saved 2 mins ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" icon={<RotateCcw size={16} />} className="text-text-secondary hover:text-text-primary">History</Button>
                        <Button variant="secondary" size="sm" icon={<Save size={16} />} className="text-text-secondary border-border-light hover:text-text-primary hover:border-accent-sand">Save</Button>
                        <Button variant="primary" size="sm" icon={<Send size={16} />} className="shadow-md shadow-accent-blue/20">Send</Button>
                    </div>
                </div>

                {/* Fields */}
                <div className="p-6 space-y-4 border-b border-border-light">
                    <Input label="To" value={selectedDraft.to} onChange={() => { }} className="bg-white border-border-light text-text-primary focus:border-accent-blue" />
                    <Input label="Subject" value={selectedDraft.subject} onChange={() => { }} className="bg-white border-border-light text-text-primary focus:border-accent-blue font-medium" />
                </div>

                {/* Toolbar */}
                <div className="px-4 py-2 border-b border-border-light flex items-center gap-1 bg-bg-tertiary/20">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover"><Bold size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover"><Italic size={16} /></Button>
                    <div className="w-px h-4 bg-border-light mx-1"></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover"><List size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover"><Link size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-text-primary hover:bg-bg-hover"><Image size={16} /></Button>
                </div>

                {/* Text Area */}
                <div className="flex-1 p-6">
                    <textarea
                        className="w-full h-full bg-transparent border-none focus:ring-0 text-text-primary resize-none placeholder-text-tertiary leading-relaxed font-sans"
                        placeholder="Start writing..."
                        defaultValue={`Hi Sarah,\n\nThanks for sharing the updated roadmap. I've reviewed the changes and everything looks good on my end.\n\nRegarding the beta testing milestone, do we have the resources allocated for that yet?\n\nBest,\nAlex`}
                    ></textarea>
                </div>
            </Card>
        </div>
    );
};

export default DraftEditor;
