
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DriveContent from './components/DriveContent';
import StorageView from './components/StorageView';
import AIChatPanel from './components/AIChatPanel';
import CreateCustomApp from './components/CreateCustomApp';
import AppStudio from './components/AppStudio';
import DocumentEditor from './components/DocumentEditor';
import FunctionEditor from './components/FunctionEditor';
import ReportEditor from './components/ReportEditor';
import WorkflowEditor from './components/WorkflowEditor';
import { ViewType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('HOME');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState<string | undefined>(undefined);

  // Synchronize initial view with URL parameters for multi-tab support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ViewType;
    const validViews: ViewType[] = ['HOME', 'STORAGE', 'CREATE_CUSTOM_APP', 'APP_STUDIO', 'MY_DRIVE', 'RECENT', 'STARRED', 'TASKS', 'SHARED_WITH_ME', 'ARCHIVED', 'DOCUMENT_EDITOR', 'FUNCTION_EDITOR', 'REPORT_EDITOR', 'WORKFLOW_EDITOR'];
    if (viewParam && validViews.includes(viewParam)) {
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
      case 'SETTINGS':
        return (
          <div className="flex-1 flex items-center justify-center text-gray-400 bg-white">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Settings</h2>
              <p className="text-sm">Account and application preferences would appear here.</p>
            </div>
          </div>
        );
      case 'DOCUMENT_EDITOR':
        return <DocumentEditor setView={setView} onAIChatOpen={handleToggleAIChat} />;
      case 'FUNCTION_EDITOR':
        return <FunctionEditor setView={setView} />;
      case 'REPORT_EDITOR':
        return <ReportEditor setView={setView} onAIChatOpen={handleToggleAIChat} />;
      case 'WORKFLOW_EDITOR':
        return <WorkflowEditor setView={setView} onAIChatOpen={handleToggleAIChat} />;
      default:
        return <DriveContent view={view} setView={setView} />;
    }
  }

  // Standalone workspaces for creation and studio
  if (view === 'APP_STUDIO') {
    return (
      <div className="h-screen bg-white font-sans overflow-hidden">
        <AppStudio setView={setView} />
      </div>
    );
  }

  if (view === 'CREATE_CUSTOM_APP') {
    return (
      <div className="h-screen bg-white font-sans overflow-hidden">
        <CreateCustomApp setView={setView} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden font-sans">
      <TopBar onAIChatOpen={handleToggleAIChat} setView={setView} currentView={view} />
      
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {view !== 'DOCUMENT_EDITOR' && view !== 'FUNCTION_EDITOR' && view !== 'REPORT_EDITOR' && view !== 'WORKFLOW_EDITOR' && (
          <Sidebar 
            currentView={view} 
            setView={setView} 
            isCollapsed={isSidebarCollapsed} 
            setIsCollapsed={setIsSidebarCollapsed} 
            onAskAI={handleAskAI}
          />
        )}
        
        <main className="flex-1 overflow-hidden flex flex-col bg-white">
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
