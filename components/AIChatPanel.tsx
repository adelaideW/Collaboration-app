
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
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
  ArrowUp,
  ArrowDownToLine,
} from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import {
  DocumentAISessionBootstrap,
  buildDocumentEditorSystemInstruction,
} from "./documentAISession";
import { resolveGeminiApiKey, GEMINI_CHAT_MODELS } from "./geminiConfig";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  /** When set while open, scopes the assistant to the document editor */
  documentSession?: DocumentAISessionBootstrap | null;
  /** True when the user is on the document editor route — shows document UI even before session hydrates */
  isDocumentEditorRoute?: boolean;
  /** Inserts AI output into the open document canvas (plain text mode) */
  onInsertIntoDocument?: (text: string) => void;
}

const MISSING_KEY_MESSAGE =
  'Configure a Gemini API key to use Rippling AI. For local dev, create `.env.local` with `GEMINI_API_KEY=` or `VITE_GEMINI_API_KEY=` ' +
  'from Google AI Studio. On Vercel, add `GEMINI_API_KEY` or `VITE_GEMINI_API_KEY` to Project → Environment Variables and redeploy so the bundle includes the key.';

function extractInsertableBlob(content: string): string {
  const fence = content.match(/```(?:plaintext|text)?\s*([\s\S]*?)```/i);
  if (fence?.[1]?.trim()) return fence[1].trim();
  return content.trim();
}

function formatSendError(error: unknown): string {
  if (error instanceof Error) {
    return `Could not reach the AI: ${error.message}`;
  }
  return `Could not reach the AI: ${String(error)}`;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({
  isOpen,
  onClose,
  initialQuery,
  documentSession = null,
  isDocumentEditorRoute = false,
  onInsertIntoDocument,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const documentSessionFingerprint = useMemo(
    () => (documentSession ? JSON.stringify(documentSession) : ''),
    [documentSession]
  );

  const genericDrivePrompt =
    'You are a helpful AI assistant for Collaboration Drive. Keep responses concise and professional.';

  const resolveSystemInstruction = useCallback(() => {
    if (documentSessionFingerprint) {
      return buildDocumentEditorSystemInstruction(
        JSON.parse(documentSessionFingerprint) as DocumentAISessionBootstrap
      );
    }
    return genericDrivePrompt;
  }, [documentSessionFingerprint]);

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

  const sendMessageToAI = useCallback(
    async (
      text: string,
      isInitial: boolean = false,
      systemInstructionOverride?: string
    ) => {
      if (!text.trim()) return;

      const apiKey = resolveGeminiApiKey();
      if (!apiKey) {
        if (!isInitial) {
          setMessages((prev) => [...prev, { role: 'user', content: text }]);
          setInputValue('');
        }
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: MISSING_KEY_MESSAGE },
        ]);
        return;
      }

      if (!isInitial) {
        setMessages((prev) => [...prev, { role: 'user', content: text }]);
        setInputValue('');
      }

      setIsLoading(true);

      const systemInstruction =
        systemInstructionOverride ?? resolveSystemInstruction();

      try {
        const ai = new GoogleGenAI({ apiKey });

        if (!chatRef.current) {
          let created: Chat | null = null;
          let attemptErr: unknown;
          for (const modelId of GEMINI_CHAT_MODELS) {
            try {
              created = ai.chats.create({
                model: modelId,
                config: {
                  systemInstruction,
                },
              });
              break;
            } catch (e) {
              attemptErr = e;
              created = null;
            }
          }
          if (!created) throw attemptErr ?? new Error('No Gemini model succeeded');
          chatRef.current = created;
        }

        const streamResponse = await chatRef.current!.sendMessageStream({
          message: text,
        });

        let assistantMessage = '';
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        for await (const chunk of streamResponse) {
          const c = chunk as GenerateContentResponse;
          assistantMessage += c.text ?? '';

          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1].content = assistantMessage;
            return next;
          });
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: formatSendError(error),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveSystemInstruction]
  );

  useEffect(() => {
    if (!isOpen) return;

    chatRef.current = null;

    if (!documentSessionFingerprint && initialQuery) {
      const initChatWithQuery = async () => {
        setMessages([
          {
            role: 'user',
            content: `Tell me about products related to: "${initialQuery}"`,
          },
        ]);
        await sendMessageToAI(
          `Tell me about products related to: "${initialQuery}"`,
          true,
          genericDrivePrompt
        );
      };
      initChatWithQuery();
    } else {
      setMessages([]);
    }
  }, [
    isOpen,
    initialQuery,
    documentSessionFingerprint,
    sendMessageToAI,
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessageToAI(inputValue);
    }
  };

  const isDocumentAssist = Boolean(documentSessionFingerprint) || isDocumentEditorRoute;
  const canInsert =
    !!onInsertIntoDocument &&
    (!!documentSessionFingerprint || isDocumentEditorRoute);

  const handleInsertAssistantText = useCallback((raw: string) => {
    const t = extractInsertableBlob(raw);
    if (!t) return;
    onInsertIntoDocument?.(t);
  }, [onInsertIntoDocument]);

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
          <h3 className="font-bold text-gray-900 text-[15px] truncate">
            {isDocumentAssist ? 'Document assistant' : 'New chat'}
          </h3>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button type="button" className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <UserRoundPlus size={20} strokeWidth={1.5} />
          </button>
          <button type="button" className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <MessageSquarePlus size={20} strokeWidth={1.5} />
          </button>
          <button type="button" className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <Maximize2 size={20} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700 transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-white flex flex-col min-h-0 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={`${idx}-${msg.role}-${msg.content.slice(0, 12)}`} className={`flex gap-3 mb-6 animate-in fade-in duration-300 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#7A005D] text-white' : 'bg-white border border-gray-100 text-[#7A005D]'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap break-words ${msg.role === 'user' ? 'bg-[#7A005D] text-white rounded-tr-none' : 'bg-[#f9fafb] text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                {msg.content || (isLoading && <Loader2 size={16} className="animate-spin text-gray-300" />)}
              </div>
              {msg.role === 'assistant' &&
                canInsert &&
                extractInsertableBlob(msg.content).length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleInsertAssistantText(msg.content)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-bold text-[#7A005D] bg-[#fdf2f8] border border-[#E9D5FF] hover:bg-[#fce7f3] transition-colors"
                  >
                    <ArrowDownToLine size={14} strokeWidth={2} />
                    Insert into document
                  </button>
                )}
            </div>
          </div>
        ))}
        {messages.length === 0 && !isLoading && (
          <div className="mt-auto mb-6">
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight">
              {isDocumentAssist ? 'Document AI' : 'Hi Harry,'}
            </h1>
            <h1 className="text-[20px] font-bold text-gray-300 leading-tight">
              {isDocumentAssist
                ? 'Draft templates, revise or translate this document.'
                : 'What do you need help with?'}
            </h1>
            {isDocumentAssist && (
              <p className="text-[13px] text-gray-400 mt-3 leading-relaxed max-w-[300px]">
                Proofread, translate, rewrite a paragraph, or generate offer letters, NDAs, and termination
                letters. Use Insert into document when the reply is ready for the canvas.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-6 bg-white shrink-0">
        <div className="relative border border-[#7A005D]/20 rounded-[24px] p-4 bg-white shadow-sm flex flex-col min-h-[140px] focus-within:border-[#7A005D]/40 transition-colors">
          <textarea
            rows={1}
            placeholder={
              isDocumentAssist
                ? 'e.g. Proofread spelling, translate to Mandarin, draft an NDA, insert termination letter template…'
                : 'Ask anything'
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            className="w-full bg-transparent text-[15px] text-gray-800 placeholder:text-slate-400 outline-none resize-none flex-1"
          />
          <div className="flex items-center justify-between mt-2">
            <button type="button" className="flex items-center gap-2 px-3 py-1.5 border border-gray-100 rounded-xl text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm bg-white">
              <Upload size={16} className="text-gray-500" />
              <span>Upload</span>
            </button>
            <button 
              type="button"
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
