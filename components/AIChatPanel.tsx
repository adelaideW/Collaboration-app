
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
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
  const [panelWidth, setPanelWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  // Width resizing logic
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
      // Clamp width between 320px and 800px
      if (newWidth >= 320 && newWidth < 800) {
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

  // Initialize chat when panel opens
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
            systemInstruction: 'You are a helpful AI assistant for Collaboration Drive. You help users find tools and documentation. Keep responses professional, helpful, and concise.',
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
      console.error("AI Error:", error);
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
      className={`relative h-full bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] border-l border-gray-200 z-50 flex flex-col transition-all duration-300 ease-in-out ${isResizing ? 'transition-none select-none' : ''}`}
    >
      {/* Resizing Handle on the left edge */}
      <div 
        onMouseDown={startResizing}
        className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-blue-400/20 active:bg-blue-400/40 z-[60] transition-colors"
      />

      {/* Header */}
      <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2">
          <Columns size={16} className="text-gray-900" strokeWidth={2} />
          <h3 className="font-bold text-gray-900 text-[15px]">New chat</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <UserRoundPlus size={20} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
            <MessageSquarePlus size={20} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <Maximize2 size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 bg-white flex flex-col min-h-0"
      >
        <div className="flex-1">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                msg.role === 'user' ? 'bg-[#7A005D] text-white' : 'bg-white border border-gray-100 text-[#7A005D]'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#7A005D] text-white rounded-tr-none' 
                    : 'bg-[#f9fafb] text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.content || (isLoading && idx === messages.length - 1 ? <Loader2 size={16} className="animate-spin text-gray-300" /> : null)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Greeting - Now 18px and Bold */}
        {messages.length === 0 && !isLoading && (
          <div className="mt-auto mb-6 animate-in fade-in duration-500">
            <h1 className="text-[18px] font-bold text-gray-900 leading-[1.3] mb-0.5">Hi Harry,</h1>
            <h1 className="text-[18px] font-bold text-gray-400 leading-[1.3]">What do you need help with?</h1>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-6 bg-white shrink-0">
        <div className="relative border border-blue-200 rounded-[32px] p-5 bg-white shadow-[0_2px_12px_rgba(59,130,246,0.04)] transition-all focus-within:ring-2 focus-within:ring-blue-100/50 min-h-[140px] flex flex-col">
          <textarea
            rows={1}
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full bg-transparent text-[16px] text-gray-800 placeholder:text-[#94a3b8] outline-none resize-none flex-1 leading-normal"
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-100 rounded-2xl text-[12px] font-bold text-gray-900 hover:bg-gray-50 transition-colors shadow-sm bg-white shrink-0">
                <Upload size={18} strokeWidth={2} className="text-gray-500" />
                <span>Upload</span>
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${
                inputValue.trim() && !isLoading 
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm active:scale-95' 
                  : 'bg-[#f8fafc] text-[#cbd5e1] cursor-not-allowed'
              }`}
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : <ArrowUp size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-3 tracking-tight">
          Rippling AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default AIChatPanel;
