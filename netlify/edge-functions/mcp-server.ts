import type { Config } from "@netlify/edge-functions";

export default async function handler(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ ok: true, method: req.method }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  path: ["/mcp"],
  method: ["POST", "GET"],
};
