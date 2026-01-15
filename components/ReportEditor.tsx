
import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Download, 
  RotateCcw, 
  MoreVertical, 
  Lock, 
  Plus, 
  ChevronDown, 
  MessageSquare,
  Sparkles,
  FileText
} from 'lucide-react';
import { ViewType } from '../types';
import ReportTemplateModal from './ReportTemplateModal';

interface ReportEditorProps {
  setView: (view: ViewType) => void;
  onAIChatOpen: () => void;
}

const ReportEditor: React.FC<ReportEditorProps> = ({ setView, onAIChatOpen }) => {
  const [isPivotOn, setIsPivotOn] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] overflow-hidden font-sans">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('HOME')}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">Custom report</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded text-[11px] font-bold text-gray-500">
              <Lock size={12} fill="currentColor" />
              <span>Private</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center ml-auto gap-2">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <Download size={20} strokeWidth={1.5} className="rotate-180" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <RotateCcw size={20} strokeWidth={1.5} />
          </button>
          <button className="ml-2 px-6 py-2 bg-[#7A005D] text-white rounded-lg text-[14px] font-bold hover:bg-[#6b0051] transition-all shadow-sm active:scale-95">
            Save
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Config */}
        <aside className="w-[280px] border-r border-gray-200 bg-white flex flex-col p-4 overflow-y-auto custom-scrollbar gap-4">
          {/* Filters Section */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-gray-900">Filters</h3>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <button className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-900 text-[14px] font-medium transition-colors border border-transparent group">
              <span>Add filter</span>
              <Plus size={18} className="text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>

          {/* Data Section */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-gray-900">Data</h3>
              <ChevronDown size={16} className="text-gray-400" />
            </div>

            {/* Columns */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-gray-500">Columns</span>
                <Plus size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="h-12 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center bg-[#fcfcfc]">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Drag and drop variables here</span>
              </div>
            </div>

            {/* Row Grouping */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-gray-500">Row Grouping</span>
              </div>
              <div className="h-12 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center bg-[#fcfcfc]">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Drag and drop variables here</span>
              </div>
            </div>

            {/* Pivot Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[14px] font-medium text-gray-900">Pivot</span>
              <button 
                onClick={() => setIsPivotOn(!isPivotOn)}
                className={`w-10 h-6 rounded-full transition-all relative ${isPivotOn ? 'bg-[#7A005D]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPivotOn ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-[#f8f9fa] p-4 relative overflow-hidden flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full h-full flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={onAIChatOpen}
                className="flex items-center gap-3 px-8 py-3 bg-[#fdf2f8] border border-[#f5d0fe] text-[#7A005D] rounded-xl text-[15px] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 group"
              >
                <Sparkles size={18} className="text-[#7A005D] group-hover:rotate-12 transition-transform" />
                <span>Start with Rippling AI</span>
              </button>
              <button 
                onClick={() => setIsReportModalOpen(true)}
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
      </div>

      <ReportTemplateModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ReportEditor;
