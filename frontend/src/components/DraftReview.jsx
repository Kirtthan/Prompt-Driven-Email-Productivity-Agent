import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileEdit, Send, Trash2 } from 'lucide-react';

const DraftReview = () => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        fetchDrafts();
    }, []);

    const fetchDrafts = async () => {
        try {
            const response = await axios.get('/api/agent/drafts');
            setDrafts(response.data);
        } catch (error) {
            console.error("Error fetching drafts:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Draft Review 📝</h2>
            <div className="grid gap-6">
                {drafts.length === 0 ? (
                    <p className="text-gray-500">No drafts waiting for review.</p>
                ) : (
                    drafts.map((draft) => (
                        <div key={draft.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{draft.subject}</h3>
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                                    Draft
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-sm text-gray-700 whitespace-pre-wrap">
                                {draft.body}
                            </div>
                            <div className="flex justify-end gap-3">
                                <button className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium">
                                    <Trash2 className="w-4 h-4" /> Discard
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                                    <Send className="w-4 h-4" /> Approve & Send
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DraftReview;
