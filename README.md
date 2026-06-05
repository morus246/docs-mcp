# DP Criador PT-BR — Servidor MCP

Servidor MCP **dp-createur PT-BR** com **24 skills** para criadores de produtos digitais em português. Conecte suas ferramentas de IA ao sistema completo de criação, validação, lançamento e promoção de produtos digitais.

MCP (Model Context Protocol) é o padrão aberto que permite que modelos de linguagem se conectem a ferramentas, dados e APIs externas. Este servidor disponibiliza 24 skills especializadas para que seu assistente de IA possa guiá-lo em todo o ciclo de vida de um produto digital — do perfil do negócio ao lançamento e escala.

> **Nenhuma variável de ambiente é necessária.** O servidor funciona imediatamente após a conexão, sem configuração adicional.

---

## Como conectar

O servidor dp-createur PT-BR é remoto e não exige instalação local. Use as configurações abaixo no seu cliente MCP preferido:

- **Name:** `DP Criador PT-BR`
- **URL:** `https://regal-profiterole-aabd5a.netlify.app/mcp`
- **Transport:** `http`

### Claude Code

Execute o comando no terminal:

```sh
claude mcp add --transport http dp-createur-ptbr https://regal-profiterole-aabd5a.netlify.app/mcp
```

### Cursor

Adicione ao seu arquivo de configuração MCP do Cursor (`~/.cursor/mcp.json` ou nas configurações do projeto):

```json
{
  "mcpServers": {
    "dp-createur-ptbr": {
      "url": "https://regal-profiterole-aabd5a.netlify.app/mcp"
    }
  }
}
```

### VS Code

Adicione ao arquivo de configurações do VS Code (`.vscode/mcp.json` ou nas User Settings):

```json
{
  "mcp": {
    "servers": {
      "dp-createur-ptbr": {
        "type": "http",
        "url": "https://regal-profiterole-aabd5a.netlify.app/mcp"
      }
    }
  }
}
```

### Windsurf

O Windsurf requer um proxy local para servidores HTTP remotos. Use a configuração abaixo:

```sh
npx mcp-remote https://regal-profiterole-aabd5a.netlify.app/mcp
```

Ou via arquivo de configuração (`~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "dp-createur-ptbr": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://regal-profiterole-aabd5a.netlify.app/mcp"]
    }
  }
}
```

---

## Os 24 Skills por Categoria

### Fundação

| Skill | Descrição |
|-------|-----------|
| `dp-business-profile` | Cria ou atualiza o arquivo `business-profile.md` — a configuração central lida por todos os skills. Faz perguntas guiadas sobre identidade, produtos, público-alvo, voz da marca e stack técnico. Elimina perguntas repetitivas nos outros skills. |
| `dp-market-research` | Valida uma ideia de produto digital antes de criá-la. Analisa demanda, concorrência, pricing e viabilidade. Score 0-100 com veredicto GO / TEST / STOP usando fontes gratuitas (Google Trends, Reddit, Amazon, YouTube). |
| `dp-launch` | Orquestrador de lançamento de produto digital. Guia pelas 12 etapas dos skills na ordem correta, detecta o que já foi feito e acompanha a progressão. Ponto de entrada principal do fluxo. |

### Criação do Produto

| Skill | Descrição |
|-------|-----------|
| `dp-playbook-create` | Guia interativo para criar um ebook profissional do zero ao fim. Faz perguntas estratégicas por fases, constrói o plano e redige seção por seção em HTML standalone pronto para PDF. Suporta 6 formatos: playbook, guide, lead-magnet, worksheet, checklist, toolkit. |
| `dp-playbook-section` | Redige ou reescreve uma seção completa para um ebook existente. Produz HTML pronto para inserção respeitando o design system e valida a coerência com seções vizinhas. |
| `dp-ebook-cover` | Gera capas profissionais para ebooks e produtos digitais. Produz brief criativo, capa HTML/CSS standalone, prompts para IA de imagem (Midjourney, DALL-E, Ideogram), mockup 3D em CSS e especificações para Canva/Figma. |
| `dp-lead-magnet-create` | Cria lead magnets profissionais (10-15 páginas) para capturar emails: checklists, cheat sheets, mini-guias, packs de templates, resultados de quiz. Otimizado para conversão e vinculado ao produto pago. |

### Venda e Monetização

| Skill | Descrição |
|-------|-----------|
| `dp-landing-page` | Gerador de landing pages profissionais com Thank You page, Política de Privacidade e Termos integrados em modais. Responsivo, HTML standalone com CSS custom properties. Gera 2 arquivos: landing page + thank you page. |
| `dp-sales-funnel` | Arquiteto de funil de vendas completo, do tráfego ao upsell. Define cada etapa com ferramentas, KPIs, conteúdo, automações e matemática de conversão. Adaptável a qualquer orçamento e stack técnico. |
| `dp-upsell-strategy` | Cria estratégia de upsell completa: escada de valor, order bumps, upsells pós-compra, downsells, cross-sells e sequências de email de ascensão. Calcula o LTV por cliente e otimiza a receita por transação. |

### Conteúdo e SEO

| Skill | Descrição |
|-------|-----------|
| `dp-blog-strategy` | Gera estratégia de conteúdo blog completa: lista de artigos priorizados, topic clusters, mapeamento de links internos e calendário editorial SEO. Analisa o contexto do negócio para propor os artigos de maior impacto. |
| `dp-blog-article` | Redige artigos de blog SEO completos com otimização on-page, links internos estratégicos, sinais E-E-A-T, CTAs naturais, schema JSON-LD e prontidão para pesquisa de IA. Pode publicar diretamente no WordPress. |
| `dp-blog-publish` | Publica artigos no WordPress via API REST. Gerencia autenticação, rascunho, categorias, tags, imagens em destaque e meta SEO (Yoast/RankMath). Suporta publicação individual ou em lote. |
| `dp-email-sequence` | Cria sequências completas de email marketing (boas-vindas, lançamento, abandono, reengajamento, nutrição, pós-compra) com linhas de assunto, texto de pré-visualização, corpo completo, CTAs, timing e templates HTML opcionais. |
| `dp-social-caption` | Gera lotes de captions para redes sociais prontas para publicar, adaptadas por plataforma (Instagram, LinkedIn, Facebook, TikTok, X/Twitter). Inclui hooks, CTAs, hashtags, direção visual e calendário de publicação. |

### Promoção

| Skill | Descrição |
|-------|-----------|
| `dp-ad-angles-meta` | Gerador completo de ângulos publicitários para Meta Ads (Facebook + Instagram). Produz 12 ângulos diferenciados com copies A/B, hooks, textos primários, headlines, descrições, CTAs, sugestões de audiências e estrutura de campanha. |
| `dp-ad-angles-google` | Gerador completo de campanhas Google Ads (Search, YouTube, Display). Produz grupos de palavras-chave, Responsive Search Ads, scripts YouTube, criativos Display, recomendações de bidding, parâmetros UTM e estrutura de campanha. |
| `dp-mediaplan` | Gera calendário de conteúdo para redes sociais (1-8 semanas) com briefs detalhados por post, direção visual e estratégia de funil TOFU/MOFU/BOFU. Arquivo HTML standalone com design dark-theme. Suporta Instagram, LinkedIn, Facebook, TikTok. |
| `dp-tracking-setup` | Configura o tracking completo: Meta Pixel com events, Google Analytics 4 com conversões, Google Tag Manager e gerador de UTM por campanha/fonte. Produz código pronto para colar e guia de instalação passo a passo. |

### Análise e Qualidade

| Skill | Descrição |
|-------|-----------|
| `dp-playbook-audit` | Auditoria de qualidade completa para ebooks e playbooks HTML e PDF: estrutura, conteúdo, número de páginas, coerência de versões e conformidade com o design system. Gera relatório detalhado com pontuação 0-100 e plano de ação priorizado. |
| `dp-playbook-sync` | Sincroniza um ebook entre PT e EN. Detecta discrepâncias estruturais e de conteúdo, traduz seções faltando ou modificadas, e atualiza o arquivo alvo preservando design e tom. PT é sempre a fonte da verdade. |
| `dp-export-pdf` | Converte qualquer arquivo HTML em PDF profissional pronto para vender. Gerencia paginação, headers/footers, capa, sumário clicável e links ativos. Suporta ebooks, guias, lead magnets, checklists e landing pages. |
| `dp-competitor-analysis` | Análise completa de um concorrente: produto, posicionamento, precificação, marketing e funil. Compara com sua própria oferta e gera relatório acionável com matriz de pontuação, oportunidades de diferenciação e contra-ângulos de marketing. |
| `dp-copy-review` | Auditoria e otimização de qualquer copy de marketing: anúncios, emails, landing pages, posts sociais, páginas de venda. Score em 6 dimensões, feedback linha por linha e versão otimizada entregue. Verifica conformidade legal e coerência de marca. |

---

## Ferramentas MCP disponíveis

O servidor expõe 3 ferramentas que o seu assistente de IA pode chamar:

### `buscar_skill_dp`

Busca um skill específico pelo nome e retorna seu conteúdo completo (instruções, exemplos, workflow recomendado).

**Exemplo de invocação:**

```
Use a ferramenta buscar_skill_dp com nome="dp-playbook-create"
```

### `listar_skills_dp`

Lista todos os 24 skills disponíveis com nome, categoria e descrição resumida.

**Exemplo de invocação:**

```
Use a ferramenta listar_skills_dp para ver todos os skills disponíveis
```

### `buscar_skills_por_categoria`

Filtra os skills por uma das 6 categorias: `Fundação`, `Criação do Produto`, `Venda e Monetização`, `Conteúdo e SEO`, `Promoção`, `Análise e Qualidade`.

**Exemplo de invocação:**

```
Use a ferramenta buscar_skills_por_categoria com categoria="Venda e Monetização"
```

---

## Variáveis de Ambiente

**Nenhuma variável de ambiente é necessária.** O servidor dp-createur PT-BR funciona sem nenhuma configuração adicional após a conexão.

---

## Origem

Os skills deste servidor são uma tradução para PT-BR do projeto original em francês **dp-createur** por [kabde](https://github.com/kabde/dp-createur). Adaptações incluem moeda (R$), plataformas (Hotmart, Kiwify, Brevo) e contexto de mercado brasileiro.

---

## Código fonte

[github.com/morus246/docs-mcp](https://github.com/morus246/docs-mcp)
