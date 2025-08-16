"use client";

import { useMemo, useState } from "react";

function normalize(s: unknown) {
  return String(s || "").trim().replace(/^@+/, "").toLowerCase();
}

// Parse usernames from JSON, CSV, or one-per-line text
function parseUsernames(text: string): string[] {
  if (!text) return [];
  // Try JSON first
  try {
    const j = JSON.parse(text);
    if (Array.isArray(j)) {
      return j
        .map((x) =>
          typeof x === "string"
            ? x
            : (x as any)?.username ?? (x as any)?.user ?? (x as any)?.name ?? ""
        )
        .filter(Boolean)
        .map(normalize);
    }
  } catch {}
  // CSV/TSV header check
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const header = lines[0].split(/[;,\t]/).map((h) => h.trim().toLowerCase());
  const idx = header.findIndex((h) =>
    ["username", "user", "handle", "name"].includes(h)
  );
  if (idx >= 0) {
    return lines
      .slice(1)
      .map((ln) => (ln.split(/[;,\t]/)[idx] ?? ""))
      .map(normalize)
      .filter(Boolean);
  }
  // Fallback: one username per line
  return lines.map(normalize).filter(Boolean);
}

function duplicateCount(list: string[]) {
  const seen = new Map<string, number>();
  for (const u of list) seen.set(u, (seen.get(u) ?? 0) + 1);
  let dups = 0;
  for (const [, count] of seen) if (count > 1) dups += count - 1;
  return dups;
}

export default function ComparePage() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");

  const oldList = useMemo(() => parseUsernames(oldText), [oldText]);
  const newList = useMemo(() => parseUsernames(newText), [newText]);

  const { unfollowed, newFollowers, unchanged } = useMemo(() => {
    const A = new Set(oldList);     //unique old followers
    const B = new Set(newList);     //unique new followers
    return {
      unfollowed: [...A].filter((u) => !B.has(u)),
      newFollowers: [...B].filter((u) => !A.has(u)),
      unchanged: [...B].filter((u) => A.has(u)),
    };  
  }, [oldList, newList]);

  const oldDupes = useMemo(() => duplicateCount(oldList), [oldList]);
  const newDupes = useMemo(() => duplicateCount(newList), [newList]);

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Compare followers</h1>
      <p className="text-slate-600">
        Paste two snapshots (old vs. new). Supports JSON, CSV, or one-per-line
        text.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Old snapshot
          </label>
          <textarea
            className="w-full min-h-[160px] rounded-lg border p-3"
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder={`alice\nbob\ncarla`}
          />
          <div className="text-xs text-slate-500">
            Duplicates: <span className="font-medium">{oldDupes}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            New snapshot
          </label>
          <textarea
            className="w-full min-h-[160px] rounded-lg border p-3"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder={`alice\ncarla\nzoe`}
          />
          <div className="text-xs text-slate-500">
            Duplicates: <span className="font-medium">{newDupes}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50"
          onClick={() => {
            setOldText("");
            setNewText("");
          }}
        >
          Reset
        </button>

        <span className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
          <span className="text-slate-500">Old:</span>{" "}
          <strong>{oldList.length}</strong>
        </span>
        <span className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
          <span className="text-slate-500">New:</span>{" "}
          <strong>{newList.length}</strong>
        </span>
        <span className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
          <span className="text-slate-500">Unchanged:</span>{" "}
          <strong>{unchanged.length}</strong>
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <List title={`Unfollowed (${unfollowed.length})`} items={unfollowed} />
        <List
          title={`New followers (${newFollowers.length})`}
          items={newFollowers}
        />
        <List title={`Unchanged (${unchanged.length})`} items={unchanged} />
      </div>
    </main>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      {items.length ? (
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {items.map((u) => (
            <li key={u} className="px-3 py-2 rounded-lg bg-slate-50 border">
              @{u}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm">Nothing to show.</p>
      )}
    </section>
  );
}
