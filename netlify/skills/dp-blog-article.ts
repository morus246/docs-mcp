import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-blog-article",
  categoria: "Conteúdo e SEO",
  descricao: "Redige artigos de blog SEO completos com otimização on-page, links internos estratégicos, sinais E-E-A-T, CTAs naturais, schema JSON-LD e prontidão para pesquisa de IA. Integra os links com artigos existentes. Pode publicar diretamente no WordPress. Gatilhos: blog, artigo, SEO, escrever artigo, redação blog, content marketing, post SEO, links internos.",
  argumentHint: "[keyword] [tipo: standard|pilar|satélite] [formato: html|markdown|wordpress]",
  allowedTools: ["Read", "Write", "Bash", "Glob", "WebSearch", "WebFetch"],
  conteudo: `# Blog Article — Redator SEO com Links Internos

<!-- v2.1.0 | 2026-04-13 | Reformulação completa: links internos, topic clusters, E-E-A-T, schema JSON-LD, publicação WordPress, score SEO -->

Redator SEO especialista para DP Criador. Não se limita a escrever um artigo — constrói conteúdo integrado em um ecossistema de links internos, otimizado para o Google E para os motores de IA (ChatGPT, Perplexity, Google AI Overviews).

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-blog-article [keyword]\` | Criação guiada completa |
| \`/dp-blog-article express [keyword]\` | Modo rápido — 3 perguntas e depois redação |
| \`/dp-blog-article pilar [keyword]\` | Artigo pilar (3000+ palavras, hub do cluster) |
| \`/dp-blog-article satelite [keyword]\` | Artigo satélite (1500 palavras, ligado ao pilar) |
| \`/dp-blog-article outline [keyword]\` | Plano apenas, sem redação |
| \`/dp-blog-article update [arquivo]\` | Atualizar um artigo existente |
| \`/dp-blog-article from [arquivo]\` | Reestruturar conteúdo existente em artigo SEO |

## Formato do Entregável

\`\`\`
ENTREGÁVEIS:
├── Artigo (blog/[slug].[html|md])
│   ├── Conteúdo otimizado para SEO (H1 > H2 > H3)
│   ├── Meta tags (title, description, OG, Twitter Card)
│   ├── Schema JSON-LD (BlogPosting)
│   ├── Links internos (3-10 links contextuais)
│   ├── CTAs naturais (suave, médio, direto)
│   ├── Seção FAQ (People Also Ask)
│   └── CSS embutido se HTML:
│       /* Se business-profile.md existir, usar as cores: */
│       :root {
│         --color-primary: [primary_color do business-profile.md ou context intake];
│         --color-accent: [accent_color do business-profile.md ou context intake];
│       }
│       /* Aplicar aos links, títulos e CTAs */
├── Score SEO 0-100
├── Mapa de links (links de entrada/saída)
├── 5 sugestões de conteúdo derivado
└── Opção: publicação direta no WordPress
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto   → Negócio, keyword, público, produto, voz
2. Ler referências      → Padrões SEO, links internos, artigos existentes
   Ler references/article-example.md → para estrutura de artigo anotado
3. Análise de keyword   → Variações, perguntas, mapeamento de intent
4. Planejar artigo      → Estrutura validada pelo usuário
5. Escrever conteúdo    → Redação SEO com links integrados
6. Verificação SEO      → Score 0-100, critérios de qualidade
7. Conteúdo derivado    → 5 conteúdos derivados sugeridos
8. Entregar / Publicar  → Arquivo local OU publicação WordPress
\`\`\`

---

## Passo 1 — Coleta de Contexto (Obrigatório)

### 1a. Carregar o contexto (silencioso)

\`\`\`
1. SE business-profile.md existir → ler (nome, nicho, produtos, público, voz, cores)
2. SE blog-strategy/ existir → ler a estratégia para identificar:
   - O cluster ao qual este artigo pertence
   - Os artigos já planejados (links)
   - O pilar do cluster (link obrigatório)
3. SE blog/ contiver artigos → listar os arquivos existentes para os links
4. Carregar references/seo-standards.md e references/internal-linking.md
\`\`\`

### 1b. Perguntas por blocos

#### Bloco 1 — O assunto e o SEO

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual é a **palavra-chave principal** que você quer atingir? | Otimização SEO |
| Q2 | Qual é a **intenção de busca**? \`informacional\` (aprender) / \`comercial\` (comparar) / \`transacional\` (comprar) | Estrutura e tom |
| Q3 | Qual **tipo de artigo**? \`pilar\` (3000+ palavras, hub do cluster) / \`standard\` (2000 palavras) / \`satélite\` (1500 palavras, ligado a um pilar) | Profundidade e links |

#### Bloco 2 — O público e o produto

| # | Pergunta | Por quê |
|---|----------|---------|
| Q4 | Para **quem** é este artigo? Descreva seu leitor ideal. | Tom e profundidade |
| Q5 | Qual **produto/serviço** promover nos CTAs? (nome, preço, URL) | CTAs contextuais |
| Q6 | Você tem um **ângulo único**? (experiência pessoal, dados, método, opinião contrária) | E-E-A-T + diferenciação |

#### Bloco 3 — O formato e os links

| # | Pergunta | Por quê |
|---|----------|---------|
| Q7 | Qual **formato de saída**? \`html\` / \`markdown\` / \`wordpress\` (publicação direta) | Entregável |
| Q8 | Você tem **outros artigos** no seu blog? Se sim, liste os assuntos ou URLs para criar os links. | Links internos |
| Q9 | **Voz de marca** em 2-3 palavras? (ex: "direto e especialista", "caloroso e pedagógico") | Coerência |

#### Se formato = wordpress (perguntas adicionais)

| # | Pergunta | Por quê |
|---|----------|---------|
| Q10 | Qual é a **URL do seu site WordPress**? (ex: https://meusite.com) | Endpoint API |
| Q11 | Qual é o seu **nome de usuário WordPress**? | Autenticação |
| Q12 | Qual é a sua **senha de aplicativo WordPress**? (Gerada em Usuários > Perfil > Senhas de aplicativo) | Autenticação API REST |

> **Nota de segurança**: A senha de aplicativo é diferente da sua senha WordPress. Ela é gerada especificamente para acessos de API. NUNCA compartilhe sua senha WordPress principal.

---

## Passo 2 — Análise de Keyword

Antes de planejar o artigo, analisar a palavra-chave:

\`\`\`
ANÁLISE DE KEYWORD: "[keyword]"
════════════════════════════════

Palavra-chave principal   : [keyword]
Intent                    : [informacional/comercial/transacional]
Tipo de artigo            : [pilar/standard/satélite]

Variações e LSI:
  - [variação 1]
  - [variação 2]
  - [variação 3]
  - [variação long tail 1]
  - [variação long tail 2]

Perguntas "People Also Ask":
  - [Pergunta 1]?
  - [Pergunta 2]?
  - [Pergunta 3]?
  - [Pergunta 4]?
  - [Pergunta 5]?

Sub-assuntos a cobrir:
  - [Sub-assunto 1] → H2 ou H3
  - [Sub-assunto 2] → H2 ou H3
  - [Sub-assunto 3] → H2 ou H3
\`\`\`

---

## Passo 3 — Plano do Artigo (validação obrigatória)

> Ler \`references/seo-standards.md\` para os critérios SEO.

\`\`\`
PLANO DO ARTIGO
════════════════

SEO:
  Title tag    : [< 60 car, keyword no início]
  Meta desc    : [< 160 car, keyword + CTA]
  Slug         : /blog/[keyword-slug]
  Palavras alvo: [N]
  Idioma       : PT-BR

Estrutura:
  INTRO (200-300 palavras)
    - Hook: [abertura que nomeia o problema]
    - Promessa: [o que o leitor vai aprender]
    - Contexto: [por que isso importa agora]
    → 1 link interno para o pilar ou artigo fundamental

  H2: [Seção 1 — mira variação da keyword]
    H3: [Sub-assunto A]
    H3: [Sub-assunto B]
    → Link interno para [artigo existente]
    → [CTA suave após esta seção]

  H2: [Seção 2 — responde a pergunta PAA]
    H3: [Sub-assunto C]
    H3: [Sub-assunto D — template/script incluído]
    → Link interno para [artigo existente]

  H2: [Seção 3 — framework acionável]
    H3: [Passo 1]
    H3: [Passo 2]
    H3: [Passo 3]
    → [CTA médio após esta seção]

  H2: [Seção 4 — mira variação long tail]
    → Link interno para [artigo existente]

  H2: FAQ — [3-5 perguntas People Also Ask]
    → 1 link interno em uma resposta

  CONCLUSÃO (200-300 palavras)
    - Recapitulação dos 3 pontos principais
    - [CTA direto]
    → 2 links para artigos complementares

Links planejados:
  SAÍDAS  : → [Artigo A] (âncora: "[texto]")
            → [Artigo B] (âncora: "[texto]")
            → [Artigo C] (âncora: "[texto]")
  ENTRADAS: ← Atualizar [Artigo X] para linkar para este
            ← Atualizar [Artigo Y] para linkar para este
\`\`\`

**Hard gate**: NÃO redigir sem validação do plano.

---

## Passo 4 — Escrever o Conteúdo

### 4a. Regras SEO on-page

> Ler \`references/seo-standards.md\` para as especificações completas.

| Elemento | Regra |
|----------|-------|
| H1 | Apenas 1. Contém a keyword. < 60 caracteres. |
| H2 | Cada H2 mira uma variação ou pergunta. Não usar "Introdução" ou "Conclusão" como H2. |
| H3 | Divide em blocos escaneáveis. 3-5 por H2. |
| Primeiro parágrafo | Keyword nas primeiras 100 palavras. |
| Densidade | 1-2% natural. Se soar forçado, é demais. |
| Parágrafos | Máx. 2-4 frases. |
| Listas | Ao menos 1 lista por seção H2. |

### 4b. Links internos

> Ler \`references/internal-linking.md\` para o guia completo.

\`\`\`
REGRAS DE LINKS DURANTE A REDAÇÃO:

1. Primeiro link interno nas primeiras 200 palavras
2. 3-10 links internos conforme o comprimento
3. Âncoras SEMPRE descritivas e variadas
4. Links no FLUXO do texto (não isolados)
5. Link para o pilar do cluster obrigatório
6. Os links agregam VALOR ao leitor
7. Verificar que os artigos de destino existem
\`\`\`

### 4c. Sinais E-E-A-T

Integrar no artigo:

| Sinal | Implementação |
|-------|--------------|
| **Experience** | Anedotas pessoais: "Quando testei...", "Em 3 anos de prática..." |
| **Expertise** | Dados numéricos, frameworks estruturados, fontes citadas |
| **Authority** | Assinatura do autor com bio, data de publicação, fontes reconhecidas |
| **Trust** | Disclaimers, ressalvas honestas, sem promessas, data de atualização |

### 4d. Prontidão para Pesquisa de IA

Para maximizar as chances de ser citado por IAs:

| Técnica | Implementação |
|---------|--------------|
| Passagem citável | 134-167 palavras auto-suficientes por seção-chave |
| Resposta direta | Responder à pergunta nas primeiras 40-60 palavras da seção |
| Dados estruturados | Tabelas, listas, comparações |
| Definições | Formato "X é..." para conceitos-chave |
| Perguntas em H2/H3 | "Como [X]?", "Por que [Y]?" |

### 4e. CTAs integrados

**CTA Suave** (após a 1ª seção):
\`\`\`
💡 Este [conceito] faz parte de [Produto]. [Benefício principal em 1 frase] — [preço]. [Link]
\`\`\`

**CTA Médio** (meio do artigo, após provar a expertise):
\`\`\`
Este [framework/método] foi extraído de [Produto], que contém [N] outras [ferramentas/templates] para [resultado]. [Link]
\`\`\`

**CTA Direto** (conclusão):
\`\`\`
Se você quer [resultado concreto], [Produto] é para você. É um [tipo] por [preço] com [benefício #1] + [benefício #2]. [Link]
\`\`\`

### 4f. Schema JSON-LD

Incluir no \`<head>\` do artigo HTML:

\`\`\`json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Título H1]",
  "description": "[Meta description]",
  "author": {
    "@type": "Person",
    "name": "[Autor]",
    "url": "[URL perfil autor]"
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "publisher": {
    "@type": "Organization",
    "name": "[Nome do negócio]"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[URL artigo]"
  },
  "keywords": ["[keyword1]", "[keyword2]", "[keyword3]"]
}
</script>
\`\`\`

### 4g. Seção FAQ com schema

\`\`\`html
<section class="faq">
  <h2>Perguntas frequentes</h2>

  <div class="faq-item">
    <h3>[Pergunta 1]?</h3>
    <p>[Resposta direta, 40-100 palavras, auto-suficiente]</p>
  </div>
  <!-- ... 3-5 perguntas ... -->
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Pergunta 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta]"
      }
    }
  ]
}
</script>
\`\`\`

> **Nota**: FAQPage não gera mais resultados enriquecidos no Google (desde agosto de 2023, reservado para sites gov/saúde), mas continua útil para citações de IA e estrutura do conteúdo.

---

## Passo 5 — Score de Qualidade SEO

### Score SEO (0-100)

| Categoria | Peso | Verificações |
|-----------|------|------------|
| SEO On-Page | 30% | Title, meta, H1, densidade keyword, slug, primeiro parágrafo |
| Conteúdo | 25% | Profundidade, acionabilidade, O QUÊ/POR QUÊ/COMO/MEDIR, templates |
| Links | 20% | Links internos (quantidade, âncoras, posicionamento), sem artigos órfãos |
| E-E-A-T | 15% | Experience, expertise, authority, sinais de trust |
| Estrutura | 10% | Hierarquia de títulos, parágrafos curtos, listas, FAQ, schema |

### Exibição

\`\`\`
SCORE SEO: [XX]/100

On-Page    [████████░░] 82/100
Conteúdo   [██████████] 95/100
Links      [███████░░░] 73/100
E-E-A-T    [████████░░] 80/100
Estrutura  [█████████░] 88/100

Problemas:
  ⚠️ [Problema 1]
  ⚠️ [Problema 2]
\`\`\`

---

## Passo 6 — Entrega ou Publicação

### Opção A: Arquivo local

Salvar em \`blog/[slug].[html|md]\`.

### Opção B: Publicação no WordPress

Se o usuário escolheu o formato \`wordpress\` e forneceu as credenciais:

\`\`\`bash
# Publicação via WordPress REST API
curl -X POST "[WP_URL]/wp-json/wp/v2/posts" \\
  -u "[username]:[app_password]" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "[Título]",
    "content": "[Conteúdo HTML]",
    "status": "draft",
    "slug": "[slug]",
    "excerpt": "[Meta description]",
    "meta": {
      "_yoast_wpseo_title": "[SEO Title]",
      "_yoast_wpseo_metadesc": "[Meta description]"
    }
  }'
\`\`\`

**Regras de publicação WordPress:**

| Regra | Detalhe |
|-------|---------|
| Sempre publicar em **rascunho** primeiro | O usuário revisa e publica manualmente |
| Testar a conexão antes de publicar | \`curl -u user:pass [WP_URL]/wp-json/wp/v2/posts?per_page=1\` |
| Verificar que a API REST está ativa | Testar \`[WP_URL]/wp-json/\` |
| NUNCA armazenar a senha | Usada na memória apenas, não escrita em arquivo |
| Confirmar com o usuário antes de enviar | "Vou publicar em rascunho em [URL]. Você confirma?" |
| Gerenciar categorias e tags | Perguntar se o usuário quer atribuir categorias |

**Após publicação:**
\`\`\`
✅ ARTIGO PUBLICADO EM RASCUNHO

📄 URL admin  : [WP_URL]/wp-admin/post.php?post=[ID]&action=edit
📌 Título     : [título]
📊 Status     : Rascunho (publicar manualmente)
🔗 Slug       : /blog/[slug]

CHECKLIST ANTES DA PUBLICAÇÃO:
  [ ] Revisar o artigo
  [ ] Adicionar imagens (alt text incluído no conteúdo)
  [ ] Verificar os links internos (links ativos)
  [ ] Configurar o SEO (Yoast/RankMath)
  [ ] Agendar ou publicar
\`\`\`

### Resumo de entrega (todos os formatos)

\`\`\`
✅ ARTIGO CRIADO — Score SEO: [XX]/100

📄 Arquivo  : [caminho ou URL]
📌 Título   : [título]
📦 Tipo     : [pilar/standard/satélite]
📊 Palavras : ~[N]
🔗 Links    : [N] links internos de saída, [N] artigos a atualizar

LINKS — AÇÕES PÓS-PUBLICAÇÃO:
  → Adicionar link para este artigo em: [Artigo A], [Artigo B]
  → Com as âncoras: "[âncora 1]", "[âncora 2]"

CONTEÚDO DERIVADO:
  1. Carrossel Instagram — [assunto] (5-7 slides)
  2. Post LinkedIn — Abertura + link
  3. Email — Assunto: "[assunto]" + teaser
  4. Thread X — 5 tweets principais
  5. Reel/TikTok — 30s sobre o takeaway #1

PRÓXIMOS PASSOS:
  → /dp-blog-publish          — Publicar no WordPress (se ainda não feito)
  → /dp-social-caption        — Captions para promover
  → /dp-email-sequence        — Enviar para a lista
  → /dp-ad-angles-meta        — Amplificar com anúncios
\`\`\`

---

## Critérios de Qualidade

| ID | Critério | Severidade |
|----|----------|-----------|
| QG-01 | Nenhum placeholder ([TODO], [INSERIR], Lorem ipsum) | Crítico |
| QG-02 | H1 único, contém a keyword principal, < 60 caracteres | Crítico |
| QG-03 | Meta description < 160 caracteres, inclui a keyword | Crítico |
| QG-04 | Keyword nas primeiras 100 palavras | Alto |
| QG-05 | Nenhuma promessa de receita ou resultados garantidos | Crítico |
| QG-06 | Links internos: ≥ 3 para artigo < 1500 palavras, ≥ 5 para 1500-2500 palavras, ≥ 8 para 2500+ | Crítico |
| QG-07 | Todas as âncoras internas são descritivas e diferentes | Alto |
| QG-08 | Link para o pilar do cluster se artigo satélite | Crítico |
| QG-09 | Seção FAQ com 3-5 perguntas | Alto |
| QG-10 | Schema JSON-LD BlogPosting incluído | Alto |
| QG-11 | Hierarquia H1 > H2 > H3 respeitada (sem pulos) | Crítico |
| QG-12 | Sem keyword stuffing — densidade máx 1-2% | Crítico |
| QG-13 | Ao menos 2 links externos para fontes autorizadas | Médio |
| QG-14 | Parágrafos < 4 frases | Médio |
| QG-15 | Ao menos 1 framework, script ou template acionável | Alto |
| QG-16 | Assinatura do autor com data de publicação | Alto |
| QG-17 | Se WordPress: publicado em RASCUNHO apenas, nunca direto | Crítico |
| QG-18 | Se WordPress: senha não escrita em arquivo | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Sem keyword | Perguntar: "Qual assunto interessa ao seu público?" e ajudar a encontrar a keyword |
| Keyword muito ampla ("marketing") | Propor 3-5 long-tail mais focadas |
| Keyword muito específica | Alertar honestamente, sugerir keyword pai |
| Sem produto para promover | CTAs para newsletter, lead magnet ou engajamento |
| Sem artigos existentes para links | Criar o artigo como primeiro conteúdo, registrar links futuros |
| Estratégia de blog inexistente | Recomendar \`/dp-blog-strategy\` primeiro, mas não bloquear |
| business-profile.md ausente | Fazer as perguntas de contexto diretamente |
| WordPress API inacessível | Diagnosticar: URL incorreta? API REST desativada? Plugin de segurança? Propor salvar em local. |
| Senha WordPress incorreta | Orientar: "Vá em WordPress > Usuários > Perfil > Senhas de aplicativo. Crie uma nova senha." |
| Assunto YMYL (saúde, finanças, jurídico) | Adicionar disclaimers, recomendar revisão por especialista |
| O usuário quer ir rápido | Modo express: Q1, Q4, Q7 apenas |
| Conteúdo existente para reestruturar | Ler, analisar, reorganizar para SEO em vez de recomeçar do zero |

---

## Integração com Outros Skills

| Antes | Skill | Quando |
|-------|-------|--------|
| Estratégia de conteúdo | \`/dp-blog-strategy\` | Para ter a lista de artigos e os links planejados |
| Perfil do negócio | \`business-profile.md\` | Se ainda não criado |
| Análise da concorrência | \`/dp-competitor-analysis\` | Para identificar ângulos diferenciadores |

| Depois | Skill | Quando |
|--------|-------|--------|
| Publicar no WordPress | \`/dp-blog-publish\` | Se não feito diretamente |
| Captions sociais | \`/dp-social-caption\` | Para promover |
| Sequência de email | \`/dp-email-sequence\` | Para enviar para a lista |
| Calendário editorial | \`/dp-mediaplan\` | Para planejar a promoção |
| Publicidade | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para amplificar |
| Auditoria SEO | \`/dp-playbook-audit\` | Para verificar a qualidade |

---

## Padrões SEO de Referência

### Requisitos de SEO On-Page

#### Title Tag (H1 / <title>)
| Critério | Regra |
|----------|-------|
| Comprimento | Máx. 50-60 caracteres |
| Keyword | Incluída, idealmente no início |
| Unicidade | Cada artigo tem um título único |
| Formato | [Assunto] — [Benefício ou ângulo] |

#### Meta Description
| Critério | Regra |
|----------|-------|
| Comprimento | 120-160 caracteres |
| Keyword | Incluída naturalmente |
| CTA | Incluir uma chamada para ação |
| Unicidade | Cada artigo tem uma meta única |

#### Estrutura de títulos
\`\`\`
H1 : apenas 1 por artigo, contém a keyword principal
  H2 : seções principais, miram variações da keyword
    H3 : sub-seções, perguntas específicas
      H4 : raro, para sub-detalhes se necessário
\`\`\`
**Regra**: NUNCA pular um nível (H1 → H3 sem H2 = proibido).

#### Densidade de keyword
| Zona | Regra |
|------|-------|
| Densidade global | 1-2% natural — NUNCA forçar |
| Primeiras 100 palavras | Keyword principal presente |
| Últimas 100 palavras | Keyword principal ou variação |
| H2 | 50% dos H2 contêm uma variação |
| Alt text de imagens | Ao menos 1 imagem com keyword no alt |

#### URL / Slug
- Curto: máx. 3-5 palavras
- Inclui a keyword
- Hífens, sem underscores
- Sem stopwords (o, a, de, do, um, etc.)
- Tudo em minúsculas

### Maillage interno

#### Quantidade de links por artigo
| Comprimento do artigo | Links internos mín. | Links externos mín. |
|----------------------|---------------------|---------------------|
| < 1000 palavras | 2-3 | 1-2 |
| 1000-2000 palavras | 3-5 | 2-3 |
| 2000-3000 palavras | 5-8 | 3-4 |
| 3000+ palavras | 8-10 | 4-5 |

#### Regras de âncoras
| Fazer | NÃO fazer |
|-------|-----------|
| Âncoras descritivas ("guia completo de SEO") | "clique aqui" |
| Âncoras variadas (não a mesma em todo lugar) | Mesma âncora para 3 links diferentes |
| Âncoras naturais no fluxo do texto | Links isolados no final da página |
| Âncoras com keywords-alvo | Âncoras genéricas ("saiba mais") |

### Níveis mínimos de conteúdo

| Tipo | Palavras mínimas | Seções H2 mín. |
|------|-----------------|----------------|
| Artigo standard | 1500 | 4 |
| Artigo pilar | 3000 | 6 |
| Artigo satélite | 1200 | 3 |
| Guia completo | 4000 | 8 |
| Listicle | 1500 | Tantos quanto os itens |

---

## Estratégia de Links Internos — Referência

### Princípios

O link interno é o sistema nervoso do blog. Ele permite:
1. **SEO**: distribuir autoridade (link juice) entre as páginas
2. **UX**: guiar o leitor para conteúdo complementar
3. **Crawl**: ajudar o Google a descobrir e entender a estrutura
4. **Conversão**: criar um percurso leitor → lead → cliente

### Estratégia Hub & Spoke

\`\`\`
                    ┌──────────┐
              ┌────→│ Sat. 1   │←───┐
              │     └──────────┘    │
              │                     │
┌──────────┐  │  ┌──────────────┐   │  ┌──────────┐
│ Sat. 4   │←─┼─→│   PILAR      │←──┼─→│ Sat. 2   │
└──────────┘  │  └──────────────┘   │  └──────────┘
              │                     │
              │     ┌──────────┐    │
              └────→│ Sat. 3   │←───┘
                    └──────────┘
\`\`\`

- O **pilar** linka para cada satélite
- Cada **satélite** linka para o pilar
- Os satélites se linkam entre si se relevante
- Os pilares de clusters diferentes se linkam se temas relacionados

### Onde colocar os links

\`\`\`
ARTIGO
├── Introdução (palavras 1-200)
│   └── 1 link para o pilar ou artigo fundamental
│       Natural: "Se você está começando, veja [nosso guia sobre X]."
│
├── Seção 1 (H2)
│   └── 1 link para um satélite complementar
│       Natural: "Detalhamos este método em [artigo específico]."
│
├── Seções 2-3 (H2)
│   └── 1-2 links para artigos do mesmo cluster
│       Natural: "Como vimos em [artigo], [conceito] é fundamental."
│
├── Seção FAQ
│   └── 1 link em uma resposta do FAQ
│       Natural: "Para se aprofundar neste ponto, leia [artigo]."
│
└── Conclusão
    └── 1-2 links para o pilar + artigo "próximo passo"
        Natural: "Próximo passo: [artigo sobre o assunto seguinte]."
\`\`\`

---

## Exemplo de Artigo Anotado — Academia FitPro

> **Keyword principal:** como encontrar clientes em coaching fitness
> **Volume estimado:** 720/mês | **KD:** 28/100
> **Intenção:** Informacional → Transacional
> **Produto:** O Playbook do Coach Fitness — R$ 197
> **Voz:** Direta, motivadora, sem enrolação, tuteo
> **Comprimento alvo:** 2.000-2.500 palavras

### Title Tag
\`Como Encontrar Clientes em Coaching Fitness (7 Métodos Testados)\`
*(64 caracteres — ótimo: 50-60, aceitável até 70)*

### Meta Description
\`Você tem dificuldade para encontrar clientes em coaching fitness? Aqui estão 7 métodos testados com +200 coaches para lotar sua agenda em 90 dias. Guia completo.\`
*(160 caracteres — ótimo: 150-160)*

### Introdução (~150 palavras)

Você se pergunta **como encontrar clientes em coaching fitness** sem passar sua vida toda no Instagram? Não está sozinho. Quando lancei meu negócio de coach em 2018, passei 6 meses publicando conteúdo no vácuo. Zero cliente. Zero DM. Só curtidas de amigos.

Desde então, acompanhei **+200 coaches fitness** a lotar sua agenda. E a constatação é sempre a mesma: o problema nunca é a falta de habilidade, é a falta de **sistema de aquisição**.

Neste artigo, apresento os **7 métodos concretos** que funcionam em 2026 para encontrar clientes em coaching fitness — seja em academia, em domicílio ou online. Nada de blá-blá-blá, só o essencial.

*[LINK INTERNO: guia de lançamento da atividade de coach fitness]*

### Estrutura do Artigo (resumo)

- **H2: 1. Construa sua presença online (sem passar 4h/dia)**
  - H3: Otimize seu perfil Instagram como uma landing page
  - H3: Publique 3 tipos de conteúdo (e esqueça o resto)
  - H3: O DM estratégico: como engajar sem fazer spam
  - *CTA Suave*: O script completo de DM está no Playbook do Coach Fitness. R$ 197.

- **H2: 2. Transforme sua rede local em máquina de clientes**
  - H3: Parcerias com academias
  - H3: Eventos gratuitos: o recurso mais subestimado
  - *CTA Médio*: O Playbook inclui template completo de evento local.

- **H2: 3. Automatize sua aquisição com um sistema simples**
  - H3: O lead magnet fitness que funciona em 2026
  - H3: A sequência de email de 5 dias que converte
  - *CTA Suave*: Os 5 emails prontos estão no Playbook. R$ 197.

- **H2: FAQ — Perguntas frequentes**

- **CONCLUSÃO + CTA Direto**

### Checklist E-E-A-T

| Sinal E-E-A-T | Presente | Local |
|---|---|---|
| **Experience** — Vivência pessoal | ✅ | Introdução, Seção 2 |
| **Experience** — Casos reais de clientes | ✅ | Taxas de conversão por seção |
| **Expertise** — Metodologia estruturada | ✅ | Todas as H2 |
| **Expertise** — Dados numéricos | ✅ | Taxa de conversão DM, taxa landing page, taxa email |
| **Authoritativeness** — Bio completa | ✅ | Schema JSON-LD |
| **Authoritativeness** — Links internos coerentes | ✅ | 5 links para artigos pilares relacionados |
| **Trustworthiness** — Transparência de preços | ✅ | FAQ Q3, menciona preço do Playbook (R$ 197) |
| **Trustworthiness** — Sem promessas irrealistas | ✅ | "2-3 clientes em 2-4 semanas" (não "100 clientes em 7 dias") |`,
};

export default skill;
