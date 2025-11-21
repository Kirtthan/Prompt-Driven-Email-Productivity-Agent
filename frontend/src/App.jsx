import React, { useState } from 'react';
import { Inbox, Brain, MessageSquare, FileText, Menu } from 'lucide-react';
import InboxViewer from './components/InboxViewer';
import PromptBrain from './components/PromptBrain';
import AgentChat from './components/AgentChat';
import DraftReview from './components/DraftReview';

function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftRefreshTrigger, setDraftRefreshTrigger] = useState(0);

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    setActiveTab('chat');
  };

  const handleDraftCreated = () => {
    setDraftRefreshTrigger(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inbox':
        return <InboxViewer onSelectEmail={handleEmailSelect} />;
      case 'brain':
        return <PromptBrain />;
      case 'chat':
        return <AgentChat selectedEmail={selectedEmail} onDraftCreated={handleDraftCreated} />;
      case 'drafts':
        return <DraftReview key={draftRefreshTrigger} />;
      default:
        return <InboxViewer onSelectEmail={handleEmailSelect} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {isSidebarOpen && <h1 className="font-bold text-xl tracking-tight">Email Agent</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'inbox' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Inbox className="w-5 h-5" />
            {isSidebarOpen && <span>Inbox</span>}
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <MessageSquare className="w-5 h-5" />
            {isSidebarOpen && <span>Agent Chat</span>}
          </button>

          <button
            onClick={() => setActiveTab('drafts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'drafts' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            {isSidebarOpen && <span>Drafts</span>}
          </button>

          <div className="pt-4 mt-4 border-t border-gray-800">
            <button
              onClick={() => setActiveTab('brain')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'brain' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <Brain className="w-5 h-5" />
              {isSidebarOpen && <span>Prompt Brain</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {activeTab === 'brain' ? 'System Configuration' : activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              U
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
