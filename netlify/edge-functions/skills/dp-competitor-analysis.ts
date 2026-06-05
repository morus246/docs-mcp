import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-competitor-analysis",
  categoria: "Análise e Qualidade",
  descricao: "Análise completa de um concorrente: produto, posicionamento, precificação, marketing e funil. Compara com sua própria oferta e gera um relatório acionável com matriz de pontuação, oportunidades de diferenciação e contra-ângulos de marketing. Gatilhos: concorrente, competitor, análise competitiva, competitive analysis, benchmark, comparar.",
  argumentHint: "[URL ou nome do concorrente] [foco: product|pricing|marketing|all]",
  allowedTools: ["Read", "Write", "Bash", "Glob", "WebFetch", "WebSearch"],
  conteudo: `# Análise de Concorrentes — Inteligência Competitiva

<!-- v2.0.0 | 2026-04-13 | Reformulação completa: context intake, quality gates, matriz de pontuação, tratamento de erros, integração entre skills -->

Especialista em inteligência competitiva. Analisa um concorrente ou produto similar e gera um relatório acionável com matriz de comparação pontuada, oportunidades de diferenciação e contra-ângulos de marketing prontos para uso.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-competitor-analysis [URL]\` | Análise completa de um concorrente via URL |
| \`/dp-competitor-analysis [nome]\` | Pesquisa e análise de um concorrente por nome |
| \`/dp-competitor-analysis [URL] pricing\` | Foco apenas em precificação e modelo de negócio |
| \`/dp-competitor-analysis [URL] marketing\` | Foco em marketing, funil e conteúdo |
| \`/dp-competitor-analysis [URL] product\` | Foco no produto, funcionalidades e proposta de valor |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Relatório Markdown estruturado (analysis/competitor-[nome]-[data].md)
├── Perfil detalhado do concorrente
├── Matriz de comparação pontuada (0-10 por dimensão)
├── Oportunidades de diferenciação com ações concretas
├── 3-5 contra-ângulos de marketing prontos para uso
└── Pontuação global: concorrente vs. sua oferta
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto    → Reunir informações sobre o concorrente E seu posicionamento (OBRIGATÓRIO)
2. Coleta de dados       → Obter dados do concorrente (web, pesquisa)
   Ler references/analysis-example.md → para exemplo de análise competitiva completa
3. Analisar e pontuar    → Matriz de comparação pontuada por dimensão
4. Identificar lacunas   → Oportunidades de diferenciação acionáveis
5. Contra-ângulos        → Ângulos de marketing que exploram fraquezas do concorrente
6. Verificação de qualidade → Checagem de objetividade e completude
7. Entrega               → Relatório salvo + resumo + próximos passos
\`\`\`

---

## Etapa 1 — Coleta de Contexto (Obrigatória: Sempre Fazer Primeiro)

Antes de qualquer análise, coletar o contexto. Sem ele, a comparação será genérica e as recomendações inúteis.

### 1a. Carregar o perfil do negócio (silenciosamente)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), público, posicionamento, preços
  → NÃO repetir perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas da coleta de contexto cobrirão o mínimo.
\`\`\`

### 1b. Fazer perguntas em blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar em 2-3, aguardar as respostas, reformular para validar, depois continuar.

#### Bloco 1 — O concorrente a analisar (perguntar primeiro)

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual concorrente você quer analisar? Me dê uma URL, nome de produto ou descrição. | Alvo da análise |
| Q2 | Em que você quer se concentrar? \`product\` / \`pricing\` / \`marketing\` / \`all\` (padrão: all) | Foco da análise |

**Após as respostas**: Confirmar o alvo. "OK, vou analisar [X] com foco em [Y]. Antes disso, preciso entender seu posicionamento para que a comparação seja relevante."

#### Bloco 2 — Seu posicionamento (para tornar a comparação pertinente)

| # | Pergunta | Por quê |
|---|----------|---------|
| Q3 | Descreva seu produto/oferta em 2-3 frases. O que você vende, a que preço e para quem? | Base de comparação |
| Q4 | Qual é o seu diferencial único? O que já te diferencia (ou o que você quer que diferencie). | Eixo de diferenciação |
| Q5 | O que te preocupa especificamente nesse concorrente? (ex: preço, audiência, conteúdo...) | Foca as recomendações |

**Após as respostas**: Síntese em 2-3 linhas. "Entendido. Você é [X], vende [Y] para [Z], e quer entender como [concorrente] se posiciona em relação a você, especialmente em [ponto de preocupação]. Iniciando a análise."

**Hard gate**: NÃO iniciar a análise sem conhecer o produto do usuário. Sem essa informação, a comparação não tem referência.

---

## Etapa 2 — Coleta de Dados

### 2a. Se URL fornecida

Usar WebFetch para ler a página do concorrente. Extrair:

| Dimensão | Dados a coletar |
|----------|-----------------|
| Produto | Nome, descrição, formato, conteúdo, funcionalidades |
| Precificação | Preço, modelo (pagamento único, assinatura, planos), upsells |
| Público | Quem eles segmentam (perfil, nível, situação) |
| Promessa | Proposta de valor principal, resultados prometidos |
| Prova social | Depoimentos, números, logos, estudos de caso |
| Conteúdo | Blog, redes sociais, email, podcast, frequência |
| Funil | CTA, páginas de venda, sequência, lead magnets |
| Design | Qualidade visual, posicionamento de marca (premium/acessível/autoridade) |

### 2b. Se nome/descrição fornecido

Usar WebSearch para encontrar o concorrente online, depois WebFetch nas páginas principais.

### 2c. Se acesso limitado

Se a página estiver atrás de paywall ou inacessível:
- Registrar o que não pôde ser verificado
- Usar os dados públicos disponíveis (redes sociais, avaliações, conteúdo gratuito)
- Indicar claramente no relatório: "Não verificado — baseado em dados públicos"

---

## Etapa 3 — Analisar e Pontuar (Matriz de Comparação)

Construir a matriz de comparação pontuada. Cada dimensão recebe uma nota de 0 a 10.

### 3a. Perfil do concorrente

\`\`\`
╔══════════════════════════════════════════════════╗
║           PERFIL DO CONCORRENTE                  ║
╠══════════════════════════════════════════════════╣
║ Nome           : [nome]                          ║
║ URL            : [url]                           ║
║ Produto        : [descrição curta]               ║
║ Preço          : [preço + modelo]                ║
║ Público        : [quem eles segmentam]           ║
║ Posicionamento : [premium/acessível/autoridade/  ║
║                   comunidade]                    ║
╠══════════════════════════════════════════════════╣
║ PONTOS FORTES                                    ║
║ • [ponto forte 1]                                ║
║ • [ponto forte 2]                                ║
║ • [ponto forte 3]                                ║
╠══════════════════════════════════════════════════╣
║ PONTOS FRACOS                                    ║
║ • [ponto fraco 1]                                ║
║ • [ponto fraco 2]                                ║
║ • [ponto fraco 3]                                ║
╚══════════════════════════════════════════════════╝
\`\`\`

### 3b. Matriz de comparação pontuada

\`\`\`
MATRIZ DE COMPARAÇÃO (0-10 por dimensão)
═══════════════════════════════════════════════════
| Dimensão          | Concorrente | Você   | Diferença | Vantagem    |
|-------------------|------------|--------|-----------|-------------|
| Preço             | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Valor percebido   | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Profundidade      | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Aplicabilidade    | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Suporte ao cliente| [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Identidade de marca| [X]/10    | [X]/10 | [+/-]     | [quem]      |
| Prova social      | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Conteúdo/SEO      | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Funil/Conversão   | [X]/10     | [X]/10 | [+/-]     | [quem]      |
| Inovação          | [X]/10     | [X]/10 | [+/-]     | [quem]      |
|-------------------|------------|--------|-----------|-------------|
| TOTAL             | [XX]/100   | [XX]/100| [+/-]    |             |
═══════════════════════════════════════════════════

VEREDICTO: [Resumo em 1-2 frases — quem está à frente e em quê]
\`\`\`

### 3c. Regras de pontuação

| Nota | Significado |
|------|-------------|
| 0-2 | Ausente ou muito fraco |
| 3-4 | Básico, abaixo da média do mercado |
| 5-6 | Aceitável, na média |
| 7-8 | Bom, acima da média |
| 9-10 | Excelente, melhor da categoria |

**Regra de objetividade**: Se o concorrente for melhor em uma dimensão, a nota deve refletir isso. Sem viés favorável ao usuário.

---

## Etapa 4 — Identificar Oportunidades de Diferenciação

\`\`\`
OPORTUNIDADES DE DIFERENCIAÇÃO
═══════════════════════════════════

PRIORIDADE ALTA (diferença > 3 pontos desfavorável a você):
1. [Dimensão] — Diferença: [X] pontos
   Por quê: [explicação]
   Ação: [o que fazer esta semana]
   Impacto estimado: [o que muda]

2. [Dimensão] — Diferença: [X] pontos
   ...

OPORTUNIDADES (dimensões onde o concorrente é fraco):
1. [Lacuna identificada]
   Ação: [como explorar]

2. [Lacuna identificada]
   ...
\`\`\`

Categorias a explorar sistematicamente:

| Categoria | Pergunta-chave |
|-----------|----------------|
| Posicionamento | Como se destacar na mente do cliente? |
| Precificação | Seu preço é um diferencial ou um obstáculo frente a esse concorrente? |
| Conteúdo | Quais temas o concorrente NÃO cobre que você poderia dominar? |
| Público | Há segmentos mal atendidos que o concorrente ignora? |
| Produto | O que o concorrente oferece que você deveria adicionar? |
| Marketing | Quais mensagens contrariam diretamente o posicionamento do concorrente? |

---

## Etapa 5 — Contra-Ângulos de Marketing

Sugerir 3-5 ângulos de marketing que exploram as fraquezas do concorrente sem jamais nomeá-lo.

\`\`\`
CONTRA-ÂNGULOS DE MARKETING
═══════════════════════════════

1. [Nome do ângulo]
   Hook: "[Título / primeira frase chamativa]"
   Por que funciona: [explicação — qual fraqueza explora]
   Onde usar: [post social, anúncio, página de venda, email]

2. [Nome do ângulo]
   Hook: "[Título]"
   Por que funciona: [explicação]
   Onde usar: [canal]

3. ...
\`\`\`

---

## Etapa 6 — Síntese SWOT

Após as análises detalhadas, sintetizar em formato SWOT:

\`\`\`
SÍNTESE SWOT — SEU POSICIONAMENTO VS. [CONCORRENTE]
═══════════════════════════════════════════════════

INTERNO (Você):
  Pontos fortes  : [3 pontos fortes principais]
  Pontos fracos  : [3 pontos a melhorar]

EXTERNO (Concorrente / Mercado):
  Oportunidades  : [3 lacunas exploráveis]
  Ameaças        : [3 riscos se o concorrente evoluir]

FORÇAS COMPETITIVAS:
  Substitutos diretos   : [mesmo tipo de produto]
  Substitutos indiretos : [mesmo problema, formato diferente]
  Custo de mudança      : [facilidade do cliente deles migrar para você]
\`\`\`

---

## Etapa 7 — Verificação de Qualidade e Entrega

### 7a. Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder no relatório | Crítico |
| QG-02 | Cada recomendação tem uma ação concreta | Crítico |
| QG-03 | Notas justificadas por dados observáveis | Crítico |
| QG-04 | Objetividade respeitada — sem viés favorável | Alto |
| QG-05 | Distinção clara entre dados verificados e estimativas | Alto |
| QG-06 | Nenhuma recomendação de copiar o concorrente | Crítico |
| QG-07 | Nenhum ataque direto ou denigração do concorrente | Crítico |
| QG-08 | Contra-ângulos nunca nomeiam o concorrente | Alto |

### 7b. Salvar o relatório

\`\`\`
Caminho de saída: analysis/competitor-[nome]-[YYYY-MM-DD].md
Criar a pasta analysis/ se não existir.
\`\`\`

### 7c. Apresentar o entregável

\`\`\`
ANÁLISE COMPETITIVA CONCLUÍDA
═══════════════════════════════════

Concorrente analisado : [nome]
Foco                  : [product/pricing/marketing/all]
Arquivo               : [caminho completo]

PONTUAÇÃO COMPARATIVA:
  Concorrente : [XX]/100
  Você        : [XX]/100
  Diferença   : [+/- XX] pontos

DIMENSÕES PRINCIPAIS:
  Sua vantagem    : [dimensão 1], [dimensão 2]
  Vantagem deles  : [dimensão 1], [dimensão 2]
  Paridade        : [dimensão 1], [dimensão 2]

TOP 3 AÇÕES PRIORITÁRIAS:
  1. [ação concreta]
  2. [ação concreta]
  3. [ação concreta]

PRÓXIMOS PASSOS:
  → /dp-mediaplan          Criar conteúdo explorando as lacunas identificadas
  → /dp-ad-angles-meta     Transformar os contra-ângulos em anúncios
  → /dp-landing-page       Otimizar sua página de vendas vs. a concorrência
  → /dp-playbook-create    Criar um produto que preencha uma lacuna identificada
\`\`\`

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| URL inacessível (paywall, 404) | Tentar WebSearch, usar dados públicos, registrar as limitações no relatório |
| Concorrente desconhecido / sem dados | Pedir mais contexto ao usuário, buscar alternativas similares |
| O usuário ainda não tem produto | Analisar o concorrente como benchmark, recomendações orientadas a "o que construir" |
| Foco muito amplo (muitos concorrentes) | Limitar a 1 concorrente por análise. Propor relançar para os outros |
| O usuário quer copiar o concorrente | Redirecionar para diferenciação. "Copiar = correr atrás. Diferenciar = criar sua categoria." |
| business-profile.md ausente | Continuar com as respostas da coleta de contexto |
| Dados contraditórios sobre o concorrente | Sinalizar a inconsistência, apresentar as duas versões, recomendar verificação |

---

## Integração Entre Skills

| Antes de competitor-analysis | Skill anterior | Quando |
|------------------------------|----------------|--------|
| Definir seu próprio posicionamento | \`business-profile.md\` | Recomendado para enriquecer a comparação |

| Após competitor-analysis | Próximo skill | Quando |
|--------------------------|---------------|--------|
| Criar conteúdo diferenciado | \`/dp-mediaplan\` | Para explorar lacunas de conteúdo |
| Anúncios segmentados | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para transformar contra-ângulos em anúncios |
| Página de vendas otimizada | \`/dp-landing-page\` | Para se posicionar vs. a concorrência |
| Novo produto | \`/dp-playbook-create\` | Se uma lacuna de produto foi identificada |
| Posts explorando os ângulos | \`/dp-social-caption\` | Para conteúdo de diferenciação |

---

# Referência — Exemplo de Análise Competitiva Completa

## Análise Concorrencial — Academia FitPro
### Concorrente: FitCoach Academy

---

## 1. Perfil do Concorrente

| Elemento | FitCoach Academy |
|----------|-----------------|
| **Produto principal** | "O Kit do Coach Esportivo" — Formação em vídeo online |
| **Preço** | R$ 197 (pagamento único) |
| **Público-alvo** | Coaches esportivos em reconversão profissional |
| **Posicionamento** | "A formação mais completa para lançar seu negócio de coach" |
| **Canais principais** | Instagram (12k seguidores), YouTube (3,2k), Blog (SEO médio) |
| **Antiguidade** | Ativo desde 2023 |
| **Volume estimado** | ~80-120 vendas/mês (baseado em avaliações e atividade social) |
| **Lead magnet** | Webinário gratuito "Os 3 pilares do coach lucrativo" (60 min) |
| **Lista de email estimada** | 5.000-8.000 contatos |
| **Ponto forte percebido** | Conteúdo em vídeo de qualidade, forte presença no YouTube |
| **Ponto fraco percebido** | Preço elevado para o público, sem comunidade, suporte lento |

---

## 2. Matriz de Pontuação — Comparativo

Escala: 0 (inexistente) a 10 (excelente)

| Dimensão | FitCoach Academy | Academia FitPro | Diferença | Vantagem |
|----------|-----------------|-----------------|-----------|----------|
| **Qualidade do conteúdo** | 8 | 7 | -1 | FitCoach |
| **Preço / acessibilidade** | 5 | 9 | +4 | FitPro |
| **Especificidade do nicho** | 6 | 8 | +2 | FitPro |
| **Prova social** | 7 | 5 | -2 | FitCoach |
| **SEO / tráfego orgânico** | 6 | 4 | -2 | FitCoach |
| **Presença em redes sociais** | 8 | 4 | -4 | FitCoach |
| **Jornada do cliente (funil)** | 5 | 7 | +2 | FitPro |
| **Suporte / acompanhamento** | 4 | 7 | +3 | FitPro |

### Pontuações Globais

| | FitCoach Academy | Academia FitPro |
|---|---|---|
| **Pontuação total** | 49/80 | 51/80 |
| **Média** | 6,1/10 | 6,4/10 |

### Interpretação

FitCoach Academy domina em visibilidade (redes sociais, SEO, prova social) graças a 3 anos de experiência. A Academia FitPro tem vantagem estrutural em preço, especificidade de posicionamento e qualidade da jornada do cliente. A diferença global é pequena (+0,3 em favor da FitPro), o que significa que a disputa se dará na execução e velocidade de crescimento.

---

## 3. Análise SWOT — Academia FitPro vs. FitCoach Academy

### Pontos Fortes (internos, positivo)

| # | Força | Impacto |
|---|-------|---------|
| F1 | **Preço 2x menor** (R$ 97 vs R$ 197) — barreira de entrada baixa, ideal para iniciantes que hesitam em investir. Reduz a fricção de compra e permite maior volume. | Alto |
| F2 | **Formato aplicável** (playbook com templates) vs. formato passivo (vídeos). O prospect pode aplicar imediatamente sem assistir horas de conteúdo. Diferenciação clara no formato. | Alto |

### Pontos Fracos (internos, negativo)

| # | Fraqueza | Impacto |
|---|----------|---------|
| W1 | **Zero prova social no lançamento** — sem depoimentos, sem avaliações, sem números de venda. FitCoach tem +200 avaliações públicas. Cria déficit de confiança a ser superado rapidamente. | Alto |
| W2 | **Fraca presença social** — 0 seguidores vs. 12k da FitCoach. O tráfego orgânico social será inexistente nos primeiros meses. Dependência de SEO e anúncios pagos. | Médio |

### Oportunidades (externas, positivo)

| # | Oportunidade | Impacto |
|---|-------------|---------|
| O1 | **FitCoach não tem comunidade** — sem grupo, sem fórum, sem espaço de troca. Criar um espaço comunitário (Skool, Discord) seria um diferencial importante e aumentaria a retenção. | Alto |
| O2 | **O formato de webinário da FitCoach cansa** — 60 min de webinário para um lead magnet é muito. Um PDF rápido e aplicável como lead magnet oferece melhor experiência e maior taxa de opt-in. | Médio |

### Ameaças (externas, negativo)

| # | Ameaça | Impacto |
|---|--------|---------|
| T1 | **FitCoach pode reduzir seus preços** — se detectar a FitPro como concorrente, pode lançar uma versão "light" a preço competitivo. Risco de guerra de preços em um nicho estreito. | Médio |
| T2 | **Autoridade de SEO consolidada** — FitCoach tem 3 anos de conteúdo indexado. Recuperar o posicionamento no Google levará 6-12 meses, mesmo com estratégia agressiva. | Alto |

---

## 4. Contra-Ângulos para Anúncios e Landing Page

### Contra-Ângulo 1 — "O preço da simplicidade"

**Contexto**: FitCoach vende por R$ 197 uma formação em vídeo de +15h. O prospect iniciante fica sobrecarregado.

**Ângulo publicitário**:
> Você não precisa de 15 horas de vídeos para lançar sua atividade de coach. Você precisa de um plano. O Playbook do Coach Fitness: R$ 97, um sistema em 5 etapas, aplicável neste fim de semana. Sem enrolação. Só ações.

**Onde usar**:
- Meta Ads (ângulo de comparação indireta)
- Seção hero da landing page
- Email E4 da sequência de nutrição

**Por que funciona**: Opõe simplicidade vs. complexidade. O iniciante quer um atalho, não um curso. O preço 2x menor reforça a mensagem.

---

### Contra-Ângulo 2 — "Os templates vs. as teorias"

**Contexto**: FitCoach entrega conteúdo educativo (vídeos, explicações). FitPro entrega ferramentas prontas (templates, scripts, checklists).

**Ângulo publicitário**:
> As formações te dizem O QUE fazer. O Playbook te dá as FERRAMENTAS para fazer. 12 templates prontos: mensagens de prospecção, tabela de preços, plano de conteúdo, contrato com o cliente. Você preenche os campos e lança.

**Onde usar**:
- Carrossel no Instagram (antes/depois: teoria vs. template)
- Seção "O que nos diferencia" na landing page
- Meta Ads (ângulo "aplicável")

**Por que funciona**: O prospect não quer aprender, quer fazer. Posicionar a FitPro como ferramenta e não como formação muda a categoria mental.

---

### Contra-Ângulo 3 — "O coach que responde"

**Contexto**: FitCoach tem suporte lento (48-72h) e sem espaço comunitário. Os clientes se sentem sozinhos após a compra.

**Ângulo publicitário**:
> Você compra uma formação e se vê sozinho na frente da tela. Com o Playbook, você entra em um grupo de coaches que se ajudam. Perguntas, feedback, motivação: você nunca está sozinho. E eu respondo pessoalmente a cada mensagem.

**Onde usar**:
- Depoimentos e FAQ na landing page
- Stories no Instagram (mostrar interações do grupo)
- Email E3 (prova social via comunidade)

**Por que funciona**: O isolamento é a dor número 1 do coach iniciante. Prometer acompanhamento humano por R$ 97 (vs. R$ 197 sem suporte) é uma vantagem competitiva enorme.

---

## 5. Análise de Lacunas

### O que FitCoach faz e que a FitPro ainda NÃO faz

| Elemento | Detalhe | Prioridade | Ação recomendada |
|----------|---------|------------|-----------------|
| **Conteúdo no YouTube** | 45 vídeos, tutoriais práticos, boa indexação | Alta | Lançar 1 vídeo/semana a partir do mês 2. Mirar as mesmas palavras-chave com abordagem diferente (mais curto, mais direto). |
| **Depoimentos em vídeo** | 8 depoimentos de clientes em vídeo na página de vendas | Alta | Coletar depoimentos escritos imediatamente (D+30 pós-compra). Vídeos a partir do mês 3 (oferecer uma sessão gratuita em troca). |
| **Webinário automatizado** | Funil de webinário evergreen rodando 24/7 | Média | Não copiar. O formato webinário cansa. Testar um mini-curso por email em 3 dias como alternativa (mais leve, mesmo efeito). |
| **Programa de afiliados** | 20% de comissão para afiliados | Baixa | Considerar no mês 6 quando o produto tiver prova social suficiente para atrair afiliados credíveis. |

### O que a FitPro faz e que a FitCoach NÃO faz

| Elemento | Detalhe | Vantagem competitiva | Como explorar |
|----------|---------|----------------------|---------------|
| **Templates prontos** | 12 templates editáveis (Canva, Notion, Sheets) | Forte — FitCoach tem apenas conteúdo passivo | Destacar em cada anúncio e na landing page. Criar carrossel no Instagram mostrando os templates em ação. |
| **Comunidade de apoio** | Grupo privado para compradores | Forte — FitCoach não tem espaço comunitário | Usar como argumento de venda principal. Mostrar a atividade do grupo em stories. Publicar conquistas de membros. |
| **Preço acessível** | R$ 97 vs. R$ 197 | Forte — 2x mais barato para um público com orçamento limitado | Nunca se desculpar pelo preço baixo. Posicioná-lo como escolha estratégica: "Acessível porque todo coach merece um plano." |
| **Formato rápido** | Playbook legível em 2h vs. 15h de vídeo | Médio — alguns preferem vídeo | Insistir no "aplique neste fim de semana". Criar um comparativo tempo investido vs. resultados. |

---

## 6. Recomendações Estratégicas

### Curto prazo (Meses 1-2)

1. **Lançar com o ângulo preço + templates** — É o diferencial mais imediato e fácil de comunicar. Não é necessária prova social para vender uma ferramenta por R$ 97.
2. **Coletar prova social agressivamente** — Oferecer o Playbook a 10 coaches em troca de um depoimento detalhado. Usar esses depoimentos nos anúncios e na landing page a partir da semana 3.

### Médio prazo (Meses 3-6)

3. **Investir em SEO** — Publicar os 3 artigos pilares (clusters de blog) para começar a competir com a FitCoach nas palavras-chave principais. Mirar as long-tails que FitCoach não cobriu.
4. **Lançar conteúdo no YouTube** — Formato curto (5-8 min), estilo direto e sem enrolação. Diferenciar da FitCoach pelo formato, não pelos temas.

### Longo prazo (Mês 6+)

5. **Construir o ecossistema** — O Playbook por R$ 97 é a porta de entrada. O upsell de templates por R$ 47 aumenta o ticket. O coaching por R$ 997 monetiza os melhores clientes. FitCoach tem apenas um produto — essa é sua fraqueza estrutural.
6. **Considerar o programa de afiliados** — Quando a FitPro tiver 200+ clientes satisfeitos, lançar um programa de afiliados com 30% de comissão para acelerar o crescimento sem depender de anúncios.

---

## Resumo Executivo

| Critério | FitCoach Academy | Academia FitPro |
|----------|-----------------|-----------------|
| Preço | R$ 197 | R$ 97 |
| Formato | Vídeo (15h) | Playbook + templates |
| Comunidade | Não | Sim |
| Suporte | Lento (48-72h) | Rápido + pessoal |
| SEO | Consolidado (3 anos) | A construir |
| Social | 12k Instagram | A construir |
| Funil | Webinário → venda | Lead magnet → sequência → venda |
| Pontuação global | 6,1/10 | 6,4/10 |

**Veredicto**: A Academia FitPro tem um produto melhor e um funil melhor, mas déficit de visibilidade. A estratégia vencedora é capitalizar sobre as fraquezas estruturais da FitCoach (preço alto, sem comunidade, formato pesado) enquanto constrói a visibilidade orgânica rapidamente via SEO e conteúdo social.

---

## 7. Análise do Posicionamento de Marketing

### Mensagens Comparadas

| Elemento | FitCoach Academy | Academia FitPro |
|----------|-----------------|-----------------|
| **Promessa principal** | "A formação mais completa" | "O sistema para lançar seu negócio" |
| **Ângulo emocional** | Ambição ("torne-se o melhor coach") | Pragmatismo ("encontre seus 10 primeiros clientes") |
| **Objeção tratada** | "Não sei por onde começar" | "Tenho o diploma mas zero cliente" |
| **Prova usada** | Autoridade do especialista (10 anos) | Resultados dos alunos (números) |
| **Tom de voz** | Profissional, você formal | Direto, você informal, sem enrolação |
| **Urgência** | Nenhuma (evergreen) | Preço de lançamento por tempo limitado |

### Análise do Funil do Concorrente

\`\`\`
FitCoach Academy — Funil atual:

[Meta Ads / YouTube] → [Webinário 60 min] → [Página de vendas] → [Compra R$ 197]

Pontos fortes:
- O webinário gera confiança (60 min de conteúdo gratuito)
- Taxa de conversão webinário → venda estimada: 5-8%
- Replay disponível 48h (leve urgência)

Pontos fracos:
- Alta fricção: 60 min de investimento de tempo antes da compra
- Sem sequência de email pós-webinário (perda de leads)
- Um único produto, sem upsell ou downsell
- Sem segmentação por nível/necessidade
\`\`\`

### Canais de Tráfego Comparados

| Canal | FitCoach Academy | Academia FitPro (previsto) |
|-------|-----------------|---------------------------|
| **Instagram** | 12k seguidores, 3 posts/sem, engajamento 2,1% | 0 seguidores, 5 posts/sem previsto, engajamento alvo 4%+ |
| **YouTube** | 3,2k seguidores, 45 vídeos, 1 vídeo/sem | Não lançado, previsto mês 3, formato curto |
| **Blog SEO** | 15 artigos, DA 18, 2.500 visitas/mês | 0 artigos, 20 previstos em 8 semanas |
| **Meta Ads** | Orçamento estimado R$ 1.500-2.500/mês | Orçamento previsto R$ 250/mês (fase de teste) |
| **Email** | 5-8k contatos, 1 newsletter/sem | 0 contatos, sequência automatizada |
| **TikTok** | Ausente | Previsto desde o lançamento |

### Oportunidade TikTok

FitCoach Academy está completamente ausente do TikTok. É uma oportunidade importante para a Academia FitPro: a plataforma está em crescimento para conteúdo de negócios/coaching, a concorrência é baixa no nicho "coach fitness business" em português, e o formato curto (15-60s) combina perfeitamente com o tom direto e sem enrolação da FitPro.

**Ação recomendada**: Publicar 4-5 TikToks/semana desde o lançamento. Reciclar o conteúdo do Instagram em formato TikTok. Mirar as hashtags \`#coachfitness\` e \`#empreendedorfitness\` antes que a FitCoach se instale lá.

---

## 8. Monitoramento Concorrencial — Indicadores a Acompanhar

| Indicador | Frequência | Ferramenta | Gatilho de alerta |
|-----------|-----------|------------|------------------|
| Novos artigos no blog da FitCoach | Semanal | Google Alerts | Novo pilar sobre nossas palavras-chave |
| Preço do produto FitCoach | Mensal | Verificação manual | Queda abaixo de R$ 140 |
| Seguidores Instagram FitCoach | Mensal | Social Blade | Crescimento > 10%/mês |
| Novos anúncios Meta da FitCoach | Semanal | Biblioteca de Anúncios Meta | Novo ângulo ou novo produto |
| Avaliações de clientes FitCoach | Mensal | Reclame Aqui / Google | Tendência negativa (oportunidade) |
| Lançamento de novo produto | Contínuo | Google Alerts + newsletter | Qualquer novo produto |

**Regra**: Se a FitCoach lançar um produto abaixo de R$ 120 ou criar uma comunidade, revisar imediatamente o posicionamento e os contra-ângulos.`,
};

export default skill;
