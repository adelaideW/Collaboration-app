
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DriveContent from './components/DriveContent';
import StorageView from './components/StorageView';
import AIChatPanel from './components/AIChatPanel';
import CreateCustomApp from './components/CreateCustomApp';
import AppStudio from './components/AppStudio';
import { ViewType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('MY_DRIVE');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState<string | undefined>(undefined);

  // Synchronize initial view with URL parameters for multi-tab support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ViewType;
    if (viewParam && ['STORAGE', 'CREATE_CUSTOM_APP', 'APP_STUDIO', 'MY_DRIVE', 'RECENT', 'STARRED', 'SIGN', 'SHARED_WITH_ME', 'ARCHIVED'].includes(viewParam)) {
      setView(viewParam);
    }
  }, []);

  const handleAskAI = (query: string) => {
    setAiChatQuery(query);
    setIsAIChatOpen(true);
  };

  const handleToggleAIChat = () => {
    setIsAIChatOpen(prev => !prev);
    setAiChatQuery(undefined);
  };

  const renderContent = () => {
    switch (view) {
      case 'STORAGE':
        return <StorageView />;
      case 'CREATE_CUSTOM_APP':
        return <CreateCustomApp setView={setView} />;
      case 'APP_STUDIO':
        return <AppStudio setView={setView} />;
      case 'SETTINGS':
        return (
          <div className="flex-1 flex items-center justify-center text-gray-400 bg-[#FAFAFA]">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Settings</h2>
              <p className="text-sm">Account and application preferences would appear here.</p>
            </div>
          </div>
        );
      default:
        return <DriveContent view={view} />;
    }
  };

  // The App Studio has its own full-screen layout
  if (view === 'APP_STUDIO') {
    return (
      <div className="h-screen bg-white font-sans overflow-hidden">
        <AppStudio setView={setView} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden font-sans">
      <TopBar onAIChatOpen={handleToggleAIChat} />
      
      <div className="flex flex-1 min-h-0 relative overflow-hidden">
        <Sidebar 
          currentView={view} 
          setView={setView} 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
          onAskAI={handleAskAI}
        />
        
        <main className="flex-1 overflow-hidden flex flex-col bg-[#FAFAFA]">
          {renderContent()}
        </main>

        <AIChatPanel 
          isOpen={isAIChatOpen} 
          onClose={() => setIsAIChatOpen(false)} 
          initialQuery={aiChatQuery}
        />
      </div>
    </div>
  );
};

export default App;
