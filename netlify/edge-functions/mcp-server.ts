import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Config } from "@netlify/edge-functions";
import { skillsList } from "../skills/index.ts";

export default async function handler(req: Request): Promise<Response> {
  try {
    const server = new McpServer({ name: "test", version: "1.0.0" }, { capabilities: { logging: {} } });
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    await server.connect(transport);
    await server.close();
    return new Response(JSON.stringify({ ok: true, skillsCount: skillsList.length, sdk: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    return new Response(msg, { status: 500, headers: { "Content-Type": "text/plain" } });
  }
}

export const config: Config = {
  path: ["/mcp"],
  method: ["POST", "GET"],
};
