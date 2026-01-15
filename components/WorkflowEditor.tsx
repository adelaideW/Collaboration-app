
import React, { useState, useRef, useEffect } from 'react';
import { 
  LogOut, 
  Pencil, 
  MessageSquare, 
  X,
  Sparkles,
  FileText
} from 'lucide-react';
import { ViewType } from '../types';
import WorkflowTemplateModal from './WorkflowTemplateModal';

interface WorkflowEditorProps {
  setView: (view: ViewType) => void;
  onAIChatOpen?: () => void;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ setView, onAIChatOpen }) => {
  const [workflowTitle, setWorkflowTitle] = useState('Untitled workflow 6');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-sans">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView('HOME')}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <LogOut size={20} className="rotate-180" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2 group">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={workflowTitle}
                onChange={(e) => setWorkflowTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                className="text-[17px] font-bold text-gray-900 tracking-tight bg-white border-b border-gray-300 outline-none px-1"
              />
            ) : (
              <h1 
                onClick={() => setIsEditingTitle(true)}
                className="text-[17px] font-bold text-gray-900 tracking-tight cursor-text flex items-center gap-2"
              >
                {workflowTitle}
                <Pencil size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h1>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-[#fcfcfc]">
        <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onAIChatOpen}
              className="flex items-center gap-3 px-8 py-3 bg-[#fdf2f8] border border-[#f5d0fe] text-[#7A005D] rounded-xl text-[15px] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <Sparkles size={18} className="text-[#7A005D] group-hover:rotate-12 transition-transform" />
              <span>Start with Rippling AI</span>
            </button>
            <button 
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 text-[#0f172a] rounded-xl text-[15px] font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
            >
              <FileText size={18} className="text-gray-400" />
              <span>Templates</span>
            </button>
          </div>
          
          <div className="text-center max-w-[500px]">
            <p className="text-gray-400 text-[14px] font-medium leading-relaxed">
              Get started by selecting some fields, describe to Rippling AI or choose from a template
            </p>
          </div>
        </div>

        {/* Feedback Tab */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center bg-white border border-gray-200 border-r-0 rounded-l-xl shadow-md py-4 px-2 cursor-pointer hover:bg-gray-50 transition-colors group z-20 overflow-hidden h-[180px]">
          <div className="flex flex-col items-center gap-2">
            <div 
              className="whitespace-nowrap text-[12px] font-bold text-gray-700 tracking-wider" 
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Share feedback
            </div>
            <div className="mt-auto">
              <MessageSquare size={16} className="text-gray-400" />
            </div>
            <div className="h-4 w-4 flex items-center justify-center text-gray-300">
              <X size={12} strokeWidth={3} />
            </div>
          </div>
        </div>
      </main>

      <WorkflowTemplateModal 
        isOpen={isTemplateModalOpen} 
        onClose={() => setIsTemplateModalOpen(false)} 
      />
    </div>
  );
};

export default WorkflowEditor;
