
import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, 
  LayoutGrid, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Settings, 
  Maximize2,
  Plus,
  Share2,
  Trash2,
  Star,
  FolderIcon,
  Users,
  Info,
  ChevronDown,
  Pencil
} from 'lucide-react';
import { ViewType, DriveItem } from '../types';
import { MOCK_ITEMS, getIcon } from '../constants';
import { USER_AVATAR_URL } from './TopBar';
import ManageAccessModal from './ManageAccessModal';

interface DriveContentProps { view: ViewType; setView?: (view: ViewType) => void; }

const DriveContent: React.FC<DriveContentProps> = ({ view, setView }) => {
  const [items, setItems] = useState<DriveItem[]>(MOCK_ITEMS);
  const [search, setSearch] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedItemForShare, setSelectedItemForShare] = useState<DriveItem | null>(null);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  const handleRemoveItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleShareClick = (item: DriveItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemForShare(item);
    setIsShareModalOpen(true);
  };

  const handleEditItem = (item: DriveItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (setView) {
      if (item.type === 'doc') {
        setView('DOCUMENT_EDITOR');
      } else if (item.type === 'api') {
        setView('FUNCTION_EDITOR');
      } else if (item.type === 'report') {
        setView('REPORT_EDITOR');
      } else if (item.type === 'workflow') {
        setView('WORKFLOW_EDITOR');
      } else {
        setView('APP_STUDIO');
      }
    }
  };

  const filteredItems = items.filter(item => {
    if (view === 'STARRED' && !item.starred) return false;
    if (view === 'TASKS' && (item.type !== 'doc' || item.status === 'Signed')) return false; 
    if (view === 'MY_DRIVE' && item.location !== 'My Drive') return false;
    if (view === 'SHARED_WITH_ME' && item.location !== 'Shared with me') return false;
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  const sortedItems = (view === 'HOME' || view === 'RECENT')
    ? [...filteredItems].sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
    : filteredItems;

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
      case 'HOME': return 'Welcome to Collaboration Drive';
      case 'RECENT': return 'Recents';
      case 'MY_DRIVE': return 'My drive';
      case 'SHARED_WITH_ME': return 'Shared with me';
      case 'STARRED': return 'Starred';
      case 'TASKS': return 'Tasks';
      case 'ARCHIVED': return 'Archived';
      default: return 'Collaboration Drive';
    }
  };

  const showLocationColumn = view !== 'MY_DRIVE' && view !== 'SHARED_WITH_ME' && view !== 'TASKS';

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden">
      {/* View Header */}
      <div className="px-8 pt-8 pb-4 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{getTitle()}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">On Drive</span>
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-400 uppercase">
            {sortedItems.length} items
          </span>
          <Info size={14} className="cursor-help" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#7A005D] text-white rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95">
            Table <ChevronDown size={14} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
            <Plus size={20} />
          </button>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-gray-50 border-none rounded-lg text-sm outline-none w-[200px] focus:ring-1 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><Filter size={18} /></button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><ArrowUpDown size={18} /></button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><Settings size={18} /></button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><Maximize2 size={18} /></button>
          <div className="h-4 w-px bg-gray-200 mx-2"></div>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><LayoutGrid size={18} /></button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="px-8 border-b border-gray-100 bg-white sticky top-0 z-20 flex items-center shrink-0">
        <div className="w-12 py-3 flex justify-center">
          <div className="w-4 h-4 border border-gray-300 rounded"></div>
        </div>
        <div className="flex-[3] py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name</div>
        <div className="flex-1 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</div>
        <div className="flex-[1.5] py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Created</div>
        <div className="flex-[1.5] py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Modified</div>
        {showLocationColumn && <div className="flex-[1.2] py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Location</div>}
        <div className="w-48 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {sortedItems.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {sortedItems.map((item) => (
              <div 
                key={item.id} 
                className="px-8 flex items-center group hover:bg-[#7A005D]/5 transition-colors cursor-default"
              >
                <div className="w-12 py-4 flex justify-center shrink-0">
                  <div className="w-4 h-4 border border-gray-200 rounded group-hover:border-gray-400 transition-colors"></div>
                </div>
                
                <div className="flex-[3] py-4 flex items-center gap-3 min-w-0">
                  <div className="shrink-0 scale-90">
                    {getIcon(getItemIconType(item.type), "w-7 h-7", 'branded')}
                  </div>
                  <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                    <span className="text-[14px] font-medium text-gray-900 truncate tracking-tight">{item.name}</span>
                    <button 
                      onClick={(e) => toggleStar(item.id, e)}
                      className={`shrink-0 transition-all ${
                        item.starred 
                          ? 'text-yellow-400 opacity-100' 
                          : 'text-gray-200 opacity-0 group-hover:opacity-100 hover:text-yellow-400'
                      }`}
                      title={item.starred ? "Unstar" : "Star"}
                    >
                      <Star size={14} className={item.starred ? "fill-yellow-400" : ""} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 py-4 shrink-0">
                  {item.status ? (
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight ${
                      item.status === 'Signed' ? 'bg-green-50 text-green-700' :
                      item.status === 'Draft' ? 'bg-gray-100 text-gray-500' :
                      item.status === 'Running' ? 'bg-blue-50 text-blue-600' :
                      item.status === 'Yet to sign' ? 'bg-amber-50 text-amber-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>

                <div className="flex-[1.5] py-4 flex items-center gap-2 shrink-0">
                  <img src={getAvatarUrl(item.owner)} className="w-6 h-6 rounded-full border border-white shadow-sm" alt="" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium text-gray-900 leading-tight">{item.owner}</span>
                    <span className="text-[11px] text-gray-400 leading-tight">{item.createdAt}</span>
                  </div>
                </div>

                <div className="flex-[1.5] py-4 flex items-center gap-2 shrink-0">
                  <div className={`w-6 h-6 rounded-full border border-white shadow-sm flex items-center justify-center text-[10px] font-bold ${item.lastModifiedBy === 'Me' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {item.lastModifiedBy === 'Me' ? <img src={USER_AVATAR_URL} className="w-full h-full rounded-full" /> : item.lastModifiedBy.substring(0, 1)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium text-gray-900 leading-tight">{item.lastModifiedBy}</span>
                    <span className="text-[11px] text-gray-400 leading-tight">{item.lastModified}</span>
                  </div>
                </div>

                {showLocationColumn && (
                  <div className="flex-[1.2] py-4 flex items-center gap-2 text-[13px] text-gray-500 shrink-0">
                    {item.location === 'My Drive' ? <FolderIcon size={14} className="text-gray-300" /> : <Users size={14} className="text-gray-300" />}
                    <span className="truncate">{item.location}</span>
                  </div>
                )}

                <div className="w-48 py-4 flex justify-center gap-0.5 shrink-0">
                  <button 
                    onClick={(e) => toggleStar(item.id, e)}
                    className={`p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-[#7A005D]/10 ${item.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                    title={item.starred ? "Unstar" : "Star"}
                  >
                    <Star size={16} className={item.starred ? "fill-yellow-400" : ""} />
                  </button>
                  <button 
                    onClick={(e) => handleEditItem(item, e)}
                    className="p-1.5 text-gray-400 hover:text-[#7A005D] hover:bg-[#7A005D]/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={(e) => handleShareClick(item, e)}
                    className="p-1.5 text-gray-400 hover:text-[#7A005D] hover:bg-[#7A005D]/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Share"
                  >
                    <Share2 size={16} />
                  </button>
                  <button 
                    onClick={(e) => handleRemoveItem(item.id, e)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20 px-8">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Search size={32} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 text-center max-w-xs leading-relaxed">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {isShareModalOpen && (
        <ManageAccessModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          item={selectedItemForShare}
          setView={setView}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f5f9;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DriveContent;
