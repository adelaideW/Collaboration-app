
import React, { useState, useEffect } from 'react';
import { X, Layout, Sparkles, Search, ChevronRight, FileText, Check, Ticket, Award, Users, Monitor, Truck, Headphones, BarChart3, DollarSign, MoreVertical, Info, Maximize2 } from 'lucide-react';
import { ViewType } from '../types';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: ViewType) => void;
  onApplyTemplate?: (name: string, state: string) => void;
  mode?: 'doc' | 'app';
  initialTab?: 'help' | 'templates';
}

const APP_TEMPLATES = [
  { id: 'offer-letter', name: 'Offer letter', icon: <FileText size={12} />, bannerIcon: <FileText size={18} /> },
  { id: 'hr-ticketing', name: 'HR Ticketing', icon: <Ticket size={12} />, bannerIcon: <Ticket size={18} /> },
  { id: 'license-mgmt', name: 'License Management', icon: <Award size={12} />, bannerIcon: <Award size={18} /> },
  { id: 'skill-tracker', name: 'Skill Tracker', icon: <Users size={12} />, bannerIcon: <Users size={18} /> },
  { id: 'it-asset', name: 'IT Asset Manager', icon: <Monitor size={12} />, bannerIcon: <Monitor size={18} /> },
  { id: 'fleet', name: 'Fleet Management', icon: <Truck size={12} />, bannerIcon: <Truck size={18} /> },
  { id: 'customer-support', name: 'Customer Support', icon: <Headphones size={12} />, bannerIcon: <Headphones size={18} /> },
  { id: 'project-dashboard', name: 'Project Dashboard', icon: <BarChart3 size={12} />, bannerIcon: <BarChart3 size={18} /> },
  { id: 'sales-crm', name: 'Sales CRM', icon: <DollarSign size={12} />, bannerIcon: <DollarSign size={18} /> },
];

// Explicitly typing AI_SUGGESTIONS to ensure 'image' property is correctly inferred as 'string | null'
const AI_SUGGESTIONS: {
  id: string;
  description: string;
  title: string;
  image: string | null;
}[] = [
  {
    id: 'onboarding',
    description: "Employee onboarding guide that highlights employee perks",
    title: "Onboarding guide",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
  },
  {
    id: 'newsletter',
    description: "Newsletter that highlights travel destinations with eye catching...",
    title: "Newsletter name",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400&h=200",
  },
  {
    id: 'matcha',
    description: "Planning document to launch new strawberry and matcha...",
    title: "Matcha fusion launch plan",
    image: null,
  }
];

const TemplateMockupCard = ({ name, icon, bannerIcon }: { name: string, icon: React.ReactNode, bannerIcon: React.ReactNode }) => (
  <div className="w-full h-full bg-white flex flex-col border border-gray-100 shadow-sm">
    <div className="px-2 py-1.5 flex items-center justify-between border-b border-gray-50 scale-[0.8] origin-left">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-[4px] bg-[#3d2b2f] flex items-center justify-center text-[#ffb800]">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-900 leading-none">{name}</span>
          <span className="text-[6px] text-gray-400 leading-none mt-0.5">Custom App</span>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="w-6 h-1.5 bg-gray-100 rounded-full"></div>
        <div className="w-4 h-1.5 bg-gray-100 rounded-full"></div>
      </div>
    </div>
    <div className="px-2 pb-2">
      <div className="w-full h-[60px] bg-[#3d2b2f] rounded-lg relative overflow-hidden flex flex-col items-center justify-center p-2 text-center">
        <div className="w-8 h-8 bg-[#ffb800] rounded-lg flex items-center justify-center text-[#3d2b2f] mb-1">
          {bannerIcon}
        </div>
        <span className="text-white text-[9px] font-bold tracking-tight">{name}</span>
        <span className="text-white/40 text-[5px] leading-tight max-w-[80%]">Streamline processes, manage tracking, and ensure compliance effortlessly.</span>
      </div>
    </div>
    <div className="flex-1 px-3 space-y-2 pb-4">
      <div className="flex items-center justify-between">
        <div className="w-16 h-4 bg-gray-50 rounded border border-gray-100"></div>
        <div className="w-12 h-4 bg-[#3d2b2f] rounded"></div>
      </div>
      <div className="space-y-1.5 pt-2">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-gray-100"></div>
           <div className="w-full h-2 bg-gray-50 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-gray-100"></div>
           <div className="w-full h-2 bg-gray-50 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-gray-100"></div>
           <div className="w-full h-2 bg-gray-50 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Added explicit React.FC typing to resolve the 'key' property TypeScript error during mapping
const AISuggestionCard: React.FC<{ description: string, title: string, image: string | null }> = ({ description, title, image }) => (
  <div className="flex flex-col gap-5 bg-transparent rounded-[24px] p-2 hover:bg-[#fdf2f8]/40 transition-all cursor-pointer group">
    <p className="text-[14px] font-bold text-[#475569] leading-snug px-2">
      {description}
    </p>
    <div className="relative rounded-[24px] overflow-hidden border border-gray-100 bg-white aspect-[1.3/1] shadow-sm">
      {image ? (
        <div className="w-full h-full relative">
          <img src={image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" alt="" />
          <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur rounded-xl p-3 shadow-sm border border-white/20">
             <div className="w-10 h-1.5 bg-gray-100 rounded-full mb-1.5"></div>
             <span className="text-[11px] font-bold text-gray-900 block truncate">{title}</span>
             <div className="mt-1 space-y-0.5 opacity-40">
               <div className="w-full h-0.5 bg-gray-300 rounded-full"></div>
               <div className="w-3/4 h-0.5 bg-gray-300 rounded-full"></div>
             </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-4">
           <div className="w-full h-full bg-white rounded-xl shadow-sm p-4 relative flex flex-col gap-2">
             <div className="w-12 h-2.5 bg-gray-50 rounded-full mb-1"></div>
             <span className="text-[11px] font-bold text-gray-900 block">{title}</span>
             <div className="space-y-1.5 mt-2 opacity-30">
               <div className="w-full h-0.5 bg-gray-400 rounded-full"></div>
               <div className="w-full h-0.5 bg-gray-400 rounded-full"></div>
               <div className="w-2/3 h-0.5 bg-gray-400 rounded-full"></div>
             </div>
           </div>
        </div>
      )}
    </div>
  </div>
);

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  setView, 
  onApplyTemplate, 
  mode = 'doc',
  initialTab = 'help'
}) => {
  const [activeTab, setActiveTab] = useState<'help' | 'templates'>(initialTab);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [aiInputValue, setAiInputValue] = useState('');

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const templates = mode === 'app' ? APP_TEMPLATES : APP_TEMPLATES;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300 p-8">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-[1100px] h-[780px] overflow-hidden flex animate-in zoom-in-95 duration-200">
        
        {/* Sidebar */}
        <div className="w-[120px] bg-white border-r border-gray-50 flex flex-col items-center py-12 gap-10 shrink-0">
          <button 
            onClick={() => setActiveTab('help')}
            className={`flex flex-col items-center gap-2 group transition-all ${activeTab === 'help' ? 'text-[#7A005D]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'help' ? 'bg-[#fdf2f8] shadow-sm text-[#7A005D]' : 'bg-transparent group-hover:bg-gray-50'}`}>
              <Sparkles size={24} className={activeTab === 'help' ? 'fill-[#7A005D]/20' : ''} />
            </div>
            <span className="text-[11px] font-bold text-center px-2">Help me create</span>
          </button>

          <button 
            onClick={() => setActiveTab('templates')}
            className={`flex flex-col items-center gap-2 group transition-all ${activeTab === 'templates' ? 'text-[#7A005D]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'templates' ? 'bg-[#fdf2f8] shadow-sm text-[#7A005D]' : 'bg-transparent group-hover:bg-gray-50'}`}>
              <Layout size={24} />
            </div>
            <span className="text-[11px] font-bold text-center px-2">Templates</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="px-12 pt-8 pb-4 flex items-center justify-between shrink-0">
            <span className="text-[14px] text-gray-400 font-medium">Rippling AI</span>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] rounded-lg text-[13px] font-bold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Info size={16} />
                  <span>Preview. <span className="text-[#7A005D]">Learn more</span></span>
               </div>
               <button 
                 onClick={onClose}
                 className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
               >
                 <X size={28} />
               </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-12 pb-16 custom-scrollbar">
            {activeTab === 'templates' ? (
              <div className="pt-4">
                <h2 className="text-[32px] font-bold text-gray-900 tracking-tight mb-8">Select a template</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {templates.map((template) => (
                    <div key={template.id} className="flex flex-col gap-4 group cursor-pointer" onClick={() => setSelectedId(template.id)}>
                      <div className={`aspect-[3.5/4] rounded-[24px] overflow-hidden transition-all duration-300 ${
                        selectedId === template.id 
                          ? 'border-[4px] border-[#7A005D] ring-[12px] ring-[#7A005D]/5' 
                          : 'border border-gray-100 hover:border-gray-200 hover:shadow-lg'
                      }`}>
                        <TemplateMockupCard 
                          name={template.name} 
                          icon={(template as any).icon} 
                          bannerIcon={(template as any).bannerIcon} 
                        />
                      </div>
                      <span className={`text-[17px] font-bold text-center transition-colors ${selectedId === template.id ? 'text-[#7A005D]' : 'text-gray-700'}`}>
                        {template.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-8 animate-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-[44px] font-bold text-[#7A005D] leading-none tracking-tight">Hi Harry,</h2>
                <h2 className="text-[44px] font-bold text-[#94a3b8] leading-none tracking-tight mb-14 mt-1">What do you need help with?</h2>
                
                <div className="grid grid-cols-3 gap-8 mb-20">
                   {AI_SUGGESTIONS.map((suggestion) => (
                     <AISuggestionCard 
                        key={suggestion.id}
                        description={suggestion.description}
                        title={suggestion.title}
                        image={suggestion.image}
                     />
                   ))}
                </div>

                <div className="max-w-[860px] mx-auto w-full relative">
                  <div className="relative group shadow-xl shadow-[#7A005D]/5 rounded-[28px]">
                    <input 
                      type="text" 
                      placeholder="Describe the app you want to create."
                      value={aiInputValue}
                      onChange={(e) => setAiInputValue(e.target.value)}
                      className="w-full pl-8 pr-32 py-6 bg-[#f1f5f9] border border-transparent rounded-[28px] outline-none focus:ring-4 focus:ring-[#7A005D]/5 focus:bg-white focus:border-[#7A005D]/20 text-[18px] text-gray-800 placeholder:text-slate-400 transition-all"
                    />
                    <button 
                      disabled={!aiInputValue.trim()}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 px-10 py-3 rounded-2xl font-bold text-[16px] transition-all ${
                        aiInputValue.trim() 
                          ? 'bg-[#7A005D] text-white shadow-lg shadow-[#7A005D]/20 hover:bg-[#6b0051] active:scale-95' 
                          : 'bg-[#cbd5e1] text-white cursor-not-allowed opacity-60'
                      }`}
                    >
                      Start
                    </button>
                  </div>
                  <div className="flex flex-col items-center gap-1 mt-10">
                     <p className="text-[13px] text-gray-400 font-medium">Rippling AI can make mistakes.</p>
                     <p className="text-[13px] text-gray-400 font-medium cursor-pointer hover:underline">Check important info.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          {(activeTab === 'templates' && selectedId) && (
            <div className="px-12 py-8 border-t border-gray-100 flex justify-end gap-4 bg-white shrink-0 animate-in slide-in-from-bottom-2 duration-300">
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-[17px] text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const template = templates.find(t => t.id === selectedId);
                  if (template) {
                    if (template.name === 'Offer letter') {
                      setView('DOCUMENT_EDITOR');
                      if (onApplyTemplate) onApplyTemplate(template.name, 'Alabama');
                      onClose();
                    } else if (mode === 'app') {
                      setView('APP_STUDIO');
                      onClose();
                    } else if (onApplyTemplate) {
                      onApplyTemplate(template.name, 'Alabama');
                      onClose();
                    }
                  }
                }}
                className="px-12 py-4 bg-[#7A005D] text-white rounded-2xl font-bold text-[17px] hover:bg-[#6b0051] transition-all shadow-xl shadow-[#7A005D]/20 active:scale-95"
              >
                Continue
              </button>
            </div>
          )}
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
        }
      `}</style>
    </div>
  );
};

export default TemplateSelectionModal;
