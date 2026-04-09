import type { TechEntry } from "../App";
import Highlight from "./Highlight";

function faviconUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

export default function TechCard({
  entry,
  isNew,
  searchTerms,
}: {
  entry: TechEntry;
  isNew: boolean;
  searchTerms: string[];
}) {
  const logoSrc = entry.logo_url ?? faviconUrl(entry.url);

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noreferrer"
      className="relative group flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-white/[0.1] hover:bg-white/[0.04]"
    >
      {/* Logo + name row */}
      <div className="flex items-center gap-2.5">
        {logoSrc && (
          <img
            src={logoSrc}
            alt=""
            className="h-5 w-5 rounded-sm object-contain opacity-90 shrink-0"
          />
        )}
        <span className="text-sm font-medium text-slate-100 leading-none">
          <Highlight text={entry.name} terms={searchTerms} />
        </span>
        {isNew && (
          <span className="relative flex h-2 w-2 ml-1 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
        )}
        {entry.category && (
          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/[0.05] text-slate-500 shrink-0">
            <Highlight text={entry.category} terms={searchTerms} />
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
        <Highlight text={entry.description} terms={searchTerms} />
      </p>
    </a>
  );
}
