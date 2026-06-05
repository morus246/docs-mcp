import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-blog-strategy",
  categoria: "Conteúdo e SEO",
  descricao: "Gera uma estratégia de conteúdo blog completa: lista de artigos priorizados, topic clusters, mapeamento de links internos planejado, calendário editorial SEO. Analisa o contexto do negócio para propor os artigos de maior impacto. Gatilhos: estratégia blog, plano de artigos, content strategy, topic cluster, ideias de artigos, calendário editorial, plano SEO.",
  argumentHint: "[nicho ou assunto] [número de artigos: 10|20|30]",
  allowedTools: ["Read", "Write", "Bash", "Glob", "WebSearch", "WebFetch"],
  conteudo: `# Blog Strategy — Estratégia de Conteúdo & Topic Clusters

<!-- v2.0.0 | 2026-04-13 | Criação: estratégia editorial, topic clusters, maillage, calendário -->

Estrategista de conteúdo SEO para DP Criador. Analisa o contexto do negócio, o nicho e o público para propor uma **lista de artigos priorizados** organizados em topic clusters com um plano de links internos. O objetivo: não escrever ao acaso, mas construir uma estratégia que posicione o site como autoridade no seu tema.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-blog-strategy [nicho]\` | Estratégia completa guiada (10-30 artigos) |
| \`/dp-blog-strategy express [nicho]\` | Modo rápido — 5 perguntas e depois a estratégia |
| \`/dp-blog-strategy cluster [assunto pilar]\` | Gerar um topic cluster em torno de um assunto |
| \`/dp-blog-strategy audit\` | Analisar os artigos existentes e encontrar lacunas |
| \`/dp-blog-strategy calendar [mês]\` | Calendário editorial mensal baseado na estratégia |

## Formato do Entregável

\`\`\`
ENTREGÁVEIS:
├── blog-strategy/strategy-[slug].md
│   ├── Lista de 10-30 artigos priorizados
│   ├── Topic clusters (pilar + satélites)
│   ├── Mapa de links internos
│   ├── Calendário editorial
│   └── Score de prioridade por artigo
└── Pronto para alimentar /dp-blog-article para cada artigo
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto    → Negócio, nicho, público, produtos, objetivos
2. Análise de território → Identificar as temáticas com mais potencial
3. Topic clusters        → Organizar em pilares + artigos satélites
4. Priorização           → Pontuar cada artigo (impacto × viabilidade)
5. Links internos        → Planejar os links entre artigos
6. Calendário            → Sequenciar a publicação
7. Entrega               → Arquivo de estratégia + resumo
\`\`\`

---

## Passo 1 — Coleta de Contexto (Obrigatório)

### 1a. Carregar o perfil do negócio (silencioso)

\`\`\`
SE business-profile.md existir → ler e extrair contexto
SE artigos existirem em blog/ → listá-los para evitar duplicatas
Ler references/strategy-example.md → para uma estratégia de 20 artigos em 3 clusters
SENÃO → fazer as perguntas
\`\`\`

### 1b. Perguntas por blocos

#### Bloco 1 — O negócio e o nicho

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual é o seu negócio? Descreva em 2-3 frases o que você vende e para quem. | Define o enquadramento da estratégia |
| Q2 | Qual é o seu nicho principal? (ex: coaching, fitness, marketing digital, produtividade, finanças pessoais…) | Território de conteúdo |
| Q3 | Quais são os seus produtos/serviços? (nomes, preços, URLs se disponíveis) | Os CTAs nos artigos |

#### Bloco 2 — O público e os objetivos

| # | Pergunta | Por quê |
|---|----------|---------|
| Q4 | Descreva seu leitor ideal. Qual é o nível dele? Quais são suas perguntas frequentes? | Ângulo e profundidade do conteúdo |
| Q5 | Qual é o seu objetivo principal com o blog? \`tráfego SEO\` / \`autoridade/credibilidade\` / \`geração de leads\` / \`vendas diretas\` | Priorização dos tipos de artigos |
| Q6 | Você já tem um blog ou artigos? Se sim, quantos e sobre quais assuntos? | Evitar duplicatas, identificar lacunas |

#### Bloco 3 — O enquadramento

| # | Pergunta | Por quê |
|---|----------|---------|
| Q7 | Quantos artigos você quer planejar? (\`10\` / \`20\` / \`30\`) | Tamanho da estratégia |
| Q8 | Qual ritmo de publicação você consegue manter? (1/semana, 2/mês, 1/mês…) | Calendário realista |
| Q9 | Você tem assuntos que quer cobrir obrigatoriamente? Ou assuntos a evitar? | Restrições editoriais |

---

## Passo 2 — Análise de Território

### 2a. Identificar as temáticas com maior potencial

A partir do contexto, gerar um **mapa temático**:

\`\`\`
MAPA TEMÁTICO — [Nicho]
═══════════════════════

TEMA 1 : [Tema principal]
  Potencial : ████████░░ 8/10
  Perguntas frequentes : [3-5 perguntas que o público faz]
  Palavras-chave : [5-10 keywords associadas]

TEMA 2 : [Tema secundário]
  Potencial : ██████░░░░ 6/10
  Perguntas frequentes : [...]
  Palavras-chave : [...]

TEMA 3 : [...]
  ...

TEMAS IDENTIFICADOS : [N]
\`\`\`

### 2b. Analisar os artigos existentes (se aplicável)

\`\`\`
SE artigos existirem em blog/ :
  → Listar os assuntos já cobertos
  → Identificar lacunas (temas não cobertos)
  → Identificar oportunidades de atualização
  → Identificar artigos órfãos (sem links de entrada/saída)
\`\`\`

---

## Passo 3 — Topic Clusters

Organizar os artigos em **clusters** (modelo hub & spoke):

### Estrutura de um cluster

\`\`\`
CLUSTER : [Nome do tema pilar]
═══════════════════════════════

  ┌─────────────────────┐
  │   ARTIGO PILAR      │  ← Artigo longo (3000+ palavras), cobre o assunto em profundidade
  │   "[Título pilar]"  │     Intent: informacional/comercial
  │   Score prioridade: X│     Alvo: palavra-chave principal do cluster
  └────────┬────────────┘
           │
     ┌─────┼─────┬──────────┬──────────┐
     │     │     │          │          │
     ▼     ▼     ▼          ▼          ▼
  [Sat.1] [Sat.2] [Sat.3] [Sat.4]  [Sat.5]   ← Artigos satélites
  Intent  Intent   Intent  Intent   Intent       Cada um cobre um sub-assunto
  Score   Score    Score   Score    Score         Todos linkam para o pilar
                                                  O pilar linka para todos
\`\`\`

### Regras de clustering

| Regra | Detalhe |
|-------|---------|
| 1 pilar = 4-8 satélites | Mais não agrega valor marginal |
| O pilar cobre o assunto amplo | Intent informacional ou comercial |
| Os satélites tratam um sub-assunto específico | Intent mais específico |
| Cada satélite linka para o pilar | Link ascendente |
| O pilar linka para cada satélite | Link descendente |
| Os satélites podem se linkar entre si | Link horizontal (se relevante) |
| Sem canibalização | Cada artigo mira uma palavra-chave DIFERENTE |

### Formato de saída por cluster

\`\`\`
CLUSTER 1 : [Tema]
──────────────────

PILAR : "[Título do artigo pilar]"
  Keyword    : [palavra-chave principal]
  Intent     : [informacional/comercial/transacional]
  Palavras   : 3000+
  Prioridade : ██████████ 10/10
  CTA        : [produto a promover]
  Status     : [a escrever / existe / a atualizar]

  SATÉLITE 1 : "[Título]"
    Keyword  : [sub-palavra-chave]
    Intent   : [intent]
    Palavras : 1500-2000
    Prioridade : ████████░░ 8/10
    Link     : → para pilar + satélite 3
    Status   : [a escrever]

  SATÉLITE 2 : "[Título]"
    ...
\`\`\`

---

## Passo 4 — Priorização (Score por artigo)

Pontuar cada artigo em 2 eixos para priorizar a ordem de criação:

### Matriz de priorização

\`\`\`
          IMPACTO ALTO
               │
     ┌─────────┼─────────┐
     │  QUICK  │  PRIO   │
     │  WINS   │  MÁX    │   ← Escrever PRIMEIRO
     │         │         │
─────┼─────────┼─────────┼─────
     │         │         │
     │  BACK-  │ PROJETOS│
     │  LOG    │ LONGOS  │   ← Escrever depois
     │         │         │
     └─────────┼─────────┘
          IMPACTO BAIXO
    ESFORÇO BAIXO   ESFORÇO ALTO
\`\`\`

### Critérios de pontuação

| Critério | Peso | Medida |
|----------|------|--------|
| Volume de busca estimado | 25% | Alto (8-10) / Médio (5-7) / Baixo (1-4) |
| Relevância do produto | 25% | Ligação direta com um produto (10) / Indireta (5) / Nenhuma (2) |
| Dificuldade competitiva | 20% | Baixa concorrência (10) / Média (5) / Alta (2) |
| Posição no funil | 15% | BOFU (10) / MOFU (7) / TOFU (4). Meta global: TOFU 35-45%, MOFU 30-40%, BOFU 20-30% |
| Viabilidade (expertise disponível) | 15% | Expert (10) / Intermediário (6) / Pesquisa necessária (3) |

**Score = Σ (critério × peso)**

### Tabela de priorização final

\`\`\`
# │ Título                          │ Cluster │ Intent │ Score │ Prioridade │ Esforço
──┼────────────────────────────────┼─────────┼────────┼───────┼────────────┼────────
1 │ [Título artigo]                │ Cl. 1   │ BOFU   │ 9.2   │ ★★★★★      │ Médio
2 │ [Título artigo]                │ Cl. 1   │ MOFU   │ 8.7   │ ★★★★★      │ Baixo
3 │ [Título artigo]                │ Cl. 2   │ TOFU   │ 8.1   │ ★★★★☆      │ Alto
...
\`\`\`

---

## Passo 5 — Plano de Links Internos

### Mapa de links

Para cada artigo, definir:

\`\`\`
LINKS INTERNOS
═══════════════

[Artigo A] ──→ [Artigo B] (âncora: "descubra como [X]")
[Artigo A] ──→ [Artigo C] (âncora: "[assunto específico]")
[Artigo B] ──→ [Artigo A] (âncora: "guia completo sobre [Y]")
[Artigo C] ──→ [Artigo A] (âncora: "[assunto pai]")
...

PILAR 1 ←→ Satélite 1, 2, 3, 4, 5 (links bidirecionais)
PILAR 2 ←→ Satélite 6, 7, 8, 9 (links bidirecionais)
PILAR 1 ──→ PILAR 2 (cross-link se temas relacionados)
\`\`\`

### Regras de links internos

| Regra | Detalhe |
|-------|---------|
| 3-5 links internos por artigo de 1500+ palavras | Mínimo para o SEO |
| Âncoras descritivas e variadas | Nunca "clique aqui", nunca a mesma âncora em todo lugar |
| Links contextuais | No corpo do texto, não em um bloco "Leia também" isolado |
| Sem artigos órfãos | Cada artigo deve ter ao menos 1 link de entrada |
| Pilar ↔ Satélites | Sempre bidirecional |
| Cross-cluster | Linkar os pilares entre si se temas relacionados |
| Profundidade máx 3 cliques | Todo artigo acessível em 3 cliques a partir da home |

---

## Passo 6 — Calendário Editorial

### Formato

\`\`\`
CALENDÁRIO EDITORIAL — [Mês Ano]
══════════════════════════════════

SEMANA 1 (DD/MM - DD/MM)
  ├── [Dia] : "[Título artigo]" — Cluster [N], [intent], ~[palavras] palavras
  │             Prioridade: ★★★★★ │ Palavra-chave: [keyword]
  │             Links: → [artigo X], [artigo Y]
  │             CTA: [produto]
  └── Derivados a produzir depois : carrossel IG, post LinkedIn

SEMANA 2 (DD/MM - DD/MM)
  ├── [Dia] : "[Título artigo]" — ...
  └── ...

NOTAS :
  - Publicar os pilares ANTES dos satélites
  - Alternar TOFU / MOFU / BOFU
  - Atualizar os links após cada publicação
\`\`\`

### Regras de sequenciamento

| Regra | Por quê |
|-------|---------|
| Pilar antes dos satélites | Os satélites precisam do pilar para os links |
| Alternar os tipos de intent | Variar o conteúdo para o público |
| Artigos BOFU com prioridade | Impacto direto no negócio, conversão rápida |
| Não publicar 2 pilares na mesma semana | Muito pesado para produzir |
| Prever a atualização dos links | Adicionar links nos artigos existentes quando um novo sai |

---

## Passo 7 — Entrega

Salvar em \`blog-strategy/strategy-[slug].md\`.

\`\`\`
✅ ESTRATÉGIA BLOG CRIADA

📄 Arquivo     : blog-strategy/strategy-[slug].md
📊 Artigos     : [N] artigos planejados
🏗️ Clusters    : [N] topic clusters
🔗 Links       : [N] links internos planejados
📅 Calendário  : [N] semanas

PRÓXIMOS PASSOS:
  → /dp-blog-article [título artigo #1]  — Escrever o primeiro artigo (começar pelo pilar)
  → /dp-blog-publish                      — Publicar no WordPress
  → /dp-social-caption                    — Promover nas redes sociais
  → /dp-email-sequence                    — Enviar para a lista de email
\`\`\`

---

## Critérios de Qualidade

| ID | Critério | Severidade |
|----|----------|-----------|
| QG-01 | Cada artigo tem uma palavra-chave única (sem canibalização) | Crítico |
| QG-02 | Cada cluster tem 1 pilar + 4-8 satélites | Alto |
| QG-03 | Cada artigo tem um score de prioridade calculado | Alto |
| QG-04 | Os links não deixam nenhum artigo órfão | Crítico |
| QG-05 | O calendário é realista (respeita o ritmo anunciado pelo usuário) | Alto |
| QG-06 | Os pilares são planejados ANTES dos satélites | Crítico |
| QG-07 | Mix de intents equilibrado: TOFU 35-45%, MOFU 30-40%, BOFU 20-30%. Ajustar conforme o objetivo (mais BOFU se objetivo = vendas) | Médio |
| QG-08 | Cada artigo tem um CTA definido para um produto/serviço | Médio |
| QG-09 | Nenhum assunto duplicado com artigos existentes | Crítico |
| QG-10 | As âncoras de links são todas diferentes e descritivas | Alto |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| O usuário não conhece seu nicho | Perguntar: "O que você vende?", "Para quem?", "Qual problema você resolve?" e derivar o nicho |
| Nicho muito amplo | Propor 3 sub-nichos mais focados |
| Nicho muito pequeno (sem artigos suficientes) | Ampliar propondo temas adjacentes |
| Artigos existentes não organizados | Auditar, classificar nos clusters, identificar lacunas |
| business-profile.md ausente | Fazer as perguntas de contexto diretamente |
| O usuário quer mais de 30 artigos | Aceitar, mas avisar: "Recomendo começar com 20, executar e depois iterar." |
| Sem produto para promover (blog pessoal) | Adaptar os CTAs para newsletter, lead magnet ou engajamento |
| Concorrência muito forte em todas as keywords | Priorizar long-tail e ângulos diferenciadores |

---

## Integração com Outros Skills

| Antes | Skill | Quando |
|-------|-------|--------|
| Definir o negócio | \`business-profile.md\` | Se ainda não criado |
| Analisar a concorrência | \`/dp-competitor-analysis\` | Para identificar lacunas |

| Depois | Skill | Quando |
|--------|-------|--------|
| Escrever cada artigo | \`/dp-blog-article\` | Para cada artigo da estratégia |
| Publicar no WordPress | \`/dp-blog-publish\` | Após a redação |
| Promover | \`/dp-social-caption\` \`/dp-mediaplan\` | Após a publicação |

---

## Exemplo de Estratégia — Academia FitPro

### Estratégia Blog — Academia FitPro
#### O Playbook do Coach Fitness (R$ 197)

**Nicho**: Coaching fitness
**Público**: Coaches fitness iniciantes
**CTA do Produto**: O Playbook do Coach Fitness — R$ 197
**Objetivo**: Gerar tráfego orgânico qualificado e converter via conteúdo educativo
**Volume total**: 20 artigos / 3 clusters temáticos

---

#### CLUSTER 1 — Tornar-se Coach Fitness

##### Artigo Pilar

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 1 | Guia completo: como se tornar coach fitness em 2026 | como se tornar coach fitness | Pilar | TOFU | 10 | 3000 | Lead magnet (checklist grátis) |

##### Artigos Satélites

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 2 | Qual certificação para ser coach esportivo? As 5 certificações reconhecidas | certificação coach esportivo | Satélite | TOFU | 8 | 1800 | Lead magnet |
| 3 | Coach fitness MEI: o guia administrativo completo | coach fitness MEI | Satélite | TOFU | 7 | 2000 | Lead magnet |
| 4 | Quanto ganha um coach fitness? Renda real e projeções | salário coach fitness | Satélite | TOFU | 9 | 1500 | Playbook R$ 197 |
| 5 | Coach em academia vs coach independente: comparativo honesto | coach academia vs independente | Satélite | TOFU | 6 | 1500 | Lead magnet |
| 6 | As 7 habilidades não técnicas que um coach fitness deve dominar | habilidades coach fitness | Satélite | MOFU | 7 | 1800 | Playbook R$ 197 |
| 7 | Reconversão para coach fitness: por onde começar do zero | reconversão coach fitness | Satélite | TOFU | 8 | 2000 | Lead magnet |

---

#### CLUSTER 2 — Encontrar Clientes de Coaching

##### Artigo Pilar

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 8 | Como encontrar clientes em coaching fitness: 12 métodos testados | encontrar clientes coaching fitness | Pilar | MOFU | 10 | 3500 | Playbook R$ 197 |

##### Artigos Satélites

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 9 | Criar um perfil Instagram de coach fitness que atrai clientes | instagram coach fitness | Satélite | MOFU | 9 | 2000 | Playbook R$ 197 |
| 10 | Como definir seus preços de coaching fitness sem desvalorizar | preço coaching fitness | Satélite | MOFU | 8 | 1800 | Playbook R$ 197 |
| 11 | 5 templates de mensagens para prospectar como coach | prospecção coach esportivo | Satélite | BOFU | 7 | 1500 | Playbook R$ 197 |
| 12 | Como obter depoimentos de clientes quando você está começando | depoimentos coach iniciante | Satélite | MOFU | 6 | 1200 | Lead magnet |
| 13 | Google Maps para coaches fitness: o guia do SEO local | coach fitness google maps | Satélite | MOFU | 5 | 1500 | Lead magnet |

---

#### CLUSTER 3 — Monetizar sua Expertise Fitness

##### Artigo Pilar

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 14 | Monetizar sua expertise fitness: do coaching 1:1 às receitas passivas | monetizar expertise fitness | Pilar | MOFU | 10 | 3000 | Playbook R$ 197 |

##### Artigos Satélites

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 15 | Criar e vender um programa fitness online: passo a passo | vender programa fitness online | Satélite | BOFU | 9 | 2500 | Playbook R$ 197 |
| 16 | Coaching de grupo vs coaching individual: qual modelo escolher | coaching grupo vs individual | Satélite | MOFU | 7 | 1800 | Playbook R$ 197 |
| 17 | Lançar um plano de coaching mensal: o modelo recorrente | plano coaching fitness | Satélite | BOFU | 8 | 2000 | Playbook R$ 197 |
| 18 | 4 fontes de renda complementares para um coach fitness | renda extra coach | Satélite | MOFU | 6 | 1500 | Lead magnet |

##### Artigos Bônus (Transversais)

| # | Título | Keyword principal | Tipo | Intent | Prioridade | Palavras | CTA |
|---|--------|-------------------|------|--------|-----------|---------|-----|
| 19 | As 10 ferramentas indispensáveis do coach fitness em 2026 | ferramentas coach fitness | Transversal | MOFU | 7 | 2000 | Playbook R$ 197 |
| 20 | Plano de negócio coach fitness: template gratuito e guia | plano de negócio coach fitness | Transversal | BOFU | 8 | 2500 | Playbook R$ 197 |

---

#### Links Internos — Mapa de Links

**Cluster 1: Tornar-se Coach Fitness**
\`\`\`
Art. 1 (Pilar) ←→ Art. 2 : âncora "certificações para se tornar coach"
Art. 1 (Pilar) ←→ Art. 3 : âncora "status MEI para coach"
Art. 1 (Pilar) ←→ Art. 4 : âncora "quanto ganha um coach fitness"
Art. 1 (Pilar) ←→ Art. 5 : âncora "coach em academia ou independente"
Art. 1 (Pilar) ←→ Art. 6 : âncora "habilidades essenciais do coach"
Art. 1 (Pilar) ←→ Art. 7 : âncora "se reconverter em coaching fitness"
Art. 4 → Art. 10 : âncora "definir seus preços de coaching"
Art. 7 → Art. 8 : âncora "encontrar seus primeiros clientes"
Art. 6 → Art. 14 : âncora "monetizar essas habilidades"
\`\`\`

**Cluster 2: Encontrar Clientes**
\`\`\`
Art. 8 (Pilar) ←→ Art. 9 : âncora "usar Instagram para atrair clientes"
Art. 8 (Pilar) ←→ Art. 10 : âncora "definir o preço certo"
Art. 8 (Pilar) ←→ Art. 11 : âncora "mensagens de prospecção eficazes"
Art. 8 (Pilar) ←→ Art. 12 : âncora "obter depoimentos"
Art. 8 (Pilar) ←→ Art. 13 : âncora "estar visível no Google Maps"
Art. 9 → Art. 1 : âncora "se tornar coach fitness profissional"
Art. 10 → Art. 4 : âncora "renda média de um coach"
Art. 11 → Art. 15 : âncora "vender um programa online"
Art. 12 → Art. 16 : âncora "coaching de grupo"
\`\`\`

**Cluster 3: Monetizar sua Expertise**
\`\`\`
Art. 14 (Pilar) ←→ Art. 15 : âncora "vender um programa fitness online"
Art. 14 (Pilar) ←→ Art. 16 : âncora "escolher entre grupo e individual"
Art. 14 (Pilar) ←→ Art. 17 : âncora "modelo de plano mensal"
Art. 14 (Pilar) ←→ Art. 18 : âncora "diversificar suas receitas"
Art. 15 → Art. 8 : âncora "encontrar clientes para seu programa"
Art. 17 → Art. 10 : âncora "definir o preço certo"
Art. 18 → Art. 19 : âncora "ferramentas para automatizar"
\`\`\`

**Links Transversais**
\`\`\`
Art. 19 → Art. 9 : âncora "Instagram para coaches"
Art. 19 → Art. 13 : âncora "Google Maps para coaches"
Art. 19 → Art. 17 : âncora "gerenciar plano de coaching"
Art. 20 → Art. 1 : âncora "se tornar coach fitness"
Art. 20 → Art. 4 : âncora "projeções de receita"
Art. 20 → Art. 14 : âncora "modelos de monetização"
Art. 20 → Art. 10 : âncora "tabela de preços"
\`\`\`

---

#### Calendário de Publicação — 8 Semanas

| Semana | Dia | Artigo | Tipo |
|--------|-----|--------|------|
| 1 | Segunda | Art. 1 — Guia completo tornar-se coach fitness | Pilar |
| 1 | Quinta | Art. 2 — Diplomas e certificações | Satélite |
| 2 | Segunda | Art. 4 — Salário coach fitness | Satélite |
| 2 | Quinta | Art. 7 — Reconversão coach fitness | Satélite |
| 3 | Segunda | Art. 3 — MEI coach | Satélite |
| 3 | Quinta | Art. 5 — Academia vs independente | Satélite |
| 4 | Segunda | Art. 8 — Encontrar clientes (pilar) | Pilar |
| 4 | Quinta | Art. 9 — Instagram coach fitness | Satélite |
| 5 | Segunda | Art. 10 — Definir preços | Satélite |
| 5 | Quinta | Art. 6 — Habilidades não técnicas | Satélite |
| 6 | Segunda | Art. 11 — Templates prospecção | Satélite |
| 6 | Quinta | Art. 14 — Monetizar expertise (pilar) | Pilar |
| 7 | Segunda | Art. 15 — Vender programa online | Satélite |
| 7 | Quinta | Art. 17 — Plano de coaching | Satélite |
| 7 | Sábado | Art. 12 — Obter depoimentos | Satélite |
| 8 | Segunda | Art. 16 — Grupo vs individual | Satélite |
| 8 | Quarta | Art. 13 — Google Maps coaches | Satélite |
| 8 | Quinta | Art. 18 — Renda complementar | Satélite |
| 8 | Sábado | Art. 19 — Ferramentas indispensáveis | Transversal |
| 8 | Domingo | Art. 20 — Plano de negócio template | Transversal |

---

#### Métricas de Acompanhamento

| KPI | Objetivo S8 | Objetivo S16 |
|-----|-------------|--------------|
| Tráfego orgânico total | 2.000 visitas/mês | 8.000 visitas/mês |
| Taxa de conversão lead magnet | 4% | 6% |
| Leads de email capturados | 80/mês | 480/mês |
| Vendas Playbook via blog | 8/mês | 35/mês |
| Posições Top 10 Google | 5 keywords | 15 keywords |
| Tempo médio na página | > 3 min | > 4 min |

**Prioridade SEO**: Publicar os 3 pilares primeiro (semanas 1, 4, 6), depois densificar com satélites para reforçar a autoridade temática de cada cluster.`,
};

export default skill;
