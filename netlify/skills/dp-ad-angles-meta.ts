import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-ad-angles-meta",
  categoria: "Promoção",
  descricao: "Gerador completo de ângulos publicitários para Meta Ads (Facebook + Instagram). Produz 12 ângulos diferenciados com copies A/B, hooks, textos primários, headlines, descrições, CTAs, sugestões de audiências e estrutura de campanha. Inclui especificações Meta, direção criativa e parâmetros UTM.",
  argumentHint: "[produto] [objetivo: conversoes|leads|trafego|awareness] [orçamento]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Ad Angles Meta — Gerador de Copy para Facebook & Instagram

Expert em performance marketing Meta Ads. Gera ângulos publicitários diferenciados com copies prontos para uso, segmentação de audiência e estrutura de campanha.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-ad-angles-meta [produto]\` | Iniciar a geração completa (12 ângulos + estrutura) |
| \`/dp-ad-angles-meta express [produto]\` | Modo rápido — 3 perguntas e geração |
| \`/dp-ad-angles-meta retarget [produto]\` | Ângulos específicos de retargeting |
| \`/dp-ad-angles-meta video [produto]\` | Foco em scripts de vídeo (Reels + Stories) |

## Formato de Entrega

\`\`\`
ENTREGÁVEL:
├── 12 ângulos publicitários diferenciados
│   ├── Versão A + Versão B (teste A/B) por ângulo
│   ├── Hook, Texto Primário, Headline, Descrição, CTA
│   ├── Direção criativa (visual + estilo)
│   └── Segmentação de audiência por ângulo
├── Estrutura de campanha (Testing → Scaling → Iteration)
├── URLs com parâmetros UTM gerados
└── Arquivo HTML: ads/meta-angles-[data].html
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto   → Coletar informações sobre produto, audiência, orçamento (OBRIGATÓRIO)
2. Ler referências      → Carregar business-profile.md + conteúdo do produto se disponível
3. Gerar ângulos        → 12 ângulos psicológicos diferenciados
4. Escrever copies      → Versão A + B por ângulo com especificações Meta
5. Definir segmentação  → Sugestões de audiência por ângulo
6. Estruturar campanha  → Fases Testing → Scaling → Iteration
7. Gerar UTMs           → Parâmetros de rastreamento para cada URL
8. Verificar qualidade  → Verificação de especificações, conformidade, diferenciação
9. Entregar             → Arquivo HTML + resumo
\`\`\`

---

## Passo 1 — Coleta de Contexto (Obrigatório: Sempre Fazer Primeiro)

### 1a. Carregar o perfil do negócio (silencioso)

\`\`\`
SE business-profile.md existir na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, preço
  → Extrair também: cores da marca (primary_color, accent_color, estilo visual)
  → Integrar as cores nos briefs criativos (direção artística, especificações visuais)
  → NÃO repetir perguntas já respondidas pelo perfil

CASO CONTRÁRIO:
  → Continuar sem. As perguntas da coleta cobrem o mínimo necessário.
\`\`\`

### 1b. Fazer perguntas em blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar 2-3 por vez, aguardar as respostas e continuar.

#### Bloco 1 — O produto e o objetivo

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual produto ou serviço você quer promover? Descreva em 1-2 frases. | Define o escopo da campanha |
| Q2 | Qual é o preço? (ou gratuito se for lead magnet) | Copy e posicionamento |
| Q3 | Qual objetivo de campanha? \`conversoes\` / \`leads\` / \`trafego\` / \`awareness\` | Estrutura e otimização |

**Após as respostas**: Reformular. "Você quer promover [X] a [preço] com objetivo de [Y]. Correto?"

#### Bloco 2 — A audiência e o orçamento

| # | Pergunta | Por quê |
|---|----------|---------|
| Q4 | Quem é seu cliente ideal? Descreva (profissão, situação, frustração). | Segmentação e tom dos copies |
| Q5 | Qual orçamento diário ou mensal? | Recomendações de estrutura |
| Q6 | Você tem uma URL de landing page? (caso contrário, gero os copies sem link) | UTM e CTA |

**Após as respostas**: Síntese da audiência.

#### Bloco 3 — Contexto existente

| # | Pergunta | Por quê |
|---|----------|---------|
| Q7 | Você já fez anúncios no Meta? Se sim, o que funcionou / não funcionou? | Evitar erros passados |
| Q8 | Você tem prova social? (depoimentos, números, resultados) | Ângulos de autoridade e prova social |

**Após as respostas**: Partir para a geração.

---

## Passo 2 — Gerar 12 Ângulos de Anúncio

Cada ângulo ataca a partir de um ponto de entrada psicológico diferente:

| # | Tipo de ângulo | Psicologia |
|---|----------------|------------|
| 1 | **Ponto de dor** | Frustração direta do cliente ideal |
| 2 | **Contrário** | Questionar uma crença comum |
| 3 | **Resultado específico** | Número concreto + prazo preciso |
| 4 | **Prova social** | Depoimentos, resultados, comunidade |
| 5 | **FOMO** | Urgência ou medo de perder a oportunidade |
| 6 | **Simplicidade** | Facilidade de execução, pouco tempo necessário |
| 7 | **Identidade** | "Você não é [defeito]. Você tem [problema real]." |
| 8 | **Comparação** | Preço vs alternativas mais caras |
| 9 | **Curiosidade** | Tease de um mecanismo ou método |
| 10 | **Autoridade** | Credibilidade, expertise, trajetória |
| 11 | **Urgência / Escassez** | Oferta limitada, bônus temporário |
| 12 | **Transformação** | Antes / depois — a jornada do cliente |

**Regra**: Cada ângulo deve ser GENUINAMENTE diferente. Não apenas uma reformulação da mesma mensagem.

## Passo 3 — Escrever os Copies Completos

Para CADA ângulo, produzir:

\`\`\`
ÂNGULO [#]: [Nome do ângulo]
========================
Segmento de audiência: [quem esse ângulo melhor atinge]
Posicionamento: [Feed / Stories / Reels / Todos]
Formato: [Imagem / Vídeo / Carrossel]

--- VERSÃO A ---

Hook (primeira linha — deve parar o scroll):
[Linha de abertura — máx 125 caracteres]

Texto Primário (corpo — máx 500 caracteres para Feed):
[Corpo completo do anúncio]

Headline (máx 40 caracteres):
[Título em negrito abaixo da imagem/vídeo]

Descrição (máx 30 caracteres):
[Texto de suporte abaixo do headline]

Botão CTA: [Saiba Mais / Compre Agora / Aproveite / Cadastre-se]

URL com UTM:
[landing_page_url]?utm_source=meta&utm_medium=paid&utm_campaign=[product-slug]&utm_content=angle[#]-va

--- VERSÃO B (variação A/B) ---

Hook: [Alternativa]
Texto Primário: [Alternativa]
Headline: [Alternativa]
Descrição: [Alternativa]
Botão CTA: [Igual ou diferente]

URL com UTM:
[landing_page_url]?utm_source=meta&utm_medium=paid&utm_campaign=[product-slug]&utm_content=angle[#]-vb

--- DIREÇÃO CRIATIVA ---

Visual: [O que a imagem/vídeo deve mostrar]
Texto overlay: [Texto chave no criativo — máx 20% da imagem]
Estilo: [Clean / Bold / Raw / Profissional]
Cores: Usar as cores da marca (primary_color, accent_color) para consistência visual
Referência: [Descrever a atmosfera]
\`\`\`

### Scripts de vídeo (mínimo 2 ângulos em formato vídeo)

Pelo menos 2 ângulos devem incluir um script completo de Reels/Stories:

\`\`\`
SCRIPT DE VÍDEO — ÂNGULO [#]
=========================
Duração: [15-30 segundos]

[0-3s] HOOK VISUAL — [o que aparece na tela]
[0-5s] HOOK ÁUDIO — "[texto falado que prende a atenção]"
[5-15s] PROBLEMA + AGITAÇÃO — "[desenvolvimento]"
[15-25s] SOLUÇÃO + PROVA — "[pitch do produto]"
[25-30s] CTA — "[chamada para ação]"

Direção visual: [talking head / gravação de tela / b-roll / animação de texto]
\`\`\`

## Passo 4 — Segmentação de Audiência

Para cada ângulo:

\`\`\`
SEGMENTAÇÃO
-----------
Interesses: [lista de interesses Meta relevantes]
Comportamentos: [compra, uso de dispositivo]
Dados demográficos: [idade, gênero se relevante]
Público Semelhante: [fonte — lista de emails, compradores, visitantes do site]
Exclusões: [quem excluir — clientes existentes, etc.]
\`\`\`

## Passo 5 — Estrutura de Campanha

\`\`\`
ESTRUTURA DE CAMPANHA
=====================

Fase 1 — Testing (Dias 1-7)
  Orçamento: R$ [X]/dia
  Ângulos a testar: [top 4-5 ângulos]
  Conjuntos de anúncios: 1 por ângulo, segmentação ampla
  Otimização: Compra / Lead (conforme objetivo)
  Limiar: Mínimo 5× o CPA alvo por conjunto antes de avaliar

Fase 2 — Scaling (Dias 8-14)
  Pausar: ângulos com CPA > [limiar] ou CTR < 1%
  Escalar: aumentar orçamento 20% nos vencedores
  Adicionar: públicos semelhantes dos convertidos

Fase 3 — Iteration (Dias 15+)
  Novos criativos nos ângulos vencedores
  Retargeting: visitantes do site, espectadores de vídeo, engajados
  Atualização: novas versões A/B a cada 2-3 semanas
\`\`\`

## Passo 6 — Parâmetros UTM

Gerar os UTMs para CADA URL de anúncio:

\`\`\`
FORMATO UTM PADRÃO:
  utm_source=meta
  utm_medium=paid
  utm_campaign=[product-slug]
  utm_content=angle[N]-v[a|b]
  utm_term=[audience-segment]

EXEMPLO:
  https://example.com/produto?utm_source=meta&utm_medium=paid&utm_campaign=meu-produto&utm_content=angle3-va&utm_term=interesse-marketing
\`\`\`

---

## Especificações do Meta Ads

| Elemento | Limite de caracteres |
|----------|---------------------|
| Texto Primário | 125 chars (visível), 500 máx |
| Headline | 40 chars recomendado, 255 máx |
| Descrição | 30 chars recomendado, 125 máx |
| Imagem | 1080×1080 (Feed), 1080×1920 (Stories) |
| Vídeo | 1:1 ou 9:16, máx 240 min, <4GB |
| Carrossel | 2-10 cards, 1080×1080 cada |
| Texto na imagem | <20% da superfície (melhor prática) |

## Regras de Copy

- **O hook é tudo** — Se a primeira linha não parar o scroll, o anúncio falha
- **Específico > vago** — Números e prazos concretos vencem generalidades
- **Frases curtas** — Especialmente para leitura em mobile
- **Um único CTA por anúncio** — Não confundir o leitor
- **Sem hype** — "Sistema" não "segredo", "guia" não "fórmula mágica"
- **Transparência de preço** — Se o preço é uma vantagem, usá-lo como argumento
- **Prova social quando disponível** — Mesmo números de experiência ou resultados
- **Conformidade** — Nenhuma garantia de receita, nenhuma afirmação falsa

---

## Critérios de Qualidade

| ID | Critério | Severidade |
|----|----------|------------|
| QG-01 | Nenhum placeholder [TODO], [INSERT], Lorem ipsum | Crítico |
| QG-02 | Nenhuma garantia de receita ou promessa de resultados financeiros | Crítico |
| QG-03 | Cada ângulo é genuinamente diferente (sem reformulação) | Crítico |
| QG-04 | Todos os limites de caracteres respeitam as especificações do Meta | Crítico |
| QG-05 | Cada URL inclui parâmetros UTM completos | Alto |
| QG-06 | Pelo menos 2 ângulos incluem script de vídeo | Alto |
| QG-07 | Cada ângulo tem Versão A e Versão B | Alto |
| QG-08 | Orçamento mínimo ≥ 5× o CPA estimado por conjunto — nunca lançar com orçamento insuficiente para a fase de aprendizado | Crítico |
| QG-09 | Sempre incluir os parâmetros UTM | Crítico |
| QG-10 | Nunca prometer um ROAS específico | Crítico |
| QG-11 | Orçamento de teste mínimo: ≥5× o CPA alvo por conjunto | Alto |
| QG-12 | Copies legalmente conformes — sem declarações falsas | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Produto não definido | Perguntar: "Qual produto você quer promover?" Mínimo = nome + preço + descrição curta |
| Sem URL de landing page | Gerar copies sem URL. Adicionar placeholder \`[URL_LANDING_PAGE]\` nos UTMs |
| Orçamento muito baixo (<R$ 25/dia) | Recomendar 2-3 ângulos no máximo. Foco em orgânico + boost de posts |
| Sem prova social | Omitir o ângulo #4 (Prova Social). Substituir por ângulo "Bastidores" |
| Produto gratuito (lead magnet) | Adaptar CTAs: "Baixar Grátis" / "Pegar Minha Cópia". Objetivo = leads, não conversões |
| business-profile.md ausente | Continuar com as respostas da coleta de contexto |
| Audiência muito ampla / vaga | Propor 3 segmentos específicos. Pedir para escolher ou confirmar |
| Usuário quer um único ângulo | Gerar o ângulo solicitado com 3 versões (A/B/C) em vez de 12 ângulos |

---

## Integração com Outros Skills

| Antes de ad-angles-meta | Skill anterior | Quando |
|-------------------------|----------------|--------|
| Página de venda pronta | \`/dp-landing-page\` | Sempre recomendado — precisa de URL de destino |
| Perfil do negócio definido | \`business-profile.md\` | Para evitar perguntas redundantes |
| Funil desenhado | \`/dp-sales-funnel\` | Para alinhar os anúncios com a estratégia global |

| Após ad-angles-meta | Skill seguinte | Quando |
|---------------------|----------------|--------|
| Anúncios Google como complemento | \`/dp-ad-angles-google\` | Para cobrir Search + YouTube |
| Conteúdo orgânico | \`/dp-social-caption\` \`/dp-mediaplan\` | Para reforçar a presença orgânica |
| Sequência de email | \`/dp-email-sequence\` | Para nutrir os leads captados |
| Análise dos resultados | Monitoramento manual dos UTMs | Após 7 dias de veiculação |

---

## Exemplos de Copy Meta Ads — Academia FitPro

> **Produto:** Playbook do Coach Fitness
> **Preço:** R$ 197
> **Nicho:** Coaching fitness
> **Audiência:** Coaches fitness iniciantes (1-3 anos de experiência)
> **Voz:** Direta, motivadora, sem enrolação, tutear
> **Cores:** \`#059669\` (verde primário) / \`#10b981\` (verde accent)

---

## ÂNGULO 1 — Ponto de Dor: "Você está tendo dificuldade para encontrar clientes"

### Hook (primeira linha)

> Você posta todo dia no Insta e continua com 0 cliente? Não é problema de conteúdo.
> *(82 caracteres)*

---

### Texto Primário — Versão A

> Você posta todo dia no Insta e continua com 0 cliente? Não é problema de conteúdo.
>
> Já treinei +200 coaches fitness nos últimos 8 anos. O problema número 1 é sempre o mesmo: você cria conteúdo para outros coaches, não para seus clientes ideais.
>
> O Playbook do Coach Fitness é o método exato para atrair 5 a 10 clientes por mês sem anúncio, sem dançar nos Reels, sem passar 4h/dia nisso.
>
> R$ 197 — O preço de uma sessão. Só que aqui, é o seu negócio inteiro que muda.
>
> *(432 caracteres)*

### Texto Primário — Versão B

> Você posta todo dia no Insta e continua com 0 cliente? Não é problema de conteúdo.
>
> O problema real: ninguém te mostrou como transformar um seguidor em cliente pagante. Você publica, curte, comenta... e acaba treinando de graça seus amigos.
>
> No Playbook do Coach Fitness (R$ 197), te dou os 7 mecanismos exatos que me permitiram lotar minha agenda em 90 dias. Zero enrolação, só o que funciona.
>
> Clica. Baixa. Aplica hoje à noite.
>
> *(432 caracteres)*

---

### Headline

> Lote sua agenda em 90 dias *(27 caracteres)*

### Descrição

> Método testado — R$ 197 *(23 caracteres)*

### Botão CTA

> \`Saiba Mais\`

---

### Brief Visual

| Elemento | Detalhe |
|----------|---------|
| **Tipo de imagem** | Foto lifestyle — coach sozinho em frente a uma tela vazia, expressão frustrada, academia desfocada ao fundo |
| **Composição** | Regra dos terços, sujeito à esquerda, espaço negativo à direita para o texto |
| **Texto overlay** | Linha 1 (negrito, branco sobre fundo \`#059669\`): "0 cliente este mês?" / Linha 2 (regular, \`#10b981\`): "O problema não é seu conteúdo." |
| **Cores** | Fundo escuro (academia), faixa \`#059669\` em baixo, texto accent \`#10b981\` |
| **Formato** | 1080×1080 (feed) + adaptação 1080×1920 (story) |

---

### UTM

\`\`\`
?utm_source=meta&utm_medium=cpc&utm_campaign=ponto-de-dor&utm_content=v1
\`\`\`

---

## ÂNGULO 2 — FOMO: "387 coaches já têm"

### Hook (primeira linha)

> 387 coaches fitness já baixaram este playbook. O que você está esperando?
> *(73 caracteres)*

---

### Texto Primário — Versão A

> 387 coaches fitness já baixaram este playbook. O que você está esperando?
>
> Enquanto você está rolando o feed, outros coaches estão aplicando os 7 frameworks do Playbook e fechando seus primeiros clientes esta semana.
>
> O que tem dentro:
> ✅ O script de DM que converte a 40%
> ✅ O template de post "ímã de prospects"
> ✅ A sequência de email de 5 dias para fechar sem forçar
>
> R$ 197 — Sem assinatura, sem curso longo. Um playbook, resultados reais.
>
> *(440 caracteres)*

### Texto Primário — Versão B

> 387 coaches fitness já baixaram este playbook. O que você está esperando?
>
> Lucas, coach há 6 meses: "Fechei 3 clientes em 2 semanas só com o script de DM. Gostaria de ter tido isso desde o início."
>
> O Playbook do Coach Fitness = os atalhos que eu queria ter conhecido no começo. 7 frameworks. 0 teoria inútil. 100% aplicável hoje mesmo.
>
> R$ 197 — Junte-se aos 387 coaches que pararam de se debater.
>
> *(418 caracteres)*

---

### Headline

> +387 coaches já usam *(21 caracteres)*

### Descrição

> Junte-se a eles — R$ 197 *(25 caracteres)*

### Botão CTA

> \`Compre Agora\`

---

### Brief Visual

| Elemento | Detalhe |
|----------|---------|
| **Tipo de imagem** | Mockup do playbook (capa verde \`#059669\`) em tablet + notificações fictícias ("Lucas acabou de baixar", "Novo cliente fechado") |
| **Composição** | Centralizado, fundo branco-creme, elementos de prova social ao redor do produto |
| **Texto overlay** | Badge no canto superior direito (\`#10b981\`, fundo branco): "387+ coaches" / Parte inferior da imagem: "R$ 197" em negrito |
| **Cores** | Fundo claro, produto em \`#059669\`, badges em \`#10b981\` |
| **Formato** | 1080×1080 (feed) + 1080×1920 (story) |

---

### UTM

\`\`\`
?utm_source=meta&utm_medium=cpc&utm_campaign=fomo-prova-social&utm_content=v1
\`\`\`

---

## ÂNGULO 3 — Autoridade: "8 anos de coaching condensados"

### Hook (primeira linha)

> 8 anos de coaching fitness. +200 coaches treinados. Tudo está neste playbook por R$ 197.
> *(88 caracteres)*

---

### Texto Primário — Versão A

> 8 anos de coaching fitness. +200 coaches treinados. Tudo está neste playbook por R$ 197.
>
> Cometi todos os erros possíveis: treinar de graça, correr atrás de likes, baixar meus preços por medo de perder prospects. Levei 3 anos para entender.
>
> Você pode pular esses 3 anos.
>
> O Playbook do Coach Fitness são os 7 sistemas que funcionam — testados, iterados, provados em +200 coaches.
>
> R$ 197 para encurtar sua curva de aprendizado de 1000 dias.
>
> *(448 caracteres)*

### Texto Primário — Versão B

> 8 anos de coaching fitness. +200 coaches treinados. Tudo está neste playbook por R$ 197.
>
> Quando comecei, tinha zero cliente, zero método, zero sistema. Construí tudo sozinho, na tentativa e erro.
>
> Resultado: 7 frameworks que funcionam sempre. Aquisição, conversão, fidelização — o ciclo completo.
>
> Não quer passar 8 anos se debatendo? Normal. É exatamente para isso que criei o Playbook do Coach Fitness.
>
> R$ 197. Sem risco. 100% concreto.
>
> *(456 caracteres)*

---

### Headline

> 8 anos em 1 playbook *(21 caracteres)*

### Descrição

> Método comprovado — R$ 197 *(27 caracteres)*

### Botão CTA

> \`Saiba Mais\`

---

### Brief Visual

| Elemento | Detalhe |
|----------|---------|
| **Tipo de imagem** | Foto do fundador na academia, de pé, braços cruzados, sorriso confiante. Atrás dele: quadro branco com frameworks visíveis (desfocados) |
| **Composição** | Sujeito centralizado, levemente em contra-plongée para reforçar a autoridade |
| **Texto overlay** | Topo da imagem (negrito, branco): "8 anos → 1 playbook" / Base: faixa \`#059669\` com "R$ 197" em branco |
| **Cores** | Tons quentes naturais (academia) + acentos \`#059669\` e \`#10b981\` |
| **Formato** | 1080×1080 (feed) + 1080×1920 (story) |

---

### UTM

\`\`\`
?utm_source=meta&utm_medium=cpc&utm_campaign=autoridade&utm_content=v1
\`\`\`

---

### Script Reel — Ângulo Autoridade (30 segundos)

| Timing | Visual | Áudio / Voz off | Texto na tela |
|--------|--------|-----------------|---------------|
| **0–3s** | Câmera frontal, close, olhar direto. Movimento rápido para capturar atenção. | "8 anos de coaching fitness..." | Fundo pleno \`#059669\` → texto branco: "8 ANOS" (grande) com transição rápida |
| **3–10s** | Plano médio, o coach caminha em uma academia vazia. Atmosfera "antes". | "...e durante os 3 primeiros anos, eu tinha zero cliente. Postava todo dia, treinava de graça, corria atrás de likes. Resultado? Nada." | Legendas dinâmicas, palavras-chave em \`#10b981\`: "zero cliente", "de graça", "nada" |
| **10–20s** | Transição para academia cheia de clientes. Montagem rápida: quadros de frameworks, capturas de resultados, o coach em ação. | "Aí construí 7 sistemas. Aquisição, conversão, fidelização. Testei em +200 coaches. Funciona sempre." | Bullet points animados sobre fundo \`#059669\`: "✅ Aquisição ✅ Conversão ✅ Fidelização" |
| **20–25s** | Split screen com fotos dos coaches + resultados (capturas de mensagens). | "Lucas: 3 clientes em 2 semanas. Sofia: agenda lotada em 6 semanas. Com o mesmo playbook." | Badges de depoimentos, nomes em \`#10b981\` |
| **25–30s** | Close na câmera, o coach segura o playbook (mockup). Fundo \`#059669\`. | "O Playbook do Coach Fitness. R$ 197. O link está aqui embaixo." | CTA em destaque: "R$ 197 — LINK ABAIXO" com seta animada ↓ |

**Notas de produção:**
- Proporção: 9:16 (vertical, otimizado Stories/Reels)
- Legendas: obrigatórias (85% das visualizações sem som)
- Música: beat motivante, energético, livre de direitos autorais
- Ritmo: cortes rápidos a cada 2-3 segundos
- Duração total: 28-30 segundos

---

## Checklist antes da publicação

- [ ] Meta Pixel instalado e evento \`Purchase\` configurado
- [ ] Página de destino testada em mobile
- [ ] UTMs corretamente configurados para cada variante
- [ ] Audiências: Público Semelhante 1% compradores + Interesses (coaching, fitness, empreendedorismo)
- [ ] Orçamento: R$ 50-100/dia por ângulo na fase de teste (3-5 dias)
- [ ] Exclusão: compradores existentes + visitantes da página de confirmação
- [ ] Teste A/B: Versão A vs Versão B por ângulo (mesma audiência, mesmo orçamento)`
};

export default skill;
