
import React from 'react';
import { 
  MoreVertical,
  Clock,
  Trash2,
  Share2,
  Star,
  FolderIcon,
  Users,
  Archive,
  Database,
  Settings,
  FileText,
  Network,
  ClipboardList,
  Home
} from 'lucide-react';
import { ProductApp, DriveItem, StorageStat } from './types';

interface IconProps {
  className?: string;
  mode?: 'branded' | 'naked';
}

// Custom Rippling-style SVG Icons with updated #7A005D color
export const CustomAppIcon = ({ className = "w-8 h-8", mode = 'branded' }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {mode === 'branded' && <rect width="100" height="100" rx="20" fill="#7A005D"/>}
    <rect x="25" y="25" width="50" height="50" rx="8" stroke={mode === 'branded' ? "white" : "#7A005D"} strokeWidth="4" strokeDasharray="8 8"/>
    <path d="M40 60L65 35L70 40L45 65L40 60Z" fill="#ffb800"/>
    <path d="M38 62L43 67L35 70L38 62Z" fill={mode === 'branded' ? "white" : "#7A005D"}/>
  </svg>
);

export const DocumentsIcon = ({ className = "w-8 h-8", mode = 'branded' }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {mode === 'branded' && <rect width="100" height="100" rx="20" fill="#7A005D"/>}
    <path d="M30 25H60L75 40V75H30V25Z" fill={mode === 'branded' ? "white" : "#f3f4f6"} stroke={mode === 'branded' ? "none" : "#7A005D"} strokeWidth={mode === 'branded' ? 0 : 2}/>
    <path d="M60 25V40H75L60 25Z" fill="#ffb800"/>
    <rect x="38" y="48" width="24" height="3" rx="1.5" fill={mode === 'branded' ? "#7A005D" : "#7A005D"} fillOpacity={mode === 'branded' ? 0.2 : 0.4}/>
    <rect x="38" y="56" width="24" height="3" rx="1.5" fill={mode === 'branded' ? "#7A005D" : "#7A005D"} fillOpacity={mode === 'branded' ? 0.2 : 0.4}/>
    <rect x="38" y="64" width="16" height="3" rx="1.5" fill={mode === 'branded' ? "#7A005D" : "#7A005D"} fillOpacity={mode === 'branded' ? 0.2 : 0.4}/>
  </svg>
);

export const DeveloperToolsIcon = ({ className = "w-8 h-8", mode = 'branded' }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {mode === 'branded' && <rect width="100" height="100" rx="20" fill="#7A005D"/>}
    <path d="M35 35L25 50L35 65" stroke={mode === 'branded' ? "white" : "#7A005D"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M65 35L75 50L65 65" stroke={mode === 'branded' ? "white" : "#7A005D"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M55 30L45 70" stroke="#ffb800" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

export const ReportsIcon = ({ className = "w-8 h-8", mode = 'branded' }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {mode === 'branded' && <rect width="100" height="100" rx="20" fill="#7A005D"/>}
    <circle cx="50" cy="50" r="25" stroke={mode === 'branded' ? "white" : "#7A005D"} strokeWidth="5"/>
    <path d="M50 50L50 25C63.8071 25 75 36.1929 75 50L50 50Z" fill="#ffb800"/>
  </svg>
);

export const WorkflowAutomatorIcon = ({ className = "w-8 h-8", mode = 'branded' }: IconProps) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {mode === 'branded' && <rect width="100" height="100" rx="20" fill="#7A005D"/>}
    <path d="M55 20L30 55H45L40 80L65 45H50L55 20Z" fill="#ffb800"/>
  </svg>
);

export const PRODUCT_APPS: ProductApp[] = [
  {
    id: 'custom-app',
    name: 'Custom app',
    description: 'Build your own internal application like Retool',
    icon: 'custom-app',
    color: 'bg-indigo-500'
  },
  {
    id: 'documents',
    name: 'Documents',
    description: 'Send documents to all employees and track status',
    icon: 'documents',
    color: 'bg-blue-500'
  },
  {
    id: 'developer-tools',
    name: 'Developer tools',
    description: 'Create and manage a set of APIs',
    icon: 'developer-tools',
    color: 'bg-amber-500'
  },
  {
    id: 'report',
    name: 'Reports',
    description: 'Build reports based on employee data',
    icon: 'report',
    color: 'bg-emerald-500'
  },
  {
    id: 'workflow',
    name: 'Workflow automator',
    description: 'Automate tasks triggered by prompts',
    icon: 'workflow',
    color: 'bg-purple-500'
  }
];

export const MOCK_ITEMS: DriveItem[] = [
  { id: '1', name: 'Q4 Performance Review Template', owner: 'Me', createdAt: 'Sep 12, 2023', lastModified: 'Oct 12, 2023', lastModifiedBy: 'Me', location: 'My Drive', size: '1.2 MB', starred: true, type: 'doc', status: 'Signed' },
  { id: '2', name: 'New Hire Onboarding Workflow', owner: 'James Wilson', createdAt: 'Oct 25, 2023', lastModified: 'Nov 02, 2023', lastModifiedBy: 'Me', location: 'Shared with me', size: '--', starred: false, type: 'workflow', status: 'Running' },
  { id: '3', name: 'Employee Paycheck API', owner: 'Sarah Chen', createdAt: 'Nov 15, 2023', lastModified: 'Dec 01, 2023', lastModifiedBy: 'Sarah Chen', location: 'Shared with me', size: '--', starred: true, type: 'api' },
  { id: '4', name: 'Custom Inventory Tracker', owner: 'Me', createdAt: 'Dec 10, 2023', lastModified: 'Jan 15, 2024', lastModifiedBy: 'Me', location: 'My Drive', size: '4.5 MB', starred: false, type: 'app' },
  { id: '5', name: 'Headcount Report Jan 2026', owner: 'Michael Brown', createdAt: 'Dec 20, 2025', lastModified: 'Jan 02, 2026', lastModifiedBy: 'Sarah Chen', location: 'Shared with me', size: '800 KB', starred: false, type: 'report' },
  { id: '6', name: 'Policy Update Signature Request', owner: 'Elena Rodriguez', createdAt: 'Jan 05, 2024', lastModified: 'Feb 10, 2024', lastModifiedBy: 'Sarah Chen', location: 'Shared with me', size: '2.1 MB', starred: false, type: 'doc', status: 'Yet to sign' },
  { id: '7', name: 'Sales Pipeline report', owner: 'Me', createdAt: 'Feb 15, 2024', lastModified: 'Feb 20, 2024', lastModifiedBy: 'Me', location: 'My Drive', size: '3.1 MB', starred: true, type: 'app' },
  { id: '8', name: 'Company Handbook 2024', owner: 'HR Team', createdAt: 'Jan 01, 2024', lastModified: 'Mar 12, 2024', lastModifiedBy: 'James Wilson', location: 'Shared with me', size: '5.4 MB', starred: false, type: 'doc' },
  { id: '9', name: 'Global Benefits Enrollment 2026', owner: 'Me', createdAt: 'Jan 10, 2026', lastModified: 'Feb 24, 2026', lastModifiedBy: 'Elena Rodriguez', location: 'My Drive', size: '2.4 MB', starred: false, type: 'doc', status: 'Draft' },
  { id: '10', name: 'Expense Reimbursement App', owner: 'Finance Team', createdAt: 'Dec 05, 2025', lastModified: 'Feb 23, 2026', lastModifiedBy: 'Me', location: 'Shared with me', size: '10.2 MB', starred: true, type: 'app', status: 'Running' },
  { id: '11', name: 'API Gateway Logs', owner: 'DevOps', createdAt: 'Feb 01, 2026', lastModified: 'Feb 24, 2026', lastModifiedBy: 'DevOps', location: 'Shared with me', size: '--', starred: false, type: 'api' },
  { id: '12', name: 'Annual Budget Report', owner: 'Me', createdAt: 'Jan 05, 2026', lastModified: 'Feb 20, 2026', lastModifiedBy: 'Me', location: 'My Drive', size: '1.5 MB', starred: true, type: 'report' },
  { id: '13', name: 'IT Support Ticket Flow', owner: 'James Wilson', createdAt: 'Feb 12, 2026', lastModified: 'Feb 24, 2026', lastModifiedBy: 'James Wilson', location: 'Shared with me', size: '--', starred: false, type: 'workflow' },
  { id: '14', name: 'Employee Engagement Survey', owner: 'Elena Rodriguez', createdAt: 'Feb 18, 2026', lastModified: 'Feb 24, 2026', lastModifiedBy: 'Me', location: 'Shared with me', size: '300 KB', starred: true, type: 'doc', status: 'Yet to sign' },
  { id: '15', name: 'Asset Allocation Tool', owner: 'Me', createdAt: 'Nov 20, 2025', lastModified: 'Feb 22, 2026', lastModifiedBy: 'Me', location: 'My Drive', size: '6.8 MB', starred: false, type: 'app' },
  { id: '16', name: 'Internal Auth API', owner: 'Sarah Chen', createdAt: 'Oct 30, 2025', lastModified: 'Feb 15, 2026', lastModifiedBy: 'Sarah Chen', location: 'Shared with me', size: '--', starred: false, type: 'api' },
  { id: '17', name: 'Diversity & Inclusion Report', owner: 'HR Team', createdAt: 'Jan 15, 2026', lastModified: 'Feb 19, 2026', lastModifiedBy: 'Michael Brown', location: 'Shared with me', size: '1.1 MB', starred: false, type: 'report' },
  { id: '18', name: 'Vacation Request Workflow', owner: 'Me', createdAt: 'Feb 05, 2026', lastModified: 'Feb 24, 2026', lastModifiedBy: 'Elena Rodriguez', location: 'My Drive', size: '--', starred: true, type: 'workflow', status: 'Running' },
];

export const STORAGE_STATS: StorageStat[] = [
  { name: 'Documents', value: 45, color: '#3b82f6' },
  { name: 'Custom Apps', value: 25, color: '#6366f1' },
  { name: 'Reports', value: 15, color: '#10b981' },
  { name: 'Other', value: 15, color: '#94a3b8' },
];

export const getIcon = (name: string, className?: string, mode: 'branded' | 'naked' = 'branded') => {
  switch (name) {
    case 'custom-app': return <CustomAppIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'documents': return <DocumentsIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'developer-tools': return <DeveloperToolsIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'report': return <ReportsIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'workflow': return <WorkflowAutomatorIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'app': return <CustomAppIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'doc': return <DocumentsIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'api': return <DeveloperToolsIcon className={className || "w-8 h-8"} mode={mode} />;
    case 'workflow-item': return <WorkflowAutomatorIcon className={className || "w-8 h-8"} mode={mode} />;
    
    // Lucide Fallbacks for Sidebar
    case 'Home': return <Home className={className} size={20} />;
    case 'Clock': return <Clock className={className} size={20} />;
    case 'Star': return <Star className={className} size={20} />;
    case 'FolderIcon': return <FolderIcon className={className} size={20} />;
    case 'Users': return <Users className={className} size={20} />;
    case 'Network': return <Network className={className} size={20} />;
    case 'Archive': return <Archive className={className} size={20} />;
    case 'Database': return <Database className={className} size={20} />;
    case 'Settings': return <Settings className={className} size={20} />;
    case 'ClipboardList': return <ClipboardList className={className} size={20} />;
    default: return <FileText className={className} size={20} />;
  }
};
