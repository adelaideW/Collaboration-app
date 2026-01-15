
import React from 'react';
import { X } from 'lucide-react';

interface NewFunctionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewFunctionModal: React.FC<NewFunctionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 px-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[540px] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">New function information</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-[13px] font-bold text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              autoFocus
              type="text" 
              placeholder="Function name" 
              className="w-full px-3 py-2 text-[14px] bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#7A005D]/10 focus:border-[#7A005D]/30 transition-all placeholder:text-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-bold text-gray-700">
              Describe what this function does
            </label>
            <textarea 
              rows={4}
              placeholder="Function description" 
              className="w-full px-3 py-2 text-[14px] bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#7A005D]/10 focus:border-[#7A005D]/30 transition-all placeholder:text-gray-300 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-[14px] font-bold text-gray-700 hover:bg-gray-100 border border-gray-200 bg-white transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-[14px] font-bold text-white bg-[#7A005D] hover:bg-[#6b0051] transition-all shadow-sm active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFunctionModal;
