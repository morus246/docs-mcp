import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-social-caption",
  categoria: "Conteúdo e SEO",
  descricao: "Gera lotes de captions para redes sociais prontas para publicar, adaptadas por plataforma (Instagram, LinkedIn, Facebook, TikTok, X/Twitter). Inclui hooks, CTAs, hashtags, direção visual com cores da marca e calendário de publicação. Gatilhos: social, caption, Instagram, LinkedIn, TikTok, Facebook, post, redes sociais.",
  argumentHint: "[plataforma: instagram|linkedin|facebook|tiktok|x] [tema] [tamanho-do-lote]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Social Caption — Gerador de Copies para Redes Sociais

<!-- v2.0.0 | 2026-04-13 | Refatoração completa: context intake, direção visual, cores da marca, quality gates, specs por plataforma, tratamento de erros -->

Expert em copywriting para redes sociais do DP Criador. Gera lotes de captions prontas para publicar, adaptadas a cada plataforma, com direção visual e sugestões de timing.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-social-caption [plataforma] [tema]\` | Gerar um lote de 5 captions guiado |
| \`/dp-social-caption batch [plataforma] [tema] [número]\` | Lote personalizado (3-15 captions) |
| \`/dp-social-caption repurpose [arquivo]\` | Transformar um artigo/email em captions sociais |
| \`/dp-social-caption multi [tema]\` | Gerar para todas as plataformas de uma vez |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Lote de [N] captions (social/[plataforma]-captions-[data].md)
├── Cada caption: hook, body, CTA, hashtags
├── Direção visual por post (com referência às cores da marca)
├── Estágio de funil indicado (TOFU / MOFU / BOFU)
├── Horário de publicação recomendado
└── Mix variado: educativo, story, contrarian, pitch, bastidores
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Coletar informações essenciais (OBRIGATÓRIO)
2. Ler referências     → Carregar perfil business, produto, voz
   Ler references/caption-examples.md → para 15 captions multiplataforma
3. Gerar captions      → Redação do lote completo
4. Quality check       → Quality gates, limites por plataforma, revisão
5. Entrega             → Arquivo salvo + calendário de publicação
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Sempre Faça Isso Primeiro)

Antes de qualquer redação, coletar o contexto. Sem ele, as captions serão genéricas e desconectadas da marca.

### 1a. Carregar o perfil business (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, cores, handles sociais
  → NÃO repetir as perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrirão o mínimo.
\`\`\`

### 1b. Fazer as perguntas por blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar por 2-3, aguardar as respostas, reformular para validar, depois continuar.

#### Bloco 1 — A plataforma e o tema (perguntar primeiro)

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | Qual plataforma? \`instagram\` / \`linkedin\` / \`facebook\` / \`tiktok\` / \`x\` (ou "todas") | Formato e tom adaptados |
| Q2 | Qual tema ou ângulo? (palavra-chave, tema, link para um artigo a repurposar) | Conteúdo das captions |
| Q3 | Quantas captions? (padrão: 5, máximo recomendado: 15) | Tamanho do lote |

**Após as respostas**: Reformular. "Vou criar [N] captions para [plataforma] sobre o tema [tema]. Está correto?"

#### Bloco 2 — A voz e o branding

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | Descreva sua voz de marca em 2-3 palavras (ex: "direto e objetivo", "expert e acessível", "acolhedor e motivador") | Tom das captions |
| Q5 | Qual produto ou oferta mencionar nos CTAs de conversão? (nome, preço, link — ou "nenhum" se for puro engajamento) | CTAs relevantes |

**Após as respostas**: Validar.

#### Bloco 3 — A direção visual

| # | Pergunta | Por que |
|---|----------|---------|
| Q6 | Quais são suas cores da marca? (cor principal + accent em hex ou nome — ou "ainda não definido") | Direção visual coerente |
| Q7 | Qual estilo visual para seus posts? \`minimalista\` (limpo, tipografia forte) / \`bold\` (cores vivas, contrastes) / \`premium\` (escuro, elegante) / \`warm\` (tons quentes, lifestyle) | Ambiance das sugestões visuais |
| Q8 | Você tem um handle ou @username para mencionar nos CTAs? | Coerência dos CTAs de follow |

**Após as respostas**: Confirmar e passar para a geração.

> **Aviso honesto**: O engajamento orgânico depende de muitos fatores (algoritmo, timing, qualidade do visual, tamanho da audiência). Estas captions são otimizadas para o conteúdo de texto — o visual que as acompanha é igualmente importante.

---

## Etapa 2 — Gerar Captions

Para cada caption, produzir:

\`\`\`
CAPTION [#] — [Plataforma] [Tipo de post]
==========================================
Estágio de Funil: [TOFU/MOFU/BOFU]

HOOK (primeira linha — visível antes de "...ver mais"):
[A linha que para o scroll]

BODY:
[Texto completo da caption, formatado para a plataforma]

CTA:
[Linha de chamada para ação]

HASHTAGS:
[Hashtags adaptados à plataforma]

---
Tipo de post: [Reel/Carrossel/Estático/Story/Texto]
Direção visual: [Descrição do visual sugerido — referenciar as cores da marca]
Horário de publicação: [Horário sugerido]
\`\`\`

### Direção Visual — Referenciar as Cores da Marca

Para cada sugestão visual, incluir referências concretas:

\`\`\`
Exemplos de direções visuais:
- "Fundo [cor principal] com texto branco — tipografia bold, 3 bullet points"
- "Foto lifestyle com overlay [cor accent] a 20% — quote em sobreposição"
- "Carrossel 5 slides: slide 1 hook em fundo [cor principal], slides 2-4 conteúdo em fundo branco, slide 5 CTA em fundo [cor accent]"
- "Reel: texto animado em fundo neutro, accents em [cor principal] para as palavras-chave"
\`\`\`

---

## Specs por Plataforma

### Instagram

| Spec | Valor |
|------|-------|
| Máx caracteres | 2.200 (mirar < 800 para engajamento) |
| Hashtags | 5-10, mix amplo + nicho, no final da caption ou em comentário |
| Hook | A primeira linha deve funcionar sozinha (tudo que se vê antes de "...ver mais") |
| Formato | Parágrafos curtos, quebras de linha entre cada um, emojis com parcimônia |
| CTAs típicos | "Salva esse post", "Compartilha com um amigo", "Link na bio", "Me manda DM [palavra-chave]" |

**Por tipo de post:**
- **Carrossel**: Caption mais curta — os slides fazem o trabalho
- **Reel**: Muito curta (1-3 linhas) — o vídeo é o conteúdo
- **Estático**: Caption média, o visual atrai e depois a caption retém
- **Story**: Sem caption tradicional — sticker de pergunta/enquete

### LinkedIn

| Spec | Valor |
|------|-------|
| Máx caracteres | 3.000 |
| Hashtags | 3-5 máx, todos no final |
| Hook | As 2 primeiras linhas são visíveis no feed — elas devem fisgar |
| Formato | Frases isoladas em parágrafos (estilo LinkedIn), sem hashtags no corpo |
| CTAs típicos | "Concorda? Comenta.", "Reposte se faz sentido.", "Siga para mais." |
| O que funciona | Histórias pessoais, posicionamentos contrarian, dados/números, frameworks |

### Facebook

| Spec | Valor |
|------|-------|
| Máx caracteres | 63.206 (mirar < 500) |
| Hashtags | 1-3 máx ou nenhum |
| Hook | Pergunta ou afirmação forte |
| Formato | Conversacional, como se falasse com um amigo num grupo |
| CTAs típicos | "Comenta abaixo", "Compartilha", "Marca alguém que precisa ver isso" |
| O que funciona | Perguntas, enquetes, histórias com as quais se identificam, engajamento comunitário |

### TikTok

| Spec | Valor |
|------|-------|
| Máx caracteres | 4.000 (mirar < 150) |
| Hashtags | 3-5, mix trending + nicho |
| Hook | Ultra-curto — o hook do vídeo conta mais |
| Formato | 1-2 linhas máx, casual, linguagem tendência |
| CTAs típicos | "Segue para a continuação", "Salva esse post", "Link na bio" |
| O que funciona | Raw, autêntico, rápido, sons em tendência |

### X / Twitter

| Spec | Valor |
|------|-------|
| Máx caracteres | 280 (ou 25.000 para X Premium) |
| Hashtags | 1-2 máx integrados no texto |
| Hook | O tweet inteiro É o hook |
| Formato | Conciso, impactante, uma ideia |
| CTAs típicos | "RT se concorda", "Responda com sua experiência", "Thread abaixo" |
| O que funciona | Opiniões quentes, threads, engajamento direto, dados surpreendentes |

---

### CTA Ideal por Plataforma

| Plataforma | CTA mais eficaz | Por que |
|------------|----------------|---------|
| Instagram | "Me manda DM [palavra]" ou "Link na bio" | O algoritmo favorece os DMs, o link na bio é o único clicável |
| LinkedIn | "Comenta [palavra] se quiser o template" | O algoritmo impulsiona posts com comentários |
| Facebook | "Compartilha se você conhece alguém que..." | O compartilhamento amplia o alcance orgânico |
| TikTok | "Segue para a parte 2" ou "Salva para depois" | Saves e follows sinalizam valor para o algoritmo |
| X/Twitter | "RT + Siga para receber o [recurso]" | Retweets = viralidade no X |

---

## Regras de Copywriting

### O Hook (primeira linha)

Deve fazer UMA dessas coisas:

| Técnica | Exemplo |
|---------|---------|
| Nomear uma dor | "Você não está fechando clientes porque suas DMs parecem spam." |
| Fazer uma afirmação | "Marquei 7 ligações essa semana com um único template de mensagem." |
| Fazer uma pergunta | "Por que criadores com 200 seguidores vendem mais do que os com 20K?" |
| Usar um número | "3 motivos pelos quais suas ligações de descoberta não convertem." |
| Ser contrarian | "Para de construir sua personal brand." |
| Criar curiosidade | "O script de follow-up que eu quase não enviei... trouxe um cliente de volta." |

### O Body

- Uma ideia por post. Nunca acumular.
- Parágrafos curtos (1-2 frases).
- Quebras de linha para legibilidade.
- Incluir conselho específico e acionável (não apenas motivação).
- Referenciar os métodos do negócio de forma natural (sem forçar).

### O CTA

Cada post termina com UMA ação clara:

| Tipo | Exemplos |
|------|----------|
| Engajamento | "Dá dois cliques se concorda" / "Comenta [palavra]" |
| Save | "Salva esse post para sua próxima sessão" |
| Compartilhamento | "Manda isso para alguém que precisa" |
| Conversão | "Link na bio" / "Me manda DM [PALAVRA-CHAVE]" |
| Follow | "Segue @[handle] para dicas diárias" |

**Regra**: Alternar entre CTAs soft (engajamento) e hard (conversão) no lote. Nunca 2 pitchs duros consecutivos.

### Voz

| Fazer | NÃO fazer |
|-------|-----------|
| Direto, impactante, sem enrolação | Longas introduções, conteúdo de enchimento |
| Tutear, endereçado a uma pessoa | "Queridos seguidores", tom corporativo |
| Confiante mas não arrogante | Tom de guru, "manifeste sua vida dos sonhos" |
| Específico ("20 DMs/dia") | Vago ("seja consistente") |
| Ressalvas honestas se pertinente | Promessas irreais |

---

## Composição do Lote

Para um lote de 5+, garantir variedade:

| Caption # | Funil | Tipo | CTA |
|-----------|-------|------|-----|
| 1 | TOFU | Educativo / Dica | Soft (save/follow) |
| 2 | MOFU | Framework / How-to | Médio (comment/share) |
| 3 | TOFU | Contrarian / Desmistificação | Soft (engajamento) |
| 4 | BOFU | Pitch direto / Prova | Hard (link/DM) |
| 5 | MOFU | Story / Bastidores | Médio (follow) |

**Regra**: Nunca 2 captions BOFU (hard sell) consecutivas.

Para lotes maiores, continuar o padrão em loop variando os ângulos.

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder ([TODO], [INSERIR], [sua história]) | Crítico |
| QG-02 | Cada caption é COMPLETA e pronta para publicar | Crítico |
| QG-03 | Respeito estrito dos limites de caracteres por plataforma | Crítico |
| QG-04 | Sem hashtag stuffing — máximo por plataforma respeitado | Alto |
| QG-05 | Zero hashtag genérico (>50M posts). Todos os hashtags entre 10K-500K posts no nicho | Alto |
| QG-06 | Não há 2 captions BOFU (hard sell) consecutivas | Alto |
| QG-07 | Cada caption tem uma direção visual | Alto |
| QG-08 | As direções visuais referenciam as cores da marca | Médio |
| QG-09 | Hook de cada caption funciona sozinho (teste "...ver mais") | Crítico |
| QG-10 | Nenhuma promessa de receita ou resultados garantidos | Crítico |
| QG-11 | CTAs variados no lote (não todos iguais) | Médio |
| QG-12 | Por lote de 5+ captions: mínimo 2 TOFU, 1 MOFU, 1 BOFU | Alto |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Plataforma não especificada | Perguntar: "Para qual plataforma? Ou posso gerar para todas de uma vez." |
| Sem tema | Perguntar: "Qual tema interessa à sua audiência? Me dê um tema, uma palavra-chave, ou um artigo para repurposar." |
| business-profile.md ausente | Continuar com as respostas do context intake |
| Sem cores da marca | Propor 3 paletas adaptadas ao nicho. Usar a escolhida nas direções visuais. |
| Lote muito grande (>15) | Avisar: "Acima de 15, a qualidade e variedade caem. Recomendo dividir em 2 lotes temáticos." |
| Plataforma desconhecida | Listar as plataformas suportadas e pedir para escolher |
| Repurpose sem arquivo fonte | Pedir o caminho do arquivo ou o conteúdo para transformar |
| O usuário quer modificar uma caption | Reescrever a caption em questão mantendo a coerência do lote |
| Tema sensível | Adaptar o tom, adicionar nuances, evitar afirmações não verificáveis |

---

## Integração Cross-Skill

| Antes do social-caption | Skill | Quando |
|-------------------------|-------|--------|
| Escrever um artigo fonte | \`/dp-blog-article\` | Para repurposar em captions |
| Definir o negócio | \`business-profile.md\` | Se ainda não criado |
| Criar o produto | \`/dp-playbook-create\` | Para ter um produto a promover nos BOFU |

| Depois do social-caption | Próximo skill | Quando |
|--------------------------|---------------|--------|
| Planejar as publicações | \`/dp-mediaplan\` | Para o calendário editorial |
| Sequência de email | \`/dp-email-sequence\` | Para uma campanha cross-canal |
| Publicidade paga | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para amplificar os melhores posts |
| Artigo de blog | \`/dp-blog-article\` | Para desenvolver um tema que performa bem no social |

---

# Exemplo — Captions Multiplataforma

## Academia FitPro — Playbook do Coach Fitness (R$ 197)

**Voz**: Direta, motivadora, sem enrolação, tutear
**Cores**: #059669 / #10b981 | **Audiência**: Coaches fitness iniciantes

---

## TEMA A — "Os 3 erros que matam seu negócio de coach"

### A1 — Instagram | \`[TOFU]\` | Carrossel 5 slides | 487 car.

**Hook**: Você comete esses 3 erros? Seu negócio de coach está morto antes de começar.

**Body**:
Você comete esses 3 erros? Seu negócio de coach está morto antes de começar.

Erro 1: Você vende sessões. Não uma transformação.
Seu cliente não quer "1h de coaching". Ele quer perder 10 kg. Venda o resultado.

Erro 2: Você espera que os clientes venham até você.
Isso não acontece. Nunca. Você precisa de um sistema de aquisição.

Erro 3: Você copia o coach ao lado.
A audiência dele não é a sua. Encontre sua voz, seu nicho, seu ângulo.

Desliza para o detalhe de cada erro.

**CTA**: Salva esse post. O sistema completo para evitar esses erros? Link na minha bio.
**Hashtags**: \`#coachfitness\` \`#businesscoaching\` \`#erroscoach\` \`#coachesportivo\` \`#empreendedorfitness\` \`#lançarseunegoicio\` \`#coachinicinante\` \`#venderseuservico\` \`#nichocoaching\` \`#playbookcoach\`
**Visual**: Fundo branco, texto #059669, um erro por slide com ícone X vermelho. Slide 5: fundo #10b981 + CTA.

### A2 — LinkedIn | \`[TOFU]\` | Post texto + imagem | 962 car.

**Hook**: Acompanhei +200 coaches fitness. Eles cometem todos os mesmos erros no início.

**Body**:
Acompanhei +200 coaches fitness.
Eles cometem todos os mesmos erros no início.

Aqui estão os 3 mais destrutivos:

1. Vender horas em vez de uma transformação — o cliente paga por um resultado, não pelo tempo. Enquanto você vende tempo, fica estagnado.

2. Esperar que os clientes caiam do céu — você precisa de um sistema: conteúdo, oferta clara, funil de conversão. É marketing, não mágica.

3. Copiar a estratégia do coach que "deu certo" — a audiência, o mercado, a história dele não são os seus.

Esses 3 erros se corrigem em poucas semanas com o cadre certo.
Criei o Playbook do Coach Fitness exatamente para isso.

**CTA**: Comenta "PLAYBOOK" e te mando o link por DM.
**Hashtags**: \`#coachingfitness\` \`#empreendedorismo\` \`#modelodenegocio\` \`#coaching\` \`#fitness\`
**Visual**: Citação em fundo branco sóbrio, logo Academia FitPro, tipografia profissional.

> **Nota de adaptação**: No LinkedIn, o você formal é usado no CTA ("Comenta") para manter a seriedade. O body mantém o tutear para criar proximidade. O conteúdo é mais detalhado e argumentado do que no Instagram ou TikTok.

### A3 — TikTok | \`[TOFU]\` | Talking head 30s | 398 car.
**Hook**: 3 coisas que matam seu negócio de coach fitness e você provavelmente faz todas.
**Body**: Número 1: você vende sessões. Para. Venda uma transformação. Número 2: você espera os clientes. Eles não virão. Número 3: você copia o cara que tem 100k seguidores. A solução? Um plano estruturado. Link na bio.
**CTA**: Link na bio para o plano completo por R$ 197.
**Hashtags**: \`#coachfitness\` \`#businesscoaching\` \`#coachtiktok\` \`#dicasfitness\` \`#empreendedorfitness\`
**Visual**: Legendas dinâmicas (palavras-chave em #10b981), jump-cuts rápidos, hook em overlay.

---

## TEMA B — "Como consegui meus 10 primeiros clientes"

### B1 — Instagram | \`[MOFU]\` | Reel 45s | 521 car.

**Hook**: Como consegui meus 10 primeiros clientes de coaching em 47 dias. Sem anúncio. Sem rede de contatos.

**Body**:
Como consegui meus 10 primeiros clientes de coaching em 47 dias. Sem anúncio. Sem rede de contatos.

Etapa 1: Defini UM nicho. Não "todo mundo". Homens de 30-45 anos que querem perder a barriga.

Etapa 2: Criei um conteúdo gratuito de valor (um mini-guia PDF) e compartilhei em 3 grupos do Facebook.

Etapa 3: A cada download, enviei uma mensagem personalizada. Sem spam. Uma conversa de verdade.

Resultado: 10 clientes em 47 dias. R$ 1.970 de faturamento.

**CTA**: O sistema completo está no Playbook do Coach Fitness. R$ 197, link na bio.
**Hashtags**: \`#primeirosclientes\` \`#coachfitness\` \`#coaching\` \`#aquisição\` \`#clientescoaching\` \`#estrategia\` \`#coachesportivo\` \`#businessfitness\` \`#faturamento\` \`#sistemadevendas\`
**Visual**: Talking head + capturas de tela. Números em overlay #059669. Final: mockup do Playbook.

### B2 — LinkedIn | \`[MOFU]\` | Post storytelling | 1087 car.
**Hook**: 47 dias. 10 clientes. R$ 0 em publicidade. Veja como fiz.
**Body**: Quando lancei meu negócio, tinha diploma, motivação, zero cliente. Erro inicial: postar no Instagram esperando que acontecesse. Então mudei. Nicho específico, lead magnet em PDF, distribuição em 3 grupos do Facebook, depois conversa personalizada. Resultado: 10 clientes em 47 dias. R$ 1.970. Documentei esse sistema no Playbook.
**CTA**: Comenta "SISTEMA" — te mando o link.
**Hashtags**: \`#coaching\` \`#aquisicaodeclientes\` \`#empreendedorismo\` \`#coachfitness\` \`#estrategia\`
**Visual**: Imagem minimalista "10 clientes / 47 dias" em fundo branco. LinkedIn favorece o texto puro.

### B3 — TikTok | \`[MOFU]\` | Face camera 25s | 372 car.
**Hook**: 10 clientes em 47 dias sem gastar R$ 1 em anúncio.
**Body**: Etapa 1: Escolha UM público-alvo. Etapa 2: Crie um PDF gratuito. Etapa 3: Compartilhe nos grupos do seu público. Etapa 4: DM personalizado. Não um pitch, uma pergunta. 10 clientes. R$ 1.970.
**CTA**: Link na bio.
**Hashtags**: \`#coachfitness\` \`#encontrarclientes\` \`#dicasdenegocios\` \`#coaching\` \`#empreendedortiktok\`
**Visual**: Green screen + screenshot resultados. Legendas animadas, números em #10b981.

---

## TEMA C — "O preço ideal para um coach iniciante"

### C1 — Instagram | \`[MOFU]\` | Carrossel 4 slides | 412 car.
**Hook**: Você cobra R$ 80 a sessão? Está trabalhando de graça. Veja por quê.
**Body**: Depois das taxas, deslocamento, preparação: te sobram R$ 35/h. Menos do que vale. A solução: venda pacotes. Um pacote de 12 sessões por R$ 900 = R$ 75/sessão. Seu cliente se compromete. Todo mundo ganha.
**CTA**: Me conta nos comentários: quanto você cobra hoje?
**Hashtags**: \`#preçocoach\` \`#coachfitness\` \`#pricing\` \`#empreendedorismo\` \`#coachesportivo\` \`#definirseupreco\` \`#businessfitness\` \`#coachinicinante\` \`#viverdapaixao\` \`#pacotedecoaching\`
**Visual**: Slide 1 calculadora. Slide 2 decomposição de custos. Slide 3 novo preço #059669. Slide 4 CTA #10b981.

### C2 — LinkedIn | \`[MOFU]\` | Post texto | 690 car.
**Hook**: Um coach fitness que cobra R$ 80 a sessão ganha menos do que merece. Vamos fazer as contas.
**Body**: R$ 80 bruto. Menos 27% de impostos = R$ 58. Menos R$ 15 de deslocamento. Menos 30 min de prep não faturados. Receita real: R$ 35/h. A solução não é aumentar o preço por hora. É mudar o modelo. Pacotes, mensalidades, programas online. O trabalho de coach é rentável. O modelo "por sessão" não é.
**CTA**: Qual modelo de precificação você usa? Compartilhe nos comentários.
**Hashtags**: \`#coachfitness\` \`#precificacao\` \`#empreendedorismo\` \`#modelodenegocio\` \`#coaching\`
**Visual**: Infográfico do cálculo em 3 etapas. Números em fundo branco, resultado em #059669.

### C3 — TikTok | \`[MOFU]\` | Vídeo 20s com texto overlay | 285 car.
**Hook**: Coach fitness a R$ 80 a sessão? Você tá trabalhando à toa.
**Body**: R$ 80 menos os impostos, o deslocamento, a preparação. Te sobram R$ 35 por hora. A solução: pare de vender por hora. Venda pacotes. Venda resultados. O cálculo completo está na minha bio.
**CTA**: Link na bio.
**Hashtags**: \`#coachfitness\` \`#preco\` \`#dicasdenegocios\` \`#dinheiro\` \`#coaching\`
**Visual**: Texto overlay animado com os cálculos passando. Número final R$ 35 em vermelho. Fundo escuro.

---

## Notas de Adaptação por Plataforma

### Instagram
- Captions mais curtas (400-550 car.), visuais, orientadas para engajamento (salva/comenta)
- Hashtags: 10 por post (3 broad + 3 nicho + 4 long-tail)
- Hook = primeira linha visível antes de "...ver mais"
- CTA principal: "link na bio" (sem links clicáveis na caption)

### LinkedIn
- Captions longas aceitas (800-1100 car.), tom mais argumentado e profissional
- Hashtags: 5 máximo (LinkedIn penaliza posts com excesso de hashtags)
- Você formal nos CTAs, tutear no corpo do texto
- Privilegiar texto puro sem imagem para maximizar o alcance orgânico
- CTA: comentário com palavra-chave ("PLAYBOOK", "SISTEMA") para engajamento + DM

### TikTok
- Captions muito curtas (280-460 car.), tudo passa pelo vídeo
- Hashtags: 5 máximo, privilegiar tendências
- Hook deve ser dito nos primeiros 2 segundos (atenção curta)
- Legendas obrigatórias, palavras-chave em cor #10b981
- CTA: sempre "link na bio", nunca CTA complexo

---

## Recapitulativo (15 captions)

| # | Tema | IG | LI | TT | Funil |
|---|------|----|----|----|-------|
| A | 3 erros de negócio | A1 | A2 | A3 | TOFU |
| B | 10 primeiros clientes | B1 | B2 | B3 | MOFU |
| C | Preço ideal | C1 | C2 | C3 | MOFU |

**3 temas x 3 plataformas = 9 captions (exemplo parcial)**
`,
};

export default skill;
