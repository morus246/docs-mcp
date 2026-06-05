import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-tracking-setup",
  categoria: "Promoção",
  descricao: "Configura o tracking completo para medir os resultados: Meta Pixel com events, Google Analytics 4 com conversões, Google Tag Manager, gerador de UTM por campanha/fonte. Produz o código pronto para colar e um guia de instalação passo a passo. Sem tracking, seu orçamento de anúncios é gasto no escuro. Gatilhos: tracking, pixel, analytics, conversão, UTM, GA4, Meta Pixel, Google Tag, medir, acompanhamento.",
  argumentHint: "[plataforma: meta|google|all] [url-landing-page]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Tracking Setup — Configurar o Acompanhamento de Resultados

<!-- v2.0.0 | 2026-04-19 | Criação: Meta Pixel, GA4, GTM, UTM, events, guia de instalação -->

Sem tracking, você gasta em anúncios sem saber o que funciona. Este skill gera todo o código de rastreamento necessário e um guia de instalação claro — mesmo que você não seja técnico.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-tracking-setup\` | Configuração completa guiada (Meta + GA4 + UTM) |
| \`/dp-tracking-setup meta\` | Meta Pixel apenas |
| \`/dp-tracking-setup google\` | Google Analytics 4 apenas |
| \`/dp-tracking-setup utm [campanha]\` | Gerar os UTM para uma campanha |
| \`/dp-tracking-setup check [url]\` | Verificar se o tracking está corretamente instalado |

## Formato do Entregável

\`\`\`
ENTREGÁVEIS:
├── tracking/setup-[projeto].md
│   ├── Código Meta Pixel (base + events)
│   ├── Código Google Analytics 4 (base + conversões)
│   ├── Código Google Tag Manager (opcional)
│   ├── Tabela UTM completa (todas as fontes/campanhas)
│   └── Guia de instalação passo a passo (com instruções visuais em texto)
└── Pronto para colar na landing page e na thank you page
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Plataformas de anúncios, URL da landing, produto, preço
2. Ler contexto        → business-profile.md, landing page existente
3. Gerar Meta Pixel    → Código base + events (ViewContent, Purchase)
4. Gerar GA4           → Código base + goals de conversão
5. Gerar UTM           → Tabela completa por fonte/campanha
6. Guia de instalação  → Onde colar o quê, passo a passo
7. Entrega             → Arquivo de tracking + resumo
\`\`\`

---

## Etapa 1 — Context Intake

### 1a. Carregar o contexto (silencioso)

\`\`\`
SE business-profile.md existe:
  → Ler: plataformas de anúncios, URL do site, produtos, preços

SE landing-pages/*.html existe:
  → Identificar a landing page e a thank you page

SENÃO:
  → Fazer as perguntas
\`\`\`

### 1b. Perguntas

#### Bloco 1 — As bases

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | **Quais plataformas de anúncios** você usa ou planeja usar? \`Meta Ads\` / \`Google Ads\` / \`as duas\` / \`nenhuma por enquanto\` | Determina quais pixels instalar |
| Q2 | **Qual é a URL da sua landing page?** | O código será adaptado para essa página |
| Q3 | **Qual é o seu produto e seu preço?** | Para configurar o event Purchase com o valor |

#### Bloco 2 — As ferramentas

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | **Você já tem uma conta no Meta Business Manager?** Se sim, você tem um Pixel ID? (formato: 15 dígitos) | Pré-preencher o código |
| Q5 | **Você já tem uma conta no Google Analytics?** Se sim, você tem um Measurement ID? (formato: G-XXXXXXXXXX) | Pré-preencher o código |
| Q6 | **Você usa Google Tag Manager (GTM)?** Se sim, você tem um Container ID? (formato: GTM-XXXXXXX) | Alternativa à instalação direta |

> Se o usuário não tiver Pixel ID ou GA4 ID, explicar como criá-los (no guia de instalação).

---

## Etapa 2 — Meta Pixel

### 2a. Código de base (colocar no \`<head>\` de CADA página)

\`\`\`html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '[PIXEL_ID]');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.net/tr?id=[PIXEL_ID]&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
\`\`\`

### 2b. Events a configurar

| Página | Event | Código | Quando |
|--------|-------|--------|--------|
| Landing page | \`ViewContent\` | \`fbq('track', 'ViewContent', {content_name: '[nome_produto]', content_type: 'product', value: [preço], currency: 'BRL'});\` | No carregamento da página |
| Clique no CTA | \`InitiateCheckout\` | \`fbq('track', 'InitiateCheckout', {value: [preço], currency: 'BRL'});\` | No clique no botão CTA |
| Thank you page | \`Purchase\` | \`fbq('track', 'Purchase', {value: [preço], currency: 'BRL', content_name: '[nome_produto]'});\` | No carregamento da thank you page |
| Lead magnet | \`Lead\` | \`fbq('track', 'Lead', {content_name: '[nome_lead_magnet]'});\` | No envio do formulário |

### 2c. Implementação na landing page

\`\`\`html
<!-- LANDING PAGE — no <head> -->
<script>
// Pixel de base (já instalado acima)
// Event ViewContent no carregamento
fbq('track', 'ViewContent', {
  content_name: '[nome_produto]',
  content_type: 'product',
  value: [preço],
  currency: 'BRL'
});
</script>

<!-- No botão CTA — adicionar onclick -->
<a href="[checkout_url]" class="cta-button"
   onclick="fbq('track', 'InitiateCheckout', {value: [preço], currency: 'BRL'});">
  [texto do CTA]
</a>
\`\`\`

\`\`\`html
<!-- THANK YOU PAGE — no <head> -->
<script>
// Event Purchase no carregamento
fbq('track', 'Purchase', {
  value: [preço],
  currency: 'BRL',
  content_name: '[nome_produto]'
});
</script>
\`\`\`

### 2d. Como criar um Meta Pixel (se ainda não tiver)

\`\`\`
GUIA — CRIAR UM META PIXEL
════════════════════════════

1. Acesse https://business.facebook.com
2. Menu → Events Manager → Connect Data Sources
3. Escolher "Web" → "Meta Pixel"
4. Dar um nome (ex: "[Nome do Negócio] Pixel")
5. Copiar o Pixel ID (15 dígitos)
6. Colar no código acima no lugar de [PIXEL_ID]

VERIFICAR:
  → Instalar a extensão "Meta Pixel Helper" no Chrome
  → Visitar sua landing page
  → A extensão deve mostrar "PageView" em verde
\`\`\`

---

## Etapa 3 — Google Analytics 4

### 3a. Código de base (no \`<head>\` de CADA página)

\`\`\`html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=[GA4_ID]"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '[GA4_ID]');
</script>
<!-- End GA4 -->
\`\`\`

### 3b. Events de conversão

\`\`\`javascript
// LANDING PAGE — Event view_item (no carregamento)
gtag('event', 'view_item', {
  currency: 'BRL',
  value: [preço],
  items: [{
    item_name: '[nome_produto]',
    price: [preço]
  }]
});

// BOTÃO CTA — Event begin_checkout (no clique)
gtag('event', 'begin_checkout', {
  currency: 'BRL',
  value: [preço],
  items: [{
    item_name: '[nome_produto]',
    price: [preço]
  }]
});

// THANK YOU PAGE — Event purchase (no carregamento)
gtag('event', 'purchase', {
  transaction_id: 'T_' + Date.now(),
  currency: 'BRL',
  value: [preço],
  items: [{
    item_name: '[nome_produto]',
    price: [preço],
    quantity: 1
  }]
});
\`\`\`

### 3c. Configurar as conversões no GA4

\`\`\`
GUIA — MARCAR "PURCHASE" COMO CONVERSÃO
════════════════════════════════════════

1. Acesse https://analytics.google.com
2. Admin → Events
3. Encontrar o event "purchase"
4. Ativar "Mark as conversion" (toggle ON)
5. → Agora cada compra é rastreável nos relatórios

TAMBÉM MARCAR COMO CONVERSÃO:
  - begin_checkout (para medir a taxa de abandono)
  - generate_lead (se lead magnet)
\`\`\`

### 3d. Como criar uma conta GA4 (se ainda não tiver)

\`\`\`
GUIA — CRIAR UMA CONTA GA4
════════════════════════════

1. Acesse https://analytics.google.com
2. "Start measuring" → Criar uma conta
3. Nome da conta: "[Nome do Negócio]"
4. Criar uma propriedade: "[Nome do Negócio] — Website"
5. Escolher "Web" como plataforma
6. Inserir a URL do seu site
7. Copiar o Measurement ID (formato G-XXXXXXXXXX)
8. Colar no código acima no lugar de [GA4_ID]
\`\`\`

---

## Etapa 4 — Google Tag Manager (opcional)

Se o usuário usar GTM, fornecer as instruções para instalar o tracking VIA GTM em vez de direto.

\`\`\`
VANTAGEM DO GTM: Você instala UM ÚNICO código (GTM) no seu site,
               e gerencia todos os pixels/tags pela interface GTM.
               Não é mais necessário mexer no HTML para cada novo tag.

QUANDO USAR GTM:
  - Você tem 3+ pixels/tags para gerenciar
  - Você muda a configuração com frequência
  - Você quer testar events sem modificar o código

QUANDO NÃO USAR GTM:
  - Você só tem Meta Pixel + GA4 (o código direto é mais simples)
  - Você não está confortável com interfaces técnicas
\`\`\`

### Código GTM (no \`<head>\`)

\`\`\`html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','[GTM_ID]');</script>
<!-- End Google Tag Manager -->
\`\`\`

---

## Etapa 5 — Gerador UTM

### Tabela UTM completa

Gerar uma tabela com todos os UTMs para cada fonte de tráfego:

\`\`\`
TABELA UTM — [Projeto]
═══════════════════════

FORMATO: [URL]?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]&utm_content=[content]

CAMPANHAS META ADS:
┌──────────────────┬────────┬────────┬───────────────┬──────────┐
│ Ângulo           │ Source │ Medium │ Campaign      │ Content  │
├──────────────────┼────────┼────────┼───────────────┼──────────┤
│ Pain Point v1    │ meta   │ cpc    │ launch-[mes]  │ pain-v1  │
│ Pain Point v2    │ meta   │ cpc    │ launch-[mes]  │ pain-v2  │
│ FOMO v1          │ meta   │ cpc    │ launch-[mes]  │ fomo-v1  │
│ Autoridade v1    │ meta   │ cpc    │ launch-[mes]  │ auth-v1  │
│ Remarketing      │ meta   │ cpc    │ retarget      │ warm     │
└──────────────────┴────────┴────────┴───────────────┴──────────┘

CAMPANHAS GOOGLE ADS:
┌──────────────────┬────────┬────────┬───────────────┬──────────┐
│ Grupo            │ Source │ Medium │ Campaign      │ Content  │
├──────────────────┼────────┼────────┼───────────────┼──────────┤
│ Alta Intenção    │ google │ cpc    │ search-[mes]  │ high     │
│ Média Intenção   │ google │ cpc    │ search-[mes]  │ medium   │
│ YouTube          │ google │ video  │ yt-[mes]      │ instream │
│ Display          │ google │ display│ display-[mes] │ banner   │
└──────────────────┴────────┴────────┴───────────────┴──────────┘

ORGÂNICO:
┌──────────────────┬──────────┬─────────┬───────────────┬──────────┐
│ Fonte            │ Source   │ Medium  │ Campaign      │ Content  │
├──────────────────┼──────────┼─────────┼───────────────┼──────────┤
│ Blog             │ blog     │ organic │ seo           │ [slug]   │
│ Bio Instagram    │ instagram│ social  │ bio-link      │ profile  │
│ Post Instagram   │ instagram│ social  │ post-[data]   │ caption  │
│ Post LinkedIn    │ linkedin │ social  │ post-[data]   │ caption  │
│ Email lançamento │ email    │ email   │ launch        │ email-[N]│
│ Email nutrição   │ email    │ email   │ nurture       │ email-[N]│
│ Afiliado         │ affiliate│affiliate│ [parceiro]    │ [local]  │
└──────────────────┴──────────┴─────────┴───────────────┴──────────┘
\`\`\`

### URLs geradas

Para cada linha da tabela, gerar a URL completa:

\`\`\`
[url_landing_page]?utm_source=meta&utm_medium=cpc&utm_campaign=launch-abr26&utm_content=pain-v1
[url_landing_page]?utm_source=meta&utm_medium=cpc&utm_campaign=launch-abr26&utm_content=fomo-v1
[url_landing_page]?utm_source=google&utm_medium=cpc&utm_campaign=search-abr26&utm_content=high
[url_landing_page]?utm_source=email&utm_medium=email&utm_campaign=launch&utm_content=email-3
...
\`\`\`

### Regras UTM

| Parâmetro | Regra | Exemplo |
|-----------|-------|---------|
| \`utm_source\` | Plataforma de origem (lowercase) | \`meta\`, \`google\`, \`email\`, \`instagram\` |
| \`utm_medium\` | Tipo de tráfego | \`cpc\` (pago), \`social\` (orgânico), \`email\`, \`affiliate\` |
| \`utm_campaign\` | Nome da campanha | \`launch-abr26\`, \`retarget\`, \`nurture\` |
| \`utm_content\` | Variante específica | \`pain-v1\`, \`fomo-v2\`, \`email-3\` |
| Nunca | Espaços (usar hífens) | \`pain-point\` e não \`pain point\` |
| Nunca | Maiúsculas (tudo em lowercase) | \`meta\` e não \`Meta\` |
| Nunca | Caracteres especiais | Apenas hífens e underscores |

---

## Etapa 6 — Guia de Instalação

### Resumo: onde colar o quê

\`\`\`
ONDE INSTALAR O CÓDIGO
═════════════════════

LANDING PAGE (ex: landing-pages/meu-produto.html)
  No <head>:
    ✅ Meta Pixel (código de base)
    ✅ GA4 (código de base)
    ✅ Event ViewContent (Meta)
    ✅ Event view_item (GA4)

  No botão CTA (atributo onclick):
    ✅ Event InitiateCheckout (Meta)
    ✅ Event begin_checkout (GA4)

THANK YOU PAGE (ex: landing-pages/ty-xxxx.html)
  No <head>:
    ✅ Meta Pixel (código de base)
    ✅ GA4 (código de base)
    ✅ Event Purchase (Meta)
    ✅ Event purchase (GA4)

BLOG / WORDPRESS:
  → Se WordPress: instalar os plugins "PixelYourSite" (Meta) + "Site Kit" (GA4)
  → Se HTML estático: mesmo código acima em cada página

PÁGINA DE LEAD MAGNET:
  → Event Lead (Meta) + generate_lead (GA4) no envio do formulário
\`\`\`

### Checklist de verificação

\`\`\`
VERIFICAÇÃO PÓS-INSTALAÇÃO
═══════════════════════════

[ ] Abrir a landing page no Chrome
[ ] Abrir o DevTools (F12) → Console → verificar: sem erros JS
[ ] Extensão "Meta Pixel Helper" → deve mostrar "PageView" em verde
[ ] Extensão "Google Analytics Debugger" → deve mostrar o hit
[ ] Clicar no botão CTA → verificar o event InitiateCheckout/begin_checkout
[ ] Abrir a thank you page → verificar o event Purchase em verde
[ ] No Meta Events Manager → verificar se os events aparecem (delay: 20 min)
[ ] No GA4 → Tempo Real → verificar os events (delay: alguns segundos)
[ ] Testar com um UTM → verificar no GA4 → Aquisição → Aquisição de tráfego
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | O Pixel ID e o GA4 ID têm formatos válidos (15 dígitos / G-XXXXXXXXXX) | Crítico |
| QG-02 | O event Purchase está APENAS na thank you page (não na landing page) | Crítico |
| QG-03 | O valor (value) nos events corresponde ao preço real do produto | Crítico |
| QG-04 | A currency está correta (BRL para Brasil) | Alto |
| QG-05 | Os UTMs estão todos em lowercase, sem espaços, sem caracteres especiais | Alto |
| QG-06 | Cada variante de anúncio tem um utm_content ÚNICO (para diferenciar os resultados) | Alto |
| QG-07 | O código de tracking não quebra o design da página (testado visualmente) | Alto |
| QG-08 | O guia de instalação é compreensível por um não-desenvolvedor | Médio |
| QG-09 | As extensões de verificação são mencionadas (Pixel Helper, GA Debugger) | Médio |
| QG-10 | Sem dupla contagem (um único código Pixel por página, um único GA4 por página) | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| O usuário não tem Pixel ID | Guiar a criação passo a passo (Meta Business Manager) |
| O usuário não tem GA4 ID | Guiar a criação passo a passo (analytics.google.com) |
| O usuário ainda não tem landing page | Recomendar \`/dp-landing-page\` primeiro, depois voltar |
| O usuário usa WordPress | Recomendar os plugins em vez do código manual |
| O Pixel não está enviando events | Checklist de debug: ad blocker? código corretamente no head? erros no console? |
| Conflito com outros scripts | Verificar o console JS, propor a instalação via GTM |
| O usuário não faz anúncios (apenas orgânico) | GA4 sozinho é suficiente. Sem necessidade de Meta Pixel. |
| business-profile.md ausente | Pedir as informações mínimas (URL, produto, preço) |

---

## Integração Cross-Skill

| Antes | Skill | Quando |
|-------|-------|--------|
| Landing page criada | \`/dp-landing-page\` | O tracking é instalado SOBRE a landing page |
| Anúncios criados | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Os UTMs são gerados PARA os anúncios |
| Perfil business | \`/dp-business-profile\` | Para a URL e as plataformas |

| Depois | Skill | Quando |
|--------|-------|--------|
| Lançar os anúncios | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Usar os UTMs gerados |
| Artigos de blog | \`/dp-blog-article\` | Adicionar GA4 nas páginas de blog |
| Sequências de email | \`/dp-email-sequence\` | Adicionar os UTMs nos links de email |
| Media plan | \`/dp-mediaplan\` | Adicionar os UTMs nos links sociais |
`,
};

export default skill;
