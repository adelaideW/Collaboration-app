/** Context passed when opening the AI assistant from the document editor */

export type DocumentAIIntent =
  | 'compose'
  | 'revise-selection'
  /** Toolbar / panel open — user wants general assistant with full-doc awareness */
  | 'general';

export interface DocumentAISessionBootstrap {
  documentTitle: string;
  /** Plain text snapshot of contentEditable body */
  fullDocumentText: string;
  /** Text last selected when the user invoked revise (may be empty) */
  selectedText?: string;
  intent: DocumentAIIntent;
}

const MAX_DOCUMENT_CHARS = 28_000;

export function truncateForModel(text: string, maxChars = MAX_DOCUMENT_CHARS): string {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars)}\n\n[Document truncated…]`;
}

export function buildDocumentEditorSystemInstruction(
  bootstrap?: DocumentAISessionBootstrap | null
): string {
  const base =
    'You are Rippling AI, embedded in Collaboration Drive\'s DOCUMENT EDITOR.\n\n' +
    'YOUR CAPABILITIES:\n\n' +
    '1) **Draft HR/legal-style documents** When the user asks for a template ' +
    '(for example offer letter, employment offer, PIIA, onboarding letter, acknowledgement), ' +
    'produce a complete, professional draft with clear sections and bracketed placeholders ' +
    'such as [DATE], [CANDIDATE NAME], [TITLE], [SALARY], [START DATE], [COMPANY NAME]. ' +
    'Do not refuse simple template requests; offer sensible defaults and note that local law may require review.\n\n' +
    '2) **Revise and edit** When asked to rewrite, shorten, formalize, or fix tone, base your answer on the ' +
    'document context below when present. If the user highlighted text, prioritize changing ONLY that selection ' +
    'unless they ask to change the whole document.\n\n' +
    '3) **Translation** When asked to translate (e.g. French, German, Spanish, Chinese Simplified, Chinese Traditional, ' +
    'Japanese, Korean, Italian, Portuguese), produce the full translated text in the target language. ' +
    'Preserve structure (headings, numbered lists, placeholders). For Chinese, use Simplified unless the user asks for Traditional.\n\n' +
    '4) **Copy-paste friendly output** For full documents or large rewrites, put the main deliverable in a single ' +
    'fenced block using ```plaintext so the user can paste into the editor easily. For small edits, plain paragraphs are fine.\n\n' +
    'Keep answers focused and actionable.';

  if (!bootstrap) {
    return base;
  }

  const title = bootstrap.documentTitle?.trim() || 'Untitled';
  const selection = (bootstrap.selectedText ?? '').trim();
  const body = truncateForModel(bootstrap.fullDocumentText ?? '');

  let focus = '';
  if (bootstrap.intent === 'revise-selection' && selection) {
    focus =
      '\n\nUSER FOCUS: The user opened AI to revise **selected text**. Prioritize editing or translating that selection ' +
      'when the request targets "this", "the selection", or implied local edits.\n';
  } else if (bootstrap.intent === 'compose') {
    focus =
      '\n\nUSER FOCUS: The user started from the empty state or "compose" — they may want a new document or template ' +
      'from scratch even if the editor body is empty.\n';
  }

  return (
    base +
    focus +
    '\n\n--- CURRENT DOCUMENT ---\n' +
    `Title: ${title}\n\n` +
    (body
      ? `Body (plain text):\n${body}\n`
      : '(Document body is empty or not yet loaded — offer to draft from scratch.)\n') +
    (selection
      ? `\n--- SELECTED TEXT (plain) ---\n${selection}\n--- END SELECTION ---\n`
      : '')
  );
}
