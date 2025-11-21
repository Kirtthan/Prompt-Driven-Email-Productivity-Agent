import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Edit2 } from 'lucide-react';

const PromptBrain = () => {
    const [prompts, setPrompts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ template: '', description: '' });

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        try {
            const response = await axios.get('/api/prompts/');
            setPrompts(response.data);
        } catch (error) {
            console.error("Error fetching prompts:", error);
        }
    };

    const handleEdit = (prompt) => {
        setEditingId(prompt.id);
        setEditForm({ template: prompt.template, description: prompt.description });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`/api/prompts/${id}`, editForm);
            setEditingId(null);
            fetchPrompts();
        } catch (error) {
            console.error("Error updating prompt:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prompt Brain 🧠</h2>
            <div className="grid gap-6">
                {prompts.map((prompt) => (
                    <div key={prompt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{prompt.name}</h3>
                                <p className="text-sm text-gray-500">{prompt.description}</p>
                            </div>
                            {editingId === prompt.id ? (
                                <button
                                    onClick={() => handleSave(prompt.id)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(prompt)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                            )}
                        </div>

                        {editingId === prompt.id ? (
                            <textarea
                                value={editForm.template}
                                onChange={(e) => setEditForm({ ...editForm, template: e.target.value })}
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            />
                        ) : (
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-mono text-sm text-gray-700 whitespace-pre-wrap">
                                {prompt.template}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromptBrain;
