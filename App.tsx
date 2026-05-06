import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DriveContent from './components/DriveContent';
import StorageView from './components/StorageView';
import AIChatPanel from './components/AIChatPanel';
import CreateCustomApp from './components/CreateCustomApp';
import AppStudio from './components/AppStudio';
import DocumentEditor, { DocumentEditorRef } from './components/DocumentEditor';
import type { DocumentAISessionBootstrap } from './components/documentAISession';
import FunctionEditor from './components/FunctionEditor';
import ReportEditor from './components/ReportEditor';
import WorkflowEditor from './components/WorkflowEditor';
import { ViewType } from './types';
import { PortfolioReturnLink } from './components/PortfolioReturnLink';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('HOME');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState<string | undefined>(undefined);
  const [documentAISession, setDocumentAISession] =
    useState<DocumentAISessionBootstrap | null>(null);
  const documentEditorRef = useRef<DocumentEditorRef>(null);
  const [initialDocumentTemplate, setInitialDocumentTemplate] = useState<{name: string, state: string} | null>(null);

  useEffect(() => {
    const syncSidebarToViewport = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };

    syncSidebarToViewport();
    window.addEventListener('resize', syncSidebarToViewport);
    return () => window.removeEventListener('resize', syncSidebarToViewport);
  }, []);

  // Synchronize initial view with URL parameters for multi-tab support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ViewType;
    const validViews: ViewType[] = ['HOME', 'STORAGE', 'CREATE_CUSTOM_APP', 'APP_STUDIO', 'MY_DRIVE', 'RECENT', 'STARRED', 'TASKS', 'SHARED_WITH_ME', 'ARCHIVED', 'DOCUMENT_EDITOR', 'FUNCTION_EDITOR', 'REPORT_EDITOR', 'WORKFLOW_EDITOR'];
    if (viewParam && validViews.includes(viewParam)) {
      setView(viewParam);
    }
  }, []);

  // Special handling for template selection from CreateCustomApp
  const handleSetView = (newView: ViewType) => {
    if (newView === 'DOCUMENT_EDITOR' && view === 'CREATE_CUSTOM_APP') {
      setInitialDocumentTemplate({ name: 'Offer letter', state: 'Alabama' });
    }
    setView(newView);
  };

  const handleAskAI = (query: string) => {
    setAiChatQuery(query);
    setDocumentAISession(null);
    setIsAIChatOpen(true);
  };

  const handleOpenDocumentAI = (bootstrap: DocumentAISessionBootstrap) => {
    setDocumentAISession(bootstrap);
    setAiChatQuery(undefined);
    setIsAIChatOpen(true);
  };

  const handleToggleAIChat = () => {
    if (isAIChatOpen) {
      setIsAIChatOpen(false);
      setDocumentAISession(null);
      setAiChatQuery(undefined);
      return;
    }
    setAiChatQuery(undefined);
    setIsAIChatOpen(true);
    if (view === 'DOCUMENT_EDITOR') {
      if (documentEditorRef.current) {
        setDocumentAISession(documentEditorRef.current.captureAISession());
      } else {
        queueMicrotask(() => {
          const cap = documentEditorRef.current?.captureAISession();
          if (cap) setDocumentAISession(cap);
        });
      }
    } else {
      setDocumentAISession(null);
    }
  };

  const handleCloseAIChatPanel = () => {
    setIsAIChatOpen(false);
    setDocumentAISession(null);
    setAiChatQuery(undefined);
  };

  const handleAIChatPanelWidthChange = useCallback((width: number) => {
    if (width > 600) {
      setIsSidebarCollapsed(true);
    }
  }, []);

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
        return (
          <DocumentEditor 
            ref={documentEditorRef}
            setView={handleSetView} 
            onOpenDocumentAI={handleOpenDocumentAI} 
            initialTemplate={initialDocumentTemplate}
            onClearInitialTemplate={() => setInitialDocumentTemplate(null)}
          />
        );
      case 'FUNCTION_EDITOR':
        return <FunctionEditor setView={handleSetView} />;
      case 'REPORT_EDITOR':
        return <ReportEditor setView={handleSetView} onAIChatOpen={handleToggleAIChat} />;
      case 'WORKFLOW_EDITOR':
        return <WorkflowEditor setView={handleSetView} onAIChatOpen={handleToggleAIChat} />;
      default:
        return <DriveContent view={view} setView={handleSetView} />;
    }
  }

  // Standalone workspaces for creation and studio
  if (view === 'APP_STUDIO') {
    return (
      <div className="relative h-screen bg-white font-sans overflow-hidden">
        <PortfolioReturnLink />
        <AppStudio setView={handleSetView} />
      </div>
    );
  }

  if (view === 'CREATE_CUSTOM_APP') {
    return (
      <div className="relative h-screen bg-white font-sans overflow-hidden">
        <PortfolioReturnLink />
        <CreateCustomApp setView={handleSetView} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden font-sans">
      <PortfolioReturnLink />
      <TopBar onAIChatOpen={handleToggleAIChat} setView={handleSetView} currentView={view} />
      
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {view !== 'DOCUMENT_EDITOR' && view !== 'FUNCTION_EDITOR' && view !== 'REPORT_EDITOR' && view !== 'WORKFLOW_EDITOR' && (
          <Sidebar 
            currentView={view} 
            setView={handleSetView} 
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
          onClose={handleCloseAIChatPanel} 
          initialQuery={aiChatQuery}
          documentSession={documentAISession}
          isDocumentEditorRoute={view === 'DOCUMENT_EDITOR'}
          onPanelWidthChange={handleAIChatPanelWidthChange}
          onInsertIntoDocument={
            view === 'DOCUMENT_EDITOR'
              ? (text: string) =>
                  documentEditorRef.current?.insertDocumentFromAI(text)
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default App;
