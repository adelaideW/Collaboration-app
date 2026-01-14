
import React, { useState } from 'react';
import { Ticket, Award, Users, ChevronRight, HelpCircle, X, Search, Settings } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';
import TemplateSelectionModal from './TemplateSelectionModal';
import { ViewType } from '../types';

interface CreateCustomAppProps {
  setView: (view: ViewType) => void;
}

const CreateCustomApp: React.FC<CreateCustomAppProps> = ({ setView }) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);

  // Local navigation instead of new tab
  const handleOpenStudio = () => {
    setView('APP_STUDIO');
  };

  const featuredTemplates = [
    { id: '1', name: 'HR Ticketing', icon: <Ticket size={24} />, description: 'Track and manage HR support tickets efficiently' },
    { id: '2', name: 'License Management', icon: <Award size={24} />, description: 'Monitor and allocate software licenses across teams' },
    { id: '3', name: 'Skill Tracker', icon: <Users size={24} />, description: 'Keep record of employee certifications and skills' },
  ];

  return (
    <div className="h-full flex flex-col bg-white relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
        {/* Close Button / Back */}
        <div className="absolute top-6 left-6 z-10">
          <button 
            onClick={() => window.close()} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Hero Section */}
        <div className="px-10 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-[56px] font-bold text-gray-900 leading-[1] tracking-tight">
              Create a Custom app
            </h1>
            <p className="text-[18px] text-gray-500 leading-relaxed max-w-lg font-medium">
              Build your own internal application tailored to your business needs. Connect data, build UI, and automate workflows in minutes.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handleOpenStudio}
                className="px-10 py-4 bg-[#7A005D] text-white rounded-2xl font-bold text-[16px] hover:bg-[#6b0051] transition-all shadow-xl shadow-[#7A005D]/20 active:scale-95"
              >
                Create App
              </button>
              <button 
                onClick={() => setIsSelectionModalOpen(true)}
                className="px-10 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl font-bold text-[16px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
              >
                Browse templates
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Visual card on right */}
            <div className="aspect-[4/3] rounded-[48px] bg-[#fdf2f8] p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
              <div className="relative z-10 w-full h-full bg-white rounded-[32px] shadow-2xl border border-white p-8 animate-in slide-in-from-bottom-8 duration-700">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-xl bg-[#7A005D] flex items-center justify-center text-[#ffb800] shadow-sm">
                     <Ticket size={24} />
                   </div>
                   <div className="flex-1">
                     <div className="h-3 w-1/3 bg-gray-100 rounded-full mb-2"></div>
                     <div className="h-2 w-1/2 bg-gray-50 rounded-full"></div>
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div className="h-6 w-full bg-gray-50 rounded-lg"></div>
                   <div className="h-6 w-full bg-gray-50 rounded-lg"></div>
                   <div className="h-6 w-2/3 bg-gray-50 rounded-lg"></div>
                   <div className="pt-8 flex justify-end">
                     <div className="w-24 h-10 bg-[#f3f4f6] rounded-xl border border-gray-100"></div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Templates Section */}
        <div className="px-10 py-16 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Featured templates</h2>
            <button 
              onClick={() => setIsSelectionModalOpen(true)}
              className="text-[15px] font-bold text-[#7A005D] hover:underline flex items-center gap-1.5"
            >
              View all
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setIsPreviewModalOpen(true)}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#3d2b2f] flex items-center justify-center text-[#ffb800] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  {template.id === '1' ? <Ticket size={32} /> : template.id === '2' ? <Award size={32} /> : <Users size={32} />}
                </div>
                <h3 className="text-[22px] font-bold text-gray-900 mb-3 group-hover:text-[#7A005D] transition-colors">
                  {template.name}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-10 font-medium">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 text-[15px] font-bold text-gray-900 mt-auto">
                  <span>Learn more</span>
                  <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Box */}
        <div className="px-10 pb-20 max-w-7xl mx-auto">
          <div className="p-12 bg-[#F9FAFB] rounded-[48px] border border-gray-100 flex flex-col md:flex-row items-center gap-12">
             <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
               <HelpCircle size={40} />
             </div>
             <div className="flex-1">
               <h3 className="text-[24px] font-bold text-gray-900 mb-3">Need help getting started?</h3>
               <p className="text-[16px] text-gray-500 font-medium max-w-2xl">Read our documentation or talk to an expert to learn how to build powerful custom apps for your organization.</p>
             </div>
             <button className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold text-[16px] hover:bg-gray-50 transition-all shadow-sm whitespace-nowrap">
               Contact Support
             </button>
          </div>
        </div>
      </div>

      {/* Floating Pill Status Bar at the bottom center */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[#1a1a1a] rounded-full px-4 py-2 flex items-center gap-4 shadow-2xl border border-white/10">
          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Search size={16} />
            </div>
            <div className="h-1.5 w-4 bg-gray-600 rounded-full"></div>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Settings size={16} />
            </div>
            <div className="h-1.5 w-4 bg-gray-600 rounded-full"></div>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <ChevronRight size={16} />
            </div>
          </div>
          <div className="bg-[#3A3F2C] text-[#C9D9A8] px-4 py-1.5 rounded-full text-[13px] font-bold">
            100
          </div>
        </div>
      </div>

      {/* Modals - These will now navigate locally */}
      <TemplatePreviewModal 
        isOpen={isPreviewModalOpen} 
        onClose={() => setIsPreviewModalOpen(false)}
        setView={setView}
        template={{
          name: 'HR Ticketing',
          description: 'A comprehensive HR ticketing system that allows employees to submit and track tickets, with automated ticket numbering and resolution time tracking.',
          icon: <Ticket size={24} />
        }}
      />

      <TemplateSelectionModal 
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
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
          border: 2px solid transparent;
          background-clip: content-box;
        }
      `}</style>
    </div>
  );
};

export default CreateCustomApp;
