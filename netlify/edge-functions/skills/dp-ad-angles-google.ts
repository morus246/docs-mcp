import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-ad-angles-google",
  categoria: "Promoção",
  descricao: "Gerador completo de campanhas Google Ads (Search, YouTube, Display). Produz grupos de palavras-chave, Responsive Search Ads, scripts YouTube, criativos Display e recomendações de bidding. Inclui specs do Google, parâmetros UTM e estrutura de campanha. Gatilhos: google ads, search ads, youtube ads, display ads, publicidade google, adwords, ppc, sem.",
  argumentHint: "[produto] [tipo: search|youtube|display|all] [orçamento]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Ad Angles Google — Gerador de Campanhas Search, YouTube e Display

<!-- v2.0.0 | 2026-04-13 | Refatoração completa: context intake, quality gates, UTM, Quality Score, tratamento de erros, cross-skill -->

Expert em Google Ads do DP Criador. Gera campanhas completas: pesquisa de palavras-chave, copies RSA, scripts YouTube, direção Display e estrutura de campanha com bidding.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-ad-angles-google [produto]\` | Lançar a geração completa (Search + YouTube + Display) |
| \`/dp-ad-angles-google search [produto]\` | Search Ads apenas (palavras-chave + RSA) |
| \`/dp-ad-angles-google youtube [produto]\` | Scripts YouTube apenas (In-Stream + Bumper + Discovery) |
| \`/dp-ad-angles-google display [produto]\` | Display / Discovery Ads apenas |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Pesquisa de palavras-chave (4 grupos × 15-25 palavras-chave)
│   ├── Alta Intenção (Bottom of Funnel)
│   ├── Média Intenção (Middle of Funnel)
│   ├── Baixa Intenção / Awareness (Top of Funnel)
│   └── Concorrente / Alternativa
├── Responsive Search Ads (1 RSA por grupo)
│   ├── 15 Headlines (máx 30 chars)
│   ├── 4 Descriptions (máx 90 chars)
│   └── Extensões (Sitelinks, Callouts, Snippets)
├── Scripts YouTube (3 formatos)
├── Display / Discovery Ads
├── Estrutura de campanha + Bidding
├── URLs com parâmetros UTM
└── Arquivo HTML: ads/google-angles-[data].html
\`\`\`

---

## Processo

\`\`\`
1. Context intake       → Coletar produto, audiência, orçamento, tipos de campanha (OBRIGATÓRIO)
2. Ler referências      → Carregar business-profile.md + conteúdo do produto se disponível
   Ler references/rsa-examples.md → para RSAs e scripts YouTube completos
3. Pesquisa de kw       → 4 grupos de palavras-chave por intent
4. Escrever copies RSA  → Headlines + Descriptions + Extensões
5. Scripts YouTube      → 3 scripts (In-Stream, Bumper, Discovery)
6. Display ads          → Headlines + Descriptions + Direção visual
7. Estrutura campanha   → Bidding + Orçamento + Timeline
8. Gerar UTMs           → Parâmetros de tracking para cada URL
9. Quality check        → Quality Score, compliance, specs
10. Entrega             → Arquivo HTML + resumo
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Sempre Faça Isso Primeiro)

### 1a. Carregar o perfil business (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, preço, URL do site
  → Extrair também: cores da marca (primary_color, accent_color, estilo visual)
  → Integrar as cores nos briefs criativos (direção artística, especificações visuais)
  → NÃO repetir as perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrirão o mínimo.
\`\`\`

### 1b. Fazer as perguntas por blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar por 2-3, aguardar as respostas, depois continuar.

#### Bloco 1 — O produto e o objetivo

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | Qual produto ou serviço quer promover? Descreva em 1-2 frases. | Define as palavras-chave e copies |
| Q2 | Qual é o preço? | Argumento de venda e bidding |
| Q3 | Quais tipos de campanha? \`search\` / \`youtube\` / \`display\` / \`all\` | Escopo da geração |

**Após as respostas**: Reformular. "Você quer campanhas [tipos] para [produto] a [preço]. Correto?"

#### Bloco 2 — A audiência e o orçamento

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | Quem é seu cliente ideal? Descreva o perfil (profissão, situação, frustração). | Palavras-chave e tom das copies |
| Q5 | Qual orçamento mensal para Google Ads? | Estrutura e recomendações de bidding |
| Q6 | Você tem uma URL de landing page? | Destino dos anúncios + UTM |

**Após as respostas**: Síntese audiência + orçamento.

#### Bloco 3 — Contexto existente

| # | Pergunta | Por que |
|---|----------|---------|
| Q7 | Você já tem uma conta no Google Ads? Se sim, o que funcionou / não funcionou? | Evitar erros passados |
| Q8 | Quais são seus principais concorrentes? (nomes ou URLs) | Grupo de palavras-chave "Concorrente" |
| Q9 | Você tem um foco de nicho específico? (ex: coaching fitness vs coaching de negócios) | Precisão das palavras-chave |

**Após as respostas**: Passar para a geração.

---

## Etapa 2 — Pesquisa de Palavras-Chave

Gerar grupos de palavras-chave organizados por intenção de busca:

### Grupo 1 — Alta Intenção (Bottom of Funnel)
Buscadores prontos para comprar uma solução.
\`\`\`
Palavras-chave: 15-25 termos
Match type: Frase + Exata
CPC estimado: [faixa alta]
Exemplos de formato:
  - [comprar/contratar] + [tipo de produto]
  - [tipo de produto] + [resultado desejado]
  - [solução] + [problema específico]
\`\`\`

### Grupo 2 — Média Intenção (Middle of Funnel)
Buscadores explorando soluções.
\`\`\`
Palavras-chave: 15-25 termos
Match type: Frase + Ampla (modificada)
CPC estimado: [faixa média]
Exemplos de formato:
  - como + [objetivo]
  - [atividade] + marketing / estratégia
  - melhor + [categoria]
\`\`\`

### Grupo 3 — Baixa Intenção / Awareness (Top of Funnel)
Buscadores com interesses adjacentes.
\`\`\`
Palavras-chave: 15-25 termos
Match type: Ampla
CPC estimado: [faixa baixa]
\`\`\`

### Grupo 4 — Concorrente / Alternativa
\`\`\`
Palavras-chave: 10-15 termos
Match type: Frase
CPC estimado: [faixa variável]
Formato: [concorrente] + alternativa / avaliação / comparação
\`\`\`

### Palavras-chave negativas (obrigatório)
\`\`\`
Sempre incluir:
  - grátis / free (se o alvo são compradores)
  - emprego / vaga / salário / contratação
  - formação profissionalizante / certificação / diploma
  - [termos não relevantes para o nicho]
\`\`\`

---

## Etapa 3 — Responsive Search Ads (RSA)

Para cada grupo de palavras-chave, criar um RSA:

\`\`\`
RESPONSIVE SEARCH AD — [Nome do grupo]
========================================

Headlines (15 — máx 30 caracteres cada):
H1: [headline]  ← fixar em posição 1 (incluir a palavra-chave principal)
H2: [headline]  ← fixar em posição 2
H3-H15: [headlines variados — benefícios, preço, CTA, urgência]

Descriptions (4 — máx 90 caracteres cada):
D1: [description]  ← fixar em posição 1 (incluir palavra-chave + CTA)
D2-D4: [descriptions variadas]

Display URL path: [domínio]/[path1]/[path2]

Extensões Sitelink:
- [Título] → [URL] | [Linha descrição 1] | [Linha descrição 2]
- [Título] → [URL] | [Linha descrição 1] | [Linha descrição 2]
- [Título] → [URL] | [Linha descrição 1] | [Linha descrição 2]
- [Título] → [URL] | [Linha descrição 1] | [Linha descrição 2]

Extensões Callout:
- [callout 1 — máx 25 chars]
- [callout 2]
- [callout 3]
- [callout 4]

Structured Snippets:
- Tipo: [Tipos / Funcionalidades / Marcas]
- Valores: [valor1], [valor2], [valor3]
\`\`\`

---

## Etapa 4 — Scripts YouTube

Criar 3 scripts YouTube:

### Script 1 — In-Stream Pulável (15-30 segundos)
\`\`\`
[0-5s] HOOK — Deve fisgar ANTES do botão "Pular"
"[Pergunta ou declaração impactante relacionada ao problema]"

[5-15s] PROBLEMA + AGITAÇÃO
"[Desenvolver a frustração — mostrar que entende]"

[15-25s] SOLUÇÃO + PROVA
"[Apresentar o produto + resultado concreto]"

[25-30s] CTA
"[Preço]. [Promessa curta]. Link na descrição."

DIREÇÃO VISUAL:
- [talking head / screen recording / texto animado]
- Texto overlay para as frases-chave
- Cortes rápidos, sem introdução lenta
- Cores da marca (primary_color, accent_color) para os overlays e elementos gráficos
\`\`\`

### Script 2 — Bumper Ad (6 segundos)
\`\`\`
"[Problema em 1 frase]?
[Solução] — [Preço].
[Nome da marca / URL]."
\`\`\`

### Script 3 — Discovery Ad (60-90 segundos)
\`\`\`
[Formato longo para YouTube Discovery / In-feed]
[Script detalhado com abordagem storytelling]
[Estrutura: Hook → Contexto → Problema → Solução → Prova → CTA]
\`\`\`

---

## Etapa 5 — Display / Discovery Ads

\`\`\`
DISPLAY AD SET
==============
Headline 1 (30 chars): [headline]
Headline 2 (30 chars): [headline]
Headline 3 (30 chars): [headline]
Long Headline (90 chars): [headline]
Description 1 (90 chars): [description]
Description 2 (90 chars): [description]
Nome da empresa: [do business-profile ou intake]

Specs de imagem:
- Paisagem: 1200×628
- Quadrado: 1200×1200
- Retrato: 960×1200

Direção visual: [descrição do que as imagens devem mostrar]
Cores: Usar as cores da marca (primary_color, accent_color) para coerência visual

Segmentação de audiência:
- In-market: [segmentos]
- Afinidade: [segmentos]
- Custom intent: [palavras-chave]
- Remarketing: [visitantes do site, viewers YouTube]
\`\`\`

---

## Etapa 6 — Estrutura da Campanha e Bidding

\`\`\`
ESTRUTURA DA CAMPANHA
=====================

Campanha 1: Search — Alta Intenção
  Orçamento: [X] R$/dia
  Bidding: CPA alvo ou Maximizar Conversões
  Ad Groups: [por grupo de palavras-chave]
  Objetivo Quality Score: ≥7 para cada palavra-chave

Campanha 2: Search — Média Intenção
  Orçamento: [X] R$/dia
  Bidding: Maximizar Cliques → mudar para tCPA após 30 conversões

Campanha 3: YouTube — In-Stream
  Orçamento: [X] R$/dia
  Bidding: CPV máximo
  Segmentação: Custom intent + In-market audiences

Campanha 4: Display — Remarketing
  Orçamento: [X] R$/dia
  Bidding: CPA alvo
  Segmentação: Visitantes do site (30 dias), viewers YouTube

TIMELINE DE TESTE:
Semana 1: Lançar campanhas 1 e 3
Semana 2: Adicionar campanha 2, analisar os termos de busca
Semana 3: Adicionar campanha 4 (remarketing), otimizar os lances
Semana 4: Cortar os subperformantes, escalar os vencedores
\`\`\`

## Etapa 7 — Parâmetros UTM

Gerar os UTM para CADA URL de anúncio:

\`\`\`
FORMATO UTM PADRÃO:
  utm_source=google
  utm_medium=cpc (search) | video (youtube) | display
  utm_campaign=[product-slug]-[campaign-type]
  utm_content=[ad-group-name]
  utm_term=[keyword] (search apenas)

EXEMPLO SEARCH:
  https://exemplo.com/produto?utm_source=google&utm_medium=cpc&utm_campaign=meu-produto-search&utm_content=alta-intencao&utm_term=comprar+guia

EXEMPLO YOUTUBE:
  https://exemplo.com/produto?utm_source=google&utm_medium=video&utm_campaign=meu-produto-youtube&utm_content=instream-script1
\`\`\`

---

## Referência de Specs Google Ads

| Elemento | Limite |
|----------|--------|
| RSA Headline | 30 caracteres |
| RSA Description | 90 caracteres |
| Display Headline | 30 caracteres |
| Display Long Headline | 90 caracteres |
| Display Description | 90 caracteres |
| Sitelink Title | 25 caracteres |
| Sitelink Description | 35 caracteres por linha |
| Callout | 25 caracteres |
| URL Path | 15 caracteres por segmento |

## Regras de Copy

- **Combinar com a intenção de busca** — A copy deve responder ao que o buscador quer
- **Incluir a palavra-chave** em pelo menos o Headline 1 e a Description 1
- **Usar números** — preço, duração, quantidades concretas
- **CTA em cada descrição** — Ação clara e direta
- **Sem superlativos sem prova** — Não dizer "melhor" sem justificativa
- **Transparência de preço** — Se o preço é competitivo, é uma vantagem
- **Nenhuma declaração de receita** — Resultados concretos, sem promessas financeiras

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder [TODO], [INSERIR], Lorem ipsum | Crítico |
| QG-02 | Nenhuma garantia de receita ou promessa de resultados financeiros | Crítico |
| QG-03 | Todas as contagens de caracteres respeitam os limites exatos do Google | Crítico |
| QG-04 | Cada RSA tem exatamente 15 headlines e 4 descriptions | Crítico |
| QG-05 | H1 e D1 incluem a palavra-chave principal do grupo | Alto |
| QG-06 | Cada URL inclui parâmetros UTM completos | Alto |
| QG-07 | Palavras-chave negativas definidas para cada campanha | Alto |
| QG-08 | Nunca recomendar broad match sem smart bidding | Crítico |
| QG-09 | Sempre incluir os parâmetros UTM | Crítico |
| QG-10 | Nunca prometer um ROAS específico | Crítico |
| QG-11 | Objetivo Quality Score ≥7 para as palavras-chave de alta intenção | Alto |
| QG-12 | Hooks YouTube fisgam nos primeiros 5 segundos (antes do skip) | Alto |
| QG-13 | Orçamentos realistas para uma pequena empresa | Alto |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Produto não definido | Perguntar: "Qual produto quer promover?" Mínimo = nome + preço + descrição |
| Sem URL de landing page | Gerar as copies com placeholder \`[URL_LANDING_PAGE]\`. Sugerir \`/dp-landing-page\` |
| Orçamento muito baixo (<R$600/mês) | Recomendar apenas Search Alta Intenção. Sem Display nem YouTube |
| Concorrentes não identificados | Omitir o Grupo 4 (Concorrente). Reforçar os grupos 1-3 |
| Nicho muito específico / baixo volume | Ampliar as palavras-chave com termos adjacentes. Recomendar Broad + Smart Bidding |
| business-profile.md ausente | Continuar com as respostas do context intake apenas |
| O usuário quer um único tipo de campanha | Gerar apenas o tipo solicitado. Mencionar os outros como recomendação |
| Quality Score previsto <7 | Recomendar melhorar a landing page (relevância, velocidade, conteúdo) |

---

## Integração Cross-Skill

| Antes do ad-angles-google | Skill anterior | Quando |
|---------------------------|----------------|--------|
| Página de venda pronta | \`/dp-landing-page\` | Sempre recomendado — a landing page impacta o Quality Score |
| Perfil business definido | \`business-profile.md\` | Para evitar perguntas redundantes |
| Funil desenhado | \`/dp-sales-funnel\` | Para alinhar a estratégia global |

| Depois do ad-angles-google | Próximo skill | Quando |
|----------------------------|---------------|--------|
| Anúncios Meta em complemento | \`/dp-ad-angles-meta\` | Para cobrir Social Ads além do Search |
| Conteúdo orgânico | \`/dp-social-caption\` \`/dp-mediaplan\` | Para reforçar a presença orgânica |
| Sequência de email | \`/dp-email-sequence\` | Para nutrir os leads captados |
| Blog SEO | \`/dp-blog-article\` | Para melhorar o Quality Score via conteúdo do site |

---

# Exemplo — RSA e Script YouTube

## Academia FitPro — Playbook do Coach Fitness (R$ 197)

> **Produto:** Playbook do Coach Fitness
> **Nicho:** Coaching fitness
> **Audiência:** Coaches fitness iniciantes (1-3 anos de experiência)
> **Voz:** Direta, motivadora, sem enrolação, tutear
> **Cores:** \`#059669\` (verde primário) / \`#10b981\` (verde accent)

---

## RSA #1 — Alta Intenção

**Palavra-chave alvo:** \`como se tornar coach fitness\`
**Intenção:** O usuário busca ativamente se lançar ou estruturar sua atividade de coaching fitness.

### Headlines (15 títulos — máx 30 caracteres cada)

| # | Título | Caracteres |
|---|--------|------------|
| H1 | Seja Coach Fitness Rentável | 27 |
| H2 | Playbook do Coach Fitness | 25 |
| H3 | Lance Seu Coaching em 90 Dias | 29 |
| H4 | Método Testado em +200 Coaches | 30 |
| H5 | 7 Frameworks Para Ter Sucesso | 29 |
| H6 | Encontre Seus Primeiros Clientes | 32* |
| H7 | De 0 a 10 Clientes Por Mês | 26 |
| H8 | Só R$ 197 — Sem Assinatura | 27 |
| H9 | Coach Fitness: O Guia Completo | 30 |
| H10 | Para de Dar Coaching de Graça | 29 |
| H11 | 8 Anos de Exp. em 1 Guia | 24 |
| H12 | Resultados na 1ª Semana | 22 |
| H13 | Coaching Fitness: O Método | 26 |
| H14 | Baixe e Aplique Hoje à Noite | 28 |
| H15 | Academia FitPro — Playbook | 26 |

**Notas de fixação:**
- H1 ou H2: fixar na posição 1 (contém a palavra-chave)
- H8: fixar na posição 2 (contém o preço = filtra os curiosos)
- H15: fixar na posição 3 (branding)

---

### Descriptions (4 descriptions — máx 90 caracteres cada)

| # | Description | Caracteres |
|---|-------------|------------|
| D1 | O método exato para ir de 0 a 10 clientes/mês em coaching fitness. R$ 197. | 73 |
| D2 | 7 frameworks testados em +200 coaches. Aquisição, conversão, fidelização. | 72 |
| D3 | Para de lutar sozinho. O Playbook te dá um sistema completo por R$ 197. | 70 |
| D4 | Baixe o guia, aplique hoje à noite, feche seus primeiros clientes essa semana. | 77 |

**Notas de fixação:**
- D1: fixar na posição 1 (palavra-chave + preço)
- D2-D4: deixar em rotação livre

---

### Extensões Sitelink (4)

| Título do sitelink | Descrição linha 1 | Descrição linha 2 | URL |
|--------------------|-------------------|-------------------|-----|
| Depoimentos Coaches | Lucas: 3 clientes em 2 semanas | Sofia: agenda cheia em 6 semanas | \`/depoimentos\` |
| O Que Está Incluso | 7 frameworks completos | Templates, scripts, sequências | \`/conteudo-playbook\` |
| Sobre a Academia FitPro | 8 anos de experiência | +200 coaches acompanhados | \`/sobre\` |
| FAQ — Playbook | Respostas às suas dúvidas | Garantia, acesso, suporte | \`/faq\` |

---

### Extensões Callout (4)

| # | Callout |
|---|---------|
| 1 | Acesso imediato |
| 2 | +200 coaches formados |
| 3 | Sem assinatura |
| 4 | Aplicável hoje à noite |

---

### Extensões adicionais recomendadas

- **Extensão de preço:** "Playbook do Coach Fitness — R$ 197"
- **Extensão de imagem:** Mockup do playbook em fundo \`#059669\`
- **Snippet estruturado:** Tipo: "Incluso" → "Scripts DM", "Templates de Post", "Sequências de Email", "Frameworks de Aquisição"

---

### UTM

\`\`\`
?utm_source=google&utm_medium=cpc&utm_campaign=alta-intencao-coach-fitness&utm_content=rsa-v1
\`\`\`

---

## RSA #2 — Média Intenção

**Palavra-chave alvo:** \`como encontrar clientes coaching\`
**Intenção:** O usuário já tem uma atividade mas tem dificuldade em encontrar clientes. Busca soluções, não necessariamente um produto.

### Headlines (15 títulos — máx 30 caracteres cada)

| # | Título | Caracteres |
|---|--------|------------|
| H1 | Encontrar Clientes Coaching | 27 |
| H2 | O Método em 7 Etapas | 20 |
| H3 | Feche 5-10 Clientes Por Mês | 27 |
| H4 | Chega de Clientes Fantasmas | 27 |
| H5 | Sem Anúncio, Sem Dançar | 23 |
| H6 | Playbook do Coach Fitness | 25 |
| H7 | Método Testado em +200 Coaches | 30 |
| H8 | Resultados em 2 Semanas | 22 |
| H9 | Script DM Que Converte a 40% | 28 |
| H10 | Agenda Cheia em 90 Dias | 22 |
| H11 | R$ 197 — Acesso Imediato | 24 |
| H12 | Sistema Completo de Aquisição | 29 |
| H13 | Para de Fazer Coaching Grátis | 29 |
| H14 | Guia Para Baixar Agora | 21 |
| H15 | +387 Coaches Já Usam | 20 |

**Notas de fixação:**
- H1: fixar na posição 1 (reflete a intenção de busca)
- H6: fixar na posição 2 (nome do produto)
- H11: fixar na posição 3 (preço = qualificação)

---

### Descriptions (4 descriptions — máx 90 caracteres cada)

| # | Description | Caracteres |
|---|-------------|------------|
| D1 | Dificuldade em encontrar clientes? O método usado por +387 coaches fitness. | 73 |
| D2 | 7 sistemas concretos: scripts DM, posts ímã, sequências de email. Tudo por R$ 197. | 82 |
| D3 | Sem teoria inútil. Baixe o Playbook, aplique os frameworks, feche clientes. | 73 |
| D4 | De 0 cliente a agenda cheia. O método passo a passo testado por 8 anos. R$ 197. | 79 |

---

### Extensões Sitelink (4)

| Título do sitelink | Descrição linha 1 | Descrição linha 2 | URL |
|--------------------|-------------------|-------------------|-----|
| Método Completo | 7 frameworks de aquisição | Da prospecção ao fechamento | \`/metodo\` |
| Resultados Reais | Depoimentos verificados | Coaches iniciantes como você | \`/resultados\` |
| Extrato Gratuito | Conheça o Framework nº 1 | Download imediato | \`/extrato-gratuito\` |
| Garantia 30 Dias | Não satisfeito? Reembolsado | Zero risco para você | \`/garantia\` |

---

### Extensões Callout (4)

| # | Callout |
|---|---------|
| 1 | Sem publicidade paga |
| 2 | Resultados em 14 dias |
| 3 | Garantia 30 dias |
| 4 | Suporte incluído |

---

### UTM

\`\`\`
?utm_source=google&utm_medium=cpc&utm_campaign=media-intencao-encontrar-clientes&utm_content=rsa-v1
\`\`\`

---

## Comparação Estratégica RSA #1 vs RSA #2

| Critério | RSA #1 (Alta Intenção) | RSA #2 (Média Intenção) |
|----------|------------------------|--------------------------|
| **Intenção** | Quer se tornar coach / estruturar | Busca soluções de aquisição |
| **Tom dominante** | Aspiração, transformação | Resolução de problema |
| **Destaque** | Método completo, credibilidade | Resultados rápidos, provas sociais |
| **Preço exibido** | Sim (qualifica antecipadamente) | Sim (mas posição 3, menos agressivo) |
| **Lance sugerido** | CPC máx R$ 4-7 | CPC máx R$ 2-4 |
| **Página de destino** | Sales page longa | Sales page + lead magnet na saída |

---

## Script YouTube In-Stream — 30 segundos

**Objetivo:** Awareness + conversão direta
**Formato:** In-Stream pulável (pular possível após 5s)
**Audiência:** Custom Intent (buscas: "como ser coach fitness", "encontrar clientes coaching", "viver do coaching esportivo")

### Script detalhado

| Timing | Áudio (voz off) | Visual | Texto na tela |
|--------|-----------------|--------|---------------|
| **0-2s** | "Coach fitness?" | Close no rosto, olhar câmera, fundo neutro. Corte rápido. | Texto bold branco em fundo \`#059669\`: "COACH FITNESS?" |
| **2-5s** | "Se você tem zero cliente esse mês, veja isso." | O coach aponta para a câmera. Transição zoom out. | "0 CLIENTE?" em vermelho → transição para \`#059669\` |
| **5-8s** | "O problema não é que você é um coach ruim." | B-roll: coach sozinho num estúdio vazio, olhando o celular. | Legendas dinâmicas |
| **8-12s** | "É que ninguém te deu um SISTEMA. Você posta no feeling, faz coaching de graça, espera os clientes caírem do céu." | Montagem rápida: tela Instagram com 0 curtidas, mensagem "obrigado pela sessão gratuita", calendário vazio. | Palavras-chave destacadas em \`#10b981\`: "sistema", "de graça", "céu" |
| **12-15s** | "Levei 8 anos pra construir esse sistema. Você pode baixar em 30 segundos." | Transição dinâmica: estúdio vazio → estúdio cheio. O coach de frente para câmera, confiante. | "8 ANOS → 30 SEGUNDOS" em tipografia bold |
| **15-20s** | "O Playbook do Coach Fitness: 7 frameworks para ir de 0 a 10 clientes por mês. Aquisição, conversão, fidelização — o ciclo completo." | Mockup do playbook animado. Os 7 frameworks aparecem um por um. Fundo \`#059669\`. | Lista animada em fundo verde: os 7 itens |
| **20-25s** | "387 coaches já usam. Lucas fechou 3 clientes em 2 semanas. Sofia encheu a agenda em 6 semanas." | Split screen com fotos dos coaches + resultados (capturas de tela de mensagens). | Badges de depoimentos, nomes em \`#10b981\` |
| **25-28s** | "R$ 197. O preço de uma sessão. Só que aqui é todo o seu negócio que muda." | Close no preço "R$ 197" com animação de tachado sobre um preço "R$ 497". | "R$ 197" em muito grande, \`#059669\` |
| **28-30s** | "Clica no link. Baixa. Aplica hoje à noite." | CTA em tela cheia, fundo \`#059669\`, botão branco "BAIXAR". Logo Academia FitPro. | "BAIXAR O PLAYBOOK — R$ 197" + logo |

---

### Companion Banner (300x60)

| Elemento | Detalhe |
|----------|---------|
| **Texto principal** | Playbook do Coach Fitness — R$ 197 |
| **CTA** | Baixar |
| **Cores** | Fundo \`#059669\`, texto branco, botão \`#10b981\` |
| **Logo** | Academia FitPro (pequeno, à esquerda) |

---

### Notas de Produção

- **Legendas:** Obrigatórias, estilo bold branco com sombra
- **Música:** Beat motivador, crescimento progressivo, drop na transição problema → solução
- **Ritmo:** Cortes a cada 2-3 segundos, nunca um plano estático >3s
- **Cores dominantes:** \`#059669\` para os fundos CTA, \`#10b981\` para os accents e highlights
- **Proporção:** 16:9 (padrão YouTube)
- **Resolução:** 1920x1080 mínimo

---

### UTM para YouTube

\`\`\`
?utm_source=google&utm_medium=video&utm_campaign=youtube-instream&utm_content=30s-v1
\`\`\`

---

## Checklist Antes de Lançar Google Ads

- [ ] Conversion tracking configurado (compra R$ 197)
- [ ] Página de destino score mobile ≥ 90 (PageSpeed Insights)
- [ ] Correspondência de mensagem: headline RSA = H1 da landing page
- [ ] Palavras-chave negativas adicionadas: "grátis", "formação certificada", "diploma", "CREF"
- [ ] Orçamento de teste: R$ 50-80/dia por campanha, 7 dias mínimo
- [ ] Estratégia de lances: Maximizar conversões (após 30 conversões → CPA alvo)
- [ ] Audiências de observação: afinidades fitness + in-market coaching
- [ ] Exclusão: clientes existentes (lista de emails enviada)
`,
};

export default skill;
