import React from 'react';
import { X, Ticket, ChevronDown, Check, Layout, Database, Award, Users, Search, MoreVertical, Pencil, Trash2, Maximize2, List, Share2, Info } from 'lucide-react';
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

const FEATURE_DATA: Record<string, { left: { title: string, desc: string }, right: { title: string, desc: string } }> = {
  'HR Ticketing': {
    left: {
      title: 'Comprehensive HR Ticketing System',
      desc: 'A comprehensive HR ticketing system that allows employees to submit and track tickets, with automated ticket numbering and resolution time tracking'
    },
    right: {
      title: 'Quickly Create Tickets',
      desc: 'Easily create, submit and track HR tickets, with automated ticket numbering and resolution time tracking'
    }
  },
  'License Management': {
    left: {
      title: 'Comprehensive Credential Management',
      desc: 'A comprehensive license & credential management system that allows organizations to track and manage professional licenses, certifications, and their issuing organizations'
    },
    right: {
      title: 'Quickly Create Licenses',
      desc: 'Easily create, track and manage professional licenses, certifications, and their issuing organizations, and embed this information on the Employee\'s Profile'
    }
  },
  'Skill Tracker': {
    left: {
      title: 'Comprehensive Skill Tracker',
      desc: 'A comprehensive skill tracker system that allows organizations to track and manage employee skill levels'
    },
    right: {
      title: 'Quickly Create Skills',
      desc: 'Easily create, track and manage employee skill levels, and embed this information on the Employee\'s Profile'
    }
  }
};

const AppScreenshot = ({ type, templateName }: { type: 'table' | 'form', templateName: string }) => {
  const isTicketing = templateName === 'HR Ticketing';
  const isLicense = templateName === 'License Management';
  const isSkill = templateName === 'Skill Tracker';

  const themeIcon = isTicketing ? <Ticket size={18} /> : isLicense ? <Award size={18} /> : <Users size={18} />;
  const themeBannerIcon = isTicketing ? <Ticket size={24} /> : isLicense ? <Award size={24} /> : <Users size={24} />;

  if (type === 'table') {
    return (
      <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl h-full flex flex-col border border-gray-100/50">
        {/* App Header */}
        <div className="px-5 py-4 flex items-center justify-between bg-white border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3d2b2f] flex items-center justify-center text-[#ffb800]">
              {themeIcon}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-[13px] font-bold leading-tight">{templateName}</span>
              <span className="text-gray-400 text-[10px] leading-tight truncate max-w-[140px]">Track and manage {templateName.toLowerCase()} efficiently...</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-[9px] font-bold text-gray-700 whitespace-nowrap uppercase tracking-wider">
              <Share2 size={12} className="text-gray-300" />
              Manage access
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-[9px] font-bold text-gray-700 whitespace-nowrap uppercase tracking-wider">
              <Trash2 size={12} className="text-gray-300" />
              Delete app
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-100 flex items-center bg-white shrink-0">
          <div className="py-3 px-2 border-b-2 border-[#7A005D] text-[11px] font-bold text-[#7A005D]">
            My Tickets
          </div>
        </div>

        {/* Banner Section */}
        <div className="px-5 py-5 shrink-0">
          <div className="w-full h-[140px] rounded-xl bg-[#3d2b2f] relative overflow-hidden flex items-center justify-between">
             <img 
               src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=240&h=140" 
               className="h-full w-1/4 object-cover opacity-40 grayscale" 
               alt="" 
             />
             <div className="flex flex-col items-center text-center px-4 z-10 flex-1">
                <div className="w-12 h-12 bg-[#ffb800] rounded-2xl flex items-center justify-center text-[#3d2b2f] mb-2 shadow-lg">
                  {themeBannerIcon}
                </div>
                <h3 className="text-white text-[20px] font-bold tracking-tight leading-none mb-1">{templateName}</h3>
                <p className="text-white/40 text-[10px] max-w-[220px] leading-tight">
                  Allows teams to manage, prioritize, and resolve employee requests efficiently.
                </p>
             </div>
             <img 
               src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=240&h=140" 
               className="h-full w-1/4 object-cover opacity-40 grayscale" 
               alt="" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#3d2b2f] via-transparent to-[#3d2b2f] pointer-events-none"></div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-xl min-w-[130px] text-[12px] font-medium text-gray-500">
            All Tickets <ChevronDown size={14} className="ml-auto text-gray-300" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-2 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-700">
              <Pencil size={12} className="text-gray-400" />
              Edit all
            </div>
            <div className="p-2 border border-gray-100 rounded-xl text-gray-300">
              <Trash2 size={12} />
            </div>
            <div className="px-4 py-2 bg-[#3d2b2f] text-white rounded-xl text-[10px] font-bold">
              Add HR Ticket
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="px-5 py-4 flex-1 overflow-hidden flex flex-col">
          <h4 className="text-[12px] font-bold text-gray-900 mb-2">{templateName}s</h4>
          <div className="relative mb-3">
             <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
             <div className="w-full px-10 py-2 border border-gray-100 rounded-xl text-[11px] text-gray-400 bg-[#fcfcfc]">
                Search Issue Summary or Emp
             </div>
          </div>

          <div className="flex-1 overflow-hidden border border-gray-50 rounded-xl">
            <table className="w-full text-left text-[10px] border-collapse">
              <thead className="bg-[#f9fafb] text-gray-400 uppercase font-bold tracking-tight">
                <tr>
                  <th className="px-3 py-2 w-8"><div className="w-3 h-3 border border-gray-200 rounded"></div></th>
                  <th className="px-2 py-2">E..</th>
                  <th className="px-3 py-2">Issue Summary</th>
                  <th className="px-3 py-2">Ticket Cate..</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { img: 'https://i.pravatar.cc/150?u=1', name: 'J...', summary: 'Incorrect salary deposit.', category: 'Payroll', status: 'Closed', date: '03/11/2025' },
                  { img: 'https://i.pravatar.cc/150?u=2', name: 'J...', summary: 'Health benefits enrollment issue.', category: 'Benefits', status: 'Closed', date: '03/11/2025' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-2"><div className="w-3 h-3 border border-gray-100 rounded"></div></td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1.5">
                        <img src={row.img} className="w-5 h-5 rounded-full" />
                        <span className="font-bold text-gray-900">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-blue-600 font-bold underline truncate max-w-[140px]">{row.summary}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[8px] font-bold text-gray-500 uppercase">{row.category}</span>
                    </td>
                    <td className="px-3 py-2">
                       <span className="px-2 py-0.5 bg-gray-100 rounded text-[8px] font-black uppercase text-gray-900">{row.status}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-400 font-medium">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Form View recreation (to match column height)
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl h-full border border-gray-100/50 flex flex-col">
      <div className="p-5 border-b border-gray-50 flex items-center justify-between">
        <h4 className="text-gray-900 text-[14px] font-bold">Add {isTicketing ? 'HR Ticket' : isLicense ? 'License' : 'Skill Level'}</h4>
        <X size={18} className="text-gray-400" />
      </div>
      <div className="bg-white m-4 rounded-xl border border-gray-100 flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar shadow-inner">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">General Information</label>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                  {isTicketing ? 'Issue Summary' : isLicense ? 'License Name' : 'Skill Name'} <span className="text-red-500">*</span>
                </div>
                <div className="h-10 bg-white border border-gray-200 rounded-xl px-3 flex items-center text-gray-300 text-[12px]">Issue Summary</div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                  {isTicketing ? 'Ticket Category' : isLicense ? 'License Number' : 'Skill Level'} <span className="text-red-500">*</span>
                </div>
                <div className="h-10 bg-white border border-gray-200 rounded-xl px-3 flex items-center justify-between text-gray-300 text-[12px]">
                  Category <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
              Status <span className="text-red-500">*</span>
            </div>
            <div className="h-10 bg-white border border-gray-200 rounded-xl px-3 flex items-center justify-between text-gray-300 text-[12px]">
               Select status <ChevronDown size={14} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
              Details <span className="text-red-500">*</span>
            </div>
            <div className="min-h-[160px] bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-300 text-[12px]">
               Enter details here...
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-50 gap-3">
             <div className="px-6 py-2 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-600">Cancel</div>
             <div className="px-6 py-2 bg-[#3d2b2f] rounded-xl text-[11px] font-bold text-white shadow-sm">Save Record</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ isOpen, onClose, setView, template }) => {
  if (!isOpen || !template) return null;

  const handleCreateApp = () => {
    setView('APP_STUDIO');
    onClose();
  };

  const feature = FEATURE_DATA[template.name] || {
    left: { title: `Comprehensive ${template.name}`, desc: template.description },
    right: { title: `Quickly Create ${template.name}`, desc: `Easily build and track your ${template.name.toLowerCase()} in minutes.` }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#f2f4f6] rounded-[48px] shadow-2xl w-full max-w-[1280px] h-[92vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 relative border border-white/20">
        
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 p-2 hover:bg-white rounded-full transition-all text-gray-400 z-50 bg-white/80 backdrop-blur shadow-sm border border-gray-100"
        >
          <X size={24} />
        </button>

        {/* Content Area - Uses flex-1 and overflow-y-auto */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch min-h-full">
            
            {/* Column 1 - Table Preview */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-10 space-y-4">
                <h3 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                  {feature.left.title}
                </h3>
                <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
                  {feature.left.desc}
                </p>
              </div>
              <div className="flex-1 min-h-[580px]">
                <AppScreenshot type="table" templateName={template.name} />
              </div>
            </div>

            {/* Column 2 - Form Preview */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-10 space-y-4">
                <h3 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                  {feature.right.title}
                </h3>
                <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
                  {feature.right.desc}
                </p>
              </div>
              <div className="flex-1 min-h-[580px]">
                <AppScreenshot type="form" templateName={template.name} />
              </div>
            </div>

          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-white/95 backdrop-blur-md px-12 py-8 border-t border-gray-100 flex items-center justify-between shrink-0 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] mt-auto">
          <div className="flex items-center gap-5">
             <div className="w-16 h-16 bg-[#3d2b2f] rounded-2xl flex items-center justify-center text-[#ffb800] shadow-xl">
               {template.icon}
             </div>
             <div>
               <h4 className="text-[22px] font-bold text-gray-900 leading-none mb-1.5">{template.name}</h4>
               <p className="text-[14px] text-gray-500 font-medium">Professional Enterprise Template</p>
             </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-white border border-gray-200 rounded-[20px] font-bold text-[17px] text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
            >
              Back
            </button>
            <button 
              onClick={handleCreateApp}
              className="px-12 py-4 bg-[#7A005D] text-white rounded-[20px] font-bold text-[17px] hover:bg-[#6b0051] transition-all active:scale-95 shadow-xl shadow-[#7A005D]/20"
            >
              Create app
            </button>
          </div>
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

export default TemplatePreviewModal;
