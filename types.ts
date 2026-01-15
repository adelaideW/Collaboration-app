
export type ViewType = 'HOME' | 'RECENT' | 'MY_DRIVE' | 'SHARED_WITH_ME' | 'SHARED_DRIVES' | 'STARRED' | 'TASKS' | 'ARCHIVED' | 'STORAGE' | 'SETTINGS' | 'CREATE_CUSTOM_APP' | 'APP_STUDIO' | 'DOCUMENT_EDITOR' | 'FUNCTION_EDITOR' | 'REPORT_EDITOR' | 'WORKFLOW_EDITOR';

export interface ProductApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface DriveItem {
  id: string;
  name: string;
  owner: string; // "Created by"
  createdAt: string;
  lastModified: string;
  lastModifiedBy: string;
  location: string;
  size: string;
  starred: boolean;
  type: 'app' | 'doc' | 'api' | 'report' | 'workflow';
  status?: 'Yet to sign' | 'Signed' | 'Draft' | 'Running';
}

export interface StorageStat {
  name: string;
  value: number;
  color: string;
}
