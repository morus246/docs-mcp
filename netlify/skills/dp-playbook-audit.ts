import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-playbook-audit",
  categoria: "Análise e Qualidade",
  descricao: "Auditoria de qualidade completa para ebooks e playbooks HTML e PDF: estrutura, conteúdo, número de páginas, coerência de versões, conformidade com o design system e padrões profissionais. Gera um relatório detalhado com pontuação 0-100 e plano de ação priorizado. Gatilhos: auditoria, verificar, qualidade, check, review playbook, controle de qualidade, PDF, HTML.",
  argumentHint: "[arquivo.html|arquivo.pdf] [--compare arquivo-ref] [--section section-id]",
  allowedTools: ["Read", "Bash", "Glob"],
  conteudo: `# Playbook Audit — Controle de Qualidade Ebook (HTML + PDF)

<!-- v2.1.0 | 2026-04-18 | Adição do suporte PDF: extração de texto via pdftotext/pdfinfo, 6 checks adaptados, detecção automática do formato -->

Expert em controle de qualidade de produtos digitais para DP Criador. Audita qualquer ebook **HTML ou PDF** — estrutura, conteúdo, número de páginas, coerência linguística, conformidade com o design system — e entrega um relatório acionável.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-playbook-audit [arquivo.html]\` | Auditoria completa de um arquivo HTML |
| \`/dp-playbook-audit [arquivo.pdf]\` | Auditoria completa de um arquivo PDF |
| \`/dp-playbook-audit\` | Auditoria do playbook padrão (busca HTML depois PDF) |
| \`/dp-playbook-audit [arquivo] --compare [ref]\` | Auditoria com comparação contra um arquivo de referência (HTML ou PDF) |
| \`/dp-playbook-audit [arquivo] --section [id]\` | Auditoria de uma única seção (somente HTML) |
| \`/dp-playbook-audit --quick [arquivo]\` | Auditoria rápida (estrutura + quality gates apenas) |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Relatório de auditoria estruturado (8 checks HTML / 6 checks PDF)
├── Pontuação de qualidade 0-100 com detalhe por categoria
├── Issues classificadas por severidade (Critical / High / Medium / Low)
├── Plano de ação priorizado
└── Recomendação: PUBLISH / REVISE / REWRITE
\`\`\`

---

## Processo

\`\`\`
0. Carregar contexto   → business-profile.md + referências
1. Detectar formato    → HTML ou PDF? Adaptar os checks
2. Ler/Extrair         → Leitura HTML ou extração de texto PDF
3. Executar checks     → 8 checks (HTML) ou 6 checks (PDF)
4. Pontuar             → Cálculo da pontuação 0-100
5. Relatório           → Relatório estruturado + plano de ação
\`\`\`

---

## Etapa 0 — Carregamento de Contexto (Silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome de marca, produto(s), preços, público, cores
  → Usar essas informações para verificar a coerência do conteúdo auditado

SENÃO:
  → Continuar sem. A auditoria se baseia no conteúdo como está.
\`\`\`

Carregar também as referências internas se disponíveis:
\`\`\`
Read references/audit-checks.md         → Detalhe dos checks
Read references/scoring-criteria.md     → Tabela de pontuação
Read references/audit-report-example.md → Exemplo de relatório de auditoria
\`\`\`

---

## Etapa 1 — Detecção do Formato e Contexto

### 1a. Detectar o formato do arquivo

\`\`\`
SE o arquivo termina em .html ou .htm:
  → MODO HTML (8 checks completos)

SE o arquivo termina em .pdf:
  → MODO PDF (6 checks adaptados)
  → Verificar as ferramentas de extração (ver Etapa 1b)

SE nenhum arquivo especificado:
  → Buscar em: ebook pt/*.html, ebook en/*.html, exports/*.pdf
  → Se encontrado → pedir confirmação
  → Se nada encontrado → pedir o caminho

SE extensão desconhecida:
  → Perguntar: "É um arquivo HTML ou PDF?"
\`\`\`

### 1b. Verificar as ferramentas PDF (somente modo PDF)

\`\`\`bash
# Verificar pdftotext (poppler-utils)
which pdftotext 2>/dev/null && echo "OK: pdftotext disponível"

# Verificar pdfinfo (poppler-utils)
which pdfinfo 2>/dev/null && echo "OK: pdfinfo disponível"

# Fallback: Python PyPDF2
python3 -c "import PyPDF2; print('OK: PyPDF2 disponível')" 2>/dev/null
\`\`\`

**Se nenhuma ferramenta disponível:**
\`\`\`
NENHUMA FERRAMENTA PDF DETECTADA

Para auditar um PDF, instale uma dessas ferramentas:

Opção 1 — poppler-utils (recomendado):
  macOS  : brew install poppler
  Ubuntu : sudo apt-get install poppler-utils
  Windows: baixar em poppler.freedesktop.org

Opção 2 — Python PyPDF2:
  pip install PyPDF2

Opção 3 — Converter o PDF em HTML primeiro:
  → Use o arquivo HTML fonte se ainda o tiver
  → A auditoria HTML é mais completa que a auditoria PDF
\`\`\`

### 1c. Perguntas se o contexto estiver faltando

| # | Pergunta | Quando |
|---|----------|--------|
| Q1 | Qual arquivo quer auditar? (caminho completo) | Nenhum arquivo encontrado automaticamente |
| Q2 | Quer comparar com um arquivo de referência? Se sim, qual? | Sem versão PT/EN evidente |
| Q3 | Auditoria completa ou foco em uma seção? | Arquivo muito longo (HTML > 3000 linhas) |

---

## Etapa 2 — Extração do Conteúdo

### Modo HTML

\`\`\`
Ler o arquivo HTML inteiro com a ferramenta Read.
\`\`\`

### Modo PDF — Extração de texto

\`\`\`bash
# Extrair o texto completo do PDF
pdftotext "[arquivo.pdf]" "/tmp/audit-extracted.txt"

# Recuperar os metadados
pdfinfo "[arquivo.pdf]"
\`\`\`

**Se pdftotext não estiver disponível, fallback Python:**

\`\`\`bash
python3 -c "
import PyPDF2
reader = PyPDF2.PdfReader('[arquivo.pdf]')
print(f'Páginas: {len(reader.pages)}')
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    if text:
        print(f'--- PÁGINA {i+1} ---')
        print(text)
" > /tmp/audit-extracted.txt
\`\`\`

**Após extração, armazenar:**
- Número de páginas (de \`pdfinfo\` ou \`len(reader.pages)\`)
- Texto bruto completo (de \`pdftotext\` ou \`extract_text()\`)
- Tamanho do arquivo
- Metadados (título, autor, data de criação)

---

## SEÇÃO A — CHECKS HTML (8 checks, se formato = HTML)

### CHECK 1 — Integridade Estrutural (15 pontos)

Verificar que o documento HTML tem:

- [ ] \`<!DOCTYPE html>\` e \`<html lang="...">\` com atributo de idioma correto
- [ ] \`<head>\` com \`<meta charset="UTF-8">\`, meta viewport, e \`<title>\` descritivo
- [ ] Estrutura raiz: \`<article class="ebook">\` → \`<header>\` → \`<nav class="sommaire">\` → \`<main>\` → seções
- [ ] Propriedades CSS customizadas definidas em \`:root\` (\`--color-primary\`, \`--color-accent\`)
- [ ] Todas as classes CSS usadas estão definidas no bloco \`<style>\`
- [ ] Estilos de impressão (\`@media print\`) presentes
- [ ] Nenhum CSS/JS externo (exceto Google Fonts)

**Pontuação**: 15 pontos máx. -3 por elemento crítico faltando. -1 por elemento menor faltando.

### CHECK 2 — Completude das Seções (15 pontos)

Listar todas as seções \`<section class="section" id="...">\` encontradas no arquivo.

Para cada seção, verificar:
- [ ] Ela existe (o ID está presente no DOM)
- [ ] Não está vazia (contém conteúdo significativo)
- [ ] Tem pelo menos um \`<h2>\`
- [ ] Tem pelo menos 2 subseções \`<h3>\`

Comparar com o arquivo de referência se disponível (mesmo número de seções, mesmos IDs).

**Pontuação**: 15 pontos máx. -2 por seção faltando. -1 por seção vazia ou incompleta.

### CHECK 3 — Blocos de Conteúdo (15 pontos)

Cada seção principal deve conter esses 3 tipos de blocos:

1. **Value Block** (abertura) — \`<div class="value-block">\`
2. **Tools Block** — \`<div class="tools-block">\`
3. **Recap Block** (fechamento) — \`<div class="recap-block">\`

Contar cada tipo e comparar com a referência se disponível.

**Pontuação**: 15 pontos máx. -2 por bloco value/recap faltando. -1 por tools-block faltando.

### CHECK 4 — Navegação / Sumário (10 pontos)

- [ ] \`<nav class="sommaire">\` existe
- [ ] Cada \`<a href="#...">\` aponta para um ID existente
- [ ] Nenhum link interno quebrado
- [ ] O sumário lista todas as seções principais

\`\`\`bash
# Verificar os links do sumário
grep -oP 'href="#[^"]*"' arquivo.html | sort
grep -oP 'id="[^"]*"' arquivo.html | sort
\`\`\`

**Pontuação**: 10 pontos máx. -3 por link quebrado. -1 por seção não listada.

### CHECK 5 — Coerência PT/EN (15 pontos)

Se duas versões estão disponíveis, comparar:

- [ ] Mesmo número de \`<h2>\` e \`<h3>\`
- [ ] Mesma ordem de seções
- [ ] Todas as referências de ferramentas (T1-T10, E1-E3) idênticas
- [ ] Fórmulas KPI e métricas idênticas
- [ ] Scripts e templates todos traduzidos
- [ ] Nenhum texto não traduzido restante

**Pontuação**: 15 pontos máx (redistribuir se não houver comparação). -2 por discrepância estrutural. -1 por conteúdo não traduzido.

### CHECK 6 — Qualidade Linguística (10 pontos)

- [ ] Tom profissional e direto (voz DP Criador)
- [ ] Terminologia coerente
- [ ] Sem erros de gramática/ortografia
- [ ] Tratamento (você/tu) coerente

**Pontuação**: 10 pontos máx. -2 por problema de tom. -1 por erro linguístico.

### CHECK 7 — Design e Formatação (10 pontos)

- [ ] Labels \`<h4>\` corretos nos blocos
- [ ] Listas \`<ul class="single-item">\` bem formadas
- [ ] Sem tags HTML órfãs
- [ ] Sem estilos inline (tudo em \`<style>\`)
- [ ] Cores coerentes com business-profile.md

**Pontuação**: 10 pontos máx. -2 por problema de estrutura. -1 por incoerência.

### CHECK 8 — Anexos (10 pontos)

- [ ] Cada anexo tem um ID único e conteúdo
- [ ] O sumário referencia os anexos

**Pontuação**: 10 pontos máx. -2 por anexo vazio. -1 por anexo não referenciado.

---

## SEÇÃO B — CHECKS PDF (6 checks, se formato = PDF)

> **Nota**: A auditoria PDF é menos granular que a auditoria HTML pois o PDF não preserva a estrutura do código fonte (classes CSS, IDs, blocos). A auditoria foca no conteúdo, volume e qualidade.
>
> **Recomendação**: Se o arquivo HTML fonte ainda existe, preferir a auditoria HTML (mais completa).

### CHECK PDF-1 — Metadados e Volume (20 pontos)

\`\`\`bash
# Extrair as informações do PDF
pdfinfo "[arquivo.pdf]"
\`\`\`

Verificar:

| Critério | Limiar Playbook | Limiar Guia | Limiar Lead Magnet |
|----------|----------------|-------------|-------------------|
| Número de páginas | ≥ 60 | ≥ 30 | ≥ 10 |
| Word count (texto extraído) | ≥ 21000 | ≥ 10000 | ≥ 3500 |
| Tamanho do arquivo | < 10 MB | < 5 MB | < 3 MB |

\`\`\`bash
# Contar as palavras do texto extraído
wc -w /tmp/audit-extracted.txt

# Tamanho do arquivo
ls -lh "[arquivo.pdf]"
\`\`\`

Verificar também:
- [ ] Título do PDF definido (não "Untitled" ou vazio)
- [ ] Autor definido
- [ ] Data de criação presente

**Pontuação**:
- 20 pontos máx
- Páginas < mínimo exigido: -8 (Critical)
- Word count < mínimo: -6 (Critical)
- Tamanho > limite: -3 (High)
- Título/autor faltando: -1 cada (Low)

### CHECK PDF-2 — Conteúdo e Placeholders (20 pontos)

Analisar o texto extraído para detectar:

\`\`\`bash
# Buscar placeholders
grep -in '\[TODO\]\|\[INSERT\]\|\[EXAMPLE\]\|Lorem ipsum\|\[A COMPLETAR\]\|\[PLACEHOLDER\]' /tmp/audit-extracted.txt

# Buscar seções vazias (linhas sucessivas em branco)
awk '/^$/{blank++; if(blank>5) print NR": 5+ linhas em branco consecutivas"} /[^ ]/{blank=0}' /tmp/audit-extracted.txt

# Buscar texto no outro idioma (EN em doc PT, ou vice-versa)
# Se doc EN:
grep -in 'O que você vai aprender\|Ferramenta principal\|A reter\|Valor desta seção' /tmp/audit-extracted.txt
# Se doc PT:
grep -in 'Key takeaway\|What you will learn\|Primary tool\|Value of this section' /tmp/audit-extracted.txt
\`\`\`

Verificar:
- [ ] Zero placeholder encontrado
- [ ] Sem seções vazias (5+ linhas em branco consecutivas)
- [ ] Sem texto não traduzido
- [ ] Sem "Lorem ipsum" ou texto de preenchimento

**Pontuação**:
- 20 pontos máx
- Placeholder encontrado: -5 por ocorrência (Critical)
- Seção vazia: -3 por ocorrência (High)
- Texto não traduzido: -2 por ocorrência (Medium)

### CHECK PDF-3 — Estrutura do Conteúdo (15 pontos)

Analisar o texto extraído para detectar a estrutura:

\`\`\`bash
# Detectar títulos potenciais (linhas curtas no início de seção, frequentemente em maiúsculas ou com numeração)
grep -n '^[0-9]\+\.\|^[A-Z][A-Z ]\{5,\}\|^Seção\|^Capítulo\|^Parte\|^ANEXO' /tmp/audit-extracted.txt

# Contar as seções detectadas
grep -c '^[0-9]\+\.' /tmp/audit-extracted.txt

# Detectar o sumário
grep -n -i 'sumário\|índice\|table of contents' /tmp/audit-extracted.txt
\`\`\`

Verificar:
- [ ] Pelo menos 8 seções principais detectadas (playbook) / 5 (guia) / 3 (lead magnet)
- [ ] Sumário presente
- [ ] Introdução e conclusão detectadas
- [ ] Progressão lógica das seções (numeração ou temas coerentes)

**Heurísticas de detecção de estrutura:**

| Sinal | Interpretação |
|-------|--------------|
| Linha curta (< 60 chars) seguida de parágrafo longo | Provavelmente um título |
| Numeração (1., 2., 3. ou I., II., III.) | Estrutura de seções |
| Linhas "A reter" / "Key takeaway" | Presença de recap blocks |
| Linhas "O que você vai aprender" | Presença de value blocks |
| Palavras-chave "Ferramenta" / "Template" / "Script" | Conteúdo acionável |

**Pontuação**:
- 15 pontos máx
- Menos seções que o mínimo: -4 (High)
- Sem sumário: -3 (High)
- Sem introdução: -3 (High)
- Sem conclusão: -2 (Medium)
- Estrutura não detectável: -3 (Medium)

### CHECK PDF-4 — Qualidade Linguística (20 pontos)

Analisar uma amostra do texto (primeiras 2000 linhas + últimas 500 linhas):

\`\`\`bash
# Amostrar o texto
head -2000 /tmp/audit-extracted.txt > /tmp/audit-sample.txt
tail -500 /tmp/audit-extracted.txt >> /tmp/audit-sample.txt
\`\`\`

Verificar:
- [ ] Tom profissional e direto (voz DP Criador)
- [ ] Tratamento (você/tu) coerente do início ao fim
- [ ] Sem motivacional excessivo ("Você consegue!", "Acredite em você!")
- [ ] Conteúdo acionável (presença de verbos de ação: "Faça", "Envie", "Crie", "Lance")
- [ ] Ressalvas honestas ("depende", "resultados variáveis")
- [ ] Sem promessas de renda garantida

\`\`\`bash
# Detectar motivacional excessivo
grep -ic 'você consegue\|acredite em você\|nunca desista\|nada é impossível' /tmp/audit-sample.txt

# Detectar promessas de renda
grep -ic 'ganhe R\$.*por mês\|renda garantida\|ficar rico\|liberdade financeira' /tmp/audit-sample.txt

# Detectar verbos de ação (sinal de conteúdo acionável)
grep -ic 'envie \|crie \|lance \|abra \|escreva \|faça \|teste \|verifique ' /tmp/audit-sample.txt
\`\`\`

**Pontuação**:
- 20 pontos máx
- Promessas de renda: -5 por ocorrência (Critical)
- Motivacional excessivo > 3 ocorrências: -3 (High)
- Tratamento incoerente: -3 (High)
- Baixa proporção de verbos de ação (< 1 para 500 palavras): -3 (Medium)
- Sem ressalvas honestas: -2 (Medium)

### CHECK PDF-5 — Coerência PT/EN (15 pontos)

Se dois PDFs são fornecidos (PT + EN), comparar os textos extraídos:

\`\`\`bash
# Contar as palavras de cada versão
wc -w /tmp/audit-pt.txt /tmp/audit-en.txt

# Comparar o número de seções detectadas
grep -c '^[0-9]\+\.' /tmp/audit-pt.txt
grep -c '^[0-9]\+\.' /tmp/audit-en.txt

# Buscar texto PT no doc EN
grep -in 'etapa\|capítulo\|ferramenta principal\|a reter' /tmp/audit-en.txt

# Buscar texto EN no doc PT
grep -in 'step\|chapter\|primary tool\|key takeaway' /tmp/audit-pt.txt
\`\`\`

Verificar:
- [ ] Word count similar (diferença < 15%)
- [ ] Mesmo número de seções detectadas
- [ ] Sem texto PT no doc EN (e vice-versa)
- [ ] Mesmo número de páginas (diferença < 3 páginas)

**Pontuação**:
- 15 pontos máx (redistribuir se não houver comparação: +5 a PDF-2, +5 a PDF-4, +5 a PDF-6)
- Diferença de word count > 15%: -4 (High)
- Diferença de número de seções: -3 (High)
- Texto não traduzido: -2 por ocorrência (Medium)
- Diferença de páginas > 5: -2 (Medium)

### CHECK PDF-6 — Completude e Elementos Acionáveis (10 pontos)

Verificar a presença de elementos que fazem um bom produto digital:

\`\`\`bash
# Buscar templates / scripts / checklists
grep -ic 'template\|script\|checklist\|modelo\|exemplo\|exercício' /tmp/audit-extracted.txt

# Buscar números concretos (sinal de conteúdo específico)
grep -c '[0-9]\+%\|[0-9]\+ dia\|[0-9]\+ client\|R\$\s*[0-9]' /tmp/audit-extracted.txt

# Buscar um CTA final (link para produto/serviço)
tail -100 /tmp/audit-extracted.txt | grep -ic 'próximo passo\|next step\|para ir mais longe\|descubra'

# Buscar exercícios
grep -ic 'exercício\|é sua vez\|complete\|preencha\|calcule' /tmp/audit-extracted.txt
\`\`\`

Verificar:
- [ ] Pelo menos 1 template/script/checklist a cada 3 seções detectadas
- [ ] Números concretos presentes (mínimo 10 dados numéricos)
- [ ] CTA final ou "próximo passo" nas últimas páginas
- [ ] Pelo menos 3 exercícios práticos (somente playbook)
- [ ] Presença de glossário ou recursos (somente playbook)

**Pontuação**:
- 10 pontos máx
- Zero template/script/checklist: -4 (High)
- Menos de 5 dados numéricos: -2 (Medium)
- Sem CTA final: -2 (Medium)
- Zero exercício (playbook): -2 (High)

---

## Etapa 3 — Cálculo da Pontuação

### Pontuação HTML (8 checks)

\`\`\`
PONTUAÇÃO DE QUALIDADE: [XX]/100

Integridade estrutural  : [XX]/15  (CHECK 1)
Completude das seções   : [XX]/15  (CHECK 2)
Blocos de conteúdo      : [XX]/15  (CHECK 3)
Navegação               : [XX]/10  (CHECK 4)
Coerência PT/EN         : [XX]/15  (CHECK 5)
Qualidade linguística   : [XX]/10  (CHECK 6)
Design e Formatação     : [XX]/10  (CHECK 7)
Anexos                  : [XX]/10  (CHECK 8)
\`\`\`

### Pontuação PDF (6 checks)

\`\`\`
PONTUAÇÃO DE QUALIDADE: [XX]/100

Metadados e Volume      : [XX]/20  (CHECK PDF-1)
Conteúdo e Placeholders : [XX]/20  (CHECK PDF-2)
Estrutura do conteúdo   : [XX]/15  (CHECK PDF-3)
Qualidade linguística   : [XX]/20  (CHECK PDF-4)
Coerência PT/EN         : [XX]/15  (CHECK PDF-5)
Completude e Acionável  : [XX]/10  (CHECK PDF-6)
\`\`\`

### Limiares de publicação (idênticos HTML e PDF)

| Pontuação | Veredicto | Ação |
|-----------|-----------|------|
| 90-100 | PRONTO PARA PUBLICAR | Publicar como está |
| 70-89 | PUBLICÁVEL COM RESSALVAS | Corrigir issues High antes de publicar |
| 50-69 | NECESSITA CORREÇÕES | Corrigir issues Critical e High |
| 0-49 | NÃO PUBLICÁVEL | Reestruturação ou reescrita maior necessária |

**Hard gate**: Pontuação < 70 = NÃO recomendar a publicação.

Para um playbook: verificar ≥ 60 páginas (PDF) ou ≥ 21000 palavras (HTML).

Se não houver comparação PT/EN, redistribuir os 15 pontos do CHECK 5/PDF-5 nos outros checks.

---

## Etapa 4 — Relatório Final

\`\`\`
# PLAYBOOK AUDIT REPORT
Arquivo: [caminho]
Formato: [HTML / PDF]
Data: [data]
Auditor: dp-playbook-audit v2.1

## RESUMO
- Formato: [HTML (8 checks) / PDF (6 checks)]
- Páginas: [N] (PDF) ou estimado [N] (HTML, ~350 palavras/página)
- Word count: [N]
- Pontuação Global: [XX]/100
- Status: PUBLISH / REVISE / REWRITE
- Issues Critical: [count]
- Issues High: [count]
- Issues Medium: [count]
- Issues Low: [count]

## DETALHE POR CHECK
[Resultado de cada check]

## ITENS DE AÇÃO
Prioridade 1 (Critical) — Bloqueia a publicação:
  - [item com localização]

Prioridade 2 (High) — Corrigir antes de publicar:
  - [item]

Prioridade 3 (Medium) — Melhoria recomendada:
  - [item]

Prioridade 4 (Low) — Nice to have:
  - [item]

## PRÓXIMOS PASSOS
  → /dp-playbook-section   Reescrever uma seção específica
  → /dp-playbook-sync      Corrigir as discrepâncias PT/EN
  → /dp-copy-review        Auditoria do copywriting
  → /dp-export-pdf         Reexportar o PDF (se auditoria HTML → correções → novo PDF)
\`\`\`

### Nota especial para auditorias PDF

\`\`\`
LIMITES DA AUDITORIA PDF

A auditoria PDF analisa o texto extraído, não o layout visual.
Os seguintes elementos NÃO são verificáveis em um PDF:
  - Estrutura HTML (classes CSS, IDs, tags)
  - Links de navegação internos (sumário clicável)
  - Conformidade do design system (cores, blocos)
  - Estilos de impressão

RECOMENDAÇÃO: Se o arquivo HTML fonte existe, preferir
a auditoria HTML para um controle de qualidade mais completo.
Caminho provável: ebook pt/*.html ou ebook en/*.html
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Sempre ler o arquivo INTEIRO antes de auditar — nunca pular seções | Critical |
| QG-02 | Usar comandos bash para contar os elementos — nunca estimar | Critical |
| QG-03 | Referenciar os números de linha específicos para cada issue (HTML) ou as páginas (PDF) | Critical |
| QG-04 | O arquivo PT é SEMPRE a referência — se EN difere de PT, EN está errado | Critical |
| QG-05 | Não CORRIGIR NADA — apenas reportar. Os outros skills fazem as correções | Critical |
| QG-06 | Cada issue deve ter: descrição + localização + severidade + ação recomendada | High |
| QG-07 | A pontuação deve ser honesta — um 95/100 é raro. A maioria dos primeiros drafts são 60-80. | High |
| QG-08 | Verificar a coerência das cores com business-profile.md se disponível (somente HTML) | Medium |
| QG-09 | No modo PDF, sempre mencionar os limites da auditoria no relatório | High |
| QG-10 | Se pdftotext falhar, tentar PyPDF2 antes de declarar a auditoria impossível | High |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Arquivo não encontrado | Mensagem de erro clara + \`Glob\` para buscar arquivos HTML/PDF no projeto |
| Arquivo vazio | Sinalizar imediatamente, pontuação 0, recomendar \`/dp-playbook-create\` |
| Arquivo não-HTML e não-PDF | Detectar e recusar educadamente + sugerir o skill correto |
| PDF protegido por senha | Sinalizar: "O PDF está protegido. Desbloqueie-o antes de auditá-lo." |
| PDF digitalizado (imagens, sem texto) | Sinalizar: "O PDF contém imagens, não texto extraível. A auditoria não é possível. Use o arquivo HTML fonte." |
| pdftotext não instalado | Propor a instalação (brew install poppler / apt-get install poppler-utils) ou fallback PyPDF2 |
| Extração de texto parcial | Avisar: "Apenas [N] páginas de [total] puderam ser extraídas. A pontuação pode estar subestimada." |
| Sem arquivo de referência PT | Auditar sem comparação, redistribuir os pontos |
| Arquivo muito grande (HTML > 5000 linhas ou PDF > 200 páginas) | Propor auditoria por seção ou modo \`--quick\` |
| business-profile.md ausente | Continuar sem verificação de coerência de negócio |
| Encoding não-UTF8 | Sinalizar como issue Critical |

---

## Comandos Bash — Referência Rápida

### Para HTML

\`\`\`bash
# Contar os elementos estruturais
grep -c '<h2>' arquivo.html
grep -c '<h3>' arquivo.html
grep -c 'class="value-block"' arquivo.html
grep -c 'class="tools-block"' arquivo.html
grep -c 'class="recap-block"' arquivo.html

# Extrair os IDs de seção
grep -oP 'id="[^"]*"' arquivo.html

# Verificar os links do sumário
grep -oP 'href="#[^"]*"' arquivo.html

# Buscar placeholders
grep -n '\[TODO\]\|\[INSERT\]\|\[EXAMPLE\]\|Lorem ipsum' arquivo.html
\`\`\`

### Para PDF

\`\`\`bash
# Metadados do PDF
pdfinfo arquivo.pdf

# Extrair o texto
pdftotext arquivo.pdf /tmp/audit-extracted.txt

# Contar as palavras
wc -w /tmp/audit-extracted.txt

# Contar as páginas
pdfinfo arquivo.pdf | grep Pages

# Buscar placeholders no texto extraído
grep -in '\[TODO\]\|\[INSERT\]\|Lorem ipsum' /tmp/audit-extracted.txt

# Detectar títulos/seções
grep -n '^[0-9]\+\.\|^[A-Z][A-Z ]\{5,\}' /tmp/audit-extracted.txt

# Detectar elementos acionáveis
grep -ic 'template\|script\|checklist\|exercício' /tmp/audit-extracted.txt
\`\`\`

---

## Integração com Outros Skills

| Antes de playbook-audit | Skill anterior | Quando |
|-------------------------|----------------|--------|
| Criar um ebook | \`/dp-playbook-create\` | Antes da primeira auditoria |
| Escrever uma seção | \`/dp-playbook-section\` | Antes de auditar uma nova seção |
| Exportar em PDF | \`/dp-export-pdf\` | Se quiser auditar o PDF final |

| Depois de playbook-audit | Próximo skill | Quando |
|--------------------------|---------------|--------|
| Corrigir as discrepâncias PT/EN | \`/dp-playbook-sync\` | Issues de coerência encontradas |
| Reescrever uma seção | \`/dp-playbook-section\` | Seção com pontuação baixa |
| Revisar o copywriting | \`/dp-copy-review\` | Issues de voz ou persuasão |
| Exportar em PDF | \`/dp-export-pdf\` | Pontuação >= 90, pronto para publicar |

---

# Referência — Checks de Auditoria Detalhados

## CHECK 1 — Integridade Estrutural

### Elementos exigidos

| Elemento | Validação | Severidade se ausente |
|----------|-----------|----------------------|
| \`<!DOCTYPE html>\` | Primeira linha do arquivo | Critical |
| \`<html lang="pt">\` ou \`<html lang="en">\` | Atributo lang correto | Critical |
| \`<meta charset="UTF-8">\` | Em \`<head>\` | Critical |
| \`<meta name="viewport">\` | Em \`<head>\` | High |
| \`<title>\` descritivo | Não vazio, não "Untitled" | High |
| \`<article class="ebook">\` | Wrapper raiz | Critical |
| \`<header>\` | Dentro de article | High |
| \`<nav class="sommaire">\` | Após o header | Critical |
| \`<main>\` | Contém as seções | High |
| Variáveis CSS \`:root\` | \`--text\`, \`--muted\`, \`--bg\`, \`--accent\`, \`--border\` | High |
| \`@media print\` | Estilos de impressão | Medium |
| Sem CSS/JS externo | Exceto Google Fonts | Critical |

### Comandos bash

\`\`\`bash
# Verificar DOCTYPE
head -1 arquivo.html | grep -c 'DOCTYPE'

# Verificar lang
grep -c '<html lang=' arquivo.html

# Verificar variáveis CSS
grep -c '\-\-text\|\-\-muted\|\-\-bg\|\-\-accent\|\-\-border' arquivo.html

# Verificar estilos de impressão
grep -c '@media print' arquivo.html

# Buscar CSS/JS externos
grep -n '<link rel="stylesheet"\|<script src=' arquivo.html
\`\`\`

## CHECK 2 — Completude das Seções

### Validação por seção

Para cada \`<section class="section" id="...">\`:

1. O ID existe no DOM
2. A seção contém pelo menos um \`<h2>\`
3. A seção contém pelo menos 2 \`<h3>\`
4. A seção não está vazia (> 100 palavras de conteúdo)

### Comandos bash

\`\`\`bash
# Listar todos os IDs de seção
grep -oP 'class="section" id="\K[^"]*' arquivo.html

# Contar os h2
grep -c '<h2>' arquivo.html

# Contar os h3
grep -c '<h3>' arquivo.html
\`\`\`

## CHECK 3 — Blocos de Conteúdo

### Blocos esperados

| Bloco | Classe | Exigido em | h4 PT | h4 EN |
|-------|--------|------------|-------|-------|
| Value | \`value-block\` | Cada seção principal | O que você vai aprender | Value of this section |
| Tools | \`tools-block\` | Se ferramentas relevantes | Ferramenta recomendada | Primary tool |
| Recap | \`recap-block\` | Cada seção principal | A reter | Key takeaway |

### Comandos bash

\`\`\`bash
grep -c 'class="value-block"' arquivo.html
grep -c 'class="tools-block"' arquivo.html
grep -c 'class="recap-block"' arquivo.html
\`\`\`

## CHECK 4 — Navegação

### Validação dos links

1. Extrair todos os \`href="#..."\` do sumário
2. Extrair todos os \`id="..."\` do documento
3. Cada href deve ter um ID correspondente
4. Cada seção principal deve ter um link no sumário

### Comandos bash

\`\`\`bash
# Extrair os hrefs do sumário (entre <nav> e </nav>)
grep -oP 'href="#\K[^"]*' arquivo.html

# Extrair todos os IDs
grep -oP 'id="\K[^"]*' arquivo.html

# Encontrar hrefs sem ID correspondente (links quebrados)
# Comparar as duas listas
\`\`\`

## CHECK 5 — Coerência PT/EN

### Elementos a comparar

| Elemento | Comando bash |
|----------|-------------|
| h2 | \`grep -c '<h2>' arquivo.html\` |
| h3 | \`grep -c '<h3>' arquivo.html\` |
| value-block | \`grep -c 'class="value-block"' arquivo.html\` |
| tools-block | \`grep -c 'class="tools-block"' arquivo.html\` |
| recap-block | \`grep -c 'class="recap-block"' arquivo.html\` |
| tool-id spans | \`grep -c 'class="tool-id"' arquivo.html\` |
| Section IDs | \`grep -c 'class="section"' arquivo.html\` |

### Texto não traduzido a buscar

\`\`\`bash
# PT em EN
grep -n 'A reter\|Valor desta seção\|Ferramenta principal\|Sumário\|Nota final' arquivo-en.html

# EN em PT
grep -n 'Key takeaway\|Value of this section\|Primary tool\|Table of Contents' arquivo-pt.html
\`\`\`

## CHECK 6 — Qualidade Linguística

### Padrões a detectar

| Padrão | Severidade | Exemplo |
|--------|------------|---------|
| Voz passiva | High | "Resultados podem ser alcançados" → "Você vai obter resultados" |
| Palavras de relleno | Medium | "É importante notar que" → remover |
| Palavras de hedge | Medium | "talvez", "poderia", "possivelmente" |
| Palavras de hype | High | "revolucionário", "game-changing" |
| Palavras não traduzidas | Critical | PT em EN ou EN em PT |

## CHECK 7 — Design e Formatação

### Padrões HTML corretos

| Padrão | Correto | Incorreto |
|--------|---------|-----------|
| Listas single-item | \`<ul class="single-item">\` | \`<ul>\` para um único item |
| Negrito | \`<strong>\` | \`<b>\` |
| Itálico | \`<em>\` | \`<i>\` |
| Espaçamento | \`<p>\` | \`<br>\` |
| Estilos | Em \`<style>\` | Inline \`style="..."\` |

### Comandos bash

\`\`\`bash
# Buscar estilos inline
grep -cn 'style="' arquivo.html

# Buscar <b> ou <i>
grep -cn '<b>\|<i>' arquivo.html

# Buscar <br>
grep -cn '<br' arquivo.html
\`\`\`

## CHECK 8 — Anexos

### Validação

Para cada anexo:
1. O ID existe (\`anexo-a\`, etc.)
2. Conteúdo substancial presente (não só um título)
3. O sumário referencia o anexo

---

# Referência — Critérios de Pontuação

## Distribuição de Pontos (100 pontos total)

| Check | Categoria | Pontos Máx | Peso |
|-------|-----------|-----------|------|
| CHECK 1 | Integridade Estrutural | 15 | Estrutura HTML, CSS, meta tags |
| CHECK 2 | Completude das Seções | 15 | Seções presentes e não vazias |
| CHECK 3 | Blocos de Conteúdo | 15 | value-block, tools-block, recap-block |
| CHECK 4 | Navegação / Sumário | 10 | Links funcionais, cobertura |
| CHECK 5 | Coerência PT/EN | 15 | Contagens idênticas, tradução completa |
| CHECK 6 | Qualidade Linguística | 10 | Tom, gramática, coerência terminológica |
| CHECK 7 | Design e Formatação | 10 | Labels, HTML limpo, estilos |
| CHECK 8 | Anexos | 10 | Conteúdo substancial, IDs, sumário |

## Penalidades por tipo de issue

### Critical (-3 pontos cada)
- Seção faltando (ID ausente)
- Link de sumário quebrado
- Texto não traduzido (página inteira de PT em EN)
- Placeholder ([TODO], [INSERT], Lorem ipsum)
- Promessa de renda garantida
- HTML quebrado (tags não fechadas)
- Sem DOCTYPE ou atributo lang

### High (-2 pontos cada)
- Bloco value ou recap faltando em uma seção
- Seção vazia (ID presente mas sem conteúdo)
- Discrepância de contagem h2 ou h3 entre PT e EN
- Problema de tom (muito formal, muito hype)
- Estilos inline
- Label h4 incorreto

### Medium (-1 ponto cada)
- Tools-block faltando (opcional mas recomendado)
- Recap-block com < 3 takeaways
- Erro de gramática/ortografia
- Incoerência terminológica menor
- Seção não listada no sumário
- Indentação incoerente

### Low (-0.5 ponto cada)
- Sugestão de melhoria estilística
- Otimização de estrutura possível
- Ferramenta não referenciada que poderia ser

## Redistribuição sem CHECK 5

Se não houver comparação PT/EN (somente um arquivo auditado), os 15 pontos do CHECK 5 são redistribuídos:
- +5 ao CHECK 2 (Completude → 20 pontos)
- +5 ao CHECK 3 (Blocos de Conteúdo → 20 pontos)
- +5 ao CHECK 6 (Qualidade Linguística → 15 pontos)

## Limiares de decisão

| Pontuação | Status | Ação |
|-----------|--------|------|
| 90-100 | PUBLISH | Pronto para publicar. Correções menores opcionais. |
| 80-89 | REVISE | Bom mas correções necessárias. 1-2h de trabalho. |
| 70-79 | REVISE | Correto mas vários problemas. Meio dia de trabalho. |
| 60-69 | REWRITE | Problemas significativos. Reescrita parcial recomendada. |
| <60 | REWRITE | Problemas maiores. Reescrita completa recomendada. |

---

# Exemplo de Relatório de Auditoria — Academia FitPro

> Produto auditado: **O Playbook do Coach Fitness** (R$ 197)
> Arquivo: \`ebook pt/playbook-coach-fitness-PT.html\`
> Data: 2026-04-13
> Auditor: dp-playbook-audit v2.0

---

## RESUMO

- **Pontuação Global: 72/100**
- **Status: REVISE** (correções necessárias antes de publicar)
- Issues Critical: **3**
- Issues High: **2**
- Issues Medium: 4
- Issues Low: 2

---

## SCORECARD

| Check | Pontuação | Detalhe |
|-------|-----------|---------|
| 1. Integridade Estrutural | 13/15 | \`@media print\` ausente, meta viewport OK |
| 2. Completude das Seções | 12/15 | Seção \`plano-nutricao\` vazia (placeholder) |
| 3. Blocos de Conteúdo | 10/15 | 3 seções sem recap-block, 1 sem value-block |
| 4. Navegação / Sumário | 7/10 | Link quebrado \`#periodizacao\` (ID = \`periodizacao-treino\`) |
| 5. Coerência PT/EN | —/15 | Não aplicável (versão única PT). Pontos redistribuídos. |
| 6. Qualidade Linguística | 9/10 | Tratamento coerente, 1 anglicismo ("impactar" ao invés de "influenciar") |
| 7. Design e Formatação | 8/10 | 2 labels h4 incorretos ("Valor" ao invés de "O que você vai aprender") |
| 8. Anexos | 8/10 | Anexo "Modelos de programas" referenciado no sumário mas incompleto |
| **TOTAL** | **72/100** | |

---

## CHECK 1 — Integridade Estrutural (13/15)

- **PASS**: \`<!DOCTYPE html>\`, \`<html lang="pt">\`, \`<meta charset="UTF-8">\` presentes
- **PASS**: Estrutura raiz \`<article class="ebook">\` correta
- **PASS**: Propriedades CSS customizadas em \`:root\` (\`--text\`, \`--accent\`, \`--bg\`)
- **WARNING**: \`@media print\` ausente — os blocos coloridos não vão imprimir corretamente (linha 42)
- **PASS**: Nenhum JS externo, Google Fonts único import externo

## CHECK 2 — Completude das Seções (12/15)

10 seções encontradas, 10 esperadas.

| ID da Seção | h2 | h3 | Status |
|-------------|----|----|--------|
| mentalidade-coach | OK | 4 | PASS |
| clientes-ideais | OK | 5 | PASS |
| oferta-irresistivel | OK | 3 | PASS |
| plano-nutricao | OK | 0 | **FAIL** — conteúdo placeholder \`[TODO: redigir]\` |
| programacao | OK | 6 | PASS |
| pricing-pacotes | OK | 4 | PASS |
| aquisicao-clientes | OK | 5 | PASS |
| retencao-fidelizacao | OK | 3 | PASS |
| ferramentas-gestao | OK | 4 | PASS |
| escalar-atividade | OK | 5 | PASS |

## CHECK 3 — Blocos de Conteúdo (10/15)

| Tipo | Esperado | Encontrado | Faltando |
|------|----------|------------|---------|
| value-block | 10 | 9 | \`plano-nutricao\` |
| tools-block | 10 | 8 | \`mentalidade-coach\`, \`retencao-fidelizacao\` |
| recap-block | 10 | 7 | \`plano-nutricao\`, \`oferta-irresistivel\`, \`escalar-atividade\` |

## CHECK 4 — Navegação / Sumário (7/10)

- **FAIL**: Link \`href="#periodizacao"\` não corresponde a nenhum ID. O ID real é \`periodizacao-treino\` (linha 87 do sumário, linha 312 do conteúdo).
- **PASS**: Os outros 9 links do sumário são válidos.
- **WARNING**: A seção \`plano-nutricao\` está no sumário mas seu conteúdo é um placeholder.

## CHECK 5 — Coerência PT/EN (N/A)

Versão única PT. Os 15 pontos são redistribuídos: +5 a CHECK 2, +5 a CHECK 3, +5 a CHECK 6.

## CHECK 6 — Qualidade Linguística (9/10)

- **PASS**: Tratamento coerente em todas as seções
- **PASS**: Tom DP Criador respeitado (direto, acionável, sem fluff)
- **WARNING**: Linha 456 — "impactar seus resultados" é um anglicismo. Prefira "influenciar" ou "ter um efeito em".
- **PASS**: Terminologia fitness coerente (mesmo vocabulário ao longo de todo o texto)

## CHECK 7 — Design e Formatação (8/10)

- **WARNING**: Seções \`mentalidade-coach\` e \`aquisicao-clientes\` usam "Valor" como label h4 ao invés de "O que você vai aprender" (linhas 98, 534)
- **PASS**: Classes CSS \`single-item\` corretamente utilizadas
- **PASS**: Sem estilos inline detectados
- **PASS**: Indentação coerente

## CHECK 8 — Anexos (8/10)

- **PASS**: Anexo "Glossário Fitness" completo com 25 termos definidos
- **WARNING**: Anexo "Modelos de programas" contém 2 templates dos 5 esperados (linha 1203)
- **PASS**: Os dois anexos estão referenciados no sumário

---

## ISSUES POR SEVERIDADE

### Critical (3) — Bloqueiam a publicação

| # | Issue | Localização | Ação |
|---|-------|-------------|------|
| C1 | Seção \`plano-nutricao\` contém \`[TODO: redigir]\` — placeholder proibido | Linha 267 | Redigir a seção completa via \`/dp-playbook-section plano-nutricao\` |
| C2 | Link do sumário quebrado \`#periodizacao\` | Linha 87 | Corrigir para \`#periodizacao-treino\` |
| C3 | \`@media print\` ausente | Bloco \`<style>\` | Adicionar os estilos de impressão |

### High (2) — Corrigir antes de publicar

| # | Issue | Localização | Ação |
|---|-------|-------------|------|
| H1 | 3 seções sem recap-block | \`plano-nutricao\`, \`oferta-irresistivel\`, \`escalar-atividade\` | Adicionar um recap-block com 3 takeaways por seção |
| H2 | Labels h4 incorretos em 2 seções | Linhas 98, 534 | Substituir "Valor" por "O que você vai aprender" |

### Medium (4)

- 2 tools-blocks faltando (seções \`mentalidade-coach\` e \`retencao-fidelizacao\`)
- Anexo "Modelos de programas" incompleto (2/5 templates)
- 1 anglicismo ("impactar")
- 1 value-block faltando (seção \`plano-nutricao\` — será resolvido com C1)

### Low (2)

- Fonte Google Fonts poderia ser substituída por uma system font para uso offline
- O footer não contém o ano de publicação

---

## PLANO DE AÇÃO PRIORIZADO

\`\`\`
PRIORIDADE 1 — Esta semana (bloqueante)
  [ ] Redigir a seção plano-nutricao
      → /dp-playbook-section plano-nutricao --target ebook\ pt/playbook-coach-fitness-PT.html
  [ ] Corrigir o link do sumário #periodizacao → #periodizacao-treino
  [ ] Adicionar @media print ao CSS

PRIORIDADE 2 — Antes de publicar
  [ ] Adicionar os 3 recap-blocks faltando
  [ ] Corrigir os labels h4 ("Valor" → "O que você vai aprender")

PRIORIDADE 3 — Melhoria recomendada
  [ ] Completar o anexo "Modelos de programas" (3 templates faltando)
  [ ] Adicionar os tools-blocks nas seções mentalidade-coach e retencao-fidelizacao
  [ ] Substituir "impactar" por "influenciar" (linha 456)

PRIORIDADE 4 — Nice to have
  [ ] Adicionar o ano ao footer
  [ ] Considerar system fonts para compatibilidade offline
\`\`\`

---

## PRÓXIMOS PASSOS

\`\`\`
→ /dp-playbook-section plano-nutricao    Redigir a seção faltando
→ /dp-playbook-sync                      Sincronizar PT/EN após correções
→ /dp-copy-review                        Revisar o copywriting global
→ /dp-export-pdf                         Exportar em PDF quando pontuação >= 90
\`\`\``,
};

export default skill;
