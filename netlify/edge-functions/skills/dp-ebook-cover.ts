import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-ebook-cover",
  categoria: "Criação do Produto",
  descricao: "Gera capas profissionais para ebooks e produtos digitais. Produz um brief criativo completo, uma capa HTML/CSS standalone, prompts para IA de imagem (Midjourney, DALL-E, Ideogram), um mockup 3D em CSS e as especificações para Canva/Figma. Adaptado à identidade visual do projeto. Gatilhos: capa, cover, ebook cover, visual do produto, mockup, thumbnail, imagem do produto.",
  argumentHint: "[título ebook] [estilo: minimalista|bold|premium|warm|editorial]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Ebook Cover — Gerador de Capas de Produto

<!-- v2.0.0 | 2026-04-18 | Criação: briefs criativos, capa HTML/CSS, prompts IA imagem, mockup 3D CSS, specs Canva -->

Gera capas profissionais para produtos digitais DP Criador. Sem precisar de designer — o skill produz uma capa HTML pronta para tirar screenshot, ou um brief completo para Canva, Figma ou IA de imagem.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-ebook-cover [título]\` | Criação guiada completa (brief + HTML + prompts IA) |
| \`/dp-ebook-cover html [título]\` | Capa HTML/CSS standalone apenas |
| \`/dp-ebook-cover mockup [título]\` | Mockup 3D CSS (para landing page) |
| \`/dp-ebook-cover prompt [título]\` | Prompts IA imagem apenas (Midjourney, DALL-E, Ideogram) |
| \`/dp-ebook-cover canva [título]\` | Brief detalhado para Canva/Figma |
| \`/dp-ebook-cover batch [pasta]\` | Capas para todos os ebooks de uma pasta |

## Formato do Entregável

\`\`\`
ENTREGÁVEIS (até 5 arquivos):
│
├── 1. Brief criativo: covers/brief-[slug].md
│   ├── Direção artística completa
│   ├── Specs técnicas (dimensões, resoluções)
│   └── Variantes de composição (3 opções)
│
├── 2. Capa HTML: covers/[slug]-cover.html
│   ├── HTML/CSS standalone — abrir no navegador e tirar screenshot
│   ├── Design responsivo (adapta-se ao tamanho da janela)
│   └── Cores da marca via CSS custom properties
│
├── 3. Mockup 3D CSS: covers/[slug]-mockup.html
│   ├── Renderização 3D em CSS puro (perspective + transform)
│   ├── Integrável em uma landing page
│   └── Sem JS, sem imagem externa
│
├── 4. Prompts IA imagem: no brief
│   ├── Prompt Midjourney (otimizado v6)
│   ├── Prompt DALL-E 3 (otimizado ChatGPT)
│   └── Prompt Ideogram (otimizado texto sobre imagem)
│
└── 5. Brief Canva/Figma: no brief
    ├── Dimensões e margens
    ├── Elementos a posicionar (título, subtítulo, autor, logo)
    └── Fontes, cores, efeitos recomendados
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Título, subtítulo, autor, estilo, cores
2. Ler referências     → business-profile.md, design-system
3. Direção artística   → 3 opções de composição
4. Gerar a capa HTML/CSS
5. Gerar o mockup 3D CSS
6. Gerar os prompts IA imagem
7. Gerar o brief Canva/Figma
8. Quality check       → Legibilidade, hierarquia, coerência da marca
9. Entregar            → Arquivos + resumo
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório)

### 1a. Carregar o perfil do negócio (silencioso)

\`\`\`
SE business-profile.md existe:
  → Extrair: cores (primária, destaque), nome da marca, logo, estilo visual, fonte
  → Pré-preencher as opções de design
  → NÃO repetir perguntas já cobertas

SENÃO:
  → Fazer todas as perguntas
\`\`\`

### 1b. Perguntas por blocos

#### Bloco 1 — O conteúdo da capa

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | **Título do ebook** (como deve aparecer na capa) | Tipografia principal |
| Q2 | **Subtítulo**? (opcional — 1 linha máx) | Contexto abaixo do título |
| Q3 | **Nome do autor** (como deve aparecer) | Atribuição |
| Q4 | **Nome da marca / logo** a exibir? | Branding |

#### Bloco 2 — O estilo visual

| # | Pergunta | Por quê |
|---|----------|---------|
| Q5 | **Qual estilo?** \`minimalista\` (limpo, tipografia forte) / \`bold\` (contrastes, cores vivas) / \`premium\` (escuro, elegante, dourado) / \`warm\` (tons quentes, acolhedor) / \`editorial\` (estilo revista, moderno) | Direção artística |
| Q6 | **Cor primária** (hex ou nome) — ou "usar as do meu perfil" | Fundo / destaques |
| Q7 | **Cor de destaque** (hex ou nome) | Highlights / elementos decorativos |
| Q8 | Você quer uma **imagem de fundo** ou um **design tipográfico puro**? Se imagem: descreva o tipo desejado. | Composição |

---

## Etapa 2 — Direção Artística

### 2a. Dimensões e formatos

| Uso | Dimensões | Ratio | Resolução |
|-----|-----------|-------|-----------|
| Capa de ebook (padrão) | 1600 × 2560 px | 1:1.6 | 300 dpi |
| Thumbnail Hotmart/Kiwify | 1280 × 720 px | 16:9 | 72 dpi |
| Mockup landing page | 600 × 800 px | 3:4 | 72 dpi |
| Story Instagram | 1080 × 1920 px | 9:16 | 72 dpi |
| Post Instagram | 1080 × 1080 px | 1:1 | 72 dpi |

### 2b. Propor 3 composições

Para cada estilo, propor 3 opções de layout:

\`\`\`
OPÇÃO A — Tipográfico centralizado
══════════════════════════════════

┌──────────────────────────┐
│                          │
│         [MARCA]          │  ← Pequeno, topo, discreto
│                          │
│                          │
│      ████████████        │  ← Elemento decorativo (linha, forma)
│                          │
│     TÍTULO PRINCIPAL     │  ← Tipografia grande, bold, centrado
│     EM DUAS LINHAS       │
│                          │
│      subtítulo aqui      │  ← Menor, regular
│                          │
│      ████████████        │  ← Separador
│                          │
│       Por [Autor]        │  ← Base, centrado
│                          │
└──────────────────────────┘


OPÇÃO B — Faixa lateral
═══════════════════════

┌─────────┬────────────────┐
│         │                │
│  FAIXA  │                │
│  COR    │  TÍTULO        │  ← Alinhado à esquerda
│ PRIMARY │  PRINCIPAL     │
│         │                │
│  logo   │  subtítulo     │
│         │                │
│         │  ─────────     │
│         │  Por [Autor]   │
│         │                │
└─────────┴────────────────┘


OPÇÃO C — Imagem de fundo + overlay
════════════════════════════════════

┌──────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Imagem de fundo (escurecida)
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓  TÍTULO PRINCIPAL ▓▓│  ← Texto branco sobre overlay escuro
│▓▓▓▓  EM BRANCO BOLD   ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓  subtítulo        ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓  Por [Autor]  [logo] ▓│
└──────────────────────────┘
\`\`\`

Perguntar: "Qual você prefere? A, B, C, ou uma combinação?"

### 2c. Regras de composição por estilo

| Estilo | Fundo | Tipografia título | Tipografia subtítulo | Destaques | Efeito |
|--------|-------|-------------------|----------------------|-----------|--------|
| \`minimalista\` | Branco ou muito claro | Bold, preto, tamanho grande | Light, cinza | Linha fina cor destaque | Muito espaço branco |
| \`bold\` | Cor primária saturada | Extra-bold, branco, muito grande | Semi-bold, branco 80% | Formas geométricas, contraste | Sombras marcadas |
| \`premium\` | Preto ou azul muito escuro | Serif ou sans-serif elegante, dourado/branco | Thin, dourado 60% | Dourado, cobre, linha fina | Sutil, luxuoso |
| \`warm\` | Bege, creme, terra | Bold, marrom escuro | Regular, marrom médio | Laranja, terracota | Cantos arredondados, suave |
| \`editorial\` | Branco acinzentado | Mix serif (título) + sans-serif (subtítulo) | Itálico, cinza | Linha editorial, grade | Estilo revista, assimétrico |

---

## Etapa 3 — Capa HTML/CSS

Gerar um arquivo HTML standalone que renderiza a capa no navegador.

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capa — [Título]</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --primary: [primary_color];
      --accent: [accent_color];
      --text: #ffffff;
      --bg: [primary_color];
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #f0f0f0;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .cover {
      width: 800px;
      height: 1280px;
      background: var(--bg);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }

    /* === ADAPTAR CONFORME O ESTILO ESCOLHIDO === */

    .cover-brand {
      position: absolute;
      top: 40px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .cover-decorator {
      width: 80px;
      height: 4px;
      background: var(--accent);
      margin-bottom: 2rem;
      border-radius: 2px;
    }

    .cover-title {
      font-size: 3.2rem;
      font-weight: 800;
      line-height: 1.1;
      color: var(--text);
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      max-width: 90%;
    }

    .cover-subtitle {
      font-size: 1.15rem;
      font-weight: 300;
      color: rgba(255,255,255,0.8);
      max-width: 80%;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .cover-decorator-bottom {
      width: 60px;
      height: 3px;
      background: var(--accent);
      margin-bottom: 2rem;
      border-radius: 2px;
    }

    .cover-author {
      font-size: 1rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      letter-spacing: 0.05em;
    }

    .cover-badge {
      position: absolute;
      bottom: 40px;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.4);
    }

    /* Responsivo para preview */
    @media (max-width: 850px) {
      .cover {
        width: 100vw;
        height: 160vw;
        padding: 40px;
      }
      .cover-title { font-size: 2.2rem; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <span class="cover-brand">[MARCA]</span>
    <div class="cover-decorator"></div>
    <h1 class="cover-title">[TÍTULO]</h1>
    <p class="cover-subtitle">[SUBTÍTULO]</p>
    <div class="cover-decorator-bottom"></div>
    <p class="cover-author">Por [AUTOR]</p>
    <span class="cover-badge">[MARCA] — [ANO]</span>
  </div>
</body>
</html>
\`\`\`

**Adaptar o CSS** conforme o estilo escolhido (Q5):
- \`minimalista\`: \`--bg: #ffffff; --text: #111111;\` fundo branco, título preto
- \`bold\`: \`--bg: var(--primary);\` fundo cor saturada, título branco, elementos grandes
- \`premium\`: \`--bg: #0a0a0a;\` fundo preto, título branco/dourado, destaques dourados
- \`warm\`: \`--bg: #fef6ee;\` fundo creme, título marrom, destaques terra
- \`editorial\`: \`--bg: #fafaf8;\` fundo acinzentado, título preto, mix serif/sans-serif

**Instrução ao usuário**:
\`\`\`
Para capturar sua capa como imagem:
1. Abra o arquivo covers/[slug]-cover.html no Chrome
2. Ajuste o tamanho da janela ao ratio desejado
3. Clique com o botão direito → "Inspectar" → selecione o elemento .cover
4. Clique com o botão direito no elemento → "Capture node screenshot"
5. → Imagem PNG de alta qualidade salva

Ou: screenshot com Cmd+Shift+4 (Mac) / Win+Shift+S (Windows)
\`\`\`

---

## Etapa 4 — Mockup 3D CSS

Gerar uma renderização 3D do ebook em CSS puro, integrável em uma landing page.

\`\`\`html
<div class="mockup-3d" style="perspective: 1200px; display: flex; justify-content: center; padding: 3rem 0;">
  <div style="
    width: 280px;
    height: 400px;
    background: var(--primary, [primary_color]);
    border-radius: 4px 16px 16px 4px;
    transform: rotateY(-20deg) rotateX(5deg);
    box-shadow:
      -15px 15px 30px rgba(0,0,0,0.3),
      inset -3px 0 8px rgba(0,0,0,0.15),
      inset 0 0 0 1px rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
    position: relative;
    transition: transform 0.4s ease;
  ">
    <!-- Efeito lombada do livro -->
    <div style="
      position: absolute;
      left: -12px;
      top: 4px;
      bottom: 4px;
      width: 12px;
      background: linear-gradient(
        to right,
        rgba(0,0,0,0.15),
        rgba(0,0,0,0.05) 40%,
        rgba(255,255,255,0.05) 60%,
        rgba(0,0,0,0.1)
      );
      border-radius: 4px 0 0 4px;
      transform: skewY(-2deg);
    "></div>

    <!-- Conteúdo da capa -->
    <p style="font-size: 0.55rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: [accent_color]; margin-bottom: 1.5rem;">[MARCA]</p>
    <div style="width: 40px; height: 2px; background: [accent_color]; margin-bottom: 1rem;"></div>
    <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 0.5rem; letter-spacing: -0.02em;">[TÍTULO]</h3>
    <p style="font-size: 0.65rem; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem;">[SUBTÍTULO]</p>
    <div style="width: 30px; height: 2px; background: [accent_color]; margin-bottom: 1rem;"></div>
    <p style="font-size: 0.6rem; font-weight: 600; color: rgba(255,255,255,0.8);">Por [AUTOR]</p>
  </div>
</div>
\`\`\`

**Instruções**: "Copie este bloco HTML na sua landing page, na seção Hero. Substitua as cores e o texto. O mockup 3D é em CSS puro — sem JS, sem imagem."

---

## Etapa 5 — Prompts IA Imagem

### Prompt Midjourney (v6)

\`\`\`
[ESTILO] ebook cover design, "[TÍTULO]" written in bold typography,
[COMPOSIÇÃO: centered | left-aligned | overlay on image],
[FUNDO: solid [primary_color] background | dark background | gradient],
[DESTAQUES: [accent_color] decorative lines | geometric shapes | subtle glow],
professional digital product cover, clean modern design,
[ESTILO FONTE: sans-serif bold | serif elegant | mixed typography],
high contrast, sharp text, no people, no photos,
--ar 5:8 --v 6 --style raw --s 250
\`\`\`

**Exemplo concreto (estilo bold):**
\`\`\`
Bold modern ebook cover design, "PLAYBOOK DO COACH FITNESS" written in
extra-bold white sans-serif typography on solid emerald green #059669 background,
centered composition, thin gold accent line separating title and subtitle,
subtitle "10 clientes em 30 dias" in lighter weight, author name at bottom,
professional digital product aesthetic, clean geometric design, high contrast,
sharp readable text --ar 5:8 --v 6 --style raw --s 250
\`\`\`

### Prompt DALL-E 3 (ChatGPT)

\`\`\`
Create a professional ebook cover design with the following specifications:
- Title: "[TÍTULO]" in bold [font style] typography
- Subtitle: "[SUBTÍTULO]" in lighter weight below
- Author: "Por [AUTOR]" at the bottom
- Background: [descrição — solid color / gradient / dark / image]
- Primary color: [primary_color]
- Accent color: [accent_color] for decorative elements
- Style: [minimalista / bold / premium / warm / editorial]
- Aspect ratio: 5:8 (portrait, ebook format)
- The text must be clearly readable and properly spelled
- No photographs of people
- Clean, modern, professional design
\`\`\`

### Prompt Ideogram (otimizado para texto legível)

\`\`\`
"[TÍTULO]" ebook cover, [estilo] design, [primary_color] background,
[accent_color] accent elements, "[SUBTÍTULO]" subtitle,
"Por [AUTOR]" author credit, professional typography,
sharp text rendering, digital product cover, 5:8 aspect ratio
\`\`\`

> **Nota importante**: IAs de imagem têm dificuldade com texto longo. Se o título tiver mais de 5 palavras, recomendar gerar a imagem de fundo SEM texto e depois adicionar o texto no Canva/Figma.

---

## Etapa 6 — Brief Canva/Figma

\`\`\`
BRIEF CANVA / FIGMA
════════════════════

DOCUMENTO
  Dimensões : 1600 × 2560 px (padrão capa de ebook)
  Margens   : 80px de cada lado (zona de segurança do texto)
  Fundo     : [cor ou imagem — conforme o estilo]

ELEMENTOS A POSICIONAR (de cima para baixo):
  1. Logo/Marca — topo centro, 80px da borda
     Fonte  : [fonte] Semi-Bold, 14px, letter-spacing 3px, uppercase
     Cor    : [accent_color]

  2. Decorador — linha horizontal
     Tamanho: 80px × 4px
     Cor    : [accent_color]
     Pos    : Centro, ~35% do topo

  3. Título — centro
     Fonte  : [fonte] Extra-Bold, 72-96px
     Cor    : [text_color]
     Alinha : Centro
     Máx    : 3 linhas
     Dica   : Reduzir o tamanho se > 3 linhas

  4. Subtítulo — abaixo do título
     Fonte  : [fonte] Light, 24-28px
     Cor    : [text_color 70% opacidade]
     Alinha : Centro
     Máx    : 2 linhas

  5. Decorador inferior — linha horizontal
     Tamanho: 60px × 3px
     Cor    : [accent_color]

  6. Autor — base centro, 100px da borda
     Fonte  : [fonte] Semi-Bold, 20px
     Cor    : [text_color 90% opacidade]

EFEITOS OPCIONAIS:
  - Sombra no texto (se fundo imagem)
  - Gradient overlay (se imagem: preto 60% → transparente)
  - Forma decorativa geométrica (círculo, triângulo, linhas)

EXPORTAR:
  - PNG alta qualidade (300 dpi se impressão, 72 dpi se digital)
  - Também exportar em 1280×720 (thumbnail) e 1080×1080 (Instagram)
\`\`\`

---

## Etapa 7 — Quality Check

### Checklist antes da entrega

\`\`\`
LEGIBILIDADE:
  [ ] O título é legível em 1 segundo (mesmo em thumbnail)
  [ ] O contraste texto/fundo é suficiente (ratio ≥ 4.5:1)
  [ ] O título não está cortado nem muito pequeno
  [ ] Não mais de 3 linhas para o título

HIERARQUIA:
  [ ] O olho vai: Título → Subtítulo → Autor (nessa ordem)
  [ ] O título domina visualmente (2-3x maior que o resto)
  [ ] O autor está visível, mas discreto

COERÊNCIA DA MARCA:
  [ ] As cores batem com o business-profile.md
  [ ] O estilo é coerente com a landing page
  [ ] A fonte é a mesma dos outros materiais

TÉCNICO:
  [ ] O HTML é válido e abre no navegador
  [ ] O mockup 3D renderiza corretamente (perspective + sombra)
  [ ] Os prompts IA são específicos e realistas
  [ ] O brief Canva tem as dimensões exatas
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | O título é legível em thumbnail (< 100px de largura) | Crítico |
| QG-02 | O contraste texto/fundo respeita o ratio WCAG 4.5:1 | Crítico |
| QG-03 | As cores correspondem ao business-profile.md | Alto |
| QG-04 | O arquivo HTML é standalone (nenhuma dependência externa exceto Google Fonts) | Crítico |
| QG-05 | O mockup 3D usa as mesmas cores da capa | Alto |
| QG-06 | Os prompts IA NÃO pedem texto longo (> 5 palavras) na imagem | Alto |
| QG-07 | O brief Canva tem as dimensões exatas em pixels | Alto |
| QG-08 | Pelo menos 3 composições propostas antes de gerar | Médio |
| QG-09 | O título tem no máximo 3 linhas na capa | Alto |
| QG-10 | Sem erro ortográfico no título/subtítulo | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Título muito longo (> 8 palavras) | Propor encurtar. "Um bom título de capa tem 3-6 palavras. O subtítulo carrega o resto." |
| Sem cores | Carregar business-profile.md ou propor 3 paletas |
| O usuário quer foto na capa | Recomendar prompt IA sem texto + adição de texto no Canva |
| Estilo não especificado | Propor os 5 estilos com preview ASCII e pedir para escolher |
| O usuário quer várias capas | Gerar as 3 composições em HTML (A, B, C) |
| Título em 2 idiomas | Escolher um idioma para a capa. A outra versão = outro arquivo. |
| O mockup 3D não renderiza bem no Safari | O CSS perspective é padrão — se houver problema, propor o fallback flat |
| business-profile.md ausente | Perguntar Q5-Q7 obrigatoriamente |
| O usuário já tem uma imagem de capa | Propor o mockup 3D integrando sua imagem como textura |

---

## Entrega

\`\`\`
✅ CAPA CRIADA

📄 Brief criativo : covers/brief-[slug].md
🎨 Capa HTML      : covers/[slug]-cover.html
📦 Mockup 3D CSS  : covers/[slug]-mockup.html
🤖 Prompts IA     : no brief (Midjourney, DALL-E, Ideogram)
🎯 Brief Canva    : no brief (dimensões, elementos, efeitos)

PARA USAR:
  → Abrir [slug]-cover.html no Chrome → screenshot
  → OU copiar o mockup 3D na sua landing page (seção Hero)
  → OU usar o prompt IA para gerar uma imagem
  → OU seguir o brief Canva para criar manualmente

PRÓXIMAS ETAPAS:
  → /dp-landing-page        Integrar o mockup na página de vendas
  → /dp-export-pdf --cover  Usar como capa do PDF
  → /dp-social-caption      Usar como visual para os posts
  → /dp-ad-angles-meta      Usar como criativo publicitário
\`\`\`

---

## Integração Cross-Skill

| Antes | Skill | Quando |
|-------|-------|--------|
| Criar o ebook | \`/dp-playbook-create\` | O conteúdo deve existir para ter o título final |
| Perfil do negócio | \`/dp-business-profile\` | Para as cores e a marca |
| Validação de mercado | \`/dp-market-research\` | O título pode mudar após validação |

| Depois | Skill | Quando |
|--------|-------|--------|
| Landing page | \`/dp-landing-page\` | Integrar o mockup 3D no Hero |
| Export PDF | \`/dp-export-pdf --cover\` | Usar como página de capa |
| Ads Meta | \`/dp-ad-angles-meta\` | Usar como criativo publicitário |
| Social | \`/dp-social-caption\` | Visual para os posts de promoção |
| Mediaplan | \`/dp-mediaplan\` | Visual para os briefs de conteúdo |

---

# Exemplos de Capas — 5 Estilos

> Produto: Playbook do Coach Fitness — Academia FitPro
> Cores: #059669 (primária) / #10b981 (destaque)

---

## Estilo 1 — Minimalista

### HTML (extratos CSS chave)

\`\`\`css
.cover {
  background: #ffffff;
  color: #111111;
}
.cover-title {
  font-weight: 800;
  font-size: 3.5rem;
  color: #111;
}
.cover-subtitle {
  font-weight: 300;
  color: #666;
}
.cover-decorator {
  background: #059669;
}
.cover-brand {
  color: #059669;
}
\`\`\`

### Renderização ASCII

\`\`\`
┌──────────────────────────┐
│                          │
│      ACADEMIA FITPRO     │ ← Verde #059669, 14px, uppercase
│                          │
│                          │
│                          │
│        ━━━━━━━━          │ ← Linha verde #059669
│                          │
│     PLAYBOOK DO          │ ← Preto #111, 72px, Extra-Bold
│     COACH                │
│     FITNESS              │
│                          │
│  10 clientes em 30 dias  │ ← Cinza #666, 24px, Light
│                          │
│        ━━━━━━            │
│                          │
│     Por Sarah Dupont     │ ← Preto #333, 20px
│                          │
│          FUNDO BRANCO    │
└──────────────────────────┘
\`\`\`

### Prompt Midjourney

\`\`\`
Minimalist ebook cover design, "PLAYBOOK DO COACH FITNESS" in black
extra-bold sans-serif typography on pure white background, thin emerald
green #059669 horizontal accent line, clean spacious layout, subtitle
in light gray, author name at bottom, no images, no photos, professional
digital product, editorial aesthetic --ar 5:8 --v 6 --style raw --s 200
\`\`\`

---

## Estilo 2 — Bold

### CSS chave

\`\`\`css
.cover {
  background: #059669;
  color: #ffffff;
}
.cover-title {
  font-weight: 800;
  font-size: 4rem;
  color: #fff;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.cover-subtitle {
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.15);
  padding: 8px 20px;
  border-radius: 50px;
}
\`\`\`

### Renderização ASCII

\`\`\`
┌──────────────────────────┐
│██████████████████████████│ ← Fundo verde #059669 SATURADO
│██                      ██│
│██    ACADEMIA FITPRO   ██│ ← Branco, bold
│██                      ██│
│██                      ██│
│██   PLAYBOOK DO        ██│ ← Branco, 96px, EXTRA-BOLD
│██   COACH              ██│   Sombra projetada
│██   FITNESS            ██│
│██                      ██│
│██  ╭─────────────────╮ ██│
│██  │ 10 clientes em  │ ██│ ← Badge arredondado, fundo semi-transparente
│██  │ 30 dias         │ ██│
│██  ╰─────────────────╯ ██│
│██                      ██│
│██    Por Sarah Dupont  ██│
│██                      ██│
│██████████████████████████│
└──────────────────────────┘
\`\`\`

---

## Estilo 3 — Premium

### CSS chave

\`\`\`css
.cover {
  background: #0a0a0a;
  color: #f5f5f5;
}
.cover-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 3rem;
  color: #f5f5f5;
}
.cover-decorator {
  background: linear-gradient(90deg, #d4a853, #f0c878);
}
.cover-brand {
  color: #d4a853;
}
.cover-author {
  color: #d4a853;
}
\`\`\`

### Renderização ASCII

\`\`\`
┌──────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Fundo PRETO #0a0a0a
│▓▓                      ▓▓│
│▓▓    ACADEMIA FITPRO   ▓▓│ ← Dourado #d4a853, small caps
│▓▓                      ▓▓│
│▓▓    ════════════════  ▓▓│ ← Linha dourada gradient
│▓▓                      ▓▓│
│▓▓    Playbook do       ▓▓│ ← Branco acinzentado, SERIF, elegante
│▓▓    Coach             ▓▓│
│▓▓    Fitness           ▓▓│
│▓▓                      ▓▓│
│▓▓  10 clientes em 30d  ▓▓│ ← Dourado 60% opacidade, italic
│▓▓                      ▓▓│
│▓▓    ════════════      ▓▓│ ← Linha dourada fina
│▓▓                      ▓▓│
│▓▓    Sarah Dupont      ▓▓│ ← Dourado #d4a853
│▓▓                      ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└──────────────────────────┘
\`\`\`

---

## Estilo 4 — Warm

### CSS chave

\`\`\`css
.cover {
  background: #fef6ee;
  color: #3d2c1e;
}
.cover-title {
  font-weight: 800;
  color: #3d2c1e;
}
.cover-decorator {
  background: #e07a3a;
  border-radius: 4px;
}
.cover-subtitle {
  color: #8b6b4a;
}
\`\`\`

### Renderização ASCII

\`\`\`
┌──────────────────────────┐
│                          │ ← Fundo CREME #fef6ee
│      ACADEMIA FITPRO     │ ← Laranja terra #e07a3a
│                          │
│        ━━━━━━━━          │ ← Laranja arredondado
│                          │
│     PLAYBOOK DO          │ ← Marrom escuro #3d2c1e, bold
│     COACH                │
│     FITNESS              │
│                          │
│  10 clientes em 30 dias  │ ← Marrom médio #8b6b4a
│                          │
│        ━━━━━━            │
│     Por Sarah Dupont     │
│                          │  Clima ACOLHEDOR
└──────────────────────────┘
\`\`\`

---

## Estilo 5 — Editorial

### CSS chave

\`\`\`css
.cover {
  background: #fafaf8;
  color: #111;
}
.cover-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 3.5rem;
  text-align: left;
}
.cover-subtitle {
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-weight: 300;
  text-align: left;
}
.cover-line-left {
  position: absolute;
  left: 60px;
  top: 80px;
  bottom: 80px;
  width: 3px;
  background: #059669;
}
\`\`\`

### Renderização ASCII

\`\`\`
┌──────────────────────────┐
│ │                        │ ← Linha vertical verde à ESQUERDA
│ │   ACADEMIA FITPRO      │   Estilo REVISTA
│ │                        │
│ │                        │
│ │   Playbook do          │ ← SERIF (Playfair), alinhado à esquerda
│ │   Coach                │
│ │   Fitness              │
│ │                        │
│ │   10 clientes em       │ ← Sans-serif, italic, cinza
│ │   30 dias — o guia     │
│ │   acionável            │
│ │                        │
│ │   ─────────            │
│ │                        │
│ │   Sarah Dupont         │
│ │                        │   Fundo branco acinzentado #fafaf8
└──────────────────────────┘
\`\`\`

---

## Mockup 3D — Exemplo de Renderização

\`\`\`
         ╱─────────────────╲
        ╱                   ╲
       ╱  ACADEMIA FITPRO    ╲
      │                       │
      │    ━━━━━━━━━          │
      │                       │
      │   PLAYBOOK DO         │
      │   COACH               │
      │   FITNESS             │
      │                       │
      │   10 clientes em      │
      │   30 dias             │
      │                       │
      │    ━━━━━━             │
      │   Por Sarah Dupont    │
      │                       │
       ╲                     ╱
        ╲                   ╱
    ████ ╲─────────────────╱
    ████   ← Lombada do livro (sombra)
\`\`\`

O mockup 3D é gerado em CSS puro (perspective + rotateY + box-shadow). Nenhuma imagem necessária.
`,
};

export default skill;
