import React, { useState } from 'react';
import { Brain, Plus, Share2, Play, GitBranch, BarChart2, Search, MoreVertical, Sparkles, ThumbsUp, Zap, Download } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Badge from './ui/Badge';

const PromptBrain = () => {
    const [prompts, setPrompts] = useState([
        { id: 1, name: "Urgent Reply", description: "Drafts a polite but firm reply to urgent emails.", successRate: "92%", version: "v1.2", category: "Email", usage: "1.2k" },
        { id: 2, name: "Meeting Summary", description: "Summarizes key points and action items from meeting threads.", successRate: "88%", version: "v2.0", category: "Productivity", usage: "850" },
        { id: 3, name: "Cold Outreach", description: "Generates personalized cold emails for sales.", successRate: "75%", version: "v1.0", category: "Sales", usage: "2.1k" },
    ]);

    const handleAddPrompt = () => {
        const newPrompt = {
            id: Date.now(),
            name: "New Custom Prompt",
            description: "A new prompt created by you.",
            successRate: "0%",
            version: "v1.0",
            category: "Custom",
            usage: "0"
        };
        setPrompts([newPrompt, ...prompts]);
    };

    return (
        <div className="animate-fade-in font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-text-primary mb-2 font-display">Prompt Brain</h2>
                    <p className="text-text-secondary">Manage, test, and optimize your AI prompts.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={<Share2 size={18} />} className="bg-white border-border-light text-text-secondary hover:text-text-primary hover:border-accent-sand">Marketplace</Button>
                    <Button variant="primary" icon={<Plus size={18} />} onClick={handleAddPrompt} className="shadow-md shadow-accent-blue/20">New Prompt</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Prompt List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Input placeholder="Search prompts..." icon={<Search size={18} />} className="flex-1 bg-white border-border-light text-text-primary focus:border-accent-blue" />
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-text-primary bg-bg-hover font-medium">All</Button>
                            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary hover:bg-bg-hover">My Prompts</Button>
                            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary hover:bg-bg-hover">Community</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prompts.map((prompt) => (
                            <Card key={prompt.id} className="group cursor-pointer hover:border-accent-blue/50 transition-all bg-white border border-border-light shadow-sm hover:shadow-md hover:-translate-y-0.5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-accent-blue flex items-center justify-center text-white shadow-sm">
                                            <Sparkles size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-primary group-hover:text-accent-blue transition-colors">{prompt.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" className="text-[10px] bg-bg-tertiary text-text-secondary border-border-light">{prompt.category}</Badge>
                                                <span className="text-xs text-text-tertiary">{prompt.id > 3 ? 'Updated just now' : 'Updated 2 days ago'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-text-primary">
                                        <MoreVertical size={16} />
                                    </Button>
                                </div>
                                <p className="text-text-secondary text-sm mb-4">{prompt.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-text-tertiary text-xs">
                                            <Play size={12} />
                                            <span>{prompt.usage} uses</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-text-tertiary text-xs">
                                            <ThumbsUp size={12} />
                                            <span>{prompt.successRate}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs text-accent-blue hover:text-accent-blue/80 hover:bg-blue-50">Edit</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Stats / Quick Actions */}
                <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-accent-blue/10 to-transparent border border-accent-blue/20 shadow-sm">
                        <h3 className="font-bold text-text-primary mb-2 font-display">Prompt Optimization</h3>
                        <p className="text-sm text-text-secondary mb-4">
                            Your "Cold Outreach" prompt has a lower success rate than average. Try adding more personalization variables.
                        </p>
                        <Button variant="primary" size="sm" className="w-full shadow-md shadow-accent-blue/20">Optimize Now</Button>
                    </Card>

                    <Card className="p-6 bg-white border border-border-light shadow-sm">
                        <h3 className="font-bold text-text-primary mb-4 font-display">Popular in Marketplace</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 pb-3 border-b border-border-light last:border-0 last:pb-0 hover:bg-bg-hover rounded-lg p-2 -mx-2 transition-colors cursor-pointer">
                                    <div className="w-8 h-8 rounded bg-bg-tertiary flex items-center justify-center text-text-secondary">
                                        <Zap size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-text-primary">Support Auto-Reply</p>
                                        <p className="text-xs text-text-tertiary">By @support_guru</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-text-tertiary hover:text-accent-blue"><Download size={14} /></Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-sm text-text-secondary hover:text-text-primary">View Marketplace</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PromptBrain;
