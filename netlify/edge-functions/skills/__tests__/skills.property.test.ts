// Testes property-based para o servidor dp-createur PT-BR
// Verificam invariantes estruturais dos 24 skills, workflowGraph e objectiveIndex

import { assertEquals, assertNotEquals } from "jsr:@std/assert";
import fc from "fast-check";
import {
  skillsMap,
  skillsList,
  workflowGraph,
  objectiveIndex,
} from "../index.ts";

// ---------------------------------------------------------------------------
// Property 1: cobertura completa dos 24 skills
// ---------------------------------------------------------------------------
Deno.test("Property 1: 24 skills cobertos, conteúdos não-vazios e distintos", () => {
  const EXPECTED_COUNT = 24;

  // Total de skills deve ser exatamente 24
  assertEquals(
    skillsList.length,
    EXPECTED_COUNT,
    `skillsList deve ter ${EXPECTED_COUNT} skills, mas tem ${skillsList.length}`,
  );
  assertEquals(
    Object.keys(skillsMap).length,
    EXPECTED_COUNT,
    `skillsMap deve ter ${EXPECTED_COUNT} entradas`,
  );

  // fast-check: para qualquer skill amostrado, .conteudo não é vazio
  fc.assert(
    fc.property(
      fc.constantFrom(...skillsList),
      (skill) => {
        return skill.conteudo.length > 0;
      },
    ),
  );

  // Todos os conteúdos são distintos entre si
  const conteudos = skillsList.map((s) => s.conteudo);
  const uniqueConteudos = new Set(conteudos);
  assertEquals(
    uniqueConteudos.size,
    EXPECTED_COUNT,
    "Todos os 24 conteúdos devem ser distintos",
  );
});

// ---------------------------------------------------------------------------
// Property 2: consistência do mapa (skillsMap[k].nome === k)
// ---------------------------------------------------------------------------
Deno.test("Property 2: consistência do mapa de skills", () => {
  const keys = Object.keys(skillsMap);

  fc.assert(
    fc.property(
      fc.constantFrom(...keys),
      (k) => {
        return skillsMap[k].nome === k;
      },
    ),
  );
});

// ---------------------------------------------------------------------------
// Property 3: distribuição exata por categoria
// ---------------------------------------------------------------------------
Deno.test("Property 3: distribuição exata por categoria", () => {
  const expectedDistribution: Record<string, number> = {
    "Fundação": 3,
    "Criação do Produto": 4,
    "Venda e Monetização": 3,
    "Conteúdo e SEO": 5,
    "Promoção": 4,
    "Análise e Qualidade": 5,
  };

  // Agrupar por categoria
  const distribution: Record<string, number> = {};
  for (const skill of skillsList) {
    distribution[skill.categoria] = (distribution[skill.categoria] ?? 0) + 1;
  }

  // Verificar total
  assertEquals(
    skillsList.length,
    24,
    "Total deve ser 24 skills",
  );

  // Verificar cada categoria
  for (const [categoria, expectedCount] of Object.entries(expectedDistribution)) {
    assertEquals(
      distribution[categoria],
      expectedCount,
      `Categoria "${categoria}" deve ter ${expectedCount} skills, mas tem ${distribution[categoria] ?? 0}`,
    );
  }

  // Não deve haver categorias inesperadas
  const allCategories = new Set(Object.keys(distribution));
  const expectedCategories = new Set(Object.keys(expectedDistribution));
  assertEquals(
    allCategories.size,
    expectedCategories.size,
    "Não deve haver categorias além das 6 esperadas",
  );
  for (const cat of allCategories) {
    assertEquals(
      expectedCategories.has(cat),
      true,
      `Categoria inesperada encontrada: "${cat}"`,
    );
  }
});

// ---------------------------------------------------------------------------
// Property 4: campos obrigatórios presentes e não-vazios
// ---------------------------------------------------------------------------
Deno.test("Property 4: campos obrigatórios em todos os skills", () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...skillsList),
      (skill) => {
        // nome: string não vazia
        if (skill.nome.length === 0) return false;

        // categoria: string não vazia
        if (skill.categoria.length === 0) return false;

        // descricao: string não vazia
        if (skill.descricao.length === 0) return false;

        // argumentHint: string não vazia
        if (skill.argumentHint.length === 0) return false;

        // allowedTools: array não-nulo com pelo menos 1 elemento
        if (!Array.isArray(skill.allowedTools)) return false;
        if (skill.allowedTools.length < 1) return false;

        // conteudo: string não vazia com length > 100
        if (skill.conteudo.length <= 100) return false;

        return true;
      },
    ),
  );
});

// ---------------------------------------------------------------------------
// Property 5: integridade do grafo de workflow
// ---------------------------------------------------------------------------
Deno.test("Property 5: integridade do grafo de workflow", () => {
  const graphEntries = Object.entries(workflowGraph);

  // fast-check: para qualquer entrada do grafo
  fc.assert(
    fc.property(
      fc.constantFrom(...graphEntries),
      ([source, nexts]) => {
        // A deve existir em skillsMap
        if (!(source in skillsMap)) return false;

        // Cada next deve referenciar um skill válido e ter justificativa curta
        for (const next of nexts) {
          if (!(next.skill in skillsMap)) return false;
          if (next.justificativa.length > 280) return false;
        }

        return true;
      },
    ),
  );

  // Verificar que nenhuma entrada do grafo aponta para skill inexistente
  // (verificação exaustiva complementar)
  for (const [source, nexts] of Object.entries(workflowGraph)) {
    assertEquals(
      source in skillsMap,
      true,
      `workflowGraph contém source inválido: "${source}"`,
    );
    for (const next of nexts) {
      assertEquals(
        next.skill in skillsMap,
        true,
        `workflowGraph: "${source}" → "${next.skill}" não existe em skillsMap`,
      );
      assertEquals(
        next.justificativa.length <= 280,
        true,
        `Justificativa de "${source}" → "${next.skill}" excede 280 chars (tem ${next.justificativa.length})`,
      );
    }
  }
});

// ---------------------------------------------------------------------------
// Property 6: consistência do índice de objetivos
// ---------------------------------------------------------------------------
Deno.test("Property 6: consistência do índice de objetivos", () => {
  const objectiveEntries = Object.entries(objectiveIndex);

  fc.assert(
    fc.property(
      fc.constantFrom(...objectiveEntries),
      ([_objective, skills]) => {
        // Todos os skills listados devem existir em skillsMap
        for (const skillName of skills) {
          if (!(skillName in skillsMap)) return false;
        }
        // A lista não deve estar vazia
        if (skills.length === 0) return false;
        return true;
      },
    ),
  );

  // Verificação exaustiva complementar
  for (const [objective, skills] of Object.entries(objectiveIndex)) {
    assertNotEquals(
      skills.length,
      0,
      `objectiveIndex["${objective}"] não deve estar vazio`,
    );
    for (const skillName of skills) {
      assertEquals(
        skillName in skillsMap,
        true,
        `objectiveIndex["${objective}"] referencia skill inválido: "${skillName}"`,
      );
    }
  }
});

// ---------------------------------------------------------------------------
// Property 7: unicidade dos nomes em skillsList
// ---------------------------------------------------------------------------
Deno.test("Property 7: nomes únicos em skillsList", () => {
  const nomes = skillsList.map((s) => s.nome);
  const uniqueNomes = new Set(nomes);

  assertEquals(
    uniqueNomes.size,
    skillsList.length,
    `Todos os nomes em skillsList devem ser únicos. Encontrados ${uniqueNomes.size} únicos de ${skillsList.length} total`,
  );

  // fast-check: para qualquer par de índices distintos, os nomes são diferentes
  const indices = skillsList.map((_, i) => i);
  fc.assert(
    fc.property(
      fc.constantFrom(...indices),
      fc.constantFrom(...indices),
      (i, j) => {
        if (i === j) return true; // mesmo elemento, ok
        return skillsList[i].nome !== skillsList[j].nome;
      },
    ),
    { numRuns: 200 },
  );
});
