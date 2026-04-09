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

export function App() {
  const [entries, setEntries] = useState<TechEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const newSince = useRef<string | null>(null);

  useEffect(() => {
    // Read last visit timestamp before updating it
    newSince.current = localStorage.getItem(LS_KEY);
    localStorage.setItem(LS_KEY, new Date().toISOString());

    fetch("/api/tech")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data as TechEntry[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isNew = (entry: TechEntry) =>
    newSince.current !== null && entry.created_at > newSince.current;

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-300 px-6 py-10">
      <header className="max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
          Tugy's Tech List
        </h1>
        <p className="text-sm text-slate-500 mt-1">Technologies I love to use</p>
      </header>

      <main className="max-w-5xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {entries.map((entry) => (
              <TechCard key={entry.id} entry={entry} isNew={isNew(entry)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
