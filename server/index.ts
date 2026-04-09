import { listTech, addTech, updateTech, deleteTech } from "./db";
import { join } from "path";

const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;
const DIST = join(import.meta.dir, "../dist");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Webhook-Token",
};

Bun.serve({
  port: 3000,

  async fetch(req) {
    const { pathname } = new URL(req.url);

    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

    // GET /api/tech — list all entries
    if (req.method === "GET" && pathname === "/api/tech") {
      return Response.json(listTech(), { headers: CORS });
    }

    // POST /api/webhook/add — add a new entry
    if (req.method === "POST" && pathname === "/api/webhook/add") {
      const token = req.headers.get("X-Webhook-Token");
      if (!WEBHOOK_TOKEN || token !== WEBHOOK_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }

      let body: Record<string, unknown>;
      try {
        body = (await req.json()) as Record<string, unknown>;
      } catch {
        return new Response("Invalid JSON", { status: 400 });
      }

      const { name, description, url, logo_url, category } = body;
      if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof url !== "string" ||
        !name || !description || !url
      ) {
        return new Response("Missing required fields: name, description, url", { status: 400 });
      }

      const entry = addTech({
        name,
        description,
        url,
        logo_url: typeof logo_url === "string" ? logo_url : null,
        category: typeof category === "string" ? category : null,
      });
      return Response.json(entry, { status: 201, headers: CORS });
    }

    // PUT /api/webhook/update/:id — update an entry
    const updateMatch = pathname.match(/^\/api\/webhook\/update\/(\d+)$/);
    if (req.method === "PUT" && updateMatch) {
      const token = req.headers.get("X-Webhook-Token");
      if (!WEBHOOK_TOKEN || token !== WEBHOOK_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }
      const id = parseInt(updateMatch[1]);
      let body: Record<string, unknown>;
      try { body = (await req.json()) as Record<string, unknown>; }
      catch { return new Response("Invalid JSON", { status: 400 }); }

      const updated = updateTech(id, {
        name: typeof body.name === "string" ? body.name : undefined,
        description: typeof body.description === "string" ? body.description : undefined,
        url: typeof body.url === "string" ? body.url : undefined,
        logo_url: typeof body.logo_url === "string" ? body.logo_url : undefined,
        category: typeof body.category === "string" ? body.category : undefined,
      });
      if (!updated) return new Response("Not found", { status: 404 });
      return Response.json(updated, { headers: CORS });
    }

    // DELETE /api/webhook/delete/:id — remove an entry
    const deleteMatch = pathname.match(/^\/api\/webhook\/delete\/(\d+)$/);
    if (req.method === "DELETE" && deleteMatch) {
      const token = req.headers.get("X-Webhook-Token");
      if (!WEBHOOK_TOKEN || token !== WEBHOOK_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }
      const id = parseInt(deleteMatch[1]);
      const deleted = deleteTech(id);
      if (!deleted) return new Response("Not found", { status: 404 });
      return new Response(null, { status: 204 });
    }

    // Static file serving with SPA fallback
    const filePath = pathname === "/" ? "/index.html" : pathname;
    const file = Bun.file(join(DIST, filePath));
    if (await file.exists()) return new Response(file);

    return new Response(Bun.file(join(DIST, "index.html")));
  },
});

console.log("Tech server running on :3000");
