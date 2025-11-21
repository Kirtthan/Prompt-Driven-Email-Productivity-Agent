import React, { useState } from 'react';
import { Copy, Check, Send } from 'lucide-react';

const DraftCard = ({ draft, onUseDraft }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const fullText = `Subject: ${draft.subject}\n\n${draft.body}`;
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {draft.tone}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => onUseDraft(draft)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                        Use Draft
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Subject:</p>
                    <p className="text-sm font-semibold text-gray-800">{draft.subject}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Body:</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{draft.body}</p>
                </div>
            </div>
        </div>
    );
};

export default DraftCard;
