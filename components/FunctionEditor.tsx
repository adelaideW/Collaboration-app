
import React, { useState, useRef, useEffect } from 'react';
import { Download, Users, MoreVertical, Settings, BookOpen, ExternalLink, Maximize2, Pencil, LogOut } from 'lucide-react';
import { ViewType } from '../types';

interface FunctionEditorProps {
  setView: (view: ViewType) => void;
}

const FunctionEditor: React.FC<FunctionEditorProps> = ({ setView }) => {
  // Default title set to "Untitled" as requested
  const [title, setTitle] = useState('Untitled');
  // Default description empty to show "Add description" link
  const [description, setDescription] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingDescription && descInputRef.current) {
      descInputRef.current.focus();
      descInputRef.current.select();
    }
  }, [isEditingDescription]);

  // Truncate logic: 150 characters
  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description;

  const code = `import RipplingSDK, {
    FunctionContext,
    FunctionEvent,
    FunctionResponse,
} from "@rippling/rippling-sdk";
import _ from "lodash";

export async function onRipplingEvent(
    event: FunctionEvent,
    context: FunctionContext
) {
    // Initialize an instance of the Rippling SDK
    const ripplingSDK = new RipplingSDK({ bearerToken: "<YOUR_BEARER_TOKEN>" });
    //
    // As an alternative to hard-coding the API token, you can store it in the 
    // Settings Manager and retrieve it using something like 
    // 'String(context.settings["<YOUR_TOKEN_SYSTEM_NAME>"])'.
    
    // Process inputs (stored in event)
    
    // Return function response
    return new FunctionResponse({
        body: {},
        statusCode: 200,
        headers: {},
        message: "",
    });
}`;

  const lines = code.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
      {/* Main Header */}
      <div className="px-8 pt-10 pb-6 flex items-start justify-between">
        <div className="space-y-1 flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-2 group">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={title}
                maxLength={40}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                className="text-[28px] font-bold text-gray-900 tracking-tight bg-white border-b-2 border-[#7A005D] outline-none px-1 w-full max-w-lg"
              />
            ) : (
              <h1 
                onClick={() => setIsEditingTitle(true)}
                className="text-[28px] font-bold text-gray-900 tracking-tight cursor-text hover:bg-gray-100/50 px-1 rounded transition-colors truncate"
              >
                {title}
              </h1>
            )}
            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 shrink-0">
              <BookOpen size={16} />
            </button>
            <ExternalLink size={16} className="text-gray-400 cursor-pointer shrink-0" />
          </div>
          
          <div className="flex items-start">
            {isEditingDescription ? (
              <textarea
                ref={descInputRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setIsEditingDescription(false)}
                className="text-[14px] text-gray-700 bg-white border border-gray-200 rounded p-1 w-full max-w-2xl outline-none focus:ring-1 focus:ring-[#7A005D]"
                rows={2}
              />
            ) : (
              <div className="flex flex-col items-start">
                {description ? (
                  <p 
                    onClick={() => setIsEditingDescription(true)}
                    className="text-[14px] text-gray-500 cursor-text hover:bg-gray-100/50 px-1 rounded transition-colors break-words max-w-2xl"
                  >
                    {truncatedDescription}
                  </p>
                ) : (
                  <button 
                    onClick={() => setIsEditingDescription(true)}
                    className="text-[14px] text-[#7A005D] hover:underline px-1 rounded transition-colors font-medium"
                  >
                    Add description
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7A005D] text-white rounded-lg text-[14px] font-bold hover:bg-[#6b0051] transition-all shadow-sm">
            <Download size={16} className="rotate-180" />
            <span>Code</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Users size={16} />
            <span>Manage access</span>
          </button>
          <button className="p-2 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
            <MoreVertical size={20} />
          </button>
          <button 
            onClick={() => setView('HOME')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[14px] font-bold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm bg-white"
          >
            <LogOut size={16} />
            <span>Done</span>
          </button>
        </div>
      </div>

      {/* Info Stats Bar */}
      <div className="px-8 flex items-center gap-12 text-[13px] border-b border-gray-100 pb-4 mb-2 overflow-x-auto no-scrollbar">
        <div className="space-y-1 shrink-0">
          <span className="block text-gray-400 font-medium">Deployed version</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <span className="text-gray-700 font-medium">Not deployed</span>
          </div>
        </div>
        <div className="space-y-1 shrink-0">
          <span className="block text-gray-400 font-medium">API name</span>
          <span className="text-gray-900 font-bold">{title.toLowerCase().replace(/\s+/g, '-').substring(0, 40) || 'untitled'}</span>
        </div>
        <div className="space-y-1 shrink-0">
          <span className="block text-gray-400 font-medium">Last run at</span>
          <span className="text-gray-700 font-medium">Never run</span>
        </div>
        <div className="space-y-1 shrink-0">
          <span className="block text-gray-400 font-medium">Last modified at</span>
          <span className="text-gray-700 font-medium">01/14/2026 12:33 PM PST</span>
        </div>
        <div className="space-y-1 shrink-0">
          <span className="block text-gray-400 font-medium">Created at</span>
          <span className="text-gray-700 font-medium">01/14/2026 12:33 PM PST</span>
        </div>
        <div className="space-y-1 shrink-0">
          <span className="block text-gray-400 font-medium">Created by</span>
          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/150?u=harry" className="w-6 h-6 rounded-full" />
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold leading-tight">Harry Porter</span>
              <span className="text-[11px] text-gray-500 leading-tight">Demo Admin, Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-gray-200 flex items-center gap-8 bg-white overflow-x-auto no-scrollbar">
        {['Code', 'Deployments', 'Executions', 'Settings'].map(tab => (
          <button 
            key={tab} 
            className={`py-4 text-[14px] font-bold relative whitespace-nowrap ${tab === 'Code' ? 'text-[#7A005D]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            {tab}
            {tab === 'Code' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#7A005D]"></div>}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 pb-0.5 whitespace-nowrap">
           <span className="text-[12px] text-gray-500">Function executions this month: 0 / 25000</span>
        </div>
      </div>

      {/* Editor Path & Toolbar */}
      <div className="px-8 py-4 flex items-center justify-between bg-white shrink-0">
        <span className="text-[15px] font-bold text-gray-900">/{title.toLowerCase().replace(/\s+/g, '-').substring(0, 40) || 'untitled'}</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-800 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-all shadow-sm">
            Deploy
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 text-gray-800 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Settings size={14} />
            <span>Dependencies</span>
          </button>
          <button disabled className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 text-gray-300 rounded-lg text-[13px] font-bold cursor-not-allowed">
            <BookOpen size={14} />
            <span>Test console</span>
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 px-8 pb-8 overflow-hidden flex flex-col">
        <div className="flex-1 bg-[#f4f2f0] border border-gray-200 rounded-xl overflow-hidden relative font-mono text-[14px] flex group/editor shadow-inner">
           {/* Line Numbers */}
           <div className="w-12 bg-[#eeebe9] border-r border-gray-200 py-6 text-right pr-3 select-none text-gray-400">
             {lines.map((_, i) => (
               <div key={i} className="leading-[1.6]">{i + 1}</div>
             ))}
           </div>
           
           {/* Code Area */}
           <div className="flex-1 py-6 px-4 overflow-auto custom-scrollbar leading-[1.6]">
             <pre className="whitespace-pre text-gray-800">
               {lines.map((line, i) => {
                 const highlighted = line
                   .replace(/(import|from|export|async|function|const|new|return)/g, '<span class="text-[#7A005D]">$1</span>')
                   .replace(/(@google\/genai|@rippling\/rippling-sdk|lodash)/g, '<span class="text-orange-600">"$1"</span>')
                   .replace(/(\/\/.+)/g, '<span class="text-green-600">$1</span>')
                   .replace(/(FunctionContext|FunctionEvent|FunctionResponse|RipplingSDK)/g, '<span class="text-purple-600">$1</span>')
                   .replace(/({|}|\[|\]|\(|\))/g, '<span class="text-gray-400">$1</span>');
                 
                 return (
                   <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
                 );
               })}
             </pre>
           </div>

           {/* Editor Overlays */}
           <div className="absolute top-4 right-4 flex gap-2">
             <button className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-gray-900">
               <Maximize2 size={16} />
             </button>
             <button className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-gray-900">
               <Pencil size={16} />
             </button>
           </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FunctionEditor;
