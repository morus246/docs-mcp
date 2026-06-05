import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-upsell-strategy",
  categoria: "Venda e Monetização",
  descricao: "Cria uma estratégia de upsell completa em torno do produto principal: escada de valor (gratuito → premium), order bumps, upsells pós-compra, downsells, cross-sells, sequências de email de ascensão. Calcula o LTV (lifetime value) por cliente e otimiza a receita por transação. Gatilhos: upsell, cross-sell, order bump, downsell, escada de valor, value ladder, aumentar ticket, LTV, lifetime value, maximizar receita.",
  argumentHint: "[produto principal] [preço] [--full para estratégia completa com copies]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Upsell Strategy — Maximizar a Receita por Cliente

<!-- v2.0.0 | 2026-04-18 | Criação: escada de valor, order bump, upsell/downsell, LTV, sequências de ascensão, copies completas -->

Um cliente a R$ 197 pode se tornar um cliente a R$ 2.000+ com a estratégia certa. Este skill concebe todo o percurso de monetização em torno do seu produto principal — da entrada gratuita até a oferta premium — com as copies, os timings e os cálculos de rentabilidade.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-upsell-strategy\` | Estratégia completa guiada (escada + copies + cálculos) |
| \`/dp-upsell-strategy express\` | Versão rápida — escada de valor + cálculo LTV apenas |
| \`/dp-upsell-strategy bump [produto]\` | Conceber apenas o order bump para um produto |
| \`/dp-upsell-strategy email [produto]\` | Sequência de email de ascensão apenas |
| \`/dp-upsell-strategy ltv\` | Calcular o LTV atual e identificar os alavancadores |

## Formato do Entregável

\`\`\`
ENTREGÁVEL: upsell-strategy/strategy-[slug].md

├── Escada de valor completa (4-6 níveis)
│   ├── Cada nível: produto, preço, formato, promessa, margem
│   └── Lógica de progressão (por que este produto DEPOIS daquele)
│
├── Order Bump
│   ├── Produto recomendado + preço + copy completa
│   └── Design do checkbox (HTML + texto)
│
├── Upsell Pós-Compra (1-click)
│   ├── Produto + preço + copy da página upsell
│   └── Timing (imediatamente após / 24h / 7 dias)
│
├── Downsell (se recusa do upsell)
│   ├── Oferta alternativa + preço reduzido + copy
│   └── Lógica: "Não pronto para X? Aqui está Y pela metade do preço"
│
├── Cross-Sell
│   ├── Produtos complementares (não concorrentes)
│   └── Quando e como propô-los
│
├── Sequência de Email de Ascensão (5-7 emails)
│   ├── Cada email: timing, assunto, body, CTA
│   └── Lógica de progressão para o próximo nível
│
├── Cálculos LTV
│   ├── Receita média por cliente (sem upsell vs. com)
│   ├── Take rate estimado por oferta
│   └── Impacto no orçamento de aquisição (CPA máx)
│
└── Plano de implementação
    ├── Ferramentas necessárias
    ├── Ordem de implementação
    └── Timeline recomendada
\`\`\`

---

## Processo

\`\`\`
1. Context intake         → Produto principal, preço, audiência, stack
2. Ler contexto           → business-profile.md, produtos existentes, funil existente
3. Analisar a posição     → Onde o usuário está na sua monetização
4. Conceber a escada      → 4-6 níveis de valor coerentes
5. Criar o order bump     → Produto + copy + design
6. Criar o upsell         → Oferta pós-compra + página + timing
7. Criar o downsell       → Alternativa se recusa
8. Criar os cross-sells   → Produtos complementares
9. Sequência de ascensão  → Emails que fazem subir na escada
10. Calcular o LTV        → Impacto financeiro em números
11. Plano de implementação → O que implementar, em que ordem
12. Entregar              → Relatório + copies + cálculos
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório)

### 1a. Carregar o contexto do projeto (silencioso)

\`\`\`
SE business-profile.md existe:
  → Ler: nome do negócio, produto principal (nome, preço, formato),
    outros produtos, audiência, nicho, stack técnico (plataforma de venda, email)
  → Pré-preencher a análise — NÃO repetir essas perguntas

SE um funil existe (funnel/sales-funnel-*.md):
  → Ler: arquitetura atual, etapas, produtos no funil
  → Identificar os buracos na escada de valor

SE sequências de email existem (emails/):
  → Ler: tipos de sequências já criadas
  → Não recriar o que já existe

SENÃO:
  → Fazer todas as perguntas
\`\`\`

### 1b. Perguntas por blocos

#### Bloco 1 — Seu produto principal

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | **Qual é o seu produto principal?** Nome, formato (ebook, curso, coaching), preço. | Centro da escada de valor |
| Q2 | **Quantas vendas por mês?** (mesmo aproximado: 0, 5, 20, 100+) | Determina a maturidade e as prioridades |
| Q3 | **Qual é o seu ticket médio atual?** (= preço do produto se apenas um) | Baseline para medir a melhoria |

**Após as respostas**: "Seu produto principal é [X] a [preço], com aproximadamente [N] vendas/mês. Seu ticket médio é [Y R$]. Vamos trabalhar para aumentar isso."

#### Bloco 2 — Seu ecossistema atual

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | **Você tem outros produtos ou serviços?** (mesmo em projeto) Liste-os com os preços. | Construir sobre o existente |
| Q5 | **Você tem um lead magnet gratuito?** Se sim, qual é? | Entrada da escada |
| Q6 | **Você oferece coaching, consultoria ou serviço 1:1?** Se sim, a qual preço? | Topo da escada |

#### Bloco 3 — Suas capacidades

| # | Pergunta | Por que |
|---|----------|---------|
| Q7 | **Qual plataforma de venda?** (Hotmart, Kiwify, Eduzz, Shopify, Systeme.io) | Determina o que é tecnicamente possível (order bump, upsell 1-click) |
| Q8 | **Qual ferramenta de email?** (Brevo, RD Station, MailerLite, ActiveCampaign) | Para as sequências de ascensão e o tagging |
| Q9 | **Quanto tempo você pode investir para criar os produtos faltantes?** (1 semana / 1 mês / tenho tempo) | Priorização realista |

---

## Etapa 2 — Analisar a Posição Atual

### Diagnóstico rápido

\`\`\`
DIAGNÓSTICO — MONETIZAÇÃO ATUAL
═════════════════════════════════

Produto principal      : [nome] — [preço]
Vendas/mês             : [N]
Ticket médio           : [X R$]
Receita mensal estimada: [X R$]
LTV atual (sem upsell) : [≈ preço do produto]

Outros produtos        : [lista ou "nenhum"]
Lead magnet            : [sim/não — qual]
Oferta premium         : [sim/não — qual]

LACUNAS IDENTIFICADAS:
  [✅/❌] Lead magnet gratuito (entrada do funil)
  [✅/❌] Order bump no checkout (ticket +)
  [✅/❌] Upsell pós-compra (próximo nível)
  [✅/❌] Downsell se recusa (recuperar os hesitantes)
  [✅/❌] Cross-sell (produtos complementares)
  [✅/❌] Oferta premium/high-ticket (maximizar os melhores clientes)
  [✅/❌] Sequência de email de ascensão (automatizar a subida)

POTENCIAL DE MELHORIA:
  Ticket médio atual : [X R$]
  Ticket médio alvo  : [X R$] (+[Y%])
  LTV atual          : [X R$]
  LTV alvo           : [X R$] (+[Y%])
\`\`\`

---

## Etapa 3 — Conceber a Escada de Valor

### Princípio fundamental

\`\`\`
A escada de valor = cada etapa resolve um problema MAIS PROFUNDO
                    e exige um engajamento MAIS FORTE.

O cliente sobe naturalmente quando:
  1. Obteve um resultado no nível anterior ✓
  2. Quer ir mais longe ✓
  3. A próxima oferta é a continuação lógica ✓
  4. O preço é proporcional ao valor ✓
\`\`\`

### Estrutura da escada (6 níveis)

\`\`\`
ESCADA DE VALOR — [Nome do Negócio]
════════════════════════════════════

NÍVEL 0 — GRATUITO (Lead Magnet)
  ┌─────────────────────────────────────────┐
  │ Produto   : [Lead magnet]               │
  │ Preço     : Gratuito                    │
  │ Formato   : [PDF / Checklist / Quiz]    │
  │ Promessa  : [Quick win em 15 min]       │
  │ Objetivo  : Capturar o email            │
  │ Transição : → "Quer o sistema          │
  │              completo? Aqui está [Prod]"│
  │ Skill DP  : /dp-lead-magnet-create      │
  └─────────────────────────────────────────┘
          │
          ▼ Sequência de email de boas-vindas (D1-D7)

NÍVEL 1 — PRODUTO DE ENTRADA (Order Bump)
  ┌─────────────────────────────────────────┐
  │ Produto   : [Pequeno produto]           │
  │ Preço     : [R$ 27-97]                 │
  │ Formato   : [Pack de templates /        │
  │              Checklist]                 │
  │ Promessa  : [Acelerador do produto      │
  │              principal]                 │
  │ Momento   : No checkout (checkbox)      │
  │ Take rate : 25-40% dos compradores      │
  └─────────────────────────────────────────┘
          │
          ▼ Compra do produto principal

NÍVEL 2 — PRODUTO PRINCIPAL ← SEU PRODUTO ATUAL
  ┌─────────────────────────────────────────┐
  │ Produto   : [Nome do produto principal] │
  │ Preço     : [Preço atual]              │
  │ Formato   : [Ebook / Playbook / Curso]  │
  │ Promessa  : [Resultado principal]       │
  │ É aqui    : O coração do seu negócio   │
  └─────────────────────────────────────────┘
          │
          ▼ Página upsell (imediatamente após a compra)

NÍVEL 3 — UPSELL (Oferta Premium)
  ┌─────────────────────────────────────────┐
  │ Produto   : [Produto avançado]          │
  │ Preço     : [2-5× o produto principal] │
  │ Formato   : [Curso em vídeo / Workshop /│
  │              Pack avançado]             │
  │ Promessa  : [Ir mais longe, mais rápido]│
  │ Momento   : Imediatamente pós-compra    │
  │ Take rate : 10-20% dos compradores      │
  │ SE RECUSA : → Downsell (Nível 3b)      │
  └─────────────────────────────────────────┘
          │
          ├── SE RECUSA ──▶ NÍVEL 3b — DOWNSELL
          │   ┌────────────────────────────────┐
          │   │ Produto : [Versão reduzida]    │
          │   │ Preço   : [50% do Nível 3]    │
          │   │ Formato : [Mini-curso / Pack]  │
          │   │ Mensagem: "Não pronto para [X]?│
          │   │  Aqui está [Y] para começar." │
          │   │ Take rate: 15-25% das recusas  │
          │   └────────────────────────────────┘
          │
          ▼ Sequência de email de ascensão (D+7 a D+30)

NÍVEL 4 — HIGH-TICKET
  ┌─────────────────────────────────────────┐
  │ Produto   : [Coaching / Programa /      │
  │              Mastermind]                │
  │ Preço     : [10-20× o produto          │
  │              principal]                │
  │ Formato   : [Coaching 1:1 / Grupo /    │
  │              Done-for-you]             │
  │ Promessa  : [Resultado garantido com    │
  │              acompanhamento]            │
  │ Momento   : Email D+14 a D+30          │
  │ Take rate : 2-5% dos compradores        │
  │ Qualificação: Chamada de descoberta     │
  └─────────────────────────────────────────┘
          │
          ▼ Clientes satisfeitos

NÍVEL 5 — RECORRÊNCIA / COMUNIDADE
  ┌─────────────────────────────────────────┐
  │ Produto   : [Membership / Comunidade /  │
  │              Assinatura]               │
  │ Preço     : [R$ 67-350/mês]           │
  │ Formato   : [Comunidade privada /       │
  │              Acesso conteúdo mensal /   │
  │              Q&A]                       │
  │ Promessa  : [Suporte contínuo +         │
  │              atualizações + comunidade] │
  │ Momento   : Email D+30+                │
  │ Take rate : 5-10% dos compradores       │
  └─────────────────────────────────────────┘
\`\`\`

### Regras de design da escada

| Regra | Detalhe |
|-------|---------|
| Cada nível é a CONTINUAÇÃO LÓGICA do anterior | Não um produto aleatório — o cliente deve pensar "é exatamente o que preciso agora" |
| O preço sobe EM DEGRAUS | ×2 a ×5 entre cada nível, nunca ×20 de uma vez |
| O formato muda com o preço | Ebook → Curso em vídeo → Coaching. Quanto mais sobe o preço, mais personalizado |
| O lead magnet é uma AMOSTRA do produto principal | Não um assunto diferente — um aperitivo do que contém o produto |
| O order bump ACELERA o produto principal | Templates, scripts, checklists que tornam o produto principal mais eficaz |
| O upsell APROFUNDA | Mesmo assunto mas nível superior, ou acompanhamento |
| O downsell SIMPLIFICA | Versão reduzida, preço menor, sem compromisso |

### Pedir validação

"Aqui está a escada de valor proposta. Corresponde à sua visão? Quer ajustar algum nível?"

**Hard gate**: Validar antes de passar para as copies.

---

## Etapa 4 — Order Bump (copy + design)

### Concepção

\`\`\`
ORDER BUMP — [Nome do produto bump]
════════════════════════════════════

Preço: [X R$] (adicionado ao carrinho, não separado)
Formato: [Pack de templates / Checklist avançada / Recurso complementar]
\`\`\`

### Copy do checkbox

\`\`\`
╔══════════════════════════════════════════════════════╗
║ ☐  SIM, ADICIONAR [Nome do bump] — [preço]           ║
║                                                      ║
║  [1 frase de gancho que descreve o benefício]        ║
║                                                      ║
║  [2-3 bullet points do que está incluído]            ║
║  • [Item 1 — resultado concreto]                     ║
║  • [Item 2 — ganho de tempo]                         ║
║  • [Item 3 — bônus exclusivo]                        ║
║                                                      ║
║  Oferta exclusiva para compradores — não disponível  ║
║  depois.                                             ║
╚══════════════════════════════════════════════════════╝
\`\`\`

### Regras do order bump

| Regra | Por que |
|-------|---------|
| Preço = 30-60% do produto principal | Se o produto é R$ 197, o bump é R$ 60-120 |
| 1 única frase de gancho | Sem parágrafo — é uma decisão em 3 segundos |
| 3 bullet points no máximo | O cliente já está pagando, não é hora de ler |
| Escassez real | "Exclusivo para compradores" — sem falso countdown |
| O bump COMPLEMENTA, não SUBSTITUI | Torna o produto principal melhor, não opcional |

---

## Etapa 5 — Upsell Pós-Compra

### Página de upsell (exibida imediatamente após a compra)

\`\`\`
PÁGINA DE UPSELL — [Nome da oferta upsell]
══════════════════════════════════════════

TIMING: Imediatamente após o pagamento (antes da thank you page)
        OU email D+1 (se a plataforma não suportar o upsell 1-click)

PREÇO: [X R$] (ou [X R$/mês] se recorrente)
\`\`\`

### Copy da página de upsell

\`\`\`
[HEADLINE]
Você acabou de comprar [Produto Principal]. Parabéns — você está entre os [X%] que agem.

Mas vamos ser honestos: [Produto Principal] te dá o SISTEMA.
O que ainda te falta é [o próximo problema].

[SEÇÃO — O QUE VOCÊ OBTÉM]

Com [Nome Upsell], você obtém:

• [Benefício 1 — resultado concreto] → [por que é importante]
• [Benefício 2 — ganho de tempo] → "[com o playbook sozinho, leva X. Com isso, Y]"
• [Benefício 3 — exclusividade] → [o que não está no produto principal]
• [Benefício 4 — suporte] → [acesso a você, comunidade, Q&A]

[SEÇÃO — PROVA]

[Depoimento ou resultado concreto de alguém que combinou os dois]
"[Citação]" — [Nome], [Resultado]

[SEÇÃO — OFERTA]

Preço normal: [preço riscado]
Seu preço hoje (comprador de [Produto]): [preço reduzido]

Esta oferta é exclusiva para compradores de [Produto].
Ela não estará mais disponível após esta página.

[CTA — BOTÃO]
"Sim, adiciono [Nome Upsell] por [preço]"

[LINK DE RECUSA]
"Não, obrigado, continuo com [Produto] apenas" → redireciona para thank you page
\`\`\`

### Timings recomendados por tipo

| Tipo de upsell | Quando propor | Take rate médio |
|----------------|--------------|-----------------|
| Página 1-click pós-compra | Imediatamente após pagamento | 10-20% |
| Email D+1 | No dia seguinte (após onboarding) | 5-10% |
| Email D+7 | Após primeiros resultados | 8-15% |
| Email D+14 | Após engajamento comprovado | 5-10% |
| Chamada de descoberta (high-ticket) | D+14 a D+30 | 2-5% |

---

## Etapa 6 — Downsell (se recusa do upsell)

### Lógica do downsell

\`\`\`
O cliente disse NÃO ao upsell.
NÃO insistir. Propor uma ALTERNATIVA mais acessível.

REGRA: O downsell é 40-60% do preço do upsell.
       Oferece MENOS, mas ainda é útil sozinho.
\`\`\`

### Copy do downsell

\`\`\`
[HEADLINE]
Sem problema — [Produto Upsell] talvez não seja para você agora.

Mas antes de continuar, tenho outra opção:

[Nome Downsell] — apenas [preço reduzido]

É [descrição em 1 frase — versão simplificada do upsell].

Você obtém:
• [Item 1 — o mais importante do upsell]
• [Item 2 — a parte mais acionável]
(Sem [Item 3 e 4 que estavam no upsell])

É um investimento de [preço] para [resultado].

[CTA]
"Sim, adiciono [Downsell] por [preço]"

[LINK DE RECUSA]
"Não, obrigado, continuo sem" → thank you page
\`\`\`

---

## Etapa 7 — Cross-Sells

### Produtos complementares (não concorrem com o produto principal)

\`\`\`
CROSS-SELLS RECOMENDADOS
════════════════════════

CROSS-SELL 1:
  Produto   : [Produto complementar]
  Preço     : [preço]
  Relação   : "[Produto Principal] te ensina O QUE fazer. [Cross-sell] te ajuda a fazer MAIS RÁPIDO."
  Momento   : Email pós-compra D+3 ou D+5
  Copy      : "Você está avançando bem com [Produto]. Para ir ainda mais longe, [Cross-sell] é ideal."

CROSS-SELL 2:
  Produto   : [Ferramenta / Template / Recurso]
  Preço     : [preço]
  Relação   : "[Produto Principal] dá o método. [Cross-sell] dá as ferramentas."
  Momento   : No produto ou email D+7

CROSS-SELL 3:
  Produto   : [Produto de um parceiro — afiliação]
  Preço     : [preço]
  Comissão  : [30-50%]
  Relação   : "Para [assunto conexo], eu recomendo [Parceiro]."
  Momento   : Email D+14 ou nos anexos do playbook
\`\`\`

### Regra absoluta do cross-sell

| Fazer | NÃO fazer |
|-------|-----------|
| Complementar o produto principal | Concorrer com seu próprio produto |
| Propor no momento certo (após resultados) | Propor imediatamente (muito cedo) |
| Dar uma razão específica | "Você também pode gostar de..." (vago demais) |
| Limitar a 2-3 cross-sells no máximo | Bombardear com 10 ofertas |

### Cross-Sell Afiliado — Monetizar sem criar produto

O cross-sell afiliado é uma alavanca poderosa: você recomenda uma ferramenta ou produto de um parceiro via seu link de afiliado e recebe uma comissão sobre cada venda — sem criar nada.

#### Como escolher um produto afiliado

| Critério | Limiar | Por que |
|----------|--------|---------|
| Relevância para sua audiência | O cliente PRECISA disso para aplicar seu produto | Senão é spam, não recomendação |
| Você mesmo usou | Sim, obrigatório | Você recomenda apenas o que conhece. Sua credibilidade depende disso. |
| Comissão | ≥ 20% (único) ou ≥ 15% (recorrente/mês) | Abaixo disso, não vale o esforço |
| Página de vendas do parceiro | Profissional, que converte bem | Se a página dele é ruim, você perde comissões E credibilidade |
| Suporte ao cliente do parceiro | Bom | Se o cliente tiver um problema, ele vai reclamar com VOCÊ |
| Duração do cookie | ≥ 30 dias | O cliente nem sempre compra imediatamente |

#### Tipos de produtos afiliados por nicho

| Tipo | Exemplos | Comissão típica | Receita média/cliente |
|------|----------|-----------------|----------------------|
| Ferramentas SaaS (recorrente) | Brevo, Systeme.io, Canva Pro, Notion | 20-30% recorrente/mês | R$ 10-40/mês passivo |
| Cursos online | Curso complementar de um parceiro | 30-50% único | R$ 60-200 por venda |
| Livros / Ebooks | Amazon, Hotmart de um parceiro | 4-50% conforme plataforma | R$ 8-60 por venda |
| Equipamento / Material | Amazon, lojas especializadas | 3-10% | R$ 8-80 por venda |
| Serviços (hospedagem, design) | Hospedeiros, freelancers, agências | R$ 200-800 flat ou 20-30% | R$ 80-400 por indicação |

#### Onde colocar os links de afiliado

\`\`\`
POSICIONAMENTOS RECOMENDADOS (por eficácia decrescente)
═══════════════════════════════════════════════════════

1. NO EBOOK — Seção "Ferramentas recomendadas" ou Anexos
   Posicionamento : bloco tools ou anexo "Recursos"
   Exemplo        : "Para criar sua landing page, eu uso o Systeme.io [link afiliado].
                    É a ferramenta que recomendo para coaches que estão começando."
   Disclosure     : Adicionar ao final da seção: "Este link é um link de afiliado.
                    Se você se inscrever via este link, recebo uma comissão —
                    sem custo adicional para você. Só recomendo ferramentas que uso."
   Eficácia       : ★★★★★ (o leitor está engajado e aplicando)

2. NA THANK YOU PAGE — Seção "Ferramentas para começar"
   Posicionamento : Após a mensagem de agradecimento, antes do footer
   Exemplo        : "Para aplicar o Playbook, você vai precisar de:
                    ☐ Uma ferramenta de email → Recomendo Brevo [link]
                    ☐ Uma ferramenta de design → Canva Pro [link]"
   Eficácia       : ★★★★☆ (o cliente acabou de pagar, está em modo ação)

3. NOS EMAILS PÓS-COMPRA — Email D+3 ou D+5
   Posicionamento : Email dedicado "As ferramentas que uso" ou P.S. em email de conteúdo
   Exemplo        : "P.S. — Você sempre me pergunta qual ferramenta uso para [X].
                    É [Ferramenta] — aqui está meu link [link afiliado]. Você tem 30 dias
                    de teste gratuito."
   Eficácia       : ★★★★☆ (contextualizado, não agressivo)

4. NOS ARTIGOS DE BLOG — Recomendações contextuais
   Posicionamento : Em um artigo onde a ferramenta é mencionada naturalmente
   Exemplo        : "Para esta etapa, você pode usar [Ferramenta] [link afiliado]
                    (é o que eu uso há 3 anos)."
   Eficácia       : ★★★☆☆ (tráfego frio, conversão menor)

5. EM UMA PÁGINA DE RECURSOS DEDICADA — /ferramentas ou /recursos
   Posicionamento : Página standalone listando todas suas ferramentas recomendadas
   Exemplo        : Página com 5-10 ferramentas, cada uma com: nome, descrição, por que
                    você usa, link afiliado, alternativa gratuita
   Eficácia       : ★★★☆☆ (SEO a longo prazo, conversão moderada)
\`\`\`

#### Disclosure legal (OBRIGATÓRIO)

\`\`\`
REGRAS DE DISCLOSURE
═════════════════════

LGPD / Código de Defesa do Consumidor:
Você DEVE informar o leitor que o link é um link de afiliado.

ONDE:
  - Ao lado do link (mesmo parágrafo) OU
  - Em nota de rodapé da seção OU
  - No footer do email

FORMULAÇÕES ACEITAS:
  PT: "Este link é um link de afiliado. Recebo uma comissão se você
       se inscrever via este link, sem custo adicional para você."
  PT curto: "(link afiliado)"
  EN: "This is an affiliate link. I earn a commission if you sign up
       through this link, at no extra cost to you."
  EN curto: "(affiliate link)"

FORMULAÇÕES PROIBIDAS:
  ❌ Nenhuma menção (ilegal)
  ❌ Link escondido atrás de encurtador sem disclosure
  ❌ "Não ganho nada com este link" (mentira)
\`\`\`

#### Rastreamento dos links de afiliado

\`\`\`
ESTRUTURA DE URL RECOMENDADA
════════════════════════════

[URL_PARCEIRO]?ref=[seu_id]&utm_source=[fonte]&utm_medium=affiliate&utm_campaign=[produto]

Exemplos:
  No ebook      : ?ref=academiaFitPro&utm_source=playbook&utm_medium=affiliate&utm_campaign=ferramentas
  Thank you page: ?ref=academiaFitPro&utm_source=thankyou&utm_medium=affiliate&utm_campaign=ferramentas
  Email D+3     : ?ref=academiaFitPro&utm_source=email&utm_medium=affiliate&utm_campaign=pos-compra
  Blog          : ?ref=academiaFitPro&utm_source=blog&utm_medium=affiliate&utm_campaign=[slug-artigo]
  Página recursos: ?ref=academiaFitPro&utm_source=recursos&utm_medium=affiliate&utm_campaign=ferramentas

→ Você saberá EXATAMENTE de onde vêm suas comissões.
\`\`\`

#### Impacto no LTV

\`\`\`
SIMULAÇÃO DE RECEITA AFILIADA
══════════════════════════════

Exemplo: Você recomenda Brevo (comissão recorrente 30%)

  Preço Brevo            : R$ 100/mês
  Sua comissão           : R$ 30/mês por inscrição
  Take rate estimado     : 12% dos seus compradores se inscrevem
  Duração média do cliente: 8 meses

  Receita por cliente afiliado: R$ 30 × 8 meses = R$ 240
  Ponderado por take rate      : R$ 240 × 12% = R$ 28,80/cliente

  → +R$ 28,80 de LTV por cliente, SEM criar produto.
  → Com 100 clientes/mês = R$ 2.880/mês em receita passiva afiliada.
\`\`\`

---

## Etapa 8 — Sequência de Email de Ascensão

### Objetivo

Fazer o cliente subir na escada de valor de maneira natural, baseada no seu engajamento e resultados.

### Sequência (7 emails, D+7 a D+30)

\`\`\`
SEQUÊNCIA DE ASCENSÃO — [Nome do Negócio]
══════════════════════════════════════════

Pré-requisito: O cliente comprou [Produto Principal].
               A sequência pós-compra (onboarding) terminou (D+1 a D+5).
               Esta sequência começa em D+7.

EMAIL 1 — D+7: Check-in + Quick Win
  Assunto A: "Como você está com [Produto]?"
  Assunto B: "Sua primeira semana — feedback?"
  Body    : Perguntar como está indo. Compartilhar uma dica bônus
            não contida no playbook. Mostrar que você se importa.
  CTA     : "Responda a este email — leio tudo."
  Objetivo: Engajamento + identificar os clientes ativos

EMAIL 2 — D+10: Depoimento + Prova
  Assunto A: "[Nome] fechou [N] clientes em [tempo] com [Produto]"
  Assunto B: "O que os melhores fazem diferente"
  Body    : Compartilhar um caso de cliente. Mostrar o resultado obtido
            com [Produto]. Teaser sutil: "ele depois entrou em
            [Oferta Premium] para ir ainda mais longe."
  CTA     : Link para o depoimento completo
  Objetivo: Prova social + plantar a semente do upsell

EMAIL 3 — D+14: Identificar o teto
  Assunto A: "Você provavelmente chegou a este ponto"
  Assunto B: "O muro que 80% dos [audiência] encontram nesta fase"
  Body    : Nomear o PRÓXIMO problema que o cliente vai encontrar
            (o que o upsell resolve). Sem pitch — apenas nomear.
            "Se você está aqui, é normal. Veja por que."
  CTA     : "Você se reconhece? Responda sim."
  Objetivo: Qualificação — os "sim" recebem o email 4 em prioridade

EMAIL 4 — D+17: A solução (soft pitch)
  Assunto A: "Como superar o teto de [problema]"
  Assunto B: "A próxima etapa (se você estiver pronto)"
  Body    : Apresentar [Oferta Premium] como a continuação lógica.
            Não um pitch agressivo — uma proposta. "Criei
            [Oferta] exatamente para este momento. Aqui está o que é."
            Detalhar 3-4 benefícios.
  CTA     : Link para a página da oferta ou formulário de interesse
  Objetivo: Conversão suave

EMAIL 5 — D+21: Objeções
  Assunto A: "Os 3 motivos para NÃO entrar em [Oferta Premium]"
  Assunto B: "Talvez não seja para você (e tudo bem)"
  Body    : Listar honestamente os 3 motivos para NÃO comprar.
            Então, para cada motivo, explicar por que talvez não se
            aplique a eles. Anti-manipulação:
            honestidade → confiança → conversão.
  CTA     : Link para a oferta + "Se tiver dúvidas, responda."
  Objetivo: Superar objeções com honestidade

EMAIL 6 — D+25: Urgência (real)
  Assunto A: "[Oferta] — as inscrições fecham em [data]"
  Assunto B: "Última janela para [Oferta Premium]"
  Body    : Se urgência real (vagas limitadas, coorte, preço early).
            SE NÃO HÁ urgência real: NÃO inventar falsa urgência.
            Em vez disso: "Queria te lembrar que [Oferta] existe.
            Veja o que os primeiros participantes obtiveram."
  CTA     : Link direto para a oferta
  Objetivo: Conversão com urgência honesta

EMAIL 7 — D+30: Fechamento suave + porta aberta
  Assunto A: "Última coisa sobre [Oferta Premium]"
  Assunto B: "Falamos quando você estiver pronto"
  Body    : Sem pressão. "Não vou mais falar sobre isso.
            Se for o momento certo, [link]. Senão, continuo
            te enviando conteúdo gratuito. Sem mágoa."
  CTA     : Link para a oferta (última vez)
  Objetivo: Fechar com elegância — sem spam pós-sequência
\`\`\`

### Tags e automações (Brevo / RD Station / MailerLite)

\`\`\`
AUTOMAÇÕES
═══════════

Compra [Produto Principal]:
  → Tag: "buyer-[product-slug]"
  → Aciona: sequência onboarding (D+1 a D+5)
  → Depois: sequência de ascensão (D+7 a D+30)

Compra [Order Bump]:
  → Tag: "bump-[product-slug]"
  → Nota: cliente engajado → candidato prioritário para upsell

Compra [Upsell]:
  → Tag: "premium-[product-slug]"
  → Remover da sequência de ascensão
  → Aciona: sequência onboarding premium

Recusa [Upsell] + Compra [Downsell]:
  → Tag: "downsell-[product-slug]"
  → Continuar a sequência de ascensão (ainda podem fazer upgrade)

Clique "sim me reconheço" (Email 3):
  → Tag: "qualified-for-upsell"
  → Enviar Email 4 imediatamente (não esperar D+17)

Sem compra após D+30:
  → Tag: "nurture-only"
  → Mudar para a sequência de conteúdo gratuito (blog, dicas)
  → Repropostar a oferta em 60-90 dias
\`\`\`

---

## Etapa 9 — Cálculo do LTV (Lifetime Value)

### Fórmula

\`\`\`
LTV = Preço Produto × 1
    + (Preço Bump × Taxa Bump)
    + (Preço Upsell × Taxa Upsell)
    + (Preço Downsell × Taxa Downsell × Taxa Recusa Upsell)
    + (Preço Cross-sell × Taxa Cross-sell)
    + (Preço High-Ticket × Taxa High-Ticket)
\`\`\`

### Tabela de cálculo

\`\`\`
CÁLCULO LTV — [Nome do Negócio]
════════════════════════════════

                              Preço    Take Rate    Receita/cliente
Produto Principal            [X R$]      100%         [X R$]
Order Bump                   [X R$]      [30%]        [X R$]
Upsell                       [X R$]      [15%]        [X R$]
Downsell (se recusa)         [X R$]      [20%×85%]    [X R$]
Cross-sell 1                 [X R$]      [10%]        [X R$]
High-Ticket                  [X R$]      [3%]         [X R$]
                              ──────────────────────────────────
LTV POR CLIENTE                                       [TOTAL R$]

COMPARAÇÃO:
  ANTES (sem upsell): [preço do produto] R$ por cliente
  DEPOIS (com escada): [LTV] R$ por cliente
  AUMENTO            : +[X%]

IMPACTO NA AQUISIÇÃO:
  Antes: CPA máx = [preço produto × margem] R$
  Depois: CPA máx = [LTV × margem] R$
  → Você pode gastar [X R$] A MAIS por cliente em anúncios
    e continuar lucrativo.
\`\`\`

### Benchmarks de take rate por nicho

| Oferta | Take Rate Pessimista | Realista | Otimista |
|--------|---------------------|----------|----------|
| Order Bump | 20% | 30% | 45% |
| Upsell 1-click | 8% | 15% | 25% |
| Downsell (entre as recusas) | 10% | 20% | 30% |
| Cross-sell email | 5% | 10% | 15% |
| High-ticket (chamada) | 1% | 3% | 5% |
| Membership mensal | 3% | 7% | 12% |

---

## Etapa 10 — Plano de Implementação

\`\`\`
PLANO DE IMPLEMENTAÇÃO
═══════════════════════

FASE 1 — Quick Wins (Semana 1)
  [ ] Criar o order bump → /dp-lead-magnet-create ou /dp-playbook-create
  [ ] Configurar o checkbox do order bump na [plataforma]
  [ ] Redigir a copy do checkbox (3 bullet points)
  Impacto estimado: +[X R$]/mês

FASE 2 — Upsell (Semana 2)
  [ ] Criar o produto upsell (ou identificar um existente)
  [ ] Criar a página upsell → /dp-landing-page
  [ ] Configurar o redirect pós-compra para a página upsell
  [ ] Criar o downsell (versão reduzida)
  Impacto estimado: +[X R$]/mês

FASE 3 — Sequência de ascensão (Semana 3)
  [ ] Redigir os 7 emails → /dp-email-sequence
  [ ] Configurar as automações e tags em [ferramenta de email]
  [ ] Testar o fluxo completo (compra → bump → upsell → emails)
  Impacto estimado: +[X R$]/mês

FASE 4 — High-Ticket (Mês 2)
  [ ] Definir a oferta high-ticket (coaching, programa, done-for-you)
  [ ] Criar a página de candidatura → /dp-landing-page
  [ ] Adicionar o pitch no email 4 da sequência
  Impacto estimado: +[X R$]/mês

TIMELINE:
  Semana 1: Order bump ativo → ticket médio +[X%]
  Semana 2: Upsell ativo → LTV +[X%]
  Semana 3: Sequência de email ativa → ascensão automática
  Mês 2   : High-ticket → os melhores clientes sobem
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | A escada de valor é uma PROGRESSÃO LÓGICA (cada nível é a continuação do anterior) | Crítico |
| QG-02 | O preço sobe EM DEGRAUS (×2 a ×5, nunca ×20 entre dois níveis) | Crítico |
| QG-03 | O order bump custa 30-60% do produto principal (nem mais, nem menos) | Alto |
| QG-04 | O upsell é proposto no MOMENTO CERTO (pós-compra imediato ou D+7, não D+0 e D+1 e D+2) | Crítico |
| QG-05 | O downsell é proposto APENAS se o upsell foi recusado (não em paralelo) | Crítico |
| QG-06 | NUNCA falsa urgência — se o prazo não é real, não inventar | Crítico |
| QG-07 | Cada oferta tem copy COMPLETA (sem placeholders [título], [preço]) | Crítico |
| QG-08 | O cálculo LTV usa take rates REALISTAS (não 50% upsell) | Alto |
| QG-09 | A sequência de email de ascensão NÃO começa antes de D+7 (deixar tempo de usar o produto) | Alto |
| QG-10 | O email 7 FECHA a sequência com respeito — sem assédio pós-sequência | Crítico |
| QG-11 | As automações e tags estão documentadas (não apenas "enviar um email") | Alto |
| QG-12 | O plano de implementação é realista em relação ao tempo disponível (Q9) | Alto |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| O usuário tem apenas um produto | Conceber a escada completa partindo desse produto. Os níveis ausentes = produtos a CRIAR. |
| O usuário não tem nenhuma venda | Priorizar o produto principal primeiro. O upsell vem APÓS as primeiras vendas (ao menos 10). |
| A plataforma não suporta upsell 1-click | Alternativa: email D+1 com oferta especial de 24h. Propor Systeme.io ou Hotmart como alternativa. |
| O usuário não quer fazer coaching/high-ticket | Não forçar. A escada pode parar no Nível 3. Propor um membership ou produtos digitais avançados. |
| O produto principal é gratuito (lead magnet) | A escada começa no Nível 0. O "produto principal" é o primeiro produto PAGO. Adaptar a escada deslocando tudo um nível. |
| O usuário já tem upsell que não converte | Diagnosticar: timing errado? preço errado? copy errada? produto errado? Propor correções específicas. |
| business-profile.md ausente | Fazer as perguntas do Bloco 1 para entender o contexto mínimo. |
| Take rate abaixo dos benchmarks | É normal no início. Propor testes A/B na copy e no timing antes de mudar a oferta. |

---

## Integração com Outros Skills

| Antes | Skill | Quando |
|-------|-------|--------|
| Produto principal criado | \`/dp-playbook-create\` | O produto deve existir |
| Perfil de negócio | \`/dp-business-profile\` | Para o contexto completo |
| Validação de mercado | \`/dp-market-research\` | Para validar o pricing e o posicionamento |
| Funil existente | \`/dp-sales-funnel\` | Para integrar no funil atual |

| Após | Skill | Quando |
|------|-------|--------|
| Criar o order bump | \`/dp-lead-magnet-create\` ou \`/dp-playbook-create\` | Se o bump é um novo produto |
| Página upsell | \`/dp-landing-page\` | Para a página da oferta premium |
| Sequência de email | \`/dp-email-sequence\` | Para a sequência de ascensão |
| Capa do produto upsell | \`/dp-ebook-cover\` | Se o upsell é um ebook/guia |
| Anúncios para o funil | \`/dp-ad-angles-meta\` | Para a aquisição em direção à escada completa |

---

# Exemplo Completo — Estratégia Upsell Academia FitPro

> **Produto principal**: O Playbook do Coach Fitness — R$ 197
> **Negócio**: Academia FitPro — Sarah Dupont
> **Audiência**: Coaches fitness iniciantes

---

## Escada de Valor

\`\`\`
NÍVEL 0 — GRATUITO
  "A Checklist do Coach Fitness — 15 Ações para Começar"
  PDF 10 páginas — Captura de email
          │
          ▼
NÍVEL 1 — ORDER BUMP: R$ 79
  "Pack 10 Scripts de Prospecção DM"
  Templates copiar e colar — No checkout
          │
          ▼
NÍVEL 2 — PRODUTO PRINCIPAL: R$ 197
  "O Playbook do Coach Fitness"
  Ebook 60+ páginas — Método completo
          │
          ▼
NÍVEL 3 — UPSELL: R$ 397
  "Acelerador Coach Fitness"
  Curso em vídeo 3h + templates avançados
          │
   ┌──────┴──────┐
   │  SE RECUSA  │
   ▼             ▼
NÍVEL 3b        NÍVEL 4 — HIGH-TICKET: R$ 1.997
DOWNSELL: R$ 197 "Coaching Individual 4 Semanas"
"Mini-curso      4 sessões 1:1 + auditoria personalizada
vídeo 1h"        Mediante candidatura (chamada de descoberta)
\`\`\`

---

## Order Bump — "Pack 10 Scripts de Prospecção DM"

### Detalhes

| Elemento | Valor |
|----------|-------|
| Preço | R$ 79 |
| Formato | PDF 15 páginas — 10 scripts prontos para copiar |
| Take rate estimado | 32% |
| Receita adicional | R$ 79 × 32% = **R$ 25,28 por cliente** |

### Copy do checkbox

\`\`\`
╔══════════════════════════════════════════════════════════╗
║ ☐  SIM, ADICIONAR O PACK 10 SCRIPTS DM — R$ 79          ║
║                                                          ║
║  As 10 mensagens exatas que uso para fechar clientes     ║
║  por DM (testadas em +300 conversas).                    ║
║                                                          ║
║  • 5 scripts de primeiro contato (frio → quente)         ║
║  • 3 scripts de retomada (quando não respondem)          ║
║  • 2 scripts de fechamento (transformar "talvez" em      ║
║    "sim")                                                ║
║                                                          ║
║  Oferta exclusiva para compradores do Playbook —         ║
║  R$ 79 em vez de R$ 120.                                 ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

## Upsell — "Acelerador Coach Fitness"

### Detalhes

| Elemento | Valor |
|----------|-------|
| Preço | R$ 397 (preço comprador — normal R$ 597) |
| Formato | 3h de curso em vídeo + 5 templates avançados + 1 plano de ação 90 dias |
| Take rate estimado | 14% |
| Receita adicional | R$ 397 × 14% = **R$ 55,58 por cliente** |
| Timing | Página imediatamente após a compra do Playbook |

### Copy da página upsell

**Headline:**
> Você acabou de comprar O Playbook do Coach Fitness. Tem o sistema. Agora, quer ir 3× mais rápido?

**Body:**
> O Playbook te dá o método. Mas vamos ser honestos — entre ler um playbook e executá-lo a fundo, existe uma lacuna. Os coaches que avançam mais rápido não são os que mais leem. São os que têm um plano de execução sólido e as ferramentas certas.
>
> O Acelerador é exatamente isso:
>
> **3 horas de vídeo** onde eu decifro cada etapa do Playbook ao vivo, com exemplos reais e demonstrações.
>
> **5 templates avançados** que você não vai encontrar no Playbook: página de preços, contrato de cliente, questionário de onboarding, modelo de plano de treino, email de boas-vindas do cliente.
>
> **Um plano de ação de 90 dias** — não "faça o que puder quando puder". Um cronograma semana a semana com objetivos quantificados.

**Prova:**
> "Comprei o Playbook E o Acelerador. Em 6 semanas, tinha 12 clientes. O plano de 90 dias tirou toda minha hesitação — sabia exatamente o que fazer cada dia." — Karim, coach fitness no Rio

**Preço:**
> Preço normal: ~~R$ 597~~
> Seu preço hoje (comprador do Playbook): **R$ 397**
>
> Esta oferta é exclusiva para compradores. Ela some quando você sair desta página.

**CTA:**
> [Sim, adiciono o Acelerador por R$ 397]

**Recusa:**
> [Não, obrigado, o Playbook me basta →]

---

## Downsell — "Mini-Curso em Vídeo: Os 3 Erros Fatais"

### Detalhes

| Elemento | Valor |
|----------|-------|
| Preço | R$ 197 (em vez de R$ 280) |
| Formato | 1h de vídeo — foco nos 3 erros que bloqueiam 90% dos coaches |
| Take rate estimado | 22% (entre os 86% que recusam o upsell) |
| Receita adicional | R$ 197 × 22% × 86% = **R$ 37,25 por cliente** |

### Copy

**Headline:**
> Não pronto para o Acelerador? Sem problema. Mas antes de continuar — uma última coisa.

**Body:**
> Os 3 erros que fazem 90% dos coaches fitness fracassarem. Em 1 hora, eu mostro exatamente quais são e como evitá-los. Sem curso de 3 horas — só o essencial.
>
> • Erro #1: O preço (você provavelmente está desvalorizando seu trabalho)
> • Erro #2: O posicionamento (você fala com todo mundo = não fala com ninguém)
> • Erro #3: O acompanhamento (você perde clientes por descuido, não por incompetência)
>
> 1 hora. R$ 197. O preço de uma sessão de coaching. Só que aqui, é o SEU negócio que se beneficia.

**CTA:**
> [Sim, quero evitar esses 3 erros — R$ 197]

**Recusa:**
> [Não, obrigado, continuo com o Playbook →]

---

## Sequência de Email de Ascensão (resumo)

| Email | Dia | Assunto | Objetivo |
|-------|-----|---------|----------|
| 1 | D+7 | "Como você está com o Playbook?" | Check-in, identificar os ativos |
| 2 | D+10 | "Karim fechou 12 clientes em 6 semanas" | Prova social, teaser Acelerador |
| 3 | D+14 | "O muro que 80% dos coaches encontram aqui" | Nomear o próximo problema |
| 4 | D+17 | "A próxima etapa (se você estiver pronto)" | Soft pitch Acelerador |
| 5 | D+21 | "3 razões para NÃO entrar no Acelerador" | Superar objeções com honestidade |
| 6 | D+25 | "Última janela — a coorte de [mês] fecha em [data]" | Urgência real (coorte) |
| 7 | D+30 | "Falamos quando você estiver pronto" | Fechamento suave, porta aberta |

---

## Cross-Sell Afiliado — Brevo

### Posicionamento no ebook (Seção "Ferramentas recomendadas")

> Para enviar seus emails de prospecção e gerenciar sua lista de clientes em potencial, eu uso o Brevo há 3 anos. É a ferramenta mais simples para um coach que está começando — sem código, sem complicação. [Cadastre-se aqui](https://brevo.com?ref=academiaFitPro) — você tem 30 dias de teste gratuito.
>
> *(Este link é um link de afiliado. Recebo uma comissão se você se cadastrar via este link, sem custo adicional para você.)*

### Posicionamento no email D+3

> **P.S.** — Você sempre me pergunta qual ferramenta uso para os emails. É o Brevo — simples, confiável e gratuito até 300 emails/dia. [Teste aqui](https://brevo.com?ref=academiaFitPro&utm_source=email&utm_medium=affiliate&utm_campaign=pos-compra). *(link afiliado)*

### Receitas estimadas

\`\`\`
Brevo: R$ 100/mês × 30% comissão = R$ 30/mês por inscrição
Take rate : 12% dos compradores do Playbook
Duração   : 8 meses em média
Receita/cliente: R$ 30 × 8 × 12% = R$ 28,80
\`\`\`

---

## Cálculo LTV (atualizado com afiliação)

\`\`\`
                                    Preço    Take Rate    Receita/cliente
Playbook (produto principal)        R$ 197    100%         R$ 197,00
Order Bump (Scripts DM)             R$ 79     32%          R$ 25,28
Upsell (Acelerador)                 R$ 397    14%          R$ 55,58
Downsell (Mini-curso)               R$ 197  22%×86%        R$ 37,25
Cross-sell (Templates Canva)        R$ 79     8%           R$ 6,32
Afiliado (Brevo recorrente)          —        12%          R$ 28,80
High-ticket (Coaching 1:1)          R$ 1.997  3%           R$ 59,91
                                    ─────────────────────────────────
LTV POR CLIENTE                                            R$ 410,14

COMPARAÇÃO:
  ANTES (Playbook apenas)   : R$ 197,00 por cliente
  DEPOIS (escada completa)  : R$ 410,14 por cliente
  AUMENTO                   : +108% (+R$ 213,14)

DO QUAL RECEITA PASSIVA AFILIADA:
  100 clientes/mês × R$ 28,80 = R$ 2.880/mês em comissões recorrentes
  Sem criar produto. Sem suporte. Passivo.

IMPACTO NA AQUISIÇÃO:
  Antes: CPA máx = R$ 99 (margem 50% sobre R$ 197)
  Depois: CPA máx = R$ 205 (margem 50% sobre R$ 410,14)
  → Você pode gastar 2,1× MAIS em anúncios por cliente e continuar lucrativo.
\`\`\`

---

## Plano de Implementação

\`\`\`
SEMANA 1:
  [x] Criar o Pack 10 Scripts DM (order bump) → 4h
  [x] Configurar o checkbox no Hotmart → 30 min
  → Impacto imediato: +R$ 25,28/cliente

SEMANA 2:
  [x] Criar a página upsell Acelerador → 2h
  [x] Criar a página downsell Mini-curso → 1h
  [x] Configurar o redirect pós-compra → 30 min
  → Impacto: +R$ 92,83/cliente

SEMANA 3:
  [x] Redigir os 7 emails de ascensão → 3h
  [x] Configurar as automações Brevo → 1h
  [x] Testar o fluxo completo → 1h
  → Impacto: conversões automatizadas

MÊS 2:
  [x] Lançar a oferta Coaching 1:1 (chamada de descoberta) → 2h
  [x] Criar a página de candidatura → 1h
  → Impacto: +R$ 59,91/cliente (os melhores clientes)

TEMPO TOTAL: ~16 horas
RECEITA ADICIONAL: +R$ 213,14 por cliente (+108%)
\`\`\``,
};

export default skill;
