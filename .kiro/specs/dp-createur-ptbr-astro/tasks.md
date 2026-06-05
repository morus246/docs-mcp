# Implementation Plan: dp-createur-ptbr-astro

## Overview

Adaptar os 24 skills dp-createur (originalmente em francês) para PT-BR e expô-los como um servidor MCP remoto hospedado no projeto `docs-mcp` via Netlify Edge Functions. O servidor substitui o servidor Astro Docs existente e expõe 5 ferramentas MCP nativas em português do Brasil, com conteúdo dos skills armazenado como módulos TypeScript estáticos.

**Stack:** TypeScript, Deno runtime, `@modelcontextprotocol/sdk ^1.15.1`, `fast-check` (PBT), Netlify Edge Functions.

## Tasks

- [x] 1. Criar tipos e estrutura base dos skills
  - [x] 1.1 Criar o arquivo `netlify/edge-functions/skills/index.ts` com tipos, mapa e dados de workflow
    - Definir e exportar o tipo `SkillCategory` como union type das 6 categorias: `"Fundação" | "Criação do Produto" | "Venda e Monetização" | "Conteúdo e SEO" | "Promoção" | "Análise e Qualidade"`
    - Definir e exportar a interface `SkillRecord` com os campos: `nome: string`, `categoria: SkillCategory`, `descricao: string`, `argumentHint: string`, `allowedTools: string[]`, `conteudo: string`
    - Definir e exportar a interface `WorkflowNext` com campos `skill: string` e `justificativa: string`
    - Exportar `skillsMap: Record<string, SkillRecord>` (preenchido pelos imports dos 24 módulos)
    - Exportar `skillsList: SkillRecord[]` (lista ordenada canônica dos 24 skills)
    - Exportar `workflowGraph: Record<string, WorkflowNext[]>` conforme o grafo definido no design
    - Exportar `objectiveIndex: Record<string, string[]>` conforme o índice definido no design
    - _Requirements: 4.1, 4.3, 4.5, 8.1, 8.3_

- [ ] 2. Implementar os 24 módulos de skills PT-BR — Categoria: Fundação
  - [-] 2.1 Criar `skills/dp-business-profile.ts` com conteúdo traduzido do SKILL.md + referências embutidas
    - Traduzir `SKILL.md` e `references/profile-example.md` do francês para PT-BR
    - Adaptar culturalmente: substituir "FitPro Academy" → "Academia FitPro", €/euros → R$/reais, plataformas conforme tabela do design
    - Concatenar conteúdo das referências ao campo `conteudo`
    - Categoria: `"Fundação"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 2.2 Criar `skills/dp-market-research.ts` com conteúdo traduzido do SKILL.md + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente conforme tabela do design
    - Categoria: `"Fundação"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 2.3 Criar `skills/dp-launch.ts` com conteúdo traduzido do SKILL.md + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Fundação"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_

- [ ] 3. Implementar os 24 módulos de skills PT-BR — Categoria: Criação do Produto
  - [-] 3.1 Criar `skills/dp-playbook-create.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente ("Le Playbook du Coach Fitness" → "Playbook do Coach Fitness", R$ 197)
    - Categoria: `"Criação do Produto"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 3.2 Criar `skills/dp-playbook-section.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Criação do Produto"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 3.3 Criar `skills/dp-ebook-cover.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Criação do Produto"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 3.4 Criar `skills/dp-lead-magnet-create.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Criação do Produto"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_

- [ ] 4. Implementar os 24 módulos de skills PT-BR — Categoria: Venda e Monetização
  - [-] 4.1 Criar `skills/dp-landing-page.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente (Stripe → Stripe/PagSeguro/Pagar.me, Stan Store → Hotmart/Kiwify)
    - Categoria: `"Venda e Monetização"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 4.2 Criar `skills/dp-sales-funnel.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Venda e Monetização"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 4.3 Criar `skills/dp-upsell-strategy.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Venda e Monetização"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_

- [ ] 5. Implementar os 24 módulos de skills PT-BR — Categoria: Conteúdo e SEO
  - [-] 5.1 Criar `skills/dp-blog-strategy.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Conteúdo e SEO"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 5.2 Criar `skills/dp-blog-article.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Conteúdo e SEO"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 5.3 Criar `skills/dp-blog-publish.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Conteúdo e SEO"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 5.4 Criar `skills/dp-email-sequence.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente (ConvertKit → Brevo/RD Station/MailerLite)
    - Categoria: `"Conteúdo e SEO"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 5.5 Criar `skills/dp-social-caption.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Conteúdo e SEO"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_

- [ ] 6. Implementar os 24 módulos de skills PT-BR — Categoria: Promoção
  - [-] 6.1 Criar `skills/dp-ad-angles-meta.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; manter Meta Ads (presença global/BR)
    - Categoria: `"Promoção"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 6.2 Criar `skills/dp-ad-angles-google.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; manter Google Ads
    - Categoria: `"Promoção"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 6.3 Criar `skills/dp-mediaplan.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Promoção"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 6.4 Criar `skills/dp-tracking-setup.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; manter nomes técnicos de plataformas (Google Analytics, Meta Pixel)
    - Categoria: `"Promoção"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_

- [ ] 7. Implementar os 24 módulos de skills PT-BR — Categoria: Análise e Qualidade
  - [-] 7.1 Criar `skills/dp-playbook-audit.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Análise e Qualidade"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 7.2 Criar `skills/dp-playbook-sync.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Análise e Qualidade"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 7.3 Criar `skills/dp-export-pdf.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Análise e Qualidade"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [-] 7.4 Criar `skills/dp-competitor-analysis.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Análise e Qualidade"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_
  - [ ] 7.5 Criar `skills/dp-copy-review.ts` com conteúdo traduzido + referências embutidas
    - Traduzir do francês para PT-BR; adaptar culturalmente
    - Categoria: `"Análise e Qualidade"`
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 4.1, 4.4, 4.5_

- [~] 8. Checkpoint — Validar integridade dos módulos de skills
  - Verificar que todos os 24 arquivos `skills/dp-*.ts` foram criados e exportam um objeto padrão com os 6 campos obrigatórios
  - Verificar que nenhum arquivo contém o texto "FitPro Academy" (deve estar como "Academia FitPro")
  - Verificar que nenhum arquivo contém valores em euros isolados (€ ou "euros") sem adaptação para reais
  - Certifique-se de que todos os testes passam; pergunte ao usuário se surgirem dúvidas.

- [ ] 9. Preencher `skills/index.ts` com importações e estruturas de dados
  - [~] 9.1 Importar os 24 módulos de skills no `index.ts` e montar `skillsMap` e `skillsList`
    - Importar todos os 24 default exports de `skills/dp-*.ts`
    - Popular `skillsMap` como `Record<string, SkillRecord>` indexado por `skill.nome`
    - Popular `skillsList` como array ordenado seguindo a ordem canônica por categoria
    - Verificar que a estrutura de mapa garante lookup O(1) por nome exato
    - _Requirements: 1.1, 4.1, 4.2, 4.3, 8.3_
  - [~] 9.2 Implementar `workflowGraph` e `objectiveIndex` no `index.ts`
    - Copiar literalmente o `workflowGraph` definido no design (26 entradas, com justificativas ≤ 280 chars)
    - Copiar literalmente o `objectiveIndex` definido no design (20 entradas)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 10. Substituir `mcp-server.ts` pelo novo servidor dp-createur PT-BR
  - [~] 10.1 Reescrever `netlify/edge-functions/mcp-server.ts` com a lógica do servidor dp-createur
    - Remover toda a lógica do servidor Astro Docs (incluindo variáveis de ambiente Kapa, interface `SearchResponse` e função `sendKapaRequest`)
    - Importar `skillsMap`, `skillsList`, `workflowGraph`, `objectiveIndex` de `./skills/index.ts`
    - Implementar `getServer(): McpServer` que cria um `McpServer` com `name: "DP Criador PT-BR"` e registra as 5 ferramentas
    - Implementar o handler stateless com tratamento de GET (405) e try/catch para 500
    - Exportar `handler` com assinatura `(req: Request) => Promise<Response>` e `config: Config` com `path: ["/mcp"]`, `method: ["POST", "GET"]`
    - Sem variáveis de ambiente necessárias
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 5.1, 8.1, 8.2, 8.5_
  - [~] 10.2 Implementar a ferramenta MCP `buscar_skill_dp` no servidor
    - Registrar com `server.registerTool("buscar_skill_dp", ...)` com parâmetro `nome_skill: z.string()`
    - Sucesso: retornar `skillsMap[nome_skill].conteudo` no formato `{content: [{type: "text", text: ...}]}`
    - Erro: retornar mensagem PT-BR com lista dos 24 nomes válidos separados por vírgula
    - _Requirements: 3.1, 3.2, 3.3, 5.5_
  - [~] 10.3 Implementar a ferramenta MCP `listar_skills_dp` no servidor
    - Registrar sem parâmetros de entrada
    - Iterar `skillsList` agrupando por categoria nas 6 categorias válidas
    - Formatar saída como texto com cabeçalhos `## Categoria` e itens `- dp-nome: descrição`
    - Envolver a lógica de agrupamento em try/catch para retornar HTTP 500 em caso de falha
    - _Requirements: 3.4, 3.5, 3.6, 5.5_
  - [~] 10.4 Implementar a ferramenta MCP `buscar_skills_por_categoria` no servidor
    - Registrar com parâmetro `categoria: z.string()`
    - Sucesso: filtrar `skillsList` pela categoria e retornar lista com nome e descrição
    - Erro (categoria inválida): retornar mensagem PT-BR listando as 6 categorias válidas
    - _Requirements: 3.7, 3.8, 5.5_
  - [~] 10.5 Implementar a ferramenta MCP `obter_proximo_skill` no servidor
    - Registrar com parâmetro `skill_atual: z.string()`
    - Sucesso: retornar `workflowGraph[skill_atual]` serializado como JSON
    - Erro (skill não encontrado ou sem sucessores): retornar `"[]"` + mensagem explicativa PT-BR
    - _Requirements: 7.1, 7.2, 7.3, 7.6, 5.5_
  - [~] 10.6 Implementar a ferramenta MCP `buscar_skills_por_objetivo` no servidor
    - Registrar com parâmetro `objetivo: z.string()`
    - Buscar por correspondência parcial: se `objetivo` está contido em alguma chave de `objectiveIndex`, retornar os skills associados com nome e descrição (≤ 280 chars)
    - Erro (nenhuma correspondência): retornar `"[]"` + mensagem explicativa PT-BR
    - _Requirements: 7.4, 7.5, 7.6, 5.5_

- [ ] 11. Escrever testes de propriedades (fast-check) e testes unitários
  - [~] 11.1 Criar `skills/__tests__/skills.property.test.ts` com os 7 property-based tests usando fast-check
    - Importar `fc` de `npm:fast-check` via deno.json
    - **Property 1:** Para qualquer nome no conjunto dos 24 skills, `skillsMap[nome]` existe, `.conteudo` não vazio, e conteúdos são distintos entre skills — tag: `Feature: dp-createur-ptbr-astro, Property 1: cobertura completa dos 24 skills`
    - **Property 2:** Para qualquer chave `k` de `skillsMap`, `skillsMap[k].nome === k` — tag: `Feature: dp-createur-ptbr-astro, Property 2: consistência do mapa de skills`
    - **Property 3:** Agrupando `skillsList` por categoria: total = 24, distribuição exata Fundação=3, Criação do Produto=4, Venda e Monetização=3, Conteúdo e SEO=5, Promoção=4, Análise e Qualidade=5 — tag: `Feature: dp-createur-ptbr-astro, Property 3: cobertura de categorias`
    - **Property 4:** Para qualquer skill de `skillsList`, todos os 6 campos obrigatórios presentes e não-vazios (strings não vazias, arrays não-nulos) — tag: `Feature: dp-createur-ptbr-astro, Property 4: completude dos campos obrigatórios`
    - **Property 5:** Para qualquer aresta `(A → next)` em `workflowGraph`, `A` e `next.skill` existem em `skillsMap`, e `next.justificativa.length <= 280` — tag: `Feature: dp-createur-ptbr-astro, Property 5: integridade do grafo de workflow`
    - **Property 6:** Para qualquer entrada de `objectiveIndex`, todos os skills listados existem em `skillsMap` — tag: `Feature: dp-createur-ptbr-astro, Property 6: consistência do índice de objetivos`
    - **Property 7:** Para qualquer par de índices distintos `(i, j)` de `skillsList`, `skillsList[i].nome !== skillsList[j].nome` — tag: `Feature: dp-createur-ptbr-astro, Property 7: unicidade dos nomes de skills`
    - _Requirements: 1.1, 3.5, 4.3, 4.5, 7.1, 7.3, 7.4_
  - [ ]* 11.2 Criar `skills/__tests__/server.unit.test.ts` com testes unitários de exemplos e edge cases
    - Testar: GET /mcp retorna 405 com header `Allow: POST`
    - Testar: `buscar_skill_dp("dp-playbook-create")` retorna conteúdo PT-BR não vazio
    - Testar: `buscar_skill_dp("dp-inexistente")` retorna mensagem com lista dos 24 skills
    - Testar: `listar_skills_dp()` retorna 24 skills agrupados nas 6 categorias
    - Testar: `buscar_skills_por_categoria("Fundação")` retorna exatamente 3 skills
    - Testar: `buscar_skills_por_categoria("Inexistente")` retorna mensagem com 6 categorias válidas
    - Testar: `obter_proximo_skill("dp-business-profile")` inclui `dp-market-research` na resposta
    - Testar: `obter_proximo_skill("dp-export-pdf")` retorna múltiplos sucessores (≥ 2)
    - Testar: `buscar_skills_por_objetivo("criar ebook")` retorna `dp-playbook-create`, `dp-ebook-cover`, `dp-export-pdf`
    - Testar: `obter_proximo_skill("dp-inexistente")` retorna string com `[]` e mensagem PT-BR
    - Testar: `buscar_skills_por_objetivo("objetivo sem resultado")` retorna string com `[]` e mensagem PT-BR
    - Testar: nenhum conteúdo de skill contém texto em francês (ex: "Créez", "votre", "Téléchargez")
    - Testar: nenhum conteúdo de skill contém "FitPro Academy"
    - Testar: nenhum conteúdo de skill contém "47€" ou "47 euros" ou "47 €"
    - _Requirements: 1.4, 2.1, 2.5, 3.2, 3.3, 3.5, 3.7, 3.8, 7.2, 7.3, 7.5, 7.6_

- [~] 12. Checkpoint — Executar todos os testes e corrigir falhas
  - Rodar `deno test netlify/edge-functions/skills/__tests__/` e verificar que todos os testes passam
  - Garantir que os 7 property-based tests passam com mínimo 100 iterações cada
  - Certifique-se de que todos os testes passam; pergunte ao usuário se surgirem dúvidas.

- [x] 13. Atualizar `deno.json` com import de `fast-check`
  - Adicionar `"fast-check": "npm:fast-check"` ao mapa de imports em `deno.json`
  - Verificar que não há conflitos com os imports existentes
  - _Requirements: 8.2_

- [ ] 14. Substituir `README.md` pela versão PT-BR
  - [~] 14.1 Reescrever `README.md` em PT-BR documentando o servidor dp-createur
    - Incluir seção de introdução descrevendo o servidor MCP dp-createur PT-BR e os 24 skills
    - Incluir seção "Como conectar" com exemplos completos para 4 ferramentas: Claude Code (`claude mcp add --transport http`), Cursor (JSON config), VS Code (JSON config), Windsurf (`npx mcp-remote`)
    - Listar todos os 24 skills com descrições em PT-BR agrupados pelas 6 categorias
    - Incluir exemplos de invocação das 3 ferramentas principais: `buscar_skill_dp`, `listar_skills_dp`, `buscar_skills_por_categoria`
    - Incluir seção "Variáveis de Ambiente" declarando explicitamente que nenhuma variável é necessária
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [~] 15. Atualizar `public/index.html` para refletir o dp-createur PT-BR
  - Substituir título, subtítulo e textos de interface pelo equivalente PT-BR (servidor dp-createur)
  - Atualizar a configuração exibida: `Name: "DP Criador PT-BR"`, `URL: "https://[domínio]/mcp"`, `Transport: "http"`
  - Substituir o link "View Documentation" por um link adequado (ex: GitHub do projeto)
  - Atualizar o `<title>` da página para "DP Criador PT-BR — Servidor MCP"
  - Manter todos os estilos CSS e estrutura HTML existentes sem alterações visuais estruturais
  - _Requirements: 6.1_

- [~] 16. Checkpoint final — Verificar integridade completa do projeto
  - Verificar que `netlify/edge-functions/mcp-server.ts` exporta `handler` e `config` no formato esperado pelo Netlify
  - Verificar que não há referências ao servidor Astro Docs nem às variáveis de ambiente `KAPA_*` em nenhum arquivo
  - Rodar `deno test` completo e confirmar que todos os testes passam
  - Certifique-se de que todos os testes passam; pergunte ao usuário se surgirem dúvidas.

## Notes

- Tasks marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- A ordem das tasks garante que os módulos de dados (`skills/*.ts`) são criados antes do servidor (`mcp-server.ts`) que os importa
- O `deno.json` deve ser atualizado antes de rodar os testes de propriedade (task 13)
- Cada módulo de skill deve preservar estritamente: blocos de código, código inline, nomes técnicos `dp-[nome]`, frontmatter YAML e hierarquia de títulos Markdown (ver Req 2.2)
- O produto fictício de referência é sempre "Academia FitPro" / "Playbook do Coach Fitness" a R$ 197
- Nenhuma variável de ambiente é necessária no servidor dp-createur (sem chamadas a APIs externas)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "13"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "3.1", "3.2", "3.3", "3.4", "4.1", "4.2", "4.3", "5.1", "5.2", "5.3", "5.4", "5.5", "6.1", "6.2", "6.3", "6.4", "7.1", "7.2", "7.3", "7.4", "7.5"] },
    { "id": 2, "tasks": ["9.1", "9.2"] },
    { "id": 3, "tasks": ["10.1"] },
    { "id": 4, "tasks": ["10.2", "10.3", "10.4", "10.5", "10.6"] },
    { "id": 5, "tasks": ["11.1", "11.2", "14.1", "15"] }
  ]
}
```
