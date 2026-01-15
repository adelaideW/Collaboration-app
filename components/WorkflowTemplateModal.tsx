
import React, { useState } from 'react';
import { X, Search, Clock, Monitor, User, DollarSign, Star, Calendar, Bell } from 'lucide-react';

interface WorkflowTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WORKFLOW_TEMPLATES = [
  {
    id: '1',
    title: "Alert employee and manager when the employee hasn't taken time off in the past 6 months",
    desc: "Prevent burnout by encouraging employees to take time off. Send an alert to the employee and the manager when the employee hasn't taken time off in the past 6 months",
    icon: <Clock size={16} />,
    iconBg: 'bg-[#3d2b2f]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '2',
    title: "Alert IT team when device has not checked in with MDM",
    desc: "Ensure timely investigation of inactive devices by alerting the IT team",
    icon: <Monitor size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-white'
  },
  {
    id: '3',
    title: "Alert managers when their new hire signs their offer letter",
    desc: "Share the exciting news with hiring managers when a new hire signs their offer letter",
    icon: <User size={16} />,
    iconBg: 'bg-[#ffb800]',
    iconColor: 'text-white'
  },
  {
    id: '4',
    title: "Alert managers when their reports request long term leave",
    desc: "Ensure timely review of long term leave requests by alerting managers when their reports request leave",
    icon: <Clock size={16} />,
    iconBg: 'bg-[#3d2b2f]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '5',
    title: "Alert managers when time off request conflicts with a certain time window",
    desc: "Avoid understaffing during your busy seasons. Alert managers immediately after time off is requested",
    icon: <Clock size={16} />,
    iconBg: 'bg-[#3d2b2f]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '6',
    title: "Alert payroll admins when a pay run is manually approved",
    desc: "Ensure coordination of different payroll admins by communicating manually approved pay runs",
    icon: <DollarSign size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '7',
    title: "Alert payroll admins when a pay run's auto-approval fails",
    desc: "Avoid payroll delays from a failed auto-approval",
    icon: <DollarSign size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '8',
    title: "Alert payroll admins when an employee forfeits their sign-on bonus by leaving",
    desc: "Ensure departing employees return their signing bonuses if they leave before the end of the bonus period",
    icon: <DollarSign size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '9',
    title: "Alert payroll admins when an employee is terminated involuntarily",
    desc: "Avoid late payment penalties by alerting payroll admins of involuntary terminations",
    icon: <DollarSign size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '10',
    title: "Alert payroll admins when an employee's compensation changes",
    desc: "Keep your payroll team informed of any employee compensation changes",
    icon: <DollarSign size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '11',
    title: "Alert payroll admins when an off-cycle pay run occurs",
    desc: "Ensure coordination of different payroll admins by communicating off-cycle pay runs",
    icon: <DollarSign size={16} />,
    iconBg: 'bg-[#27272a]',
    iconColor: 'text-[#ffb800]'
  },
  {
    id: '12',
    title: "Alert payroll and benefits admins when an employee changes countries",
    desc: "Ensure compliance when employees change countries by communicating the change to the right admins",
    icon: <User size={16} />,
    iconBg: 'bg-[#ffb800]',
    iconColor: 'text-white'
  }
];

const WorkflowTemplateModal: React.FC<WorkflowTemplateModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = WORKFLOW_TEMPLATES.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-[#f2f4f6] rounded-[32px] shadow-2xl w-full max-w-[1200px] h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between shrink-0 bg-[#f2f4f6]">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-[#7A005D]/10 transition-all text-sm shadow-sm"
            />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <div 
                key={template.id} 
                className="bg-white rounded-[16px] p-6 shadow-sm border border-transparent hover:border-gray-200 transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shrink-0 ${template.iconBg} ${template.iconColor}`}>
                  {template.icon}
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-3 leading-tight">
                  {template.title}
                </h3>
                <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
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
          background: #d1d5db;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default WorkflowTemplateModal;
