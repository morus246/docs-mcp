import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-playbook-section",
  categoria: "Criação do Produto",
  descricao: "Redige ou reescreve uma seção completa para um ebook DP Criador existente. Produz HTML pronto para inserção, respeitando o design system, e valida a coerência com as seções vizinhas. Suporta adição e reescrita. Gatilhos: seção, adicionar seção, reescrever, rewrite, add section, insert.",
  argumentHint: "[assunto] [--target arquivo.html] [--action add|rewrite] [--after section-id]",
  allowedTools: ["Read", "Write", "Edit", "Bash", "Glob"],
  conteudo: `# Playbook Section — Redator de Seção de Ebook

<!-- v2.0.0 | 2026-04-13 | Refatoração completa: context intake, quality gates, scoring, error handling, integração cross-skill -->

Expert em redação de conteúdo para DP Criador. Escreve ou reescreve uma única seção de um ebook existente — HTML pronto para inserção, coerente com o estilo e a estrutura do documento alvo.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-playbook-section [assunto]\` | Redigir uma nova seção (pede o arquivo alvo) |
| \`/dp-playbook-section [assunto] --target [arquivo.html]\` | Redigir para um ebook específico |
| \`/dp-playbook-section rewrite [section-id] --target [arquivo.html]\` | Reescrever uma seção existente |
| \`/dp-playbook-section [assunto] --after [section-id]\` | Inserir após uma seção específica |
| \`/dp-playbook-section [assunto] --before [section-id]\` | Inserir antes de uma seção específica |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Seção HTML completa (value-block + h3s + tools-block + recap-block)
├── Inserida diretamente no arquivo alvo
├── Sumário atualizado automaticamente
└── Verificação de coerência pós-inserção
\`\`\`

---

## Processo

\`\`\`
0. Carregar contexto    → business-profile.md + referências
1. Context intake       → Coletar assunto, arquivo alvo, ação, posição
2. Ler o alvo           → Analisar o playbook alvo
3. Analisar vizinhos    → Verificar as seções adjacentes
4. Planejar a seção     → Outline validado pelo usuário
5. Redigir a seção      → Redação HTML completa
6. Inserir / Substituir → Modificação do arquivo + sumário
7. Verificar            → Contagens pós-inserção
\`\`\`

---

## Etapa 0 — Carregamento de Contexto (Silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome da marca, nicho, audiência, tom, cores
  → Adaptar o conteúdo da seção ao contexto do negócio

SENÃO:
  → Continuar sem. O conteúdo se adaptará ao playbook alvo.
\`\`\`

---

## Etapa 1 — Context Intake

### 1a. Identificar os parâmetros

| Parâmetro | Origem | Obrigatório |
|-----------|--------|-------------|
| Assunto da seção | \`\$ARGUMENTS\` ou mensagem do usuário | Sim |
| Arquivo alvo | \`\$ARGUMENTS\` (--target) ou pergunta | Sim |
| Ação | \`add\` (padrão) ou \`rewrite\` | Não |
| Posição | \`--after:[id]\` ou \`--before:[id]\` | Não (para \`add\`) |
| Brief / instruções | Mensagem do usuário | Não |
| Idioma | Auto-detectado a partir do playbook | Não |

### 1b. Perguntas se contexto faltando (blocos de 2-3)

#### Bloco 1 — O essencial

| # | Pergunta | Quando |
|---|----------|--------|
| Q1 | Qual é o assunto da seção? Descreva em 1-2 frases. | Sem assunto em \$ARGUMENTS |
| Q2 | Em qual arquivo vamos inserir? (caminho completo do ebook HTML) | Sem --target, sem arquivo óbvio |
| Q3 | Nova seção (\`add\`) ou reescrita de uma seção existente (\`rewrite\`)? | Não fica claro pelo contexto |

#### Bloco 2 — O posicionamento (se \`add\`)

| # | Pergunta | Quando |
|---|----------|--------|
| Q4 | Após qual seção? (vou listar as seções existentes) | Posição não especificada |
| Q5 | Você tem instruções específicas, pontos-chave a cobrir, um ângulo? | Sempre útil — opcional |

---

## Etapa 2 — Ler o Playbook Alvo

Ler o arquivo alvo inteiro para entender:

| Elemento | O que procurar |
|----------|----------------|
| Idioma | \`<html lang="...">\` → determina os labels h4 e o tu/você |
| Seções existentes | Lista de IDs + títulos h2 |
| Tom e profundidade | Número médio de h3 por h2, densidade de parágrafos |
| Ferramentas referenciadas | Quais T1-T10 / E1-E3 já são usados |
| CSS | Confirmar o design system (classes disponíveis) |
| Identidade visual | Cores em \`:root\`, fontes, estilo geral |

---

## Etapa 3 — Analisar as Seções Vizinhas

**Se \`add\`**: Ler as seções antes e depois do ponto de inserção:
- Fluxo lógico — a nova seção deve se inserir naturalmente
- Sem sobreposição — não repetir o que as vizinhas cobrem
- Profundidade coerente — número de h3 e densidade similares

**Se \`rewrite\`**: Ler a seção existente:
- Identificar o que deve mudar e o que deve permanecer
- Manter o mesmo ID de seção (não quebrar âncoras)
- Verificar referências de outras seções

---

## Etapa 4 — Planejar a Seção

Apresentar este outline ao usuário **ANTES** de redigir:

\`\`\`
╔══════════════════════════════════════════════════╗
║         PLANO DE SEÇÃO — VALIDAÇÃO               ║
╠══════════════════════════════════════════════════╣
║ ID da Seção  : [kebab-case-id]                   ║
║ Título (h2)  : [Título da seção]                 ║
║ Ação         : add / rewrite                     ║
║ Posição      : após [section-id]                 ║
║ Idioma       : PT-BR / EN                        ║
╠══════════════════════════════════════════════════╣
║ VALUE BLOCK                                      ║
║ [1-2 frases — o que o leitor ganha]              ║
╠══════════════════════════════════════════════════╣
║ SUBSEÇÕES (h3)                                   ║
║ 1. [Título] — [brief]                            ║
║ 2. [Título] — [brief]                            ║
║ 3. [Título] — [brief]                            ║
║ 4. [Título] — [brief] (se aplicável)             ║
╠══════════════════════════════════════════════════╣
║ TOOLS BLOCK : [ferramenta(s) relevante(s) ou "N/A"] ║
║ RECAP BLOCK : [3 takeaways previstos]            ║
╚══════════════════════════════════════════════════╝
\`\`\`

**Hard gate**: NÃO redigir sem validação explícita do outline.

---

## Etapa 5 — Redigir a Seção

### 5a. Estrutura HTML obrigatória

\`\`\`html
<section class="section" id="[section-id]">
  <h2>[Título]</h2>

  <div class="value-block">
    <h4>[Label conforme idioma]</h4>
    <p>[O que o leitor vai aprender — concreto, sem "nesta seção..."]</p>
  </div>

  <h3>[Subseção 1]</h3>
  <p>[Conteúdo — acionável, específico, voz DP Criador]</p>

  <h3>[Subseção 2]</h3>
  <p>[Conteúdo com template/script/checklist se aplicável]</p>

  <!-- 2-7 subseções h3 máximo -->

  <div class="tools-block">
    <h4>[Label conforme idioma]</h4>
    <ul>
      <li><span class="tool-id">T[N]</span> - <strong>[Nome]</strong> — [por que]</li>
    </ul>
  </div>

  <div class="recap-block">
    <h4>[Label conforme idioma]</h4>
    <ul class="single-item">
      <li>[Ponto-chave 1 — ação principal]</li>
      <li>[Ponto-chave 2 — insight central]</li>
      <li>[Ponto-chave 3 — erro a evitar]</li>
    </ul>
  </div>
</section>
\`\`\`

### 5b. Labels conforme idioma

| Elemento | PT-BR | EN |
|----------|-------|----|
| Value block h4 | O que você vai aprender | Value of this section |
| Recap block h4 | Para reter | Key takeaway |
| Tools block h4 | Ferramenta recomendada | Primary tool |

### 5c. Regras de conteúdo

| Critério | Regra |
|----------|-------|
| Especificidade | "Envie 20 DMs por dia" não "contate pessoas regularmente" |
| Frameworks | Dar um script, uma checklist, um passo a passo — não um ensaio |
| Honestidade | "Os resultados variam" é OK. "Você vai 10x sua renda" não é. |
| Parágrafos | Máximo 4-5 linhas. Quebrar muros de texto. |
| Verbos de ação | Iniciar as subseções com o que o leitor FAZ |
| Sem enrolação | Zero "Você entendeu a importância de...", zero motivação vazia |

### 5d. 4 critérios por subseção

| Critério | Pergunta de verificação |
|----------|-------------------------|
| **O QUÊ** | O que o leitor vai fazer concretamente? |
| **POR QUÊ** | Por que é importante? O que acontece se ele pular esta etapa? |
| **COMO** | Os passos exatos, o script, o template, a checklist |
| **MEDIDA** | Como saber se funcionou? Qual KPI ou sinal? |

---

## Etapa 6 — Inserir ou Substituir

### Se \`add\`:
1. Usar \`Edit\` para inserir o HTML na posição correta
2. Atualizar \`<nav class="sommaire">\` com um link para a nova seção
3. Verificar que o novo ID não conflita com IDs existentes

### Se \`rewrite\`:
1. Usar \`Edit\` para substituir o conteúdo da seção existente
2. Manter o mesmo ID de seção (não quebrar âncoras)
3. Atualizar o título no sumário se o título mudou

---

## Etapa 7 — Verificação Pós-Inserção

Após a inserção, confirmar:
- [ ] O link do sumário funciona (href bate com o novo ID)
- [ ] A seção se integra corretamente ao fluxo do documento
- [ ] Contagem total h2/h3 para confirmar que nada está quebrado
- [ ] Sem conflito de ID

Exibir o resumo:

\`\`\`
✅ SEÇÃO [ADICIONADA/REESCRITA]

📄 Arquivo    : [caminho do playbook]
📌 ID da Seção: [id]
📌 Título     : [título]
📊 Subseções  : [count] h3
📍 Posição    : após [section-id]
📝 Palavras   : ~[count]
🧱 Blocos     : value ✓ | tools ✓/— | recap ✓
📋 Sumário    : atualizado ✓

PRÓXIMAS ETAPAS:
  → /dp-playbook-audit    Verificar a qualidade geral
  → /dp-playbook-sync     Sincronizar PT/EN
  → /dp-copy-review       Revisar o copywriting
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Cada seção DEVE ter: wrapper \`<section>\` + \`<h2>\` + value-block + recap-block | Crítico |
| QG-02 | Mínimo 2, máximo 7 subseções \`<h3>\` por seção | Crítico |
| QG-03 | O recap-block tem exatamente 3 takeaways | Alto |
| QG-04 | Zero placeholder (\`[TODO]\`, \`[INSERT]\`, \`Lorem ipsum\`) | Crítico |
| QG-05 | Zero promessa de receita garantida | Crítico |
| QG-06 | O ID da seção é em kebab-case, único no documento | Crítico |
| QG-07 | Sem estilos inline — tudo vem do CSS do playbook | Alto |
| QG-08 | Sem \`<br>\`, \`<b>\`, \`<i>\` — usar \`<p>\`, \`<strong>\`, \`<em>\` | Alto |
| QG-09 | Sem JavaScript, sem imagens, sem links externos | Crítico |
| QG-10 | O sumário é atualizado após a inserção | Crítico |
| QG-11 | A voz DP Criador é respeitada (direta, action-first, honesta) | Alto |
| QG-12 | Se business-profile.md existir, o conteúdo é coerente com o perfil | Médio |
| QG-13 | Cada subseção h3: mínimo 200 palavras para playbook, 150 para guia. Verificar que cada h3 contém conteúdo acionável, não preenchimento. | Alto |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Arquivo alvo não encontrado | \`Glob\` para buscar .html no projeto. Pedir o caminho. |
| Arquivo alvo não é um ebook HTML | Detectar (sem \`<article class="ebook">\`) e recusar educadamente. Sugerir \`/dp-playbook-create\`. |
| ID de seção já existente (para \`add\`) | Propor um ID alternativo. Nunca sobrescrever sem confirmação. |
| ID de seção não encontrado (para \`rewrite\`) | Listar os IDs disponíveis, perguntar qual reescrever. |
| Assunto muito vago | Propor 3 ângulos específicos. Pedir para escolher. |
| Assunto que se sobrepõe a seção existente | Sinalizar a sobreposição + propor fusão ou diferenciação. |
| Idioma não detectável | Perguntar explicitamente PT-BR ou EN. |
| business-profile.md ausente | Continuar sem. Adaptar ao conteúdo existente do playbook. |

---

## Referência de Ferramentas

| ID | Ferramenta | Uso típico |
|----|------------|------------|
| T1 | ClickUp | Gerenciamento de projetos |
| T2 | Tally | Formulários, pesquisas |
| T3 | Calendly | Agendamento |
| T4 | Miro | Brainstorming visual |
| T5 | Notion | Documentação, CRM |
| T6 | Apollo | Prospecção |
| T7 | Loom | Mensagens em vídeo |
| T8 | Canva | Design gráfico |
| T9 | Hotmart | Pagamentos |
| T10 | Slack | Comunicação |
| E1 | Meta Ads | Publicidade Facebook/Instagram |
| E2 | Zoom | Videoconferência |
| E3 | Google Workspace | Email, docs |

Formato HTML: \`<span class="tool-id">T1</span> - <strong>ClickUp</strong> — [por que]\`

---

## Integração Cross-Skill

| Antes de playbook-section | Skill anterior | Quando |
|---------------------------|----------------|--------|
| Criar o ebook | \`/dp-playbook-create\` | O arquivo alvo ainda não existe |
| Auditar o ebook | \`/dp-playbook-audit\` | Para identificar seções a reescrever |

| Após playbook-section | Skill seguinte | Quando |
|-----------------------|----------------|--------|
| Verificar a qualidade | \`/dp-playbook-audit\` | Sempre recomendado após inserção |
| Sincronizar PT/EN | \`/dp-playbook-sync\` | Se o ebook existir em dois idiomas |
| Revisar o copywriting | \`/dp-copy-review\` | Para refinar o tom e a persuasão |
`,
};

export default skill;
