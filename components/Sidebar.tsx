
import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  FileSignature, 
  Star, 
  FolderIcon, 
  Users, 
  Archive, 
  Database, 
  Settings,
  Search,
  ChevronDown,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Globe,
  Layout,
  Sparkles,
  Network,
  Clock
} from 'lucide-react';
import { ViewType } from '../types';
import { PRODUCT_APPS, getIcon } from '../constants';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onAskAI: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isCollapsed, setIsCollapsed, onAskAI }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const addMenuRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node) && 
          addButtonRef.current && !addButtonRef.current.contains(event.target as Node)) {
        setIsAddOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredApps = PRODUCT_APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (appId: string) => {
    if (appId === 'custom-app') {
      // Open the creation workspace in a new tab
      const url = `${window.location.origin}${window.location.pathname}?view=CREATE_CUSTOM_APP`;
      window.open(url, '_blank');
    } else {
      // For other apps, we might navigate in the current tab or also open new ones
      // Following the user request to move UI to different tabs for links
      const url = `${window.location.origin}${window.location.pathname}?view=CREATE_CUSTOM_APP&app=${appId}`;
      window.open(url, '_blank');
    }
    setIsAddOpen(false);
  };

  const navItems = [
    { id: 'RECENT', label: 'Recent', icon: 'Clock' },
    { id: 'MY_DRIVE', label: 'My drive', icon: 'FolderIcon' },
    { id: 'SHARED_WITH_ME', label: 'Shared with me', icon: 'Users' },
    { id: 'STARRED', label: 'Starred', icon: 'Star' },
    { id: 'SIGN', label: 'Sign', icon: 'FileSignature' },
    { id: 'ARCHIVED', label: 'Archived', icon: 'Archive' },
  ];

  const secondaryItems = [
    { id: 'STORAGE', label: 'Storage', icon: 'Database' },
    { id: 'SETTINGS', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-[200px]'} border-r border-gray-200 bg-white flex flex-col h-full transition-all duration-300 ease-in-out relative z-30 shadow-sm pt-4`}>
      {/* Add Button Section */}
      <div className={`px-4 mb-4 relative ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button 
          ref={addButtonRef}
          onClick={() => setIsAddOpen(!isAddOpen)}
          className={`flex items-center gap-3 bg-[#7A005D] text-white rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap ${isCollapsed ? 'p-3' : 'px-6 py-3'}`}
        >
          <Plus size={20} strokeWidth={3} />
          {!isCollapsed && <span className="font-semibold">Add</span>}
        </button>

        {/* Modal Style Dropdown - Now absolutely positioned below the button */}
        {isAddOpen && (
          <div 
            ref={addMenuRef}
            className={`absolute ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'left-4'} top-full mt-2 w-80 bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-gray-100 z-[9999] p-0 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300`}
          >
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border-none rounded-md focus:ring-1 focus:ring-gray-200 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {filteredApps.length > 0 ? (
                <div className="flex flex-col py-1">
                  {filteredApps.map(app => (
                    <button 
                      key={app.id}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors group w-full text-left"
                      onClick={() => handleAppClick(app.id)}
                    >
                      <div className="shrink-0 group-hover:scale-110 transition-transform">
                        {getIcon(app.icon, "w-8 h-8", 'naked')}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{app.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{app.description}</div>
                      </div>
                    </button>
                  ))}
                  <div className="p-2 border-t border-gray-50">
                    <button 
                      onClick={() => {
                        onAskAI(searchQuery);
                        setIsAddOpen(false);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm font-semibold text-[#7A005D] hover:bg-[#7A005D]/5 rounded-lg transition-colors group"
                    >
                      <Sparkles size={16} className="text-[#7A005D] fill-[#7A005D]/10 group-hover:rotate-12 transition-transform" />
                      <span>Ask AI assistant</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in fade-in zoom-in duration-300">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">No results found</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your search
                  </p>
                  <button 
                    onClick={() => {
                      onAskAI(searchQuery);
                      setIsAddOpen(false);
                    }}
                    className="mt-6 px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm active:scale-95 group text-sm font-semibold"
                  >
                    <Sparkles size={16} className="text-[#8b1a4f] fill-[#8b1a4f]/10" />
                    <span>Ask AI</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(item => (
          <React.Fragment key={item.id}>
            {item.id === 'STARRED' && (
              <div className="my-2 border-t border-gray-100 mx-3"></div>
            )}
            <button
              onClick={() => setView(item.id as ViewType)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? 'bg-gray-100 text-[#7A005D]' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              {getIcon(item.icon, currentView === item.id ? "text-[#7A005D]" : "text-gray-400")}
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          </React.Fragment>
        ))}

        <div className="my-4 border-t border-gray-100 mx-3"></div>

        {secondaryItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id 
                ? 'bg-gray-100 text-[#7A005D]' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title={isCollapsed ? item.label : undefined}
          >
            {getIcon(item.icon, currentView === item.id ? "text-[#7A005D]" : "text-gray-400")}
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer Nav */}
      <div className="mt-auto p-2 border-t border-gray-100 space-y-1">
        <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'} py-2 text-xs text-gray-500 hover:bg-gray-50 rounded-md transition-colors`}>
          <div className="flex items-center gap-3">
            <HelpCircle size={18} />
            {!isCollapsed && <span>Help docs</span>}
          </div>
          {!isCollapsed && <ExternalLink size={12} />}
        </button>
        
        {!isCollapsed && (
          <button className="w-full flex items-center justify-between px-2 py-2 text-xs text-gray-500 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex items-center gap-3">
              <Layout size={18} />
              <span>Custom apps</span>
            </div>
            <ChevronDown size={12} />
          </button>
        )}

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-2'} py-3 mt-4 text-xs font-semibold text-gray-500 hover:text-[#7A005D] transition-all pt-2 border-t border-gray-50`}
        >
           <ChevronRight size={18} className={`transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
           {!isCollapsed && <span>Collapse panel</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
