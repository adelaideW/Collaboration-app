
import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, 
  LayoutGrid, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Settings, 
  Maximize2,
  Table as TableIcon,
  Plus,
  Share2,
  Trash2,
  Star,
  FolderIcon,
  Users,
  Info,
  PencilLine,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { ViewType, DriveItem } from '../types';
import { MOCK_ITEMS, getIcon, CustomAppIcon, DocumentsIcon, DeveloperToolsIcon, ReportsIcon, WorkflowAutomatorIcon } from '../constants';
import { USER_AVATAR_URL } from './TopBar';
import ManageAccessModal from './ManageAccessModal';

interface DriveContentProps { view: ViewType; }

const DriveContent: React.FC<DriveContentProps> = ({ view }) => {
  const [items, setItems] = useState<DriveItem[]>(MOCK_ITEMS);
  const [search, setSearch] = useState('');
  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedItemForShare, setSelectedItemForShare] = useState<DriveItem | null>(null);
  const appMenuRef = useRef<HTMLDivElement>(null);
  const appButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (appMenuRef.current && !appMenuRef.current.contains(event.target as Node) && 
          appButtonRef.current && !appButtonRef.current.contains(event.target as Node)) {
        setIsAppMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  const handleShareClick = (item: DriveItem) => {
    setSelectedItemForShare(item);
    setIsShareModalOpen(true);
  };

  const openInNewTab = (item: DriveItem) => {
    const url = `${window.location.origin}${window.location.pathname}?view=APP_STUDIO&id=${item.id}`;
    window.open(url, '_blank');
  };

  const filteredItems = items.filter(item => {
    if (view === 'STARRED' && !item.starred) return false;
    if (view === 'TASKS' && item.type !== 'doc') return false; 
    if (view === 'MY_DRIVE' && item.location !== 'My Drive') return false;
    if (view === 'SHARED_WITH_ME' && item.location !== 'Shared with me') return false;
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  const getItemIconType = (type: string) => {
    switch(type) {
      case 'app': return 'custom-app';
      case 'doc': return 'documents';
      case 'api': return 'developer-tools';
      case 'report': return 'report';
      case 'workflow': return 'workflow';
      default: return 'doc';
    }
  };

  const getAvatarUrl = (name: string) => {
    return name === 'Me' ? USER_AVATAR_URL : `https://i.pravatar.cc/100?u=${encodeURIComponent(name)}`;
  };

  const getTitle = () => {
    switch(view) {
      case 'RECENT': return 'Welcome to Collaboration Drive';
      case 'MY_DRIVE': return 'My drive';
      case 'SHARED_WITH_ME': return 'Shared with me';
      case 'STARRED': return 'Starred';
      case 'TASKS': return 'Tasks';
      case 'ARCHIVED': return 'Archived';
      default: return 'Collaboration Drive';
    }
  };

  const showLocationColumn = view !== 'MY_DRIVE' && view !== 'SHARED_WITH_ME' && view !== 'TASKS';

  // Specific Task View Renderer
  if (view === 'TASKS') {
    return (
      <div className="flex-1 flex flex-col min-h-0 h-full bg-[#FAFAFA] font-sans">
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Tasks</h1>
        </div>
        
        <div className="px-8 flex-1 pb-8">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
            {/* Custom Header from Screenshot */}
            <div className="flex border-b border-gray-200 bg-[#F9FAFB] text-[13px] text-gray-500 font-bold">
              <div className="flex-1 px-4 py-2.5 border-r border-gray-200 flex items-center justify-between group cursor-pointer hover:bg-gray-100/50">
                <span>Name</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-[30%] px-4 py-2.5 border-r border-gray-200 flex items-center justify-between group cursor-pointer hover:bg-gray-100/50">
                <div className="flex items-center gap-2">
                  <span>Status</span>
                  <div className="flex flex-col -space-y-1.5 bg-[#BFDBFE] rounded p-0.5">
                    <ArrowUp size={8} className="text-blue-600" />
                    <ArrowUp size={8} className="text-blue-600 rotate-180" />
                  </div>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-[25%] px-4 py-2.5 border-r border-gray-200 flex items-center justify-between group cursor-pointer hover:bg-gray-100/50">
                <span>Date created</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <div className="w-12 py-2.5 flex items-center justify-center cursor-pointer hover:bg-gray-100/50">
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-auto">
              <div className="divide-y divide-gray-100">
                {filteredItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center text-[13px] bg-white transition-none">
                    <div className="flex-1 px-4 py-4 truncate">
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); openInNewTab(item); }}
                        className="text-[#1E40AF] hover:text-[#1D4ED8] font-medium underline decoration-[#1E40AF]/30"
                      >
                        {idx === 0 ? "Q4 planing testing multi-sig doc" : idx === 1 ? "Multi-sig test 09/10/2025 10:13 AM" : item.name}
                      </a>
                    </div>
                    <div className="w-[30%] px-4 py-4 flex items-center gap-2 text-gray-900 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#EA580C]" />
                      <span>Yet to sign</span>
                    </div>
                    <div className="w-[25%] px-4 py-4 text-gray-700 font-medium">
                      01/08/2026
                    </div>
                    <div className="w-12 py-4 flex items-center justify-center text-gray-400">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Drive View for all other pages
  return (
    <div className="flex-1 flex flex-col min-h-0 h-full font-sans bg-[#FAFAFA]">
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getTitle()}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
           <span className="font-semibold text-gray-700">Collaboration Drive</span>
           <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">
             {filteredItems.length} items
           </span>
           <Info size={14} className="text-gray-400" />
        </div>
      </div>

      <div className="px-8 flex-1 flex flex-col min-h-0 pb-8">
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <div className="relative flex border border-gray-200 rounded-lg h-8">
                <button 
                  className="flex items-center gap-2 px-3 bg-[#7A005D] text-white rounded-l-lg text-xs font-semibold hover:bg-[#6b0051] transition-colors border-r border-[#6b0051]"
                >
                  <TableIcon size={14} />
                  <span>Table</span>
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-r-lg bg-white">
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="relative ml-2">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm w-64 focus:bg-white focus:ring-2 focus:ring-[#7A005D]/10 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 relative">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowUpDown size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Maximize2 size={18} />
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1"></div>
              
              <div className="relative">
                <button 
                  ref={appButtonRef}
                  onClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
                  className={`p-2 rounded-lg transition-colors ${isAppMenuOpen ? 'bg-gray-100 text-[#7A005D]' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <LayoutGrid size={18} />
                </button>

                {isAppMenuOpen && (
                  <div 
                    ref={appMenuRef}
                    className="absolute right-0 top-11 w-[240px] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-5 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#7A005D] flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                        <CustomAppIcon className="w-8 h-8" mode="branded" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#7A005D] flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                        <DocumentsIcon className="w-8 h-8" mode="branded" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#7A005D] flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                        <DeveloperToolsIcon className="w-8 h-8" mode="branded" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#7A005D] flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                        <ReportsIcon className="w-8 h-8" mode="branded" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#7A005D] flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                        <WorkflowAutomatorIcon className="w-8 h-8" mode="branded" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[1100px]">
              <thead className="sticky top-0 z-10 bg-[#FAFAFA]/80 backdrop-blur-md">
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4 w-[28%]">Name</th>
                  <th className="px-6 py-4 w-32">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Modified</th>
                  {showLocationColumn && <th className="px-6 py-4">Location</th>}
                  <th className="px-6 py-4 w-44 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredItems.map(item => (
                  <tr key={item.id} className="group hover:bg-blue-50/40 transition-colors cursor-pointer" onClick={() => openInNewTab(item)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="shrink-0">
                            {getIcon(getItemIconType(item.type), "w-8 h-8 rounded-lg shadow-sm")}
                          </div>
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-[14px] font-medium text-gray-800 truncate hover:text-blue-600 hover:underline">{item.name}</span>
                            {item.starred && (
                              <Star size={16} className="text-amber-400 fill-amber-400 shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.status ? (
                        <span className={`text-[10px] font-bold w-fit px-2 py-0.5 rounded uppercase tracking-tight shadow-sm border border-black/5 ${
                          item.status === 'Signed' ? 'bg-green-100 text-green-700' : 
                          item.status === 'Running' ? 'bg-blue-100 text-blue-700' : 
                          item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <img 
                            src={getAvatarUrl(item.owner)} 
                            className="w-6 h-6 rounded-full border border-gray-200 object-cover shadow-sm"
                            alt={item.owner}
                            loading="lazy"
                          />
                          <span className="text-[14px] text-gray-700 truncate font-medium tracking-tight">{item.owner}</span>
                        </div>
                        <span className="text-[12px] text-gray-400 pl-8 leading-tight mt-0.5">{item.createdAt}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <img 
                            src={getAvatarUrl(item.lastModifiedBy)} 
                            className="w-6 h-6 rounded-full border border-gray-200 object-cover shadow-sm"
                            alt={item.lastModifiedBy}
                            loading="lazy"
                          />
                          <span className="text-[14px] text-gray-700 truncate font-medium tracking-tight">{item.lastModifiedBy}</span>
                        </div>
                        <span className="text-[12px] text-gray-400 pl-8 leading-tight mt-0.5">{item.lastModified}</span>
                      </div>
                    </td>
                    {showLocationColumn && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[14px] text-[#000000]">
                          {item.location === 'Shared with me' ? (
                            <Users size={16} className="text-gray-400" />
                          ) : (
                            <FolderIcon size={16} className="text-gray-300" />
                          )}
                          <span className="truncate">{item.location}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            onClick={() => handleShareClick(item)}
                            className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" 
                            title="Share"
                          >
                            <Share2 size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-800 transition-colors" title="Rename">
                            <PencilLine size={16} />
                          </button>
                          <button 
                            onClick={(e) => toggleStar(item.id, e)} 
                            className={`p-1.5 transition-colors ${item.starred ? 'text-amber-400' : 'text-gray-400 hover:text-amber-500'}`} 
                            title={item.starred ? "Unstar" : "Star"}
                          >
                            <Star size={16} fill={item.starred ? "currentColor" : "none"} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <button className="flex items-center justify-center p-2 bg-white border border-gray-100 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-gray-800 hover:bg-gray-50 transition-all shrink-0">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="p-6 bg-gray-50 rounded-full mb-4">
                  <FolderIcon size={48} strokeWidth={1} />
                </div>
                <p className="text-sm font-medium">No results matching your criteria</p>
                <button 
                  onClick={() => setSearch('')}
                  className="mt-2 text-sm text-[#7A005D] hover:underline font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ManageAccessModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        item={selectedItemForShare} 
      />
    </div>
  );
};

export default DriveContent;
