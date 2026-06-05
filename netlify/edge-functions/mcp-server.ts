import type { Config } from "@netlify/edge-functions";
import { skillsList } from "../skills/index.ts";

export default async function handler(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ ok: true, skillsCount: skillsList.length }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  path: ["/mcp"],
  method: ["POST", "GET"],
};
