import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Star, Trash2, Archive, Reply, Forward, Paperclip, ChevronLeft, ChevronRight, Mail, ArrowLeft, FileText, Image as ImageIcon } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Badge from './ui/Badge';

import { mockEmails } from '../data/mockData';

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
