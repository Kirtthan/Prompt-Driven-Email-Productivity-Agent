import React, { useState } from 'react';
import axios from 'axios';
import { Send, Bot, Sparkles, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DraftCard from './DraftCard';

const AgentChat = ({ selectedEmail, onDraftCreated }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (customQuery = null) => {
        const query = customQuery || input;
        if (!query.trim() || !selectedEmail) return;

        const userMsg = { role: 'user', content: query };
        setMessages([...messages, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/agent/chat', {
                email_id: selectedEmail.id,
                query: userMsg.content
            });

            // Try to parse as JSON first
            let agentMsg;
            try {
                const jsonData = JSON.parse(response.data.response);
                agentMsg = { role: 'agent', content: response.data.response, data: jsonData };
            } catch {
                // Not JSON, treat as regular text
                agentMsg = { role: 'agent', content: response.data.response };
            }

            setMessages(prev => [...prev, agentMsg]);
        } catch (error) {
            console.error("Error chatting with agent:", error);
            setMessages(prev => [...prev, { role: 'agent', content: "Sorry, I encountered an error." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleUseDraft = async (draft) => {
        try {
            // Create a draft in the backend
            await axios.post('/api/agent/draft', {
                email_id: selectedEmail.id,
                subject: draft.subject,
                body: draft.body
            });

            // Notify parent component
            if (onDraftCreated) {
                onDraftCreated();
            }

            // Add confirmation message
            setMessages(prev => [...prev, {
                role: 'agent',
                content: '✅ Draft saved! You can review it in the Drafts section.'
            }]);
        } catch (error) {
            console.error("Error saving draft:", error);
            setMessages(prev => [...prev, {
                role: 'agent',
                content: '❌ Failed to save draft. Please try again.'
            }]);
        }
    };

    const renderMessage = (msg) => {
        if (msg.data?.type === 'draft_options') {
            return (
                <div className="space-y-3 max-w-full">
                    <p className="text-sm font-medium text-gray-700 mb-3">Here are some draft options for you:</p>
                    {msg.data.options.map((draft, idx) => (
                        <DraftCard key={idx} draft={draft} onUseDraft={handleUseDraft} />
                    ))}
                </div>
            );
        } else if (msg.data?.type === 'error') {
            return (
                <div className="space-y-2">
                    <p className="text-sm text-red-600">{msg.data.message}</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.data.fallback}</p>
                </div>
            );
        } else {
            // Regular markdown content
            return (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm max-w-none text-sm"
                >
                    {msg.content}
                </ReactMarkdown>
            );
        }
    };

    if (!selectedEmail) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <Bot className="w-12 h-12 mb-4 opacity-50" />
                <p>Select an email to start chatting with the Agent</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    Agent Context: {selectedEmail.subject}
                </h3>
            </div>

            {/* Quick Actions */}
            {messages.length === 0 && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => handleSend("Draft a reply to this email")}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                            <Sparkles className="w-3 h-3" />
                            Draft Reply
                        </button>
                        <button
                            onClick={() => handleSend("Summarize this email")}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                            <MessageSquare className="w-3 h-3" />
                            Summarize
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${msg.role === 'user' ? 'max-w-[80%]' : 'max-w-full'} rounded-lg p-3 ${msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                            }`}>
                            {msg.role === 'user' ? (
                                <p className="text-sm">{msg.content}</p>
                            ) : (
                                renderMessage(msg)
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about this email or request a draft..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={loading}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentChat;
