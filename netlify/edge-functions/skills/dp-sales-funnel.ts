import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-sales-funnel",
  categoria: "Venda e Monetização",
  descricao: "Arquiteto de funil de vendas completo, do tráfego ao upsell. Define cada etapa com ferramentas, KPIs, necessidades de conteúdo, automações e matemática de conversão. Integra a identidade visual para coerência com as landing pages. Adaptável a qualquer orçamento e stack técnico. Gatilhos: funil, funil de vendas, sales funnel, estratégia de vendas, jornada do cliente, conversão, entonnoir.",
  argumentHint: "[produto] [tipo: simple|ladder|webinar|challenge] [orçamento]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Sales Funnel — Arquiteto de Funil de Vendas

<!-- v2.0.0 | 2026-04-13 | Refactoring completo: context intake com brand identity, quality gates, error handling, integração entre skills -->

Estrategista de funil de vendas para DP Criador. Concebe funis completos e praticáveis com cada etapa definida: fonte de tráfego, landing page, captura de leads, nutrição, venda e pós-compra.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-sales-funnel [produto]\` | Iniciar a concepção completa do funil |
| \`/dp-sales-funnel simple [produto]\` | Funil simples (1 produto, tráfego → venda) |
| \`/dp-sales-funnel ladder [produto]\` | Funil escada (lead magnet → produto → upsell) |
| \`/dp-sales-funnel webinar [produto]\` | Funil webinar (inscrição → ao vivo → oferta) |
| \`/dp-sales-funnel challenge [produto]\` | Funil challenge (inscrição → X dias → oferta) |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Arquitetura do funil (esquema visual)
│   └── [TRÁFEGO] → [CAPTURA] → [NUTRIÇÃO] → [VENDA] → [ENTREGA] → [UPSELL]
├── Detalhe de cada etapa
│   ├── Ferramentas recomendadas + custos
│   ├── KPIs alvo
│   ├── Conteúdo a criar
│   └── Automações
├── Matemática de conversão (orçamento → ROI)
├── Identidade visual para coerência entre páginas
├── Checklist de conteúdo a criar
└── Arquivo: funnel/dp-sales-funnel-[slug].md
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Coletar produto, orçamento, ferramentas, objetivos, brand (OBRIGATÓRIO)
2. Ler referências     → Carregar business-profile.md + conteúdo do produto se disponível
   Ler references/funnel-example.md → para funil completo com matemática
3. Desenhar o funil    → Arquitetura 6 etapas
4. Definir tech stack  → Ferramentas + custos + integrações
5. Matemática de conversão → Orçamento → Cliques → Leads → Vendas → ROI
6. Mapa de automações  → Gatilhos → Ações → Ferramentas
7. Checklist de conteúdo → Tudo o que precisa criar
8. Integração de brand → Cores e identidade para as páginas do funil
9. Quality check       → Coerência, realismo, completude
10. Entregar           → Arquivo markdown + resumo
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Faça Isso Primeiro)

### 1a. Carregar o perfil de negócio (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, preços, cores, ferramentas
  → NÃO repetir as perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrem o mínimo.
\`\`\`

### 1b. Fazer as perguntas em blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar por 2-3, aguardar as respostas, depois continuar.

#### Bloco 1 — O produto e o objetivo

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | Qual produto ou serviço você quer vender? Nome + preço + descrição curta. | Centro do funil |
| Q2 | Qual é o seu objetivo? (receita mensal alvo, número de vendas ou número de leads) | Dimensionar o funil |
| Q3 | Qual tipo de funil? \`simple\` (tráfego → venda) / \`ladder\` (lead magnet → produto → upsell) / \`webinar\` / \`challenge\` | Arquitetura global |

**Após as respostas**: Reformular. "Você quer um funil [tipo] para vender [produto] a [preço] com objetivo de [X]. Correto?"

#### Bloco 2 — O orçamento e as ferramentas

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | Qual é o seu orçamento mensal de marketing? (anúncio + ferramentas) | Dimensionar as recomendações |
| Q5 | Quais ferramentas você já usa? (email, pagamento, site, CRM, anúncio) | Evitar recomendar ferramentas desnecessárias |
| Q6 | Você está sozinho(a) ou tem equipe? Quanto tempo por semana para o marketing? | Realismo das recomendações |

**Após as respostas**: Síntese das restrições.

#### Bloco 3 — A audiência e a marca

| # | Pergunta | Por que |
|---|----------|---------|
| Q7 | Quem é o seu cliente ideal? (profissão, situação, frustração principal) | Conteúdo e segmentação |
| Q8 | Você já tem identidade visual? Cor primária (hex) + cor de destaque (hex) + estilo (\`minimalista\` / \`bold\` / \`premium\` / \`warm\`) | Coerência das landing pages no funil |
| Q9 | Você tem um lead magnet existente ou precisa criar um? | Etapa de captura do funil |

> **Se não tiver cores**: Propor 3 paletas adaptadas ao nicho.
> Essas cores serão transmitidas ao \`/dp-landing-page\` para cada página do funil.

**Após as respostas**: Síntese audiência + brand.

#### Bloco 4 — O contexto existente

| # | Pergunta | Por que |
|---|----------|---------|
| Q10 | Você já tem uma lista de email? Se sim, quantos assinantes? | Estratégia de nutrição |
| Q11 | Você já tem tráfego orgânico? (redes sociais, blog, YouTube) | Fontes de tráfego |
| Q12 | O que você já tentou para vender? O que funcionou / não funcionou? | Evitar erros passados |

**Após as respostas**: Partir para a concepção.

---

## Etapa 2 — Arquitetura do Funil

Mapear cada etapa da jornada do cliente:

\`\`\`
ARQUITETURA DO FUNIL
====================

[TRÁFEGO] → [CAPTURA] → [NUTRIÇÃO] → [VENDA] → [ENTREGA] → [UPSELL/INDICAÇÃO]

Etapa 1: TRÁFEGO
  Fontes:
    - Orgânico: [redes sociais, SEO blog, YouTube, podcast]
    - Pago: [Meta Ads, Google Ads]
    - Indicação: [afiliados, boca a boca, parcerias]
  Conteúdo necessário: [lista]
  KPIs: [reach, CTR, CPC, volume de tráfego]
  Orçamento alocado: [% do total]

Etapa 2: CAPTURA DE LEADS
  Lead Magnet: [recurso gratuito — descrever precisamente]
  Landing Page: [descrição + elementos-chave]
    → Cores: var(--primary) = [hex], var(--accent) = [hex]
    → Estilo: [minimalista/bold/premium/warm]
  Ferramenta de formulário: [Tally, Brevo, etc.]
  KPIs: [taxa de opt-in alvo: 25-40%]

Etapa 3: NUTRIÇÃO
  Sequência de email: [sequência de boas-vindas — X emails em Y dias]
  Progressão: [valor → prova → pitch]
  Ferramenta: [Brevo, RD Station, MailerLite, etc.]
  KPIs: [taxa de abertura >35%, taxa de clique >3%]

Etapa 4: VENDA
  Página de vendas: [landing page para o produto]
    → Mesmas cores e estilo da página de captura
  Checkout: [Hotmart, Kiwify, Eduzz]
  Opções de pagamento: [único, parcelado se aplicável]
  KPIs: [taxa de conversão alvo: 2-5% a partir de email, 1-3% a partir de tráfego frio]

Etapa 5: ENTREGA
  Acesso: [download imediato / envio por email]
  Onboarding: [sequência pós-compra — X emails]
  Suporte: [email, comunidade, nenhum]
  KPIs: [taxa de conclusão, tickets de suporte]

Etapa 6: UPSELL / RETENÇÃO
  Opções de upsell:
    - [Acompanhamento individual]
    - [Produto avançado / módulo 2]
    - [Comunidade / membership]
  Programa de indicação: [estrutura se aplicável]
  KPIs: [taxa de upsell, LTV, taxa de indicação]
\`\`\`

---

## Etapa 3 — Stack Técnico

\`\`\`
STACK TÉCNICO RECOMENDADO
=========================
| Etapa | Ferramenta | Custo | Por que |
|-------|-----------|-------|---------|
| Landing pages | [ferramenta] | [X] R$/mês | [razão] |
| Email | [ferramenta] | [X] R$/mês | [razão] |
| Checkout | [ferramenta] | [X] R$/mês + taxas | [razão] |
| Analytics | [ferramenta] | gratuito | [razão] |
| CRM | [ferramenta] | [X] R$/mês | [razão] |
| Anúncio | [plataforma] | orçamento variável | [razão] |

Custo fixo total: [X] R$/mês (fora orçamento de anúncio)
\`\`\`

Prioridades:
- Ferramentas gratuitas ou baratas (adequadas a uma estrutura pequena)
- Ferramentas que se integram entre si
- Simplicidade > funcionalidades

---

## Etapa 4 — Matemática de Conversão

\`\`\`
MATEMÁTICA DE CONVERSÃO
========================
Orçamento mensal: [X] R$
Custo por clique (estimado): [X] R$
Cliques: [orçamento / CPC]
Taxa de opt-in: [X]%
Leads: [cliques × taxa opt-in]
Taxa email → venda: [X]%
Vendas por email: [leads × taxa conversão]
Taxa venda direta: [X]%
Vendas diretas: [cliques × (1 - opt-in) × taxa direta]
Total de vendas: [soma]
Receita: [vendas × preço]
ROI: [(receita - orçamento) / orçamento × 100]%

Ponto de equilíbrio: [X] R$ de anúncio por venda
CPA alvo: [X] R$ (para lucratividade)
\`\`\`

---

## Etapa 5 — Mapa de Automações

\`\`\`
AUTOMAÇÕES
============
Gatilho → Ação → Ferramenta

1. Novo opt-in → Enviar email de boas-vindas #1 → [ferramenta de email]
2. Email aberto → Aguardar 1 dia → Enviar email #2 → [ferramenta de email]
3. Link clicado no email → Marcar "interessado" → [ferramenta de email]
4. Compra concluída → Enviar email de entrega → [webhook checkout + email]
5. Compra concluída → Iniciar sequência pós-compra → [ferramenta de email]
6. Dia 14 pós-compra → Enviar email de upsell → [ferramenta de email]
7. Sem compra após 7 dias → Enviar email de retomada → [ferramenta de email]
8. Página de vendas visitada sem compra → Fazer retargeting com Meta Ad → [Meta Pixel]
\`\`\`

---

## Etapa 6 — Checklist de Conteúdo

\`\`\`
CONTEÚDO A CRIAR
=================
[ ] Lead magnet (PDF/vídeo/template)          → /lead-magnet-create
[ ] Landing page de captura de emails         → /dp-landing-page lead-magnet
[ ] Sequência de email de boas-vindas (X emails) → /dp-email-sequence
[ ] Página de vendas do produto               → /dp-landing-page
[ ] Sequência de email pós-compra (X emails)  → /dp-email-sequence
[ ] Página de upsell (se aplicável)           → /dp-landing-page
[ ] 4 semanas de conteúdo social              → /dp-mediaplan
[ ] 4-6 artigos de blog                       → /dp-blog-article
[ ] Ângulos de anúncio Meta — 12 ângulos      → /dp-ad-angles-meta
[ ] Cópias Google Ads                         → /dp-ad-angles-google
\`\`\`

---

## Etapa 7 — Integração de Brand

Para garantir a coerência visual em todo o funil:

\`\`\`
IDENTIDADE VISUAL DO FUNIL
===========================
Cor primária: [hex] → CSS var(--primary)
Cor de destaque: [hex] → CSS var(--accent)
Estilo visual: [minimalista/bold/premium/warm]
Nome da marca: [nome]
Logo: [sim/não — localização]

PÁGINAS DO FUNIL — TODAS USAM ESSAS CORES:
  1. Landing page lead magnet    → /dp-landing-page (passar cores)
  2. Página de vendas do produto → /dp-landing-page (passar cores)
  3. Página de upsell            → /dp-landing-page (passar cores)
  4. Emails                      → /dp-email-sequence (header cor primária)
  5. Anúncios Meta               → /dp-ad-angles-meta (direção criativa coerente)
\`\`\`

---

## Princípios de Design do Funil

1. **Simples vence** — Menos etapas = mais conversões. Não complicar.
2. **Lead magnet irresistível** — Resolve UM problema específico. Rápido de consumir (<10 min).
3. **O email faz a venda** — Não espere que o tráfego frio compre na primeira visita.
4. **Um único CTA por página** — Nunca dar 3 opções ao visitante. Uma única ação.
5. **Velocidade até o valor** — Quanto mais rápido alguém obtém um resultado (mesmo pequeno), mais rápido compra mais.
6. **Fazer retargeting de tudo** — Pixelar a landing page, a página de vendas, a página de agradecimento.
7. **Medir em cada etapa** — Se não consegue medir, não consegue otimizar.

---

### Faixas de orçamento

| Orçamento mensal | Estratégia recomendada | Divisão |
|-----------------|----------------------|---------|
| R$ 0 (gratuito) | 100% orgânico | Blog SEO + social + email |
| < R$ 1.500/mês | Orgânico prioritário + testes pagos | 70% orgânico / 30% pago (testar 1 plataforma) |
| R$ 1.500-6.000/mês | Misto | 40% orgânico / 60% pago (2 plataformas) |
| > R$ 6.000/mês | Paid-first | 20% orgânico / 80% pago (escalonamento) |

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder [TODO], [INSERT] | Crítico |
| QG-02 | Cada etapa do funil tem KPIs alvo com números | Crítico |
| QG-03 | A matemática de conversão é realista: Conversão landing page: 15-40%. Email opt-in: 20-50%. Vendas por email: 2-10%. Nenhuma taxa >50% para etapa paga. | Crítico |
| QG-04 | O orçamento recomendado está adequado às restrições do usuário (ver faixas de orçamento) | Alto |
| QG-05 | Cada ferramenta recomendada é nomeada com custo estimado | Alto |
| QG-06 | O funil funciona com R$ 0 de anúncio (orgânico puro) E é escalável com pago | Crítico |
| QG-07 | As cores da marca estão definidas e transmitidas a todas as páginas | Alto |
| QG-08 | O checklist de conteúdo referencia os skills DP Criador apropriados | Alto |
| QG-09 | As automações são realistas com as ferramentas recomendadas | Alto |
| QG-10 | Nenhuma promessa de receita garantida | Crítico |
| QG-11 | Recomendações adaptadas ao tamanho da equipe | Alto |
| QG-12 | O ponto de equilíbrio (break-even) é calculado e exibido | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Sem produto definido | Perguntar: "Qual produto você quer vender?" — não continuar sem |
| Orçamento muito baixo (<R$ 300/mês) | Recomendar funil 100% orgânico. Sem anúncio pago. Foco em conteúdo + email |
| Sem ferramentas existentes | Recomendar um stack mínimo: Tally (formulários) + Brevo gratuito + Hotmart/Kiwify |
| Sem lead magnet | Propor 3 ideias de lead magnet adaptadas ao nicho. Referenciar \`/lead-magnet-create\` |
| Produto ainda não criado | Recomendar criar o produto primeiro. Referenciar \`/dp-playbook-create\` |
| business-profile.md ausente | Continuar com as respostas do context intake apenas |
| Funil muito complexo para o usuário | Simplificar: recomendar o tipo "simple" primeiro. Evoluir para "ladder" após as primeiras vendas |
| Sem tráfego existente | Recomendar 30 dias de conteúdo orgânico antes de investir em anúncio pago |
| Sem cores da marca | Propor 3 paletas, pedir para escolher e propagá-las a todas as páginas do funil |

---

## Integração com Outros Skills

| Antes do sales-funnel | Skill anterior | Quando |
|-----------------------|----------------|--------|
| Produto criado | \`/dp-playbook-create\` | Se o produto é um ebook/playbook |
| Perfil de negócio | \`business-profile.md\` | Para as informações básicas e cores |

| Após o sales-funnel | Skill seguinte | Quando |
|---------------------|----------------|--------|
| Criar o lead magnet | \`/lead-magnet-create\` | Se não tem lead magnet existente |
| Página captura emails | \`/dp-landing-page lead-magnet\` | Primeira página do funil |
| Página de vendas | \`/dp-landing-page\` | Página central do funil |
| Sequência de email | \`/dp-email-sequence\` | Nutrição + pós-compra |
| Anúncios Meta | \`/dp-ad-angles-meta\` | Fonte de tráfego pago |
| Anúncios Google | \`/dp-ad-angles-google\` | Fonte de tráfego pago complementar |
| Plano de conteúdo | \`/dp-mediaplan\` | Fonte de tráfego orgânico |
| Artigos de blog | \`/dp-blog-article\` | SEO + tráfego orgânico |

---

# Funil de Vendas — Academia FitPro
## O Playbook do Coach Fitness (R$ 197)

**Tipo de funil**: Ladder (Lead Magnet → Ebook → Coaching)
**Produto principal**: O Playbook do Coach Fitness — R$ 197
**Audiência**: Coaches fitness iniciantes
**Ferramenta de email**: Brevo
**Ferramenta de páginas**: Systeme.io / Carrd
**Objetivo**: 50 vendas/mês em regime de cruzeiro (mês 3+)

---

## Visão Geral do Funil

\`\`\`
[TRÁFEGO]
   │
   ▼
[ETAPA 1] Lead Magnet gratuito
   │        "As 5 etapas para encontrar seu primeiro cliente coaching"
   │        Custo: R$ 0 — Objetivo: capturar o email
   │
   ▼
[ETAPA 2] Sequência de Email de Nutrição (5 emails / 10 dias)
   │        Custo: ~R$ 50/mês Brevo
   │        Objetivo: educar + qualificar
   │
   ▼
[ETAPA 3] Página de vendas — O Playbook do Coach Fitness
   │        Preço: R$ 197
   │        Objetivo: converter leads quentes
   │
   ▼
[ETAPA 4] Email pós-compra + Onboarding (3 emails)
   │        Objetivo: ativar + satisfazer
   │
   ▼
[ETAPA 5] Upsell — Pack de Templates Premium
   │        Preço: R$ 97 (upsell one-click)
   │        Objetivo: aumentar o ticket médio
   │
   ▼
[ETAPA 6] Oferta High-Ticket — Coaching Individual (4 semanas)
            Preço: R$ 1.997
            Objetivo: monetizar os clientes mais engajados
\`\`\`

---

## Detalhe por Etapa

### ETAPA 1 — Lead Magnet

| Elemento | Detalhe |
|----------|---------|
| **Nome** | "As 5 etapas para encontrar seu primeiro cliente coaching" |
| **Formato** | PDF 8 páginas |
| **Ferramenta** | Landing page Systeme.io + formulário Brevo |
| **Custo** | R$ 0 (fora hospedagem) |
| **Conteúdo necessário** | PDF design, landing page, thank you page, tag Brevo |
| **KPI alvo** | Taxa de opt-in: 35% (objetivo landing page) |
| **KPI alvo** | Custo por lead (se ads): R$ 5,00 máx |

**Skill DP referenciada**: \`dp-landing-page\` para criar a página de captura

### ETAPA 2 — Sequência de Email de Nutrição

| Elemento | Detalhe |
|----------|---------|
| **Quantidade** | 5 emails em 10 dias |
| **Ferramenta** | Brevo (sequência automatizada) |
| **Custo** | Incluído no plano Brevo (~R$ 50/mês) |
| **Conteúdo necessário** | 5 emails redigidos + links de rastreamento |
| **KPI alvo** | Taxa de abertura média: 45% |
| **KPI alvo** | Taxa de clique média: 5% |
| **KPI alvo** | Taxa de conversão email → venda: 3% |

**Calendário da sequência**:

| Email | Dia | Assunto | Objetivo |
|-------|-----|---------|----------|
| E1 | D+0 | Seu guia está pronto + algo importante | Entregar o lead magnet + criar conexão |
| E2 | D+2 | O erro que 90% dos coaches iniciantes cometem | Educar + identificar a dor |
| E3 | D+4 | Como Marc foi de 0 a 12 clientes | Prova social + storytelling |
| E4 | D+7 | O sistema completo (que não devia compartilhar) | Apresentar O Playbook + curiosidade |
| E5 | D+10 | Última chance: O Playbook a R$ 197 | Urgência + conversão (preço sobe depois) |

**Skill DP referenciada**: \`dp-email-sequence\` para redigir a sequência completa

### ETAPA 3 — Página de Vendas

| Elemento | Detalhe |
|----------|---------|
| **Produto** | O Playbook do Coach Fitness |
| **Preço** | R$ 197 (pagamento único) |
| **Ferramenta** | Systeme.io (página + pagamento integrado) |
| **Custo** | Incluído no Systeme.io (~R$ 100/mês plano Startup) |
| **Conteúdo necessário** | Página de vendas longa, mockup do produto, depoimentos, FAQ |
| **KPI alvo** | Taxa de conversão da página: 4% (tráfego quente por email) |
| **KPI alvo** | Taxa de conversão da página: 1,5% (tráfego frio de anúncios) |
| **KPI alvo** | Ticket médio (com upsell): R$ 230 |

**Skill DP referenciada**: \`dp-landing-page\` (Hero → Problema → Solução → Provas → Preço → FAQ → CTA)

### ETAPA 4 — Pós-Compra + Onboarding

| Elemento | Detalhe |
|----------|---------|
| **Quantidade** | 3 emails em 7 dias |
| **Ferramenta** | Brevo (sequência acionada por compra) |
| **Custo** | Incluído |
| **Conteúdo necessário** | 3 emails + link de acesso ao produto |
| **KPI alvo** | Taxa de abertura: 65% |
| **KPI alvo** | Taxa de conclusão do Playbook: 40% |

| Email | Dia | Assunto | Objetivo |
|-------|-----|---------|----------|
| P1 | D+0 | Seu Playbook está pronto — comece aqui | Entrega + primeira ação |
| P2 | D+3 | Você leu o capítulo 2? Aqui está um bônus | Engajamento + entregar bônus |
| P3 | D+7 | Seus primeiros resultados? (+ uma surpresa) | Feedback + teaser upsell |

### ETAPA 5 — Upsell: Pack de Templates Premium

| Elemento | Detalhe |
|----------|---------|
| **Produto** | Pack de Templates Premium (Canva + Notion + Google Sheets) |
| **Preço** | R$ 97 |
| **Ferramenta** | Systeme.io (upsell one-click pós-pagamento) |
| **Custo** | Incluído |
| **Conteúdo necessário** | Templates design, página upsell curta |
| **KPI alvo** | Taxa de upsell: 25% |
| **KPI alvo** | Receita adicional: R$ 24,25/cliente médio |

### ETAPA 6 — Oferta High-Ticket: Coaching Individual

| Elemento | Detalhe |
|----------|---------|
| **Produto** | Coaching individual "Acelerador Coach" — 4 semanas |
| **Preço** | R$ 1.997 |
| **Ferramenta** | Calendly (chamada de descoberta) + Hotmart (pagamento) |
| **Custo** | Tempo do coach: 4h/cliente |
| **Conteúdo necessário** | Página de coaching, script de chamada de descoberta, contrato |
| **KPI alvo** | Taxa de conversão cliente Playbook → chamada: 5% |
| **KPI alvo** | Taxa de conversão chamada → coaching: 30% |
| **KPI alvo** | Receita adicional: R$ 29,96/cliente médio |

---

## Matemática de Conversão

### Cenário: 1.000 visitantes na landing page de lead magnet

\`\`\`
1.000 visitantes (landing page lead magnet)
   │
   │ Taxa de opt-in: 35%
   ▼
 350 leads (captura de email)
   │
   │ Taxa de abertura da sequência: 45%
   │ Taxa de clique para página de vendas: 5%
   ▼
  52 visitantes da página de vendas (via email, tráfego quente)
   │
   │ Taxa de conversão da página: 4%
   ▼
  15 compradores do Playbook (R$ 197)
   │                = R$ 2.955
   │
   │ Taxa de upsell: 25%
   ▼
   4 compradores Pack de Templates (R$ 97)
   │                = R$ 388
   │
   │ Taxa de conversão coaching: 5% (chamada) × 30% (fechamento)
   ▼
   1 cliente coaching (R$ 1.997) — a cada ~4 ciclos
                     = ~R$ 499/ciclo (amortizados)

RECEITA TOTAL por 1.000 visitantes: R$ 3.743
RECEITA POR LEAD: R$ 10,69
TICKET MÉDIO CLIENTE: R$ 249,53
\`\`\`

### Projeção Mensal (mês 3, regime de cruzeiro)

| Fonte de tráfego | Visitantes/mês | Leads | Vendas Playbook | Receita |
|-----------------|----------------|-------|-----------------|---------|
| SEO (blog) | 3.000 | 1.050 | 44 | R$ 10.868 |
| Instagram orgânico | 1.500 | 525 | 22 | R$ 5.434 |
| Meta Ads (R$ 200/mês) | 800 | 280 | 12 | R$ 2.964 |
| **Total** | **5.300** | **1.855** | **78** | **R$ 19.266** |

---

## Cálculo de Rentabilidade (Break-Even)

### Custos Fixos Mensais

| Item | Custo/mês |
|------|-----------|
| Brevo (1.000 contatos) | R$ 50 |
| Systeme.io (Startup) | R$ 100 |
| Domínio + hospedagem | R$ 30 |
| Meta Ads | R$ 200 |
| Ferramentas diversas (Canva Pro, etc.) | R$ 50 |
| **Total custos fixos** | **R$ 430/mês** |

### Break-Even

\`\`\`
Custo fixo mensal: R$ 430
Preço Playbook: R$ 197
Margem por venda: ~R$ 183 (após taxas Hotmart ~7%)

Break-even = R$ 430 / R$ 183 = 3 vendas/mês

→ A partir da 3ª venda do mês, você está no lucro.
→ Objetivo mês 3: 78 vendas = R$ 19.266 - R$ 430 = R$ 18.836 de lucro
\`\`\`

---

## Automações Brevo — 8 Gatilhos

| # | Gatilho | Tag adicionada | Ações |
|---|---------|---------------|-------|
| 1 | Formulário lead magnet enviado | \`lead-magnet-downloaded\` | Adicionar à sequência "Nutrição 5 emails" + enviar E1 imediatamente |
| 2 | Clique no link da página de vendas (email) | \`visited-sales-page\` | Se sem compra em 48h → email de retomada |
| 3 | Compra do Playbook (webhook Systeme.io) | \`customer-playbook\` | Remover tag lead-magnet + remover da sequência Nutrição + adicionar à sequência Pós-Compra |
| 4 | Compra do upsell templates (webhook) | \`customer-templates\` | Enviar email com links de acesso aos templates |
| 5 | E3 nutrição não aberto (48h) | \`low-engagement\` | Reenviar E3 com assunto alternativo |
| 6 | D+14 após compra do Playbook | \`coaching-prospect\` | Email "Pronto para a próxima etapa?" + link Calendly chamada de descoberta |
| 7 | Chamada de descoberta reservada (Calendly) | \`coaching-call-booked\` | Email de confirmação + questionário pré-chamada + notificação Slack |
| 8 | Sem abertura em 30 dias | \`cold-lead\` | Email de re-engajamento → se inativo 7d adicionais: cold-lead → se inativo 30d: exclusão da lista |

---

## Checklist de Conteúdo — Referências de skills DP

| Conteúdo a criar | Skill DP |
|-----------------|----------|
| Páginas de captura + vendas | \`dp-landing-page\` |
| Sequências de email (nutrição + pós-compra) | \`dp-email-sequence\` |
| Captions Instagram | \`dp-social-caption\` |
| Media plan de lançamento | \`dp-mediaplan\` |
| Artigos de blog SEO (20) | \`dp-blog-article\` + \`dp-blog-strategy\` |
| Anúncios Meta + Google | \`dp-ad-angles-meta\` + \`dp-ad-angles-google\` |
| Revisão de copy | \`dp-copy-review\` |
| Análise de concorrência | \`dp-competitor-analysis\` |

**Timeline**: S1 landing pages + lead magnet → S2 emails + página de vendas → S3 testes → S4 lançamento social → S5-S8 blog SEO → S8+ anúncios + coaching`,
};

export default skill;
