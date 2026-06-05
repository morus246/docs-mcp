import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-copy-review",
  categoria: "Análise e Qualidade",
  descricao: "Auditoria e otimização de qualquer copy de marketing: anúncios, emails, landing pages, posts sociais, páginas de venda. Score em 6 dimensões, feedback linha por linha, versão otimizada entregue. Verifica conformidade legal, coerência de marca e tom DP Criador. Gatilhos: copy, review, revisar, otimizar, reler, corrigir, copywriting, revisão de anúncio, revisão de email.",
  argumentHint: "[texto ou arquivo] [--type ad|email|landing-page|social|sales-page|blog] [--lang pt|en]",
  allowedTools: ["Read", "Edit", "Bash", "Glob"],
  conteudo: `# Copy Review — Auditoria e Otimização de Copy de Marketing

<!-- v2.0.0 | 2026-04-13 | Refonte complète : context intake, scoring 0-100, brand consistency, quality gates, error handling, cross-skill integration -->

Copywriter sênior e revisor de marketing do DP Criador. Audita qualquer texto de marketing — score em 6 dimensões, feedback linha por linha, versão otimizada entregue pronta para uso.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-copy-review [texto]\` | Revisar copy colado diretamente na mensagem |
| \`/dp-copy-review [arquivo]\` | Revisar um arquivo (HTML, MD, TXT) |
| \`/dp-copy-review [texto] --type ad\` | Revisar como um anúncio (Meta/Google) |
| \`/dp-copy-review [texto] --type email\` | Revisar como um email de marketing |
| \`/dp-copy-review [arquivo] --apply\` | Revisar E aplicar as correções diretamente |
| \`/dp-copy-review --brand-check [texto]\` | Foco apenas na coerência de marca |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Scorecard em 6 dimensões (score 0-100)
├── Diagnóstico: PUBLICAR / REVISAR / REESCREVER
├── Feedback linha por linha (problemas + correções)
├── Versão otimizada completa (pronta para copiar e colar)
└── Verificação de conformidade legal
\`\`\`

---

## Processo

\`\`\`
0. Carregar contexto   → business-profile.md + identidade visual
1. Coleta de contexto  → Identificar o copy, o tipo, o objetivo
2. Classificar         → Detecção automática do tipo e da língua
3. Score em 6 dimensões → Clareza, Persuasão, CTA, Voz, Estrutura, Conformidade
4. Linha por linha     → Feedback detalhado com correções
   Ler references/before-after-examples.md → para 2 reviews antes/depois
5. Otimizar            → Versão reescrita completa
6. Verificação de marca → Coerência de identidade visual e marca
7. Entrega             → Relatório + versão otimizada
\`\`\`

---

## Etapa 0 — Carregamento de Contexto (Silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair:
    - Nome de marca / identidade
    - Produto(s) e preços
    - Público-alvo
    - Tom e voz
    - Cores de marca (primária, destaque)
    - Termos proibidos / terminologia preferida
  → Usar como referência para coerência de marca

SENÃO:
  → Continuar sem. A revisão se baseia nas boas práticas gerais.
\`\`\`

---

## Etapa 1 — Coleta de Contexto

### 1a. Identificar o copy a revisar

\`\`\`
SE \$ARGUMENTS contém um caminho de arquivo:
  → Ler o arquivo
SE \$ARGUMENTS contém texto diretamente:
  → Usar esse texto
SE \$ARGUMENTS está vazio:
  → Perguntar: "Cole o texto a revisar ou me dê o caminho do arquivo."
\`\`\`

### 1b. Perguntas se o contexto estiver incompleto (máx. 2-3)

| # | Pergunta | Quando |
|---|----------|--------|
| Q1 | O que é esse copy? (anúncio, email, landing page, post social, página de vendas, blog) | Tipo não detectável automaticamente |
| Q2 | Para qual público? E qual é o objetivo? (comprar, clicar, se inscrever) | Não está claro pelo conteúdo |
| Q3 | Você tem restrições específicas? (limite de caracteres, plataforma, tom desejado) | Para anúncios ou posts sociais |

---

## Etapa 2 — Classificação Automática

| Sinal | Tipo detectado |
|-------|----------------|
| Menção de "Ad", curto (<300 chars), CTA único | \`ad\` |
| Linha de assunto, preview text, P.S. | \`email\` |
| Seção hero, pricing, FAQ, depoimentos | \`landing-page\` |
| Hashtags, @menções, muito curto | \`social-post\` |
| Página longa, objeções, garantia, múltiplos CTAs | \`sales-page\` |
| H1, H2s, parágrafos longos, SEO | \`blog\` |
| Seção HTML com value-block/recap-block | \`playbook-section\` |

Detectar também o idioma: PT (tutoiement, acentos) vs. EN ("you", estrutura em inglês).

---

## Etapa 3 — Score em 6 Dimensões

### Escala de conversão

| Score 1-10 | Score /100 | Interpretação |
|-----------|-----------|---------------|
| 9-10 | 90-100 | Excelente — pronto para publicar |
| 7-8 | 70-89 | Bom — correções menores |
| 5-6 | 50-69 | Médio — revisão necessária |
| 3-4 | 30-49 | Fraco — reescrita recomendada |
| 1-2 | 10-29 | Crítico — reescrita obrigatória |

### Dimensão 1 — CLAREZA (0-17 pontos)

O leitor entende a mensagem em 5 segundos?

| Critério | Pontos |
|---------|--------|
| Mensagem principal identificável imediatamente | 5 |
| Sem jargão inexplicado | 4 |
| Frases curtas e diretas | 4 |
| Uma única ideia por parágrafo | 4 |

Problemas a identificar: trechos confusos, frases complexas, ambiguidades, jargão.

### Dimensão 2 — PERSUASÃO (0-17 pontos)

O copy dá vontade de agir?

| Critério | Pontos |
|---------|--------|
| Problema do leitor claramente identificado | 4 |
| Solução apresentada de forma concreta | 4 |
| Provas / credibilidade (números, resultados, depoimentos) | 5 |
| Urgência ou razão para agir agora | 4 |

Problemas a identificar: argumentos fracos, falta de provas, claims vagos, sem diferenciação.

### Dimensão 3 — CTA (0-17 pontos)

O apelo à ação é claro, convincente e único?

| Critério | Pontos |
|---------|--------|
| CTA presente e visível | 5 |
| CTA único (sem CTAs concorrentes) | 4 |
| CTA orientado ao benefício (não apenas "Clique aqui") | 4 |
| CTA posicionado no lugar certo | 4 |

Problemas a identificar: CTA ausente, múltiplos CTAs, CTA fraco, CTA enterrado.

### Dimensão 4 — VOZ & MARCA (0-17 pontos)

O copy soa como a marca? É coerente com a identidade?

| Critério | Pontos |
|---------|--------|
| Tom DP Criador respeitado (direto, anti-BS, ação em primeiro lugar) | 5 |
| Sem voz passiva nas instruções | 3 |
| Sem filler words ou fluff motivacional | 3 |
| Terminologia coerente com o restante dos conteúdos | 3 |
| Coerência com as cores/identidade de marca (se aplicável) | 3 |

Problemas a identificar: muito formal, muito hipérbole, voz passiva, palavras de enchimento, incoerência de marca.

### Dimensão 5 — ESTRUTURA (0-16 pontos)

O copy é escaneável, bem formatado e tem o tamanho certo?

| Critério | Pontos |
|---------|--------|
| Escaneável (títulos, listas, espaçamento) | 4 |
| Comprimento apropriado para o formato | 4 |
| Hook na primeira linha | 4 |
| Progressão lógica (problema → solução → ação) | 4 |

Problemas a identificar: parágrafos longos, sem quebras de linha, comprimento inadequado, sem hook.

### Dimensão 6 — CONFORMIDADE (0-16 pontos)

O copy está legalmente seguro?

| Critério | Pontos |
|---------|--------|
| Nenhuma promessa de receita garantida | 5 |
| Nenhuma urgência falsa sem fundamento | 3 |
| Disclaimer presente se há claims de resultados | 4 |
| Conforme às políticas da plataforma (Meta, Google, etc.) | 4 |

Problemas a identificar: income claims, falsa raridade, depoimentos sem disclaimer, palavras banidas.

### Cálculo do score global

\`\`\`
COPY REVIEW SCORECARD
======================
Clareza      : [XX]/17
Persuasão    : [XX]/17
CTA          : [XX]/17
Voz/Marca    : [XX]/17
Estrutura    : [XX]/16
Conformidade : [XX]/16
─────────────────────
TOTAL        : [XX]/100

Status: PUBLICAR (≥85) / REVISAR (60-84) / REESCREVER (<60)
\`\`\`

---

## Etapa 4 — Feedback Linha por Linha

Para cada problema encontrado:

\`\`\`
PROBLEMA [N] — [Severidade: Crítico/Aviso/Sugestão]
  Trecho   : "[texto original]"
  Problema : [o que está errado]
  Correção : "[texto corrigido]"
  Motivo   : [explicação breve]
\`\`\`

Classificar por severidade:
1. **Crítico** — Conformidade, erros factuais, CTA ausente → bloquear a publicação
2. **Aviso** — Voz incorreta, estrutura fraca, persuasão insuficiente → corrigir antes de publicar
3. **Sugestão** — Otimizações, estilo, nuances → nice to have

---

## Etapa 5 — Versão Otimizada

Reescrever o copy inteiro com todas as correções aplicadas.

\`\`\`
VERSÃO OTIMIZADA
==================
[Copy completo reescrito — pronto para copiar e colar]
\`\`\`

**Regra**: A versão otimizada é COMPLETA. Sem "manter o restante como está".

---

## Etapa 6 — Verificação de Coerência de Marca

Se business-profile.md foi carregado, verificar:

| Verificação | Detalhe |
|-------------|---------|
| Nome de marca | Usado corretamente, ortografia exata |
| Preço | Coerente com o perfil (sem preço inventado) |
| Público | O copy se dirige ao público certo |
| Tom | Corresponde ao tom definido no perfil |
| Cores (se HTML) | As cores usadas correspondem à identidade visual |
| Terminologia | Usa os termos preferidos, evita os termos proibidos |

Sinalizar qualquer incoerência como issue de tipo Aviso.

---

## Etapa 7 — Entregável Final

\`\`\`
COPY REVIEW CONCLUÍDO

Tipo    : [ad/email/landing-page/social/sales-page/blog]
Idioma  : [PT/EN]
Palavras: [contagem]
Score   : [XX]/100 — [PUBLICAR/REVISAR/REESCREVER]

SCORECARD:
  Clareza      [██████████░░] 14/17
  Persuasão    [████████░░░░] 12/17
  CTA          [████████████] 17/17
  Voz/Marca    [█████████░░░] 13/17
  Estrutura    [██████████░░] 13/16
  Conformidade [████████████] 16/16

PROBLEMAS: [total]
  Crítico  : [N]
  Aviso    : [N]
  Sugestão : [N]

PRÓXIMOS PASSOS:
  → Aplicar as correções (se arquivo: "Quer que eu aplique?")
  → /dp-playbook-section  Reescrever uma seção de ebook
  → /dp-playbook-audit    Auditoria completa de um ebook
\`\`\`

Se o copy veio de um arquivo, propor: "Quer que eu aplique as correções diretamente no arquivo?"

---

## Critérios por Tipo de Conteúdo

### Anúncios (Meta / Google)

- [ ] O hook para o scroll (teste da primeira linha)
- [ ] Dentro dos limites de caracteres da plataforma
- [ ] Um único CTA claro
- [ ] Sem palavras banidas (políticas Meta/Google)
- [ ] Preço mencionado (transparência)
- [ ] Nenhuma promessa de receita
- [ ] Direção visual coerente

### Emails

- [ ] Assunto cria curiosidade (< 50 caracteres)
- [ ] Preview text complementa o assunto (sem repetição)
- [ ] Abre com hook, não com "Olá"
- [ ] Parágrafos curtos (leitura mobile)
- [ ] Um CTA, repetido 2-3 vezes
- [ ] P.S. presente e útil
- [ ] De: pessoal (não corporativo)

### Landing Pages

- [ ] Hero comunica o valor em 5 segundos
- [ ] Preço visível (não escondido)
- [ ] Provas de confiança presentes
- [ ] FAQ aborda as objeções reais
- [ ] Todos os botões → mesmo destino
- [ ] Estrutura responsiva para mobile
- [ ] Meta tags de SEO presentes

### Posts Sociais

- [ ] Hook na primeira linha (antes do "...ver mais")
- [ ] Comprimento adequado à plataforma
- [ ] Hashtags relevantes (sem spam)
- [ ] CTA presente
- [ ] Sugestão visual incluída

### Blog

- [ ] H1 contém a palavra-chave principal
- [ ] Meta description < 160 caracteres
- [ ] Palavra-chave nos 100 primeiros palavras
- [ ] H2s miram variações da palavra-chave
- [ ] CTA integrado naturalmente
- [ ] Valor standalone (não apenas promocional)

---

## Checklist de Voz DP Criador

### Sinais de alerta a detectar

| Padrão | Problema | Correção |
|--------|----------|----------|
| Voz passiva: "Os resultados podem ser obtidos" | Fraco, impessoal | "Você vai obter resultados" |
| Enchimento: "É importante notar que" | Inútil | Remover |
| Hedging: "talvez", "poderia", "eventualmente" | Falta de convicção | Comprometer-se ou remover |
| Hype: "revolucionário", "game-changing", "segredo" | Zero credibilidade | Substituir por um claim específico |
| Genérico: "agregar valor", "ser autêntico" | Vazio de sentido | Substituir por uma ação específica |
| Buzzwords: "alavancar", "sinergia", "otimizar" | Linguagem corporativa | Linguagem simples |
| Fluff motivacional: "Você consegue!", "Acredite em você" | Não acionável | Remover ou substituir por uma instrução |

### Obrigatório

- Números específicos quando possível
- Verbos de ação (enviar, reservar, fechar, medir)
- Endereçamento direto ("você")
- Ressalvas honestas quando apropriado

---

## Regras de Conformidade

### Jamais deve aparecer

| Proibido | Exemplo |
|----------|---------|
| Garantia de receita | "Ganhe R$ 10K/mês" |
| Promessas irrealistas | "100 clientes em uma semana" |
| Urgência falsa | "Só 3 vagas!" (se falso) |
| Raridade falsa | "Oferta limitada" que se renova |
| Depoimentos atípicos sem disclaimer | Resultados excepcionais apresentados como normais |
| Claims não verificáveis | Estatísticas inventadas |

### Deve SEMPRE aparecer (se aplicável)

- "Os resultados variam" ou disclaimer equivalente
- Transparência sobre o preço
- Identificação clara do produto (produto digital / ebook / etc.)
- Descrição honesta do conteúdo incluído

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Os problemas de conformidade são SEMPRE prioridade Crítica | Crítico |
| QG-02 | A versão otimizada é COMPLETA — sem "manter o restante" | Crítico |
| QG-03 | O score é honesto — um 95/100 é raro. A maioria dos primeiros rascunhos fica entre 50-70. | Crítico |
| QG-04 | Sempre fornecer a correção, não apenas o diagnóstico | Crítico |
| QG-05 | Se o copy já é bom, dizer isso. Não inventar problemas. | Alto |
| QG-06 | Verificar coerência com business-profile.md se disponível | Alto |
| QG-07 | Verificar coerência de identidade visual (cores, tipografia) para conteúdo HTML | Médio |
| QG-08 | Os preços mencionados devem corresponder ao perfil do negócio | Crítico |
| QG-09 | Score >= 80 e zero issue Crítico = PUBLICAR. Score 60-79 = REVISAR. Score < 60 = REESCREVER. | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Nenhum copy fornecido | Pedir claramente: "Cole o texto ou me dê um caminho de arquivo." |
| Arquivo não encontrado | Usar \`Glob\` para buscar. Propor os arquivos encontrados. |
| Copy muito curto (< 10 palavras) | Revisar mesmo assim mas sinalizar: "Difícil avaliar a persuasão com tão pouco texto." |
| Copy muito longo (> 5000 palavras) | Propor dividir por seção ou focar nas áreas-chave. |
| Tipo de conteúdo ambíguo | Perguntar ao usuário. Propor o tipo mais provável. |
| Idioma misturado (PT + EN) | Sinalizar como problema. Perguntar o idioma alvo. |
| business-profile.md ausente | Continuar sem brand check. Mencionar que a verificação seria mais precisa com um perfil. |
| O copy é excelente | Dizer isso francamente. Score alto. Apenas algumas sugestões menores. |

---

## Integração com Outros Skills

| Antes do copy-review | Skill anterior | Quando |
|----------------------|----------------|--------|
| Criar um ebook | \`/dp-playbook-create\` | O copy é uma seção de ebook |
| Criar um anúncio | \`/dp-ad-angles-meta\` | O copy é um anúncio Meta |
| Escrever um email | \`/dp-email-sequence\` | O copy é um email |

| Após o copy-review | Próximo skill | Quando |
|--------------------|---------------|--------|
| Reescrever uma seção | \`/dp-playbook-section\` | Seção de ebook com score baixo |
| Auditar o ebook completo | \`/dp-playbook-audit\` | Para uma verificação mais ampla |
| Sincronizar PT/EN | \`/dp-playbook-sync\` | O copy corrigido precisa ser traduzido |
| Criar a landing page | \`/dp-landing-page\` | O copy está validado, pronto para a página |

---

# Referência — Exemplos Antes/Depois

## Academia FitPro — O Playbook do Coach Fitness (R$ 197)

---

## REVIEW 1 — Meta Ad (versão fraca)

### Copy Original

\`\`\`
🏋️ Você quer se tornar coach fitness? 🏋️                         ← [1]

Nosso treinamento completo te ensina tudo o que você precisa    ← [2]
saber para ter sucesso no mundo do coaching esportivo.

Com mais de 10 anos de experiência na área, criamos o guia     ← [3]
definitivo que vai te permitir transformar sua paixão
em profissão.

O Playbook do Coach Fitness contém:                             ← [4]
✅ Dicas para encontrar clientes
✅ Estratégias para gerenciar seu negócio
✅ Templates para suas redes sociais
✅ E muito mais!

Aproveite nossa oferta excepcional por apenas R$ 197 !!!        ← [5]
👉 Clique aqui para saber mais 👇
\`\`\`

### Scores — Versão Original

| Dimensão | Score | Comentário |
|----------|-------|------------|
| Clareza | 4/10 | Mensagem vaga, sem proposta de valor específica |
| Persuasão | 3/10 | Sem prova, sem dor identificada |
| CTA | 3/10 | "Clique aqui para saber mais" = zero urgência, zero especificidade |
| Voz | 5/10 | Mistura de tons, genérico |
| Estrutura | 5/10 | Lista com marcadores OK mas hook inexistente, sem hierarquia clara |
| Conformidade | 6/10 | Emojis excessivos, triple exclamação, "guia definitivo" = claim vago |
| **TOTAL** | **4,3/10** | |

### Feedback Linha por Linha

**Problema 1 — Hook inexistente [linha 1]**
"Você quer se tornar coach fitness?" é uma pergunta fechada que não prende ninguém. Quem está rolando o feed não tem motivo para parar. O hook deve provocar uma emoção ou um "sou eu que estou descrito aí". Os emojis de halterofilismo dos dois lados são decorativos e não acrescentam nada.

**Correção**: Substituir por hook focado na dor/desejo específico. Ex: "Você tem o diploma de coach fitness mas a agenda está vazia?"

**Problema 2 — Proposta de valor vaga [linha 2]**
"Te ensina tudo o que você precisa saber" não diz nada concreto. É o que todo treinamento promete. O prospect não sabe O QUE VAI OBTER de forma concreta. "Ter sucesso no mundo do coaching esportivo" é jargão vazio.

**Correção**: Dar um resultado mensurável. Ex: "O sistema para sair do zero e conquistar 10 clientes em 60 dias."

**Problema 3 — Argumento de autoridade mal posicionado [linha 3]**
"Mais de 10 anos de experiência" é um argumento centrado no vendedor, não no cliente. Em um anúncio Meta, ninguém se interessa pelo seu currículo. O prospect quer saber o que vai obter, não quem você é.

**Correção**: Transformar em prova social orientada a resultado. Ex: "+200 coaches acompanhados, resultados em 30 dias."

**Problema 4 — Lista genérica [linha 4]**
"Dicas", "estratégias", "e muito mais" são as palavras mais vazias do copywriting. Cada bullet deveria ser um mini-benefício concreto e quantificável. "E muito mais" é uma confissão de que não há mais nada a dizer.

**Correção**: Cada bullet = 1 resultado específico. Ex: "5 templates de mensagens de prospecção que convertem a 23%."

**Problema 5 — CTA fraco + superpromessa [linha 5]**
"Oferta excepcional" é uma superpromessa vazia — todo mundo usa isso. Tripla exclamação = amador. "Clique aqui para saber mais" não informa o que acontece depois. O prospect não sabe se vai para uma página de venda, um formulário ou um pagamento.

**Correção**: CTA específico com ação clara. Ex: "Baixe o Playbook agora — R$ 197, acesso imediato."

---

### Copy Reescrita

\`\`\`
Você tem o diploma de coach fitness mas a agenda está vazia?

Você não está sozinho. 90% dos coaches não conseguem seus
primeiros clientes.

O problema: te ensinaram anatomia, não negócios.

O Playbook do Coach Fitness te dá o sistema completo:

→ O método para encontrar 10 clientes em 60 dias (sem tráfego pago)
→ 5 templates de mensagens que convertem a 23%
→ A calculadora de tarifas para não mais subvalorizar suas sessões
→ O plano de conteúdo para o Instagram semana por semana

+200 coaches já usam. Resultados desde a primeira semana.

R$ 197 — Acesso imediato. Baixe o Playbook agora.
\`\`\`

### Scores — Versão Reescrita

| Dimensão | Score | Evolução |
|----------|-------|----------|
| Clareza | 8/10 | +4 — Proposta de valor específica e mensurável |
| Persuasão | 8/10 | +5 — Dor identificada, prova social, especificidade |
| CTA | 8/10 | +5 — Ação clara, preço visível, resultado imediato |
| Voz | 9/10 | +4 — Tom coerente, direto e sem enrolação |
| Estrutura | 8/10 | +3 — Hook → Problema → Solução → Prova → CTA |
| Conformidade | 8/10 | +2 — Claims específicos e críveis, sem superpromessa |
| **TOTAL** | **8,2/10** | **+3,9 pontos** |

---

## REVIEW 2 — Email de Boas-Vindas (versão fraca)

### Copy Original

\`\`\`
Assunto: Seja bem-vindo(a)! 🎉                                   ← [1]

Olá e seja bem-vindo(a) à comunidade Academia FitPro!           ← [2]

Obrigado por se inscrever em nossa newsletter.

Você vai receber regularmente emails com conteúdo               ← [3]
interessante sobre coaching fitness e o desenvolvimento
do seu negócio.

Enquanto isso, não deixe de nos seguir nas redes sociais:       ← [4]
- Instagram: @academiaFitPro
- Facebook: Academia FitPro
- YouTube: Academia FitPro

Se você tiver dúvidas, não hesite em responder a este email.

Até logo!                                                        ← [5]
A equipe Academia FitPro
\`\`\`

### Scores — Versão Original

| Dimensão | Score | Comentário |
|----------|-------|------------|
| Clareza | 5/10 | A mensagem é compreensível, mas não há mensagem de fato |
| Persuasão | 2/10 | Zero valor entregue, zero antecipação criada |
| CTA | 2/10 | 3 CTAs concorrentes (redes sociais) + nenhum ligado ao produto |
| Voz | 4/10 | "A equipe Academia FitPro" = impessoal, perde a conexão |
| Estrutura | 4/10 | Sem hierarquia, sem progressão lógica |
| Conformidade | 7/10 | Nada falso, mas nada útil também |
| **TOTAL** | **4,0/10** | |

### Feedback Linha por Linha

**Problema 1 — Assunto genérico [linha 1]**
"Seja bem-vindo(a)" com emoji de confete é o assunto que 95% das marcas usam. Taxa de abertura média: 40% para um email de boas-vindas. Com esse assunto, você ficará em 25% no máximo. O email de boas-vindas tem a maior taxa de abertura de toda a sequência. Desperdiçá-lo com um assunto genérico é um erro estratégico grave.

**Correção**: Assunto que desperta vontade de abrir com uma promessa concreta. Ex: "Seu primeiro cliente em 7 dias — aqui está o plano"

**Problema 2 — Abertura vazia [linha 2]**
"Olá e seja bem-vindo(a) à comunidade" não diz nada. O prospect acabou de se inscrever — ele sabe que é bem-vindo. A abertura deve imediatamente entregar valor ou criar antecipação.

**Correção**: Abrir com a entrega do lead magnet + um teaser. Ex: "Aqui está seu guia [link]. Mas antes de lê-lo, deixa eu te dizer uma coisa..."

**Problema 3 — Promessa vaga [linha 3]**
"Conteúdo interessante" é a promessa mais fraca possível. O prospect não sabe o que vai receber, quando, nem por que vai ajudá-lo. Sem frequência, sem temas, sem compromisso.

**Correção**: Anunciar o programa específico. Ex: "Toda terça, você recebe uma estratégia concreta para desenvolver seu negócio de coach. Sem teoria. Só ações."

**Problema 4 — CTA difuso [linha 4]**
O email de boas-vindas deve ter UM único objetivo: criar o engajamento inicial. Enviar o prospect para 3 redes sociais diferentes o dispersa e o perde. Pior ainda, o afasta da sua lista de email — seu canal mais valioso.

**Correção**: Um único CTA ligado à jornada do cliente. Ex: "Responda a este email com seu maior bloqueio. Eu leio cada resposta."

**Problema 5 — Encerramento impessoal [linha 5]**
"A equipe Academia FitPro" destrói a conexão. O prospect quer falar com uma pessoa, não com uma entidade. O tutoiement no corpo + a assinatura de equipe criam uma dissonância.

**Correção**: Assinar com nome e título humano. Ex: "Alex, fundador da Academia FitPro — coach desde 2016"

---

### Copy Reescrita

\`\`\`
Assunto: Seu primeiro cliente em 7 dias — aqui está o plano

Oi [Nome],

Seu guia "Os 5 passos para encontrar seu primeiro cliente
de coaching" está pronto. Baixe aqui: [LINK]

Mas antes de lê-lo, uma coisa importante.

Este guia é o atalho que eu teria adorado ter quando
lancei minha atividade de coach em 2016.

Na época, levei 6 meses para encontrar meus 10 primeiros
clientes. Com esse sistema, meus alunos chegam lá em 30 dias.

Veja o que vai acontecer nos próximos dias:

→ Terça: o método para definir seu nicho (aquele que atrai
  clientes, não o que te agrada)
→ Quinta: a mensagem exata para prospectar sem parecer
  um vendedor
→ Sábado: a oferta irresistível — como estruturar um pacote
  que se vende sozinho

Cada email = uma ação concreta. Sem enrolação.

Agora tenho uma pergunta para você:

Qual é o seu maior bloqueio agora para desenvolver
sua atividade de coach?

Responda a este email. Eu leio cada resposta pessoalmente.

Alex
Fundador da Academia FitPro
Coach fitness desde 2016 | +200 coaches acompanhados
\`\`\`

### Scores — Versão Reescrita

| Dimensão | Score | Evolução |
|----------|-------|----------|
| Clareza | 9/10 | +4 — Cada seção tem um objetivo claro |
| Persuasão | 8/10 | +6 — Storytelling, prova, antecipação da sequência |
| CTA | 9/10 | +7 — Um único CTA, engajamento por resposta, ação simples |
| Voz | 9/10 | +5 — Tom coerente, voz pessoal, sem enrolação |
| Estrutura | 9/10 | +5 — Entrega → História → Programa → CTA, progressão lógica |
| Conformidade | 8/10 | +1 — Claims críveis, números reais, sem superpromessa |
| **TOTAL** | **8,7/10** | **+4,7 pontos** |

---

## Síntese das 2 Reviews

| Elemento | Review 1 (Meta Ad) | Review 2 (Email Boas-Vindas) |
|----------|--------------------|-----------------------------|
| Score antes | 4,3/10 | 4,0/10 |
| Score depois | 8,2/10 | 8,7/10 |
| Progressão | +3,9 pts | +4,7 pts |
| Problema principal | Vago, centrado no vendedor | Zero valor, CTA difuso |
| Correção principal | Especificidade + prova social | Entregar + engajar |

### Padrões Recorrentes (a evitar)

1. **Hooks genéricos** — A primeira linha decide se o restante será lido. Investir 50% do tempo de escrita no hook.
2. **Propostas de valor vagas** — "Dicas", "conteúdo", "tudo o que você precisa" não dizem nada. Quantificar, especificar, ilustrar.
3. **CTAs múltiplos ou confusos** — Um email ou anúncio = UM objetivo = UM CTA. Cada CTA adicional reduz a taxa de clique.
4. **Voz inconsistente** — Escolher tutoiement OU forma mais formal, pessoal OU corporativo. Nunca misturar.
5. **Argumentos centrados no vendedor** — O prospect não se importa com sua experiência. Ele quer saber o que muda para ELE.

---

# Referência — Regras de Conformidade

## Proibições absolutas

| Categoria | Proibido | Exemplo | Alternativa |
|-----------|----------|---------|-------------|
| Garantia de receita | Prometer uma receita específica | "Ganhe R$ 10K/mês" | "Construa um sistema para atrair clientes regularmente" |
| Promessa irreal | Prometer resultados irrealistas | "100 clientes em 1 semana" | "Um sistema testado para encontrar seus primeiros clientes" |
| Urgência falsa | Urgência sem fundamento | "Só 3 vagas!" (se falso) | Urgência real baseada em fatos |
| Raridade falsa | Raridade artificial que se renova | "Oferta limitada" permanente | Oferta com data de encerramento real |
| Depoimentos atípicos | Resultados excepcionais sem disclaimer | "Fiz R$ 250K em 30 dias" | Adicionar "Resultados atípicos. Os resultados variam." |
| Claims não verificáveis | Estatísticas inventadas | "97% dos nossos clientes têm sucesso" | Claims baseados em dados reais |
| Claims médicos/legais | Promessas de saúde ou legais | "Cure sua ansiedade" | "Técnicas de gestão do estresse" |

## Obrigações (se aplicável)

| Obrigação | Quando | Formulação |
|-----------|--------|------------|
| Disclaimer de resultados | Qualquer menção de resultados | "Os resultados variam conforme esforço e situação." |
| Transparência de preço | Produto pago mencionado | Preço claramente exibido |
| Natureza do produto | Menção do produto | "Produto digital" / "Ebook" / "Guia online" |
| Descrição honesta | Página de venda / landing | O que está incluído, listado claramente |
| Identificação de publicidade | Publicidade paga | Indicar que é um anúncio (conforme plataforma) |

## Palavras banidas por plataforma

### Meta Ads (Facebook / Instagram)

| Categoria | Palavras/Expressões banidas |
|-----------|----------------------------|
| Atributos pessoais | "Você está acima do peso", "Você sofre de..." (segmentação pessoal) |
| Garantias financeiras | "Renda garantida", "Fique rico" |
| Antes/Depois | Imagens de antes/depois (em alguns nichos) |
| Sensacionalismo | "Chocante", "Segredo incrível" |
| Cripto/MLM | "Oportunidade de renda passiva" |

### Google Ads

| Categoria | Palavras/Expressões banidas |
|-----------|----------------------------|
| Superlativos não provados | "O melhor", "Nº1" (sem prova de terceiros) |
| Caracteres especiais excessivos | "!!!!", "***", maiúsculas excessivas |
| Click-bait | "Clique aqui!!!" |
| Conteúdo enganoso | Falsa similaridade com resultado do Google |

## Checklist de conformidade por tipo

### Copy de anúncio
- [ ] Sem atributos pessoais (política Meta)
- [ ] Sem garantia de receita
- [ ] Preço visível se produto pago
- [ ] Sem superlativos não provados (Google)
- [ ] Sem urgência falsa

### Copy de email
- [ ] Link de descadastro mencionado / presente
- [ ] Remetente identificável
- [ ] Assunto não enganoso
- [ ] Sem promessas de receita

### Copy de landing page
- [ ] Termos e condições acessíveis
- [ ] Política de reembolso clara
- [ ] Preço total exibido
- [ ] Disclaimer se depoimentos

### Post social
- [ ] #ad ou #publicidade se parceria paga
- [ ] Sem claims de saúde não verificados
- [ ] Sem antes/depois enganoso

---

# Referência — Dimensões de Scoring

## Visão Geral

| Dimensão | Pontos máx. | Peso |
|----------|------------|------|
| Clareza | 17 | A mensagem passa em 5 segundos? |
| Persuasão | 17 | O leitor quer agir? |
| CTA | 17 | O apelo à ação é eficaz? |
| Voz/Marca | 17 | O copy soa como a marca? |
| Estrutura | 16 | O copy é escaneável e bem formatado? |
| Conformidade | 16 | O copy está legalmente seguro? |
| **Total** | **100** | |

## Detalhe por dimensão

### 1. CLAREZA (17 pontos)

| Critério | Pontos | Como avaliar |
|---------|--------|--------------|
| Mensagem principal identificável | 5 | É possível resumir em 1 frase? |
| Sem jargão inexplicado | 4 | Um iniciante entenderia? |
| Frases curtas e diretas | 4 | Média < 20 palavras/frase? |
| Uma ideia por parágrafo | 4 | Sem parágrafos-muros? |

**Penalidades:**
- Trecho confuso ou ambíguo: -2
- Jargão sem explicação: -1
- Frase > 40 palavras: -1

### 2. PERSUASÃO (17 pontos)

| Critério | Pontos | Como avaliar |
|---------|--------|--------------|
| Problema do leitor identificado | 4 | O pain point está nomeado? |
| Solução concreta | 4 | O "como" está claro? |
| Provas / credibilidade | 5 | Números, resultados, depoimentos? |
| Urgência natural | 4 | Razão para agir agora (sem urgência falsa)? |

**Penalidades:**
- Argumento fraco ou vago: -2
- Nenhuma prova: -3
- Claim sem suporte: -2

### 3. CTA (17 pontos)

| Critério | Pontos | Como avaliar |
|---------|--------|--------------|
| CTA presente e visível | 5 | O leitor sabe o que fazer? |
| CTA único | 4 | Sem CTAs concorrentes? |
| CTA orientado ao benefício | 4 | "Obtenha X" vs. "Clique aqui" |
| Posicionamento estratégico | 4 | No lugar certo no fluxo? |

**Penalidades:**
- CTA ausente: -5
- CTAs múltiplos concorrentes: -3
- CTA genérico ("Saiba mais"): -2
- CTA enterrado no final: -2

### 4. VOZ / MARCA (17 pontos)

| Critério | Pontos | Como avaliar |
|---------|--------|--------------|
| Tom DP Criador (direto, anti-BS) | 5 | Soa como um mentor inteligente? |
| Sem voz passiva | 3 | Ações em voz ativa? |
| Sem filler/fluff | 3 | Cada frase agrega valor? |
| Terminologia coerente | 3 | Mesmos termos para os mesmos conceitos? |
| Coerência de identidade visual | 3 | Cores/estilo se HTML? |

**Penalidades:**
- Voz passiva nas instruções: -2
- Filler word: -1 por ocorrência (máx. -3)
- Palavra de hype: -2 por ocorrência
- Incoerência de marca: -2

### 5. ESTRUTURA (16 pontos)

| Critério | Pontos | Como avaliar |
|---------|--------|--------------|
| Escaneável | 4 | Títulos, listas, espaçamento? |
| Comprimento adequado | 4 | Correto para o formato? |
| Hook na primeira linha | 4 | Gancho imediato? |
| Progressão lógica | 4 | Problema → Solução → Ação? |

**Penalidades:**
- Parágrafo > 5 linhas: -1 por ocorrência
- Sem hook: -3
- Comprimento inadequado: -2
- Sem estrutura lógica: -3

### 6. CONFORMIDADE (16 pontos)

| Critério | Pontos | Como avaliar |
|---------|--------|--------------|
| Sem garantia de receita | 5 | Nenhum "Ganhe R$ X/mês"? |
| Sem urgência falsa | 3 | Urgência baseada em fatos reais? |
| Disclaimer se claims | 4 | "Resultados variam" presente? |
| Conforme às políticas da plataforma | 4 | Sem palavras banidas Meta/Google? |

**Penalidades:**
- Garantia de renda: -5 (automaticamente Crítico)
- Raridade falsa: -3
- Depoimento sem disclaimer: -2
- Palavra banida pela plataforma: -2

## Limites de decisão

| Score | Status | Significado |
|-------|--------|-------------|
| 85-100 | PUBLICAR | Pronto para publicar como está ou com correções menores |
| 70-84 | REVISAR | Bom potencial, correções necessárias antes de publicar |
| 60-69 | REVISAR | Médio, várias correções importantes a fazer |
| 40-59 | REESCREVER | Fraco, reescrita parcial ou completa recomendada |
| <40 | REESCREVER | Crítico, reescrita completa obrigatória |

## Conversão dimensão → score /100

Cada dimensão é pontuada de forma absoluta no seu máximo de pontos. O total das 6 dimensões fornece diretamente o score /100.`,
};

export default skill;
