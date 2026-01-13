
import React, { useState } from 'react';
import { Play, Info, Ticket, Award, Users, ChevronRight, HelpCircle } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';
import TemplateSelectionModal from './TemplateSelectionModal';
import { ViewType } from '../types';

interface CreateCustomAppProps {
  setView: (view: ViewType) => void;
}

const CreateCustomApp: React.FC<CreateCustomAppProps> = ({ setView }) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);

  const handleOpenStudio = () => {
    // Open the App Studio in a new browser tab
    const url = `${window.location.origin}${window.location.pathname}?view=APP_STUDIO`;
    window.open(url, '_blank');
  };

  const featuredTemplates = [
    { id: '1', name: 'HR Ticketing', icon: <Ticket size={24} />, description: 'Track and manage HR support tickets efficiently' },
    { id: '2', name: 'License Management', icon: <Award size={24} />, description: 'Monitor and allocate software licenses across teams' },
    { id: '3', name: 'Skill Tracker', icon: <Users size={24} />, description: 'Keep record of employee certifications and skills' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA] custom-scrollbar">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 px-10 py-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-[40px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Create a Custom app
            </h1>
            <p className="text-[18px] text-gray-500 leading-relaxed max-w-lg">
              Build your own internal application tailored to your business needs. Connect data, build UI, and automate workflows in minutes.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <button 
                onClick={handleOpenStudio}
                className="px-8 py-3.5 bg-[#7A005D] text-white rounded-xl font-bold text-[16px] hover:bg-[#6b0051] transition-all shadow-lg shadow-[#7A005D]/20 active:scale-95"
              >
                Create App
              </button>
              <button 
                onClick={() => setIsSelectionModalOpen(true)}
                className="px-8 py-3.5 bg-white border border-gray-200 text-gray-800 rounded-xl font-bold text-[16px] hover:bg-gray-50 transition-all active:scale-95"
              >
                Browse templates
              </button>
            </div>
          </div>
          <div className="w-full md:w-[400px] aspect-square rounded-[32px] bg-[#fdf2f8] p-8 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50"></div>
            <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 transform group-hover:scale-105 transition-transform duration-500">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-[#7A005D] flex items-center justify-center text-[#ffb800] shadow-sm">
                   <Ticket size={20} />
                 </div>
                 <div className="flex-1">
                   <div className="h-2 w-1/3 bg-gray-100 rounded mb-1.5"></div>
                   <div className="h-1.5 w-1/2 bg-gray-50 rounded"></div>
                 </div>
               </div>
               <div className="space-y-3">
                 <div className="h-4 w-full bg-gray-50 rounded"></div>
                 <div className="h-4 w-full bg-gray-50 rounded"></div>
                 <div className="h-4 w-2/3 bg-gray-50 rounded"></div>
                 <div className="pt-4 flex justify-end">
                   <div className="w-20 h-8 bg-blue-50 border border-blue-100 rounded-lg"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Templates Section */}
      <div className="px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold text-gray-900 tracking-tight">Featured templates</h2>
            <button className="text-[14px] font-bold text-[#7A005D] hover:underline flex items-center gap-1">
              View all
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setIsPreviewModalOpen(true)}
                className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3d2b2f] flex items-center justify-center text-[#ffb800] mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  {template.icon}
                </div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-2 group-hover:text-[#7A005D] transition-colors">
                  {template.name}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-900 mt-auto">
                  <span>Learn more</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Footer */}
      <div className="px-10 pb-20">
        <div className="max-w-4xl mx-auto p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
             <HelpCircle size={32} />
           </div>
           <div className="flex-1">
             <h3 className="text-[20px] font-bold text-gray-900 mb-2">Need help getting started?</h3>
             <p className="text-[15px] text-gray-500">Read our documentation or talk to an expert to learn how to build powerful custom apps for your organization.</p>
           </div>
           <button className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl font-bold text-[14px] hover:bg-gray-100 transition-all whitespace-nowrap">
             Contact Support
           </button>
        </div>
      </div>

      {/* Modals */}
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
