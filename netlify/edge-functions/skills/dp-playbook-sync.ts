import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-playbook-sync",
  categoria: "Análise e Qualidade",
  descricao: "Sincroniza um ebook DP Criador entre PT e EN. Detecta discrepâncias estruturais e de conteúdo, traduz as seções faltando ou modificadas, e atualiza o arquivo alvo preservando o design e o tom. PT é sempre a fonte da verdade. Gatilhos: sync, sincronizar, traduzir, translate, pt-en, en-pt, atualização de tradução.",
  argumentHint: "[--source arquivo-pt.html] [--target arquivo-en.html] [--section section-id]",
  allowedTools: ["Read", "Bash", "Edit", "Write", "Glob"],
  conteudo: `# Playbook Sync — Sincronização PT ↔ EN

<!-- v2.0.0 | 2026-04-13 | Refatoração completa: context intake, quality gates, guia de tradução, error handling, integração entre skills -->

Expert em tradução e sincronização de conteúdo para DP Criador. Mantém a coerência entre as versões PT e EN de qualquer ebook — o PT é sempre a fonte da verdade.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-playbook-sync\` | Sync completa — busca automaticamente os arquivos PT/EN |
| \`/dp-playbook-sync --source [pt.html] --target [en.html]\` | Sync com arquivos específicos |
| \`/dp-playbook-sync --section [id]\` | Sync de uma única seção |
| \`/dp-playbook-sync --diff-only\` | Exibir as diferenças sem aplicar mudanças |
| \`/dp-playbook-sync --full-translate [arquivo-pt.html]\` | Criar a versão EN do zero |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Arquivo EN atualizado (ou criado)
├── Relatório de sincronização (elementos modificados)
├── Tabela de verificação (contagens PT vs EN)
└── Confirmação de coerência pós-sync
\`\`\`

---

## Processo

\`\`\`
0. Carregar contexto   → business-profile.md + referências
1. Context intake      → Identificar fonte e alvo
2. Ler os dois arquivos → Leitura completa PT + EN
3. Diff estrutural     → Comparação elemento por elemento
4. Apresentar diff     → Resumo para validação do usuário
5. Aplicar mudanças    → Tradução + inserção
6. Verificar           → Recontagem para confirmar a coerência
7. Relatório           → Resumo final
\`\`\`

---

## Etapa 0 — Carregamento de Contexto (Silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome de marca, produto(s), preços, público, terminologia
  → Usar para coerência das traduções (nomes próprios, termos de negócio)
Read references/sync-example.md → para um exemplo de sincronização PT→EN

SENÃO:
  → Continuar sem. As traduções se baseiam no conteúdo PT.
\`\`\`

---

## Etapa 1 — Context Intake

### 1a. Identificar os arquivos

\`\`\`
SE \$ARGUMENTS contém --source e --target:
  → Usar esses arquivos

SE \$ARGUMENTS contém um único arquivo:
  → É a fonte PT. Buscar o arquivo EN correspondente.

SE \$ARGUMENTS está vazio:
  → Buscar em ebook pt/*.html e ebook en/*.html
  → Se encontrado: usar automaticamente
  → Senão: perguntar
\`\`\`

### 1b. Perguntas se o contexto estiver faltando (máx 2-3)

| # | Pergunta | Quando |
|---|----------|--------|
| Q1 | Qual é o arquivo PT (fonte)? | Não encontrado automaticamente |
| Q2 | Qual é o arquivo EN (alvo)? Ou eu o crio do zero? | Nenhum arquivo EN encontrado |
| Q3 | Sync completa ou apenas uma seção específica? | Arquivo muito longo |

---

## Etapa 2 — Ler os Dois Arquivos

**Regra absoluta**: Ler os dois arquivos INTEIROS antes de começar. Nunca pular seções. O diff requer uma visão completa.

Se o arquivo EN não existir → ir diretamente para o modo "full translate".

---

## Etapa 3 — Diff Estrutural

### 3a. Contagens com bash

Contar nos dois arquivos:

\`\`\`bash
# Elementos a contar (PT e EN)
grep -c '<h2>' arquivo.html
grep -c '<h3>' arquivo.html
grep -c 'class="value-block"' arquivo.html
grep -c 'class="tools-block"' arquivo.html
grep -c 'class="recap-block"' arquivo.html
grep -c 'class="section"' arquivo.html
grep -c 'class="tool-id"' arquivo.html
\`\`\`

### 3b. Comparação seção por seção

Para cada seção PT (por ID), verificar se a versão EN:

| Verificação | Detalhe |
|------------|---------|
| Existe | O ID está presente no documento EN |
| Mesma estrutura | Mesmo número de h3 |
| Mesmos blocos | value-block, tools-block, recap-block presentes |
| Mesma densidade | Número de parágrafos comparável |
| Mesmo conteúdo | KPIs, números, scripts, templates idênticos |
| Traduzido | Nenhum texto PT restando na versão EN |

### 3c. Resumo do diff

\`\`\`
╔══════════════════════════════════════════════════╗
║              SYNC DIFF SUMMARY                   ║
╠══════════════════════════════════════════════════╣
║ Seções a adicionar   : [lista ou "nenhuma"]      ║
║ Seções a atualizar   : [lista ou "nenhuma"]      ║
║ Blocos a adicionar   : [lista ou "nenhum"]       ║
║ Conteúdo a traduzir  : [lista com linhas PT]     ║
║ Conteúdo a corrigir  : [lista com linhas EN]     ║
║ Labels h4 a corrigir : [lista ou "nenhum"]       ║
╠══════════════════════════════════════════════════╣
║ CONTAGENS                                        ║
║                     PT    EN    Match             ║
║ h2 headings       : ?     ?     ✓/✗              ║
║ h3 headings       : ?     ?     ✓/✗              ║
║ value-block       : ?     ?     ✓/✗              ║
║ tools-block       : ?     ?     ✓/✗              ║
║ recap-block       : ?     ?     ✓/✗              ║
║ Section IDs       : ?     ?     ✓/✗              ║
║ Tool refs         : ?     ?     ✓/✗              ║
╚══════════════════════════════════════════════════╝
\`\`\`

---

## Etapa 4 — Validação do Usuário

**Hard gate**: Sempre mostrar o diff e obter confirmação ANTES de modificar o arquivo EN.

Propor as opções:
1. "Sync tudo" — aplicar todas as modificações
2. "Sync seletiva" — escolher as seções a sincronizar
3. "Cancelar" — não fazer nada

---

## Etapa 5 — Aplicar as Mudanças

### 5a. Tipos de modificações

| Tipo | Ação |
|------|------|
| Seção faltando | Traduzir a seção PT completa e inserir na posição correta |
| Bloco faltando | Traduzir o bloco e inserir na posição correta na seção |
| Conteúdo divergente | Atualizar o conteúdo EN para refletir o PT |
| Estrutura quebrada | Corrigir o HTML para corresponder ao PT (IDs, classes, nesting) |
| Labels h4 incorretos | Corrigir os labels conforme a tabela de tradução |

### 5b. Ferramenta a usar

\`\`\`
Modificação pontual (1-2 seções)      → Edit tool
Reescrita maior (>50% do arquivo)     → Write tool
Arquivo EN inexistente                → Write tool (criação completa)
\`\`\`

---

## Etapa 6 — Guia de Tradução

### Tom e Voz

A voz DP Criador em inglês é:
- **Direta** — Sem relleno, sem fluff. Ir direto ao ponto.
- **Orientada para ação** — Imperativo: "Send X", "Book Y", "Measure Z"
- **Anti-bullshit** — Honesta sobre os limites, sem promessas mágicas.
- **Informal profissional** — Como um mentor inteligente, não um manual.

### Regras de tradução chave

#### Termos a manter em inglês nas DUAS versões

\`\`\`
Lead, Follow-up, Close/Closing, Call, DM, CTA, KPI
Pipeline, Funnel, Landing page
Show rate, Reply rate, Close rate
Onboarding, Wow moment, A/B test, ROI, CAC
\`\`\`

#### Tabela de tradução dos labels

| PT | EN |
|----|-----|
| A reter | Key takeaway |
| O que você vai aprender / Valor desta seção | Value of this section |
| Ferramenta principal / Ferramenta recomendada | Primary tool |
| Erro clássico | Common mistake |
| Regra | Rule |
| Sumário | Table of Contents |
| Nota final | Final note |

#### Adaptações para o mercado EN

| Aspecto | Regra |
|---------|-------|
| Moeda | Usar \`$\` não \`R$\` |
| Exemplos | Nichos EN (life coaching, executive coaching, health & wellness) |
| Referências culturais | Adaptar se necessário (LinkedIn US vs BR) |

#### Elementos a preservar exatamente

- Todas as tags HTML, classes e IDs
- Todo o CSS (não tocar no bloco \`<style>\` exceto por bug)
- Todos os IDs de ferramentas (T1-T10, E1-E3) e seus wrappers \`<span class="tool-id">\`
- A estrutura e a ordem das seções
- Todos os links \`<nav class="sommaire">\`
- As cores e a identidade visual

#### Proibições

| Nunca... | Por quê |
|----------|---------|
| Adicionar conteúdo ausente do PT | A fonte PT é autoridade |
| Remover conteúdo presente em PT | Idem |
| Mudar a ordem das seções | Coerência estrutural |
| Modificar as classes CSS ou IDs | Quebra o design system |
| Adicionar JavaScript | Standalone = zero JS |
| Traduzir nomes de marcas/ferramentas | Hotmart continua Hotmart |

---

## Etapa 7 — Verificação Pós-Sync

### 7a. Recontagem

Relançar as contagens bash para confirmar que PT e EN agora correspondem.

### 7b. Verificações adicionais

Para cada seção traduzida:
- [ ] Nenhum texto português restando
- [ ] Labels h4 corretamente traduzidos
- [ ] Números e métricas idênticos ao PT
- [ ] Scripts e templates completamente traduzidos
- [ ] A seção lê naturalmente em inglês (sem tradução literal)

### 7c. Relatório final

\`\`\`
SYNC COMPLETA

Fonte  : [caminho PT]
Alvo   : [caminho EN]
Seções atualizadas : [lista]
Blocos adicionados : [lista]
Linhas modificadas : [count]

VERIFICAÇÃO:
| Elemento       | PT  | EN  | Match |
|----------------|-----|-----|-------|
| h2 headings    | ?   | ?   | ✓/✗   |
| h3 headings    | ?   | ?   | ✓/✗   |
| value-block    | ?   | ?   | ✓/✗   |
| tools-block    | ?   | ?   | ✓/✗   |
| recap-block    | ?   | ?   | ✓/✗   |
| Section IDs    | ?   | ?   | ✓/✗   |
| Tool refs      | ?   | ?   | ✓/✗   |

PRÓXIMOS PASSOS:
  → /dp-playbook-audit    Auditoria de qualidade do arquivo EN
  → /dp-copy-review       Revisar o copywriting EN
  → /dp-export-pdf        Converter em PDF
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | SEMPRE ler os dois arquivos inteiros antes de começar | Critical |
| QG-02 | SEMPRE mostrar o diff e obter validação antes de modificar | Critical |
| QG-03 | SEMPRE verificar as contagens após a modificação | Critical |
| QG-04 | O PT é SEMPRE a fonte da verdade — nunca modificar o PT para corresponder ao EN | Critical |
| QG-05 | Nenhum texto português deve restar na versão EN | Critical |
| QG-06 | Os números, KPIs e métricas devem ser idênticos PT/EN | Critical |
| QG-07 | Os IDs, classes CSS e estrutura HTML devem ser preservados | Critical |
| QG-08 | A tradução deve soar natural — sem calques literais | High |
| QG-09 | Os preços devem ser coerentes com business-profile.md se disponível | High |
| QG-10 | As cores e a identidade visual devem ser idênticas nas duas versões | Medium |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Arquivo PT não encontrado | \`Glob\` para buscar .html em \`ebook pt/\`. Pedir o caminho. |
| Arquivo EN não encontrado | Propor criar a versão EN do zero (full translate) |
| Arquivo EN existe mas está vazio | Tratar como "não encontrado" — full translate |
| Os dois arquivos são idênticos | Nada a fazer. Sinalizar claramente. |
| Arquivo PT tem problemas estruturais | Recomendar \`/dp-playbook-audit\` no PT primeiro |
| ID de seção solicitada não existe no PT | Listar os IDs disponíveis, perguntar qual sincronizar |
| Conflito de estrutura (EN tem seções que PT não tem) | Sinalizar as seções órfãs. Perguntar: remover ou manter? |
| business-profile.md ausente | Continuar sem verificação de coerência de preços/nomes |
| Arquivo muito grande para um único Edit | Dividir em modificações seção por seção |

---

## Integração com Outros Skills

| Antes de playbook-sync | Skill anterior | Quando |
|------------------------|----------------|--------|
| Criar o ebook PT | \`/dp-playbook-create\` | O PT não existe ainda |
| Auditar o PT | \`/dp-playbook-audit\` | Antes de sincronizar, garantir que o PT está limpo |
| Modificar uma seção PT | \`/dp-playbook-section\` | Uma seção PT mudou, gerando a necessidade de sync |

| Depois de playbook-sync | Próximo skill | Quando |
|-------------------------|---------------|--------|
| Auditar o EN | \`/dp-playbook-audit\` | Sempre recomendado após sync |
| Revisar o copywriting EN | \`/dp-copy-review\` | Verificar que a tradução é persuasiva |
| Exportar em PDF | \`/dp-export-pdf\` | As duas versões estão prontas |

---

# Exemplo de Sincronização PT → EN

> Produto: **O Playbook do Coach Fitness** / **The Fitness Coach Playbook** (R$ 197)
> Seção sincronizada: \`aquisicao-clientes\`
> Data: 2026-04-13

---

## Seção Original PT (fonte da verdade)

\`\`\`html
<section class="section" id="aquisicao-clientes">
  <h2>Aquisição de Clientes</h2>

  <div class="value-block">
    <h4>O que você vai aprender</h4>
    <p>Como atrair seus 10 primeiros clientes em coaching fitness sem gastar um centavo em publicidade, usando apenas sua presença local e as redes sociais.</p>
  </div>

  <h3>Identifique seu terreno de caça</h3>
  <p>Antes de postar qualquer coisa, você precisa saber onde seu cliente ideal passa o tempo. Um coach especializado em forma física pós-parto não prospecta nos mesmos lugares que um coach CrossFit. Faça uma lista de 5 lugares físicos e 3 comunidades online onde seu público-alvo se encontra.</p>

  <h3>O script de primeiro contato</h3>
  <p>Envie esta mensagem para as pessoas que correspondem ao seu perfil de cliente ideal:</p>
  <p><em>"Oi [Nome], vi que você se interessa por [assunto fitness]. Sou coach especializado em [sua especialidade] e ajudo [perfil] a [resultado concreto]. Você teria 15 min essa semana para a gente conversar? Sem compromisso nenhum."</em></p>

  <div class="tools-block">
    <h4>Ferramenta recomendada</h4>
    <ul>
      <li><span class="tool-id">T6</span> - <strong>Apollo</strong> — Para estruturar sua prospecção e acompanhar seus follow-ups</li>
    </ul>
  </div>

  <div class="recap-block">
    <h4>A reter</h4>
    <ul class="single-item">
      <li>Envie 20 DMs por dia durante 30 dias — a regularidade bate o talento</li>
      <li>Personalize cada mensagem — os copy-paste são detectados de longe</li>
      <li>Não venda na primeira mensagem — abra uma conversa</li>
    </ul>
  </div>
</section>
\`\`\`

---

## Seção Traduzida EN (resultado da sync)

\`\`\`html
<section class="section" id="aquisicao-clientes">
  <h2>Client Acquisition</h2>

  <div class="value-block">
    <h4>Value of this section</h4>
    <p>How to land your first 10 fitness coaching clients without spending a dime on ads, using only your local presence and social media.</p>
  </div>

  <h3>Identify your hunting ground</h3>
  <p>Before posting anything, you need to know where your ideal client spends their time. A coach specializing in postpartum fitness doesn't prospect in the same places as a CrossFit coach. List 5 physical locations and 3 online communities where your target audience hangs out.</p>

  <h3>The first contact script</h3>
  <p>Send this message to people who match your ideal client profile:</p>
  <p><em>"Hey [First Name], I noticed you're into [fitness topic]. I'm a coach specializing in [your specialty] and I help [profile] achieve [specific result]. Would you have 15 min this week for a quick chat? No strings attached."</em></p>

  <div class="tools-block">
    <h4>Primary tool</h4>
    <ul>
      <li><span class="tool-id">T6</span> - <strong>Apollo</strong> — To structure your outreach and track your follow-ups</li>
    </ul>
  </div>

  <div class="recap-block">
    <h4>Key takeaway</h4>
    <ul class="single-item">
      <li>Send 20 DMs per day for 30 days — consistency beats talent</li>
      <li>Personalize every message — copy-paste jobs are spotted from a mile away</li>
      <li>Don't sell in the first message — start a conversation</li>
    </ul>
  </div>
</section>
\`\`\`

---

## Notas de Tradução

### Expressões delicadas

| PT | EN | Nota |
|----|----|----|
| "terreno de caça" | "hunting ground" | Metáfora preservada — natural no inglês de negócios |
| "sem gastar um centavo" | "without spending a dime" | Adaptação cultural — "dime" é o equivalente idiomático US |
| "detectados de longe" | "spotted from a mile away" | Expressão idiomática adaptada (km → mile) |
| "Sem compromisso nenhum" | "No strings attached" | Expressão mais natural em inglês que "No obligation" |
| "a regularidade bate o talento" | "consistency beats talent" | Tradução direta — funciona bem nas duas línguas |

### Adaptações culturais

| Elemento | PT | EN | Razão |
|----------|----|----|-------|
| Moeda | R$ | $ | O mercado-alvo EN é US/internacional |
| Tratamento | "você" / "seu" | "you" / "your" | O inglês não tem distinção formal/informal |
| Exemplos de nichos | "forma física pós-parto" | "postpartum fitness" | Termo padrão em inglês |
| Tom do script | Caloroso, direto | Warm, direct | Mesmo registro informal profissional |

### Termos mantidos na língua original

| Termo | Razão |
|-------|-------|
| DM (Direct Message) | Usado como está nas duas versões |
| Follow-up | Termo inglês usado também em PT no meio coaching |
| CrossFit | Nome próprio — não se traduz |
| Apollo | Nome de ferramenta — não se traduz |
| T6 | ID de ferramenta — idêntico nas duas versões |

### Elementos preservados exatamente

- ID de seção: \`id="aquisicao-clientes"\` (idêntico)
- Classes CSS: \`value-block\`, \`tools-block\`, \`recap-block\`, \`single-item\`, \`tool-id\` (idênticas)
- Estrutura HTML: mesmo nesting, mesma ordem dos blocos
- Referência de ferramenta: \`T6\` Apollo (idêntica)
- Números: 20 DMs, 30 dias, 15 min, 10 clientes, 5 lugares, 3 comunidades (idênticos)

---

## Verificação Pós-Sync

\`\`\`
| Elemento       | PT  | EN  | Match |
|----------------|-----|-----|-------|
| h2             | 1   | 1   | OK    |
| h3             | 2   | 2   | OK    |
| value-block    | 1   | 1   | OK    |
| tools-block    | 1   | 1   | OK    |
| recap-block    | 1   | 1   | OK    |
| tool-id refs   | 1   | 1   | OK    |
| Labels h4 PT   | 3   | 0   | OK    |
| Labels h4 EN   | 0   | 3   | OK    |
\`\`\``,
};

export default skill;
