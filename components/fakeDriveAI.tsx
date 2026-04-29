import React from 'react';
import { Eye, Pencil } from 'lucide-react';
import { USER_AVATAR_URL } from './TopBar';
import { MOCK_ITEMS } from '../constants';
import type { DriveItem } from '../types';

function avatarForName(name: string): string {
  return name.startsWith('You') ? USER_AVATAR_URL : `https://i.pravatar.cc/100?u=${encodeURIComponent(name)}`;
}

export function normalizeQuery(text: string): string {
  return text
    .trim()
    .toLowerCase()
    // Common typos seen in prompts.
    .replace(/\bdoucments?\b/g, 'documents')
    .replace(/\bdocments?\b/g, 'documents')
    .replace(/\bdocumnts?\b/g, 'documents')
    .replace(/\bdocumens?\b/g, 'documents')
    .replace(/\brepots?\b/g, 'reports')
    .replace(/\s+/g, ' ');
}

function formatHHmm(d = new Date()): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function formatMMDDYYYY(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function startOfWeekMonday(now: Date): Date {
  const d = new Date(now);
  const day = d.getDay(); // 0 Sun ... 6 Sat
  const delta = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + delta);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(now: Date): Date {
  const d = new Date(now);
  d.setHours(23, 59, 59, 999);
  return d;
}

function quarterStart(now = new Date()): Date {
  const q = Math.floor(now.getMonth() / 3);
  return new Date(now.getFullYear(), q * 3, 1);
}

function resolveReportingRangeLabel(query: string, now = new Date()): string {
  const q = query.toLowerCase();
  const todayEnd = endOfDay(now);
  let start = quarterStart(now);
  let end = todayEnd;

  if (/\blast\s+year\b|\bin\s+last\s+year\b/.test(q)) {
    const y = now.getFullYear() - 1;
    start = new Date(y, 0, 1);
    end = new Date(y, 11, 31, 23, 59, 59, 999);
  } else if (/\bthis\s+year\b/.test(q)) {
    start = new Date(now.getFullYear(), 0, 1);
  } else if (/\blast\s+month\b/.test(q)) {
    const y = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const m = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    start = new Date(y, m, 1);
    end = new Date(y, m + 1, 0, 23, 59, 59, 999);
  } else if (/\bthis\s+month\b/.test(q)) {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (/\blast\s+week\b/.test(q)) {
    const thisWeek = startOfWeekMonday(now);
    start = new Date(thisWeek);
    start.setDate(thisWeek.getDate() - 7);
    end = new Date(thisWeek);
    end.setDate(thisWeek.getDate() - 1);
    end.setHours(23, 59, 59, 999);
  } else if (/\bthis\s+week\b/.test(q)) {
    start = startOfWeekMonday(now);
  } else if (/\blast\s+quarter\b/.test(q)) {
    const thisQuarterStart = quarterStart(now);
    start = new Date(thisQuarterStart);
    start.setMonth(thisQuarterStart.getMonth() - 3);
    end = new Date(thisQuarterStart);
    end.setDate(thisQuarterStart.getDate() - 1);
    end.setHours(23, 59, 59, 999);
  } else if (/\bthis\s+quarter\b/.test(q)) {
    start = quarterStart(now);
  }

  return `${formatMMDDYYYY(start)}–${formatMMDDYYYY(end)}`;
}

interface FakeWrapProps {
  children: React.ReactNode;
}

export function FakeTableWrap({ children }: FakeWrapProps) {
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <div className="min-w-[300px] border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">{children}</div>
    </div>
  );
}

function ActionIcons() {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <button
        type="button"
        aria-label="Edit document"
        className="p-1.5 rounded-lg text-gray-500 hover:bg-[#7A005D]/10 hover:text-[#7A005D] transition-colors"
      >
        <Pencil size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Preview document"
        className="p-1.5 rounded-lg text-gray-500 hover:bg-[#7A005D]/10 hover:text-[#7A005D] transition-colors"
      >
        <Eye size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

function ViewEditActionIcons() {
  return (
    <div className="flex items-center justify-center gap-0.5">
      <button
        type="button"
        aria-label="View artifact"
        className="p-1.5 rounded-lg text-gray-500 hover:bg-[#7A005D]/10 hover:text-[#7A005D] transition-colors"
      >
        <Eye size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Edit artifact"
        className="p-1.5 rounded-lg text-gray-500 hover:bg-[#7A005D]/10 hover:text-[#7A005D] transition-colors"
      >
        <Pencil size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

function UserCell({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <img
        src={avatarForName(name)}
        alt=""
        className="w-8 h-8 rounded-full border border-white shadow shrink-0"
      />
      <span className="text-[13px] font-medium text-gray-900 truncate">{name}</span>
    </div>
  );
}

// --- Intent A ---
function RowGridTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
      style={{
        gridTemplateColumns: 'minmax(140px,1.6fr) minmax(100px,1.4fr) minmax(70px,0.65fr) auto',
      }}
    >
      {children}
    </div>
  );
}

function DocumentsTodayBodyFixed() {
  const tDynamic = formatHHmm();
  const rows = [
    { user: 'Maya Patel', doc: 'Q2 Headcount Forecast.xlsx', t: '09:12' },
    { user: 'Jordan Lee', doc: 'Vendor NDA – Acme Corp', t: '10:41' },
    { user: 'Sam Rivera', doc: 'Board deck – FY26 strategy', t: '11:58' },
    { user: 'Alex Chen', doc: 'Offboarding checklist – Draft', t: tDynamic },
  ];

  return (
    <FakeTableWrap>
      <div className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{
          gridTemplateColumns: 'minmax(140px,1.6fr) minmax(100px,1.4fr) minmax(70px,0.65fr) auto',
        }}
      >
        <div>User</div>
        <div>Document</div>
        <div>Created today</div>
        <div className="text-center">Actions</div>
      </div>
      {rows.map((r) => (
        <div key={r.doc}>
          <RowGridTemplate>
            <UserCell name={r.user} />
            <span className="text-[12px] text-gray-700 font-medium truncate" title={r.doc}>
              {r.doc}
            </span>
            <span className="text-[12px] text-gray-600 tabular-nums">{r.t}</span>
            <ActionIcons />
          </RowGridTemplate>
        </div>
      ))}
    </FakeTableWrap>
  );
}

// --- Intent B ---
function TopCreatorsBody({ rangeLabel }: { rangeLabel: string }) {
  const rows = [
    { user: 'Riley Nguyen', count: 28 },
    { user: 'Taylor Brooks', count: 22 },
    { user: 'Morgan Reyes', count: 19 },
  ];

  return (
    <FakeTableWrap>
      <div
        className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 items-center"
        style={{ gridTemplateColumns: 'minmax(140px,1.8fr) minmax(64px,0.75fr) minmax(168px,1.4fr)' }}
      >
        <div>User</div>
        <div className="text-right">Reports / docs</div>
        <div>Reporting period</div>
      </div>
      {rows.map((r) => (
        <div
          key={r.user}
          className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
          style={{ gridTemplateColumns: 'minmax(140px,1.8fr) minmax(64px,0.75fr) minmax(168px,1.4fr)' }}
        >
          <UserCell name={r.user} />
          <div className="text-[13px] font-semibold text-gray-900 text-right tabular-nums">{r.count}</div>
          <div className="text-[12px] text-gray-600 tabular-nums">{rangeLabel}</div>
        </div>
      ))}
      <div className="px-3 py-2 text-[11px] text-gray-400">Counts include uploaded reports and new documents shared on Drive.</div>
    </FakeTableWrap>
  );
}

// --- Intent C ---
function PendingSignaturesBody() {
  const rows = [
    { doc: 'Offer letter – J. Patel', owner: 'Casey Wu', due: 'May 03' },
    { doc: 'NDA renewal – Lunar Labs', owner: 'Drew Patel', due: 'May 05' },
    { doc: 'IC agreement – Contractor', owner: 'Jamie Santos', due: 'May 08' },
  ];

  return (
    <FakeTableWrap>
      <div
        className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{ gridTemplateColumns: 'minmax(120px,1.6fr) minmax(112px,1.2fr) minmax(80px,0.8fr)' }}
      >
        <div>Document</div>
        <div>Owner</div>
        <div>Due</div>
      </div>
      {rows.map((r) => (
        <div
          key={r.doc}
          className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
          style={{ gridTemplateColumns: 'minmax(120px,1.6fr) minmax(112px,1.2fr) minmax(80px,0.8fr)' }}
        >
          <span className="text-[12px] text-gray-900 font-medium truncate">{r.doc}</span>
          <UserCell name={r.owner} />
          <span className="text-[12px] text-gray-600">{r.due}</span>
        </div>
      ))}
    </FakeTableWrap>
  );
}

// --- Intent D ---
function SharingActivityBody() {
  const t = formatHHmm();
  const rows = [
    { user: 'Harper Diaz', resource: 'Compensationbands_FY26.pdf', time: '08:54' },
    { user: 'Noah Wright', resource: 'All-hands recap – Notes', time: '12:07' },
    { user: 'Emma Patel', resource: 'Eng roadmap Q3.docx', time: t },
  ];

  return (
    <FakeTableWrap>
      <div
        className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{ gridTemplateColumns: 'minmax(128px,1.4fr) minmax(100px,1.4fr) minmax(64px,0.7fr)' }}
      >
        <div>Sharer</div>
        <div>Resource</div>
        <div>Shared at</div>
      </div>
      {rows.map((r) => (
        <div
          key={r.resource}
          className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
          style={{ gridTemplateColumns: 'minmax(128px,1.4fr) minmax(100px,1.4fr) minmax(64px,0.7fr)' }}
        >
          <UserCell name={r.user} />
          <span className="text-[12px] text-gray-800 truncate">{r.resource}</span>
          <span className="text-[12px] text-gray-600 tabular-nums">{r.time}</span>
        </div>
      ))}
    </FakeTableWrap>
  );
}

// --- Intent E ---
function StorageByDeptBody() {
  const rows = [
    { dept: 'Engineering', usage: '1.92 TB' },
    { dept: 'People Ops', usage: '640 GB' },
    { dept: 'Finance', usage: '512 GB' },
    { dept: 'Sales', usage: '388 GB' },
  ];

  return (
    <FakeTableWrap>
      <div
        className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 grid-cols-2"
      >
        <div>Department</div>
        <div className="text-right">Estimated usage</div>
      </div>
      {rows.map((r) => (
        <div
          key={r.dept}
          className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center grid-cols-2"
        >
          <span className="text-[13px] font-medium text-gray-900">{r.dept}</span>
          <span className="text-[13px] text-gray-700 text-right tabular-nums">{r.usage}</span>
        </div>
      ))}
    </FakeTableWrap>
  );
}

export interface DriveFakeReply {
  preamble: string;
  body: React.ReactNode;
}

type ArtifactType = 'doc' | 'report' | 'app' | 'workflow';
type ArtifactItem = DriveItem & { type: ArtifactType };

const ARTIFACT_TYPES: ArtifactType[] = ['doc', 'report', 'app', 'workflow'];

function asArtifactTypeLabel(t: ArtifactType): string {
  switch (t) {
    case 'doc':
      return 'Document';
    case 'report':
      return 'Report';
    case 'app':
      return 'App';
    case 'workflow':
      return 'Workflow';
  }
}

function artifactItems(): ArtifactItem[] {
  return MOCK_ITEMS.filter((i): i is ArtifactItem => ARTIFACT_TYPES.includes(i.type as ArtifactType));
}

function parseCreatedAt(item: DriveItem): Date | null {
  const d = new Date(item.createdAt);
  return Number.isNaN(d.getTime()) ? null : d;
}

function resolvePeriodWindow(query: string, now = new Date()): { start: Date; end: Date; label: string } {
  const q = query.toLowerCase();
  const todayEnd = endOfDay(now);
  let start = quarterStart(now);
  let end = todayEnd;

  if (/\b(last|past)\s+2\s+weeks?\b/.test(q) || /\b(last|past)\s+two\s+weeks?\b/.test(q)) {
    start = new Date(todayEnd);
    start.setDate(todayEnd.getDate() - 13);
    start.setHours(0, 0, 0, 0);
  } else if (/\blast\s+year\b|\bin\s+last\s+year\b/.test(q)) {
    const y = now.getFullYear() - 1;
    start = new Date(y, 0, 1);
    end = new Date(y, 11, 31, 23, 59, 59, 999);
  } else if (/\bthis\s+year\b/.test(q)) {
    start = new Date(now.getFullYear(), 0, 1);
  } else if (/\blast\s+month\b/.test(q)) {
    const y = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const m = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    start = new Date(y, m, 1);
    end = new Date(y, m + 1, 0, 23, 59, 59, 999);
  } else if (/\bthis\s+month\b/.test(q)) {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (/\blast\s+week\b/.test(q)) {
    const thisWeek = startOfWeekMonday(now);
    start = new Date(thisWeek);
    start.setDate(thisWeek.getDate() - 7);
    end = new Date(thisWeek);
    end.setDate(thisWeek.getDate() - 1);
    end.setHours(23, 59, 59, 999);
  } else if (/\bthis\s+week\b/.test(q)) {
    start = startOfWeekMonday(now);
  } else if (/\blast\s+quarter\b/.test(q)) {
    const thisQuarterStart = quarterStart(now);
    start = new Date(thisQuarterStart);
    start.setMonth(thisQuarterStart.getMonth() - 3);
    end = new Date(thisQuarterStart);
    end.setDate(thisQuarterStart.getDate() - 1);
    end.setHours(23, 59, 59, 999);
  } else if (/\bthis\s+quarter\b/.test(q)) {
    start = quarterStart(now);
  }

  return { start, end, label: `${formatMMDDYYYY(start)}–${formatMMDDYYYY(end)}` };
}

function hasPeriodPhrase(q: string): boolean {
  return /\b(last|past|this)\s+(year|month|week|quarter)\b/.test(q) || /\b(last|past)\s+(2|two)\s+weeks?\b/.test(q);
}

function itemInWindow(item: DriveItem, start: Date, end: Date): boolean {
  const d = parseCreatedAt(item);
  if (!d) return false;
  return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
}

function resolvePersonFromQuery(q: string): string | null {
  if (/\b(myself|me|i|mine)\b/.test(q)) return 'Me';
  const owners = Array.from(new Set(artifactItems().map((i) => i.owner)));
  return owners.find((o) => q.includes(o.toLowerCase())) ?? null;
}

function LatestArtifactBody({ row }: { row: ArtifactItem | null }) {
  return (
    <FakeTableWrap>
      <div
        className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{ gridTemplateColumns: 'minmax(130px,1.2fr) minmax(140px,1.6fr) minmax(88px,0.8fr) minmax(80px,0.8fr)' }}
      >
        <div>User</div><div>Artifact</div><div>Type</div><div className="text-center">Actions</div>
      </div>
      {!row ? (
        <div className="px-3 py-4 text-[13px] text-gray-500">No result is found.</div>
      ) : (
        <div
          className="grid gap-2 px-3 py-3 items-center"
          style={{ gridTemplateColumns: 'minmax(130px,1.2fr) minmax(140px,1.6fr) minmax(88px,0.8fr) minmax(80px,0.8fr)' }}
        >
          <UserCell name={row.owner} />
          <span className="text-[12px] text-gray-800 truncate">{row.name}</span>
          <span className="text-[12px] text-gray-700">{asArtifactTypeLabel(row.type)}</span>
          <ViewEditActionIcons />
        </div>
      )}
    </FakeTableWrap>
  );
}

function MostArtifactsBody({ rows, periodLabel }: { rows: Array<{ owner: string; count: number }>; periodLabel: string }) {
  return (
    <FakeTableWrap>
      <div className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{ gridTemplateColumns: 'minmax(140px,1.5fr) minmax(70px,0.7fr) minmax(170px,1.4fr)' }}
      >
        <div>User</div><div className="text-right">Count</div><div>Time period</div>
      </div>
      {rows.length === 0 ? (
        <div className="px-3 py-4 text-[13px] text-gray-500">No artifacts were created in this period.</div>
      ) : rows.map((r) => (
        <div key={r.owner} className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
          style={{ gridTemplateColumns: 'minmax(140px,1.5fr) minmax(70px,0.7fr) minmax(170px,1.4fr)' }}
        >
          <UserCell name={r.owner} />
          <span className="text-[13px] text-right font-semibold tabular-nums">{r.count}</span>
          <span className="text-[12px] text-gray-600 truncate" title={periodLabel}>{periodLabel}</span>
        </div>
      ))}
    </FakeTableWrap>
  );
}

function ArtifactListBody({ rows, periodLabel }: { rows: ArtifactItem[]; periodLabel: string }) {
  return (
    <FakeTableWrap>
      <div className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{ gridTemplateColumns: 'minmax(130px,1.3fr) minmax(78px,0.8fr) minmax(130px,1.2fr) minmax(160px,1.2fr)' }}
      >
        <div>Artifact</div><div>Type</div><div>Creator</div><div>Time period</div>
      </div>
      {rows.length === 0 ? (
        <div className="px-3 py-4 text-[13px] text-gray-500">No artifacts were created in this period.</div>
      ) : rows.map((r) => (
        <div key={r.id} className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
          style={{ gridTemplateColumns: 'minmax(130px,1.3fr) minmax(78px,0.8fr) minmax(130px,1.2fr) minmax(160px,1.2fr)' }}
        >
          <span className="text-[12px] text-gray-800 truncate">{r.name}</span>
          <span className="text-[12px] text-gray-700">{asArtifactTypeLabel(r.type)}</span>
          <UserCell name={r.owner} />
          <span className="text-[12px] text-gray-600 truncate" title={periodLabel}>{periodLabel}</span>
        </div>
      ))}
    </FakeTableWrap>
  );
}

function PersonArtifactsBody({ rows }: { rows: ArtifactItem[] }) {
  return (
    <FakeTableWrap>
      <div className="border-b border-gray-100 px-3 py-2 bg-gray-50 rounded-t-xl grid gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
        style={{ gridTemplateColumns: 'minmax(130px,1.5fr) minmax(80px,0.8fr) minmax(110px,1fr) minmax(82px,0.8fr)' }}
      >
        <div>Artifact</div><div>Type</div><div>Date created</div><div className="text-center">Actions</div>
      </div>
      {rows.length === 0 ? (
        <div className="px-3 py-4 text-[13px] text-gray-500">No artifacts found for this person in that period.</div>
      ) : rows.map((r) => (
        <div key={r.id} className="grid gap-2 px-3 py-3 border-b border-gray-50 last:border-0 items-center"
          style={{ gridTemplateColumns: 'minmax(130px,1.5fr) minmax(80px,0.8fr) minmax(110px,1fr) minmax(82px,0.8fr)' }}
        >
          <span className="text-[12px] text-gray-800 truncate">{r.name}</span>
          <span className="text-[12px] text-gray-700">{asArtifactTypeLabel(r.type)}</span>
          <span className="text-[12px] text-gray-600">{r.createdAt}</span>
          <ViewEditActionIcons />
        </div>
      ))}
    </FakeTableWrap>
  );
}

function renderStorage(q: string): DriveFakeReply | null {
  if (
    /\b(storage|quota|capacity|usage)\b/.test(q) &&
    /\b(department|team|teams|departmental|division|who uses|biggest consumer)\b/.test(q)
  ) {
    return {
      preamble: 'Here’s a snapshot of modeled storage usage by department (demo data):',
      body: <StorageByDeptBody />,
    };
  }
  return null;
}

function renderSignatures(q: string): DriveFakeReply | null {
  if (/\b(pending\s+signature|awaiting\s+signature|documents?\s+(awaiting|needing)|need\s+(to\s+)?sign)\b/i.test(q) || (/\bpending\b/.test(q) && /\bsign/.test(q))) {
    return {
      preamble:
        'Below are envelopes that are still awaiting signature—follow up before the dates shown (prototype data):',
      body: <PendingSignaturesBody />,
    };
  }
  return null;
}

function renderSharing(q: string): DriveFakeReply | null {
  if (/\brecent\s+share|who\s+shared|sharing\s+activity|document\s+shares\b/.test(q)) {
    return {
      preamble: 'Latest sharing activity surfaced on Collaboration Drive today (demo):',
      body: <SharingActivityBody />,
    };
  }
  return null;
}

function renderLeaderboard(q: string): DriveFakeReply | null {
  const asksRanking =
    /\b(top\s+creators?|leaderboard|most\s+reports?|most\s+documents?|ranks?\s+by\s+documents?|who\s+created\s+the\s+most)\b/.test(q);
  const asksCreatedInPeriod =
    /\b(creat(?:e|ed|ion)|new|uploaded)\b/.test(q) &&
    /\b(documents?|reports?)\b/.test(q) &&
    (/\b(last|this)\s+(year|month|week|quarter)\b/.test(q) || /\bin\s+last\s+year\b/.test(q));

  if (
    asksRanking ||
    asksCreatedInPeriod
  ) {
    return {
      preamble:
        'Here are users with the highest count of newly created reports and documents in the selected period (prototype):',
      body: <TopCreatorsBody rangeLabel={resolveReportingRangeLabel(q)} />,
    };
  }
  return null;
}

function renderCreatedToday(q: string): DriveFakeReply | null {
  const mentionsToday = /\b(today|this\s+morning)\b/.test(q);
  const creationContext =
    /\b(created|create|creation|new\s+documents?|uploaded|who\s+created|what\s+was\s+created)\b/.test(q);
  if (
    (mentionsToday && creationContext) ||
    /\bdocuments?\s+created\s+today\b/.test(q) ||
    /\bwhat\s+(was|got)\s+created\s+today\b/.test(q)
  ) {
    return {
      preamble: 'People who created documents on Drive today, with timestamps (prototype data):',
      body: <DocumentsTodayBodyFixed />,
    };
  }
  return null;
}

function renderLatestArtifact(q: string): DriveFakeReply | null {
  const asksLatest =
    /\b(last|latest|most\s+recent)\b/.test(q) &&
    /\b(created|create|new)\b/.test(q) &&
    /\b(document|report|app|workflow|artifact)\b/.test(q);
  if (!asksLatest) return null;

  const latest = artifactItems()
    .map((i) => ({ item: i, created: parseCreatedAt(i) }))
    .filter((x): x is { item: ArtifactItem; created: Date } => !!x.created)
    .sort((a, b) => b.created.getTime() - a.created.getTime())[0]?.item ?? null;

  return {
    preamble: latest
      ? 'This is the latest created artifact from the Home table dataset:'
      : 'I could not find any artifact from the Home table dataset.',
    body: <LatestArtifactBody row={latest} />,
  };
}

function renderMostArtifactsByPeriod(q: string): DriveFakeReply | null {
  const asksMostArtifacts =
    /\b(most|top|highest)\b/.test(q) &&
    /\b(artifact|artifacts|document|documents|report|reports|app|apps|workflow|workflows)\b/.test(q) &&
    hasPeriodPhrase(q);
  if (!asksMostArtifacts) return null;

  const period = resolvePeriodWindow(q);
  const counts = new Map<string, number>();
  artifactItems()
    .filter((i) => itemInWindow(i, period.start, period.end))
    .forEach((i) => counts.set(i.owner, (counts.get(i.owner) ?? 0) + 1));
  const rows = Array.from(counts.entries())
    .map(([owner, count]) => ({ owner, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    preamble: 'Here are users who created the most artifacts in that period:',
    body: <MostArtifactsBody rows={rows} periodLabel={period.label} />,
  };
}

function renderArtifactListByPeriod(q: string): DriveFakeReply | null {
  const asksList =
    /\b(list|show|give me|what are)\b/.test(q) &&
    /\b(artifact|artifacts|document|documents|report|reports|app|apps|workflow|workflows)\b/.test(q) &&
    /\b(name|names|created)\b/.test(q) &&
    hasPeriodPhrase(q);
  if (!asksList) return null;

  const period = resolvePeriodWindow(q);
  const rows = artifactItems()
    .filter((i) => itemInWindow(i, period.start, period.end))
    .sort((a, b) => {
      const da = parseCreatedAt(a)?.getTime() ?? 0;
      const db = parseCreatedAt(b)?.getTime() ?? 0;
      return db - da;
    })
    .slice(0, 12);

  return {
    preamble: 'Here is the artifact list created in the selected period:',
    body: <ArtifactListBody rows={rows} periodLabel={period.label} />,
  };
}

function renderSpecificPersonArtifacts(q: string): DriveFakeReply | null {
  const person = resolvePersonFromQuery(q);
  if (!person) return null;

  const asksPersonArtifacts =
    /\b(what|show|list|tell me)\b/.test(q) &&
    /\b(created|create|built|made)\b/.test(q) &&
    (
      /\b(artifact|artifacts|document|documents|report|reports|app|apps|workflow|workflows)\b/.test(q) ||
      /\b(myself|me|i|mine)\b/.test(q)
    );
  if (!asksPersonArtifacts) return null;

  if (!hasPeriodPhrase(q)) {
    return {
      preamble: `I can do that for ${person}. Please include a period such as "last week", "last 2 weeks", or "last year".`,
      body: <FakeTableWrap><div className="px-3 py-3 text-[13px] text-gray-600">Example: “What did {person === 'Me' ? 'I' : person} create in the last 2 weeks?”</div></FakeTableWrap>,
    };
  }

  const period = resolvePeriodWindow(q);
  const rows = artifactItems()
    .filter((i) => i.owner.toLowerCase() === person.toLowerCase())
    .filter((i) => itemInWindow(i, period.start, period.end))
    .sort((a, b) => {
      const da = parseCreatedAt(a)?.getTime() ?? 0;
      const db = parseCreatedAt(b)?.getTime() ?? 0;
      return db - da;
    });

  return {
    preamble: `${person} created the following artifacts in ${period.label}:`,
    body: <PersonArtifactsBody rows={rows} />,
  };
}

/** Drive-only demo replies matching common analytics-style questions (no backend). Order: most specific first. */
export function matchDriveFakeReply(userText: string): DriveFakeReply | null {
  const q = normalizeQuery(userText);
  if (!q) return null;

  return (
    renderSpecificPersonArtifacts(q) ??
    renderLatestArtifact(q) ??
    renderMostArtifactsByPeriod(q) ??
    renderArtifactListByPeriod(q) ??
    renderStorage(q) ??
    renderSignatures(q) ??
    renderSharing(q) ??
    renderLeaderboard(q) ??
    renderCreatedToday(q)
  );
}

/** Shown when the user has no API key and the message did not match a demo scenario. */
export const DRIVE_CHAT_DEMO_PROMPTS = [
  'Who created documents today?',
  'Who created the most reports this quarter?',
  'Who created the last document, report, app, or workflow?',
  'Who created the most artifacts in the last 2 weeks?',
  'Give me artifact names created in the last year',
  'What did I create in the last week?',
  'Show pending signatures',
  'Recent shares on Drive today',
  'Storage usage by department',
];

export function driveChatNoMatchWithoutKeyReply(): DriveFakeReply {
  return {
    preamble:
      'Collaboration Drive can answer analytics-style questions in this prototype (no API key required). Try one of:',
    body: (
      <FakeTableWrap>
        <ul className="px-4 py-3 space-y-2 text-[13px] text-gray-700 list-disc list-inside">
          {DRIVE_CHAT_DEMO_PROMPTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </FakeTableWrap>
    ),
  };
}
