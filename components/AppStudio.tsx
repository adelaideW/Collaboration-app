
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
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F2EDE9] font-sans">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">My Tickets</h1>
            <span className="px-2 py-0.5 border border-gray-200 bg-white text-[9px] font-bold text-gray-400 rounded uppercase tracking-wider">Custom</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-[12px] text-gray-400">Last saved at January 13, 2026, 10:19:46 AM</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm bg-white">
              <Play size={16} className="fill-black" />
              <span>Preview</span>
            </button>
            <button 
              onClick={() => setView('HOME')}
              className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm bg-white"
            >
              <LogOut size={16} />
              <span>Done</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Far Left Navigation Toolbar */}
        <nav className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4 shrink-0 z-40">
          <button className="w-8 h-8 bg-[#BFDBFE] text-[#1E40AF] rounded flex items-center justify-center hover:bg-[#93C5FD] transition-colors shadow-sm">
            <Plus size={18} strokeWidth={2.5} />
          </button>
          
          <div className="flex flex-col items-center gap-1 w-full mt-2">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded flex items-center gap-0.5">
              <ChevronLeft size={12} strokeWidth={2.5} />
              <ChevronRight size={12} strokeWidth={2.5} />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded">
              <Variable size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded">
              <ArrowLeftRight size={20} />
            </button>
          </div>
        </nav>

        {/* Component Library Sidebar */}
        <aside className="w-[240px] bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-[12px] font-bold text-gray-900 mb-4 uppercase tracking-wider">Page components</h2>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" strokeWidth={2} />
              <input 
                type="text" 
                placeholder="Search components" 
                className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-gray-100 rounded-lg text-[13px] outline-none placeholder:text-gray-300"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar px-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="mt-2">
                <button className="w-full flex items-center justify-between px-2 py-2 hover:bg-gray-50 transition-colors group">
                  <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">{cat.title}</span>
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                </button>
                <div className="grid grid-cols-2 gap-2 pb-4">
                  {cat.items.map((item, itemIdx) => (
                    <button key={itemIdx} className="flex flex-col items-center justify-center p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all group">
                      <div className="w-10 h-10 flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm mb-2 group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-[11px] text-gray-700 font-bold text-center leading-tight">
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
        <main className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#f2ede9] p-8">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ 
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '32px 32px' 
            }}
          />

          {/* Table Component */}
          <div className="relative w-full max-w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col group animate-in zoom-in-95 duration-300">
            {/* Component Resize Handles (Blue squares) */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-sm border-2 border-white z-10"></div>
            
            {/* Table Component Header */}
            <div className="px-5 py-2.5 flex items-center justify-between border-b border-gray-50 bg-[#F9FAFB]/80">
              <div className="flex items-center gap-2">
                 <div className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-amber-500 shadow-sm bg-white">
                   <Table size={14} />
                 </div>
                 <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-1.5 py-0.5 rounded transition-colors">
                   <span className="text-[12px] font-bold text-gray-900">HR Ticketing</span>
                   <ChevronDown size={12} className="text-gray-400" />
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm">
                  <Pencil size={12} className="text-gray-400" />
                  <span>Edit all</span>
                </button>
                <button className="p-1.5 bg-white border border-gray-200 rounded-md text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                  <Trash2 size={12} />
                </button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm">
                  Add HR Ticket
                </button>
                <button className="p-1.5 bg-white border border-gray-200 rounded-md text-gray-400 hover:text-black transition-colors shadow-sm">
                  <MoreVertical size={12} />
                </button>
              </div>
            </div>

            {/* Table Content Preview */}
            <div className="p-6 relative">
              <button className="absolute top-4 right-4 p-1.5 bg-white rounded-md border border-gray-100 shadow-sm text-gray-300 hover:text-gray-900 transition-colors">
                <Maximize2 size={14} />
              </button>
              
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Issue Summary</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Created</th>
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
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-3 py-3 text-blue-600 font-medium underline cursor-pointer truncate max-w-[200px]">{row.summary}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 uppercase">{row.category}</span>
                      </td>
                      <td className="px-3 py-3">
                         <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                           row.status === 'Closed' ? 'bg-gray-100 text-gray-900' :
                           row.status === 'Open' ? 'bg-amber-100 text-amber-700' :
                           'bg-blue-100 text-blue-700'
                         }`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-3 text-gray-500 font-medium">{row.age}</td>
                      <td className="px-3 py-3 text-gray-500 font-medium">{row.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Right Toolbar */}
        <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-4 shrink-0">
          <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
            <List size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AppStudio;
