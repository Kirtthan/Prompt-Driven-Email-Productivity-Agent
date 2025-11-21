import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Star, AlertCircle, CheckSquare, Clock } from 'lucide-react';

const InboxViewer = ({ onSelectEmail }) => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('/api/inbox/');
            setEmails(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching emails:", error);
            setLoading(false);
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Important': return <Star className="w-4 h-4 text-yellow-500" />;
            case 'Spam': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'To-Do': return <CheckSquare className="w-4 h-4 text-blue-500" />;
            case 'Newsletter': return <Mail className="w-4 h-4 text-green-500" />;
            default: return <Clock className="w-4 h-4 text-gray-400" />;
        }
    };

    if (loading) return <div className="p-4">Loading inbox...</div>;

    return (
        <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Inbox</h2>
                <button onClick={fetchEmails} className="text-sm text-blue-600 hover:text-blue-800">Refresh</button>
            </div>
            <div className="divide-y divide-gray-100">
                {emails.map((email) => (
                    <div
                        key={email.id}
                        onClick={() => onSelectEmail(email)}
                        className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors ${!email.read ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className={`font-medium ${!email.read ? 'text-gray-900' : 'text-gray-600'}`}>{email.sender}</span>
                            <span className="text-xs text-gray-400">{new Date(email.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-800 mb-1">{email.subject}</div>
                        <div className="text-xs text-gray-500 line-clamp-2 mb-2">{email.body}</div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {getCategoryIcon(email.category)}
                                {email.category || 'General'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InboxViewer;
