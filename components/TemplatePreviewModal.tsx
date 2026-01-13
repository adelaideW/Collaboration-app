
import React from 'react';
import { X, Ticket, ChevronDown, Check, Layout, Database } from 'lucide-react';
import { ViewType } from '../types';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: ViewType) => void;
  template: {
    name: string;
    description: string;
    icon: React.ReactNode;
  } | null;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ isOpen, onClose, setView, template }) => {
  if (!isOpen || !template) return null;

  const handleCreateApp = () => {
    // Open the App Studio in a new browser tab
    const url = `${window.location.origin}${window.location.pathname}?view=APP_STUDIO`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[840px] max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-10 pt-10 pb-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-[#3d2b2f] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <div className="text-[#ffb800]">
                {template.icon}
              </div>
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-gray-900 mb-2">{template.name}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed max-w-[680px]">
                {template.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Feature Box 1 */}
            <div className="bg-[#f3f4f6]/50 rounded-[20px] p-8 border border-gray-100 flex flex-col">
              <h3 className="text-[18px] font-bold text-gray-900 text-center mb-2">Comprehensive HR Ticketing System</h3>
              <p className="text-[13px] text-gray-500 text-center mb-8 px-2">
                A comprehensive HR ticketing system that allows employees to submit and track tickets, with automated ticket numbering and resolution time tracking
              </p>
              
              {/* Mock Screenshot 1 */}
              <div className="mt-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden aspect-[4/3] flex flex-col">
                <div className="bg-[#3d2b2f] p-3 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#ffb800] rounded flex items-center justify-center">
                      <Ticket size={14} className="text-[#3d2b2f]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white leading-none">HR Ticketing</span>
                      <span className="text-[8px] text-gray-400 leading-none mt-0.5">Track and manage HR support tickets efficiently</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-12 h-3 bg-white/10 rounded"></div>
                    <div className="w-12 h-3 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="p-3 bg-[#fdf2f8] flex-1">
                  <div className="h-full bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                    <div className="w-24 h-3 bg-gray-100 rounded mb-3"></div>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 h-12 bg-gray-50 rounded-lg border border-gray-100"></div>
                      <div className="flex-1 h-12 bg-gray-50 rounded-lg border border-gray-100"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-gray-50 rounded"></div>
                      <div className="w-full h-2 bg-gray-50 rounded"></div>
                      <div className="w-2/3 h-2 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Box 2 */}
            <div className="bg-[#f3f4f6]/50 rounded-[20px] p-8 border border-gray-100 flex flex-col">
              <h3 className="text-[18px] font-bold text-gray-900 text-center mb-2">Quickly Create Tickets</h3>
              <p className="text-[13px] text-gray-500 text-center mb-8 px-2">
                Easily create, submit and track HR tickets, with automated ticket numbering and resolution time tracking
              </p>
              
              {/* Mock Screenshot 2 */}
              <div className="mt-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden aspect-[4/3] flex flex-col">
                 <div className="bg-white p-3 border-b border-gray-100 flex items-center justify-between">
                   <span className="text-[12px] font-bold text-gray-900">Add HR Ticket</span>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-gray-700">Issue Summary</span>
                        <span className="text-red-500 text-[10px]">*</span>
                      </div>
                      <div className="h-8 border border-gray-200 rounded-md bg-gray-50"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                         <span className="text-[10px] font-bold text-gray-700">Status</span>
                         <div className="h-8 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between px-2">
                           <span className="text-[9px] text-gray-400">Status</span>
                           <ChevronDown size={12} className="text-gray-400" />
                         </div>
                       </div>
                       <div className="space-y-1.5">
                         <span className="text-[10px] font-bold text-gray-700">Ticket Category</span>
                         <div className="h-8 border border-gray-200 rounded-md bg-gray-50"></div>
                       </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-700">Issue Details</span>
                      <div className="h-20 border border-gray-200 rounded-md bg-gray-50 p-2">
                         <div className="w-full h-2 bg-gray-100 rounded mb-1"></div>
                         <div className="w-1/2 h-2 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Template Contents Accordion */}
          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-gray-900">Template contents</h4>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#7A005D]/10 rounded-lg flex items-center justify-center">
                    <Database size={16} className="text-[#7A005D]" />
                  </div>
                  <span className="text-[15px] font-bold text-gray-800">Objects</span>
                </div>
                <ChevronDown size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button 
            onClick={onClose}
            className="px-6 h-[40px] flex items-center justify-center border border-gray-200 rounded-xl text-[14px] font-bold text-gray-800 hover:bg-gray-50 transition-colors bg-white"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateApp}
            className="px-6 h-[40px] flex items-center justify-center bg-[#7A005D] text-white rounded-xl text-[14px] font-bold hover:bg-[#6b0051] transition-all active:scale-95 shadow-md shadow-[#7A005D]/20"
          >
            Create app
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
      `}</style>
    </div>
  );
};

export default TemplatePreviewModal;
