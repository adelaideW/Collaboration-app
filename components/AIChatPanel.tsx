
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  User, 
  Bot, 
  Loader2, 
  Columns, 
  UserRoundPlus, 
  MessageSquarePlus, 
  Maximize2, 
  Upload, 
  ArrowUp
} from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 300 && newWidth < 800) {
        setPanelWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        const initChatWithQuery = async () => {
          setMessages([{ role: 'user', content: `Tell me about products related to: "${initialQuery}"` }]);
          await sendMessageToAI(`Tell me about products related to: "${initialQuery}"`, true);
        };
        initChatWithQuery();
      } else {
        setMessages([]);
        chatRef.current = null;
      }
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToAI = async (text: string, isInitial: boolean = false) => {
    if (!text.trim()) return;

    if (!isInitial) {
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      setInputValue('');
    }
    
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: 'You are a helpful AI assistant for Collaboration Drive. Keep responses concise and professional.',
          },
        });
      }

      const streamResponse = await chatRef.current.sendMessageStream({ message: text });
      
      let assistantMessage = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        assistantMessage += c.text || '';
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantMessage;
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessageToAI(inputValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{ width: `${panelWidth}px` }}
      className={`relative h-full bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] border-l border-gray-200 z-50 flex flex-col shrink-0 ${isResizing ? 'transition-none select-none' : ''}`}
    >
      <div 
        onMouseDown={startResizing}
        className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-[#7A005D]/20 active:bg-[#7A005D]/40 z-[60] transition-colors"
      />

      {/* Header */}
      <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Columns size={16} className="text-gray-900 shrink-0" strokeWidth={2} />
          <h3 className="font-bold text-gray-900 text-[15px] truncate">New chat</h3>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <UserRoundPlus size={20} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <MessageSquarePlus size={20} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <Maximize2 size={20} strokeWidth={1.5} />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-white flex flex-col min-h-0 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 mb-6 animate-in fade-in duration-300 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#7A005D] text-white' : 'bg-white border border-gray-100 text-[#7A005D]'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#7A005D] text-white rounded-tr-none' : 'bg-[#f9fafb] text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                {msg.content || (isLoading && <Loader2 size={16} className="animate-spin text-gray-300" />)}
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && !isLoading && (
          <div className="mt-auto mb-6">
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight">Hi Harry,</h1>
            <h1 className="text-[20px] font-bold text-gray-300 leading-tight">What do you need help with?</h1>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-6 bg-white shrink-0">
        <div className="relative border border-[#7A005D]/20 rounded-[24px] p-4 bg-white shadow-sm flex flex-col min-h-[140px] focus-within:border-[#7A005D]/40 transition-colors">
          <textarea
            rows={1}
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            className="w-full bg-transparent text-[15px] text-gray-800 placeholder:text-slate-400 outline-none resize-none flex-1"
          />
          <div className="flex items-center justify-between mt-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-xl text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm bg-white">
              <Upload size={16} className="text-gray-500" />
              <span>Upload</span>
            </button>
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${inputValue.trim() && !isLoading ? 'bg-[#7A005D]/10 text-[#7A005D] hover:bg-[#7A005D]/20' : 'bg-[#f8fafc] text-[#cbd5e1]'}`}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <ArrowUp size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">Rippling AI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
};

export default AIChatPanel;
