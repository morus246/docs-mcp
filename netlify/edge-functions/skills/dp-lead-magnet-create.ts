import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-lead-magnet-create",
  categoria: "Criação do Produto",
  descricao: "Cria lead magnets profissionais (10-15 páginas) para capturar emails: checklists, cheat sheets, mini-guias, packs de templates, resultados de quiz. Otimizado para conversão e vinculado ao produto pago. Gatilhos: lead magnet, gratuito, freebie, captura de email, opt-in, checklist grátis, guia grátis.",
  argumentHint: "[assunto] [tipo: checklist|cheat-sheet|mini-guide|template-pack|quiz-result]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Lead Magnet Create — Criador de Lead Magnets

<!-- v2.0.0 | 2026-04-13 | Criação inicial: context intake, tipos de lead magnets, quality gates, cross-skill -->

Expert em criação de lead magnets para DP Criador. Guia o usuário passo a passo — do assunto ao arquivo HTML pronto para converter em PDF distribuível. Cada lead magnet é desenhado para capturar emails e alimentar o funil rumo ao produto pago.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-lead-magnet-create [assunto]\` | Iniciar a criação guiada |
| \`/dp-lead-magnet-create express [assunto]\` | Modo rápido — 4 perguntas e depois redação completa |
| \`/dp-lead-magnet-create from [arquivo]\` | Transformar conteúdo existente em lead magnet |
| \`/dp-lead-magnet-create list\` | Exibir os 5 tipos de lead magnets disponíveis com exemplos |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Arquivo HTML standalone (lead-magnets/[slug]-BR.html)
├── CSS embutido (design system DP Criador)
├── Pronto para exportar em PDF (estilos de impressão incluídos)
├── CTA final para o produto pago integrado
└── Score de qualidade 0-100 com detalhe por categoria
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Coletar o assunto, o tipo, o produto pago vinculado
2. Ler referências     → Carregar quality gates, guia de voz, business profile
3. Construir lead card → Síntese validada pelo usuário
4. Desenhar estrutura  → Plano detalhado conforme o tipo escolhido
5. Redigir conteúdo    → Redação seção por seção (80% valor / 20% transição)
6. Quality check       → Score 0-100, quality gates, revisão pré-entrega
7. Entregar            → Arquivo HTML + resumo + próximos passos
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Sempre Fazer Primeiro)

Antes de qualquer redação, coletar o contexto. Um lead magnet sem ligação clara com o produto pago é esforço desperdiçado.

### 1a. Carregar o perfil do negócio (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, cores
  → NÃO repetir perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrem o mínimo.
\`\`\`

### 1b. Fazer as perguntas por blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar em 2-3, aguardar as respostas, reformular para validar, depois continuar.

#### Bloco 1 — O produto pago e o funil

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual é o seu produto PAGO? (nome, preço, formato) O lead magnet deve alimentar o funil rumo a esse produto. | O lead magnet não existe sozinho — é o primeiro passo da jornada do cliente |
| Q2 | Que tipo de lead magnet você quer criar? \`checklist\` / \`cheat-sheet\` / \`mini-guide\` / \`template-pack\` / \`quiz-result\` | Determina a estrutura e o formato |
| Q3 | Qual problema rápido isso resolve? Descreva o quick win em 1 frase — o leitor deve obter um resultado em 15 min. | Um lead magnet que não gera resultado imediato vai para o lixo |

**Após as respostas**: Reformular em 2-3 linhas. "Se entendi bem, você quer criar um [tipo] que entrega [quick win] e que leva até [produto pago]. Está correto?"

#### Bloco 2 — A audiência e o posicionamento

| # | Pergunta | Por quê |
|---|----------|---------|
| Q4 | Para quem exatamente? Descreva seu leitor ideal (profissão, situação, nível). | Foco do conteúdo e do tom |
| Q5 | Que título você tem em mente? Mesmo provisório. Senão eu proponho 5. | Enquadramento editorial |
| Q6 | Cores da marca? (cor principal hex + cor destaque hex) Ou eu leio seu business-profile.md. | Coerência visual com a sua marca |

**Após as respostas**: Confirmar o formato e anunciar o volume esperado.

> **Volume esperado por tipo:**
> - Checklist: 10-12 páginas (~3.000-3.500 palavras)
> - Cheat sheet: 8-10 páginas (~2.500-3.000 palavras)
> - Mini-guia: 12-15 páginas (~4.000-5.000 palavras)
> - Template pack: 10-15 páginas (~3.000-4.500 palavras)
> - Quiz result: 10-12 páginas (~3.000-3.500 palavras)

### Casos especiais — Context Intake

| Situação | Ação |
|----------|------|
| Sem produto pago | Alertar: "Um lead magnet sem produto pago por trás é conteúdo gratuito sem ROI. Quer que a gente defina primeiro a sua oferta paga?" Propor \`/dp-playbook-create\`. |
| Sem ideia de assunto | Perguntar: "Qual pergunta seus prospects te fazem com mais frequência?", "Qual problema você resolve em 15 min durante suas consultas?" |
| Assunto muito amplo | Propor 3 ângulos precisos. Um lead magnet = 1 problema = 1 solução. |
| O usuário quer um lead magnet de 30+ páginas | Redirecionar para \`/dp-playbook-create\` com o tipo \`lead-magnet\` ou \`guide\`. Um lead magnet deve ser curto — senão é um ebook. |
| O usuário fornece conteúdo existente | Ler, identificar o melhor ângulo, extrair e reestruturar no formato lead magnet. |

---

## Etapa 2 — Lead Card (Síntese de Descoberta)

Após todas as perguntas, apresentar a ficha:

\`\`\`
╔══════════════════════════════════════════════════╗
║           FICHA LEAD MAGNET — SÍNTESE            ║
╠══════════════════════════════════════════════════╣
║ Título       : [título ou "a definir"]           ║
║ Tipo         : [checklist/cheat-sheet/mini-guide/ ║
║                template-pack/quiz-result]         ║
║ Páginas prev.: [10-15]                           ║
║ Quick win    : [resultado em 15 min]             ║
╠══════════════════════════════════════════════════╣
║ FUNIL                                            ║
║ Produto pago : [nome — preço]                    ║
║ Ligação lógica: [por que este lead magnet leva   ║
║                  naturalmente ao produto]         ║
╠══════════════════════════════════════════════════╣
║ AUDIÊNCIA                                        ║
║ Quem           : [perfil do leitor]              ║
║ Problema       : [dor imediata]                  ║
╠══════════════════════════════════════════════════╣
║ IDENTIDADE VISUAL                                ║
║ Primária       : [#hex — nome]                   ║
║ Destaque       : [#hex — nome]                   ║
║ Marca          : [nome/logo ou "nenhum"]         ║
╚══════════════════════════════════════════════════╝
\`\`\`

**Pedir validação**: "Esta ficha te representa? Quer modificar algo antes de passarmos para o plano?"

**Hard gate**: NÃO continuar sem validação explícita do usuário.

---

## Etapa 3 — Estrutura por Tipo

### Tipo 1 — Checklist

**Formato**: 15-25 itens organizados em categorias, caixas de seleção, 1 página = 1 categoria.

\`\`\`
ESTRUTURA CHECKLIST (10-12 páginas)
═════════════════════════════════

Página 1     : Capa (título, subtítulo, marca)
Página 2     : Introdução — por que esta checklist + como usá-la (1 parágrafo)
Páginas 3-9  : As categorias (3-5 categorias, 5-7 itens cada)
  Cada categoria:
    - Título da categoria
    - 5-7 itens com caixa de seleção
    - Para cada item: 1 linha de ação + 1 linha "por que é importante"
    - Indicador de prioridade: 🔴 Crítico / 🟡 Importante / 🟢 Bônus
Página 10    : Recapitulação — score (X/25 itens marcados = qual nível)
Página 11    : CTA para o produto pago — "Marcou menos de 15 itens? Veja como corrigir isso."
Página 12    : Sobre + links
\`\`\`

### Tipo 2 — Cheat Sheet

**Formato**: 1-3 páginas frente/verso, ultra-condensado, formato de referência rápida. Feito para ser impresso e mantido à mão.

\`\`\`
ESTRUTURA CHEAT SHEET (8-10 páginas)
══════════════════════════════════

Página 1     : Capa
Página 2     : Modo de usar — "Imprima esta página e deixe por perto"
Páginas 3-7  : O conteúdo condensado
  Organizado em blocos visuais:
    - Tabelas de referência rápida
    - Fórmulas / frameworks em 1 linha
    - Do / Don't lado a lado
    - Guia visual (esquemas simples)
  Regra: ZERO parágrafo com mais de 2 linhas. Tudo é bullet, tabela ou esquema.
Página 8     : Erros frequentes — as 5 armadilhas a evitar
Página 9     : CTA para o produto pago — "Esta cheat sheet cobre o básico. Para o sistema completo..."
Página 10    : Sobre + links
\`\`\`

### Tipo 3 — Mini-Guia

**Formato**: 10-15 páginas, 3-5 seções curtas, valor imediato. É um guia acionável, não um ebook completo.

\`\`\`
ESTRUTURA MINI-GUIA (12-15 páginas)
══════════════════════════════════

Página 1       : Capa
Página 2       : Introdução — O problema + a promessa (máx 200 palavras)
Páginas 3-4    : Seção 1 — [Conceito fundamental]
  - O princípio em 2-3 parágrafos
  - 1 exemplo concreto
  - 1 ação imediata
Páginas 5-7    : Seção 2 — [O método passo a passo]
  - Passos numerados (3-5 passos)
  - Template ou script pronto para copiar
Páginas 8-10   : Seção 3 — [Aplicação concreta]
  - Estudo de caso ou cenário típico
  - Checklist de ação
Páginas 11-12  : Seção 4 (opcional) — [Erros a evitar]
Página 13      : Recapitulação — plano de ação em 1 página
Página 14      : CTA para o produto pago — transição natural
Página 15      : Sobre + links
\`\`\`

### Tipo 4 — Template Pack

**Formato**: 5-10 templates prontos para copiar, cada um com modo de uso curto.

\`\`\`
ESTRUTURA TEMPLATE PACK (10-15 páginas)
═════════════════════════════════════

Página 1       : Capa
Página 2       : Como usar este pack — instruções em 3 passos
Páginas 3-12   : Os templates (1-2 páginas por template)
  Cada template:
    - Título do template
    - Quando usar (1-2 linhas)
    - O template em si (pronto para copiar)
    - Exemplo preenchido (para mostrar como fica)
    - 1 dica pro (truque para maximizar o impacto)
Página 13      : Tabela resumo — qual template para qual situação
Página 14      : CTA para o produto pago — "Esses templates cobrem [X]. Para o sistema completo de [Y]..."
Página 15      : Sobre + links
\`\`\`

### Tipo 5 — Quiz Result

**Formato**: Resultados personalizados com base nas respostas, com recomendações adaptadas.

\`\`\`
ESTRUTURA QUIZ RESULT (10-12 páginas)
═══════════════════════════════════

Página 1       : Capa — "Seus resultados personalizados"
Página 2       : Resumo do quiz — as perguntas e o sistema de pontuação
Páginas 3-4    : Perfil A — [Nome do perfil] (pontuação X-Y)
  - Descrição do perfil (pontos fortes, fraquezas)
  - 3 recomendações específicas
  - 1 ação prioritária
Páginas 5-6    : Perfil B — [Nome do perfil] (pontuação X-Y)
  - Mesma estrutura
Páginas 7-8    : Perfil C — [Nome do perfil] (pontuação X-Y)
  - Mesma estrutura
Páginas 9-10   : Perfil D (opcional) — [Nome do perfil] (pontuação X-Y)
Página 11      : Plano de ação comum — os 3 passos que todos os perfis devem seguir
Página 12      : CTA para o produto pago — personalizado conforme o perfil
\`\`\`

---

## Etapa 4 — Redação

### 4a. Carregar as referências (silencioso)

\`\`\`
SE a pasta references/ de dp-playbook-create contiver arquivos úteis:
  Read dp-playbook-create/references/design-system.md   → CSS completo
  Read dp-playbook-create/references/voice-guide.md     → Tom e estilo
  Read dp-playbook-create/references/quality-gates.md   → Regras base
\`\`\`

### 4b. Regras de redação específicas para lead magnet

| Regra | Detalhe |
|-------|---------|
| **80/20** | 80% valor gratuito acionável / 20% transição para o pago. O leitor NUNCA deve se sentir frustrado ou enganado. |
| **Quick win real** | O leitor DEVE obter um resultado concreto em 15 minutos de leitura. Não "aprender coisas" — um resultado: uma checklist preenchida, um template copiado, um plano de ação definido. |
| **CTA final obrigatório** | A última página antes de "Sobre" é SEMPRE um CTA para o produto pago. Transição natural, sem venda agressiva. |
| **Teaser sem frustrar** | Mencionar o produto pago 2-3 vezes no máximo no corpo do conteúdo (não mais). Sempre no contexto de "para ir mais longe", nunca como substituto de conteúdo. |
| **Autonomia do conteúdo** | O lead magnet deve ter valor MESMO se o leitor nunca comprar o produto pago. É isso que constrói a confiança. |
| **Tamanho das seções** | Seções curtas — 300-600 palavras máx. É um lead magnet, não um ebook. |

### 4c. Padrão de página (obrigatório)

Cada seção segue ESTE padrão:

\`\`\`html
<section class="lm-section" id="[kebab-case-unique]">
  <h2>[Título curto e acionável]</h2>

  <div class="lm-value-block">
    <p>[1-2 frases — o que o leitor vai obter nesta seção]</p>
  </div>

  <!-- Conteúdo principal — direto, acionável -->
  <p>[Conteúdo curto, específico, voz DP Criador]</p>

  <!-- Template / checklist / ação se aplicável -->
  <div class="lm-action-block">
    <h4>Ação</h4>
    <p>[A ação concreta a fazer agora]</p>
  </div>
</section>
\`\`\`

### 4d. Padrão de CTA final (obrigatório)

\`\`\`html
<section class="lm-cta-section" id="next-step">
  <h2>[Título orientado a resultado — não "Compre meu produto"]</h2>

  <p>[2-3 frases de transição natural. Recordar o quick win obtido graças ao lead magnet. Mostrar que o produto pago é a continuação lógica.]</p>

  <div class="lm-cta-block">
    <h3>[Nome do produto pago]</h3>
    <p>[1 frase = a promessa do produto]</p>
    <p>[Preço + o que está incluído em 2-3 bullets]</p>
    <a href="[URL]" class="lm-cta-button">[Texto do botão — orientado à ação]</a>
  </div>

  <p class="lm-caveat">[Caveat honesto — "Sem garantia de resultado", "Exige trabalho", etc. A transparência reforça a confiança.]</p>
</section>
\`\`\`

### 4e. Regras de voz

| Fazer | NÃO fazer |
|-------|-----------|
| Tutear sistematicamente | "Nós", "a gente", voz passiva |
| Ações específicas ("Marque os 5 primeiros itens agora") | Conselhos vagos ("reflita sobre sua situação") |
| Frases curtas — é um lead magnet, não um romance | Parágrafos de 10 linhas |
| Caveats honestos ("funciona se você aplicar") | Promessas garantidas |
| Dar o resultado primeiro, explicar depois | Longas introduções teóricas |
| Templates prontos para copiar e colar | "Crie seu próprio template" sem exemplo |

---

## Etapa 5 — Quality Check (Pré-Entrega)

### 5a. Quality Gates — Verificação rigorosa

Antes de entregar, verificar CADA gate. Se um gate Critical falhar, corrigir antes da entrega.

| ID | Gate | Severity |
|----|------|----------|
| QG-01 | CTA para o produto pago presente e claro | Critical |
| QG-02 | O leitor obtém um resultado concreto ao ler (não apenas "aprender") | Critical |
| QG-03 | 10-15 páginas máx (não mais — é um lead magnet, não um ebook) | Critical |
| QG-04 | Nenhum placeholder ([TODO], [INSERT], Lorem ipsum, texto entre colchetes) | Critical |
| QG-05 | Ligação lógica com o produto pago (o lead magnet = primeiro passo da jornada) | Critical |
| QG-06 | Cores da marca aplicadas (--color-primary, --color-accent) | High |
| QG-07 | Ratio 80/20 respeitado (80% valor gratuito / 20% transição pago) | High |
| QG-08 | Sem CSS/JS externo (exceto Google Fonts) | Critical |
| QG-09 | Pelo menos 1 elemento acionável por seção (checklist, template, exercício) | High |
| QG-10 | HTML válido (tags fechadas, estrutura correta, IDs únicos) | Critical |

### 5b. Checklist Pré-Entrega

\`\`\`
ANTES DE ENTREGAR, verificar:

Estrutura:
  [ ] HTML válido e bem formado
  [ ] Todos os IDs de seção únicos e em kebab-case
  [ ] CSS completo embutido em <style>
  [ ] Atributo lang="pt-BR" correto
  [ ] Estilos de impressão (@media print) incluídos
  [ ] 10-15 páginas máx

Conteúdo:
  [ ] ZERO placeholder, TODO, ou [texto entre colchetes]
  [ ] Quick win real — o leitor obtém um resultado concreto
  [ ] CTA final para o produto pago — transição natural
  [ ] Ratio 80/20 respeitado
  [ ] Produto pago mencionado 2-3 vezes máx no corpo (exceto CTA final)
  [ ] Voz DP Criador respeitada (direta, action-first, honesta)
  [ ] Sem enrolação motivacional
  [ ] Caveats honestos onde necessário

Técnico:
  [ ] Arquivo salvo no caminho correto
  [ ] Pasta criada se necessário
  [ ] Sem conflito com arquivo existente
\`\`\`

### 5c. Score de Qualidade

Calcular e exibir o score:

\`\`\`
QUALITY SCORE: [XX]/100

Estrutura   : [XX]/20  (páginas, navegação, HTML)
Conteúdo    : [XX]/30  (valor, acionabilidade, quick win)
Funil       : [XX]/20  (CTA, ligação com produto pago, ratio 80/20)
Voz & Tom   : [XX]/15  (direto, tutear, honesto)
Legibilidade: [XX]/15  (seções curtas, visuais, arejamento)

Issues:
  Critical : [N] (devem ser corrigidos)
  High     : [N] (fortemente recomendado)
  Medium   : [N] (a considerar)
  Low      : [N] (nice to have)
\`\`\`

**Hard gate**: Se score < 75 ou se existirem issues Critical, corrigir antes da entrega.

---

## Etapa 6 — Entrega

### 6a. Montar e salvar

\`\`\`
Caminho de saída:
  → lead-magnets/[slug]-BR.html

Slug: título em minúsculas, espaços → hífens, sem caracteres especiais.
Criar a pasta se não existir.
\`\`\`

### 6b. Apresentar o entregável

\`\`\`
LEAD MAGNET CRIADO — Score: [XX]/100

Arquivo      : [caminho completo]
Título       : [título final]
Tipo         : [checklist/cheat-sheet/mini-guide/template-pack/quiz-result]
Páginas      : [N] páginas
Palavras     : ~[estimativa] palavras
Quick win    : [resultado que o leitor obtém]
Produto lido : [nome do produto pago — preço]

SCORE DE QUALIDADE:
  Estrutura   [██████████░░] XX/100
  Conteúdo    [████████████] XX/100
  Funil       [█████████░░░] XX/100
  Voz         [██████████░░] XX/100
  Legibilidade[███████████░] XX/100

PRÓXIMAS ETAPAS:
  → /dp-export-pdf          Converter em PDF distribuível
  → /dp-landing-page        Criar a landing page de captura
  → /dp-email-sequence      Sequência de email pós-download
  → /dp-social-caption      Posts para promover o lead magnet
  → /dp-ad-angles-meta      Publicidade para a landing page
\`\`\`

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Sem produto pago definido | Alertar o usuário. Propor definir a oferta primeiro com \`/dp-playbook-create\` ou \`/dp-business-profile\`. Um lead magnet sem funil = esforço desperdiçado. |
| Assunto muito amplo para um lead magnet | Propor 3 sub-temas precisos. Lembrar: 1 lead magnet = 1 problema = 1 quick win. |
| O usuário quer mais de 15 páginas | Redirecionar para \`/dp-playbook-create\` tipo \`lead-magnet\` ou \`guide\`. Explicar: um lead magnet muito longo não é lido. |
| O quick win não é concreto o suficiente | Perguntar: "Se o seu leitor seguir o lead magnet por 15 min, o que ele tem de concreto no final? Um documento preenchido? Uma decisão tomada? Uma ferramenta configurada?" |
| Sem ligação lógica entre o lead magnet e o produto pago | Propor 3 ângulos que criam uma ponte natural. O lead magnet resolve o problema A, o produto pago resolve A+B+C. |
| business-profile.md ausente | Continuar com as respostas do context intake. Perguntar as cores obrigatoriamente. |
| Arquivo existente mesmo slug | Pedir confirmação antes de sobrescrever. |
| O conteúdo excede o ratio 80/20 | Identificar os trechos muito promocionais e reescrevê-los no modo "valor primeiro". |

---

## Integração Cross-Skill

### Antes da criação do lead magnet

| Skill | Quando |
|-------|--------|
| \`/dp-business-profile\` | Para definir o posicionamento, a audiência e as cores da marca |
| \`/dp-playbook-create\` | Se o produto pago ainda não existir |
| \`/dp-competitor-analysis\` | Para identificar os lead magnets dos concorrentes e se diferenciar |

### Após a criação do lead magnet

| Skill | Quando |
|-------|--------|
| \`/dp-export-pdf\` | Converter o HTML em PDF distribuível |
| \`/dp-landing-page\` | Criar a página de captura de email (formulário + promessa) |
| \`/dp-email-sequence\` | Sequência de boas-vindas pós-download (nurturing → venda) |
| \`/dp-social-caption\` | Criar os posts para promover o lead magnet |
| \`/dp-mediaplan\` | Planejar a promoção orgânica |
| \`/dp-ad-angles-meta\` | Criar os anúncios Facebook/Instagram para a landing page |
| \`/dp-ad-angles-google\` | Criar os anúncios Google para a landing page |
| \`/dp-blog-article\` | Redigir um artigo SEO que leva ao lead magnet |
`,
};

export default skill;
