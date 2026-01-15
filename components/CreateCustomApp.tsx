import React, { useState } from 'react';
import { Ticket, Award, Users, ChevronRight, HelpCircle, X, Search, Settings, Plus } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';
import TemplateSelectionModal from './TemplateSelectionModal';
import { ViewType } from '../types';

interface CreateCustomAppProps {
  setView: (view: ViewType) => void;
}

const CreateCustomApp: React.FC<CreateCustomAppProps> = ({ setView }) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{name: string, description: string, icon: React.ReactNode} | null>(null);

  const handleOpenStudio = () => {
    setView('APP_STUDIO');
  };

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template);
    setIsPreviewModalOpen(true);
  };

  const featuredTemplates = [
    { 
      id: '1', 
      name: 'HR Ticketing', 
      icon: <Ticket size={24} />, 
      description: 'Track and manage HR support tickets efficiently' 
    },
    { 
      id: '2', 
      name: 'License Management', 
      icon: <Award size={24} />, 
      description: 'Monitor and allocate software licenses across teams' 
    },
    { 
      id: '3', 
      name: 'Skill Tracker', 
      icon: <Users size={24} />, 
      description: 'Keep record of employee certifications and skills' 
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
        {/* Header/Close */}
        <div className="absolute top-8 right-8 z-10">
          <button 
            onClick={() => setView('MY_DRIVE')} 
            className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400 border border-transparent hover:border-gray-100"
          >
            <X size={28} />
          </button>
        </div>

        {/* Hero Section */}
        <div className="px-12 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in slide-in-from-left-8 duration-500">
            <h1 className="text-[72px] font-black text-gray-900 leading-[0.95] tracking-tight">
              Create a <br />Custom app
            </h1>
            <p className="text-[22px] text-gray-500 leading-relaxed max-w-lg font-medium">
              Build your own internal application tailored to your business needs. Connect data, build UI, and automate workflows in minutes.
            </p>
            <div className="flex items-center gap-5 pt-4">
              <button 
                onClick={handleOpenStudio}
                className="px-12 py-5 bg-[#7A005D] text-white rounded-[24px] font-bold text-[20px] hover:bg-[#6b0051] transition-all shadow-2xl shadow-[#7A005D]/30 active:scale-95"
              >
                Create App
              </button>
              <button 
                onClick={() => setIsSelectionModalOpen(true)}
                className="px-12 py-5 bg-[#f8fafc] text-gray-700 rounded-[24px] font-bold text-[20px] hover:bg-gray-200 transition-all active:scale-95 border border-gray-100"
              >
                Browse templates
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative animate-in zoom-in-95 duration-700">
            <div className="aspect-[1.2/1] rounded-[56px] bg-gradient-to-br from-[#fdf2f8] to-[#f5f3ff] p-16 flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="relative w-full max-w-[440px] bg-white rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.12)] border border-white/50 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A005D] flex items-center justify-center text-[#ffb800]">
                    <Ticket size={22} />
                  </div>
                  <div className="h-2.5 w-32 bg-gray-100 rounded-full"></div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="h-4 w-3/4 bg-gray-50 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-gray-50 rounded-full"></div>
                  <div className="space-y-3 pt-4">
                    <div className="h-12 w-full bg-gray-50 rounded-2xl border border-gray-100"></div>
                    <div className="h-12 w-full bg-gray-50 rounded-2xl border border-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Templates Section */}
        <div className="px-12 max-w-7xl mx-auto py-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-[36px] font-bold text-gray-900 tracking-tight">Featured templates</h2>
            <button 
              onClick={() => setIsSelectionModalOpen(true)}
              className="flex items-center gap-2 text-[#7A005D] font-bold text-[18px] hover:underline"
            >
              View all <ChevronRight size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredTemplates.map((template) => (
              <div 
                key={template.id}
                className="group bg-[#f8fafc] rounded-[48px] p-10 flex flex-col h-[340px] transition-all hover:bg-[#f1f5f9] hover:shadow-2xl hover:-translate-y-2 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500"
                onClick={() => handleTemplateClick(template)}
              >
                <div className="w-16 h-16 bg-[#3d2b2f] rounded-2xl flex items-center justify-center text-[#ffb800] mb-10 shadow-lg group-hover:scale-110 transition-transform">
                  {template.icon}
                </div>
                <div className="bg-white rounded-3xl p-8 flex-1 shadow-sm border border-gray-50/50">
                  <h3 className="text-[22px] font-bold text-gray-900 mb-2 leading-tight">
                    {template.name}
                  </h3>
                  <p className="text-[15px] text-gray-500 font-medium leading-relaxed mb-6">
                    {template.description}
                  </p>
                  <button className="flex items-center gap-1.5 text-[15px] font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    Learn more <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TemplatePreviewModal 
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        setView={setView}
        template={selectedTemplate}
      />

      <TemplateSelectionModal 
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        setView={setView}
        mode="app"
      />

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

export default CreateCustomApp;
