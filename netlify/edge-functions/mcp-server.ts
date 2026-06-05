import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { toFetchResponse, toReqRes } from "fetch-to-node";
import z from "zod";
import type { Config } from "@netlify/edge-functions";
import { skillsMap, skillsList, workflowGraph, objectiveIndex } from "./skills/index.ts";

const CATEGORIAS_VALIDAS = [
  "Fundação",
  "Criação do Produto",
  "Venda e Monetização",
  "Conteúdo e SEO",
  "Promoção",
  "Análise e Qualidade",
];

function getServer(): McpServer {
  const server = new McpServer(
    {
      name: "DP Criador PT-BR",
      version: "1.0.0",
    },
    {
      capabilities: {
        logging: {},
      },
    }
  );

  // Ferramenta 1: buscar_skill_dp
  server.registerTool(
    "buscar_skill_dp",
    {
      title: "Buscar Skill DP",
      description: "Retorna o conteúdo completo de um skill dp-createur pelo nome.",
      inputSchema: { nome_skill: z.string().describe("Nome do skill dp-createur (ex: dp-business-profile)") },
    },
    async ({ nome_skill }) => {
      const skill = skillsMap[nome_skill];
      if (!skill) {
        const nomes = Object.keys(skillsMap).join(", ");
        return {
          content: [
            {
              type: "text" as const,
              text: `Skill "${nome_skill}" não encontrado. Os 24 skills válidos são: ${nomes}`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: skill.conteudo,
          },
        ],
      };
    }
  );

  // Ferramenta 2: listar_skills_dp
  server.registerTool(
    "listar_skills_dp",
    {
      title: "Listar Skills DP",
      description: "Lista todos os 24 skills dp-createur agrupados por categoria.",
      inputSchema: {},
    },
    async () => {
      try {
        const grupos: Record<string, string[]> = {};
        for (const cat of CATEGORIAS_VALIDAS) {
          grupos[cat] = [];
        }
        for (const skill of skillsList) {
          if (grupos[skill.categoria] !== undefined) {
            grupos[skill.categoria].push(`- ${skill.nome}: ${skill.descricao}`);
          }
        }
        const linhas: string[] = [];
        for (const cat of CATEGORIAS_VALIDAS) {
          linhas.push(`## ${cat}`);
          if (grupos[cat].length > 0) {
            linhas.push(...grupos[cat]);
          } else {
            linhas.push("(nenhum skill nesta categoria)");
          }
          linhas.push("");
        }
        return {
          content: [
            {
              type: "text" as const,
              text: linhas.join("\n").trim(),
            },
          ],
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
          content: [
            {
              type: "text" as const,
              text: `Erro ao listar skills: ${msg}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Ferramenta 3: buscar_skills_por_categoria
  server.registerTool(
    "buscar_skills_por_categoria",
    {
      title: "Buscar Skills por Categoria",
      description: "Retorna todos os skills de uma categoria específica.",
      inputSchema: { categoria: z.string().describe("Categoria dos skills (ex: Fundação)") },
    },
    async ({ categoria }) => {
      if (!CATEGORIAS_VALIDAS.includes(categoria)) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Categoria "${categoria}" inválida. As 6 categorias válidas são: ${CATEGORIAS_VALIDAS.join(", ")}`,
            },
          ],
        };
      }
      const filtrados = skillsList.filter((s) => s.categoria === categoria);
      const linhas = filtrados.map((s) => `- ${s.nome}: ${s.descricao}`);
      return {
        content: [
          {
            type: "text" as const,
            text: linhas.length > 0 ? linhas.join("\n") : `Nenhum skill encontrado na categoria "${categoria}".`,
          },
        ],
      };
    }
  );

  // Ferramenta 4: obter_proximo_skill
  server.registerTool(
    "obter_proximo_skill",
    {
      title: "Obter Próximo Skill",
      description: "Retorna os próximos skills recomendados no workflow após um skill atual.",
      inputSchema: { skill_atual: z.string().describe("Nome do skill atual (ex: dp-business-profile)") },
    },
    async ({ skill_atual }) => {
      const proximos = workflowGraph[skill_atual];
      if (!proximos || proximos.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `[]\n\nNenhum sucessor encontrado para "${skill_atual}". Verifique se o nome está correto ou se este é um skill final do workflow.`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(proximos),
          },
        ],
      };
    }
  );

  // Ferramenta 5: buscar_skills_por_objetivo
  server.registerTool(
    "buscar_skills_por_objetivo",
    {
      title: "Buscar Skills por Objetivo",
      description: "Retorna skills recomendados com base em um objetivo descrito em português.",
      inputSchema: { objetivo: z.string().describe("Objetivo desejado (ex: criar ebook, lançar produto)") },
    },
    async ({ objetivo }) => {
      const objetivoLower = objetivo.toLowerCase();
      let nomesEncontrados: string[] = [];

      for (const [chave, nomes] of Object.entries(objectiveIndex)) {
        if (chave.toLowerCase().includes(objetivoLower) || objetivoLower.includes(chave.toLowerCase())) {
          nomesEncontrados = [...new Set([...nomesEncontrados, ...nomes])];
        }
      }

      if (nomesEncontrados.length === 0) {
        const chaves = Object.keys(objectiveIndex).join(", ");
        return {
          content: [
            {
              type: "text" as const,
              text: `[]\n\nNenhum skill encontrado para o objetivo "${objetivo}". Tente objetivos como: ${chaves}`,
            },
          ],
        };
      }

      const linhas = nomesEncontrados.map((nome) => {
        const skill = skillsMap[nome];
        if (!skill) return `- ${nome}`;
        const descricao = skill.descricao.length > 280 ? skill.descricao.slice(0, 277) + "..." : skill.descricao;
        return `- ${nome}: ${descricao}`;
      });

      return {
        content: [
          {
            type: "text" as const,
            text: linhas.join("\n"),
          },
        ],
      };
    }
  );

  return server;
}

function formatErrorResponse(message: string): { content: Array<{ type: "text"; text: string }> } {
  return {
    content: [
      {
        type: "text",
        text: message,
      },
    ],
  };
}

// Netlify Edge Function Handler
export default async function handler(req: Request): Promise<Response> {
  if (req.method === "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Content-Type": "text/plain",
        Allow: "POST",
      },
    });
  }
  try {
    const { req: nodeReq, res: nodeRes } = toReqRes(req);
    const server = getServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // Stateless mode
    });
    await server.connect(transport);

    // Parse request body as JSON
    const body = await req.json();

    // Handle the request through the transport
    await transport.handleRequest(nodeReq, nodeRes, body);

    // Handle response closing
    nodeRes.on("close", () => {
      transport.close();
      server.close();
    });

    // Convert Node.js ServerResponse back to Web API Response
    return toFetchResponse(nodeRes);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erro no servidor MCP:", errorMessage);
    return Response.json(formatErrorResponse(errorMessage), {
      status: 500,
    });
  }
}

export const config: Config = {
  path: ["/mcp"],
  method: ["POST", "GET"],
};
