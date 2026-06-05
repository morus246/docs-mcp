import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-market-research",
  categoria: "Fundação",
  descricao: "Valide uma ideia de produto digital (ebook, guia, playbook) ANTES de criá-lo. Analisa a demanda, a concorrência, o pricing, o público e a viabilidade. Score de validação 0-100 com veredicto GO / TEST / STOP. Usa apenas fontes gratuitas (Google Trends, Reddit, Amazon, YouTube, Q&A). Evita perder 30h num produto que ninguém quer.",
  argumentHint: "[ideia de produto] [nicho]",
  allowedTools: ["Read", "Write", "Bash", "Glob", "WebSearch", "WebFetch"],
  conteudo: `# Market Research — Validação de Ideia de Produto Digital

<!-- v2.0.0 | 2026-04-18 | Criação: validação de ideia, scoring 12 dimensões, veredicto GO/TEST/STOP, fontes gratuitas, testes rápidos -->

Este skill responde À pergunta que todo criador deveria fazer ANTES de passar 30 horas escrevendo um ebook: **"Alguém vai comprar isso?"**

Analisa a demanda real, a concorrência existente, o potencial de pricing e a sua capacidade de se diferenciar — tudo com fontes gratuitas e um veredicto claro.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-market-research [ideia]\` | Validação completa guiada (12 dimensões, veredicto) |
| \`/dp-market-research express [ideia]\` | Validação rápida — 5 dimensões-chave, veredicto em 10 min |
| \`/dp-market-research competitors [nicho]\` | Foco concorrência apenas (quem vende o quê, a que preço) |
| \`/dp-market-research demand [assunto]\` | Foco demanda apenas (volume, perguntas, dores) |
| \`/dp-market-research pivot [ideia]\` | Encontrar um ângulo melhor se a ideia inicial for fraca |

## Formato do Entregável

\`\`\`
ENTREGÁVEL: market-research/validacao-[slug].md

├── Ficha ideia (síntese validada)
├── Análise da demanda (5 sinais)
├── Mapeamento da concorrência (3-5 concorrentes analisados)
├── Análise de pricing (faixa recomendada)
├── Score de validação 0-100 (12 dimensões ponderadas)
├── Veredicto: GO / TEST / STOP
├── Riscos identificados + mitigações
├── Testes rápidos a lançar (se veredicto = TEST)
└── Recomendações concretas (ângulo, preço, formato, público)
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto      → Sua ideia, sua expertise, seu público atual
2. Análise da demanda      → As pessoas buscam esse assunto? Sofrem com esse problema?
3. Mapeamento da concorrência → Quem já vende um produto similar? A que preço? Com que qualidade?
4. Análise de pricing      → Quanto o mercado está disposto a pagar?
5. Avaliação da sua posição → Você consegue se diferenciar? Tem credibilidade?
6. Scoring 12 dimensões    → Score 0-100 com ponderação
7. Veredicto               → GO / TEST / STOP com justificativa
8. Plano de ação           → Se GO: próximos passos. Se TEST: testes a lançar. Se STOP: alternativas.
9. Entrega                 → Relatório salvo + resumo
\`\`\`

---

## Etapa 1 — Coleta de Contexto (Obrigatória)

### 1a. Carregar o perfil business (silencioso)

\`\`\`
SE business-profile.md existe:
  → Ler nicho, público, produtos existentes, voz, orçamento
  → Adaptar a análise ao contexto existente
  → NÃO fazer as perguntas já cobertas

SENÃO:
  → Fazer todas as perguntas abaixo
\`\`\`

### 1b. Perguntas por blocos

#### Bloco 1 — A Ideia

| # | Pergunta | Por quê |
|---|----------|---------|
| P1 | **Qual é a sua ideia de produto?** Descreva em 2-3 frases o que quer criar. | Enquadra a análise |
| P2 | **Qual formato?** Ebook / playbook / guia / curso em vídeo / pack de templates / outro | Determina o mercado a analisar |
| P3 | **Qual resultado concreto o cliente obteria?** Não "aprender marketing" — um resultado mensurável. | Teste da proposta de valor |

**Após as respostas**: Reformular: "Você quer criar um [formato] sobre [assunto] que permite a [público] [resultado]. Correto?"

#### Bloco 2 — Você e Seu Público

| # | Pergunta | Por quê |
|---|----------|---------|
| P4 | **Qual é o seu nível de expertise nesse assunto?** Expert (5+ anos) / Intermediário (2-4 anos) / Iniciante (< 2 anos) | Credibilidade e profundidade possível |
| P5 | **Você já tem um público?** Se sim: quantos assinantes de email, seguidores, visitantes/mês? Se não: "parto do zero". | Capacidade de distribuição |
| P6 | **Você já vendeu um produto digital?** Se sim: qual, a que preço, quantas vendas? | Experiência de venda |

#### Bloco 3 — O Mercado

| # | Pergunta | Por quê |
|---|----------|---------|
| P7 | **Você conhece concorrentes diretos?** Nomes, URLs ou "não sei — pesquise por mim". | Ponto de partida para o mapeamento |
| P8 | **Que preço você imagina?** Mesmo aproximado (ex: "entre R$ 97 e R$ 197"). | Posiciona a análise de pricing |
| P9 | **Qual é o seu objetivo?** Renda passiva / lançar um negócio / lead magnet para consultoria / testar um mercado | Influencia o veredicto |

---

## Etapa 2 — Análise da Demanda

> **Objetivo**: Determinar se PESSOAS REAIS buscam ativamente uma solução para esse problema.

### 2a. Sinais de demanda (5 fontes gratuitas)

Para cada fonte, buscar o assunto da ideia e avaliar a demanda:

#### Fonte 1 — Google Trends

\`\`\`
WebSearch: "[assunto] site:trends.google.com" OU usar WebFetch no Google Trends
\`\`\`

| Sinal | Score |
|-------|-------|
| Tendência em alta nos últimos 12 meses | 9-10 |
| Estável (nem alta nem queda) | 6-7 |
| Em queda | 3-4 |
| Sem dados (assunto muito nichado) | 2-3 |
| Picos sazonais (janeiro fitness, setembro volta às aulas) | 7-8 (se timing alinhado) |

#### Fonte 2 — Reddit / Fóruns / Comunidades

\`\`\`
WebSearch: "[assunto] site:reddit.com"
WebSearch: "[problema do público] reddit"
\`\`\`

Contar e analisar:
- Número de posts sobre o assunto nos últimos 12 meses
- Número médio de comentários por post (engajamento)
- Perguntas recorrentes (sinal de dor não resolvida)
- Frustrações expressas (sinal forte de demanda)

| Sinal | Score |
|-------|-------|
| 50+ posts recentes com 10+ comentários | 9-10 |
| 20-50 posts, engajamento moderado | 7-8 |
| 10-20 posts, engajamento fraco | 5-6 |
| < 10 posts, assunto raro | 2-4 |

**Extrair**: As 5 perguntas/frustrações mais frequentes (= futuro conteúdo do playbook).

#### Fonte 3 — YouTube

\`\`\`
WebSearch: "[assunto] site:youtube.com"
\`\`\`

| Sinal | Score |
|-------|-------|
| Vídeos com 100K+ visualizações sobre o assunto | 9-10 |
| Vídeos com 10-100K visualizações | 7-8 |
| Vídeos com 1-10K visualizações | 5-6 |
| Poucos/nenhum vídeo | 3-4 |

**O que indica**: Se YouTubers fazem vídeos gratuitos sobre o assunto, há interesse. Se esses vídeos têm muitas visualizações, a demanda está comprovada.

#### Fonte 4 — Amazon KDP / Livros existentes

\`\`\`
WebSearch: "[assunto] ebook amazon"
WebSearch: "[assunto] kindle"
\`\`\`

| Sinal | Score |
|-------|-------|
| 10+ ebooks sobre o assunto, com reviews | 8-9 (demanda comprovada, concorrência a analisar) |
| 5-10 ebooks, poucas reviews | 6-7 (demanda moderada) |
| 1-4 ebooks | 5-6 (nichado, potencial se bem diferenciado) |
| Nenhum ebook | 3-4 (ou sem demanda, ou oportunidade inexplorada — investigar) |

**Atenção**: Muita concorrência = demanda real. Pouca concorrência pode significar ausência de demanda OU oportunidade. Cruzar com os outros sinais.

#### Fonte 5 — Quora / AnswerThePublic / People Also Ask

\`\`\`
WebSearch: "[assunto] site:quora.com"
WebSearch: "[pergunta do cliente ideal]"
\`\`\`

| Sinal | Score |
|-------|-------|
| 20+ perguntas no Quora com respostas detalhadas | 8-9 |
| 10-20 perguntas | 6-7 |
| < 10 perguntas | 4-5 |
| Perguntas Google "People Also Ask" abundantes | +1 bônus |

### 2b. Síntese da demanda

\`\`\`
ANÁLISE DA DEMANDA — "[Assunto]"
════════════════════════════════

Google Trends        : [score /10] — [comentário: alta/estável/queda]
Reddit / Fóruns      : [score /10] — [X posts, Y comentários, Z frustrações]
YouTube              : [score /10] — [X vídeos, máx Y visualizações]
Amazon / Ebooks      : [score /10] — [X ebooks existentes, Z reviews]
Quora / Q&A          : [score /10] — [X perguntas]

SCORE MÉDIO DEMANDA  : [X/10]

TOP 5 DORES IDENTIFICADAS:
1. "[Dor extraída dos fóruns/Q&A]"
2. "[Dor]"
3. "[Dor]"
4. "[Dor]"
5. "[Dor]"

PERGUNTAS FREQUENTES (futuro conteúdo):
1. "[Pergunta encontrada]"
2. "[Pergunta]"
3. "[Pergunta]"
\`\`\`

---

## Etapa 3 — Mapeamento da Concorrência

> **Objetivo**: Saber exatamente quem vende o quê, a que preço e onde estão as lacunas.

### 3a. Encontrar 3-5 concorrentes

\`\`\`
WebSearch: "[assunto] ebook"
WebSearch: "[assunto] playbook"
WebSearch: "[assunto] guia [preço]"
WebSearch: "[assunto] curso"
WebSearch: "[assunto] hotmart OR kiwify OR eduzz OR teachable OR podia"
\`\`\`

Se o usuário deu nomes (P7), analisá-los diretamente.

### 3b. Analisar cada concorrente

Para cada concorrente, visitar a página de venda (WebFetch) e extrair:

\`\`\`
CONCORRENTE [N]: [Nome]
═══════════════════════

URL             : [url da página de venda]
Produto         : [nome do produto]
Formato         : [ebook / curso em vídeo / membership / coaching]
Preço           : [preço — ou faixa se houver múltiplos tiers]
Páginas / Duração: [número de páginas ou duração do curso]
Público-alvo    : [quem eles atingem — extraído do copy deles]
Promessa        : [headline ou proposta de valor principal]
Prova social    : [número de reviews, depoimentos visíveis, "X clientes"]
Marketing       : [canais visíveis: blog, YouTube, Insta, ads, email]
Pontos fortes   : [2-3 pontos fortes observáveis]
Pontos fracos   : [2-3 pontos fracos ou lacunas]
\`\`\`

### 3c. Matriz comparativa

| Dimensão | Concorrente 1 | Concorrente 2 | Concorrente 3 | VOCÊ (estimado) |
|----------|--------------|--------------|--------------|-----------------|
| Preço | [preço] | [preço] | [preço] | [seu preço estimado] |
| Formato | [ebook/curso] | | | [seu formato] |
| Páginas/Volume | [X páginas] | | | [60+ páginas] |
| Profundidade | [/10] | [/10] | [/10] | [/10 estimado] |
| Acionabilidade | [/10] | [/10] | [/10] | [/10] |
| Prova social | [/10] | [/10] | [/10] | [/10] |
| Design/UX | [/10] | [/10] | [/10] | [/10] |
| SEO/Visibilidade | [/10] | [/10] | [/10] | [/10] |
| Unicidade ângulo | [/10] | [/10] | [/10] | [/10] |

### 3d. Identificar as lacunas

\`\`\`
LACUNAS DE MERCADO (oportunidades)
════════════════════════════════

LACUNA 1: [O que NINGUÉM cobre — ex: "nenhum concorrente oferece templates prontos para copiar"]
  → Impacto: [alto/médio/baixo]
  → Ação: [como você pode preencher essa lacuna]

LACUNA 2: [Formato faltando — ex: "todos fazem cursos em vídeo, nenhum ebook acionável"]
  → Impacto: [alto/médio/baixo]
  → Ação: [como você pode preencher essa lacuna]

LACUNA 3: [Público ignorado — ex: "todos miram avançados, ninguém mira iniciantes"]
  → Impacto: [alto/médio/baixo]
  → Ação: [como você pode preencher essa lacuna]
\`\`\`

---

## Etapa 4 — Análise de Pricing

> **Objetivo**: Definir uma faixa de preço realista baseada no mercado e na sua posição.

### 4a. Mapeamento dos preços

\`\`\`
PREÇOS DO MERCADO — "[Assunto]"
════════════════════════════

Concorrente 1: [preço] — [formato] — [volume]
Concorrente 2: [preço] — [formato] — [volume]
Concorrente 3: [preço] — [formato] — [volume]
Concorrente 4: [preço] — [formato] — [volume]
Concorrente 5: [preço] — [formato] — [volume]

Preço médio   : R$ [X]
Preço mediano : R$ [X]
Faixa         : R$ [min] — R$ [max]
\`\`\`

### 4b. Recomendação de preço

| Posição | Preço recomendado | Quando |
|---------|------------------|--------|
| **Abaixo do mercado** | Mediano × 0,6-0,8 | Você está começando, sem prova social, precisa dos primeiros clientes |
| **No mercado** | Mediano × 0,9-1,1 | Você tem público moderado, produto comparável |
| **Acima do mercado** | Mediano × 1,3-2,0 | Você tem forte credibilidade, ângulo único, conteúdo premium |

### 4c. Cálculo de rentabilidade

\`\`\`
SIMULAÇÃO DE RENTABILIDADE
═══════════════════════════

Preço estimado          : R$ [X]
Custo de criação        : ~30h de trabalho = [R$ X em valor-hora]
Custo de lançamento     : ~R$ [X] (ads + ferramentas)

CENÁRIO PESSIMISTA (10 vendas/mês):
  Receita mensal : R$ [X]
  Break-even     : [N] meses

CENÁRIO REALISTA (30 vendas/mês):
  Receita mensal : R$ [X]
  Break-even     : [N] meses

CENÁRIO OTIMISTA (100 vendas/mês):
  Receita mensal : R$ [X]
  Break-even     : [N] meses

VEREDICTO RENTABILIDADE: [Rentável a partir do mês X / Exige volume / Não rentável sem upsell]
\`\`\`

---

## Etapa 5 — Avaliação da Sua Posição

> **Objetivo**: Avaliar honestamente se VOCÊ é a pessoa certa para esse produto.

### 5a. Autoavaliação (guiada)

| Dimensão | Pergunta | Score |
|----------|----------|-------|
| Expertise | Você consegue falar sobre esse assunto por 2h sem anotações? | /10 |
| Credibilidade | Alguém já pagou por esse seu conhecimento? | /10 |
| Resultados | Você obteve os resultados que promete? | /10 |
| Público | Você tem acesso a pessoas que comprariam? | /10 |
| Diferenciação | O que você oferece que os outros não conseguem? | /10 |
| Paixão | Você vai estar motivado para vender esse produto por 6 meses? | /10 |

### 5b. Análise de diferenciação

\`\`\`
SEU ÂNGULO ÚNICO
════════════════

O que os concorrentes fazem    : [resumo em 2 linhas]
O que ninguém faz              : [lacuna identificada na Etapa 3]
Sua vantagem competitiva       : [expertise + ângulo + formato]
Sua promessa diferenciante     : "[Em 1 frase: por que comprar de você]"

FORÇA DE DIFERENCIAÇÃO: [Forte / Média / Fraca]

SE FRACA:
  → Opção A: Mudar o ângulo (mirar um subsegmento ignorado)
  → Opção B: Mudar o formato (ebook quando todos fazem cursos)
  → Opção C: Mudar o preço (subcotar agressivamente para os primeiros clientes)
  → Opção D: Pivotar para outro assunto
\`\`\`

---

## Etapa 6 — Scoring de Validação (12 dimensões)

### Matriz de scoring

| # | Dimensão | Peso | Score /10 | Ponderado |
|---|----------|------|-----------|-----------|
| 1 | Demanda Google Trends | 10% | [X] | [X × 0,10] |
| 2 | Demanda Reddit/Fóruns | 10% | [X] | [X × 0,10] |
| 3 | Demanda YouTube | 5% | [X] | [X × 0,05] |
| 4 | Demanda Amazon/Ebooks | 5% | [X] | [X × 0,05] |
| 5 | Demanda Q&A (Quora, PAA) | 5% | [X] | [X × 0,05] |
| 6 | Nível de concorrência | 10% | [X] | [X × 0,10] |
| 7 | Lacunas exploráveis | 10% | [X] | [X × 0,10] |
| 8 | Potencial de pricing | 10% | [X] | [X × 0,10] |
| 9 | Sua expertise | 10% | [X] | [X × 0,10] |
| 10 | Sua capacidade de distribuição | 10% | [X] | [X × 0,10] |
| 11 | Força de diferenciação | 10% | [X] | [X × 0,10] |
| 12 | Rentabilidade estimada | 5% | [X] | [X × 0,05] |
| | **TOTAL** | **100%** | | **[XX.X] /10** |

**Score final = Total × 10 = [XX]/100**

### Interpretação dos scores por dimensão

| Score | Significado |
|-------|------------|
| 9-10 | Excelente — sinal muito forte, vantagem clara |
| 7-8 | Bom — sinal positivo, base sólida |
| 5-6 | Médio — potencial mas exige trabalho |
| 3-4 | Fraco — sinal preocupante, risco elevado |
| 1-2 | Muito fraco — red flag, problema grave |

### Scoring do nível de concorrência (dimensão 6)

**Atenção**: Concorrência NÃO é sempre negativa. Muita concorrência = demanda comprovada.

| Situação | Score | Explicação |
|----------|-------|------------|
| 0 concorrentes | 4 | Risco: demanda não comprovada. Mas se demanda forte (D1-D5), então 7. |
| 1-3 concorrentes, qualidade fraca | 9-10 | Demanda comprovada + fácil de superar |
| 1-3 concorrentes, qualidade forte | 6-7 | Demanda comprovada mas diferenciação necessária |
| 4-10 concorrentes, qualidade mista | 7-8 | Mercado maduro, espaço para um bom produto |
| 10+ concorrentes, mercado saturado | 3-5 | Possível se ângulo único forte. Senão, arriscado. |

---

## Etapa 7 — Veredicto

### Lógica do veredicto

\`\`\`
SE score >= 75 E nenhuma dimensão crítica < 4:
  → VEREDICTO = "🟢 GO — Lance a criação"

SE score >= 55 E score < 75, OU 1 dimensão crítica < 4:
  → VEREDICTO = "🟡 TEST — Valide primeiro com 3 testes rápidos"

SE score < 55 OU 3+ dimensões < 4:
  → VEREDICTO = "🔴 STOP — Essa ideia tem riscos demais. Pivote."
\`\`\`

**Dimensões críticas** (se uma delas estiver < 4, afeta o veredicto):
- Demanda (média das D1-D5)
- Força de diferenciação (D11)
- Sua expertise (D9)

### Formato do veredicto

\`\`\`
╔══════════════════════════════════════════════════╗
║            VEREDICTO DE VALIDAÇÃO                ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  Score: [XX] / 100                               ║
║                                                  ║
║  [🟢 GO / 🟡 TEST / 🔴 STOP]                    ║
║                                                  ║
║  "[Justificativa em 2 frases]"                   ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║ FORÇAS (o que joga a seu favor)                  ║
║  + [Força 1]                                     ║
║  + [Força 2]                                     ║
║  + [Força 3]                                     ║
╠══════════════════════════════════════════════════╣
║ RISCOS (o que pode ser problema)                 ║
║  - [Risco 1] → Mitigação: [ação]                 ║
║  - [Risco 2] → Mitigação: [ação]                 ║
╠══════════════════════════════════════════════════╣
║ RECOMENDAÇÃO                                     ║
║  [Ação concreta a fazer agora]                   ║
╚══════════════════════════════════════════════════╝
\`\`\`

---

## Etapa 8 — Plano de Ação por Veredicto

### Se 🟢 GO

\`\`\`
PRÓXIMAS ETAPAS — LANÇAMENTO
══════════════════════════════

1. /dp-business-profile       → Configurar seu perfil (se ainda não fez)
2. /dp-playbook-create [assunto] → Criar seu ebook (60+ páginas)
   Ângulo recomendado : [ângulo identificado na análise]
   Preço recomendado  : [preço identificado na análise]
   Público-alvo       : [público refinado pela análise]
3. /dp-export-pdf              → Converter em PDF
4. /dp-landing-page            → Criar sua página de vendas
5. /dp-email-sequence          → Preparar a sequência de lançamento
6. /dp-ad-angles-meta          → Criar seus primeiros anúncios

TIMELINE RECOMENDADA:
  Semana 1-2: Redação do ebook
  Semana 3  : Landing page + sequência de email
  Semana 4  : Lançamento + anúncios
\`\`\`

### Se 🟡 TEST — 5 Testes Rápidos a Lançar

\`\`\`
TESTES DE VALIDAÇÃO (antes de criar o produto)
════════════════════════════════════════════════

TESTE 1 — Enquete com o público (2h)
  Ação   : Poste uma enquete nas suas redes ou em grupos segmentados
  Pergunta: "Se eu criasse um [formato] sobre [assunto] por R$ [preço], você teria interesse?"
  Sinal GO  : 30%+ de "sim" com pelo menos 20 respostas
  Sinal STOP: < 15% de "sim" ou < 10 respostas

TESTE 2 — Lead magnet teste (4h)
  Ação   : Crie um mini lead magnet gratuito sobre o assunto (3-5 páginas)
  Distribua: Posts nas redes + 1 email se tiver lista
  Sinal GO  : 50+ downloads em 7 dias
  Sinal STOP: < 10 downloads

TESTE 3 — Pré-venda (2h)
  Ação   : Crie uma landing page simples (com /dp-landing-page)
  Oferta : "Pré-compra por R$ [preço reduzido] — entrega em 4 semanas"
  Sinal GO  : 5+ pré-vendas
  Sinal STOP: 0 pré-venda em 7 dias

TESTE 4 — Entrevista com clientes (3h)
  Ação   : Contate 5-10 pessoas do seu público por DM
  Pergunta: "Tenho uma dúvida: [problema do cliente]. Isso é um assunto real para você?"
  Sinal GO  : 7+ respondem e descrevem o problema espontaneamente
  Sinal STOP: < 3 respostas ou "não muito"

TESTE 5 — Conteúdo piloto (4h)
  Ação   : Publique 1 artigo ou 1 vídeo sobre O assunto central do playbook
  Meça   : Engajamento (comentários, compartilhamentos, saves, perguntas)
  Sinal GO  : 2× seu engajamento médio
  Sinal STOP: Engajamento igual ou abaixo da média
\`\`\`

### Se 🔴 STOP — Alternativas

\`\`\`
ALTERNATIVAS RECOMENDADAS
═══════════════════════════

A ideia "[assunto]" não está forte o suficiente. Aqui estão 3 pivots possíveis:

PIVOT 1 — Mudar o ângulo
  Em vez de  : "[ideia original]"
  Tente      : "[ângulo derivado mirando um subsegmento]"
  Por quê    : [razão baseada na análise]

PIVOT 2 — Mudar o público
  Em vez de  : "[público original]"
  Tente      : "[público adjacente com mais demanda]"
  Por quê    : [razão baseada na análise]

PIVOT 3 — Mudar o formato
  Em vez de  : "[formato original]"
  Tente      : "[formato alternativo — ex: pack de templates em vez de ebook]"
  Por quê    : [razão baseada na análise]

→ Relance /dp-market-research com o pivot escolhido para revalidar.
\`\`\`

---

## Etapa 9 — Entrega

Salvar em \`market-research/validacao-[slug].md\`.

\`\`\`
✅ VALIDAÇÃO CONCLUÍDA

📄 Relatório  : market-research/validacao-[slug].md
📊 Score      : [XX]/100
🎯 Veredicto  : [GO / TEST / STOP]
🔎 Concorrentes: [N] analisados
💰 Preço rec. : faixa R$ [min] — R$ [max]
📈 Demanda    : [Forte / Moderada / Fraca]

SE GO:
  → /dp-playbook-create [assunto]   — Começar a criação
  → Ângulo recomendado: [ângulo]
  → Preço recomendado: R$ [preço]

SE TEST:
  → Lance os 5 testes acima
  → Volte com os resultados: /dp-market-research pivot [ideia]

SE STOP:
  → /dp-market-research [ideia pivot]   — Testar um pivot
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|-----------|
| QG-01 | Pelo menos 3 fontes de demanda consultadas (não se basear em apenas uma) | Crítico |
| QG-02 | Pelo menos 3 concorrentes analisados (exceto se o mercado tiver menos) | Crítico |
| QG-03 | Cada score (0-10) justificado por dados observáveis, não por "feeling" | Crítico |
| QG-04 | O veredicto é coerente com o score (não GO em 45/100 nem STOP em 80/100) | Crítico |
| QG-05 | Os preços são baseados em preços REAIS de concorrentes, não inventados | Crítico |
| QG-06 | Os riscos têm cada um uma mitigação concreta | Alto |
| QG-07 | O relatório diferencia claramente DADOS VERIFICADOS de ESTIMATIVAS | Alto |
| QG-08 | Sem viés de confirmação — se a ideia é fraca, dizer honestamente | Crítico |
| QG-09 | Os testes rápidos (se TEST) têm sinais GO/STOP mensuráveis | Alto |
| QG-10 | O plano de ação pós-veredicto referencia os skills DP Criador relevantes | Médio |
| QG-11 | Se STOP, pelo menos 2 pivots alternativos propostos | Alto |
| QG-12 | Nenhuma promessa de resultados garantidos ("esse mercado VAI funcionar") — honestidade | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| O usuário não tem nenhuma ideia | Perguntar: "Que problema você sabe resolver?", "Que pergunta as pessoas mais te fazem?", "Que assunto te apaixona?" → Gerar 3-5 ideias para validar |
| A ideia é muito vaga ("marketing") | Propor 3-5 sub-nichos específicos. "Marketing para dentistas" vs "Marketing para freelancers" |
| A ideia é muito nichada | Verificar mesmo assim — às vezes nichos são muito rentáveis. Se demanda = 0, sugerir ampliar |
| Nenhum concorrente encontrado | NÃO é necessariamente bom sinal. Buscar mais amplamente (cursos, livros, vídeos, não só ebooks). Se realmente nada: ou oportunidade rara, ou sem demanda. |
| Muitos concorrentes (20+) | Mercado saturado mas demanda comprovada. Buscar lacunas e ângulos não cobertos. |
| O usuário contesta o veredicto | Apresentar os dados. "Entendo, mas aqui estão os números: [dados]. Se quiser mesmo seguir, lance os 5 testes primeiro." |
| business-profile.md ausente | Fazer as perguntas diretamente. Recomendar criá-lo depois se GO. |
| WebSearch/WebFetch não retorna resultados | Usar formulações alternativas. Tentar em português E inglês. Se realmente nada: anotar "dados insuficientes" e pontuar com cautela (5/10). |
| O usuário já tem um produto e quer validar uma V2 | Adaptar: analisar as vendas atuais, o feedback de clientes, as solicitações recebidas. É uma validação diferente (melhoria vs criação). |

---

## Vieses a Evitar

| Viés | Descrição | Como evitar |
|------|-----------|-------------|
| **Confirmação** | Buscar apenas os dados que validam a ideia | Buscar ativamente os CONTRA-ARGUMENTOS |
| **Sobrevivente** | Olhar apenas para os sucessos dos concorrentes | Buscar também os fracassos (produtos retirados, poucas reviews) |
| **Ancoragem** | Fixar no primeiro preço visto | Analisar TODOS os preços antes de recomendar |
| **Otimismo** | Superestimar a demanda | Usar os cenários PESSIMISTAS como base |
| **Custo afundado** | O usuário já investiu tempo e não quer ouvir STOP | Ser honesto. 5h perdidas < 30h perdidas. |

---

## Integração entre Skills

| Antes do market-research | Skill | Quando |
|--------------------------|-------|--------|
| Perfil business | \`/dp-business-profile\` | Se ainda não criou (para contexto de nicho + público) |

| Após o market-research | Skill | Quando |
|------------------------|-------|--------|
| Se GO: Criar o ebook | \`/dp-playbook-create\` | Veredicto = GO |
| Se GO: Página de vendas | \`/dp-landing-page\` | Após criação do ebook |
| Se GO: Estratégia blog | \`/dp-blog-strategy\` | Para SEO em torno do produto |
| Se TEST: Lead magnet | \`/dp-lead-magnet-create\` | Para o teste #2 (lead magnet test) |
| Se TEST: Landing page | \`/dp-landing-page\` | Para o teste #3 (pré-venda) |
| Se STOP: Re-validar | \`/dp-market-research pivot\` | Com uma nova ideia |
| Concorrência aprofundada | \`/dp-competitor-analysis\` | Se precisar ir mais a fundo |
| Pricing aprofundado | \`/dp-pricing-strategy\` | Se o pricing for fator-chave |

---

# Exemplo de Validação — Academia FitPro

> **Ideia testada**: "Playbook do Coach Fitness" — Ebook 60+ páginas a R$ 197
> **Nicho**: Coaching fitness online
> **Público**: Coaches fitness iniciantes (0-2 anos)

---

## Ficha Ideia

| Elemento | Detalhe |
|----------|---------|
| Produto | Ebook / Playbook — "Playbook do Coach Fitness" |
| Formato | PDF, 60+ páginas, acionável |
| Promessa | Conquistar 10 clientes pagantes em 30 dias sem tráfego pago |
| Preço estimado | R$ 197 |
| Público | Coaches fitness certificados ou em processo, 25-40 anos, 0-10 clientes |
| Expertise do autor | 8 anos de coaching, +200 coaches acompanhados |
| Público existente | 2400 seguidores no Instagram, 850 emails |

---

## Análise da Demanda

### Google Trends — Score: 8/10

**Consulta**: "como se tornar coach fitness"
- Tendência: estável com leve alta nos últimos 24 meses (+15%)
- Picos sazonais: janeiro (resoluções) e setembro (volta às aulas)
- Termos associados em alta: "coach fitness online" (+40%), "encontrar clientes coaching" (+25%)
- **Veredicto**: Demanda sólida e em crescimento. O timing janeiro/setembro é explorável.

### Reddit / Fóruns — Score: 7/10

**Consulta**: "coach fitness clientes" site:reddit.com
- 38 posts relevantes em 12 meses em r/personaltraining, r/fitness, r/empreendedorismo
- Engajamento médio: 12 comentários/post
- **Frustrações extraídas**:
  1. "Tenho minha certificação mas zero clientes, não sei por onde começar" (aparece 14 vezes)
  2. "Posto no Instagram todo dia e ninguém me contacta" (9 vezes)
  3. "Como definir meus preços? Tenho medo de cobrar muito" (7 vezes)
  4. "As pessoas querem coaching gratuito, como converter em pagantes?" (6 vezes)
  5. "Tem muita concorrência na minha cidade, devo migrar para o online?" (5 vezes)
- **Veredicto**: Frustrações reais e recorrentes. As pessoas buscam ativamente soluções.

### YouTube — Score: 9/10

**Consulta**: "como se tornar coach fitness" / "encontrar clientes coaching esportivo"
- 15+ vídeos com 50K-500K visualizações sobre o assunto
- Canais ativos: Nassim Sahili, Bodytime, vários coaches independentes
- Vídeos "como encontrar clientes em coaching": 3 vídeos > 100K visualizações
- **Veredicto**: Demanda massiva comprovada. O conteúdo gratuito existe mas as pessoas ainda buscam respostas → o valor percebido de um sistema estruturado é forte.

### Amazon / Ebooks — Score: 6/10

**Consulta**: "coach fitness ebook" / "personal trainer business book"
- 8 ebooks PT encontrados sobre o assunto, 3 com reviews (12-45 reviews)
- 25+ ebooks EN (mercado anglófono mais maduro)
- Preços PT: R$ 19,90 - R$ 79,90 (nenhum acima de R$ 80 na Amazon)
- Preços EN: US$ 14,99 - US$ 47 (alguns programas a US$ 97+)
- **Veredicto**: Mercado PT subexplorado. Os ebooks existentes são livros Amazon (baixo preço, pouca acionabilidade). Um playbook premium a R$ 197 em venda direta se posiciona acima.

### Quora / Q&A — Score: 7/10

**Consulta**: "como encontrar clientes coaching" site:quora.com
- 23 perguntas com respostas detalhadas
- People Also Ask do Google: 8 perguntas relevantes
  - "Como se fazer conhecido como coach esportivo?"
  - "Quanto ganha um coach fitness independente?"
  - "Como definir suas tarifas de coaching?"
  - "Como encontrar clientes sem anúncios?"
- **Veredicto**: Perguntas abundantes = dor não resolvida. Cada pergunta = um capítulo potencial.

### Síntese da Demanda

\`\`\`
SCORE MÉDIO DEMANDA: 7,4 / 10 — DEMANDA FORTE

Google Trends   : 8/10  ██████████████████░░ Alta, picos sazonais
Reddit/Fóruns   : 7/10  ████████████████░░░░ 38 posts, frustrações claras
YouTube         : 9/10  ██████████████████████ Vídeos >100K visualizações
Amazon/Ebooks   : 6/10  ██████████████░░░░░░ Subexplorado no mercado PT
Quora/Q&A       : 7/10  ████████████████░░░░ 23 perguntas ativas
\`\`\`

---

## Mapeamento da Concorrência

### Concorrente 1: CoachFit Academy

| Elemento | Detalhe |
|----------|---------|
| URL | coachfitacademy.com.br |
| Produto | "O Guia do Coach Fitness Lucrativo" |
| Formato | Ebook PDF, 45 páginas |
| Preço | R$ 97 |
| Público | Coaches iniciantes |
| Promessa | "Lance seu negócio de coaching em 21 dias" |
| Prova social | 3 depoimentos na página, "150+ coaches" |
| Pontos fortes | Preço acessível, bom SEO (blog ativo), marca estabelecida |
| Pontos fracos | Conteúdo genérico (sem scripts/templates), design datado, sem comunidade |

### Concorrente 2: FitBusiness Pro

| Elemento | Detalhe |
|----------|---------|
| URL | fitbusinesspro.hotmart.com |
| Produto | "Coaching Business Masterclass" |
| Formato | Curso em vídeo, 12 módulos, 8h |
| Preço | R$ 797 |
| Público | Coaches intermediários |
| Promessa | "Passe de 0 a R$ 100K/ano com seu negócio fitness" |
| Prova social | 45 avaliações (4,6/5), "500+ alunos" |
| Pontos fortes | Conteúdo muito profundo, comunidade no Discord, vídeo (mais engajante), forte prova social |
| Pontos fracos | Preço alto para iniciantes, formato vídeo = longo para consumir, não acionável imediatamente, promessa de renda duvidosa |

### Concorrente 3: BodyCoach Blueprint

| Elemento | Detalhe |
|----------|---------|
| URL | hotmart.com/bodycoachblueprint |
| Produto | "The Fitness Coaching Blueprint" |
| Formato | Ebook PDF EN, 72 páginas |
| Preço | R$ 197 |
| Público | Personal trainers iniciantes (mercado EN) |
| Promessa | "Get your first 20 clients in 60 days" |
| Prova social | 89 avaliações (4,7/5) |
| Pontos fortes | Muito acionável (templates de DM, scripts), bem estruturado, forte prova social |
| Pontos fracos | Em inglês apenas, sem versão PT, sem blog/SEO, sem comunidade |

### Matriz Comparativa

| Dimensão | CoachFit (R$ 97) | FitBusiness (R$ 797) | BodyCoach (R$ 197) | Academia FitPro (R$ 197) |
|----------|-----------------|---------------------|-------------------|--------------------------|
| Preço | 8/10 | 4/10 | 7/10 | 7/10 |
| Profundidade | 5/10 | 9/10 | 7/10 | **8/10** |
| Acionabilidade | 4/10 | 6/10 | 9/10 | **9/10** |
| Prova social | 5/10 | 8/10 | 8/10 | 3/10 |
| Design | 4/10 | 7/10 | 6/10 | **8/10** |
| SEO | 7/10 | 5/10 | 2/10 | **7/10** |
| Unicidade ângulo | 4/10 | 6/10 | 7/10 | **8/10** |
| **Média** | **5,3** | **6,4** | **6,6** | **7,1** |

### Lacunas Identificadas

\`\`\`
LACUNA 1: NENHUM playbook PT acionável com scripts e templates
  → Impacto: ALTO
  → O único concorrente PT (CoachFit) é um guia genérico sem templates
  → O BodyCoach tem os templates mas apenas em inglês
  → AÇÃO: Incluir 10+ templates prontos para copiar em PORTUGUÊS

LACUNA 2: NENHUM concorrente mira "0 a 10 clientes" (todos dizem "R$ 100K/ano")
  → Impacto: ALTO
  → Os iniciantes querem os PRIMEIROS clientes, não um império
  → AÇÃO: Posicionar em "10 primeiros clientes" — realista e não intimidador

LACUNA 3: Nenhum plano de ação dia a dia nos concorrentes PT
  → Impacto: MÉDIO
  → O BodyCoach tem ("60 days") mas não em PT
  → AÇÃO: Incluir um plano de 30 dias com ações diárias
\`\`\`

---

## Análise de Pricing

\`\`\`
PREÇOS DO MERCADO
══════════════════

CoachFit Academy   : R$ 97   — PDF 45p, genérico
FitBusiness Pro    : R$ 797  — Vídeo 8h, profundo
BodyCoach Blueprint: R$ 197  — PDF 72p, acionável
Ebook Amazon médio : R$ 49   — Livro, pouco acionável
Pack de templates  : R$ 37   — Sem conteúdo educativo

Preço médio (excl. vídeo) : R$ 95
Preço mediano             : R$ 97
Faixa realista            : R$ 67 — R$ 197

RECOMENDAÇÃO: R$ 197
  → Acima do mercado de ebooks PT (R$ 97 máx. nos concorrentes)
  → Justificado por: 60+ páginas (vs 45), templates PT exclusivos, plano 30 dias
  → Posicionamento: "Mais que um ebook, é um sistema"
  → Alternativa: R$ 147 para ser mais acessível (mas R$ 197 ainda é defensável)
\`\`\`

### Simulação de Rentabilidade

\`\`\`
CENÁRIO PESSIMISTA (10 vendas/mês):
  Receita   : R$ 1.970/mês
  Break-even: Mês 1 (se R$ 0 em ads)
  Anual     : R$ 23.640

CENÁRIO REALISTA (30 vendas/mês, após mês 3):
  Receita   : R$ 5.910/mês
  Anual     : R$ 70.920
  + Upsell coaching (10% × R$ 997): +R$ 2.990/mês

CENÁRIO OTIMISTA (100 vendas/mês, com ads):
  Receita   : R$ 19.700/mês
  Ads (30%) : -R$ 5.910
  Líquido   : R$ 13.790/mês
  Anual     : R$ 165.480

VEREDICTO: Rentável a partir do mês 1 em orgânico. Escalável com ads a partir do mês 3.
\`\`\`

---

## Score de Validação

| # | Dimensão | Score | Justificativa |
|---|----------|-------|---------------|
| 1 | Demanda Google Trends | 8/10 | Alta +15%, termos associados em crescimento |
| 2 | Demanda Reddit/Fóruns | 7/10 | 38 posts, frustrações claras e recorrentes |
| 3 | Demanda YouTube | 9/10 | Vídeos > 100K visualizações, assunto popular |
| 4 | Demanda Amazon | 6/10 | 8 ebooks PT, subexplorado vs EN |
| 5 | Demanda Q&A | 7/10 | 23 perguntas Quora, PAA abundantes |
| 6 | Concorrência | 8/10 | 3 concorrentes, qualidade mista, lacunas exploráveis |
| 7 | Lacunas exploráveis | 9/10 | Nenhum playbook PT acionável com templates |
| 8 | Potencial de pricing | 7/10 | R$ 197 defensável, acima do mercado |
| 9 | Expertise do autor | 9/10 | 8 anos, 200+ coaches, resultados comprovados |
| 10 | Distribuição | 6/10 | 2400 IG + 850 emails = base razoável, não massiva |
| 11 | Diferenciação | 8/10 | Único playbook PT acionável com scripts + plano 30 dias |
| 12 | Rentabilidade | 8/10 | Rentável a partir do mês 1, escalável |

**SCORE TOTAL: 77 / 100**

---

## Veredicto

\`\`\`
╔══════════════════════════════════════════════════╗
║            VEREDICTO DE VALIDAÇÃO                ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  Score: 77 / 100                                 ║
║                                                  ║
║  🟢 GO — Lance a criação                        ║
║                                                  ║
║  "A demanda é forte e comprovada. O mercado PT   ║
║   está subexplorado em produtos acionáveis.      ║
║   Sua expertise (8 anos, 200+ coaches) garante  ║
║   credibilidade sólida. A lacuna principal       ║
║   (nenhum playbook PT com templates) é sua      ║
║   vantagem competitiva."                         ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║ FORÇAS                                           ║
║  + Demanda comprovada (YouTube 100K+ visualiz.)  ║
║  + Lacuna de mercado PT (sem playbook acionável) ║
║  + Expertise forte (8 anos, 200+ coaches)        ║
║  + Rentável a partir do mês 1 em orgânico        ║
╠══════════════════════════════════════════════════╣
║ RISCOS                                           ║
║  - Público limitado (2400 IG) → Mitigação:       ║
║    SEO blog + Meta Ads a partir do mês 2         ║
║  - Prova social = 0 no lançamento → Mitigação:   ║
║    Oferecer a 5 coaches em troca de depoimento   ║
╠══════════════════════════════════════════════════╣
║ RECOMENDAÇÃO                                     ║
║  Lance /dp-playbook-create agora.                ║
║  Ângulo: "10 primeiros clientes em 30 dias"     ║
║  Preço: R$ 197 (oferta de lançamento R$ 147)    ║
║  Formato: Playbook 60+ páginas com templates PT  ║
╚══════════════════════════════════════════════════╝
\`\`\``,
};

export default skill;
