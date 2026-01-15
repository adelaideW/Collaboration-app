
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  HelpCircle, 
  Bell, 
  ChevronDown,
  Accessibility,
  SquareCheck,
  Sparkles,
  Home,
  UserPlus,
  UserMinus,
  Network,
  Star,
  Clock,
  Heart,
  Coins,
  CreditCard,
  Briefcase,
  Monitor,
  Users,
  Database,
  Box,
  Settings,
  Globe,
  LayoutGrid,
  ChevronRight,
  HardDrive,
  Stamp,
  MessageSquareMore,
  GitBranch,
  FileText,
  Inbox,
  ChefHat,
  BarChart,
  Zap,
  X,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { ViewType } from '../types';

const RipplingLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="black" transform="translate(25, 26)">
      <path d="M0 0 C10 0 10 24 0 24 C10 24 10 48 0 48 H10 C20 48 20 24 10 24 C20 24 20 0 10 0 Z" />
      <path d="M0 0 C10 0 10 24 0 24 C10 24 10 48 0 48 H10 C20 48 20 24 10 24 C20 24 20 0 10 0 Z" transform="translate(20, 0)" />
      <path d="M0 0 C10 0 10 24 0 24 C10 24 10 48 0 48 H10 C20 48 20 24 10 24 C20 24 20 0 10 0 Z" transform="translate(40, 0)" />
    </g>
  </svg>
);

export const USER_AVATAR_URL = "https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=150&h=150&q=80";

interface TopBarProps {
  onAIChatOpen?: () => void;
  setView?: (view: ViewType) => void;
  currentView?: ViewType;
}

const TopBar: React.FC<TopBarProps> = ({ onAIChatOpen, setView, currentView }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsToolsOpen(false);
        setShowSubMenu(false);
      }

      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current && !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
        if (searchQuery === 'Drive: In Home ') {
          setSearchQuery('');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleMenuClick = (view: ViewType) => {
    if (setView) {
      setView(view);
      setIsToolsOpen(false);
      setShowSubMenu(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (!searchQuery) {
      setSearchQuery('Drive: In Home ');
    }
  };

  const subMenuItems = [
    { icon: <HardDrive size={22} />, label: 'Drive', active: true, onClick: () => handleMenuClick('MY_DRIVE') },
    { icon: <LayoutGrid size={22} />, label: 'App Studio', onClick: () => handleMenuClick('APP_STUDIO') },
    { icon: <Stamp size={22} />, label: 'Approvals' },
    { icon: <MessageSquareMore size={22} />, label: 'Chat' },
    { icon: <GitBranch size={22} />, label: 'Developer' },
    { icon: <FileText size={22} />, label: 'Documents', onClick: () => handleMenuClick('DOCUMENT_EDITOR') },
    { icon: <Inbox size={22} />, label: 'Inbox' },
    { icon: <Bell size={22} />, label: 'Notification Center' },
    { icon: <ChefHat size={22} />, label: 'Recipes' },
    { icon: <BarChart size={22} />, label: 'Reports' },
    { icon: <Zap size={22} />, label: 'Workflow Studio' },
  ];

  const menuSections = [
    {
      items: [
        { icon: <Home size={19} />, label: 'Home', onClick: () => handleMenuClick('HOME') },
        { icon: <UserPlus size={19} />, label: 'Hire' },
        { icon: <UserMinus size={19} />, label: 'Offboard' },
        { icon: <Network size={19} />, label: 'Org Chart' },
      ]
    },
    {
      title: 'Products',
      items: [
        { icon: <Star size={19} />, label: 'Favorites', hasArrow: true },
        { icon: <Clock size={19} />, label: 'Time', hasArrow: true },
        { icon: <Heart size={19} />, label: 'Benefits', hasArrow: true },
        { icon: <Coins size={19} />, label: 'Payroll', hasArrow: true },
        { icon: <CreditCard size={19} />, label: 'Finance', hasArrow: true },
        { icon: <Star size={19} />, label: 'Talent', hasArrow: true },
        { icon: <Monitor size={19} />, label: 'IT', hasArrow: true },
        { icon: <Users size={19} />, label: 'HR', hasArrow: true },
        { icon: <Database size={19} />, label: 'Data', hasArrow: true },
        { icon: <Box size={19} />, label: 'Custom Apps', hasArrow: true },
      ]
    },
    {
      title: 'Platform',
      items: [
        { 
          icon: <Briefcase size={19} />, 
          label: 'Tools', 
          hasArrow: true, 
          active: true,
          onMouseEnter: () => setShowSubMenu(true)
        },
        { icon: <Settings size={19} />, label: 'Company settings', hasArrow: true },
        { icon: <Globe size={19} />, label: 'Global workforce' },
        { icon: <LayoutGrid size={19} />, label: 'App Shop' },
        { icon: <HelpCircle size={19} />, label: 'Help' },
      ]
    }
  ];

  const renderSearchValue = (val: string) => {
    const tokens = val.split(/(\s+)/);
    const result: React.ReactNode[] = [];
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const trimmed = token.trim();
      const lower = trimmed.toLowerCase();

      if (trimmed === "") {
        result.push(token);
        continue;
      }

      if (lower === 'in') {
        const validInKeywords = ["tasks", "my drive", "shared with me", "star", "recents", "home", "archived"];
        let foundMatch = "";
        let lookAheadStr = "";
        let j = i + 1;
        let consumedTo = i;

        while (j < tokens.length) {
          lookAheadStr += tokens[j];
          const testStr = lookAheadStr.trim().toLowerCase();
          if (validInKeywords.includes(testStr)) {
            foundMatch = lookAheadStr.trim();
            consumedTo = j;
          }
          if (testStr.length > "shared with me".length) break;
          j++;
        }

        if (foundMatch) {
          result.push(
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#7A005D]/10 text-[#7A005D] font-medium text-[13px] mx-0.5 border border-[#7A005D]/20 shadow-sm leading-none whitespace-nowrap">
              {token} {foundMatch}
            </span>
          );
          i = consumedTo;
          continue;
        }
      }

      if (lower === 'by') {
        let foundMatch = "";
        let consumedTo = i;
        
        let j = i + 1;
        let lookAheadStr = "";
        while (j < tokens.length) {
          lookAheadStr += tokens[j];
          const testStr = lookAheadStr.trim().toLowerCase();
          
          if (testStr === "yesterday") {
            foundMatch = "yesterday";
            consumedTo = j;
            break;
          }
          
          const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
          if (dateRegex.test(testStr)) {
            const match = testStr.match(dateRegex);
            if (match) {
              const [, m, d, y] = match;
              const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
              if (!isNaN(dateObj.getTime())) {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                foundMatch = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
                consumedTo = j;
                break;
              }
            }
          }
          j++;
          if (j > i + 10) break;
        }

        if (!foundMatch) {
          let nameParts = [];
          let k = i + 1;
          while (k < tokens.length && nameParts.length < 2) {
            if (tokens[k].trim() !== "") {
              nameParts.push(tokens[k]);
              consumedTo = k;
            }
            k++;
          }
          if (nameParts.length > 0) {
            foundMatch = nameParts.join(" ");
          }
        }

        if (foundMatch) {
          result.push(
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#7A005D]/10 text-[#7A005D] font-medium text-[13px] mx-0.5 border border-[#7A005D]/20 shadow-sm leading-none whitespace-nowrap">
              {token} {foundMatch}
            </span>
          );
          i = consumedTo;
          continue;
        }
      }

      if (trimmed.startsWith('#')) {
        const validHashKeywords = ["reports", "documents", "workflows", "apps", "functions", "webhooks", "api tokens"];
        let foundMatch = "";
        let consumedTo = i;
        let lookAheadStr = trimmed;
        
        let initialTest = trimmed.substring(1).toLowerCase();
        if (validHashKeywords.includes(initialTest)) {
          foundMatch = trimmed;
        } else {
          let j = i + 1;
          while (j < tokens.length) {
            lookAheadStr += tokens[j];
            const testStr = lookAheadStr.trim().substring(1).toLowerCase();
            if (validHashKeywords.includes(testStr)) {
              foundMatch = lookAheadStr.trim();
              consumedTo = j;
            }
            if (testStr.length > "api tokens".length) break;
            j++;
          }
        }

        if (foundMatch) {
          result.push(
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-[#7A005D]/10 text-[#7A005D] font-medium text-[13px] mx-0.5 border border-[#7A005D]/20 shadow-sm leading-none whitespace-nowrap">
              {foundMatch}
            </span>
          );
          i = consumedTo;
          continue;
        }
      }

      result.push(<span key={i} className="text-gray-900">{token}</span>);
    }
    
    return result;
  };

  const suggestions = [
    { text: `Drive: In Tasks Policy Update Signature Request`, type: 'repo' },
    { text: `Drive: In My drive #Reports`, type: 'user' },
    { text: `Drive: In Shared with me workflows`, type: 'global' },
    { text: `Drive: By James wilson`, type: 'user' },
  ];

  return (
    <header className="h-14 bg-white flex items-center px-4 shrink-0 w-full relative border-b border-gray-100 z-[100]">
      {/* Left Branding & Tools */}
      <div className="flex items-center w-[184px] shrink-0 h-full border-r border-gray-100">
        <div className="flex items-center">
          <div className="pl-1 cursor-pointer" onClick={() => handleMenuClick('HOME')}>
            <RipplingLogo />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-4"></div>
          <div className="relative">
            <button 
              ref={buttonRef}
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-[17px] font-bold text-[#0f172a] tracking-tight">Tools</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
            </button>

            {isToolsOpen && (
              <div 
                ref={menuRef}
                className="absolute left-0 top-11 flex items-start z-[110]"
                onMouseLeave={() => setShowSubMenu(false)}
              >
                <div className="flex">
                  <div className="w-[280px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 py-3 px-1.5 animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto max-h-[88vh]">
                    <div className="space-y-4">
                      {menuSections.map((section, sIdx) => (
                        <div key={sIdx}>
                          {section.title && (
                            <div className="px-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] font-sans">
                              {section.title}
                            </div>
                          )}
                          <div className="space-y-0.5">
                            {section.items.map((item: any, iIdx) => (
                              <button 
                                key={iIdx} 
                                onMouseEnter={item.onMouseEnter}
                                onClick={item.onClick}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group ${
                                  item.active ? 'bg-[#f3f4f6]' : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`${item.active ? 'text-[#0f172a]' : 'text-gray-500'}`}>{item.icon}</span>
                                  <span className={`text-[15px] font-medium tracking-tight ${item.active ? 'text-[#0f172a]' : 'text-gray-700'}`}>
                                    {item.label}
                                  </span>
                                </div>
                                {item.hasArrow && (
                                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-400" />
                                )}
                              </button>
                            ))}
                          </div>
                          {sIdx < menuSections.length - 1 && <div className="h-px bg-gray-100 mx-3 mt-4"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {showSubMenu && (
                    <div 
                      className="ml-1 w-[320px] bg-white rounded-xl shadow-[20px_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 py-3 px-2 animate-in fade-in slide-in-from-left-2 duration-200 overflow-y-auto max-h-[88vh]"
                      onMouseEnter={() => setShowSubMenu(true)}
                    >
                      <div className="space-y-0.5">
                        {subMenuItems.map((item, idx) => (
                          <button 
                            key={idx} 
                            onClick={item.onClick}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                              item.active ? 'bg-gray-200 text-black' : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <span className={`${item.active ? 'text-black' : 'text-gray-900'}`}>{item.icon}</span>
                              <span className={`text-[15px] font-medium tracking-tight ${item.active ? 'text-black' : ''}`}>
                                {item.label}
                              </span>
                            </div>
                            <Star 
                              size={18} 
                              className={`transition-colors ${item.active ? 'text-gray-400' : 'text-gray-200 group-hover:text-gray-300'}`} 
                              strokeWidth={1.5}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Search Bar Container - Width expanded on focus (640px to 960px) */}
      <div 
        className={`ml-4 transition-all duration-300 ease-in-out relative ${isSearchFocused ? 'w-[960px]' : 'w-[640px]'} max-w-[calc(100vw-450px)]`}
      >
        <div className="relative w-full group">
          <div className={`flex items-center w-full h-10 px-4 rounded-xl border bg-white transition-all ${isSearchFocused ? 'border-[#7A005D] shadow-[0_0_0_2px_rgba(122,0,93,0.1)]' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}>
            <Search size={18} className={isSearchFocused ? 'text-[#7A005D]' : 'text-slate-400'} strokeWidth={2} />
            
            <div className="flex-1 flex items-center gap-1.5 ml-3 relative h-full">
              {isSearchFocused && (
                <div className="absolute inset-0 flex items-center pointer-events-none text-[15px] truncate text-gray-900 font-medium">
                   {renderSearchValue(searchQuery)}
                </div>
              )}
              
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onFocus={handleSearchFocus}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or jump to..."
                className={`w-full bg-transparent text-[15px] font-normal placeholder:text-slate-400 outline-none h-full ${isSearchFocused ? 'text-transparent caret-[#7A005D]' : 'text-gray-800'}`}
              />
            </div>
            
            {isSearchFocused && searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && (
            <div 
              ref={dropdownRef}
              className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[200]"
            >
              {/* Contextual Search Options */}
              <div className="border-b border-gray-100">
                {/* Search In Page Row */}
                <div className="p-1 flex items-center justify-between group/row1 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3 px-3 py-1.5 min-w-0">
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <div className="flex items-center shrink-0">
                      {renderSearchValue("Drive: In Home ")}
                    </div>
                  </div>
                  <div className="pr-4">
                    <span className="text-[13px] text-gray-400 font-normal whitespace-nowrap">Search in this page</span>
                  </div>
                </div>

                {/* Search In App Row */}
                <div className="p-1 flex items-center justify-between group/row2 hover:bg-gray-50 cursor-pointer border-t border-gray-50">
                  <div className="flex items-center gap-3 px-3 py-1.5 min-w-0">
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <div className="flex items-center shrink-0">
                      {renderSearchValue("Drive: ")}
                    </div>
                  </div>
                  <div className="pr-4">
                    <span className="text-[13px] text-gray-400 font-normal whitespace-nowrap">Search in this app</span>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">RECENTS</div>
                {suggestions.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileCode size={18} className="text-gray-400" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] text-gray-800 font-medium truncate">
                           {renderSearchValue(item.text)}
                        </span>
                        <span className="text-[11px] text-gray-400 truncate mt-0.5">adelaideW/Collaboration-app</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[11px] text-gray-500">Jump to</span>
                      <ArrowRight size={14} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                <button className="text-[11px] text-[#7A005D] hover:underline font-bold">Search tips</button>
                <button className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors font-bold">Give feedback</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Tools Section */}
      <div className="flex items-center ml-auto shrink-0">
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-full transition-colors">
            <Accessibility size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <SquareCheck size={20} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">6</span>
          </button>
          <button 
            onClick={onAIChatOpen}
            className="p-2 text-slate-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Sparkles size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="h-6 w-px bg-gray-200 mx-4"></div>
        <button className="flex items-center gap-3 pl-4 pr-1.5 py-1.5 border border-gray-200 rounded-full hover:border-gray-300 transition-all bg-white shadow-sm">
          <span className="text-[14px] font-medium text-slate-700 tracking-tight truncate max-w-[140px]">Wright, Davis and Price</span>
          <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gray-100 shrink-0 border border-gray-50">
            <img 
              src={USER_AVATAR_URL} 
              className="w-full h-full object-cover"
              alt="User Avatar"
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
