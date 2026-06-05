import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-email-sequence",
  categoria: "Conteúdo e SEO",
  descricao: "Cria sequências completas de email marketing prontas para carregar (boas-vindas, lançamento, abandono, reengajamento, nutrição, pós-compra) com linhas de assunto, texto de pré-visualização, corpo completo, CTAs, timing e templates HTML opcionais com cores da marca. Gatilhos: email, sequência, email de boas-vindas, sequência de lançamento, abandono de carrinho, nutrição, drip campaign.",
  argumentHint: "[tipo: boas-vindas|lançamento|abandono|reengajamento|nutricao|pos-compra] [produto]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Email Sequence — Redator de Email Marketing

<!-- v2.0.0 | 2026-04-13 | Reformulação completa: coleta de contexto, identidade de marca, templates HTML, critérios de qualidade, tratamento de erros -->

Especialista em email marketing para DP Criador. Cria sequências de email completas, prontas para carregar em qualquer ferramenta de email marketing (Brevo, RD Station, MailerLite, entre outras) — cada email completamente redigido, sem nenhum placeholder.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-email-sequence [tipo]\` | Iniciar a criação guiada de uma sequência |
| \`/dp-email-sequence express [tipo]\` | Modo rápido — 3 perguntas e redação completa |
| \`/dp-email-sequence single [assunto]\` | Escrever um email isolado (não uma sequência) |
| \`/dp-email-sequence audit [arquivo]\` | Analisar uma sequência existente e sugerir melhorias |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Sequência completa (emails/[tipo]-sequence.[html|md])
├── Cada email: linha de assunto A/B, texto preview, corpo, CTA, P.S.
├── Timing de cada envio (dia + horário recomendado)
├── Métricas alvo por email (open rate, click rate)
├── Opção: template HTML com cores da marca
└── Resumo da sequência + fluxo visual
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto   → Coletar as informações essenciais (OBRIGATÓRIO)
2. Ler referências      → Carregar perfil do negócio, produto, voz
   Ler references/launch-sequence-templates.md → para o template de sequência de lançamento
3. Planejar sequência   → Mapa da sequência validado pelo usuário
4. Redigir emails       → Redação completa de cada email
5. Verificação          → Critérios de qualidade, verificação anti-spam, revisão
6. Entrega              → Arquivo salvo + resumo + próximos passos
\`\`\`

---

## Passo 1 — Coleta de Contexto (Obrigatório: Sempre Faça Isto Primeiro)

Antes de qualquer redação, coletar o contexto. Sem ele, os emails serão genéricos e os CTAs desconectados do negócio real.

### 1a. Carregar o perfil do negócio (silencioso)

\`\`\`
SE business-profile.md existir na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), público, tom, cores, email remetente
  → NÃO refazer as perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas da coleta cobrem o mínimo.
\`\`\`

### 1b. Fazer as perguntas por blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar em 2-3, aguardar as respostas, reformular para validar e depois continuar.

#### Bloco 1 — A sequência e o produto (perguntar primeiro)

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual tipo de sequência? \`boas-vindas\` / \`lançamento\` / \`abandono\` / \`reengajamento\` / \`nutricao\` / \`pos-compra\` | Estrutura e objetivo |
| Q2 | Qual produto ou serviço promover nesta sequência? (nome, preço, URL se disponível) | CTAs concretos e relevantes |
| Q3 | Qual é o evento gatilho? (ex: inscrição na newsletter, compra, abandono de carrinho, data de lançamento) | Timing e contexto dos emails |

**Após as respostas**: Reformular. "Se entendi corretamente, você quer uma sequência de [tipo] para [produto] disparada por [gatilho]. Está correto?"

#### Bloco 2 — O público e a voz

| # | Pergunta | Por quê |
|---|----------|---------|
| Q4 | Quem recebe esses emails? Descreva seu destinatário ideal (profissão, situação, nível). | Tom e relevância do conteúdo |
| Q5 | Qual é o problema número 1 desta pessoa? E qual resultado ela quer? | Gancho e argumentação |
| Q6 | Descreva a voz da sua marca em 2-3 palavras (ex: "direto e caloroso", "especialista e motivador", "sem rodeios e orientado a dados") | Coerência com o branding |

**Após as respostas**: Validar o perfil do destinatário.

#### Bloco 3 — A identidade de marca e o formato

| # | Pergunta | Por quê |
|---|----------|---------|
| Q7 | Qual nome e email do remetente? (ex: "Maria <maria@meunegocio.com>") | Personalização do "De:" |
| Q8 | Você quer emails em HTML com design (cores, botões estilizados) ou em texto simples? Se HTML, informe sua cor principal e cor de destaque (hex ou nome). | Formato de saída adaptado |
| Q9 | Quantos emails na sequência? (ou "padrão" para a recomendação standard) | Comprimento da sequência |
| Q10 | Você tem uma oferta especial, bônus ou ângulo promocional? (ex: desconto early-bird, bônus limitado, garantia) | Argumento comercial |

**Após as respostas**: Confirmar o formato e passar ao plano.

> **Nota honesta**: As taxas de abertura e clique variam muito conforme o nicho, o tamanho da lista e a qualidade dos leads. As métricas alvo indicadas são benchmarks — não garantias.

---

## Tipos de Sequências e Padrões

| Tipo | Emails (padrão) | Gatilho | Objetivo |
|------|-----------------|---------|---------|
| \`boas-vindas\` | 5 | Novo assinante | Acolher → valor → pitch suave → pitch direto |
| \`lançamento\` | 7 | Data de lançamento | Antecipação → abertura → urgência → fechamento |
| \`abandono\` | 3 | Abandono de carrinho/página | Lembrete → objeção → push final |
| \`reengajamento\` | 4 | 30 dias inativo | Re-gancho → bomba de valor → oferta → última chance |
| \`nutricao\` | 6 | Contínuo (semanal) | Educar → confiança → CTA periódico |
| \`pos-compra\` | 4 | Compra realizada | Obrigado → onboarding → check-in → pedido de indicação |

---

## Passo 2 — Planejar a Sequência

Apresentar o mapa da sequência e aguardar validação:

\`\`\`
PLANO DA SEQUÊNCIA
==================
Tipo    : [tipo]
Emails  : [número]
Gatilho : [evento gatilho]
Objetivo: [goal]
Remetente: [nome <email>]
Formato : [HTML com design / texto simples]

Fluxo:
Dia 0  : Email 1 — [objetivo deste email]
Dia 1  : Email 2 — [objetivo]
Dia 3  : Email 3 — [objetivo]
Dia 5  : Email 4 — [objetivo]
Dia 7  : Email 5 — [objetivo]
...
\`\`\`

**Hard gate**: NÃO começar a redação sem validação do plano.

---

## Passo 3 — Redigir Cada Email

Para CADA email da sequência, produzir:

\`\`\`
EMAIL [#] — [Nome interno]
===========================
Envio : Dia [X] após [gatilho] ([contexto de timing])
De    : [Nome <email>]

Linha de Assunto (A) : [< 50 caracteres, envolvente]
Linha de Assunto (B) : [variação A/B — abordagem diferente, não apenas troca de palavras]
Texto Preview        : [< 90 caracteres, complementa o assunto sem repeti-lo]

---

[Corpo completo do email — formatado para email]

[Assinatura]
[Nome]
[Negócio]

P.S. [Pós-escrito — frequentemente a parte mais lida após o assunto]

---

CTA : [Texto do botão] → [URL de destino]
Objetivo: [O que este email deve realizar]
Métrica alvo: [Open rate / Click rate / Reply rate — benchmark]
\`\`\`

### Se formato HTML solicitado

Produzir um template HTML responsivo com:
- Cores da marca (primária e destaque da coleta de contexto)
- Botão CTA estilizado com a cor de destaque
- Layout simples, mobile-first (máx. 600px de largura)
- Fonte web-safe (Arial, Helvetica)
- Link de descadastramento no rodapé
- Sem imagens externas (frequentemente bloqueadas)

---

## Regras de Redação de Emails

### Linhas de Assunto
- Menos de 50 caracteres (preview mobile)
- Criar curiosidade ou urgência — nunca clickbait
- Padrões que funcionam:

| Padrão | Exemplo |
|--------|---------|
| Pergunta | "Você ainda adivinhou como encontrar clientes?" |
| Número | "A regra das 20 mensagens que mudou tudo" |
| Direto | "Seu [produto] está pronto" |
| Pessoal | "[Primeiro nome] aqui — uma perguntinha" |
| Contrário | "Pare de publicar conteúdo" |
| História | "Ela fechou 3 clientes em 9 dias" |

### Texto Preview
- Complementa o assunto (não o repete)
- Menos de 90 caracteres
- Adiciona contexto ou adianta o conteúdo

### Corpo do Email
- **Parágrafos curtos** — máx. 1-3 frases por parágrafo
- **Uma ideia por email** — não acumular vários assuntos
- **Conversacional** — escrever como se falasse com uma pessoa
- **Mobile-first** — linhas curtas, sem imagens grandes, escaneável
- **Um CTA principal** — uma ação por email (botão ou link)
- **Linha P.S.** — sempre incluir uma. É a 2ª parte mais lida.

### Posicionamento dos CTAs
- Um CTA claro por email
- Repetir o link CTA 2-3 vezes no corpo (como link de texto, não apenas botão)
- Botão CTA no final
- O P.S. frequentemente contém uma variação mais suave do CTA

### Ritmo das Sequências

| Tipo | Cadência |
|------|----------|
| Boas-vindas | Diário nos primeiros 3, depois a cada 2 dias |
| Lançamento | Diário durante a janela de lançamento |
| Abandono | 1 hora, 24 horas, 72 horas |
| Nutrição | Semanal |
| Pós-compra | Dia 0, 3, 7, 14 |

### Tom
- Caloroso mas direto ("Olá [nome]" não "Caro assinante")
- Pessoal (do fundador, não "a equipe")
- Compartilhar insights reais, não teasers ("Aqui está o script" não "Temos um script")
- Confiante: "Isso funciona." não "Achamos que pode ajudar."
- Honesto: "Não é para todo mundo." gera mais confiança do que "Qualquer pessoa pode fazer isso!"

---

## Templates de Sequência

### Sequência de Boas-vindas
\`\`\`
Email 1 (Dia 0) : Boas-vindas + entregar o lead magnet + definir expectativas
Email 2 (Dia 1) : Erro número 1 do público + insight rápido (valor)
Email 3 (Dia 2) : Framework ou script extraído do produto (valor)
Email 4 (Dia 4) : História + pitch suave para o produto
Email 5 (Dia 6) : Pitch direto + prova/depoimento + CTA
\`\`\`

### Sequência de Lançamento
\`\`\`
Email 1 (D-3) : Anúncio + o que vem aí
Email 2 (D-1) : O problema que resolve (história)
Email 3 (D0)  : Abertura + pitch completo + CTA
Email 4 (D+1) : FAQ + gerenciamento de objeções
Email 5 (D+3) : Caso concreto / depoimento
Email 6 (D+5) : Última chance + escassez
Email 7 (D+6) : Chamada final + fechamento
\`\`\`

### Sequência de Abandono
\`\`\`
Email 1 (1 hora)  : "Houve algum problema?" + link de retorno
Email 2 (24 horas): Responder à principal objeção + reforçar o valor
Email 3 (72 horas): Push final + bônus ou garantia
\`\`\`

---

## Exemplo de Sequência de Lançamento — Academia FitPro

### Sequência de Lançamento do Ebook (7 emails)

| # | Dia | Objetivo | Assunto tipo |
|---|-----|----------|-------------|
| 1 | D-7 | Teaser | "Passei 6 meses em algo para você" |
| 2 | D-3 | Revelar | "[Título] sai em 3 dias — veja o que é" |
| 3 | D-0 | Lançamento | "Está no ar → [Título] está disponível" |
| 4 | D+1 | Early bird / Prova | "24h depois: os primeiros retornos + oferta early bird" |
| 5 | D+3 | Prova social | "[N] pessoas já compraram — veja o que estão dizendo" |
| 6 | D+5 | Urgência | "A oferta de lançamento termina em 48h" |
| 7 | D+7 | Última chamada + pós-lançamento | "Última chance / Obrigado — e o que vem a seguir" |

---

### Email 1 — D-7: Teaser

**Objetivo**: Criar curiosidade e anunciar que algo está acontecendo

**Assunto A**: Passei 6 meses em algo para você
**Assunto B**: O projeto secreto está (quase) pronto

**Preview**: E vai mudar a forma como você encontra clientes...

---

Olá,

Vou ser direto: faz 6 meses que estou trabalhando em um projeto nos bastidores.

Algo que eu teria adorado ter quando comecei como coach fitness. Naquela época, tinha zero cliente, zero sistema, e passava os dias publicando no Instagram rezando para alguém me contatar.

Spoiler: ninguém me contou.

Então testei. Muito. Centenas de mensagens, dezenas de estratégias, erros que me custaram tempo e dinheiro. E aos poucos, descobri o que realmente funciona para fechar clientes do zero.

Sem anúncios. Sem audiência. Sem "virar influenciador".

Apenas um sistema. Um de verdade.

Compilei tudo isso em um documento. 147 páginas. Scripts, templates, checklists, planos de ação dia a dia. Tudo testado com +300 coaches fitness iniciantes.

Vou revelar tudo isso daqui exatamente 7 dias.

Enquanto isso, tenho uma pergunta para você: qual é o seu maior bloqueio para encontrar clientes hoje? Responda a este email, eu leio tudo.

Até breve,
Academia FitPro

**P.S.** — Os 100 primeiros terão um preço de lançamento. Só para avisar para ficar de olho na caixa de entrada na semana que vem.

---

**Anotação**: Este email funciona no D-7 porque não vende nada. Cria curiosidade pura. O storytelling pessoal ("sofri como você") estabelece credibilidade e empatia. A pergunta final gera respostas que (a) aumentam a entregabilidade, (b) fornecem feedback real, e (c) criam engajamento que facilitará a conversão no lançamento.

---

### Email 2 — D-3: Problema + Promessa

**Objetivo**: Aprofundar a dor do problema e posicionar a solução

**Assunto A**: Por que você ainda não tem 10 clientes
**Assunto B**: O problema real (não é o que você pensa)

**Preview**: 90% dos coaches cometem este erro. Você está entre eles?

---

Olá,

Na semana passada, recebi 47 respostas ao meu email. E sabe qual palavra aparece mais?

"Visibilidade."

"Não tenho visibilidade suficiente." "Preciso crescer minha audiência." "Quando tiver 10.000 seguidores, os clientes virão."

Vou te dizer uma coisa que pode te incomodar: visibilidade não é o seu problema.

Seu problema é que você espera que os clientes venham até você em vez de ir buscá-los.

Há uma diferença enorme entre "publico e torço" e "identifico 50 pessoas que precisam de mim e falo diretamente com elas".

A primeira estratégia leva meses. A segunda leva uma tarde.

Entre os +300 coaches que acompanhei, os que fecharam seus 10 primeiros clientes mais rápido tinham algo em comum: publicavam quase nada. Eles prospectavam. Diretamente. Por DM.

Não era spam. Não era "compre meu coaching". Eram mensagens humanas, relevantes, personalizadas. Com um script que funciona.

Em 3 dias, vou te entregar esse script. E todo o sistema ao redor.

Fique ligado.

Academia FitPro

**P.S.** — Lancei uma contagem regressiva no site. 72 horas. O preço de lançamento estará disponível apenas para os 100 primeiros.

---

**Anotação**: No D-3, o prospect já conhece o teaser. Este email muda de registro: ataca a crença limitante ("preciso de visibilidade") para substituí-la pela realidade ("você precisa de prospecção direta"). É um email de reposicionamento mental. Ainda não vende nada, mas prepara o prospect para aceitar a solução que será apresentada no lançamento.

---

### Email 3 — D-0: Lançamento

**Objetivo**: Anunciar o produto e gerar as primeiras vendas

**Assunto A**: Está aberto. O Playbook do Coach Fitness está aqui.
**Assunto B**: R$ 197. 147 páginas. Seus 10 primeiros clientes.

**Preview**: Preço de lançamento para os 100 primeiros. Sem segunda chance.

---

Olá,

É o dia.

O Playbook do Coach Fitness está disponível agora.

147 páginas. Um único objetivo: ajudar você a fechar seus 10 primeiros clientes em 30 dias. Sem anúncios, sem audiência, sem complicação.

Veja o que está dentro:

- O método para encontrar 50 prospects qualificados em 2 horas (grátis, sem anúncios)
- 4 scripts de DM testados com +300 mensagens — taxa de conversão 15-20%
- A fórmula de precificação para não desvalorizar seu trabalho
- O sistema de follow-up 3-7-14 que transforma "vou pensar" em clientes
- O protocolo de onboarding que reduz cancelamentos em 60%
- +20 templates prontos para copiar e colar (DMs, chamadas de descoberta, objeções, emails de acompanhamento)

Preço de lançamento: R$ 197 (em vez de R$ 297).

Por que este preço? Porque é um lançamento e quero 100 coaches que apliquem o Playbook, obtenham resultados e falem sobre ele. O preço subirá para R$ 297 quando as 100 vagas forem preenchidas.

E se não funcionar para você? Satisfação garantida em 30 dias. Você me envia um email, eu reembolso. Simples assim.

Você tem as ferramentas. Tem o plano. A única variável é você.

[OBTER O PLAYBOOK — R$ 197]

Até já,
Academia FitPro

**P.S.** — R$ 197 é o preço de uma sessão com um cliente. Um único cliente fechado graças ao Playbook e seu investimento se paga 4 vezes. O restante é lucro.

---

**Anotação**: O email de lançamento deve ser claro, estruturado e orientado à ação. Sem storytelling longo — o prospect foi preparado pelos 2 emails anteriores. Vamos direto ao ponto: aqui está o produto, aqui está o que contém (bullets escaneáveis), aqui está o preço, aqui está a garantia.

---

### Email 4 — D+1: Prova Social + FAQ

**Objetivo**: Eliminar objeções com prova social e responder às perguntas

**Assunto A**: "Fechei 3 clientes em 12 dias" — Sarah, São Paulo
**Assunto B**: As 3 perguntas que todo mundo me faz

**Preview**: Mais as respostas honestas às dúvidas que você provavelmente tem.

---

Olá,

24 horas após o lançamento, 3 coisas:

**1. Os primeiros retornos já chegam.**

Sarah, coach em São Paulo, me escreveu ontem à noite: "Li as 3 primeiras seções, enviei 15 DMs com o script Variação 1, e já tenho 4 respostas. É concreto, é direto, funciona."

Karim, coach em domicílio no Rio: "O template de precificação me abriu os olhos. Cobrava R$ 80 por sessão. Recalculei: valho R$ 180. E meu primeiro prospect disse sim sem negociar."

**2. As 3 perguntas que mais recebo:**

**"Funciona se eu tiver zero seguidores?"**
Sim. A estratégia não depende da sua audiência. Você vai buscar os prospects diretamente. Sarah tinha 230 seguidores no Instagram quando começou.

**"Quanto tempo por dia?"**
1 a 2 horas. É inegociável. Mas é 1 a 2 horas de trabalho útil, não 4 horas criando Reels que ninguém vê.

**"E se eu não encontrar clientes mesmo assim?"**
Garantia de 30 dias. Se você seguir o plano e não funcionar, me envia um email e eu reembolso. Sem riscos.

**3. Ainda há vagas no preço de lançamento.**

Não muitas. O preço sobe para R$ 297 em alguns dias. Se você ainda está em dúvida, se pergunte: o que muda se eu não fizer nada?

[OBTER O PLAYBOOK — R$ 197]

Academia FitPro

**P.S.** — Tem uma pergunta que não cobri? Responda a este email. Eu respondo pessoalmente a cada mensagem.

---

### Email 5 — D+3: Conteúdo de Valor

**Objetivo**: Dar valor gratuito e demonstrar a expertise

**Assunto A**: O script de DM que gerou 47 chamadas em 2 semanas
**Assunto B**: Presente: um trecho gratuito do Playbook

**Preview**: Você pode usar isso hoje. Sem precisar comprar nada.

---

Olá,

Hoje, sem pitch. Só valor.

Aqui está um trecho do Playbook — o script de prospecção por DM "Variação 1" que gerou 47 chamadas de descoberta em 2 semanas para os coaches do programa beta.

O script:

"Olá [nome]! Vi seu comentário sobre [assunto] em [grupo/post]. Você tem razão, [reformular o problema dele/dela em 1 frase]. Eu acompanho exatamente [descrição do cliente ideal] a [resultado principal] em [duração]. Se tiver interesse, posso explicar como funciona em 5 min. Sem pressão, só uma conversa."

Por que funciona:
- Mostra que você se deu ao trabalho de ler o que ele/ela escreveu (personalização)
- Reformula o problema com as palavras dele/dela (empatia)
- Propõe uma ação concreta e curta ("5 min")
- Remove a pressão ("só uma conversa")

Erros a evitar:
- Não copie o script palavra por palavra sem adaptar. Mude pelo menos o [assunto] e a reformulação do problema.
- Não envie 50 mensagens idênticas de uma vez. As plataformas detectam spam.
- Não escreva um texto de 10 linhas. Este script tem 4 frases. É proposital.

Isso aqui é 1 script dos 4 do Playbook. Com o sistema de follow-up, o template de CRM, o plano dia a dia, e os outros 20 templates.

Se quiser o sistema completo:

[OBTER O PLAYBOOK COMPLETO — R$ 197]

E se você usar este script hoje, me conta os resultados. Tenho curiosidade.

Academia FitPro

**P.S.** — Este script funciona melhor combinado com o sistema de follow-up 3-7-14 (no Playbook). Sozinho, converte em 10%. Com o follow-up, 15-20%.

---

### Email 6 — D+5: Urgência + Objeção de Preço

**Objetivo**: Criar urgência e tratar a objeção de preço

**Assunto A**: O preço sobe em 48h
**Assunto B**: R$ 197 hoje. R$ 297 na quarta-feira.

**Preview**: Última chance pelo preço de lançamento.

---

Olá,

Vou ser breve.

O preço do Playbook do Coach Fitness sobe para R$ 297 em 48 horas. Não é urgência falsa — o preço de lançamento era para os 100 primeiros e estamos chegando lá.

Se você ainda está em dúvida, entendo. R$ 197 é dinheiro. Especialmente quando você está começando e cada real conta.

Então vamos fazer as contas juntos:

- O Playbook custa R$ 197
- Um único cliente fechado graças aos scripts = mínimo R$ 500/mês de receita
- ROI do Playbook com o primeiro cliente = +153%

Ou seja: se o Playbook ajudar você a encontrar apenas um cliente (e foi criado para encontrar 10), você recupera o investimento em menos de um mês.

Compare isso com a alternativa: continuar publicando conteúdo por 6 meses esperando que alguém entre em contato. Custo em tempo? Centenas de horas. Custo em receita perdida? Milhares de reais.

R$ 197 é o preço de uma mensalidade de academia que você não usa. Só que aqui, você vai usar. E vai gerar retorno.

[ÚLTIMA CHANCE — R$ 197 ANTES DO AUMENTO]

Academia FitPro

**P.S.** — Lembrete: garantia de 30 dias. Você literalmente não arrisca nada. Se não funcionar, você recupera o dinheiro. Se funcionar, recupera 10x o investimento.

---

### Email 7 — D+7: Última Chamada + Encerramento

**Objetivo**: Última conversão + encerrar a sequência de forma adequada

**Assunto A**: Termina esta noite à meia-noite
**Assunto B**: Último email. Última chance.

**Preview**: Depois disso, o preço vai para R$ 297. De verdade.

---

Olá,

Último email. Prometo.

Esta noite às 23h59, o preço do Playbook do Coach Fitness passa de R$ 197 para R$ 297. Não é tática. É um fato. O lançamento encerra.

Não vou refazer o pitch. Você sabe o que tem dentro. Sabe que funciona. Sabe que tem garantia.

Então vou apenas fazer uma pergunta:

Daqui a 30 dias, o que será diferente no seu negócio de coaching?

Opção A: Você terá seguido o plano do Playbook, enviado seus DMs, marcado suas chamadas, e fechado seus primeiros clientes. Você vai saber exatamente como encontrar clientes quando precisar. Terá um sistema.

Opção B: Você estará exatamente no mesmo lugar de hoje. Mesmas dúvidas, mesma ausência de clientes, mesma frustração.

A única diferença entre A e B é uma decisão. A que você toma (ou não) nas próximas horas.

R$ 197. 147 páginas. 30 dias. 10 clientes.

[OBTER O PLAYBOOK — ÚLTIMO DIA A R$ 197]

Seja qual for sua decisão, obrigado por ter lido esta série de emails. Se tiver perguntas, estou sempre disponível por email.

Até breve,
Academia FitPro

**P.S.** — Se você comprar esta noite e achar que o Playbook não vale R$ 197, me responda amanhã de manhã e reembolso na hora. É tão simples quanto isso.

---

## Resumo da Sequência de Lançamento

| Dia | Objetivo | Tom dominante | Tem CTA de compra? |
|-----|----------|-------------|-------------------|
| D-7 | Curiosidade + engajamento | Storytelling pessoal | Não |
| D-3 | Reposicionamento mental | Educação + disrupção | Não |
| D-0 | Lançamento + conversão | Direto, estruturado | Sim |
| D+1 | Prova social + FAQ | Tranquilização, depoimentos | Sim |
| D+3 | Valor gratuito | Generoso, especialista | Sim (suave) |
| D+5 | Urgência + ROI | Cálculo, racional | Sim (forte) |
| D+7 | Encerramento emocional | Minimalista, respeitoso | Sim (final) |

---

## Princípios Aplicados

1. **Os 2 primeiros emails não vendem nada.** Eles criam a relação e preparam o terreno.
2. **Cada email tem um único objetivo.** Sem misturar curiosidade + venda + depoimento no mesmo email.
3. **A prova social chega após o lançamento**, não antes. Antes estaria fora de contexto.
4. **O email de valor (D+3) reativa os inativos** dando sem pedir.
5. **A urgência é real e anunciada**, não fabricada com um timer falso.
6. **O último email respeita o prospect.** Sem culpabilização, sem "você vai se arrepender".
7. **O P.S. é estratégico em cada email:** carrega um argumento diferente do corpo (ROI, garantia, escassez, prova social).

---

## Critérios de Qualidade

| ID | Critério | Severidade |
|----|----------|-----------|
| QG-01 | Nenhum placeholder ([TODO], [INSERIR], [sua história aqui]) | Crítico |
| QG-02 | Cada email está COMPLETAMENTE redigido — corpo completo | Crítico |
| QG-03 | Linhas de assunto A/B são abordagens diferentes, não trocas de palavras | Alto |
| QG-04 | Cada email tem exatamente 2-3 posicionamentos de CTA (link de texto + botão) | Alto |
| QG-05 | Linha P.S. presente em cada email | Alto |
| QG-06 | Nenhum gatilho de spam: "GRÁTIS!!!", "Aja agora!!!", MAIÚSCULAS excessivas | Crítico |
| QG-07 | Referência ao descadastramento no template | Crítico |
| QG-08 | Cada email agrega valor de forma independente (mesmo sem clique) | Alto |
| QG-09 | Nenhuma promessa de receita ou resultados garantidos | Crítico |
| QG-10 | Texto preview não repete a linha de assunto | Médio |
| QG-11 | Sem 2 emails de pitch duro consecutivos | Alto |
| QG-12 | Se HTML: template responsivo, max-width 600px, fontes web-safe | Alto |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Tipo de sequência não especificado | Perguntar: "Qual é o seu objetivo? Recomendo o tipo certo de sequência." |
| Sem produto para promover | Criar sequência orientada a valor/engajamento com CTAs para conteúdo gratuito |
| business-profile.md ausente | Continuar com as respostas da coleta de contexto |
| O usuário quer ir rápido | Modo express: Q1, Q2, Q7 apenas, depois redação completa. Avisar: "Resultado bom mas menos personalizado." |
| Sequência muito longa (>10 emails) | Avisar: "Acima de 10 emails, as taxas de engajamento caem significativamente. Recomendo [N] emails máx. para este tipo." |
| Produto ainda não criado | Sugerir criar o produto primeiro com \`/dp-playbook-create\` ou \`/dp-landing-page\` |
| O usuário quer modificar um email após redação | Reescrever o email em questão mantendo a coerência com o restante da sequência |
| Nicho sensível (saúde, finanças) | Adicionar disclaimers adequados e evitar claims não verificáveis |

---

## Integração com Outros Skills

| Antes | Skill | Quando |
|-------|-------|--------|
| Criar o produto a vender | \`/dp-playbook-create\` | Se o produto ainda não existe |
| Definir o negócio | \`business-profile.md\` | Se ainda não criado |
| Criar o lead magnet | \`/dp-lead-magnet-create\` | Para a sequência de boas-vindas |
| Página de vendas | \`/dp-landing-page\` | Para ter uma URL de destino do CTA |

| Depois | Skill | Quando |
|--------|-------|--------|
| Promover nas redes sociais | \`/dp-social-caption\` | Para anunciar o lançamento |
| Artigo de blog | \`/dp-blog-article\` | Conteúdo para linkar nos emails de nutrição |
| Publicidade | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para aquisição de leads |
| Plano de mídia | \`/dp-mediaplan\` | Para planejar o calendário de lançamento |`,
};

export default skill;
