
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { X, HelpCircle, Users, ChevronRight, Trash2, Repeat, ChevronDown, Check, ChevronUp } from 'lucide-react';
import { DriveItem } from '../types';

type Role = 'Owner' | 'Editor' | 'Viewer' | 'Collaborator' | 'Runner';

interface AccessRow {
  id: string;
  name: string;
  type: 'individual' | 'group' | 'location';
  previewText: string;
  role: Role;
}

interface ManageAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: DriveItem | null;
}

interface DropdownState {
  id: string;
  role: Role;
  rect: DOMRect;
}

const ManageAccessModal: React.FC<ManageAccessModalProps> = ({ isOpen, onClose, item }) => {
  const [searchValue, setSearchValue] = useState('');
  const [accessList, setAccessList] = useState<AccessRow[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<DropdownState | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && item) {
      const initialList: AccessRow[] = [
        { id: 'owner', name: 'Me (You)', type: 'individual', previewText: 'Preview 1 person', role: 'Owner' },
        { id: 'admin', name: 'All super admin', type: 'group', previewText: 'Preview 4 people', role: 'Editor' },
        { id: 'loc', name: 'Work location → India office', type: 'location', previewText: 'Preview 5 people', role: 'Viewer' },
      ];

      if (item.type === 'report') {
        initialList.push({ id: 'collab-row', name: 'Reporting Analysts', type: 'group', previewText: 'Preview 12 people', role: 'Collaborator' });
      } else if (item.type === 'api') {
        initialList.push({ id: 'runner-row', name: 'Service Accounts', type: 'group', previewText: 'Preview 3 people', role: 'Runner' });
      } else if (item.type === 'workflow') {
        initialList.push({ id: 'collab-row', name: 'Workflow Designers', type: 'group', previewText: 'Preview 8 people', role: 'Collaborator' });
      }

      setAccessList(initialList);
    }
  }, [isOpen, item]);

  // Handle outside click and scroll to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      if (activeDropdown) setActiveDropdown(null);
    };

    const handleResize = () => {
      if (activeDropdown) setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeDropdown]);

  if (!isOpen || !item) return null;

  const handleRemoveRow = (id: string) => {
    setAccessList(prev => prev.filter(row => row.id !== id));
  };

  const handleRoleChange = (id: string, newRole: Role) => {
    setAccessList(prev => prev.map(row => row.id === id ? { ...row, role: newRole } : row));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id: string, role: Role, e: React.MouseEvent<HTMLButtonElement>) => {
    if (activeDropdown?.id === id) {
      setActiveDropdown(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setActiveDropdown({ id, role, rect });
    }
  };

  const getAvailableRoles = (currentRole: Role): Role[] => {
    // For Developer Tools (API), provide Editor, Viewer, and Runner in specific order.
    if (item.type === 'api' || currentRole === 'Runner') {
      return ['Editor', 'Viewer', 'Runner'];
    }
    // For Workflows and Reports, provide Editor, Viewer, and Collaborator.
    if (item.type === 'workflow' || item.type === 'report' || currentRole === 'Collaborator') {
      return ['Editor', 'Viewer', 'Collaborator'];
    }
    // Default base roles.
    return ['Editor', 'Viewer'];
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-[744px] h-[535px] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-8 py-5 shrink-0">
          <h2 className="text-[24px] font-bold text-black tracking-tight">Manage access</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-8 pb-4 custom-scrollbar"
        >
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-gray-900 mb-2.5 flex items-center gap-1.5">
              Add people who need access <span className="text-red-500">*</span>
              <HelpCircle size={14} className="text-black cursor-help" fill="currentColor" fillOpacity={0.1} />
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search or browse options to create groups of employees"
                className="flex-1 px-4 py-2.5 bg-[#fcfcfc] border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 transition-all text-[14px] placeholder:text-gray-400"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button 
                disabled={!searchValue.trim()}
                className={`px-5 py-2.5 rounded-lg font-bold text-[14px] transition-all ${
                  searchValue.trim() ? 'bg-gray-100 text-gray-900' : 'bg-[#f3f4f6] text-gray-300'
                }`}
              >
                Add
              </button>
            </div>
            <p className="mt-2 text-[13px] text-gray-500">
              Specify the access level for each person. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
            </p>
          </div>

          {/* Table Container */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-gray-200">
                  <th className="px-4 py-3 text-[12px] font-bold text-gray-500 uppercase tracking-wider">People with access</th>
                  <th className="px-4 py-3 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      Preview <HelpCircle size={12} className="text-gray-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-[12px] font-bold text-gray-500 uppercase tracking-wider" colSpan={2}>
                    <div className="flex items-center gap-1.5">
                       Access <HelpCircle size={12} className="text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accessList.map((row) => (
                  <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-100 rounded-md shadow-sm w-fit">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-[13px] font-medium text-gray-900">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-0.5 text-[13px] font-bold text-black hover:opacity-70 transition-opacity whitespace-nowrap">
                        {row.previewText}
                        <ChevronRight size={14} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {row.role === 'Owner' ? (
                        <div className="flex items-center justify-between min-w-[120px] text-[13px] text-gray-900 font-medium px-3 py-2">
                          <span>{row.role}</span>
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => toggleDropdown(row.id, row.role, e)}
                          className={`flex items-center justify-between min-w-[120px] text-[15px] text-gray-900 font-medium px-3 py-2 rounded-md transition-all ${
                            activeDropdown?.id === row.id 
                              ? 'border-[1.5px] border-blue-400 ring-2 ring-blue-50 bg-white' 
                              : 'border border-transparent hover:bg-gray-100'
                          }`}
                        >
                          <span>{row.role}</span>
                          {activeDropdown?.id === row.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 w-12 text-center border-l border-gray-100">
                      {row.role === 'Owner' ? (
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all" title="Transfer ownership">
                          <Repeat size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleRemoveRow(row.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-white px-4 py-3 border-t border-gray-100 flex justify-end">
               <button className="flex items-center gap-0.5 text-[13px] font-bold text-black hover:opacity-70 transition-opacity">
                 Preview 90 people
                 <ChevronRight size={14} />
               </button>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-8 py-5 bg-[#fcfcfc] border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 rounded-xl text-[15px] font-bold text-gray-800 hover:bg-gray-50 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#3d2b2f] text-white rounded-xl text-[15px] font-bold hover:bg-[#2d1e21] transition-all active:scale-95"
          >
            Done
          </button>
        </div>
      </div>

      {/* Top Level Dropdown */}
      {activeDropdown && (
        <div 
          ref={dropdownRef}
          style={{ 
            position: 'fixed',
            top: `${activeDropdown.rect.bottom + 4}px`,
            left: `${activeDropdown.rect.left}px`,
            width: `${Math.max(activeDropdown.rect.width, 200)}px`,
            zIndex: 9999
          }}
          className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top"
        >
          {getAvailableRoles(activeDropdown.role).map((roleOption) => (
            <button
              key={roleOption}
              onClick={() => handleRoleChange(activeDropdown.id, roleOption)}
              className={`w-full flex items-center justify-between px-4 py-3 text-[15px] transition-colors ${
                activeDropdown.role === roleOption 
                  ? 'bg-gray-100 font-medium' 
                  : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <span>{roleOption}</span>
              {activeDropdown.role === roleOption && <Check size={18} className="text-blue-700" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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

export default ManageAccessModal;
