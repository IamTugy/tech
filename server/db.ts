import { Database } from "bun:sqlite";
import { mkdirSync } from "fs";
import { dirname } from "path";

const DB_PATH = process.env.DB_PATH ?? "/data/tech.db";

mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH, { create: true });

db.run(`
  CREATE TABLE IF NOT EXISTS tech (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    logo_url TEXT,
    category TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
  )
`);

// Seed with existing entries if the table is empty
const { count } = db.query<{ count: number }, []>("SELECT COUNT(*) as count FROM tech").get()!;
if (count === 0) {
  const insert = db.prepare(
    "INSERT INTO tech (name, description, url, category) VALUES (?, ?, ?, ?)"
  );
  db.transaction(() => {
    insert.run("Arc Browser", "A Chromium-based browser that reimagines browsing through automation and smart tab management.", "https://arc.net/", "Productivity");
    insert.run("Jam", "Chrome extension that captures bug reports with network logs, console output, and instant replay.", "https://jam.dev/", "Dev Tools");
    insert.run("Excalidraw", "Open-source virtual whiteboard for sketching diagrams, wireframes, and architecture.", "https://excalidraw.com/", "Productivity");
    insert.run("Perplexity", "AI research engine that cites sources — great for product research, trends, and quick deep-dives.", "https://www.perplexity.ai/", "AI");
    insert.run("Storybook", "Develops and documents UI components in isolation with visual testing built in.", "https://storybook.js.org/", "Frontend");
    insert.run("Tailwind CSS", "Utility-first CSS framework that acts as a force multiplier for experienced developers.", "https://tailwindcss.com/", "Frontend");
  })();
}

export interface TechEntry {
  id: number;
  name: string;
  description: string;
  url: string;
  logo_url: string | null;
  category: string | null;
  created_at: string;
}

export const listTech = (): TechEntry[] =>
  db.query<TechEntry, []>("SELECT * FROM tech ORDER BY created_at DESC").all();

export const addTech = (
  entry: Omit<TechEntry, "id" | "created_at">
): TechEntry =>
  db
    .prepare<TechEntry, [string, string, string, string | null, string | null]>(
      "INSERT INTO tech (name, description, url, logo_url, category) VALUES (?, ?, ?, ?, ?) RETURNING *"
    )
    .get(
      entry.name,
      entry.description,
      entry.url,
      entry.logo_url ?? null,
      entry.category ?? null
    )!;

export const updateTech = (
  id: number,
  fields: Partial<Omit<TechEntry, "id" | "created_at">>
): TechEntry | null =>
  db
    .prepare<TechEntry, [string | null, string | null, string | null, string | null, string | null, number]>(
      `UPDATE tech SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        url = COALESCE(?, url),
        logo_url = COALESCE(?, logo_url),
        category = COALESCE(?, category)
       WHERE id = ? RETURNING *`
    )
    .get(
      fields.name ?? null,
      fields.description ?? null,
      fields.url ?? null,
      fields.logo_url ?? null,
      fields.category ?? null,
      id
    ) ?? null;

export const deleteTech = (id: number): boolean => {
  db.prepare("DELETE FROM tech WHERE id = ?").run(id);
  return db.query<{ changes: number }, []>("SELECT changes() as changes").get()!.changes > 0;
};
