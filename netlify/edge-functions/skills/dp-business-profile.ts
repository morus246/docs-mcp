import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-business-profile",
  categoria: "Fundação",
  descricao: "Cria ou atualiza o arquivo business-profile.md — a configuração central lida por todos os skills DP Criador. Faz perguntas guiadas sobre identidade, produtos, público-alvo, voz da marca, identidade visual e stack técnico. Este arquivo elimina perguntas repetitivas nos outros skills. Gatilhos: perfil, business profile, configurar, setup, identidade, marca, brand, cores, config.",
  argumentHint: "[update] — sem argumento = criação guiada, com 'update' = atualização parcial",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Business Profile — Configuração Central

<!-- v2.0.0 | 2026-04-13 | Criação: perfil de negócio lido por todos os skills -->

Este skill cria o arquivo \`business-profile.md\` na raiz do projeto. Este arquivo é **a fonte da verdade** para todos os outros skills DP Criador — ele elimina perguntas repetitivas e garante coerência em todos os outputs (ebooks, landing pages, emails, anúncios, social…).

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-business-profile\` | Criação guiada completa (primeira vez) |
| \`/dp-business-profile update\` | Atualizar seções específicas |
| \`/dp-business-profile show\` | Exibir o perfil atual |
| \`/dp-business-profile express\` | Criação rápida — 5 perguntas essenciais e geração |
| \`/dp-business-profile check\` | Verificar completude e sinalizar lacunas |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── business-profile.md (na raiz do projeto)
│   ├── Identidade do negócio
│   ├── Produtos / Serviços
│   ├── Público-alvo
│   ├── Voz & Tom
│   ├── Identidade visual (cores, tipografia, estilo)
│   ├── Stack técnico
│   └── Links & URLs
└── Lido automaticamente por todos os skills DP Criador
\`\`\`

---

## Processo

\`\`\`
1. Verificar se já existe um perfil
2. Coleta de contexto     → Perguntas guiadas por blocos
3. Síntese                → Ficha resumo para validação
4. Escrever o arquivo     → business-profile.md
5. Confirmação            → Resumo + próximos passos
\`\`\`

---

## Etapa 0 — Verificar o Existente

\`\`\`
SE business-profile.md existe na raiz:
  → Ler o conteúdo
  → SE comando "update": perguntar qual seção modificar
  → SE comando "show": exibir o perfil e parar
  → SE comando "check": verificar completude e listar campos vazios
  → SENÃO: avisar "Já existe um perfil. Quer atualizá-lo ou começar do zero?"

SENÃO:
  → Iniciar a criação guiada
\`\`\`

---

## Etapa 1 — Coleta de Contexto (Criação Guiada)

**Regra**: Fazer as perguntas em blocos de 3-4. Aguardar as respostas. Reformular para validar. Depois continuar.

### Bloco 1 — Identidade

| # | Pergunta | Campo | Obrigatório |
|---|----------|-------|-------------|
| P1 | Como se chama seu negócio / sua marca? | \`brand_name\` | Sim |
| P2 | Quem é você? Seu nome e papel. (ex: "Maria, coach fitness" ou "Alex & Sara, co-fundadores") | \`founder\` | Sim |
| P3 | Descreva seu negócio em 1-2 frases. O que você faz e para quem? | \`description\` | Sim |
| P4 | Qual é o seu nicho / setor? (ex: coaching, fitness, marketing digital, desenvolvimento pessoal, finanças…) | \`niche\` | Sim |

### Bloco 2 — Produtos & Serviços

| # | Pergunta | Campo | Obrigatório |
|---|----------|-------|-------------|
| P5 | Qual é o seu **produto principal**? (nome, tipo, preço) | \`main_product\` | Sim |
| P6 | Você tem uma **URL de venda**? (Hotmart, Kiwify, Eduzz, site próprio…) | \`checkout_url\` | Não |
| P7 | Você tem **outros produtos** ou serviços? Liste-os com os preços. | \`other_products\` | Não |
| P8 | Você tem um **lead magnet** (recurso gratuito)? Se sim, qual? | \`lead_magnet\` | Não |

### Bloco 3 — Público-Alvo

| # | Pergunta | Campo | Obrigatório |
|---|----------|-------|-------------|
| P9 | Descreva o seu **cliente ideal** em 2-3 frases. (profissão, situação, nível, idade aproximada) | \`target_audience\` | Sim |
| P10 | Qual é o **problema nº 1** do seu público? A coisa que mais os frustra. | \`pain_point\` | Sim |
| P11 | Qual **resultado concreto** você promete a eles? (mensurável se possível) | \`promise\` | Sim |
| P12 | Quais são as **objeções frequentes** dos seus prospects? (preço, tempo, dúvida…) | \`objections\` | Não |

### Bloco 4 — Voz & Tom

| # | Pergunta | Campo | Obrigatório |
|---|----------|-------|-------------|
| P13 | Como você descreveria a **voz da sua marca** em 3 palavras? (ex: "direto, expert, honesto" ou "acolhedor, didático, inspirador") | \`voice\` | Sim |
| P14 | Você usa **tu** ou **você** com seu público? | \`address\` | Sim |
| P15 | Há **palavras ou expressões** que você usa com frequência? Ou que quer evitar? | \`vocabulary\` | Não |

> Se o usuário não souber, sugerir exemplos:
> - "Direto e sem enrolação" (estilo DP Criador clássico)
> - "Acolhedor e didático" (estilo professor/mentor)
> - "Data-driven e profissional" (estilo B2B/corporativo)
> - "Divertido e irreverente" (estilo jovem, redes sociais)

### Bloco 5 — Identidade Visual

| # | Pergunta | Campo | Obrigatório |
|---|----------|-------|-------------|
| P16 | Você tem uma **cor principal** da marca? (dê o hex, ex: #1e3a5f, ou o nome, ex: "azul marinho") | \`primary_color\` | Sim |
| P17 | Você tem uma **cor de destaque**? (para botões, highlights, CTAs) | \`accent_color\` | Sim |
| P18 | Qual **estilo visual** você prefere? \`minimalista\` / \`bold\` / \`premium\` / \`warm\` | \`visual_style\` | Sim |
| P19 | Você tem uma **tipografia da marca**? (ex: Inter, Montserrat, Playfair Display…) Se não, usarei Inter. | \`font\` | Não |
| P20 | Você tem um **logo**? (URL ou descrição) | \`logo\` | Não |

> **Se o usuário não tiver cores**:
> Sugerir 3 paletas adaptadas ao nicho:
>
> | Paleta | Primária | Destaque | Estilo | Ideal para |
> |--------|----------|----------|--------|------------|
> | Confiança | \`#1e3a5f\` Azul marinho | \`#d4a853\` Dourado | Premium | Coaching, finanças, consultoria |
> | Energia | \`#1e1e1e\` Preto | \`#f43f5e\` Rosa vibrante | Bold | Fitness, marketing, público jovem |
> | Natureza | \`#2d4a3e\` Verde floresta | \`#22c55e\` Verde vivo | Minimalista | Bem-estar, desenvolvimento pessoal, ecologia |
>
> "Qual te identifica? Ou me dê suas próprias cores."

### Bloco 6 — Stack Técnico & Links

| # | Pergunta | Campo | Obrigatório |
|---|----------|-------|-------------|
| P21 | Qual **plataforma de venda** você usa? (Hotmart, Kiwify, Eduzz, Gumroad, Stripe/PagSeguro, Shopify…) | \`payment_platform\` | Não |
| P22 | Qual **ferramenta de email**? (Brevo, RD Station, MailerLite, Mailchimp…) | \`email_tool\` | Não |
| P23 | Você tem um **site WordPress**? Se sim, qual é a URL? | \`wordpress_url\` | Não |
| P24 | Suas **redes sociais**? (Instagram, LinkedIn, TikTok, YouTube, X — informe os handles) | \`social_handles\` | Não |
| P25 | Você faz **publicidade paga**? Se sim, em quais plataformas? (Meta Ads, Google Ads, TikTok Ads…) | \`ad_platforms\` | Não |

---

## Etapa 2 — Síntese para Validação

\`\`\`
╔═══════════════════════════════════════════════════╗
║         BUSINESS PROFILE — SÍNTESE               ║
╠═══════════════════════════════════════════════════╣
║ IDENTIDADE                                        ║
║  Marca       : [brand_name]                       ║
║  Fundador    : [founder]                          ║
║  Descrição   : [description]                      ║
║  Nicho       : [niche]                            ║
╠═══════════════════════════════════════════════════╣
║ PRODUTO PRINCIPAL                                 ║
║  Nome        : [main_product.name]                ║
║  Tipo        : [main_product.type]                ║
║  Preço       : [main_product.price]               ║
║  URL         : [checkout_url]                     ║
╠═══════════════════════════════════════════════════╣
║ PÚBLICO-ALVO                                      ║
║  Perfil      : [target_audience]                  ║
║  Problema    : [pain_point]                       ║
║  Promessa    : [promise]                          ║
╠═══════════════════════════════════════════════════╣
║ VOZ                                               ║
║  Estilo      : [voice]                            ║
║  Tratamento  : [tu/você]                          ║
╠═══════════════════════════════════════════════════╣
║ IDENTIDADE VISUAL                                 ║
║  Primária    : [primary_color] ████               ║
║  Destaque    : [accent_color]  ████               ║
║  Estilo      : [visual_style]                     ║
║  Tipografia  : [font]                             ║
╠═══════════════════════════════════════════════════╣
║ STACK                                             ║
║  Venda       : [payment_platform]                 ║
║  Email       : [email_tool]                       ║
║  WordPress   : [wordpress_url]                    ║
║  Publicidade : [ad_platforms]                     ║
╚═══════════════════════════════════════════════════╝
\`\`\`

**Perguntar**: "Está tudo certo? Quer modificar algo antes de eu criar o arquivo?"

**Hard gate**: NÃO criar o arquivo sem validação.

---

## Etapa 3 — Escrever business-profile.md

Criar o arquivo na raiz do projeto.

### Formato do arquivo

\`\`\`markdown
# Business Profile — [brand_name]

> Este arquivo é lido automaticamente por todos os skills DP Criador.
> Última atualização: [data]

## Identidade

- **Marca**: [brand_name]
- **Fundador(es)**: [founder]
- **Descrição**: [description]
- **Nicho**: [niche]
- **Localização**: [location se mencionado]

## Produto Principal

- **Nome**: [main_product.name]
- **Tipo**: [ebook / playbook / guia / curso / serviço / coaching]
- **Preço**: [main_product.price]
- **URL de venda**: [checkout_url]
- **Proposta de valor**: [1 frase — o benefício principal]

## Outros Produtos

| Nome | Tipo | Preço | URL |
|------|------|-------|-----|
| [nome] | [tipo] | [preço] | [url] |
| ... | ... | ... | ... |

## Lead Magnet

- **Nome**: [lead_magnet.name]
- **Tipo**: [checklist / cheat-sheet / mini-guia / template]
- **URL**: [lead_magnet.url]

## Público-Alvo

- **Quem**: [target_audience]
- **Problema nº 1**: [pain_point]
- **Resultado prometido**: [promise]
- **Objeções frequentes**: [objections]

## Voz & Tom

- **Estilo**: [voice — 3 palavras]
- **Tratamento**: [tu / você]
- **Palavras a usar**: [vocabulary.use]
- **Palavras a evitar**: [vocabulary.avoid]
- **Exemplos de tom**:
  - ✅ "[exemplo de frase no tom correto]"
  - ❌ "[exemplo de frase a evitar]"

## Identidade Visual

- **Cor primária**: [primary_color] — [nome da cor]
- **Cor de destaque**: [accent_color] — [nome da cor]
- **Estilo visual**: [minimalista / bold / premium / warm]
- **Tipografia**: [font]
- **Logo**: [logo_url ou descrição]

### Paleta CSS

\`\`\`css
:root {
  --color-primary: [primary_color];
  --color-accent: [accent_color];
  --color-accent-light: [accent com 5% opacidade];
  --color-accent-dark: [accent escurecido 40%];
  --color-accent-mid: [accent escurecido 20%];
}
\`\`\`

## Stack Técnico

| Ferramenta | Uso | URL |
|------------|-----|-----|
| [payment_platform] | Pagamentos | [url] |
| [email_tool] | Email marketing | [url] |
| WordPress | Site / Blog | [wordpress_url] |
| [ad_platform_1] | Publicidade | — |
| [ad_platform_2] | Publicidade | — |

## Redes Sociais

| Plataforma | Handle | URL |
|------------|--------|-----|
| Instagram | @[handle] | https://instagram.com/[handle] |
| LinkedIn | [handle] | [url] |
| TikTok | @[handle] | https://tiktok.com/@[handle] |
| YouTube | [handle] | [url] |
| X/Twitter | @[handle] | https://x.com/[handle] |
\`\`\`

---

## Etapa 4 — Confirmação

\`\`\`
✅ BUSINESS PROFILE CRIADO

📄 Arquivo: business-profile.md (raiz do projeto)
📊 Campos preenchidos: [N]/25
⚠️ Campos faltando: [lista se aplicável]

O QUE MUDA AGORA:
  Todos os skills DP Criador vão ler este arquivo automaticamente.
  Não é mais necessário responder perguntas sobre seu negócio, suas cores,
  seu público ou tom a cada vez. Tudo centralizado aqui.

PRÓXIMOS PASSOS:
  → /dp-playbook-create    — Criar seu primeiro ebook
  → /dp-landing-page       — Criar sua página de vendas
  → /dp-blog-strategy      — Planejar sua estratégia de conteúdo
  → /dp-email-sequence     — Criar suas sequências de email
  → /dp-business-profile update — Modificar seu perfil depois
\`\`\`

---

## Modo Update

Quando o usuário lança \`/dp-business-profile update\`:

1. Ler o arquivo existente
2. Perguntar: "Qual seção você quer modificar?" com a lista:
   - Identidade
   - Produtos
   - Público-alvo
   - Voz & Tom
   - Identidade visual
   - Stack técnico
   - Redes sociais
3. Fazer as perguntas apenas para a seção escolhida
4. Atualizar o arquivo sem alterar as outras seções
5. Confirmar as mudanças

---

## Modo Check

Quando o usuário lança \`/dp-business-profile check\`:

1. Ler o arquivo existente
2. Verificar cada campo:
   - ✅ Preenchido
   - ⚠️ Vazio ou placeholder
   - ❌ Faltando
3. Exibir o relatório de completude
4. Recomendar os campos a preencher com prioridade

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | brand_name preenchido | Crítico |
| QG-02 | Pelo menos 1 produto definido | Crítico |
| QG-03 | target_audience preenchido | Crítico |
| QG-04 | voice definida (3 palavras) | Alto |
| QG-05 | primary_color e accent_color definidos | Alto |
| QG-06 | Cores no formato hex válido (#XXXXXX) | Alto |
| QG-07 | Sem placeholders no arquivo final | Crítico |
| QG-08 | Validação explícita antes de escrever | Crítico |
| QG-09 | O arquivo está na raiz do projeto (não em skills/) | Crítico |
| QG-10 | O arquivo inclui a data da última atualização | Médio |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| O usuário não sabe as suas cores | Sugerir 3 paletas adaptadas ao nicho |
| O usuário ainda não tem produto | Preencher as outras seções, deixar produto como "a definir" |
| O arquivo já existe | Propor update ou substituição |
| O usuário quer ir rápido | Modo express: 5 perguntas essenciais — P1 (Nome do negócio), P5 (Produto principal: nome + preço), P9 (Cliente ideal em 1 frase), P13 (Voz em 3 palavras), P16 (Cor principal + destaque). Gerar o perfil com essas respostas e deixar o resto como "a completar". |
| Nicho difícil de identificar | Perguntar "O que você vende e para quem?" e deduzir |
| Cor hex inválida | Converter o nome em hex ("azul marinho" → #1e3a5f) |
| O usuário não tem site/blog | Deixar os campos WordPress e URL vazios |

---

# Exemplo — Business Profile Preenchido

> Este arquivo serve de referência para mostrar como fica um business-profile.md completo.
> Produto fictício usado em todos os exemplos DP Criador.

---

# Business Profile — Academia FitPro

> Este arquivo é lido automaticamente por todos os skills DP Criador.
> Última atualização: 2026-04-13

## Identidade

- **Marca**: Academia FitPro
- **Fundador(es)**: Sarah Dupont, coach fitness certificada NSCA, 8 anos de experiência
- **Descrição**: A Academia FitPro ajuda coaches fitness iniciantes a lançar seu negócio online e conquistar seus 10 primeiros clientes pagantes em 30 dias.
- **Nicho**: Coaching fitness online
- **Localização**: São Paulo, Brasil

## Produto Principal

- **Nome**: Playbook do Coach Fitness
- **Tipo**: Ebook / Playbook (60+ páginas)
- **Preço**: R$ 197
- **URL de venda**: https://academiaFitPro.hotmart.com/product/playbook-coach-fitness
- **Proposta de valor**: O método passo a passo para sair do zero e conquistar 10 clientes em coaching fitness, sem tráfego pago e sem audiência existente.

## Outros Produtos

| Nome | Tipo | Preço | URL |
|------|------|-------|-----|
| Checklist "Primeiros Clientes" | Lead magnet (gratuito) | R$ 0 | https://academiaFitPro.com/checklist |
| Programa Acelerador | Coaching em grupo 8 semanas | R$ 997 | https://academiaFitPro.com/acelerador |
| Coaching 1:1 Premium | Coaching individual | R$ 3.500 | Sob candidatura |

## Lead Magnet

- **Nome**: O Checklist do Coach Fitness — 15 Ações para Começar
- **Tipo**: Checklist PDF (10 páginas)
- **URL**: https://academiaFitPro.com/checklist

## Público-Alvo

- **Quem**: Coaches fitness iniciantes (25-40 anos), certificados ou em processo de certificação, que querem lançar seu negócio online. Geralmente ex-atletas ou apaixonados por fitness que querem fazer disso profissão.
- **Problema nº 1**: "Sou bom em fitness mas não sei como encontrar clientes. Tenho medo de me vender e não sei por onde começar."
- **Resultado prometido**: 10 clientes pagantes em coaching fitness nos primeiros 30 dias, com um método reproduzível.
- **Objeções frequentes**: "Não tenho audiência", "Tráfego pago é caro demais", "Tem muita concorrência", "Não sou conhecido o suficiente"

## Voz & Tom

- **Estilo**: Direto, motivador, sem enrolação
- **Tratamento**: Você (segunda pessoa)
- **Palavras a usar**: "Ação", "Resultados", "Concreto", "Passo a passo", "Método", "Cliente", "Lançar"
- **Palavras a evitar**: "Revolucionário", "Segredo", "Milagre", "Fácil", "Passivo", "Automático"
- **Exemplos de tom**:
  - ✅ "Você tem as competências. O que falta é um sistema para encontrar clientes. Aqui está o que funciona."
  - ✅ "Sem atalhos. 20 DMs por dia, durante 14 dias. Esse é o preço de começar."
  - ❌ "Descubra nosso incrível programa revolucionário que vai transformar sua vida!"
  - ❌ "Com nosso método secreto, ganhe dinheiro facilmente sem esforço."

## Identidade Visual

- **Cor primária**: #059669 — Verde esmeralda
- **Cor de destaque**: #10b981 — Verde vivo
- **Estilo visual**: Bold
- **Tipografia**: Inter
- **Logo**: Texto "Academia FitPro" em Inter Bold, verde esmeralda sobre fundo branco

### Paleta CSS

\`\`\`css
:root {
  --color-primary: #059669;
  --color-accent: #10b981;
  --color-accent-light: #ecfdf5;
  --color-accent-dark: #065f46;
  --color-accent-mid: #047857;
}
\`\`\`

## Stack Técnico

| Ferramenta | Uso | URL |
|------------|-----|-----|
| Hotmart | Venda ebook + pagamentos | https://academiaFitPro.hotmart.com |
| Brevo | Email marketing | https://brevo.com |
| WordPress | Blog / SEO | https://academiaFitPro.com |
| Canva | Design de visuais | — |
| Meta Ads | Publicidade Facebook/Instagram | — |
| Google Ads | Publicidade Search/YouTube | — |

## Redes Sociais

| Plataforma | Handle | URL |
|------------|--------|-----|
| Instagram | @academiaFitPro | https://instagram.com/academiaFitPro |
| LinkedIn | Sarah Dupont | https://linkedin.com/in/sarah-dupont-fitness |
| TikTok | @academiaFitPro | https://tiktok.com/@academiaFitPro |
| YouTube | Academia FitPro | https://youtube.com/@academiaFitPro |
`
};

export default skill;
