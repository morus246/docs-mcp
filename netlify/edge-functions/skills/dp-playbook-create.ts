import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-playbook-create",
  categoria: "Criação do Produto",
  descricao: "Guia interativo para criar um ebook profissional do zero ao fim. Faz perguntas estratégicas por fases, constrói o plano, redige seção por seção e entrega um HTML standalone pronto para exportar em PDF. Suporta 6 formatos: playbook, guide, lead-magnet, worksheet, checklist, toolkit. Gatilhos: ebook, playbook, guia, criar, novo produto, lead magnet.",
  argumentHint: "[assunto] [tipo: playbook|guide|lead-magnet|worksheet|checklist|toolkit]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Playbook Create — Criador de Ebook Guiado

<!-- v2.0.0 | 2026-04-13 | Refatoração completa: context intake, quality gates, scoring, references, error handling -->

Expert em criação de produtos digitais para DP Criador. Guia o usuário passo a passo — da ideia vaga ao arquivo HTML pronto para converter em PDF vendável.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-playbook-create [assunto]\` | Iniciar a criação guiada |
| \`/dp-playbook-create outline [assunto]\` | Gerar apenas o plano (sem redação) |
| \`/dp-playbook-create express [assunto]\` | Modo rápido — 5 perguntas e redação completa |
| \`/dp-playbook-create from [arquivo]\` | Reestruturar conteúdo existente no formato DP Criador |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Arquivo HTML standalone (ebook pt-br/[slug]-PT.html ou ebook en/[slug]-EN.html)
├── CSS embutido (design system DP Criador)
├── Pronto para exportar em PDF (estilos de impressão incluídos)
└── Score de qualidade 0-100 com detalhe por categoria
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Coletar as informações essenciais (OBRIGATÓRIO)
2. Read references     → Carregar quality gates, tipos de produto, guia de voz
3. Build product card  → Síntese validada pelo usuário
4. Design structure    → Plano detalhado com validação
5. Write content       → Redação seção por seção
6. Quality check       → Score 0-100, quality gates, revisão pré-entrega
7. Deliver             → Arquivo HTML + resumo + próximos passos
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Sempre Fazer Primeiro)

Antes de qualquer redação, coletar o contexto. Sem ele, o conteúdo será genérico e as recomendações incorretas.

### 1a. Carregar o perfil business (silencioso)

\`\`\`
SE business-profile.md existir na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), público, tom, cores
  → NÃO refazer perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrem o mínimo.
\`\`\`

### 1b. Fazer as perguntas por blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar em 2-3, aguardar as respostas, reformular para validar, depois continuar.

#### Bloco 1 — O assunto e a expertise (perguntar primeiro)

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | Qual é o assunto do seu ebook? Descreva em 1-2 frases, mesmo que seja vago. | Define o projeto |
| Q2 | Qual é o seu nível de expertise nesse assunto? (especialista / intermediário / estou aprendendo) | Determina profundidade e tom |
| Q3 | Por que você? O que te torna legítimo? (experiência, resultados, método único, trajetória) | Diferenciação e credibilidade |

**Após as respostas**: Reformular em 2-3 linhas. "Se entendi bem, você é [X] e quer criar um ebook sobre [Y] porque [Z]. Correto?"

#### Bloco 2 — O público-alvo

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | Para quem exatamente? Descreva seu leitor ideal (profissão, situação, nível). | Direcionamento do conteúdo |
| Q5 | Qual é o problema nº 1 dele? A coisa que mais o frustra no dia a dia. | Hook e relevância |
| Q6 | O que ele já tentou? E por que não funcionou? | Posicionamento vs alternativas |
| Q7 | Que resultado concreto ele quer? Não "ser melhor" — um resultado mensurável. | Promessa e CTA |

**Após as respostas**: Síntese do perfil do leitor em 3-4 linhas. Validar.

#### Bloco 3 — O produto

| # | Pergunta | Por que |
|---|----------|---------|
| Q8 | Que tipo de produto? \`playbook\` (60+ páginas, produto premium) / \`guide\` (30-50 páginas) / \`lead-magnet\` (10-15 páginas, gratuito) / \`worksheet\` / \`checklist\` / \`toolkit\` | Estrutura e profundidade |
| Q9 | Em qual língua? Português ou inglês. | Arquivo de saída |
| Q10 | Você tem um título em mente? Mesmo que provisório. Se não, proponho 5 opções. | Enquadramento editorial |
| Q11 | A que preço quer vender? (ou gratuito se lead magnet) | Valor percebido esperado |

**Após as respostas**: Confirmar o formato. Anunciar o volume esperado:
- Playbook: **60+ páginas** (~21000+ palavras, 10-14 seções de 1500-2500 palavras cada)
- Guide: **30-50 páginas** (~10000-17000 palavras, 6-8 seções)
- Lead-magnet: **10-15 páginas** (~3000-5000 palavras, 3-5 seções)

> Ler \`references/product-types.md\` para as especificações detalhadas do tipo escolhido.

#### Bloco 4 — A identidade visual

| # | Pergunta | Por que |
|---|----------|---------|
| Q12 | Você já tem uma identidade visual / cores da marca? Se sim, me dê a cor principal (hex ou nome) e a cor de destaque. | Coerência visual com a marca existente |
| Q13 | Que estilo visual você quer para o ebook? \`minimalista\` (clean, muito branco) / \`bold\` (contrastes fortes, cores vibrantes) / \`premium\` (sóbrio, tons escuros, elegante) / \`warm\` (tons quentes, acolhedor) | Ambiance geral do design |
| Q14 | Você tem um logo ou nome de marca para exibir no ebook? | Branding no header |

> **Se o usuário não tiver cores**: Propor 3 paletas adaptadas ao nicho:
> - Cada paleta = cor primária + cor de destaque + cor de texto + cor de fundo
> - Mostrar um exemplo: "Paleta 1: Azul profundo (#1e3a5f) + Dourado (#d4a853) — estilo premium/confiança"
> - Pedir para escolher ou combinar

**Após as respostas**: Anotar as escolhas visuais. Elas serão aplicadas ao CSS.

#### Bloco 5 — O posicionamento

| # | Pergunta | Por que |
|---|----------|---------|
| Q15 | Em que seu ebook é diferente do que existe? | Ângulo único |
| Q16 | Qual é a sua PROMESSA principal? "Depois de ler este guia, você saberá/terá/poderá..." | Mensagem central |
| Q17 | Há assuntos que NÃO devem ser abordados? | Limites de escopo |

**Após as respostas**: Passar para a Etapa 2.

### Casos particulares — Context Intake

> Ler \`references/error-handling.md\` para a gestão completa dos casos limite.

| Situação | Ação |
|----------|------|
| O usuário não tem ideia | Perguntar: "Qual pergunta te fazem com mais frequência?", "O que você sabe fazer que a maioria acha difícil?", "Que problema você resolveu para si mesmo?" |
| A ideia é vaga | Nunca recusar. Reformular de forma mais precisa, pedir confirmação. |
| O usuário quer ir rápido | Propor o **modo express**: 7 perguntas (Q1, Q4, Q5, Q8, Q12, Q13, Q16), depois redação completa sem pausas. As cores (Q12, Q13) são OBRIGATÓRIAS mesmo no express. Avisar: "Resultado bom mas menos controle." |
| O usuário fornece conteúdo existente | Ler, analisar, identificar pontos fortes/fracos. Integrar em vez de começar do zero. |

---

## Etapa 2 — Ficha do Produto (Síntese de Descoberta)

Após todas as perguntas, apresentar a ficha do produto:

\`\`\`
╔══════════════════════════════════════════════════╗
║           FICHA DO PRODUTO — SÍNTESE             ║
╠══════════════════════════════════════════════════╣
║ Título        : [título ou "a definir"]          ║
║ Tipo          : [playbook/guide/lead-magnet/...]  ║
║ Língua        : [PT/EN]                          ║
║ Preço almejado: [preço ou gratuito]              ║
║ Páginas alvo  : [60+ / 30-50 / 10-15]           ║
║ Palavras est. : [21000+ / 10000-17000 / 3000-5000]║
╠══════════════════════════════════════════════════╣
║ AUTOR                                            ║
║ Expertise     : [nível + domínio]                ║
║ Legitimidade  : [ângulo único]                   ║
╠══════════════════════════════════════════════════╣
║ PÚBLICO                                          ║
║ Quem          : [perfil do leitor]               ║
║ Problema      : [dor principal]                  ║
║ Já tentou     : [alternativas fracassadas]       ║
║ Resultado     : [transformação prometida]        ║
╠══════════════════════════════════════════════════╣
║ IDENTIDADE VISUAL                                ║
║ Primária      : [#hex — nome]                    ║
║ Destaque      : [#hex — nome]                    ║
║ Estilo        : [minimalista/bold/premium/warm]  ║
║ Marca         : [nome/logo ou "nenhum"]          ║
╠══════════════════════════════════════════════════╣
║ POSICIONAMENTO                                   ║
║ Diferencial   : [ângulo único]                   ║
║ Promessa      : [1 frase]                        ║
║ Exclusões     : [assuntos a evitar]              ║
╚══════════════════════════════════════════════════╝
\`\`\`

**Pedir validação**: "Esta ficha representa bem o seu projeto? Quer modificar algo antes de passarmos ao plano?"

**Hard gate**: NÃO continuar sem validação explícita do usuário.

---

## Etapa 3 — Estrutura & Plano

### 3a. Propor títulos (se ainda não definido)

Gerar **5 opções** com ângulos diferentes:

| # | Ângulo | Formato |
|---|--------|---------|
| 1 | Resultado direto | "[Resultado concreto] em [duração]" |
| 2 | Método/sistema | "O método [nome] para [objetivo]" |
| 3 | Contrarian | "Por que [crença comum] é falso (e o que fazer no lugar)" |
| 4 | Específico + número | "[N] [ações] para [resultado] — O guia [tipo]" |
| 5 | Transformação | "De [situação A] para [situação B]: [método]" |

Cada título tem um subtítulo. Pedir ao usuário para escolher ou combinar.

**Hard gate**: NÃO continuar sem título validado.

### 3b. Construir o plano detalhado

> Ler \`references/product-types.md\` para a estrutura exigida conforme o tipo.

Para cada seção do plano, indicar:

\`\`\`
SEÇÃO [N] — [Título]
  Objetivo      : [o que o leitor saberá/fará depois]
  Subseções     :
    - [h3 #1]
    - [h3 #2]
    - [h3 #3]
    - [h3 #4]
    - [h3 #5]
  Enriquecimentos previstos:
    - [ ] Exercício prático
    - [ ] Template pronto para copiar
    - [ ] Estudo de caso concreto
    - [ ] Checklist de ação
  Palavras est. : [1500-2500]
  Páginas est.  : [~4-7 páginas]
\`\`\`

**Pedir validação**: "Este plano está bom? Quer adicionar, remover ou reorganizar?"

### 3c. Contador de páginas

Após o plano, exibir um resumo de volume:

\`\`\`
ESTIMATIVA DE VOLUME
════════════════════

Seções principais   : [N] × ~2000 palavras     = [total] palavras
Header + Intro      :                           ~1500 palavras
Troubleshooting     :                           ~1500 palavras
Plano de ação       :                           ~1500 palavras
Anexos (templates)  :                           ~3000 palavras
Palavra final       :                           ~500 palavras
──────────────────────────────────────────────────────────────
TOTAL ESTIMADO      : ~[total] palavras ≈ [páginas] páginas
                      (1 página ≈ 350 palavras)

OBJETIVO  : [60 páginas mín. para playbook / 30+ para guide / 10+ para lead-magnet]
STATUS    : [✅ OK / ⚠️ Insuficiente — faltam ~X páginas]
\`\`\`

**Se o volume for insuficiente**: propor adicionar seções ou enriquecer, nunca inflar artificialmente.

**Hard gate playbook**: O plano DEVE atingir ≥ 60 páginas estimadas. Se < 60, iniciar a etapa de enriquecimento.

### 3d. Enriquecimento (apenas playbook)

Se o tipo for \`playbook\` e o volume < 60 páginas, propor sistematicamente:

\`\`\`
ENRIQUECIMENTO — Seu playbook tem ~[N] páginas. Para um produto premium
de 60+ páginas, proponho adicionar:

□ Exercícios práticos (1-2 por seção)              → +[N] páginas
  Instrução + exemplo + espaço de resposta + critérios de sucesso

□ Templates prontos para copiar e colar            → +[N] páginas
  Scripts, emails, mensagens, frameworks visuais

□ Estudos de caso concretos                        → +[N] páginas
  Casos reais com resultados, etapas e lições

□ Checklists de ação por seção                     → +[N] páginas
  Resumo acionável em formato checklist

□ FAQ extensa (20-30 perguntas)                    → +[N] páginas

□ Glossário dos termos-chave                       → +[N] páginas

□ Recursos recomendados                            → +[N] páginas
  Livros, ferramentas, formações, comunidades

Quais você quer adicionar?
\`\`\`

Atualizar o plano e o contador após as escolhas.

### 3e. Validação seção por seção (opcional)

Propor: "Quer detalhar cada seção antes de eu começar, ou o plano geral já é suficiente?"

Se sim, para cada seção perguntar:
- "O que você quer absolutamente incluir?"
- "Você tem exemplos, anedotas ou dados?"
- "Há frameworks ou métodos específicos?"

---

## Etapa 4 — Redação

### 4a. Carregar as referências (silencioso)

\`\`\`
Read references/design-system.md   → CSS completo
Read references/voice-guide.md     → Tom e estilo
Read references/quality-gates.md   → Regras a nunca violar
Read references/example-section.md → para ver um exemplo de seção completa
\`\`\`

Se existir um playbook de referência em \`ebook pt-br/\` ou \`ebook en/\`, lê-lo também para absorver o estilo.

### 4b. Escrever por grupos

**Regra**: NÃO escrever tudo de uma vez (exceto modo express ou pedido explícito).

\`\`\`
Grupo 1: Header + Sumário + Introdução
  → Apresentar ao usuário → Validação

Grupo 2: Seções 1-3
  → Apresentar → "Continuamos? Quer ajustar?"

Grupo 3: Seções 4-6 (se aplicável)
  → Apresentar → Validação

Grupo 4: Seções restantes + Troubleshooting + Plano de ação

Grupo 5: Anexos + Palavra final

EXCEÇÃO: Se o usuário disser "escreve tudo" / "eu confio em você" / modo express
  → Escrever tudo sem pausas
\`\`\`

### 4c. Padrão de seção (obrigatório)

Cada seção h2 segue ESTE padrão NESTA ordem:

\`\`\`html
<section class="section" id="[kebab-case-unico]">
  <h2>[Título]</h2>

  <div class="value-block">
    <h4>O que você vai aprender</h4>
    <p>[1-2 frases concretas — SEM "nesta seção vamos..."]</p>
  </div>

  <h3>[Subseção 1]</h3>
  <p>[Conteúdo — acionável, específico, voz DP Criador]</p>

  <h3>[Subseção 2]</h3>
  <p>[Conteúdo com template/script/checklist se aplicável]</p>

  <!-- ... 3-7 subseções h3 no máximo ... -->

  <!-- Se uma ferramenta for pertinente (NÃO obrigatório) -->
  <div class="tools-block">
    <h4>Ferramenta recomendada</h4>
    <ul>
      <li><span class="tool-id">T[N]</span> - <strong>[Nome]</strong> — [por que]</li>
    </ul>
  </div>

  <div class="recap-block">
    <h4>O que reter</h4>
    <ul class="single-item">
      <li>[Ponto-chave 1 — acionável]</li>
      <li>[Ponto-chave 2 — acionável]</li>
      <li>[Ponto-chave 3 — acionável]</li>
    </ul>
  </div>
</section>
\`\`\`

### 4d. Qualidade do conteúdo — 4 critérios por seção

| Critério | Pergunta a se fazer | Falta = |
|----------|---------------------|---------|
| **O QUÊ** | O que o leitor vai fazer concretamente? | Conteúdo teórico inútil |
| **POR QUÊ** | Por que é importante? O que acontece se ele pular esta etapa? | Motivação faltando |
| **COMO** | As etapas exatas, o script, o template, a checklist | Conselho vago inaplicável |
| **MEDIDA** | Como saber se funcionou? Qual KPI ou sinal? | Sem feedback loop |

### 4e. Regras de voz

> Ler \`references/voice-guide.md\` para o guia completo.

**Resumo rápido:**

| Fazer | NÃO fazer |
|-------|-----------|
| Tutelar sistematicamente | "Nós", "a gente", voz passiva |
| Ações específicas ("Envie 20 DMs/dia") | Conselhos vagos ("contate pessoas") |
| Caveats honestos ("depende do seu nicho") | Promessas garantidas |
| Frases curtas para impacto | Parágrafos-muro |
| Templates prontos para copiar | "Crie seu próprio template" sem exemplo |
| Transições de ação ("Agora, passe para...") | "Na próxima seção, vamos..." |

---

## Etapa 5 — Quality Check (Pré-Entrega)

> Ler \`references/scoring-system.md\` para a metodologia completa.
> Ler \`references/quality-gates.md\` para as hard rules.

### 5a. Quality Gates — Verificação estrita

Antes de entregar, verificar CADA gate. Se um gate Critical falhar, corrigir antes da entrega.

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder ([TODO], [INSERT], Lorem ipsum) | Critical |
| QG-02 | Nenhuma promessa de receita garantida | Critical |
| QG-03 | Cada h2 tem um value-block E um recap-block | Critical |
| QG-04 | Mínimo de palavras por seção respeitado: playbook ≥ 1500 palavras/seção, guide ≥ 800, lead-magnet ≥ 400 | High |
| QG-05 | Nenhuma seção > 3000 palavras sem h3 de divisão | High |
| QG-06 | **Playbook: 60+ páginas (≥ 21000 palavras). Guide: 30+ páginas (≥ 10000 palavras). Lead-magnet: 10+ páginas (≥ 3500 palavras).** | Critical |
| QG-07 | Cada ação tem um COMO (etapas, script, template) | Critical |
| QG-08 | Sem CSS/JS externo (exceto Google Fonts) | Critical |
| QG-09 | Todos os links do sumário apontam para IDs existentes | Critical |
| QG-10 | Playbook: pelo menos 1 exercício, template ou checklist a cada 2 seções | High |
| QG-11 | As cores da marca são aplicadas ao CSS (--color-primary, --color-accent) | High |
| QG-12 | HTML válido (tags fechadas, estrutura correta) | Critical |

### 5b. Checklist Pré-Entrega

\`\`\`
ANTES DE ENTREGAR, verificar:

Estrutura:
  [ ] HTML válido e bem formado
  [ ] Todos os IDs de seção únicos e em kebab-case
  [ ] Sumário com links funcionais para cada seção
  [ ] CSS completo embutido em <style>
  [ ] Atributo lang="pt-br" ou lang="en" correto
  [ ] <title> descritivo
  [ ] Estilos de impressão (@media print) incluídos

Conteúdo:
  [ ] ZERO placeholder, TODO ou [texto entre colchetes]
  [ ] Cada seção tem value-block + recap-block
  [ ] Cada seção responde ao O QUÊ / POR QUÊ / COMO / MEDIDA
  [ ] Pelo menos 1 template/script/checklist a cada 3 seções
  [ ] Voz DP Criador respeitada (direto, action-first, honesto)
  [ ] Sem fluff motivacional
  [ ] Caveats honestos onde necessário
  [ ] Contagem de palavras atingida para o tipo de produto

Técnico:
  [ ] Arquivo salvo no caminho correto com o nome correto
  [ ] Pasta criada se necessário
  [ ] Sem conflito com arquivo existente
\`\`\`

### 5c. Score de Qualidade

Calcular e exibir o score:

\`\`\`
QUALITY SCORE: [XX]/100

Estrutura    : [XX]/20  (S01-S09)
Conteúdo     : [XX]/30  (C01-C08)
Voz & Tom    : [XX]/15  (V01-V06)
Completude   : [XX]/20  (K01-K08)
Legibilidade : [XX]/15  (R01-R05)

Problemas:
  Critical : [N] (devem ser corrigidos)
  High     : [N] (fortemente recomendado)
  Medium   : [N] (a considerar)
  Low      : [N] (nice to have)
\`\`\`

**Hard gate**: Se score < 75 ou se houver issues Critical, corrigir antes da entrega.

---

## Etapa 6 — Entrega

### 6a. Montar e salvar

\`\`\`
Caminho de saída:
  PT-BR → ebook pt-br/[slug]-PT.html
  EN    → ebook en/[slug]-EN.html

Slug: título em minúsculas, espaços → hífens, sem caracteres especiais.
Criar a pasta se não existir.
\`\`\`

### 6b. Apresentar o entregável

\`\`\`
✅ EBOOK CRIADO — Score: [XX]/100

📄 Arquivo  : [caminho completo]
📌 Título   : [título final]
📦 Tipo     : [playbook/guide/lead-magnet/...]
📊 Seções   : [N] seções principais
📝 Palavras : ~[estimativa] palavras
📖 Páginas  : ~[estimativa] páginas (≥ 60 para playbook)
🌐 Língua   : [PT-BR/EN]

SCORE DE QUALIDADE:
  Estrutura    [██████████░░] 85/100
  Conteúdo     [████████████] 92/100
  Voz          [█████████░░░] 78/100
  Completude   [███████████░] 88/100
  Legibilidade [██████████░░] 82/100

PRÓXIMOS PASSOS:
  → /dp-playbook-audit    Auditoria de qualidade aprofundada
  → /dp-export-pdf        Converter em PDF vendável
  → /dp-ebook-cover       Criar a capa
  → /dp-landing-page      Criar a página de vendas
  → /dp-lead-magnet-create Criar um lead magnet associado
  → /dp-email-sequence    Sequência de email de lançamento
\`\`\`

---

## Tratamento de Erros

> Ler \`references/error-handling.md\` para a tabela completa.

| Cenário | Ação |
|---------|------|
| Sem ideia de assunto | Perguntas de descoberta guiadas |
| Assunto muito amplo | Propor 3-5 subnichos |
| Expertise insuficiente | Sugerir guide/checklist em vez de playbook |
| Mudança no meio do caminho | Atualizar ficha + plano, reescrever seções impactadas |
| Arquivo existente com mesmo slug | Pedir confirmação antes de sobrescrever |
| business-profile.md ausente | Continuar com as respostas do context intake |
| Playbook de referência ausente | Usar o CSS de references/design-system.md |

---

## Sistema de Referência de Ferramentas

Usar quando pertinente nos tools-blocks. NÃO forçar um tools-block em cada seção.

| ID | Ferramenta | Uso |
|----|-----------|-----|
| T1 | ClickUp | Gestão de projeto |
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

## Integração Entre Skills

| Após playbook-create | Skill seguinte | Quando |
|----------------------|----------------|--------|
| Verificar a qualidade | \`/dp-playbook-audit\` | Sempre recomendado |
| Traduzir PT↔EN | \`/dp-playbook-sync\` | Se bilíngue |
| Converter em PDF | \`/dp-export-pdf\` | Antes de colocar à venda |
| Capa | \`/dp-ebook-cover\` | Antes de colocar à venda |
| Página de vendas | \`/dp-landing-page\` | Para vender |
| Lead magnet associado | \`/dp-lead-magnet-create\` | Para capturar emails |
| Sequência de email | \`/dp-email-sequence\` | Para o lançamento |
| Publicidade | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para aquisição |
| Conteúdo social | \`/dp-social-caption\` \`/dp-mediaplan\` | Para promoção orgânica |

---

# Design System — CSS do Ebook DP Criador

## Uso

Este CSS usa **CSS custom properties** (variáveis) para permitir a personalização das cores da marca. Substituir os valores em \`:root\` pelas cores escolhidas pelo usuário.

## Personalização das cores

As variáveis a adaptar conforme a identidade visual do cliente:

\`\`\`css
:root {
  /* --- CORES DA MARCA (a personalizar) --- */
  --color-primary: #111111;         /* Cor principal — títulos, destaques fortes */
  --color-accent: #22c55e;          /* Cor de destaque — CTA, highlights */
  --color-accent-light: #f0fdf4;    /* Destaque muito claro — fundo dos blocos */
  --color-accent-dark: #166534;     /* Destaque escuro — texto sobre fundo destaque */
  --color-accent-mid: #16a34a;      /* Destaque médio — labels, h4 dentro dos blocos */

  /* --- CORES SISTEMA (raramente modificadas) --- */
  --color-text: #1a1a1a;            /* Texto principal */
  --color-text-secondary: #333;     /* Texto secundário */
  --color-text-muted: #888;         /* Texto discreto (labels h4) */
  --color-bg: #ffffff;              /* Fundo da página */
  --color-bg-subtle: #fafafa;       /* Fundo sutil (sumário, hover) */
  --color-border: #e5e5e5;          /* Bordas */
  --color-border-light: #f0f0f0;    /* Bordas leves */

  /* --- BLOCOS — Cores secundárias --- */
  --color-tools-bg: #eff6ff;        /* Fundo tools-block */
  --color-tools-border: #3b82f6;    /* Borda tools-block */
  --color-tools-text: #1e40af;      /* Texto tools-block */
  --color-tools-label: #2563eb;     /* Label tools-block */

  --color-recap-bg: #fefce8;        /* Fundo recap-block */
  --color-recap-border: #eab308;    /* Borda recap-block */
  --color-recap-text: #854d0e;      /* Texto recap-block */
  --color-recap-label: #a16207;     /* Label recap-block */
}
\`\`\`

### Paletas pré-configuradas por estilo

**Minimalista (padrão)** — Preto + verde, clean
\`\`\`css
--color-primary: #111111;
--color-accent: #22c55e;
\`\`\`

**Bold** — Contrastes fortes, energia
\`\`\`css
--color-primary: #1e1e1e;
--color-accent: #f43f5e;         /* Rosa vibrante */
--color-accent-light: #fff1f2;
--color-accent-dark: #9f1239;
--color-accent-mid: #e11d48;
\`\`\`

**Premium** — Sóbrio, elegante, confiança
\`\`\`css
--color-primary: #1e3a5f;        /* Azul noite */
--color-accent: #d4a853;         /* Dourado */
--color-accent-light: #fdf8ef;
--color-accent-dark: #92722a;
--color-accent-mid: #b8942e;
\`\`\`

**Warm** — Tons quentes, acolhedor
\`\`\`css
--color-primary: #3d2c1e;        /* Marrom profundo */
--color-accent: #e07a3a;         /* Laranja terra */
--color-accent-light: #fef3ec;
--color-accent-dark: #9a4a14;
--color-accent-mid: #c4621e;
\`\`\`

### Gerar uma paleta customizada a partir de 2 cores

Se o usuário der apenas uma cor primária e um destaque:

\`\`\`
--color-primary:      [cor fornecida]
--color-accent:       [destaque fornecido]
--color-accent-light: [destaque a 5% de opacidade sobre branco]
--color-accent-dark:  [destaque escurecido 40%]
--color-accent-mid:   [destaque escurecido 20%]
\`\`\`

## CSS Completo (com variáveis)

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --color-primary: #111111;
  --color-accent: #22c55e;
  --color-accent-light: #f0fdf4;
  --color-accent-dark: #166534;
  --color-accent-mid: #16a34a;
  --color-text: #1a1a1a;
  --color-text-secondary: #333;
  --color-text-muted: #888;
  --color-bg: #ffffff;
  --color-bg-subtle: #fafafa;
  --color-border: #e5e5e5;
  --color-border-light: #f0f0f0;
  --color-tools-bg: #eff6ff;
  --color-tools-border: #3b82f6;
  --color-tools-text: #1e40af;
  --color-tools-label: #2563eb;
  --color-recap-bg: #fefce8;
  --color-recap-border: #eab308;
  --color-recap-text: #854d0e;
  --color-recap-label: #a16207;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.7;
  color: var(--color-text);
  background: var(--color-bg);
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* --- Tipografia --- */
h1 { font-size: 2.2rem; font-weight: 800; line-height: 1.15; margin-bottom: 0.5rem; letter-spacing: -0.03em; color: var(--color-primary); }
h2 { font-size: 1.6rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1rem; letter-spacing: -0.02em; color: var(--color-primary); border-bottom: 2px solid var(--color-primary); padding-bottom: 0.5rem; }
h3 { font-size: 1.15rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.5rem; color: var(--color-primary); }
h4 { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: 0.5rem; }

p { margin-bottom: 1rem; color: var(--color-text-secondary); }
strong { font-weight: 600; color: var(--color-primary); }

/* --- Listas --- */
ul, ol { margin: 0.75rem 0 1.25rem 1.5rem; }
li { margin-bottom: 0.4rem; color: var(--color-text-secondary); }
ul.single-item { list-style: none; margin-left: 0; }
ul.single-item li { padding: 0.5rem 0; border-bottom: 1px solid var(--color-border-light); }
ul.single-item li:last-child { border-bottom: none; }

/* --- Value Block (abertura de seção) --- */
.value-block {
  background: var(--color-accent-light);
  border-left: 4px solid var(--color-accent);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
}
.value-block h4 { color: var(--color-accent-mid); }
.value-block p { color: var(--color-accent-dark); margin-bottom: 0; }

/* --- Tools Block (recomendação de ferramentas) --- */
.tools-block {
  background: var(--color-tools-bg);
  border-left: 4px solid var(--color-tools-border);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
}
.tools-block h4 { color: var(--color-tools-label); }
.tools-block p, .tools-block li { color: var(--color-tools-text); }

/* --- Recap Block (fechamento de seção) --- */
.recap-block {
  background: var(--color-recap-bg);
  border-left: 4px solid var(--color-recap-border);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
}
.recap-block h4 { color: var(--color-recap-label); }
.recap-block li { color: var(--color-recap-text); }

/* --- Layout --- */
.section { margin-bottom: 3rem; }
.ebook { max-width: 100%; }

/* --- Sumário --- */
.sommaire {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 1.5rem 2rem;
  margin: 2rem 0 3rem;
}
.sommaire-title { font-size: 1.1rem; border-bottom: none; margin-top: 0; padding-bottom: 0; }
.sommaire ol { counter-reset: sommaire; list-style: none; margin-left: 0; }
.sommaire li { counter-increment: sommaire; padding: 0.3rem 0; }
.sommaire li::before { content: counter(sommaire, decimal-leading-zero); font-weight: 700; color: var(--color-text-muted); margin-right: 0.75rem; font-size: 0.85rem; }
.sommaire a { color: var(--color-primary); text-decoration: none; border-bottom: 1px solid var(--color-border); transition: border-color 0.2s; }
.sommaire a:hover { border-color: var(--color-primary); }

/* --- Badges de Ferramenta --- */
.tool-id {
  display: inline-block;
  background: var(--color-primary);
  color: var(--color-bg);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  margin-right: 0.25rem;
  vertical-align: middle;
}

/* --- Impressão / Otimização PDF --- */
@media print {
  body { max-width: 100%; padding: 0; font-size: 11pt; }
  .section { page-break-inside: avoid; }
  h2 { page-break-after: avoid; }
  .value-block, .tools-block, .recap-block { page-break-inside: avoid; }
  .sommaire { page-break-after: always; }
  .sommaire a { border-bottom: none; }
  .tool-id { background: #333; }
}

/* --- Responsivo --- */
@media (max-width: 640px) {
  body { padding: 1rem; }
  h1 { font-size: 1.7rem; }
  h2 { font-size: 1.3rem; }
  .sommaire { padding: 1rem 1.25rem; }
}
\`\`\`

## Guia de Uso dos Blocos

| Bloco | Variável de cor | Quando usar |
|-------|----------------|-------------|
| \`.value-block\` | \`--color-accent-*\` | Abertura de cada seção h2 — o que o leitor vai aprender |
| \`.tools-block\` | \`--color-tools-*\` | Quando uma ferramenta/software é recomendado para a seção |
| \`.recap-block\` | \`--color-recap-*\` | Fechamento de cada seção h2 — 3 pontos-chave a reter |

## Template HTML Mínimo

\`\`\`html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Título] — [Marca]</title>
  <style>
    /* COLAR O CSS ACIMA */
    /* SUBSTITUIR AS VARIÁVEIS :root PELAS CORES DO CLIENTE */
  </style>
</head>
<body>
  <article class="ebook">
    <header class="section" id="inicio">
      <h1>[Título]</h1>
      <p>[Subtítulo]</p>
    </header>
    <nav class="sommaire" aria-label="Sumário">
      <h2 class="sommaire-title">Sumário</h2>
      <ol>
        <li><a href="#inicio">Leia isso primeiro</a></li>
        <!-- ... -->
      </ol>
    </nav>
    <main>
      <!-- Seções -->
    </main>
  </article>
</body>
</html>
\`\`\`

---

# Tratamento de Erros — Playbook Create

## Cenários e ações

| Cenário | Detecção | Ação |
|---------|----------|------|
| Usuário sem ideia de assunto | Resposta vaga ou "não sei" | Iniciar as perguntas de descoberta de ideia (ver Etapa 1 — casos particulares) |
| Assunto muito amplo | Ex: "o marketing" | Propor 3-5 subnichos específicos. Pedir para escolher. |
| Assunto muito nichado | Ex: "email marketing para dentistas pediátricos em zona rural" | Validar que o público é suficiente. Sugerir um alargamento se necessário. |
| Expertise insuficiente | Usuário diz "estou começando nesse assunto" | Propor formato \`guide\` ou \`checklist\` em vez de \`playbook\`. Sugerir curar conteúdo existente. |
| Sem diferenciação | "Não sei o que me torna diferente" | Fazer perguntas sobre: trajetória, resultados obtidos, método usado, erros evitados. Extrair o ângulo único. |
| Mudança de direção durante a redação | Usuário quer modificar o assunto/ângulo após a Etapa 2 | Atualizar a ficha do produto. Identificar as seções impactadas. Reescrever apenas o que muda. |
| Arquivo HTML existente para sobrescrever | Um arquivo com o mesmo slug já existe | Pedir confirmação antes de sobrescrever. Propor um sufixo (-v2, -atualizado). |
| Conteúdo existente fornecido pelo usuário | Usuário cola texto ou aponta para um arquivo | Analisar o conteúdo. Identificar pontos fortes/fracos. Integrar na estrutura DP Criador em vez de começar do zero. |
| Língua mista | Usuário fala português mas quer um ebook em inglês | Redigir na língua alvo. Fazer as perguntas na língua do usuário. |
| Pedido de conteúdo ilegal/enganoso | Promessas de renda garantida, afirmações médicas, etc. | Recusar educadamente. Explicar os riscos legais. Propor uma formulação adequada (quality gate QG-02). |
| Timeout / conversa longa | Ebook em andamento há mais de 10 trocas | Propor salvar o estado atual e continuar depois. Escrever as seções terminadas no arquivo. |
| business-profile.md não encontrado | O arquivo não existe na raiz | Continuar sem. Fazer as perguntas de contexto de negócio diretamente ao usuário. |

## Degradação graciosa

| Recurso faltando | Fallback |
|-----------------|---------|
| \`business-profile.md\` | Fazer as perguntas de contexto diretamente |
| Playbook de referência (ebook pt-br/ ou ebook en/) | Usar o design system embutido em \`references/design-system.md\` |
| Pasta de saída inexistente (ebook pt-br/, ebook en/) | Criar a pasta automaticamente antes de escrever |
| Título não definido | Propor 5 opções antes de continuar |
| Língua não especificada | Detectar a língua da conversa. Confirmar com o usuário. |

---

# Exemplo de Seção Completa — DP Criador

> **Produto:** Playbook do Coach Fitness (R$ 197)
> **Nicho:** Coaching fitness
> **Público:** Coaches fitness iniciantes
> **Voz:** Direta, motivadora, no-bullshit, tutear
> **Cores:** #059669 (primária) / #10b981 (destaque)

---

Abaixo, o HTML completo de uma seção de playbook pronta para integrar.

\`\`\`html
<section class="section" id="encontrar-seus-primeiros-clientes">

  <h2>Encontrar seus 10 primeiros clientes (sem anúncios, sem audiência, sem enrolação)</h2>

  <div class="value-block" style="border-left: 4px solid #059669; background: #f0fdf4; padding: 24px; margin-bottom: 32px; border-radius: 8px;">
    <p style="font-weight: 700; font-size: 1.15em; color: #059669; margin-bottom: 12px;">
      O que você vai aprender nesta seção:
    </p>
    <ul style="line-height: 1.8;">
      <li>O método exato para identificar 50 prospects qualificados em menos de 2 horas</li>
      <li>O script de prospecção por DM que converte a 15-20% (testado em mais de 300 mensagens)</li>
      <li>Como definir seu preço de lançamento sem desvalorizar e sem assustar os prospects</li>
      <li>O sistema de acompanhamento ultra-simples para não perder nenhum lead (com ferramenta gratuita)</li>
      <li>Os 3 erros que derrubam 90% dos coaches no primeiro mês — e como evitá-los</li>
    </ul>
  </div>

  <h3>1. Defina seu cliente ideal em 15 minutos</h3>

  <p>
    Antes de enviar uma única mensagem, você precisa saber <strong>exatamente</strong> com quem está falando.
    Não "pessoas que querem emagrecer". Isso é falar com todo mundo — portanto, com ninguém.
  </p>
  <p>
    Seu cliente ideal é <strong>uma pessoa específica</strong> com um problema específico, um orçamento específico e uma urgência específica.
  </p>

  <p>
    Por que isso é inegociável? Porque quando você escreve um DM para "todo mundo", você escreve um DM que <em>ninguém</em> lê. Os coaches que sofrem para encontrar clientes têm todos o mesmo problema: sua mensagem não ressoa com ninguém porque é genérica demais.
  </p>
  <p>
    Um coach que mira "homens de 30-40 anos, sedentários há mais de 2 anos, que querem recuperar energia para brincar com os filhos" converte <strong>3 a 5 vezes mais</strong> do que um coach que mira "pessoas que querem se exercitar mais".
  </p>

  <p>Aqui estão as 5 perguntas que você precisa responder:</p>
  <ol>
    <li><strong>Quem é ele/ela?</strong> — Idade, sexo, situação profissional/pessoal, nível esportivo atual.</li>
    <li><strong>Qual é o problema nº 1?</strong> — A dor que sente hoje, nas palavras dele/dela.</li>
    <li><strong>O que já tentou?</strong> — Academia? Apps? Dietas? Por que não funcionou?</li>
    <li><strong>Que resultado quer em 90 dias?</strong> — Seja preciso: "perder 8 kg" supera "emagrecer".</li>
    <li><strong>Onde está online?</strong> — Instagram? Facebook? LinkedIn? Grupos específicos?</li>
  </ol>

  <p>
    <strong>Indicador de sucesso:</strong> Você deve conseguir descrever seu cliente ideal em 2 frases para qualquer pessoa, sem hesitar. Se gaguejar ou disser "bem, na verdade é quase todo mundo", recomece.
  </p>

  <h3>2. Encontre 50 prospects qualificados em 2 horas</h3>

  <p>
    Agora que sabe quem procura, precisa encontrá-los. O objetivo aqui é concreto: uma lista de 50 nomes com link para o perfil no Instagram ou Facebook. Não 10, não 20. <strong>50.</strong>
  </p>

  <p>
    Por que 50? Faça o cálculo:
  </p>
  <ul>
    <li>50 prospects contatados</li>
    <li>~30% respondem = 15 conversas</li>
    <li>~15-20% convertem = <strong>7 a 10 clientes</strong></li>
  </ul>
  <p>
    Não é mágica, é matemática. Por isso 50 é o mínimo. Abaixo disso, você está jogando na sorte.
  </p>

  <p>Aqui estão suas 4 fontes para encontrar essas 50 pessoas:</p>

  <p><strong>Fonte 1 — Grupos do Facebook do seu nicho</strong></p>
  <p>
    Procure grupos como "Emagrecimento depois dos 30", "Pais esportistas", "Motivação para emagrecer". Entre em 5-8 grupos. Identifique as pessoas que <em>fazem perguntas</em> ou <em>compartilham suas dificuldades</em>. Esses são seus prospects. Anote o nome.
  </p>

  <p><strong>Fonte 2 — Comentários em posts fitness do Instagram</strong></p>
  <p>
    Vá aos perfis de grandes influenciadores fitness (100k+ seguidores). Leia os comentários. Quem escreve "eu queria tanto conseguir" ou "como você faz isso?" são prospects. Visite o perfil, verifique se corresponde ao seu cliente ideal.
  </p>

  <p><strong>Fonte 3 — Hashtags locais</strong></p>
  <p>
    Se quer atender localmente: #emagrecimentosaopaulo, #coachesportivocuritiba, etc. Quem posta o início de sua jornada muitas vezes está aberto a um acompanhamento.
  </p>

  <p><strong>Fonte 4 — Sua rede pessoal</strong></p>
  <p>
    Seja honesto: você já conhece 5-10 pessoas que poderiam se interessar ou que conhecem alguém. Não as ignore por medo de "misturar o pessoal e o profissional". É justamente aí que a confiança é mais forte.
  </p>

  <p>
    <strong>Indicador de sucesso:</strong> Você tem uma planilha com 50 linhas. Cada linha contém: nome, link do perfil, fonte (onde encontrou) e uma nota de 1 linha explicando por que essa pessoa é um bom prospect.
  </p>

  <h3>3. O script de DM que converte a 15-20%</h3>

  <p>
    Vou dar um script exato, testado em mais de 300 envios, com taxa de resposta de 30% e taxa de conversão de 15-20%.
  </p>

  <p>
    Por que um script? Porque sem ele, acontece o seguinte: você passa 20 minutos redigindo uma mensagem, relê 8 vezes, pensa "não, está ruim", apaga, e no final não envia nada. O script elimina a paralisia. Você copia, adapta 2-3 palavras, envia. Feito.
  </p>

  <div class="template-block" style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 24px; margin: 24px 0;">
    <p style="font-weight: 700; font-size: 1.1em; color: #059669; margin-bottom: 16px;">
      TEMPLATE COPIA-COLA: 4 scripts de DM de prospecção
    </p>

    <p><strong>Variação 1 — A abordagem por comentário</strong> (usar quando viu um post/comentário do prospect)</p>
    <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; font-style: italic;">
      Oi [nome]! Vi seu comentário sobre [assunto] em [grupo/post]. Você tem razão, [reformular o problema em 1 frase]. Eu ajudo justamente [descrição do cliente ideal] a [resultado principal] em [duração]. Se quiser, posso te explicar como funciona em 5 min. Sem compromisso, só uma conversa.
    </div>

    <p><strong>Variação 2 — A abordagem de valor direto</strong> (usar em cold DM)</p>
    <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; font-style: italic;">
      Oi [nome], vi seu perfil e tenho impressão que você está começando a se interessar por fitness. Sou coach e ajudo [cliente ideal] a [resultado] sem [objeção comum]. Tenho um horário essa semana para uma call de descoberta gratuita de 15 min — a gente olha sua situação juntos e dou 2-3 dicas concretas, seja ou não para trabalharmos juntos. Topa?
    </div>

    <p><strong>Variação 3 — A abordagem de oferta de lançamento</strong> (usar nas 2 primeiras semanas)</p>
    <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; font-style: italic;">
      Oi [nome]! Estou lançando meu programa de coaching para [cliente ideal] e procuro 5 pessoas motivadas para testar o método com preço de lançamento (-40%). A ideia: você obtém [resultado] em [duração], e em troca me dá seu feedback honesto. Tem interesse? Posso te contar mais.
    </div>

    <p><strong>Variação 4 — A abordagem de conteúdo gratuito</strong> (a mais suave, ideal se você é tímido)</p>
    <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; font-style: italic;">
      Oi [nome]! Acabei de criar um mini-guia gratuito "Os 5 erros que impedem [cliente ideal] de [resultado]". Estou enviando para algumas pessoas para ter feedbacks antes de publicar. Quer que eu te mande? É 100% gratuito, sem compromisso.
    </div>

    <p style="font-size: 0.9em; color: #666;">
      <strong>Dica:</strong> Comece pela Variação 1 (maior taxa de resposta pois é personalizada). Use a Variação 3 para seus 5 primeiros clientes. A Variação 4 é seu plano B se sentir muita resistência.
    </p>
  </div>

  <p>
    <strong>Indicador de sucesso:</strong> Você envia no mínimo 10 DMs por dia durante 5 dias. Anota na planilha: mensagem enviada (sim/não), resposta recebida (sim/não), call agendada (sim/não), convertido (sim/não). Após 5 dias, calcula suas taxas.
  </p>

  <h3>4. Defina seu preço de lançamento (sem desvalorizar)</h3>

  <p>
    O pricing é o assunto que paralisa 80% dos coaches iniciantes. Coloca muito caro e ninguém compra, coloca muito barato e se vê trabalhando por R$ 30 a hora. Vamos resolver isso agora.
  </p>

  <p>
    O bom preço de lançamento faz 3 coisas ao mesmo tempo: atrai clientes, permite viver e deixa margem para aumentar depois. É um equilíbrio, não um palpite.
  </p>

  <p>Aqui está a fórmula:</p>
  <ol>
    <li><strong>Calcule seu valor hora mínimo:</strong> sua meta de renda mensal / (número de horas de coaching por mês). Exemplo: R$ 5.000 / 40h = R$ 125/h mínimo.</li>
    <li><strong>Estime o tempo por cliente:</strong> call inicial (1h) + acompanhamento semanal (30 min x 4) + programa personalizado (2h) = 5h/mês por cliente.</li>
    <li><strong>Preço mínimo por cliente/mês:</strong> 5h x R$ 125 = R$ 625/mês.</li>
    <li><strong>Aplique o fator de lançamento:</strong> -30% para seus 5 primeiros clientes = R$ 437/mês.</li>
    <li><strong>Após 5 clientes:</strong> suba para R$ 625, depois R$ 750, depois R$ 875 a cada 3-5 clientes.</li>
  </ol>

  <p>
    <strong>Caveat honesto:</strong> Esse preço de lançamento é temporário. Não fique no -30% por 6 meses "porque tem medo de aumentar". Defina uma data. Após o 5º cliente ou após 30 dias (o que vier primeiro), volta ao preço normal. Ponto.
  </p>

  <p>
    <strong>Indicador de sucesso:</strong> Você tem um preço escrito em preto e branco. Anunciou para pelo menos 3 prospects sem se desculpar. Se você se desculpa pelo preço, ele é alto demais (refaça o cálculo) ou você falta confiança (releia a seção 1 sobre seu cliente ideal — você resolve um problema real).
  </p>

  <h3>5. O acompanhamento que transforma prospect em cliente pagante</h3>

  <p>
    Você enviou seus DMs. Alguns responderam, outros não. Alguns disseram "interessante, volto a falar", depois nada. Bem-vindo à realidade da prospecção. A boa notícia: <strong>80% das vendas acontecem entre o 2º e o 5º contato</strong>. A má notícia: 90% dos coaches desistem após a 1ª mensagem.
  </p>

  <p>
    O acompanhamento não é assédio. É persistência profissional. Seu prospect não ignorou sua mensagem porque te odeia. Ignorou porque estava ocupado, distraído ou ainda não pronto. Seu trabalho é estar lá quando estiver pronto.
  </p>

  <p><strong>O sistema de follow-up 3-7-14:</strong></p>
  <ul>
    <li><strong>D+3:</strong> Follow-up suave. "Oi [nome], queria só confirmar que você viu minha mensagem. Sem pressão, me diz só se tem interesse ou não."</li>
    <li><strong>D+7:</strong> Follow-up de valor. Envie uma dica gratuita relacionada ao problema dele. "A propósito, vi que você falou sobre [problema]. Aqui vai algo rápido que funciona bem: [dica]."</li>
    <li><strong>D+14:</strong> Última mensagem. "Oi [nome], essa é minha última mensagem sobre o assunto. Se o coaching interessar um dia, sabe onde me encontrar. Enquanto isso, boa sorte com [objetivo]!"</li>
  </ul>
  <p>
    Após D+14, sem mais follow-up. Você passa para o próximo. Esse prospect pode voltar em 3 meses, pode nunca voltar. Em qualquer caso, você terá sido profissional.
  </p>

  <p>
    <strong>Indicador de sucesso:</strong> Sua taxa de resposta global (primeira mensagem + follow-ups) atinge 40-50%. Se estiver abaixo de 30%, revise seus scripts. Se estiver acima de 50%, você está no caminho certo — continue.
  </p>

  <div class="tools-block">
    <h4>Ferramenta recomendada</h4>
    <ul>
      <li><span class="tool-id">T5</span> - <strong>Notion</strong> — CRM gratuito para iniciantes: crie uma tabela com 6 colunas (Nome, Link perfil, Status, Data último contato, Próxima ação, Notas) e atualize diariamente.</li>
    </ul>
  </div>

  <div class="recap-block">
    <h4>O que reter</h4>
    <ul class="single-item">
      <li><strong>A prospecção é um jogo de volume:</strong> 50 prospects = 15 conversas = 7-10 clientes. Se não chegou aos 10, é porque não contatou gente suficiente.</li>
      <li><strong>O script elimina o medo:</strong> Pare de reinventar a mensagem a cada vez. Pegue um script, adapte, envie. A perfeição é inimiga da ação.</li>
      <li><strong>O follow-up faz a diferença:</strong> 80% das vendas acontecem após o primeiro contato. Se desistir após uma mensagem sem resposta, está deixando dinheiro na mesa.</li>
    </ul>
  </div>

</section>
\`\`\`

---

## Notas para o skill DP Criador

Este arquivo serve de referência para o padrão de seção. Cada seção deve incluir:

1. **Value block** na abertura (promessa concreta)
2. **5 subseções** estruturadas O QUÊ / POR QUÊ / COMO / MEDIDA
3. **Pelo menos 1 exercício** com instrução, exemplo, espaço de resposta e critérios
4. **Pelo menos 1 template** copia-cola com variações
5. **1 checklist de ação** (5-7 itens)
6. **1 tools block** (recomendação de ferramenta)
7. **1 recap block** (3 takeaways)

A voz DP Criador usa o tutear, números precisos, caveats honestos e zero jargão de marketing inútil.

---

# Tipos de Produto — Especificações e Requisitos

## Matriz de Tipos

| Tipo | Palavras | Páginas | Seções | Faixa de Preço | Objetivo | Profundidade |
|------|----------|---------|--------|---------------|----------|-------------|
| \`playbook\` | 21000+ | **60+** | 10-14 | R$ 97-297 | Produto premium, método completo | Especialista |
| \`guide\` | 10000-17000 | **30-50** | 6-8 | R$ 27-97 | Foco em um assunto preciso | Intermediário |
| \`lead-magnet\` | 3500-5000 | **10-15** | 3-5 | Gratuito | Captação de email, prova de valor | Superfície + teaser |
| \`worksheet\` | 7000-14000 | **20-40** | 5-10 exercícios | R$ 27-67 | Prática, autoavaliação | Prático |
| \`checklist\` | 3500-7000 | **10-20** | 3-8 categorias | Gratuito-R$ 27 | Referência rápida, ação imediata | Condensado |
| \`toolkit\` | 10000-21000 | **30-60** | 5-10 ferramentas | R$ 67-197 | Coleção de templates e recursos | Utilitário |

> **Conversão**: 1 página ≈ 350 palavras (formato A4, fonte 11pt, entrelinha 1.6)

## Estrutura por tipo

### Playbook (produto premium)

\`\`\`
OBRIGATÓRIO:
├── Header — "Leia isso primeiro" (para quem / não para quem / regras / modo de uso)
├── Sumário — links ativos
├── Introdução — problema, promessa, organização
├── Seções 1-N — conteúdo principal (value/tools/recap blocks)
├── Troubleshooting — problemas frequentes + soluções
├── Plano de ação — calendário dia a dia ou passo a passo
├── Anexos — templates, scripts, checklists, glossário
└── Palavra final — próximo passo + CTA

CADA SEÇÃO CONTÉM:
├── value-block (abertura)
├── 3-7 subseções h3
├── Pelo menos 1 template, script ou checklist
├── tools-block (se pertinente)
└── recap-block (3 takeaways)
\`\`\`

**Critérios de qualidade premium:**
- Cada seção responde a O QUÊ / POR QUÊ / COMO / MEDIDA
- Scripts e templates prontos para copiar e colar
- Exemplos concretos da experiência do autor
- Progressão lógica: fundação → ação → otimização
- Personalização: o leitor adapta à SUA situação

### Guide (intermediário)

\`\`\`
OBRIGATÓRIO:
├── Header — intro rápida (quem, o quê, por que)
├── Sumário
├── Seções 1-N — conteúdo principal
├── 1-2 templates ou checklists
└── CTA final

CADA SEÇÃO CONTÉM:
├── value-block (abertura)
├── 3-5 subseções h3
├── tools-block (se pertinente)
└── recap-block (3 takeaways)
\`\`\`

**Critérios:**
- Mais focado que um playbook — um assunto, em profundidade
- Menos anexos, mais ação direta
- CTA para o playbook completo ou produto seguinte

### Lead Magnet (gratuito)

\`\`\`
OBRIGATÓRIO:
├── Hook — gancho + promessa forte
├── Seções 1-5 — conteúdo concentrado, valor imediato
└── CTA — para o produto pago (obrigatório, não negociável)

PROIBIDO:
├── Sem enchimento — cada palavra deve contar
├── Sem "teasing vazio" — dar valor real
└── Sem seções fracas — qualidade constante
\`\`\`

**Estratégia:**
- Dar o suficiente para criar confiança e provar expertise
- NÃO dar tudo — o produto pago vai mais longe
- O CTA final explica POR QUÊ o produto pago é o próximo passo lógico
- Proporção: 80% valor gratuito / 20% transição para o pago

### Worksheet (caderno de exercícios)

\`\`\`
ESTRUTURA POR EXERCÍCIO:
├── Instrução clara (1-3 frases)
├── Exemplo preenchido (mostra o resultado esperado)
├── Espaço de resposta (linhas, tabela ou lista para preencher)
├── Critérios de sucesso (como saber se está correto)
└── Transição para o próximo exercício
\`\`\`

**Critérios:**
- Progressão lógica (cada exercício constrói sobre o anterior)
- Sem parágrafos longos — instruções claras e curtas
- Exemplos realistas, não genéricos

### Checklist (lista de ações)

\`\`\`
ESTRUTURA:
├── Intro (1-2 frases — contexto e modo de uso)
├── Categorias com caixas de seleção
│   ├── ☐ Item 1 — nota explicativa curta (1 linha no máximo)
│   ├── ☐ Item 2 — nota explicativa curta
│   └── ...
└── Resumo / próximo passo
\`\`\`

**Critérios:**
- Ultra-escaneável — sem prosa
- Cada item = 1 ação concreta
- Categorias lógicas (por fase, por prioridade, por tema)

### Toolkit (caixa de ferramentas)

\`\`\`
ESTRUTURA POR FERRAMENTA/TEMPLATE:
├── Nome da ferramenta/template
├── Quando usar (contexto, situação)
├── Como usar (instruções, 3-5 etapas)
├── Template pronto para uso (copiar e colar)
├── Exemplo preenchido
└── Dicas e erros comuns
\`\`\`

**Critérios:**
- Formato utilitário, não narrativo
- Índice de referência rápida no início
- Cada ferramenta é autônoma (não precisa ler as outras)

---

# Quality Gates — Playbook Create

## Hard Rules (Nunca Violar)

| Gate | Regra | Justificativa |
|------|-------|--------------|
| QG-01 | Nunca incluir texto placeholder (\`[TODO]\`, \`[INSERT]\`, \`[EXAMPLE]\`, Lorem ipsum) | Destrói a credibilidade. Compradores esperam produtos acabados. |
| QG-02 | Nunca prometer renda ou receita específica garantida | Risco legal. Use "resultados variam" + caveats honestos. |
| QG-03 | Toda seção h2 DEVE ter um value-block E um recap-block | Consistência estrutural. O leitor sabe o que vai aprender e reter. |
| QG-04 | Nenhuma seção abaixo de 300 palavras (playbook) / 200 palavras (guide) / 100 palavras (lead-magnet) | Seções finas sinalizam pouco esforço. Combine ou expanda. |
| QG-05 | Nenhuma seção acima de 2000 palavras sem subseções (h3) | Parede de texto = leitor abandona. Divida em partes digestíveis. |
| QG-06 | Máximo 7 subseções h3 por seção h2 | Sobrecarga cognitiva. Divida em 2 seções se > 7. |
| QG-07 | Toda afirmação acionável deve incluir o COMO (etapas, script, template) | "Seja autêntico" sem etapas é um conselho inútil. |
| QG-08 | Sem dependências externas de CSS ou JS (exceto Google Fonts) | Arquivo autônomo. Deve renderizar offline + na conversão para PDF. |
| QG-09 | Todos os links do sumário devem apontar para IDs existentes | TOC quebrado = não profissional. Verifique todas as âncoras. |
| QG-10 | Nunca usar voz passiva nas etapas de ação | "Envie 20 DMs" e não "DMs devem ser enviados". Só endereçamento direto. |
| QG-11 | Nenhum parágrafo com mais de 5 linhas / 80 palavras | Legibilidade. Parágrafos curtos para leitura digital. |
| QG-12 | O CTA em lead-magnets deve referenciar o produto pago específico | Lead magnet sem CTA = oportunidade perdida. |
| QG-13 | O arquivo deve passar na validação HTML (tags bem formadas, elementos fechados) | HTML quebrado = exportação PDF quebrada. |
| QG-14 | Afirmações de preço devem corresponder ao business-profile.md se existir | Consistência entre todos os outputs. |

## Regras de Aviso (Sinalizar mas Não Bloquear)

| Gate | Regra | Ação |
|------|-------|------|
| WG-01 | A seção não tem tools-block | Sinalizar: "Considere adicionar recomendações de ferramentas se aplicável" |
| WG-02 | Recap-block tem menos de 3 takeaways | Sinalizar: "Mire exatamente 3 takeaways por seção" |
| WG-03 | Conteúdo soa acadêmico/formal | Sinalizar: "Reescreva na voz DP Criador (direto, estilo mentor)" |
| WG-04 | Mais de 2 seções consecutivas sem lista ou template | Sinalizar: "Adicione variedade visual — checklist, script ou template" |
| WG-05 | Sem estilos de impressão no CSS | Sinalizar: "Adicione @media print para exportação PDF" |

---

# Sistema de Scoring — Avaliação de Qualidade do Playbook

## Fórmula do Score

\`\`\`
S_total = Σ(check_score × W_severity × W_category) / Σ(max_score × W_severity × W_category) × 100
\`\`\`

Resultado: **Score de Qualidade 0-100**

## Interpretação do Score

| Score | Classificação | Ação |
|-------|--------------|------|
| 90-100 | Excelente | Pronto para publicar |
| 75-89 | Bom | Polimento menor necessário, publicável |
| 60-74 | Precisa de Trabalho | Melhorias significativas necessárias |
| 40-59 | Fraco | Reescrita maior necessária |
| 0-39 | Reprovado | Reiniciar ou reestruturação fundamental |

## Categorias e Pesos

| Categoria | Peso | O que mede |
|-----------|------|-----------|
| Estrutura | 20% | Validade HTML, conformidade com padrão de seção, links do sumário |
| Qualidade do Conteúdo | 30% | Acionabilidade, especificidade, O QUÊ/POR QUÊ/COMO/MEDIDA |
| Voz & Tom | 15% | Voz DP Criador, sem fluff, endereçamento direto, tom de mentor |
| Completude | 20% | Todas as seções obrigatórias presentes, sem placeholders, contagem de palavras |
| Legibilidade | 15% | Comprimento dos parágrafos, uso de listas, variedade visual, escaneabilidade |

## Multiplicadores de Severidade

| Severidade | Multiplicador | Critério |
|-----------|--------------|---------|
| Critical | 5.0 | Bloqueia publicação. Texto placeholder, HTML quebrado, seções faltando. |
| High | 3.0 | Impacta significativamente a qualidade. Conteúdo fino, voz errada, sem CTAs. |
| Medium | 1.5 | Oportunidade de otimização. Poderia ser melhor, publicável como está. |
| Low | 0.5 | Nice to have. Melhorias menores, preferências de estilo. |

## Verificações Individuais

### Estrutura (20%)
| ID | Verificação | Severidade | Critério de Aprovação |
|----|------------|------------|----------------------|
| S01 | Estrutura HTML válida | Critical | DOCTYPE, html, head, body, article.ebook |
| S02 | CSS embutido | Critical | Design system completo em tag \`<style>\` |
| S03 | IDs de seção únicos | Critical | Sem IDs duplicados, todos em kebab-case |
| S04 | Links do sumário válidos | Critical | Todo \`<a href="#id">\` aponta para ID existente |
| S05 | Value-block por seção | High | Toda seção h2 abre com .value-block |
| S06 | Recap-block por seção | High | Toda seção h2 fecha com .recap-block |
| S07 | Atributo lang definido | Medium | \`<html lang="pt-br">\` ou \`<html lang="en">\` |
| S08 | Tag title descritiva | Medium | \`<title>\` contém o nome do produto |
| S09 | Estilos de impressão incluídos | Low | Regras @media print presentes |

### Qualidade do Conteúdo (30%)
| ID | Verificação | Severidade | Critério de Aprovação |
|----|------------|------------|----------------------|
| C01 | Sem texto placeholder | Critical | Zero instâncias de [TODO], [INSERT], Lorem ipsum |
| C02 | O QUÊ definido | High | Cada seção define o que o leitor vai FAZER |
| C03 | POR QUÊ definido | High | Cada seção explica POR QUÊ é importante |
| C04 | COMO definido | Critical | Cada seção tem etapas/script/template/checklist |
| C05 | MEDIDA definida | Medium | Cada seção tem KPI ou sinal de sucesso |
| C06 | Ações específicas | High | "Envie 20 DMs/dia" e não "contate pessoas" |
| C07 | Templates incluídos | Medium | Pelo menos 1 template copia-cola a cada 3 seções |
| C08 | Caveats honestos | Medium | Avisos de "resultados variáveis" onde aplicável |

### Voz & Tom (15%)
| ID | Verificação | Severidade | Critério de Aprovação |
|----|------------|------------|----------------------|
| V01 | Endereçamento direto (você/tu) | High | Sem "nós", sem "a gente", sem passiva |
| V02 | Sem fluff motivacional | High | Zero "Você consegue!", "Acredite em você!" |
| V03 | Sem tom acadêmico | Medium | Zero "Convém notar", "É importante ressaltar" |
| V04 | Sem sopa de buzzwords | Medium | Zero "alavancar sinergias", "otimizar o ROI" |
| V05 | Frases action-first | Medium | Começar com o ponto, depois explicar |
| V06 | Parágrafos curtos | Medium | Máx. 5 linhas / 80 palavras por parágrafo |

### Completude (20%)
| ID | Verificação | Severidade | Critério de Aprovação |
|----|------------|------------|----------------------|
| K01 | Contagem de palavras atingida | High | playbook ≥5000, guide ≥3000, lead-magnet ≥1500 |
| K02 | Contagem de seções atingida | High | playbook 8-12, guide 5-7, lead-magnet 3-5 |
| K03 | Seção header presente | Critical | "Leia isso primeiro" ou "Read This First" |
| K04 | TOC presente | High | Sumário com links funcionais |
| K05 | CTA presente (lead-magnet) | Critical | CTA claro para produto pago |
| K06 | Anexos presentes (playbook) | Medium | Templates, scripts, checklists |
| K07 | Plano de ação presente (playbook) | Medium | Calendário dia a dia ou passo a passo |
| K08 | Troubleshooting presente (playbook) | Low | Problemas comuns + soluções |

### Legibilidade (15%)
| ID | Verificação | Severidade | Critério de Aprovação |
|----|------------|------------|----------------------|
| R01 | Variedade de listas | Medium | Pelo menos 1 lista a cada 500 palavras |
| R02 | Inclusão de template/script | Medium | Pelo menos 1 a cada 3 seções |
| R03 | Subseções h3 | High | 3-7 por seção h2 |
| R04 | Blocos visuais usados | Medium | Blocos value/tools/recap presentes |
| R05 | Sem paredes de texto | High | Nenhuma seção sem listas, blocos ou quebras |

---

# Guia de Voz & Tom — DP Criador

## Eixos de Voz (escala 1-10)

| Eixo | Posição | Descrição |
|------|---------|-----------|
| Formalidade | 3/10 | Informal mas profissional. Como um mentor, não um professor. |
| Expertise | 8/10 | Sabe do que fala. Sem pedantismo. |
| Energia | 6/10 | Dinâmico sem ser exaltado. Sem "!!!". |
| Empatia | 7/10 | Entende as dificuldades do leitor. Sem condescendência. |
| Diretividade | 9/10 | Diz exatamente o que fazer. Sem ambiguidade. |
| Honestidade | 9/10 | Admite os limites. Sem promessas vazias. |

## Padrões de escrita

### O hook de seção
\`\`\`
❌ "Nesta seção, vamos explorar as diferentes formas de..."
❌ "É importante entender que..."
✅ "Você está perdendo clientes porque sua oferta parece igual a todas as outras. Veja como se diferenciar em 30 minutos."
✅ "A prospecção é um jogo de números. Aqui estão os números que importam."
\`\`\`

### A instrução de ação
\`\`\`
❌ "Seria benéfico considerar o envio de mensagens diretas."
❌ "Pense em contatar seus prospects regularmente."
✅ "Envie 20 DMs por dia. Não 5. Não 10. Vinte."
✅ "Abra o Notion. Crie uma tabela com 3 colunas: Prospect, Data, Status."
\`\`\`

### O caveat honesto
\`\`\`
❌ "Os resultados são garantidos se você seguir o programa."
❌ (nada — sem aviso)
✅ "Funciona sempre? Não. Depende do seu nicho, do seu preço e da sua capacidade de executar. Mas é o método que dá os melhores resultados com o menor esforço."
✅ "Atenção: se sua oferta não está clara, nenhuma quantidade de DMs vai salvá-la. Volte para a Seção 2."
\`\`\`

### A transição entre seções
\`\`\`
❌ "Agora que vimos X, passemos para Y."
❌ "O próximo capítulo vai tratar de..."
✅ "Sua oferta está clara. Sua mensagem está pronta. Hora de colocá-la na frente das pessoas certas."
✅ "Você sabe o que dizer. Agora, para quem dizer."
\`\`\`

## Palavras proibidas

| Categoria | Proibidas | Alternativas |
|-----------|-----------|-------------|
| Fluff motivacional | "Você consegue!", "Acredite em você", "Nunca desista" | (remover — sem alternativa) |
| Vago | "Seja autêntico", "Agregue valor", "Seja proativo" | Dar a ação específica |
| Acadêmico | "Convém", "Cabe notar que", "Segundo estudos" | Enunciar o fato diretamente |
| Jargão vazio | "Alavancar", "Sinergias", "Ecossistema", "Paradigma" | Usar a palavra simples |
| Superlativos vazios | "Incrível", "Extraordinário", "Revolucionário" | Dar o número ou o resultado |
| Passivo | "DMs devem ser enviados", "Recomenda-se" | "Envie DMs", "Faça X" |

## Palavras encorajadas

| Categoria | Exemplos |
|-----------|---------|
| Ação direta | "Faça", "Envie", "Crie", "Abra", "Escreva", "Lance" |
| Especificidade | "20 DMs/dia", "em 14 dias", "3 etapas", "script de 4 linhas" |
| Honestidade | "Depende de", "Resultados variáveis", "Sem milagre" |
| Concreto | "Template pronto para copiar", "Checklist em 5 pontos", "Script exato" |
| Transição de ação | "Agora", "Próxima etapa", "Passe para" |

## Regras de formatação

1. **Parágrafos**: 4-5 linhas no máximo. Se mais longo, cortar.
2. **Listas**: Preferir listas com marcadores para etapas e ações.
3. **Negrito**: Para palavras-chave e pontos de atenção. Não para frases inteiras.
4. **Itálico**: Raramente. Para citações ou nuances.
5. **Maiúsculas**: Nunca frases em CAPS completo. NUNCA.
6. **Emojis**: Não no corpo do texto. Aceitável nos títulos h4 de blocos.
7. **Perguntas retóricas**: Máx. 1 por seção. Apenas para nomear um sentimento do leitor.
`,
};

export default skill;
