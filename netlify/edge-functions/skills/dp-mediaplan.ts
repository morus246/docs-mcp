import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-mediaplan",
  categoria: "Promoção",
  descricao: "Gera um calendário de conteúdo para redes sociais completo (1-8 semanas) com briefs detalhados por post, direção visual e estratégia de funil TOFU/MOFU/BOFU. Produz um arquivo HTML standalone com design dark-theme. Suporta Instagram, LinkedIn, Facebook, TikTok. Gatilhos: media plan, calendário de conteúdo, content calendar, social media, planejamento, publicação, redes sociais.",
  argumentHint: "[plataforma(s)] [duração: 2w|4w|8w] [objetivo: awareness|leads|launch|evergreen]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Media Plan — Calendário de Conteúdo para Redes Sociais

<!-- v2.0.0 | 2026-04-13 | Refatoração completa: context intake, identidade de marca, direção visual, quality gates, tratamento de erros, integração cross-skill -->

Expert em estratégia de redes sociais. Gera um calendário de conteúdo completo com briefs detalhados, direção visual por post e estratégia de funil — entregue em arquivo HTML standalone pronto para usar.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-mediaplan [plataforma]\` | Calendário de 4 semanas para uma plataforma |
| \`/dp-mediaplan [plataforma] 2w\` | Calendário de 2 semanas (formato curto) |
| \`/dp-mediaplan [plataforma] 8w\` | Calendário de 8 semanas (formato longo) |
| \`/dp-mediaplan [plataforma] launch\` | Calendário orientado para lançamento de produto |
| \`/dp-mediaplan multi [IG+LI]\` | Calendário multiplataforma |
| \`/dp-mediaplan launch [produto]\` | Calendário de lançamento D-14 → D+7 |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Arquivo HTML standalone (mediaplan-[platform]-[mes].html)
├── CSS dark-theme embutido (design system media plan)
├── Estratégia de funil TOFU/MOFU/BOFU
├── Briefs detalhados por post (hook, copy, CTA, direção visual)
├── Direção visual por post (cores, estilo, notas para o designer)
├── KPIs e métricas de acompanhamento
└── Diretrizes de produção
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Coletar plataforma, produto, identidade visual, mensagens (OBRIGATÓRIO)
2. Ler referências     → Carregar o design system HTML do media plan de referência
3. Estratégia          → Funnel mix, content mix, frequência adaptada
4. Montar calendário   → Tema por semana + briefs detalhados por post
5. Montar HTML         → Arquivo standalone com design system dark-theme
6. Quality check       → Verificação do funnel balance, completude, regras
7. Entrega             → Arquivo HTML + resumo + próximos passos
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Sempre Faça Isso Primeiro)

Antes de qualquer planejamento, coletar o contexto. Sem ele, o conteúdo será genérico e os visuais incoerentes.

### 1a. Carregar o perfil business (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, cores, estilo visual
  → NÃO repetir as perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrirão o mínimo.
\`\`\`

### 1b. Fazer as perguntas por blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar por 2-3, aguardar as respostas, reformular para validar, depois continuar.

#### Bloco 1 — Plataforma e duração (perguntar primeiro)

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | Em qual(is) plataforma(s) você publica? \`Instagram\` / \`LinkedIn\` / \`Facebook\` / \`TikTok\` (ou várias) | Adapta o formato e o tom |
| Q2 | Em quantas semanas? (padrão: 4 semanas) | Escopo do calendário |
| Q3 | Qual é seu objetivo principal? \`awareness\` (notoriedade) / \`leads\` (geração de prospectos) / \`launch\` (lançamento de produto) / \`evergreen\` (conteúdo perene) | Orienta a estratégia de funil |
| Q4 | Você tem uma cor principal de marca? (hex ou nome) | Identidade visual dos conteúdos |
| Q5 | E uma cor de destaque? (para CTAs, highlights) | Coerência visual |
| Q6 | Qual estilo visual? \`minimalista\` / \`bold\` / \`premium\` / \`warm\` | Direção artística |

**Após as respostas**: Confirmar. "Ok, vou criar um calendário [plataforma] de [X] semanas, orientado para [objetivo]."

#### Bloco 2 — Produto e mensagens

| # | Pergunta | Por que |
|---|----------|---------|
| Q7 | Qual produto ou oferta quer promover? Descreva em 2-3 frases (nome, preço, para quem, qual resultado). | Conteúdo dos posts BOFU |
| Q8 | Quais são suas 3-5 mensagens-chave? As ideias que você quer que sua audiência lembre. | Fio editorial |
| Q9 | Você tem temas ou ângulos específicos a cobrir? Ou temas a evitar? | Cadrage editorial |

**Após as respostas**: Reformular as mensagens-chave. "Suas mensagens centrais são: [1], [2], [3]. Está correto?"

#### Bloco 3 — Identidade visual e branding (CRÍTICO para a direção visual)

| # | Pergunta | Por que |
|---|----------|---------|
| Q10 | Quais são suas cores de marca? Me dê sua cor primária e sua cor de destaque (hex, nome, ou descrição). *(Confirmar/refinar as respostas Q4-Q6)* | Coerência visual dos briefs |
| Q11 | Você tem um nome de marca / logo / fontes específicas para usar nos visuais? | Branding coerente |

> **Se o usuário não tiver cores**: Propor 3 paletas adaptadas ao seu nicho:
> - Cada paleta = cor primária + cor de destaque + cor de texto
> - Mostrar uma prévia: "Paleta 1: Azul profundo (#1e3a5f) + Dourado (#d4a853) — estilo premium/confiança"
> - Pedir para escolher ou combinar

**Após as respostas**: Resumir as escolhas visuais. Essas informações serão usadas em CADA brief de post para a direção visual.

### 1c. Síntese de descoberta

Após todos os blocos, apresentar:

\`\`\`
╔══════════════════════════════════════════════════╗
║           MEDIA PLAN — SÍNTESE                   ║
╠══════════════════════════════════════════════════╣
║ Plataforma(s)  : [plataforma(s)]                 ║
║ Duração        : [X] semanas                     ║
║ Objetivo       : [objetivo]                      ║
║ Frequência     : [X] posts/semana                ║
╠══════════════════════════════════════════════════╣
║ PRODUTO                                          ║
║ Nome           : [nome do produto]               ║
║ Preço          : [preço]                         ║
║ Audiência      : [para quem]                     ║
╠══════════════════════════════════════════════════╣
║ MENSAGENS-CHAVE                                  ║
║ 1. [mensagem 1]                                  ║
║ 2. [mensagem 2]                                  ║
║ 3. [mensagem 3]                                  ║
╠══════════════════════════════════════════════════╣
║ IDENTIDADE VISUAL                                ║
║ Primária       : [#hex — nome]                   ║
║ Destaque       : [#hex — nome]                   ║
║ Estilo         : [minimalista/bold/premium/warm/raw] ║
║ Marca/Fonte    : [infos de branding]             ║
╠══════════════════════════════════════════════════╣
║ EXCLUSÕES      : [temas a não abordar]           ║
╚══════════════════════════════════════════════════╝
\`\`\`

**Pedido de validação**: "Esta síntese está correta? Quer modificar algo antes de eu montar o calendário?"

**Hard gate**: NÃO continuar sem validação explícita.

---

## Etapa 2 — Ler o Design de Referência

### 2a. Carregar o media plan de referência (silencioso)

\`\`\`
Ler references/post-briefs-example.md → para 1 semana de briefs no Instagram
Ler mediaplan.html (ou presentation.html) na raiz do projeto para extrair:
  → O CSS completo do design system dark-theme
  → A estrutura HTML (header, strategy grid, week sections, content cards)
  → O formato dos briefs de conteúdo em cada card

SE o arquivo de referência estiver ausente:
  → Usar o design system padrão descrito na Etapa 5
\`\`\`

---

## Etapa 3 — Definir a Estratégia

### 3a. Funnel Mix — TOFU / MOFU / BOFU

| Estágio | Objetivo | Proporção | Cor da tag | Tipos de conteúdo |
|---------|----------|-----------|------------|-------------------|
| **TOFU** (Awareness) | Atrair, educar | 40% | Verde (\`#3ecf8e\`) | Dicas educativas, mitos desmistificados, pontos de dor, formatos em tendência |
| **MOFU** (Consideration) | Credibilizar, demonstrar | 35% | Azul (\`#6E8BFF\`) | Casos de estudo, frameworks, bastidores, how-to, processos |
| **BOFU** (Decision) | Converter | 25% | Vermelho (\`#ff6b6b\`) | Depoimentos, ofertas, urgência, CTA direto para o produto |

### 3b. Content Mix por plataforma

| Plataforma | Reels/Vídeo | Carrosséis/Docs | Estático/Texto | Stories |
|-----------|-------------|-----------------|----------------|---------|
| Instagram | 40% | 35% | 15% | 10% |
| LinkedIn | 10% | 30% | 50% | 10% |
| Facebook | 30% | 20% | 40% | 10% |
| TikTok | 80% | 0% | 10% | 10% |

### 3c. Frequência de publicação

| Plataforma | Frequência | Melhores dias |
|-----------|-----------|---------------|
| Instagram | 5-6x/semana | Terça, Quarta, Quinta, Sábado |
| LinkedIn | 4-5x/semana | Terça, Quarta, Quinta |
| Facebook | 4-5x/semana | Quarta, Quinta, Sexta |
| TikTok | 7x/semana (1-2x/dia) | Todos os dias |

### Calendário de Lançamento (modo launch)

Se o objetivo for um lançamento de produto, usar este calendário especial:

| Fase | Dias | Posts/dia | Objetivo | Mix |
|------|------|-----------|----------|-----|
| Teasing | D-14 → D-7 | 1 | Criar curiosidade | 100% TOFU |
| Warm-up | D-7 → D-1 | 1-2 | Revelar o produto, educar | 60% MOFU / 40% TOFU |
| Lançamento | D-0 → D+2 | 2-3 | Converter | 80% BOFU / 20% MOFU |
| Prova social | D+3 → D+5 | 1-2 | Reforçar com depoimentos | 60% BOFU / 40% MOFU |
| Última chamada | D+6 → D+7 | 1-2 | Urgência final | 100% BOFU |

### 3d. Ajustes segundo o objetivo

| Objetivo | Ajuste funil | Ajuste conteúdo |
|----------|-------------|-----------------|
| Awareness | TOFU 55% / MOFU 30% / BOFU 15% | Mais conteúdo viral, formatos em tendência |
| Leads | TOFU 35% / MOFU 40% / BOFU 25% | Mais lead magnets, gatilhos de DM |
| Launch | TOFU 20% / MOFU 30% / BOFU 50% | Sequência de lançamento estruturada (teasing → reveal → oferta → urgência) |
| Evergreen | TOFU 45% / MOFU 40% / BOFU 15% | Conteúdo intemporal, reciclável |

---

## Etapa 4 — Montar o Calendário Semanal

Para cada semana, criar:

### 4a. Tema da semana

Cada semana tem um tema narrativo que conecta os posts entre si. As semanas se constroem umas sobre as outras.

\`\`\`
SEMANA [N] — "[Tema]"
Narrativa: [o que construímos na cabeça da audiência essa semana]
Mix funil: [X] TOFU / [X] MOFU / [X] BOFU
\`\`\`

### 4b. Brief detalhado por post (OBRIGATÓRIO para cada post)

Cada post recebe um brief completo. Nenhum placeholder.

\`\`\`
BRIEF DE POST
═══════════════════════════════
Dia          : [Segunda-Domingo]
Funil        : [TOFU ■ / MOFU ■ / BOFU ■]
Formato      : [Reel / Carrossel / Estático / Story / Texto]
Tema         : [tema específico]

HOOK (primeira linha — o scroll-stopper):
"[Hook impactante — curto, específico, emocional ou contrarian]"

COPY (texto completo do post):
[Caption completa, pronta para copiar e colar. Formatada para a plataforma.]

CTA:
[Call to action claro — soft/médio/hard conforme o estágio do funil]

DIREÇÃO VISUAL:
  Cor dominante  : [cor primária ou accent da marca]
  Ambiance       : [descrição da ambiance visual]
  Elementos      : [o que deve aparecer — texto overlay, foto, ilustração]
  Estilo         : [coerente com o estilo visual escolhido no Q8]
  Formato/Specs  : [dimensões, duração se vídeo, número de slides se carrossel]

NOTAS PARA O DESIGNER:
  [Instruções específicas para quem criará o visual]

HASHTAGS (se aplicável):
  [5-10 hashtags — mix broad + nicho + long-tail]
\`\`\`

### 4c. Hooks — Padrões que funcionam

| Padrão | Exemplo |
|--------|---------|
| Contrarian | "A maioria dos [profissionais] falha porque faz exatamente o que os gurus recomendam." |
| Número específico | "Consegui [resultado concreto] em [duração]. Aqui está o método exato." |
| Ponto de dor | "Você não tem um problema de [X]. Você tem um problema de [Y]." |
| Pergunta | "E se seu [negócio/projeto] pudesse funcionar em [tempo] por dia?" |
| Afirmação forte | "Você não precisa de [coisa considerada necessária] para [resultado]." |

### 4d. Padrões de CTA

| Intensidade | Exemplos |
|-------------|----------|
| **Soft** | "Salva esse post." / "Segue para mais conteúdo assim." |
| **Médio** | "Me manda '[palavra-chave]' por DM para receber [lead magnet]." / "Comenta [emoji] se faz sentido pra você." |
| **Hard** | "Link na bio. [Preço]. Sem enrolação. Só ação." / "Oferta válida até [data]." |

### 4e. Regras de copy

| Fazer | NÃO fazer |
|-------|-----------|
| Frases curtas. Impacto máximo. | Parágrafos-muros |
| Uma ideia por parágrafo | Múltiplas ideias entrelaçadas |
| Line breaks para legibilidade | Blocos de texto compactos (especialmente no Instagram) |
| Números e resultados específicos | "Resultados incríveis" sem detalhes |
| Adaptar o tom à plataforma | Mesmo texto copiado em todas as plataformas |
| Terminar com um CTA claro | Fim sem conclusão |
| Ressalvas honestas quando necessário | Promessas garantidas ou exageradas |

### 4f. Estratégia de Hashtags (Instagram / TikTok)

Mix recomendado:
- 3 broad: #[nicho amplo] #[indústria] #[tema geral]
- 3 nicho: #[especialidade] #[método] #[sub-nicho]
- 3 long-tail: #[frase específica buscada] #[pergunta frequente]

---

## Etapa 5 — Montar o HTML

Construir o arquivo HTML usando o design system do media plan de referência.

### 5a. Estrutura HTML necessária

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Marca] — Media Plan [Plataforma] ([Duração])</title>
  <style>
    /* CSS dark-theme copiado do arquivo de referência */
    /* Cores da marca integradas em CSS custom properties */
    :root {
      --brand-primary: [cor primária do Q7];
      --brand-accent: [cor accent do Q7];
      --tofu: #3ecf8e;
      --mofu: #6E8BFF;
      --bofu: #ff6b6b;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header com branding -->
    <div class="header">
      <div class="label">[Plataforma] Content Strategy</div>
      <h1>[Título do media plan]</h1>
      <p>[Duração] • [Objetivo] • [Produto]</p>
    </div>

    <!-- Strategy Overview (3 cards: TOFU, MOFU, BOFU) -->
    <div class="strategy-grid">
      <!-- Cards com proporções e exemplos de conteúdo -->
    </div>

    <!-- Content Mix chart -->

    <!-- Semana 1 -->
    <div class="week-section">
      <h2>Semana 1 — [Tema]</h2>
      <!-- Calendar grid + Content Cards com briefs completos -->
    </div>

    <!-- Semanas 2, 3, 4... -->

    <!-- Seção KPI -->
    <!-- Diretrizes de Produção -->
  </div>
</body>
</html>
\`\`\`

### 5b. As cores da marca nos visuais

As cores coletadas no Bloco 1 do context intake (Q4-Q6) devem ser:
- Integradas em CSS custom properties (\`--brand-primary\`, \`--brand-accent\`)
- Referenciadas em cada brief de direção visual
- Coerentes com o estilo visual escolhido (minimalista, bold, premium, warm, raw)

### 5c. Salvamento

\`\`\`
Caminho de saída: mediaplan-[platform]-[mes].html (na raiz do projeto)
Se multiplataforma: mediaplan-multi-[mes].html
\`\`\`

---

## Etapa 6 — Quality Check

### 6a. Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder nos briefs (sem [TODO], [INSERIR]) | Crítico |
| QG-02 | Cada post tem um brief COMPLETO (hook, copy, CTA, direção visual) | Crítico |
| QG-03 | Nunca >1 post BOFU consecutivo | Crítico |
| QG-04 | Cada post tem uma direção visual com as cores da marca | Crítico |
| QG-05 | Proporções do funil respeitadas: Awareness: TOFU 50-60%, MOFU 25-30%, BOFU 15-20%. Launch: TOFU 30%, MOFU 30%, BOFU 40% | Alto |
| QG-06 | Cada semana tem um tema narrativo coerente | Alto |
| QG-07 | As semanas progridem narrativamente (sem repetição) | Alto |
| QG-08 | Mínimo 3 formatos diferentes por semana (ex: carrossel + reel + imagem) | Médio |
| QG-09 | CTAs adaptados ao estágio do funil (sem hard sell em TOFU) | Alto |
| QG-10 | CSS completo e embutido, sem dependências externas | Crítico |
| QG-11 | Hooks não repetitivos — cada post tem um hook único | Alto |
| QG-12 | Copy adaptada à plataforma (tamanho, tom, formato) | Alto |

### 6b. Verificação do Funnel Balance

\`\`\`
VERIFICAÇÃO DO FUNIL
═══════════════════

Objetivo : [objetivo escolhido]
Target   : TOFU [X]% / MOFU [X]% / BOFU [X]%

Real     : TOFU [X]% ([N] posts) / MOFU [X]% ([N] posts) / BOFU [X]% ([N] posts)
Status   : [OK / AJUSTAR]

Consecutividade BOFU: [OK — nenhum back-to-back / VIOLAÇÃO — dia X e X+1]
\`\`\`

---

## Etapa 7 — Seção de KPIs (incluir no final do HTML do media plan)

| Métrica | Meta | Como medir |
|---------|------|------------|
| Alcance | +20% semana após semana | Analytics da plataforma |
| Taxa de engajamento | >3% (IG), >5% (LinkedIn) | (Curtidas+Comentários+Saves) / Alcance |
| Visitas ao perfil | +15% semana após semana | Analytics da plataforma |
| Cliques no link | Acompanhar toda semana | Ferramenta de link-in-bio |
| DMs recebidos | 5+/semana | Contagem manual |
| Leads gerados | 3+/semana | CRM ou planilha |

---

## Etapa 8 — Entrega

### 8a. Apresentar o entregável

\`\`\`
MEDIA PLAN CRIADO
═══════════════════════

Arquivo        : [caminho completo]
Plataforma(s)  : [plataforma(s)]
Duração        : [X] semanas
Total de posts : [N] posts
Objetivo       : [objetivo]

DISTRIBUIÇÃO DO FUNIL:
  TOFU ■ [XX]% — [N] posts (awareness)
  MOFU ■ [XX]% — [N] posts (consideração)
  BOFU ■ [XX]% — [N] posts (conversão)

FORMATOS:
  Reels/Vídeo    : [N] posts
  Carrosséis     : [N] posts
  Estático/Texto : [N] posts
  Stories        : [N] posts

IDENTIDADE VISUAL APLICADA:
  Primária : [#hex]
  Destaque : [#hex]
  Estilo   : [estilo escolhido]

PRÓXIMOS PASSOS:
  → /dp-social-caption     Redigir as captions em detalhe
  → /dp-ad-angles-meta     Transformar os BOFU em publicidades
  → /dp-competitor-analysis Analisar a estratégia social do concorrente
  → /dp-playbook-create     Criar o lead magnet mencionado nos posts
  → /ebook-cover            Criar os visuais de capa
\`\`\`

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Plataforma não especificada | Perguntar antes de continuar — é obrigatório |
| Produto não definido | Criar um calendário awareness/educação sem BOFU. Avisar o usuário. |
| Sem cores da marca | Propor 3 paletas adaptadas ao nicho, pedir para escolher |
| Duração muito longa (>8 semanas) | Dividir em fases de 4 semanas. Entregar a primeira, propor a continuação. |
| Muitas plataformas (>3) | Recomendar priorizar 2 plataformas. Adaptar o conteúdo em vez de duplicar. |
| O arquivo mediaplan.html de referência não existe | Usar o design system dark-theme padrão |
| business-profile.md ausente | Continuar com as respostas do context intake |
| O usuário quer o mesmo conteúdo em todas as plataformas | Desaconselhar. Adaptar no mínimo o formato e o tom. Explicar o porquê. |

---

## Integração Cross-Skill

| Antes do mediaplan | Skill anterior | Quando |
|-------------------|----------------|--------|
| Analisar a concorrência | \`/dp-competitor-analysis\` | Para identificar lacunas de conteúdo a explorar |
| Definir o posicionamento | \`business-profile.md\` | Recomendado para coerência |
| Criar o produto a promover | \`/dp-playbook-create\` | Se o produto ainda não existe |

| Depois do mediaplan | Próximo skill | Quando |
|--------------------|---------------|--------|
| Redigir as captions detalhadas | \`/dp-social-caption\` | Para desenvolver alguns posts |
| Criar as publicidades | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para amplificar os melhores posts |
| Criar o lead magnet | \`/dp-playbook-create\` \`/lead-magnet-create\` | Se um lead magnet é mencionado no plano |
| Sequência de email | \`/dp-email-sequence\` | Para a conversão pós-DM |
| Página de venda | \`/dp-landing-page\` | Se o link na bio leva a uma página |

---

# Exemplo — Semana de Lançamento

## Academia FitPro — Playbook do Coach Fitness (R$ 197)

**Produto**: Playbook do Coach Fitness
**Preço**: R$ 197
**Audiência**: Coaches fitness iniciantes que querem lançar sua atividade
**Voz**: Direta, motivadora, sem enrolação, tutear
**Cores**: Primária #059669 / Destaque #10b981
**Período**: Semana de lançamento (Segunda a Domingo)

---

## DIA 1 — Segunda | 07h30

**Estágio do funil**: \`[TOFU]\` Sensibilização
**Formato**: Carrossel (5 slides)

**Hook (linha 1)**:
> Você tem seu diploma de coach fitness... e zero cliente. Normal.

**Caption completa**:
Você tem seu diploma de coach fitness... e zero cliente. Normal. Ninguém te ensinou a vender. Ninguém te mostrou como criar uma oferta que atrai. Por 2 anos eu lutei exatamente como você. Aí entendi 3 coisas que mudaram tudo. Desliza para descobrir.

**CTA**: Salva esse post e me conta nos comentários: qual é sua maior dificuldade?

**Direção visual**:
- Slide 1: Fundo #059669, texto branco em negrito, emoji diploma
- Slides 2-4: Fundo branco, borda esquerda #10b981, uma ideia por slide em tipografia bold
- Slide 5: Fundo #10b981, CTA em branco, logo Academia FitPro embaixo
- Composição: Texto centralizado, margem 60px, fonte sans-serif moderna

**Hashtags**:
\`#coachfitness\` \`#coachesportivo\` \`#empreendedorismo\`
\`#businesscoaching\` \`#lancarseunegoicio\` \`#formacaocoach\`
\`#devenirinstrutor\` \`#coachfitnessbrasil\` \`#businesscoaching\` \`#coachinicinante\`

**Notas designer**: Usar ícones minimalistas (linha fina, estilo Phosphor). Sem fotos stock. Manter uma proporção texto/espaço em branco de 40/60.

---

## DIA 2 — Terça | 12h15

**Estágio do funil**: \`[TOFU]\` Educação
**Formato**: Reel (30-45 seg)

**Hook (linha 1)**:
> 3 erros que matam seu negócio de coach (o 2º dói)

**Caption completa**:
3 erros que matam seu negócio de coach (o 2º dói). Acompanhei +200 coaches. Esses 3 erros aparecem sempre. Para de cometê-los e vai ver a diferença em 30 dias. O detalhe está no vídeo.

**CTA**: Quer o plano completo? Link na bio.

**Direção visual**:
- Talking head de frente para câmera, fundo neutro
- Texto sobreposto em cima: hook em branco sobre faixa #059669
- Cada erro aparece em overlay com número em #10b981
- Legendas automáticas, estilo negrito com fundo semitransparente
- Transição cut rápida entre cada ponto

**Hashtags**:
\`#coachesportivo\` \`#fitness\` \`#empreendedor\`
\`#erroscoach\` \`#businessfitness\` \`#coachingonline\`
\`#coachpessoal\` \`#lançarseunegoicio\` \`#coachfitnessbr\` \`#viverdapaixao\`

**Notas designer**: Formato vertical 9:16. Legendas em Montserrat Bold. Adicionar emojis nas legendas para acentuar os pontos-chave. Thumbnail: rosto + texto do hook.

---

## DIA 3 — Quarta | 18h00

**Estágio do funil**: \`[MOFU]\` Consideração
**Formato**: Imagem única (depoimento)

**Hook (linha 1)**:
> "Em 3 meses fui de 0 a 12 clientes regulares" — Marc, coach em São Paulo

**Caption completa**:
"Em 3 meses fui de 0 a 12 clientes regulares" — Marc, coach em São Paulo. Marc tinha tudo: diploma, paixão, competências técnicas. O que faltava era um sistema. Um plano de verdade para encontrar clientes sem suplicar ao seu círculo. O Playbook deu exatamente isso a ele.

**CTA**: Quer os mesmos resultados? O link está na minha bio. R$ 197, sem riscos.

**Direção visual**:
- Foto de Marc (ou avatar no estilo ilustração) em fundo branco
- Citação entre aspas, tipografia serif itálico, cor #059669
- Faixa inferior: resultado em números sobre fundo #10b981, texto branco
- Logo Academia FitPro no canto inferior direito, discreto
- Moldura fina #059669 ao redor da imagem

**Hashtags**:
\`#depoimento\` \`#coaching\` \`#fitness\`
\`#resultados\` \`#clientescoaching\` \`#coachesportivosaopaulo\`
\`#transformacaodenegocios\` \`#sucessocoach\` \`#coachfitnessbrasil\` \`#encontrarclientes\`

**Notas designer**: Estilo editorial clean. Se ilustração, usar estilo flat com paleta #059669/#10b981. Sem filtros excessivos na foto.

---

## DIA 4 — Quinta | 07h30

**Estágio do funil**: \`[MOFU]\` Confiança
**Formato**: Carrossel (7 slides — checklist)

**Hook (linha 1)**:
> Checklist: você está REALMENTE pronto para viver do coaching fitness?

**Caption completa**:
Checklist: você está REALMENTE pronto para viver do coaching fitness? 7 pontos para validar antes de se lançar. Se você marcar menos de 4... falta um plano. Desliza para checar cada ponto. E seja honesto consigo mesmo.

**CTA**: Quantos você marcou? Fala nos comentários. Se for menos de 4, tenho algo pra você.

**Direção visual**:
- Slide 1: Fundo #059669, texto branco, ícone checklist
- Slides 2-7: Fundo branco, checkbox à esquerda, um ponto por slide
- Checkbox marcado = #10b981, não marcado = cinza claro
- Texto em preto, palavras-chave em #059669 bold
- Último slide: recapitulativo + CTA em fundo #10b981

**Hashtags**:
\`#coachfitness\` \`#checklist\` \`#empreendedorismo\`
\`#planodeacao\` \`#coachinicinante\` \`#selancar\`
\`#coachingfitnessbrasil\` \`#objetivoscoach\` \`#balancodecoach\` \`#prepararlancamento\`

**Notas designer**: Animações sutis se formato animado. Manter a coerência tipográfica com o carrossel do D1. Usar a mesma fonte e as mesmas margens.

---

## DIA 5 — Sexta | 12h15

**Estágio do funil**: \`[BOFU]\` Decisão
**Formato**: Reel (15-20 seg — teaser do produto)

**Hook (linha 1)**:
> Veja exatamente o que tem no Playbook do Coach Fitness

**Caption completa**:
Veja exatamente o que tem no Playbook do Coach Fitness. Sem enrolação. Sem teoria vaga. R$ 197 por um sistema completo que te leva de zero cliente a uma atividade rentável. Você vê o detalhe no vídeo.

**CTA**: Link na bio. R$ 197. Você começa esse fim de semana.

**Direção visual**:
- Mockup do produto (ebook/tablet) em fundo #059669
- Rolagem rápida das páginas/capítulos com texto overlay
- Cada capítulo aparece por 1,5 seg com título em branco sobre faixa #10b981
- Final: tela do preço (R$ 197 tachado, depois exibido) + botão CTA animado
- Música: beat energético, em tendência

**Hashtags**:
\`#ebook\` \`#coachfitness\` \`#formacao\`
\`#playbookcoach\` \`#sistemacoaching\` \`#ofertacoaching\`
\`#197reais\` \`#lancamentoproduto\` \`#guiacoachfitness\` \`#investimentocoach\`

**Notas designer**: Mockup realista (não flat design aqui). Sombra suave. Animação fluida, sem transição agressiva. O preço deve ser legível mesmo em tela pequena.

---

## DIA 6 — Sábado | 09h00

**Estágio do funil**: \`[BOFU]\` Urgência
**Formato**: Story (3 stories encadeadas)

**Hook (linha 1)**:
> Último fim de semana no preço de lançamento

**Caption completa**:
Story 1: "Último fim de semana no preço de lançamento. R$ 197. Segunda muda."
Story 2: "O que você recebe: o sistema completo em 5 módulos. Teoria? Não. Templates prontos para usar."
Story 3: "Desliza. É agora ou fica mais caro."

**CTA**: Swipe up / Link na bio (conforme disponibilidade do sticker de link)

**Direção visual**:
- Story 1: Fundo #059669, texto branco em maiúsculas, timer/contagem regressiva em sticker
- Story 2: Screenshot do conteúdo do playbook, borda #10b981, setas anotadas
- Story 3: Fundo #10b981, botão CTA central grande, efeito pulse
- Fonte: Bold condensed, legível no celular

**Hashtags**: (sem hashtags em story — usar os stickers de localização e menção em vez disso)

**Notas designer**: Usar os stickers nativos do Instagram (contagem regressiva, enquete na Story 1 tipo "Você vai se lançar?"). Manter a marca visível mas não invasiva.

---

## DIA 7 — Domingo | 18h00

**Estágio do funil**: \`[BOFU]\` Encerramento
**Formato**: Imagem única (anúncio final)

**Hook (linha 1)**:
> Última chance: Playbook do Coach Fitness por R$ 197 fecha hoje à noite

**Caption completa**:
Última chance: Playbook do Coach Fitness por R$ 197 fecha hoje à noite. Amanhã o preço vai para R$ 297. Em 1 semana, 83 coaches já baixaram o Playbook. Eles têm o plano. Eles avançam. E você, o que vai fazer?

**CTA**: Link na bio. Última chance por R$ 197. Meia-noite, acabou.

**Direção visual**:
- Design "urgência": fundo escuro (preto ou cinza muito escuro)
- Texto principal em branco, preço em #10b981 bold XXL
- Preço antigo R$ 297 tachado em vermelho discreto
- Badge "83 coaches já inscritos" em encarte #059669
- Relógio ou ícone de timer em accent
- Logo Academia FitPro em branco, centro-inferior

**Hashtags**:
\`#ultimachance\` \`#coaching\` \`#fitness\`
\`#ofertaespecial\` \`#precolancamento\` \`#coachfitness\`
\`#playbook\` \`#businessfitness\` \`#coachinicinante2026\` \`#lançajaogo\`

**Notas designer**: O contraste deve ser máximo. O preço R$ 197 deve ser o elemento mais visível. Testar a legibilidade em fundo escuro antes de publicar.

---

## Resumo da semana

| Dia | Formato | Funil | Objetivo principal |
|-----|---------|-------|--------------------|
| Seg | Carrossel 5 slides | TOFU | Identificar o problema |
| Ter | Reel 30-45s | TOFU | Educar + autoridade |
| Qua | Imagem depoimento | MOFU | Prova social |
| Qui | Carrossel 7 slides | MOFU | Engajamento + qualificação |
| Sex | Reel 15-20s | BOFU | Apresentar o produto |
| Sáb | 3 Stories | BOFU | Criar urgência |
| Dom | Imagem final | BOFU | Converter (deadline) |

**Distribuição funil**: 2 TOFU / 2 MOFU / 3 BOFU
**Distribuição formato**: 2 Carrosséis / 2 Reels / 2 Imagens / 1 Story
**Orçamento de impulsionamento sugerido**: R$ 50 no Reel D2 (TOFU) + R$ 80 na imagem D7 (BOFU)
`,
};

export default skill;
