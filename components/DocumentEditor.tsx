import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { 
  RotateCcw, 
  RotateCw, 
  Printer, 
  ChevronDown, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  Link, 
  Image as ImageIcon, 
  Plus, 
  AlignLeft, 
  List, 
  ListOrdered, 
  Indent, 
  Outdent, 
  Upload, 
  MessageSquare, 
  History, 
  Sparkles, 
  HelpCircle,
  FileText,
  Layout,
  Users,
  Maximize2,
  Minus,
  SquareCheck,
  LogOut,
  Zap,
  Quote,
  Table as TableIcon,
  Type,
  X
} from 'lucide-react';
import { ViewType } from '../types';
import TemplateSelectionModal from './TemplateSelectionModal';
import {
  DocumentAISessionBootstrap,
  DocumentAIIntent,
} from './documentAISession';

export interface DocumentEditorRef {
  /** Snapshot for toolbar TopBar toggle — respects current selection when present */
  captureAISession: () => DocumentAISessionBootstrap;
  /** Replaces the canvas with plain text (e.g. AI draft or template) so the user can edit further */
  insertDocumentFromAI: (text: string, title?: string) => void;
}

interface DocumentEditorProps {
  setView: (view: ViewType) => void;
  /** Opens the AI drawer with structured document title, body, and optional selection */
  onOpenDocumentAI?: (bootstrap: DocumentAISessionBootstrap) => void;
  initialTemplate?: { name: string; state: string } | null;
  onClearInitialTemplate?: () => void;
}

const OFFER_LETTER_CONTENT = (
  <div className="text-gray-900 font-sans text-[13px] leading-[1.6] max-w-[800px] mx-auto text-justify whitespace-pre-wrap py-12">
    <div className="text-center mb-12">
      <h1 className="text-[18px] font-bold uppercase tracking-tight">Company Inc.</h1>
      <p className="text-[14px] font-bold">[INSERT DATE]</p>
    </div>
    
    <div className="mb-8">
      <p className="font-bold">VIA ELECTRONIC DELIVERY</p>
      <p className="font-bold">[CANDIDATE NAME]</p>
    </div>

    <p className="font-bold mb-6">Re: Offer of Employment with Company Inc.</p>

    <p className="mb-6">Dear [CANDIDATE NAME]:</p>

    <p className="mb-6">
      On behalf of Company Inc. (the “Company”), I am pleased to invite you to join the Company as its
      Senior Vice President of Sales & Marketing. In this position, you will be expected to devote your full business
      time, attention, and energies to the performance of your duties with the Company. As Senior Vice President of
      Sales & Marketing, your duties and responsibilities shall include, but are not necessarily limited to, those set
      forth in the job description which is enclosed as Exhibit A of this letter.
    </p>

    <p className="mb-6">The terms of this offer of employment are as follows:</p>

    <div className="space-y-6">
      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">1.</span>
        <div>
          <span className="font-bold underline">At-Will Employment.</span> The Company is excited about your joining and looks forward to a beneficial
          and productive relationship. Nevertheless, you should be aware that your employment with the Company is
          for no specified period and constitutes at-will employment. As a result, you are free to resign at any time, for
          any reason or for no reason. Similarly, the Company is free to conclude its employment relationship with you
          at any time, with or without cause, and with or without notice. We request that, in the event of resignation, you
          give the Company at least two (2) weeks’ notice.
        </div>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">2.</span>
        <div>
          <span className="font-bold underline">Compensation.</span>
          <div className="mt-4 space-y-4">
            <div className="flex gap-4">
              <span className="shrink-0">(a)</span>
              <p>
                <span className="font-bold underline">Base Annual Salary.</span> If you decide to join us, you will receive an annual base salary of
                $[SALARY], which will be paid every two weeks in accordance with the Company’s normal payroll
                procedures and less any applicable withholdings. Your base salary will increase to $[SALARY INCREASE]
                upon your transition from individual contributor to sales leader, which is anticipated to occur near July 2025.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">(b)</span>
              <p>
                <span className="font-bold underline">Signing Bonus.</span> You will receive a one-time signing bonus of $[SIGNING BONUS], less
                applicable withholdings, which will be paid in your first payroll cycle. If you voluntarily resign from the
                Company within six (6) months of your start date, you agree to repay the full amount of this signing bonus
                within thirty (30) days following your last day of employment
              </p>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0">(c)</span>
              <p>
                <span className="font-bold underline">Annual Revenue-Based Discretionary Bonus.</span> If, as determined by the Company’s Board
                of Directors (the “Board”) in its sole discretion, you drive the Company’s revenue growth such that the
                Company achieves its Annual Recurring Revenue goal by December 31, 2025 (the “ARR Goal”), then,
                subject to your continuous employment with the Company as described below, the Company shall grant you a
                one-time discretionary bonus (the “Target Bonus”), less applicable withholdings.
              </p>
            </div>
          </div>
          <p className="mt-6">
            The ARR Goal for fiscal year 2025 is $[ARR GOAL] in net-new ARR, and the Target Bonus
            for achieving this goal by December 31, 2025, is $[BONUS]. A minimum threshold of 50% of the ARR Goal
            ($X,X00,000) must be achieved in order to be eligible for any bonus payout. Bonus payments will be made on
            a pro-rata basis between 50% and 100% quota attainment, such that at 50% quota ($X,X00,000 ARR), you
            will receive $XXX,000; at 75% quota ($X,XXX,000 ARR), you will receive $187,500; and at 100% quota
            ($X,XXX,XXX ARR), you will receive $XXX,000.
          </p>
        </div>
      </div>

      <div className="flex gap-4 pt-8">
        <span className="font-medium shrink-0 w-4">3.</span>
        <div>
          <span className="font-bold underline">Benefits.</span> As an employee, will also be eligible to participate in certain employee benefit programs
          generally made available to similarly situated Company employees, subject to the satisfaction of any
          eligibility requirements and subject to the terms of such benefit programs.
        </div>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">4.</span>
        <div>
          <span className="font-bold underline">Stock Option.</span> In addition, if you decide to join the Company, the Company will recommend to its
          Board that the Company grant you an option to purchase [ISO QTY] shares of the Company’s Common Stock
          (the “Option”) at a price per share equal to the fair market value per share of the Common Stock on the date of grant.
        </div>
      </div>

      <div className="pt-12 space-y-4">
        <p>Sincerely,</p>
        <p className="font-bold">Company Inc.</p>
        <div className="pt-8">
          <p className="mb-2">AGREED TO AND ACCEPTED:</p>
          <div className="border-b border-gray-300 w-64 h-10 mb-2">{'{{{{employeeSignature}}}}'}</div>
          <p>[CANDIDATE NAME]</p>
          <p>Date: [INSERT DATE]</p>
        </div>
      </div>
    </div>
  </div>
);

const PIIA_CONTENT = (state: string) => (
  <div className="text-gray-900 font-sans text-[13px] leading-[1.6] max-w-[800px] mx-auto text-justify whitespace-pre-wrap py-12">
    <div className="text-center mb-12">
      <h1 className="text-[16px] font-bold uppercase tracking-tight">PROPRIETARY INFORMATION AND INVENTIONS AGREEMENT</h1>
      <p className="text-[14px] font-bold">({state} employees)</p>
    </div>
    
    <p className="mb-6">
      The following confirms and memorializes an agreement that {'{{{{businessLegalName}}}}'}, (the “Company”) and I ({'{{{{employeeFullName}}}}'} ) have had since the commencement of my employment (which term, for purposes of this agreement, shall be deemed to include any relationship of service to the Company that I may have had prior to actually becoming an employee) with the Company in any capacity and that is and has been a material part of the consideration for my employment by Company:
    </p>

    <div className="space-y-6">
      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">1.</span>
        <p>
          I have not entered into, and I agree I will not enter into, any agreement either written or oral in conflict with this Agreement or my employment with Company.  I will not violate any agreement with or rights of any third party or, except as expressly authorized by Company in writing hereafter, use or disclose my own or any third party’s confidential information or intellectual property when acting within the scope of my employment or otherwise on behalf of Company.  Further, I have not retained anything containing any confidential information of a prior employer or other third party, whether or not created by me.
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">2.</span>
        <p>
          Company shall own all right, title and interest (including patent rights, copyrights, trade secret rights, mask work rights, sui generis database rights and all other intellectual property rights of any sort  throughout the world) relating to any and all inventions (whether or not patentable), works of authorship, mask works, designs, know-how, ideas and information made or conceived or reduced to practice, in whole or in part, by me during the term of my employment with Company to and only to the fullest extent allowed by applicable state law (collectively “Inventions”) and I will promptly disclose all Inventions to Company; provided that the term “Inventions” will not include any invention for which no equipment, supplies, facilities or trade secret information of the Company was used and which was developed entirely on my own time, unless (a) the invention relates (i) to the business of the Company, or (ii) to the Company’s actual or demonstrably anticipated research or development, or (b) the invention results from any work performed by me for the Company. Without disclosing any third party confidential information, I will also disclose anything I believe is excluded by applicable state law so that the Company can make an independent assessment. I hereby make all assignments necessary to accomplish the foregoing.  I shall further assist Company, at Company’s expense, to further evidence, record and perfect such assignments, and to perfect, obtain, maintain, enforce, and defend any rights specified to be so owned or assigned.  I hereby irrevocably designate and appoint Company as my agent and attorney-in-fact, coupled with an interest and with full power of substitution, to act for and in my behalf to execute and file any document and to do all other lawfully permitted acts to further the purposes of the foregoing with the same legal force and effect as if executed by me.  If I wish to clarify that something created by me prior to my employment that relates to Company’s actual or proposed business is not within the scope of the foregoing assignment, I have listed it on Appendix A in a manner that does not violate any third party rights or disclose any confidential information. Without limiting Section 1 or Company’s other rights and remedies, if, when acting within the scope of my employment or otherwise on behalf of Company, I use or (except pursuant to this Section 2) disclose my own or any third party’s confidential information or intellectual property (or if any Invention cannot be fully made, used, reproduced, distributed and otherwise exploited without using or violating the foregoing), Company will have and I hereby grant Company a perpetual, irrevocable, worldwide royalty-free, non-exclusive, sublicensable right and license to exploit and exercise all such confidential information and intellectual property rights.
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">3.</span>
        <p>
          To the extent allowed by law, paragraph 2 includes all rights of paternity, integrity, disclosure and withdrawal and any other rights that may be known as or referred to as “moral rights,” “artist’s rights,” “droit moral,” or the like (collectively “Moral Rights”).  To the extent I retain any such Moral Rights under applicable law, I hereby ratify and consent to any action that may be taken with respect to such Moral Rights by or authorized by Company and agree not to assert any Moral Rights with respect thereto.  I will confirm any such ratifications, consents and agreements from time to time as requested by Company.  
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">4.</span>
        <p>
          I agree that all Inventions and all other business, technical and financial information (including, without limitation, the identity of and information relating to customers or employees) I develop, learn or obtain during the term of my employment that relate to Company or the business or demonstrably anticipated business of Company or that are received by or for Company in confidence, constitute “Proprietary Information.”  I will hold in confidence and not disclose or, except within the scope of my employment, use any Proprietary Information.  However, I shall not be obligated under this paragraph with respect to information I can document is or becomes readily publicly available without restriction through no fault of mine.  Upon termination of my employment, I will promptly return to Company all items containing or embodying Proprietary Information (including all copies), except that I may keep my personal copies of (i) my compensation records, (ii) materials distributed to shareholders generally and (iii) this Agreement.  I also recognize and agree that I have no expectation of privacy with respect to Company’s telecommunications, networking or information processing systems (including, without limitation, stored computer files, email messages and voice messages) and that my activity and any files or messages on or using any of those systems may be monitored at any time without notice.  
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">5.</span>
        <p>
          Until one year after the term of my employment, I will not encourage or solicit any employee or consultant of Company to leave Company for any reason (except for the bona fide firing of Company personnel within the scope of my employment).
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">6.</span>
        <p>
          I agree that during the term of my employment with Company (whether or not during business hours), I will not engage in any activity that is in any way competitive with the business or demonstrably anticipated business of Company, and I will not assist any other person or organization in competing or in preparing to compete with any business or demonstrably anticipated business of Company.  
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">7.</span>
        <p>
          I agree that this Agreement is not an employment contract for any particular term and that I have the right to resign and Company has the right to terminate my employment at will, at any time, for any or no reason, with or without cause.  In addition, this Agreement does not purport to set forth all of the terms and conditions of my employment, and, as an employee of Company, I have obligations to Company which are not set forth in this Agreement.  However, the terms of this Agreement govern over any inconsistent terms and can only be changed by a subsequent written agreement signed by the President of Company.
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">8.</span>
        <p>
          I agree that my obligations under paragraphs 2, 3, 4 and 5 of this Agreement shall continue in effect after termination of my employment, regardless of the reason or reasons for termination, and whether such termination is voluntary or involuntary on my part, and that Company is entitled to communicate my obligations under this Agreement to any future employer or potential employer of mine.  My obligations under paragraphs 2, 3 and 4 also shall be binding upon my heirs, executors, assigns, and administrators and shall inure to the benefit of Company, it subsidiaries, successors and assigns.
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">9.</span>
        <p>
          Any dispute in the meaning, effect or validity of this Agreement shall be resolved in accordance with the laws of the State of {state} without regard to the conflict of laws provisions thereof.  I further agree that if one or more provisions of this Agreement are held to be illegal or unenforceable under applicable {state} law, such illegal or unenforceable portion(s) shall be limited or excluded from this Agreement to the minimum extent required so that this Agreement shall otherwise remain in full force and effect and enforceable in accordance with its terms. This Agreement is fully assignable and transferable by Company, but any purported assignment or transfer by me is void. I also understand that any breach of this Agreement will cause irreparable harm to Company for which damages would not be an adequate remedy, and, therefore, Company will be entitled to injunctive relief with respect thereto in addition to any other remedies and without any requirement to post bond.
        </p>
      </div>

      <div className="flex gap-4">
        <span className="font-medium shrink-0 w-4">10.</span>
        <p>
          I understand that pursuant to the federal Defend Trade Secrets Act of 2016, I shall not be held criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade secret that (A) is made (i) in confidence to a federal, state, or local government official, either directly or indirectly, or to an attorney; and (ii) solely for the purpose of reporting or investigating a suspected violation of law; or (B) is made in a complaint or other document filed in a lawsuit or other proceeding, if such filing is made under seal. I further understand that nothing contained in this Agreement limits my ability to (A) communicate with any federal, state or local governmental agency or commission, including to provide documents or other information, without notice to the Company, or (B) share compensation information concerning myself or others, except that this does not permit me to disclose compensation information concerning others that I obtain because my job responsibilities require or allow access to such information.
        </p>
      </div>

      <p className="pt-12 font-bold uppercase text-[14px]">
        I HAVE READ THIS AGREEMENT CAREFULLY AND I UNDERSTAND AND ACCEPT THE OBLIGATIONS WHICH IT IMPOSES UPON ME WITHOUT RESERVATION.  NO PROMISES OR REPRESENTATIONS HAVE BEEN MADE TO ME TO INDUCE ME TO SIGN THIS AGREEMENT.  I SIGN THIS AGREEMENT VOLUNTARILY AND FREELY, IN DUPLICATE, WITH THE UNDERSTANDING THAT THE COMPANY WILL RETAIN ONE COUNTERPART AND THE OTHER COUNTERPART WILL BE RETAINED BY ME.
      </p>

      <div className="pt-12 space-y-4">
        <p>Effective:{'{{{{employeeSignatureDate}}}}'}</p>
        <div className="pt-4">
          <p className="mb-2">By :</p>
          <div className="border-b border-gray-300 w-64 h-10 mb-2">{'{{{{employeeSignature}}}}'}</div>
          <p>Name : {'{{{{employeeFullName}}}}'}</p>
        </div>
      </div>

      <div className="pt-12 space-y-4">
        <p className="font-bold">Accepted and Agreed to :</p>
        <p>{'{{{{businessLegalName}}}}'}</p>
        <div className="pt-4">
          <p className="mb-2">By :</p>
          <div className="border-b border-gray-300 w-64 h-10 mb-2">{'{{{{companySignature}}}}'}</div>
          <p>Name : {'{{{{companySignatoryName}}}}'}</p>
          <p>Title : {'{{{{companySignatoryTitle}}}}'}</p>
        </div>
      </div>

      <div className="pt-16 space-y-4 border-t border-gray-100">
        <p className="font-bold uppercase tracking-wider text-[15px]">APPENDIX  A</p>
        <div className="italic text-gray-500 min-h-[100px]">
          {'{{{{priorMatter}}}}'}
        </div>
      </div>
    </div>
  </div>
);

const DocumentEditor = forwardRef<DocumentEditorRef, DocumentEditorProps>(
  function DocumentEditor(
    {
      setView,
      onOpenDocumentAI,
      initialTemplate,
      onClearInitialTemplate,
    },
    ref
  ) {
  const SLASH_MENU_ITEMS = [
    { id: 'ai', icon: <Sparkles size={16} className="text-[#7A005D]" />, label: "Revise with AI" },
    { id: 'variables', icon: <Zap size={16} />, label: "Add variables" },
    { id: 'bulleted', icon: <List size={16} />, label: "Bulleted list" },
    { id: 'numbered', icon: <ListOrdered size={16} />, label: "Numbered list" },
    { id: 'link', icon: <Link size={16} />, label: "Link" },
    { id: 'divider', icon: <Minus size={16} />, label: "Divider" },
    { id: 'quote', icon: <Quote size={16} />, label: "Quote" },
    { id: 'text', icon: <Type size={16} />, label: "Normal text" },
    { id: 'code', icon: <Code size={16} />, label: "Code snippet" },
    { id: 'table', icon: <TableIcon size={16} />, label: "Table" },
  ];

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [appliedTemplate, setAppliedTemplate] = useState<{ name: string; state: string } | null>(null);
  const [documentName, setDocumentName] = useState('Document name');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectionPosition, setSelectionPosition] = useState({ top: 0, left: 0 });
  const [isTemplatePanelOpen, setIsTemplatePanelOpen] = useState(false);
  /** AI-inserted drafts use a textarea for reliable editable plain text */
  const [plainBodyEditor, setPlainBodyEditor] = useState(false);
  const [plainBodyText, setPlainBodyText] = useState('');
  const plainTextareaRef = useRef<HTMLTextAreaElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  /** Textarea selection mirrors “Revise selection” UX for AI context */
  const [plainSelectionActive, setPlainSelectionActive] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0 && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionPosition({
          top: rect.top,
          left: rect.right
        });
        setIsTextSelected(true);
      } else {
        setIsTextSelected(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  useEffect(() => {
    if (initialTemplate) {
      handleApplyTemplate(initialTemplate.name, initialTemplate.state);
      if (onClearInitialTemplate) onClearInitialTemplate();
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (isEditingName && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingName]);

  const syncPlainSelectionHint = () => {
    const el = plainTextareaRef.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    setPlainSelectionActive(a !== b && !!el.value.slice(a, b).trim());
  };

  const handleApplyTemplate = (name: string, state: string) => {
    setPlainBodyEditor(false);
    setPlainBodyText('');
    setAppliedTemplate({ name, state });
    setDocumentName(`${name} - ${state}`);
  };

  const buildAISession = useCallback(
    (intent: DocumentAIIntent): DocumentAISessionBootstrap => {
      let sel = '';
      if (plainBodyEditor && plainTextareaRef.current) {
        const el = plainTextareaRef.current;
        const a = el.selectionStart;
        const b = el.selectionEnd;
        sel = el.value.slice(Math.min(a, b), Math.max(a, b)).trim();
      } else if (typeof window !== 'undefined') {
        sel = window.getSelection()?.toString()?.trim() ?? '';
      }

      let resolvedIntent: DocumentAIIntent = intent;
      if (intent === 'revise-selection' && !sel) {
        resolvedIntent = 'general';
      }

      const fullText = plainBodyEditor
        ? plainBodyText
        : (contentRef.current?.innerText ?? '');

      let selectedOut: string | undefined;
      if (intent === 'compose') {
        selectedOut = undefined;
      } else {
        selectedOut = sel || undefined;
      }

      return {
        documentTitle: documentName,
        fullDocumentText: fullText,
        selectedText: selectedOut,
        intent: resolvedIntent,
      };
    },
    [documentName, plainBodyEditor, plainBodyText]
  );

  const insertDocumentFromAI = useCallback((text: string, title?: string) => {
    setPlainBodyEditor(true);
    setPlainBodyText(text.replace(/\r\n/g, '\n'));
    setAppliedTemplate({ name: 'Untitled Document', state: '' });
    const nextTitle = title?.trim();
    setDocumentName(nextTitle || 'Document from AI');
    setTimeout(() => plainTextareaRef.current?.focus(), 0);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      captureAISession: (): DocumentAISessionBootstrap =>
        buildAISession('general'),
      insertDocumentFromAI,
    }),
    [buildAISession, insertDocumentFromAI]
  );

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (plainBodyEditor) return;
    const text = e.currentTarget.innerText.replace(/\u00a0/g, ' ').trim();
    if (text === '' && appliedTemplate && appliedTemplate.name === 'Untitled Document') {
      setAppliedTemplate(null);
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Check if we're not already in an input and no template is applied
      const isInput = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName) || (e.target as HTMLElement).isContentEditable;
      
      if (!appliedTemplate && !isInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setPlainBodyEditor(false);
        setPlainBodyText('');
        setAppliedTemplate({ name: 'Untitled Document', state: '' });
        // We need to wait for the next render to focus the contentRef
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.focus();
          }
        }, 0);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [appliedTemplate]);

  const handleContainerClick = (e: React.MouseEvent) => {
    // If clicking the empty space and no template is applied, start manual mode
    if (!appliedTemplate && e.target === e.currentTarget) {
      setPlainBodyEditor(false);
      setPlainBodyText('');
      setAppliedTemplate({ name: 'Untitled Document', state: '' });
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '/') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSlashMenuPosition({
          top: rect.bottom,
          left: rect.left
        });
        setIsSlashMenuOpen(true);
        setSelectedIndex(0);
      }
    } else if (e.key === 'Escape') {
      setIsSlashMenuOpen(false);
    } else if (isSlashMenuOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % SLASH_MENU_ITEMS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + SLASH_MENU_ITEMS.length) % SLASH_MENU_ITEMS.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = SLASH_MENU_ITEMS[selectedIndex];
        if (item.id === 'ai')
          onOpenDocumentAI?.(buildAISession('revise-selection'));
        setIsSlashMenuOpen(false);
      } else if (!['Tab'].includes(e.key)) {
        // Hide menu when user starts typing something else
        setIsSlashMenuOpen(false);
      }
    }
  };

  const renderTemplateContent = () => {
    if (!appliedTemplate) return null;
    
    if (appliedTemplate.name === 'PIIA Agreement') {
      return PIIA_CONTENT(appliedTemplate.state);
    } else if (appliedTemplate.name === 'Offer letter') {
      return OFFER_LETTER_CONTENT;
    } else if (appliedTemplate.name === 'Untitled Document') {
      return <div className="py-20 min-h-[500px]"></div>;
    } else {
      return (
        <div className="py-20">
          <h1 className="text-3xl font-bold mb-8">{appliedTemplate.name}</h1>
          <p className="text-gray-600 italic">Draft content for {appliedTemplate.state} employees...</p>
        </div>
      );
    }
  };

  const truncatedName = documentName.length > 150 
    ? documentName.substring(0, 150) + '...' 
    : documentName;

  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-hidden">
      {/* Document Header Section */}
      <div className="px-6 py-3 bg-white flex items-center justify-between shrink-0">
        <div className="flex-1 min-w-0">
          {isEditingName ? (
            <input
              ref={titleInputRef}
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              className="text-[24px] font-bold text-gray-900 tracking-tight bg-white border-2 border-[#7A005D]/60 px-3 py-1 rounded-md outline-none w-full"
            />
          ) : (
            <h1 
              onClick={() => setIsEditingName(true)}
              className="text-[24px] font-bold text-gray-900 tracking-tight truncate leading-tight border-2 border-transparent px-3 py-1 rounded-md cursor-text hover:bg-gray-50 transition-colors inline-block max-w-full"
            >
              {truncatedName}
            </h1>
          )}
        </div>
        <button 
          onClick={() => setView('HOME')}
          className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm bg-white shrink-0 ml-4"
        >
          <LogOut size={16} />
          <span>Done</span>
        </button>
      </div>

      {/* Menu Bar */}
      <div className="px-6 pb-2 flex items-center gap-4 text-[13px] text-gray-600 shrink-0 border-b border-gray-50/50">
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors bg-gray-50 font-medium">File</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">Edit</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">View</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">Insert</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">Format</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">Tools</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">Extensions</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 transition-colors">Help</button>
      </div>

      {/* Toolbar */}
      <div className="px-6 py-1.5 flex flex-wrap items-center gap-x-1 gap-y-1 bg-white border-b border-gray-100 shrink-0 max-h-[140px] overflow-hidden">
        <ToolbarButton icon={<RotateCcw size={16} />} />
        <ToolbarButton icon={<RotateCw size={16} />} />
        <ToolbarButton icon={<Printer size={16} />} />
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100 text-[13px] text-gray-700 whitespace-nowrap">
          Normal text <ChevronDown size={14} />
        </button>
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100 text-[13px] text-gray-700 whitespace-nowrap">
          Basel Grotesk <ChevronDown size={14} />
        </button>
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <div className="flex items-center bg-gray-50 rounded-lg px-1 py-0.5 border border-gray-100 shrink-0">
          <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Minus size={14} /></button>
          <input type="text" defaultValue="11" className="w-8 text-center bg-transparent text-[13px] font-medium outline-none" />
          <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Plus size={14} /></button>
        </div>
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <ToolbarButton icon={<Bold size={16} />} />
        <ToolbarButton icon={<Italic size={16} />} />
        <ToolbarButton icon={<Underline size={16} />} />
        <ToolbarButton icon={<Strikethrough size={16} />} />
        <ToolbarButton icon={<Code size={16} />} />
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-700 font-bold flex flex-col items-center">
           <span className="text-[14px]">A</span>
           <div className="w-full h-0.5 bg-black"></div>
        </button>
        <ToolbarButton icon={<ImageIcon size={16} />} />
        <ToolbarButton icon={<Plus size={16} />} />
        <ToolbarButton icon={<ChevronDown size={14} />} />
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <ToolbarButton icon={<Link size={16} />} />
        <ToolbarButton icon={<ImageIcon size={16} />} />
        <ToolbarButton icon={<Plus size={16} />} />
        <ToolbarButton icon={<ChevronDown size={14} />} />
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        
        <ToolbarButton icon={<AlignLeft size={16} />} />
        <ToolbarButton icon={<ChevronDown size={14} /> } />
        <ToolbarButton icon={<List size={16} />} />
        <ToolbarButton icon={<ChevronDown size={14} />} />
        <ToolbarButton icon={<ListOrdered size={16} />} />
        <ToolbarButton icon={<ChevronDown size={14} />} />
        <ToolbarButton icon={<Outdent size={16} />} />
        <ToolbarButton icon={<Indent size={16} />} />
        <ToolbarButton icon={<Upload size={16} />} />
        
        <div className="h-5 w-px bg-gray-200 mx-1"></div>
        <ToolbarButton icon={<MessageSquare size={16} />} />
        <ToolbarButton icon={<History size={16} />} />
        
        <div className="ml-auto flex items-center gap-3 pr-2 shrink-0">
           <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
             Editing <ChevronDown size={14} />
           </button>
           <Maximize2 size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden bg-white">
        {/* Scrollable document area */}
        <div 
          className="flex-1 overflow-y-auto px-8 pb-40 flex flex-col items-center bg-white custom-scrollbar relative"
          onClick={handleContainerClick}
        >
          {((plainBodyEditor && plainSelectionActive) ||
            (!plainBodyEditor && isTextSelected)) && (
            <div
              className={`fixed z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${plainBodyEditor ? 'bottom-40 left-1/2 -translate-x-1/2' : ''}`}
              style={
                plainBodyEditor
                  ? undefined
                  : { top: selectionPosition.top - 40, left: selectionPosition.left - 60 }
              }
            >
              <button 
                onClick={() => onOpenDocumentAI?.(buildAISession('revise-selection'))}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E9D5FF] text-[#7A005D] rounded-full text-[13px] font-bold shadow-lg hover:bg-[#fdf2f8] transition-all active:scale-95 group whitespace-nowrap"
              >
                <Sparkles size={14} className="text-[#7A005D]" />
                <span>Revise with AI</span>
              </button>
            </div>
          )}

          {isSlashMenuOpen && (
            <div 
              className="fixed z-[100] w-64 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden py-2 animate-in zoom-in-95 duration-100"
              style={{ top: slashMenuPosition.top, left: slashMenuPosition.left }}
            >
              <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Search blocks to add...</div>
              {SLASH_MENU_ITEMS.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index === 1 && <div className="h-px bg-gray-50 my-1 mx-2"></div>}
                  <SlashMenuItem 
                    icon={item.icon} 
                    label={item.label} 
                    active={index === selectedIndex}
                    onClick={() => { 
                      if (item.id === 'ai')
                        onOpenDocumentAI?.(buildAISession('revise-selection'));
                      setIsSlashMenuOpen(false); 
                    }} 
                  />
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="w-full max-w-[900px] min-h-full animate-in fade-in duration-500">
            {appliedTemplate ? (
              plainBodyEditor ? (
                <textarea
                  ref={plainTextareaRef}
                  value={plainBodyText}
                  onChange={(e) => setPlainBodyText(e.target.value)}
                  onSelect={syncPlainSelectionHint}
                  onKeyUp={syncPlainSelectionHint}
                  onMouseUp={syncPlainSelectionHint}
                  spellCheck
                  placeholder="Ask the assistant to draft an offer letter, termination letter, NDA, or paste text here."
                  className="w-full min-h-[72vh] py-12 px-4 text-gray-900 font-sans text-[13px] leading-[1.6] max-w-[800px] mx-auto text-left whitespace-pre-wrap bg-white border-0 rounded-none outline-none focus:ring-0 focus-visible:outline-none resize-y selection:bg-[#7A005D]/10"
                />
              ) : (
                <div 
                  ref={contentRef}
                  className="w-full text-left outline-none focus:ring-0 selection:bg-[#7A005D]/10" 
                  contentEditable 
                  suppressContentEditableWarning
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                >
                  {renderTemplateContent()}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onOpenDocumentAI?.(buildAISession('compose'))}
                    className="flex items-center gap-3 px-8 py-3.5 bg-[#fdf2f8] border border-[#E9D5FF] text-[#7A005D] rounded-xl text-[15px] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 group"
                  >
                    <Sparkles size={18} className="text-[#7A005D] group-hover:rotate-12 transition-transform" />
                    <span>Start with Rippling AI</span>
                  </button>
                  <button 
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-3.5 bg-white border border-gray-200 text-gray-800 rounded-xl text-[15px] font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <FileText size={18} className="text-gray-400" />
                    <span>Templates</span>
                  </button>
                </div>
                <div className="text-center max-w-[480px] mt-2">
                  <p className="text-gray-400 text-[14px] font-medium leading-relaxed">
                    Start by using our AI assistant to draft a document or select from one of our professional HR templates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Tool Strip */}
        <div className="w-12 bg-white border-l border-gray-100 flex flex-col items-center py-6 gap-6 shrink-0 z-40">
          <SideToolButton 
            icon={<FileText size={20} />} 
            active={isTemplatePanelOpen} 
            onClick={() => appliedTemplate && setIsTemplatePanelOpen(!isTemplatePanelOpen)}
          />
          <SideToolButton icon={<Layout size={20} />} />
          <SideToolButton icon={<Users size={20} />} />
          <div className="h-px w-6 bg-gray-100 my-1"></div>
          <SideToolButton icon={<RotateCcw size={20} />} />
          <SideToolButton icon={<SquareCheck size={20} />} />
          <SideToolButton icon={<MessageSquare size={20} />} />
          <SideToolButton icon={<History size={20} />} />
        </div>

        {/* Right Side Template Panel */}
        {isTemplatePanelOpen && (
          <div className="w-80 bg-white border-l border-gray-100 flex flex-col animate-in slide-in-from-right duration-300 z-30">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-gray-900">Templates</h3>
              <button onClick={() => setIsTemplatePanelOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <div 
                className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all group"
                onClick={() => handleApplyTemplate('Offer letter', 'Alabama')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#fdf2f8] flex items-center justify-center text-[#7A005D]">
                    <FileText size={18} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">Offer letter</span>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed">Standardized offer letter with dynamic compensation fields.</p>
              </div>

              <div 
                className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all group"
                onClick={() => handleApplyTemplate('PIIA Agreement', 'California')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#fdf2f8] flex items-center justify-center text-[#7A005D]">
                    <FileText size={18} />
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">PIIA Agreement</span>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed">Proprietary Information and Inventions Agreement.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <TemplateSelectionModal 
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        setView={setView}
        onApplyTemplate={handleApplyTemplate}
        initialTab="templates"
      />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; border: 2px solid white; }
      `}</style>
    </div>
  );
});

const ToolbarButton = ({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) => (
  <button className={`p-1.5 rounded hover:bg-gray-100 transition-colors shrink-0 ${active ? 'bg-gray-100 text-black' : 'text-gray-600'}`}>
    {icon}
  </button>
);

const SideToolButton = ({ icon, active = false, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors shrink-0 ${active ? 'text-gray-900 bg-gray-50' : 'text-gray-400 hover:text-gray-800 hover:bg-gray-50'}`}
  >
    {icon}
  </button>
);

const SlashMenuItem = ({ icon, label, onClick, active = false }: { icon: React.ReactNode, label: string, onClick: () => void, active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors text-left group ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
  >
    <div className={`transition-colors ${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'}`}>
      {icon}
    </div>
    <span className={`text-[14px] font-medium transition-colors ${active ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>{label}</span>
  </button>
);

export default DocumentEditor;
