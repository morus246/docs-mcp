import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-launch",
  categoria: "Fundação",
  descricao: "Orquestrador de lançamento de produto digital. Guia o usuário pelas 12 etapas dos skills DP Criador na ordem correta, detecta o que já foi feito, recomenda a próxima etapa e acompanha a progressão. É o ponto de entrada principal — lance /dp-launch e siga o guia.",
  argumentHint: "[status] [--reset] [--skip etapa]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Launch — Orquestrador de Lançamento

<!-- v2.0.0 | 2026-04-19 | Criação: orquestrador 12 etapas, detecção automática, progressão, recomendações -->

O ponto de entrada único do DP Criador. Em vez de adivinhar qual skill lançar e em que ordem, digite \`/dp-launch\` e deixe-se guiar.

Este skill **não cria nada por si mesmo** — ele analisa onde você está, diz o que fazer em seguida e redireciona para o skill correto.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-launch\` | Exibir sua progressão e a próxima etapa |
| \`/dp-launch status\` | Resumo completo de todas as etapas |
| \`/dp-launch start\` | Iniciar um novo projeto do zero |
| \`/dp-launch next\` | Lançar diretamente a próxima etapa |
| \`/dp-launch --skip [etapa]\` | Marcar uma etapa como não aplicável |
| \`/dp-launch --reset\` | Zerar a progressão |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Dashboard de progressão (12 etapas)
├── Detecção automática do que já foi feito
├── Próxima etapa recomendada com comando exato
├── Estimativa de tempo restante
└── Nenhum arquivo criado — redireciona para os skills
\`\`\`

---

## Processo

\`\`\`
1. Escanear o projeto      → Detectar os arquivos existentes
2. Avaliar a progressão    → Verificar cada etapa
3. Exibir o dashboard      → Progressão visual
4. Recomendar              → Próxima etapa com comando
\`\`\`

---

## As 12 Etapas do Lançamento

### Mapa completo

\`\`\`
FASE 1 — FUNDAÇÃO
  ├── Etapa 1  : Business Profile         /dp-business-profile
  └── Etapa 2  : Validação de Mercado     /dp-market-research

FASE 2 — CRIAÇÃO
  ├── Etapa 3  : Criar o Ebook            /dp-playbook-create
  ├── Etapa 4  : Auditar a Qualidade      /dp-playbook-audit
  ├── Etapa 5  : Capa                     /dp-ebook-cover
  └── Etapa 6  : Exportar PDF             /dp-export-pdf

FASE 3 — COLOCAR À VENDA
  ├── Etapa 7  : Landing Page             /dp-landing-page
  ├── Etapa 8  : Sequência de Email       /dp-email-sequence
  └── Etapa 9  : Estratégia de Upsell     /dp-upsell-strategy

FASE 4 — PROMOÇÃO
  ├── Etapa 10 : Estratégia de Blog       /dp-blog-strategy
  ├── Etapa 11 : Anúncios (Meta + Google) /dp-ad-angles-meta + google
  └── Etapa 12 : Plano de Mídia           /dp-mediaplan
\`\`\`

---

## Etapa 1 — Escanear o Projeto

### Detecção automática

Para cada etapa, verificar se os arquivos correspondentes existem:

\`\`\`bash
# Etapa 1 — Business Profile
ls business-profile.md 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 2 — Market Research
ls market-research/validacao-*.md 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 3 — Ebook
ls "ebook fr"/*.html "ebook en"/*.html 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 4 — Audit
# Verificar se um audit foi feito (buscar relatórios ou um score nos arquivos)
ls market-research/audit-*.md 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 5 — Capa
ls covers/*-cover.html covers/*-mockup.html 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 6 — PDF
ls exports/*.pdf 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 7 — Landing Page
ls landing-pages/*.html 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 8 — Sequência de Email
ls emails/*.html emails/*-sequence.* 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 9 — Estratégia de Upsell
ls upsell-strategy/strategy-*.md 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 10 — Estratégia de Blog
ls blog-strategy/strategy-*.md 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 11 — Anúncios
ls ads/*.html ads/*.md 2>/dev/null && echo "DONE" || echo "TODO"

# Etapa 12 — Plano de Mídia
ls mediaplan/*.html mediaplan/*.md 2>/dev/null && echo "DONE" || echo "TODO"
\`\`\`

### Regras de detecção

| Etapa | Arquivo(s) buscado(s) | Status |
|-------|----------------------|--------|
| 1. Business Profile | \`business-profile.md\` | ✅ se existir |
| 2. Market Research | \`market-research/validacao-*.md\` | ✅ se existir |
| 3. Ebook | \`ebook fr/*.html\` ou \`ebook en/*.html\` | ✅ se ao menos 1 arquivo |
| 4. Audit | Verificado manualmente (perguntar ao usuário) | ✅ se confirmado |
| 5. Capa | \`covers/*-cover.html\` ou \`covers/*-mockup.html\` | ✅ se existir |
| 6. PDF | \`exports/*.pdf\` | ✅ se existir |
| 7. Landing Page | \`landing-pages/*.html\` | ✅ se existir |
| 8. Sequência Email | \`emails/*\` | ✅ se existir |
| 9. Upsell | \`upsell-strategy/*.md\` | ✅ se existir |
| 10. Blog Strategy | \`blog-strategy/*.md\` | ✅ se existir |
| 11. Anúncios | \`ads/*\` | ✅ se existir |
| 12. Plano de Mídia | \`mediaplan/*\` | ✅ se existir |

---

## Etapa 2 — Exibir o Dashboard

\`\`\`
╔══════════════════════════════════════════════════════════╗
║            DP CRIADOR — PROGRESSÃO                       ║
║            Projeto: [nome do business-profile]           ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  FASE 1 — FUNDAÇÃO                                       ║
║  [✅] 1. Business Profile       /dp-business-profile     ║
║  [✅] 2. Validação de Mercado   /dp-market-research      ║
║                                                          ║
║  FASE 2 — CRIAÇÃO                                        ║
║  [✅] 3. Ebook (60+ páginas)    /dp-playbook-create      ║
║  [⬜] 4. Audit de Qualidade     /dp-playbook-audit       ║ ← VOCÊ ESTÁ AQUI
║  [⬜] 5. Capa                   /dp-ebook-cover          ║
║  [⬜] 6. Exportar PDF           /dp-export-pdf           ║
║                                                          ║
║  FASE 3 — COLOCAR À VENDA                               ║
║  [⬜] 7. Landing Page           /dp-landing-page         ║
║  [⬜] 8. Sequência de Email     /dp-email-sequence       ║
║  [⬜] 9. Estratégia de Upsell   /dp-upsell-strategy      ║
║                                                          ║
║  FASE 4 — PROMOÇÃO                                       ║
║  [⬜] 10. Estratégia de Blog    /dp-blog-strategy        ║
║  [⬜] 11. Anúncios Meta+Google  /dp-ad-angles-meta       ║
║  [⬜] 12. Plano de Mídia        /dp-mediaplan            ║
║                                                          ║
╠══════════════════════════════════════════════════════════╣
║  Progressão: ████████░░░░░░░░░░░░░░░░ 3/12 (25%)        ║
║  Tempo estimado restante: ~10h                           ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

### Ícones de status

| Ícone | Significado |
|-------|------------|
| ✅ | Concluído — arquivo(s) detectado(s) |
| ⬜ | A fazer |
| ⏭️ | Pulado (não aplicável) |
| 🔄 | Em andamento (arquivo parcial detectado) |
| ← VOCÊ ESTÁ AQUI | Próxima etapa recomendada |

---

## Etapa 3 — Recomendação

### Lógica da próxima etapa

\`\`\`
PARA CADA etapa de 1 a 12:
  SE etapa.status == "TODO":
    → É a próxima etapa
    → Exibir a recomendação
    → PARAR (não buscar mais)
\`\`\`

### Formato da recomendação

\`\`\`
╔══════════════════════════════════════════════════════════╗
║  PRÓXIMA ETAPA: [N]. [Nome da etapa]                     ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Comando: /dp-[skill-name]                               ║
║                                                          ║
║  O que faz:                                              ║
║  [Descrição em 2-3 linhas do que o skill produz]         ║
║                                                          ║
║  Tempo estimado: [Xh]                                    ║
║                                                          ║
║  Pré-requisitos:                                         ║
║  [✅] [Etapa anterior concluída]                         ║
║  [✅/⬜] [Outro pré-requisito se aplicável]              ║
║                                                          ║
║  Digite /dp-[skill-name] para começar.                   ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

### Detalhes por etapa

| Etapa | Skill | Tempo estimado | Pré-requisitos | O que produz |
|-------|-------|---------------|----------------|--------------|
| 1 | \`/dp-business-profile\` | 30 min | Nenhum | \`business-profile.md\` — cores, voz, público |
| 2 | \`/dp-market-research\` | 45 min | Etapa 1 | Relatório de validação com score e veredicto GO/TEST/STOP |
| 3 | \`/dp-playbook-create\` | 8-15h | Etapas 1+2 | Ebook HTML 60+ páginas nas cores da sua marca |
| 4 | \`/dp-playbook-audit\` | 15 min | Etapa 3 | Score 0-100 com issues priorizadas |
| 5 | \`/dp-ebook-cover\` | 30 min | Etapa 3 | Capa HTML + mockup 3D + prompts de IA |
| 6 | \`/dp-export-pdf\` | 10 min | Etapas 3+4 | PDF profissional pronto para vender |
| 7 | \`/dp-landing-page\` | 45 min | Etapa 6 | Landing page + thank you page + modais legais |
| 8 | \`/dp-email-sequence\` | 45 min | Etapa 7 | 7 emails de lançamento (D-7 → D+7) |
| 9 | \`/dp-upsell-strategy\` | 1h | Etapas 7+8 | Escada de valor + order bump + upsell + cálculo de LTV |
| 10 | \`/dp-blog-strategy\` | 1h | Etapa 1 | 20 artigos em topic clusters + calendário |
| 11 | \`/dp-ad-angles-meta\` | 1h | Etapa 7 | Ângulos publicitários Meta + Google com copies |
| 12 | \`/dp-mediaplan\` | 1h | Etapa 10 | Calendário editorial 4 semanas |

### Tempo total estimado

\`\`\`
ESTIMATIVA TOTAL
═════════════════

Fase 1 (Fundação)      : 1h15
Fase 2 (Criação)       : 9-16h  ← O grosso do trabalho (redação do ebook)
Fase 3 (Colocar à venda): 2h30
Fase 4 (Promoção)      : 3h
────────────────────────────────
TOTAL                  : 16-23h (distribuídas em 2-4 semanas)
\`\`\`

---

## Etapa 4 — Gerenciamento da Progressão

### Marcar uma etapa como concluída

Se a detecção automática não for suficiente (ex: o audit foi feito oralmente), o usuário pode confirmar:

"A etapa 4 (Audit) está concluída? Se sim, vou marcá-la como feita."

### Pular uma etapa

\`\`\`
/dp-launch --skip 5
→ "Etapa 5 (Capa) marcada como não aplicável. ⏭️"
\`\`\`

Etapas que podem ser puladas:
- Etapa 2 (Market Research) — se o usuário já tem certeza da ideia
- Etapa 5 (Capa) — se o usuário já tem uma capa
- Etapa 9 (Upsell) — se não estiver pronto para isso agora
- Etapa 10 (Blog) — se não houver estratégia de SEO planejada
- Etapa 12 (Plano de Mídia) — se não houver redes sociais

Etapas que NÃO podem ser puladas:
- Etapa 1 (Business Profile) — todo o sistema depende disso
- Etapa 3 (Ebook) — é o produto
- Etapa 6 (PDF) — é o entregável
- Etapa 7 (Landing Page) — é a página de vendas

### Zerar a progressão

\`\`\`
/dp-launch --reset
→ "⚠️ Isso vai zerar a progressão. Os arquivos NÃO serão deletados.
   Quer continuar? (sim/não)"
\`\`\`

---

## Cenários Especiais

### O usuário chega com um projeto já avançado

Se arquivos já existirem (ebook criado, landing page feita), o scanner os detecta automaticamente e não repropõe essas etapas.

"Vejo que você já tem um ebook (\`ebook fr/playbook-BR.html\`) e uma landing page (\`landing-pages/meu-produto.html\`). As etapas 3 e 7 já estão feitas. Próxima etapa recomendada: Etapa 4 — Audit."

### O usuário quer fazer as coisas fora de ordem

É possível, mas o skill avisa:

"Você quer lançar os anúncios (etapa 11) antes de ter a landing page (etapa 7). Tecnicamente é possível, mas seus anúncios vão apontar para... nada. Recomendo fazer a etapa 7 primeiro."

### O usuário concluiu todas as etapas

\`\`\`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  🎉 TODAS AS ETAPAS ESTÃO CONCLUÍDAS!                   ║
║                                                          ║
║  Seu produto está no ar. Veja o que você tem:            ║
║                                                          ║
║  📄 Ebook    : [caminho]                                 ║
║  📦 PDF      : [caminho]                                 ║
║  🎨 Capa     : [caminho]                                 ║
║  🌐 Landing  : [caminho]                                 ║
║  📧 Emails   : [caminho]                                 ║
║  📊 Anúncios : [caminho]                                 ║
║  📅 Plano de Mídia: [caminho]                            ║
║                                                          ║
║  PRÓXIMAS AÇÕES:                                         ║
║  → Publicar a landing page online                        ║
║  → Configurar os emails no Brevo/RD Station/MailerLite  ║
║  → Lançar os primeiros anúncios com os ângulos gerados   ║
║  → Publicar o primeiro conteúdo do plano de mídia        ║
║  → Escrever o primeiro artigo da estratégia de blog      ║
║                                                          ║
║  PARA IR MAIS LONGE:                                     ║
║  → /dp-blog-article [keyword]  Escrever um artigo SEO   ║
║  → /dp-blog-publish            Publicar no WordPress     ║
║  → /dp-competitor-analysis     Analisar um concorrente   ║
║  → /dp-copy-review             Melhorar o copy           ║
║  → /dp-playbook-sync           Traduzir PT ↔ EN          ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|-----------|
| QG-01 | NUNCA criar arquivos — apenas escanear e recomendar | Crítico |
| QG-02 | A detecção se baseia nos ARQUIVOS, não na memória | Crítico |
| QG-03 | Sempre exibir o comando exato a digitar | Alto |
| QG-04 | Não recomendar uma etapa se seus pré-requisitos não estiverem completos | Alto |
| QG-05 | Ser honesto sobre o tempo estimado (não dizer "5 min" para um ebook de 60 páginas) | Alto |
| QG-06 | Permitir pular etapas não críticas sem julgamento | Médio |
| QG-07 | Se todas as etapas estiverem feitas, parabenizar E dar as próximas ações concretas | Médio |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Nenhum arquivo no projeto | "É um novo projeto! Vamos começar pela etapa 1: \`/dp-business-profile\`" |
| business-profile.md ausente mas ebook existe | "Vejo um ebook mas sem perfil business. Recomendo criar o perfil primeiro — vai melhorar todos os outros outputs." |
| O usuário não sabe por onde começar | Exibir o dashboard e apontar para a etapa 1 |
| O usuário quer fazer tudo em 1 dia | "O lançamento completo leva 16-23h distribuídas em 2-4 semanas. Hoje, foque em [próxima etapa]." |
| Arquivo detectado mas possivelmente incompleto | Pedir confirmação: "Encontrei [arquivo]. Está concluído ou ainda em andamento?" |

---

## Integração entre Skills

Este skill é o ORQUESTRADOR — ele referencia todos os outros:

| Skill | Papel no lançamento |
|-------|---------------------|
| \`/dp-business-profile\` | Etapa 1 — Fundação |
| \`/dp-market-research\` | Etapa 2 — Validação |
| \`/dp-playbook-create\` | Etapa 3 — Criação |
| \`/dp-playbook-audit\` | Etapa 4 — Qualidade |
| \`/dp-ebook-cover\` | Etapa 5 — Visual |
| \`/dp-export-pdf\` | Etapa 6 — Produção |
| \`/dp-landing-page\` | Etapa 7 — Venda |
| \`/dp-email-sequence\` | Etapa 8 — Email |
| \`/dp-upsell-strategy\` | Etapa 9 — Monetização |
| \`/dp-blog-strategy\` | Etapa 10 — Conteúdo |
| \`/dp-ad-angles-meta\` + \`google\` | Etapa 11 — Aquisição |
| \`/dp-mediaplan\` | Etapa 12 — Social |`,
};

export default skill;
