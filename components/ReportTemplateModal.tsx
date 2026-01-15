
import React, { useState } from 'react';
import { X, Search, DollarSign, Users, Clock, History, Briefcase, CreditCard, UserCheck, ShieldAlert } from 'lucide-react';

interface ReportTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REPORT_TEMPLATES = [
  { id: '1', name: 'Employee roster', desc: 'Often referred to as an employee census, this is a quick and simple list of all the employees at your company with key employment and...', icon: <Users size={16} /> },
  { id: '2', name: 'Payroll report', desc: "Track your employees' payroll data", icon: <DollarSign size={16} /> },
  { id: '3', name: 'Change history report', desc: 'Track all employee data changes that are made in Rippling', icon: <History size={16} /> },
  { id: '4', name: 'Time off requests report', desc: 'Track leave requests by employee and leave type', icon: <Clock size={16} /> },
  { id: '5', name: 'Upcoming Time Off by Employee', desc: 'Track total number of hours to be taken off by employees between last month and next month', icon: <Users size={16} /> },
  { id: '6', name: 'Time off balances report', desc: 'Track the current leave balances by employee and leave type', icon: <DollarSign size={16} /> },
  { id: '7', name: 'Time off accruals report', desc: 'Track accrued leave hours by employee and leave type', icon: <DollarSign size={16} /> },
  { id: '8', name: 'Hours worked per department', desc: 'Track hourly employee timecards with their associated earnings for a pay period or a specified date range', icon: <Clock size={16} /> },
  { id: '9', name: 'Hours worked by employee', desc: 'Track hourly employee timecards with their associated earnings for a pay period or a specified date range', icon: <Clock size={16} /> },
  { id: '10', name: 'Time & jobs report', desc: "Track US employees' hours worked by job dimension", icon: <DollarSign size={16} /> },
  { id: '11', name: 'Insurance enrollment report', desc: "Track all your employees' insurance and benefit enrollment details", icon: <Briefcase size={16} /> },
  { id: '12', name: 'Spend Management Report', desc: "Track details of your company's expense and corporate card transactions", icon: <CreditCard size={16} /> },
  { id: '13', name: 'Compensation change history report', desc: 'Track all employee data changes that are made in Rippling', icon: <Users size={16} /> },
  { id: '14', name: 'Employee time-in-role', desc: 'Get quick insight into employee tenure, time in role, and when each employee got their last...', icon: <Users size={16} /> },
  { id: '15', name: 'Employee contact info report', desc: "Track your employees' contact information and their emergency contacts", icon: <Users size={16} /> },
];

const ReportTemplateModal: React.FC<ReportTemplateModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = REPORT_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-[#f8f9fa] rounded-[32px] shadow-2xl w-full max-w-[1200px] h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm shadow-sm"
            />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar">
          
          {/* Featured Section */}
          <div className="mb-10 mt-2">
            <div className="bg-[#FFDFAF] rounded-[24px] p-8">
              <h2 className="text-[17px] font-bold text-gray-900 mb-6">Templates you may like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-orange-200 transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white mb-4" style={{ backgroundColor: '#7A005D' }}>
                    <DollarSign size={16} />
                  </div>
                  <h3 className="text-[14px] font-bold text-gray-900 mb-2">Time off balances report</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    Track the current leave balances by employee and leave type
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <div key={template.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: '#7A005D' }}>
                  {template.icon}
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3">
                  {template.desc}
                </p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-bold">No templates found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
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

export default ReportTemplateModal;
