
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import {
  X,
  Loader2,
  Columns,
  UserRoundPlus,
  MessageSquarePlus,
  Maximize2,
  Upload,
  ArrowUp,
  ArrowDownToLine,
} from 'lucide-react';
import {
  DocumentAISessionBootstrap,
  buildDocumentEditorSystemInstruction,
} from "./documentAISession";
import { resolveOpenAIApiKey, OPENAI_CHAT_MODEL } from "./aiConfig";
import {
  matchDriveFakeReply,
  driveChatNoMatchWithoutKeyReply,
} from "./fakeDriveAI";

interface UserMessage {
  role: 'user';
  content: string;
}

interface AssistantMessage {
  role: 'assistant';
  content: string;
  rich?: React.ReactNode;
}

type ChatMessage = UserMessage | AssistantMessage;

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
  /** Notifies parent when panel width changes (e.g. auto-collapse sidebar). */
  onPanelWidthChange?: (width: number) => void;
}

const MISSING_KEY_MESSAGE =
  'Configure an OpenAI API key to use Rippling AI. For local dev, add `OPENAI_API_KEY=` or `VITE_OPENAI_API_KEY=` in `.env.local` ' +
  'from OpenAI dashboard. On Vercel, add `OPENAI_API_KEY` or `VITE_OPENAI_API_KEY` to Environment Variables and redeploy so the bundle includes the key.';

const DRIVE_PROMPT_SUGGESTIONS = [
  'Who created the last document, report, app, or workflow?',
  'Who created the most artifacts in the last week?',
  'Who created the most artifacts in the last 2 weeks?',
  'Who created the most artifacts in the last year?',
  'Give me the artifact names created in the last month',
  'List artifacts created in the last year',
  'What did I create in the last week?',
  'What did myself create in the last 2 weeks?',
  'What did Elena Rodriguez create in the last month?',
  'What did Me create? (will prompt to add period)',
] as const;

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

function buildOpenAiMessagesFromTranscript(base: ChatMessage[]): ChatCompletionMessageParam[] {
  return base
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .filter((m) => m.role === 'user' || m.content.length > 0)
    .map((m): ChatCompletionMessageParam => ({
      role: m.role,
      content: m.content,
    }));
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({
  isOpen,
  onClose,
  initialQuery,
  documentSession = null,
  isDocumentEditorRoute = false,
  onInsertIntoDocument,
  onPanelWidthChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  /** Keeps synchronous transcript for chaining user turns between renders */
  const messagesRef = useRef<ChatMessage[]>([]);

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

  /** General drive chat: fake analytics tables work without an API key. */
  const isDriveDemoChat =
    !documentSessionFingerprint && !isDocumentEditorRoute;

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

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
    onPanelWidthChange?.(panelWidth);
  }, [panelWidth, onPanelWidthChange]);

  /** Streams one assistant reply for the given transcript (must end with a user message). */
  const streamAssistantForTranscript = useCallback(
    async (transcriptWithLatestUserTurn: ChatMessage[], systemPrompt: string) => {
      const apiKey = resolveOpenAIApiKey();
      if (!apiKey) {
        setMessages((prev) => [...prev, { role: 'assistant', content: MISSING_KEY_MESSAGE }]);
        return;
      }

      const openAiMessages: ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...buildOpenAiMessagesFromTranscript(transcriptWithLatestUserTurn),
      ];

      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      setMessages([
        ...transcriptWithLatestUserTurn,
        { role: 'assistant', content: '' },
      ]);

      setIsLoading(true);
      try {
        const stream = await openai.chat.completions.create({
          model: OPENAI_CHAT_MODEL,
          messages: openAiMessages,
          stream: true,
        });

        let assistantMessage = '';

        for await (const evt of stream) {
          assistantMessage +=
            evt.choices?.[0]?.delta?.content ?? '';

          setMessages((prev) => {
            if (prev.length === 0) return prev;
            const next = [...prev];
            next[next.length - 1] = {
              role: 'assistant',
              content: assistantMessage,
            };
            return next;
          });
        }
      } catch (error) {
        setMessages((prev) => {
          if (prev.length === 0) return [{ role: 'assistant', content: formatSendError(error) }];
          const next = [...prev];
          const last = next[next.length - 1];
          if (last.role === 'assistant')
            next[next.length - 1] = { role: 'assistant', content: formatSendError(error) };
          else next.push({ role: 'assistant', content: formatSendError(error) });
          return next;
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const sendMessageToAI = useCallback(
    async (text: string, systemInstructionOverride?: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const systemInstruction =
        systemInstructionOverride ?? resolveSystemInstruction();

      if (isDriveDemoChat) {
        const fakeReply = matchDriveFakeReply(trimmed);
        const nextTranscript: ChatMessage[] = [
          ...messagesRef.current,
          { role: 'user', content: trimmed },
        ];
        messagesRef.current = nextTranscript;
        setMessages(nextTranscript);
        setInputValue('');

        if (fakeReply) {
          const done: ChatMessage[] = [
            ...nextTranscript,
            {
              role: 'assistant',
              content: fakeReply.preamble,
              rich: fakeReply.body,
            },
          ];
          messagesRef.current = done;
          setMessages(done);
          return;
        }

        const apiKey = resolveOpenAIApiKey();
        if (apiKey) {
          await streamAssistantForTranscript(nextTranscript, systemInstruction);
          return;
        }

        const noKey = driveChatNoMatchWithoutKeyReply();
        const fallback: ChatMessage[] = [
          ...nextTranscript,
          {
            role: 'assistant',
            content: noKey.preamble,
            rich: noKey.body,
          },
        ];
        messagesRef.current = fallback;
        setMessages(fallback);
        return;
      }

      if (!resolveOpenAIApiKey()) {
        setMessages((prev) => [
          ...prev,
          { role: 'user', content: trimmed },
          { role: 'assistant', content: MISSING_KEY_MESSAGE },
        ]);
        setInputValue('');
        return;
      }

      const nextTranscript: ChatMessage[] = [
        ...messagesRef.current,
        { role: 'user', content: trimmed },
      ];
      messagesRef.current = nextTranscript;
      setMessages(nextTranscript);
      setInputValue('');
      await streamAssistantForTranscript(nextTranscript, systemInstruction);
    },
    [
      resolveSystemInstruction,
      streamAssistantForTranscript,
      isDriveDemoChat,
    ]
  );

  /** Initialize sidebar query or reset thread when opening the panel */
  useEffect(() => {
    if (!isOpen) return;

    messagesRef.current = [];

    const q = initialQuery?.trim();
    if (!documentSessionFingerprint && q) {
      const fakeReply = matchDriveFakeReply(q);
      if (fakeReply) {
        const seed: ChatMessage[] = [
          { role: 'user', content: q },
          {
            role: 'assistant',
            content: fakeReply.preamble,
            rich: fakeReply.body,
          },
        ];
        messagesRef.current = seed;
        setMessages(seed);
      } else if (resolveOpenAIApiKey()) {
        const seed: ChatMessage[] = [{ role: 'user', content: q }];
        messagesRef.current = seed;
        setMessages(seed);
        void streamAssistantForTranscript(seed, genericDrivePrompt);
      } else {
        const hint = driveChatNoMatchWithoutKeyReply();
        const seed: ChatMessage[] = [
          { role: 'user', content: q },
          {
            role: 'assistant',
            content: hint.preamble,
            rich: hint.body,
          },
        ];
        messagesRef.current = seed;
        setMessages(seed);
      }
    } else {
      setMessages([]);
    }
  }, [isOpen, initialQuery, documentSessionFingerprint, streamAssistantForTranscript]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      void sendMessageToAI(inputValue.trim());
    }
  };

  const isDocumentAssist = Boolean(documentSessionFingerprint) || isDocumentEditorRoute;
  const canInsert =
    !!onInsertIntoDocument &&
    (!!documentSessionFingerprint || isDocumentEditorRoute);
  const showPromptSuggestions =
    !isDocumentAssist &&
    isInputFocused &&
    !(selectedPrompt && inputValue === selectedPrompt);
  const filteredPromptSuggestions = DRIVE_PROMPT_SUGGESTIONS.filter((prompt) =>
    prompt.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  useEffect(() => {
    if (!showPromptSuggestions || filteredPromptSuggestions.length === 0) {
      setHighlightedSuggestionIndex(-1);
      return;
    }
    setHighlightedSuggestionIndex(0);
  }, [showPromptSuggestions, inputValue]);

  const applySuggestion = useCallback((prompt: string) => {
    setInputValue(prompt);
    setSelectedPrompt(prompt);
    setIsInputFocused(false);
    setHighlightedSuggestionIndex(-1);
  }, []);

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
          <div key={`${idx}-${msg.role}`} className={`flex mb-6 animate-in fade-in duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col gap-2 max-w-[85%] min-w-0 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm break-words w-full ${msg.role === 'user' ? 'bg-[#7A005D] text-white rounded-tr-none' : 'bg-[#f9fafb] text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                {msg.role === 'user' ? (
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                ) : (
                  <>
                    {msg.content !== '' ? (
                      <p className="whitespace-pre-wrap mb-0">{msg.content}</p>
                    ) : (
                      isLoading && <Loader2 size={16} className="animate-spin text-gray-300" />
                    )}
                    {msg.role === 'assistant' && msg.rich && (
                      <div className={`${msg.content ? 'mt-4' : ''} text-gray-900`}>{msg.rich}</div>
                    )}
                  </>
                )}
              </div>
              {msg.role === 'assistant' &&
                canInsert &&
                msg.content &&
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
        <div className="relative border border-[#7A005D]/20 rounded-[24px] p-4 bg-white shadow-sm flex flex-col min-h-[160px] focus-within:border-[#7A005D]/40 transition-colors">
          <textarea
            rows={1}
            placeholder={
              isDocumentAssist
                ? 'e.g. Proofread spelling, translate to Mandarin, draft an NDA, insert termination letter template…'
                : 'Ask anything'
            }
            value={inputValue}
            onChange={(e) => {
              const next = e.target.value;
              setInputValue(next);
              if (selectedPrompt && next !== selectedPrompt) {
                setSelectedPrompt(null);
              }
            }}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyDown={(e) => {
              if (showPromptSuggestions && filteredPromptSuggestions.length > 0) {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setHighlightedSuggestionIndex((prev) =>
                    prev < filteredPromptSuggestions.length - 1 ? prev + 1 : 0
                  );
                  return;
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setHighlightedSuggestionIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredPromptSuggestions.length - 1
                  );
                  return;
                }
                if (e.key === 'Enter' && !e.shiftKey && highlightedSuggestionIndex >= 0) {
                  e.preventDefault();
                  applySuggestion(filteredPromptSuggestions[highlightedSuggestionIndex]);
                  return;
                }
              }
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full bg-transparent text-[15px] text-gray-800 placeholder:text-slate-400 outline-none resize-none flex-1"
          />
          {showPromptSuggestions && (
            <div className="absolute left-4 right-4 bottom-full mb-2 z-20 rounded-xl border border-gray-200 bg-white shadow-md">
              <div className="max-h-[160px] overflow-y-auto custom-scrollbar py-1">
                {filteredPromptSuggestions.length > 0 ? (
                  filteredPromptSuggestions.map((prompt, idx) => (
                    <button
                      key={prompt}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applySuggestion(prompt)}
                      className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                        highlightedSuggestionIndex === idx
                          ? 'bg-gray-50 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {prompt}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-[12px] text-gray-500">
                    Questions aren’t supported in Rippling AI, OpenAI will be used for results instead.
                  </div>
                )}
              </div>
            </div>
          )}
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
