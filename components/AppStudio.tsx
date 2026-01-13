
import React from 'react';
import { 
  Play, LogOut, Search, MessageSquare, PlusSquare, BarChart, Table,
  Layout, Image, Kanban, Bell, Type, PanelTop, Video,
  MousePointer2, SquareCheck, Coins, Calendar, Hash, Percent, Phone, Radio,
  ChevronDown, MoreVertical, Pencil, Trash2, Maximize2, List,
  Plus, ChevronLeft, ChevronRight, Variable, ArrowLeftRight
} from 'lucide-react';
import { ViewType } from '../types';

interface AppStudioProps {
  setView: (view: ViewType) => void;
}

const AppStudio: React.FC<AppStudioProps> = ({ setView }) => {
  const categories = [
    {
      title: 'Data',
      items: [
        { icon: <MessageSquare size={18} />, label: 'Comments' },
        { icon: <PlusSquare size={18} />, label: 'Create Record Form' },
        { icon: <BarChart size={18} />, label: 'Dashboard' },
        { icon: <Table size={18} />, label: 'Table' },
        { icon: <List size={18} />, label: 'Report' },
      ]
    },
    {
      title: 'Content',
      items: [
        { icon: <Layout size={18} />, label: 'Page header' },
        { icon: <Image size={18} />, label: 'Image' },
        { icon: <Kanban size={18} />, label: 'Kanban' },
        { icon: <Bell size={18} />, label: 'Notice' },
        { icon: <Type size={18} />, label: 'RichText' },
        { icon: <PanelTop size={18} />, label: 'Tabs' },
        { icon: <Video size={18} />, label: 'Video' },
      ]
    },
    {
      title: 'Button',
      items: [
        { icon: <MousePointer2 size={18} />, label: 'Button' },
      ]
    },
    {
      title: 'Input',
      items: [
        { icon: <SquareCheck size={18} />, label: 'Checkbox' },
        { icon: <Coins size={18} />, label: 'Currency' },
        { icon: <Calendar size={18} />, label: 'Date' },
        { icon: <Calendar size={18} />, label: 'Date Range' },
        { icon: <Search size={18} />, label: 'Multi lookup' },
        { icon: <List size={18} />, label: 'Multi Select' },
        { icon: <Hash size={18} />, label: 'Number' },
        { icon: <Search size={18} />, label: 'Lookup' },
        { icon: <Percent size={18} />, label: 'Percentage' },
        { icon: <Phone size={18} />, label: 'Phone Number' },
        { icon: <Radio size={18} />, label: 'Radio' },
        { icon: <PanelTop size={18} />, label: 'Segmented Control' },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F2EDE9]">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-black text-lg">R</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">My Tickets</h1>
            <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase">Custom</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-[12px] text-gray-400">Last saved at January 13, 2026, 10:19:46 AM</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors">
              <Play size={16} fill="black" />
              <span>Preview</span>
            </button>
            <button 
              onClick={() => setView('MY_DRIVE')}
              className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={16} />
              <span>Done</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Far Left Navigation Toolbar */}
        <nav className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-3 shrink-0 shadow-sm z-40">
          <button className="w-8 h-8 bg-[#BFDBFE] text-[#1E40AF] rounded flex items-center justify-center hover:bg-[#93C5FD] transition-colors">
            <Plus size={18} strokeWidth={2.5} />
          </button>
          
          <div className="flex flex-col items-center gap-0.5 w-full">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded flex items-center gap-0.5">
              <ChevronLeft size={12} />
              <ChevronRight size={12} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <Variable size={18} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <ArrowLeftRight size={18} />
            </button>
          </div>
        </nav>

        {/* Component Library Sidebar - Dense Version */}
        <aside className="w-[240px] bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden shadow-sm">
          <div className="px-4 pt-4 pb-3">
            <h2 className="text-[14px] font-bold text-gray-900 mb-3 uppercase tracking-tight">Page components</h2>
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              <input 
                type="text" 
                placeholder="Search components" 
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:ring-1 focus:ring-black/5 focus:border-gray-400 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-t border-gray-50">
                <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors group">
                  <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">{cat.title}</span>
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                </button>
                <div className="grid grid-cols-2 gap-y-2 gap-x-1 px-2 pb-4">
                  {cat.items.map((item, itemIdx) => (
                    <button key={itemIdx} className="flex flex-col items-center justify-start py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-9 h-9 flex items-center justify-center text-gray-800 group-hover:scale-105 transition-transform bg-white border border-transparent group-hover:border-gray-100 rounded shadow-sm">
                        {item.icon}
                      </div>
                      <span className="text-[11px] text-gray-700 font-semibold text-center leading-tight mt-1.5 max-w-[90px] px-1">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px' 
            }}
          />

          {/* Component Container */}
          <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden min-h-[500px] flex flex-col group/component">
            {/* Component Resize Handles */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            
            {/* Component Header / Toolbar */}
            <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100 bg-[#F9FAFB]">
              <div className="flex items-center gap-2">
                 <div className="w-7 h-7 rounded bg-white border border-gray-200 flex items-center justify-center text-amber-500 shadow-sm">
                   <Table size={14} />
                 </div>
                 <div className="flex items-center gap-1">
                   <span className="text-xs font-bold text-gray-900">HR Ticketing</span>
                   <ChevronDown size={12} className="text-gray-400" />
                 </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <Pencil size={10} />
                  <span>Edit all</span>
                </button>
                <button className="p-1 bg-white border border-gray-200 rounded text-gray-500 hover:text-red-500 transition-colors shadow-sm">
                  <Trash2 size={12} />
                </button>
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <span>Add HR Ticket</span>
                </button>
                <button className="p-1 bg-white border border-gray-200 rounded text-gray-500 hover:text-black transition-colors shadow-sm">
                  <MoreVertical size={12} />
                </button>
              </div>
            </div>

            {/* Component Content (Table Preview) */}
            <div className="flex-1 overflow-auto p-4 relative">
              <button className="absolute top-4 right-4 p-1.5 bg-white rounded border border-gray-200 shadow-sm text-gray-400 hover:text-black transition-colors">
                <Maximize2 size={14} />
              </button>
              
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-3 py-2.5 font-bold text-gray-500 uppercase tracking-tight">Issue Summary</th>
                    <th className="px-3 py-2.5 font-bold text-gray-500 uppercase tracking-tight">Category</th>
                    <th className="px-3 py-2.5 font-bold text-gray-500 uppercase tracking-tight">Status</th>
                    <th className="px-3 py-2.5 font-bold text-gray-500 uppercase tracking-tight">Age</th>
                    <th className="px-3 py-2.5 font-bold text-gray-500 uppercase tracking-tight">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { summary: 'Incorrect salary deposit.', category: 'Payroll', status: 'Closed', age: '0', created: '02/24/2025' },
                    { summary: 'Health benefits enrollment issue.', category: 'Benefits', status: 'Closed', age: '0', created: '02/24/2025' },
                    { summary: 'Compliance training missing.', category: 'Policy', status: 'Open', age: '323', created: '02/24/2025' },
                    { summary: 'Access issue for new hire.', category: 'Onboarding', status: 'Closed', age: '0', created: '02/24/2025' },
                    { summary: 'Delayed final payout.', category: 'Termination', status: 'In Progress', age: '323', created: '02/24/2025' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-3 py-2.5 text-blue-600 font-medium underline cursor-pointer truncate max-w-[200px]">{row.summary}</td>
                      <td className="px-3 py-2.5">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-medium text-gray-600">{row.category}</span>
                      </td>
                      <td className="px-3 py-2.5">
                         <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                           row.status === 'Closed' ? 'bg-gray-100 text-gray-600' :
                           row.status === 'Open' ? 'bg-amber-50 text-amber-600' :
                           'bg-blue-50 text-blue-600'
                         }`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-500">{row.age}</td>
                      <td className="px-3 py-2.5 text-gray-500">{row.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Right Action Bar */}
        <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-3 shrink-0 shadow-sm">
          <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded">
            <List size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default AppStudio;
