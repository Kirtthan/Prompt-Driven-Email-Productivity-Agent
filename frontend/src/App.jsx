import React, { useState, useEffect } from 'react';
import { Inbox as InboxIcon, Send, FileText, Settings as SettingsIcon, Bot, Menu, Brain } from 'lucide-react';
import Inbox from './components/Inbox';
import AgentChat from './components/AgentChat';
import DraftEditor from './components/DraftEditor';
import Settings from './components/Settings';
import PromptBrain from './components/PromptBrain';

function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Enforce light mode
  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }, []);

  const navItems = [
    { id: 'inbox', icon: InboxIcon, label: 'Inbox', badge: 3 },
    { id: 'agent', icon: Bot, label: 'Agent Chat' },
    { id: 'drafts', icon: FileText, label: 'Drafts', badge: 5 },
    { id: 'brain', icon: Brain, label: 'Prompt Brain' },
    { id: 'sent', icon: Send, label: 'Sent' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 flex font-sans">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-gradient-to-b from-bg-secondary to-bg-tertiary border-r border-border-light shadow-[4px_0_12px_rgba(75,85,99,0.04)]
          transition-all duration-300 flex flex-col
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="font-display font-bold text-2xl text-text-primary tracking-tight">
              Nexus
            </h1>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-[#38BDF8]"></div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${activeTab === item.id
                  ? 'bg-gradient-to-br from-accent-blue to-[#38BDF8] text-white shadow-md shadow-accent-blue/20'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'}
              `}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-text-secondary group-hover:text-text-primary'} />
              {isSidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${activeTab === item.id ? 'bg-white/20 text-white border-white/20' : 'bg-bg-tertiary text-text-secondary border-border-light'}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border-light space-y-4">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-purple-500 border-2 border-white shadow-sm"></div>
            {isSidebarOpen && (
              <div className="overflow-hidden text-left">
                <p className="text-sm font-medium text-text-primary truncate">Alex Morgan</p>
                <p className="text-xs text-text-secondary truncate">alex@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {activeTab === 'inbox' && <Inbox />}
          {activeTab === 'agent' && <AgentChat />}
          {activeTab === 'drafts' && <DraftEditor />}
          {activeTab === 'brain' && <PromptBrain />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'sent' && <div className="text-center py-20 text-text-tertiary">Sent Component Coming Soon</div>}
        </div>
      </main>
    </div>
  );
}

export default App;
