import { useEffect, useState, useRef } from "react";
import TechCard from "./components/TechCard";

export interface TechEntry {
  id: number;
  name: string;
  description: string;
  url: string;
  logo_url: string | null;
  category: string | null;
  created_at: string;
}

const LS_KEY = "tech_last_visit";

function SearchBar({
  tags,
  onAddTag,
  onRemoveTag,
  onLiveChange,
}: {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  onLiveChange: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onLiveChange(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      onAddTag(value.trim().toLowerCase());
      setValue("");
      onLiveChange("");
    }
    if (e.key === "Backspace" && !value && tags.length > 0) {
      onRemoveTag(tags.length - 1);
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 cursor-text focus-within:border-white/[0.1] transition-colors"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, i) => (
        <span
          key={i}
          className="flex items-center gap-1 rounded-md bg-white/[0.08] px-2 py-0.5 text-xs text-slate-300 shrink-0"
        >
          {tag}
          <button
            onClick={(e) => { e.stopPropagation(); onRemoveTag(i); }}
            className="text-slate-500 hover:text-slate-200 transition-colors leading-none ml-0.5"
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Name, description or category — press Enter to pin" : "Add another filter…"}
        className="flex-1 min-w-32 bg-transparent text-xs text-slate-200 placeholder-slate-600 outline-none"
      />
    </div>
  );
}

export function App() {
  const [entries, setEntries] = useState<TechEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [liveQuery, setLiveQuery] = useState("");
  const newSince = useRef<string | null>(null);

  useEffect(() => {
    newSince.current = localStorage.getItem(LS_KEY);
    localStorage.setItem(LS_KEY, new Date().toISOString());

    fetch("/api/tech")
      .then((r) => r.json())
      .then((data) => { setEntries(data as TechEntry[]); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const isNew = (entry: TechEntry) =>
    newSince.current !== null && entry.created_at > newSince.current;

  // All active terms: committed tags + live input
  const allTerms = [...searchTags, liveQuery.trim().toLowerCase()].filter(Boolean);

  const filtered = entries.filter((entry) =>
    allTerms.every((term) =>
      entry.name.toLowerCase().includes(term) ||
      entry.description.toLowerCase().includes(term) ||
      (entry.category?.toLowerCase().includes(term) ?? false)
    )
  );

  function addTag(tag: string) {
    if (!searchTags.includes(tag)) setSearchTags((prev) => [...prev, tag]);
    setLiveQuery("");
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-300 px-6 py-10">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
          Tugy's Tech List
        </h1>
        <p className="text-sm text-slate-500 mt-1">Technologies I love to use</p>
      </header>

      <div className="max-w-5xl mx-auto mb-6">
        <SearchBar
          tags={searchTags}
          onAddTag={addTag}
          onRemoveTag={(i) => setSearchTags((prev) => prev.filter((_, idx) => idx !== i))}
          onLiveChange={setLiveQuery}
        />
      </div>

      <main className="max-w-5xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-600 text-center py-12">No results.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((entry) => (
              <TechCard
                key={entry.id}
                entry={entry}
                isNew={isNew(entry)}
                searchTerms={allTerms}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
