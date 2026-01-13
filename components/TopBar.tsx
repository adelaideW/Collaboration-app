
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
  Handshake,
  HardDrive,
  Stamp,
  MessageSquareMore,
  GitBranch,
  FileText,
  Library,
  ChefHat,
  BarChart,
  Zap,
  Inbox
} from 'lucide-react';

const RipplingLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="black" transform="translate(25, 26)">
      {/* Three wavy parallel marks - Perfectly centered and brand-accurate */}
      <path d="M0 0 C10 0 10 24 0 24 C10 24 10 48 0 48 H10 C20 48 20 24 10 24 C20 24 20 0 10 0 Z" />
      <path d="M0 0 C10 0 10 24 0 24 C10 24 10 48 0 48 H10 C20 48 20 24 10 24 C20 24 20 0 10 0 Z" transform="translate(20, 0)" />
      <path d="M0 0 C10 0 10 24 0 24 C10 24 10 48 0 48 H10 C20 48 20 24 10 24 C20 24 20 0 10 0 Z" transform="translate(40, 0)" />
    </g>
  </svg>
);

export const USER_AVATAR_URL = "https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=150&h=150&q=80";

interface TopBarProps {
  onAIChatOpen?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onAIChatOpen }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsToolsOpen(false);
        setShowSubMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Items for the flyout menu based on screenshot
  const subMenuItems = [
    { icon: <HardDrive size={22} />, label: 'Drive', active: true },
    { icon: <LayoutGrid size={22} />, label: 'App Studio' },
    { icon: <Stamp size={22} />, label: 'Approvals' },
    { icon: <MessageSquareMore size={22} />, label: 'Chat' },
    { icon: <GitBranch size={22} />, label: 'Developer' },
    { icon: <FileText size={22} />, label: 'Documents' },
    { icon: <Inbox size={22} />, label: 'Inbox' },
    { icon: <Bell size={22} />, label: 'Notification Center' },
    { icon: <ChefHat size={22} />, label: 'Recipes' },
    { icon: <BarChart size={22} />, label: 'Reports' },
    { icon: <Zap size={22} />, label: 'Workflow Studio' },
  ];

  const menuSections = [
    {
      items: [
        { icon: <Home size={19} />, label: 'Home' },
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

  return (
    <header className="h-14 bg-white flex items-center px-4 shrink-0 z-50 w-full relative border-b border-gray-100">
      <div className="flex items-center w-[184px] shrink-0 h-full border-r border-gray-100">
        <div className="flex items-center">
          <div className="pl-1">
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
                className="absolute left-0 top-11 flex items-start z-[100]"
                onMouseLeave={() => setShowSubMenu(false)}
              >
                <div className="flex">
                  {/* Main Menu Container */}
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

                  {/* Sub Menu Flyout - Matching style exactly with lighter active color */}
                  {showSubMenu && (
                    <div 
                      className="ml-1 w-[320px] bg-white rounded-xl shadow-[20px_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 py-3 px-2 animate-in fade-in slide-in-from-left-2 duration-200 overflow-y-auto max-h-[88vh]"
                      onMouseEnter={() => setShowSubMenu(true)}
                    >
                      <div className="space-y-0.5">
                        {subMenuItems.map((item, idx) => (
                          <button 
                            key={idx} 
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

      <div className="flex-1 max-w-lg px-4 ml-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search or jump to..." 
            className="w-full h-10 pl-11 pr-4 bg-[#f3f4f6] border-none rounded-xl text-[15px] font-normal text-gray-800 placeholder:text-slate-500 transition-all outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex items-center ml-auto">
        <div className="flex items-center gap-2 px-2">
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors">
            <Accessibility size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <SquareCheck size={20} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
          </button>
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">6</span>
          </button>
          <button 
            onClick={onAIChatOpen}
            className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Sparkles size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="h-6 w-px bg-gray-200 mx-4"></div>
        <button className="flex items-center gap-3 pl-4 pr-1.5 py-1.5 border border-gray-200 rounded-full hover:border-gray-300 transition-all bg-white ml-2 shadow-sm">
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
