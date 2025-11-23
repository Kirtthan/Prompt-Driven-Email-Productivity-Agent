import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Paperclip, Mic, Image as ImageIcon } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';

const AgentChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'agent', content: "Hello Alex! I've analyzed your inbox. You have 3 urgent emails from Sarah, the Product Team, and HR. Would you like me to draft replies for them?" },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), type: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/agent/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: input,
                    email_id: null // Optional, can be added if context is selected
                })
            });

            const data = await response.json();
            console.log('Agent API Response:', data);

            if (!response.ok) {
                throw new Error(data.detail || 'API Error');
            }

            const agentText = data.response || "I'm having trouble connecting to my brain right now.";

            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'agent',
                content: agentText
            }]);
        } catch (error) {
            console.error('Error calling Agent API:', error);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'agent',
                content: `Error: ${error.message || "I encountered an error while processing your request."}`
            }]);
        }
    };

    const suggestedPrompts = [
        "Draft replies to urgent emails",
        "Summarize today's meetings",
        "Find emails about 'Project X'",
        "Clear spam folder"
    ];

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in font-sans">
            <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-white border border-border-light shadow-lg rounded-2xl">
                {/* Chat Header */}
                <div className="p-4 border-b border-border-light bg-bg-tertiary/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-[#38BDF8] flex items-center justify-center shadow-lg shadow-accent-blue/20">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary font-display">Nexus Agent</h3>
                            <p className="text-xs text-status-success flex items-center gap-1 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" icon={<Sparkles size={16} />} className="text-text-secondary border-border-light hover:text-text-primary hover:border-accent-sand">
                        New Context
                    </Button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
                ${msg.type === 'agent' ? 'bg-bg-tertiary text-accent-blue border border-border-light' : 'bg-gradient-to-br from-accent-blue to-[#38BDF8] text-white'}
              `}>
                                {msg.type === 'agent' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className={`
                max-w-[80%] p-4 rounded-2xl shadow-sm
                ${msg.type === 'agent'
                                    ? 'bg-bg-tertiary text-text-primary rounded-tl-none border border-border-light'
                                    : 'bg-gradient-to-br from-accent-blue to-[#38BDF8] text-white rounded-tr-none shadow-md shadow-accent-blue/10'}
              `}>
                                <div className="leading-relaxed">
                                    {(() => {
                                        try {
                                            // Try to parse if it looks like JSON
                                            if (typeof msg.content === 'string' && msg.content.trim().startsWith('{')) {
                                                const parsed = JSON.parse(msg.content);
                                                if (parsed.type === 'draft_options' && Array.isArray(parsed.options)) {
                                                    return (
                                                        <div className="space-y-3">
                                                            <p className="mb-2 font-medium">I've generated a few draft options for you:</p>
                                                            {parsed.options.map((option, idx) => (
                                                                <div key={idx} className="bg-white/50 p-3 rounded-lg border border-border-light/50 hover:bg-white/80 transition-colors cursor-pointer">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <span className="text-xs font-bold uppercase tracking-wider text-accent-blue bg-blue-50 px-2 py-0.5 rounded-full">{option.tone}</span>
                                                                    </div>
                                                                    <p className="font-medium text-sm mb-1">{option.subject}</p>
                                                                    <p className="text-sm text-text-secondary line-clamp-3">{option.body}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                            }
                                            return msg.content;
                                        } catch (e) {
                                            return msg.content;
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-bg-tertiary text-accent-blue border border-border-light flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="bg-bg-tertiary p-4 rounded-2xl rounded-tl-none flex gap-1 items-center border border-border-light">
                                <span className="w-2 h-2 rounded-full bg-accent-blue/60 animate-bounce"></span>
                                <span className="w-2 h-2 rounded-full bg-accent-blue/60 animate-bounce delay-100"></span>
                                <span className="w-2 h-2 rounded-full bg-accent-blue/60 animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border-light bg-bg-tertiary/30">
                    {messages.length < 3 && (
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                            {suggestedPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setInput(prompt);
                                        // Optional: auto-send
                                    }}
                                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-border-light text-sm text-text-secondary hover:bg-bg-hover hover:text-text-primary hover:border-accent-blue transition-all shadow-sm"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask Nexus to draft emails, summarize threads, or schedule meetings..."
                                className="w-full bg-white border border-border-light rounded-xl pl-4 pr-12 py-3 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all shadow-sm"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button className="p-1.5 text-text-tertiary hover:text-accent-blue hover:bg-blue-50 rounded-lg transition-colors">
                                    <Paperclip size={18} />
                                </button>
                                <button className="p-1.5 text-text-tertiary hover:text-accent-blue hover:bg-blue-50 rounded-lg transition-colors">
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="icon"
                            className="rounded-xl w-12 h-12 flex items-center justify-center shrink-0 shadow-md shadow-accent-blue/20"
                            onClick={handleSend}
                        >
                            <Send size={20} />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Context Panel (Optional, hidden on small screens) */}
            <div className="hidden xl:flex w-80 flex-col gap-4">
                <Card className="p-4 bg-white border border-border-light shadow-lg rounded-2xl">
                    <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2 font-display">
                        <Sparkles size={16} className="text-accent-clay" />
                        Active Context
                    </h4>
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-bg-tertiary border border-border-light text-sm">
                            <p className="text-text-secondary text-xs mb-1">Current Focus</p>
                            <p className="text-text-primary font-medium">Inbox Management</p>
                        </div>
                        <div className="p-3 rounded-lg bg-bg-tertiary border border-border-light text-sm">
                            <p className="text-text-secondary text-xs mb-1">Tone</p>
                            <p className="text-text-primary font-medium">Professional & Concise</p>
                        </div>
                    </div>
                </Card>

                <Card className="flex-1 p-4 bg-white border border-border-light shadow-lg rounded-2xl">
                    <h4 className="font-bold text-text-primary mb-3 font-display">Recent Actions</h4>
                    <div className="space-y-4 relative">
                        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-border-light"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3 relative">
                                <div className="w-3 h-3 rounded-full bg-accent-blue mt-1.5 shrink-0 relative z-10 ring-4 ring-white"></div>
                                <div>
                                    <p className="text-sm text-text-primary">Drafted reply to Sarah</p>
                                    <p className="text-xs text-text-tertiary">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AgentChat;
