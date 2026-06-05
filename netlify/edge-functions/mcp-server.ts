import type { Config } from "@netlify/edge-functions";
import { skillsMap, skillsList, workflowGraph, objectiveIndex } from "../skills/index.ts";

const CATEGORIAS_VALIDAS = [
  "Fundação",
  "Criação do Produto",
  "Venda e Monetização",
  "Conteúdo e SEO",
  "Promoção",
  "Análise e Qualidade",
];

const TOOLS = [
  {
    name: "buscar_skill_dp",
    description: "Retorna o conteúdo completo de um skill dp-createur pelo nome.",
    inputSchema: {
      type: "object",
      properties: {
        nome_skill: { type: "string", description: "Nome do skill (ex: dp-business-profile)" },
      },
      required: ["nome_skill"],
    },
  },
  {
    name: "listar_skills_dp",
    description: "Lista todos os 24 skills dp-createur agrupados por categoria.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "buscar_skills_por_categoria",
    description: "Retorna todos os skills de uma categoria específica.",
    inputSchema: {
      type: "object",
      properties: {
        categoria: { type: "string", description: `Categoria (${CATEGORIAS_VALIDAS.join(", ")})` },
      },
      required: ["categoria"],
    },
  },
  {
    name: "obter_proximo_skill",
    description: "Retorna os próximos skills recomendados no workflow após um skill atual.",
    inputSchema: {
      type: "object",
      properties: {
        skill_atual: { type: "string", description: "Nome do skill atual (ex: dp-business-profile)" },
      },
      required: ["skill_atual"],
    },
  },
  {
    name: "buscar_skills_por_objetivo",
    description: "Retorna skills recomendados com base em um objetivo em português.",
    inputSchema: {
      type: "object",
      properties: {
        objetivo: { type: "string", description: "Objetivo (ex: criar ebook, lançar produto)" },
      },
      required: ["objetivo"],
    },
  },
];

function textResult(text: string) {
  return { content: [{ type: "text", text }] };
}

function callTool(name: string, args: Record<string, string>) {
  if (name === "buscar_skill_dp") {
    const skill = skillsMap[args.nome_skill];
    if (!skill) {
      const nomes = Object.keys(skillsMap).join(", ");
      return textResult(`Skill "${args.nome_skill}" não encontrado. Skills válidos: ${nomes}`);
    }
    return textResult(skill.conteudo);
  }

  if (name === "listar_skills_dp") {
    const grupos: Record<string, string[]> = {};
    for (const cat of CATEGORIAS_VALIDAS) grupos[cat] = [];
    for (const s of skillsList) {
      if (grupos[s.categoria]) grupos[s.categoria].push(`- ${s.nome}: ${s.descricao}`);
    }
    const linhas: string[] = [];
    for (const cat of CATEGORIAS_VALIDAS) {
      linhas.push(`## ${cat}`);
      linhas.push(...(grupos[cat].length > 0 ? grupos[cat] : ["(nenhum skill nesta categoria)"]));
      linhas.push("");
    }
    return textResult(linhas.join("\n").trim());
  }

  if (name === "buscar_skills_por_categoria") {
    if (!CATEGORIAS_VALIDAS.includes(args.categoria)) {
      return textResult(`Categoria "${args.categoria}" inválida. Válidas: ${CATEGORIAS_VALIDAS.join(", ")}`);
    }
    const filtrados = skillsList.filter((s) => s.categoria === args.categoria);
    return textResult(
      filtrados.length > 0
        ? filtrados.map((s) => `- ${s.nome}: ${s.descricao}`).join("\n")
        : `Nenhum skill na categoria "${args.categoria}".`
    );
  }

  if (name === "obter_proximo_skill") {
    const proximos = workflowGraph[args.skill_atual];
    if (!proximos || proximos.length === 0) {
      return textResult(`[]\n\nNenhum sucessor para "${args.skill_atual}".`);
    }
    return textResult(JSON.stringify(proximos));
  }

  if (name === "buscar_skills_por_objetivo") {
    const low = args.objetivo.toLowerCase();
    let encontrados: string[] = [];
    for (const [chave, nomes] of Object.entries(objectiveIndex)) {
      if (chave.toLowerCase().includes(low) || low.includes(chave.toLowerCase())) {
        encontrados = [...new Set([...encontrados, ...nomes])];
      }
    }
    if (encontrados.length === 0) {
      return textResult(`[]\n\nNenhum skill para "${args.objetivo}". Tente: ${Object.keys(objectiveIndex).join(", ")}`);
    }
    const linhas = encontrados.map((nome) => {
      const s = skillsMap[nome];
      if (!s) return `- ${nome}`;
      const desc = s.descricao.length > 280 ? s.descricao.slice(0, 277) + "..." : s.descricao;
      return `- ${nome}: ${desc}`;
    });
    return textResult(linhas.join("\n"));
  }

  return { content: [{ type: "text", text: `Ferramenta "${name}" não encontrada.` }], isError: true };
}

function jsonrpc(id: unknown, result: unknown) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, result }), {
    headers: { "Content-Type": "application/json" },
  });
}

function jsonrpcError(id: unknown, code: number, message: string) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "GET") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
  }

  let body: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return jsonrpcError(null, -32700, "Parse error");
  }

  const { id, method, params = {} } = body;

  // Notifications have no id — return 202 with no body
  if (id === undefined || id === null) {
    return new Response(null, { status: 202 });
  }

  if (method === "initialize") {
    return jsonrpc(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "DP Criador PT-BR", version: "1.0.0" },
    });
  }

  if (method === "tools/list") {
    return jsonrpc(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const name = params.name as string;
    const args = (params.arguments ?? {}) as Record<string, string>;
    const result = callTool(name, args);
    return jsonrpc(id, result);
  }

  return jsonrpcError(id, -32601, `Method not found: ${method}`);
}

export const config: Config = {
  path: ["/mcp"],
  method: ["POST", "GET"],
};
