import type { TechEntry } from "../App";

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
}: {
  entry: TechEntry;
  isNew: boolean;
}) {
  const logoSrc = entry.logo_url ?? faviconUrl(entry.url);

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noreferrer"
      className="relative group flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-white/[0.1] hover:bg-white/[0.04]"
    >
      {/* New indicator */}
      {isNew && (
        <span className="absolute top-3 right-3 flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-[10px] font-medium text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
            new
          </span>
        </span>
      )}

      {/* Logo + name row */}
      <div className="flex items-center gap-2.5">
        {logoSrc && (
          <img
            src={logoSrc}
            alt=""
            className="h-5 w-5 rounded-sm object-contain opacity-90"
          />
        )}
        <span className="text-sm font-medium text-slate-100 leading-none">
          {entry.name}
        </span>
        {entry.category && (
          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/[0.05] text-slate-500">
            {entry.category}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
        {entry.description}
      </p>
    </a>
  );
}
