
import React, { useState } from 'react';
import { X, Sparkles, Layout, Ticket, Award, Users, Monitor, Truck, Headphones, BarChart, DollarSign, Info, ArrowUp, Maximize2, ExternalLink } from 'lucide-react';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'TEMPLATES' | 'GEMINI';

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState<ModalView>('TEMPLATES');
  const [promptValue, setPromptValue] = useState('');

  if (!isOpen) return null;

  const templates = [
    { id: '1', name: 'HR Ticketing', icon: <Ticket size={18} />, bannerColor: 'bg-[#3d2b2f]', selected: true, type: 'app', bannerImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { id: '2', name: 'License Management', icon: <Award size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200' },
    { id: '3', name: 'Skill Tracker', icon: <Users size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200' },
    { id: '4', name: 'IT Asset Manager', icon: <Monitor size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200' },
    { id: '5', name: 'Fleet Management', icon: <Truck size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=200' },
    { id: '6', name: 'Customer Support', icon: <Headphones size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1521791136064-7986c29596dd?auto=format&fit=crop&q=80&w=200' },
    { id: '7', name: 'Project Dashboard', icon: <BarChart size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200' },
    { id: '8', name: 'Sales CRM', icon: <DollarSign size={18} />, bannerColor: 'bg-[#3d2b2f]', type: 'app', bannerImg: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=200' },
  ];

  const suggestions = [
    {
      title: 'Employee onboarding guide that highlights employee perks',
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400',
      label: 'Onboarding guide'
    },
    {
      title: 'Newsletter that highlights travel destinations with eye catching...',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400',
      label: 'Newsletter name'
    },
    {
      title: 'Planning document to launch new strawberry and matcha...',
      img: 'https://images.unsplash.com/photo-1571477107123-28c037305963?auto=format&fit=crop&q=80&w=400',
      label: 'Matcha fusion launch plan'
    }
  ];

  const handleOpenTemplate = (templateId: string) => {
    const url = `${window.location.origin}${window.location.pathname}?view=APP_STUDIO&template=${templateId}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleCreateAIApp = () => {
    if (!promptValue.trim()) return;
    const url = `${window.location.origin}${window.location.pathname}?view=APP_STUDIO&prompt=${encodeURIComponent(promptValue)}`;
    window.open(url, '_blank');
    onClose();
  };

  const renderAppPreview = (template: any) => {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="px-2 py-1.5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-[#3d2b2f] flex items-center justify-center text-[#ffb800]">
              {React.cloneElement(template.icon as React.ReactElement, { size: 10 })}
            </div>
            <div className="flex flex-col">
              <span className="text-[6px] font-bold text-gray-900 leading-none">{template.name}</span>
              <span className="text-[4px] text-gray-400 leading-none mt-0.5">Custom App</span>
            </div>
          </div>
          <div className="flex gap-0.5">
            <div className="w-4 h-1.5 bg-gray-200 rounded-[2px]"></div>
            <div className="w-4 h-1.5 bg-gray-200 rounded-[2px]"></div>
          </div>
        </div>
        <div className="px-2 py-1 flex gap-2 border-b border-gray-50">
          <div className="h-1 w-10 bg-[#3d2b2f] rounded-full"></div>
          <div className="h-1 w-8 bg-gray-100 rounded-full"></div>
        </div>
        <div className="p-2">
          <div className={`${template.bannerColor} rounded-lg h-24 relative overflow-hidden flex items-center shadow-inner`}>
             <div className="absolute left-0 inset-y-0 w-1/4 opacity-40">
                <img src={template.bannerImg} className="h-full w-full object-cover" alt="" />
             </div>
             <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
                <div className="w-6 h-6 rounded-full bg-[#ffb800] flex items-center justify-center mb-1 ring-2 ring-white/10">
                   {React.cloneElement(template.icon as React.ReactElement, { size: 14, className: "text-[#3d2b2f]" })}
                </div>
                <div className="text-[9px] font-bold text-white tracking-tight">{template.name}</div>
                <div className="text-[4px] text-gray-300 mt-0.5 text-center max-w-[80%] leading-tight">
                   Streamline processes, manage tracking, and ensure compliance effortlessly across the organization.
                </div>
             </div>
             <div className="absolute right-0 inset-y-0 w-1/4 opacity-40" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                <img src={template.bannerImg} className="h-full w-full object-cover" alt="" />
             </div>
          </div>
        </div>
        <div className="px-2 flex-1 space-y-2 mt-1">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 bg-gray-100 rounded"></div>
            <div className="flex gap-1">
              <div className="h-3 w-8 bg-gray-50 border border-gray-100 rounded"></div>
              <div className="h-3 w-12 bg-[#3d2b2f] rounded"></div>
            </div>
          </div>
          <div className="space-y-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-2 p-1 border-b border-gray-50 items-center">
                <div className="w-3 h-3 rounded bg-gray-100"></div>
                <div className="h-1.5 w-1/3 bg-gray-100 rounded"></div>
                <div className="h-1.5 w-1/4 bg-blue-50 rounded ml-auto"></div>
                <div className="h-1.5 w-12 bg-gray-50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderGeminiView = () => (
    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
      <div className="px-10 pt-8 pb-4 flex items-center justify-between shrink-0">
        <h3 className="text-[16px] font-medium text-gray-500">Rippling AI</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#f0f4f9] px-3 py-1.5 rounded-full">
            <Info size={16} className="text-gray-600" />
            <span className="text-[13px] font-medium text-gray-700">Preview. <a href="#" className="text-blue-600 hover:underline">Learn more</a></span>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-10 pt-4 flex flex-col overflow-y-auto custom-scrollbar pb-10">
        <div className="mb-10">
          <h1 className="text-[48px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 leading-tight">
            Hi Harry,
          </h1>
          <h1 className="text-[48px] font-bold text-gray-500 leading-tight">
            What do you need help with?
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          {suggestions.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setPromptValue(item.title);
                handleCreateAIApp();
              }}
              className="bg-[#f0f4f9] rounded-[24px] p-6 flex flex-col hover:bg-[#e6ebf1] transition-colors cursor-pointer group"
            >
              <p className="text-[15px] font-medium text-gray-700 mb-6 leading-relaxed">
                {item.title}
              </p>
              <div className="relative mt-auto aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                <img src={item.img} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full p-3 border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
                    <div className="h-2 w-1/3 bg-gray-100 rounded mb-2"></div>
                    <div className="text-[10px] font-bold text-gray-900 leading-tight">{item.label}</div>
                    <div className="mt-2 space-y-1">
                      <div className="h-1 w-full bg-gray-50 rounded"></div>
                      <div className="h-1 w-full bg-gray-50 rounded"></div>
                      <div className="h-1 w-2/3 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>
                {idx === 1 && (
                  <div className="absolute bottom-2 right-2 p-1.5 bg-white rounded-lg shadow-md">
                    <Maximize2 size={12} className="text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto max-w-4xl mx-auto w-full mb-4">
          <div className="relative bg-[#f0f4f9] rounded-[40px] px-8 py-6 shadow-[0_2px_15px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-blue-100 transition-all flex items-center gap-4">
            <textarea
              rows={1}
              placeholder="Describe the app you want to create."
              className="flex-1 bg-transparent text-[16px] text-gray-800 placeholder:text-gray-500 outline-none resize-none leading-normal"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateAIApp()}
            />
            <button 
              onClick={handleCreateAIApp}
              disabled={!promptValue.trim()}
              className={`px-6 py-2 rounded-full font-bold text-[14px] transition-all whitespace-nowrap ${
                promptValue.trim() ? 'bg-[#c2e7ff] text-[#001d35] hover:bg-[#b3d9f0]' : 'bg-[#dde3ea] text-gray-400'
              }`}
            >
              Create
            </button>
          </div>
          <div className="text-center text-[12px] text-gray-500 mt-6 px-10 leading-relaxed space-y-0.5">
            <p>Rippling AI can make mistakes.</p>
            <p>Check important info.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#fcfcfc] rounded-[32px] shadow-2xl w-full max-w-[1100px] h-[780px] overflow-hidden flex animate-in zoom-in-95 duration-300">
        <div className="w-[140px] bg-white border-r border-gray-100 flex flex-col items-center pt-24 gap-6 shrink-0">
          <button 
            onClick={() => setActiveView('GEMINI')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${activeView === 'GEMINI' ? 'bg-[#c2e7ff] text-[#001d35] shadow-sm' : 'text-gray-400 hover:bg-gray-100'}`}>
              <Sparkles size={24} />
            </div>
            <span className={`text-[12px] font-bold transition-colors ${activeView === 'GEMINI' ? 'text-[#001d35]' : 'text-gray-400 group-hover:text-gray-600'}`}>Help me create</span>
          </button>
          
          <button 
            onClick={() => setActiveView('TEMPLATES')}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-12 h-10 rounded-2xl flex items-center justify-center transition-all ${activeView === 'TEMPLATES' ? 'bg-[#e3effd] text-[#0b57d0] shadow-sm' : 'text-gray-400 hover:bg-gray-100'}`}>
              <Layout size={24} />
            </div>
            <span className={`text-[12px] font-bold transition-colors ${activeView === 'TEMPLATES' ? 'text-[#0b57d0]' : 'text-gray-400 group-hover:text-gray-600'}`}>Templates</span>
          </button>
        </div>

        {activeView === 'GEMINI' ? (
          renderGeminiView()
        ) : (
          <div className="flex-1 flex flex-col min-w-0 animate-in fade-in duration-300">
            <div className="px-10 py-8 flex items-center justify-between shrink-0">
              <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Select a template</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
              <div className="grid grid-cols-4 gap-x-6 gap-y-10">
                {templates.map((template) => (
                  <div key={template.id} className="flex flex-col cursor-pointer group" onClick={() => handleOpenTemplate(template.id)}>
                    <div className={`
                      aspect-[3/4.2] rounded-[20px] border overflow-hidden transition-all duration-300 relative
                      ${template.selected 
                        ? 'ring-4 ring-[#0b57d0] border-[#0b57d0] shadow-2xl scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1'
                      }
                      bg-white
                    `}>
                      {renderAppPreview(template)}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <span className={`mt-4 text-[15px] font-medium text-center transition-colors ${template.selected ? 'text-[#0b57d0] font-bold' : 'text-gray-700 group-hover:text-black'}`}>
                      {template.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
          border: 2px solid #fcfcfc;
        }
      `}</style>
    </div>
  );
};

export default TemplateSelectionModal;
