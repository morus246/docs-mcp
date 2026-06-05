import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-export-pdf",
  categoria: "Análise e Qualidade",
  descricao: "Converte qualquer arquivo HTML em PDF profissional pronto para vender. Gerencia a paginação, headers/footers, capa, sumário clicável e links ativos. Suporta ebooks, guias, lead magnets, checklists e landing pages. Gatilhos: export, pdf, converter, print, baixar, ebook pdf, exportar.",
  argumentHint: "[arquivo.html] [formato: a4|letter|ebook] [--cover] [--toc]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Export PDF — Conversor HTML → PDF Profissional

<!-- v2.0.0 | 2026-04-13 | Criação: conversão HTML→PDF, paginação, capa, TOC, links ativos -->

Converte os arquivos HTML gerados pelos skills DP Criador em PDFs profissionais prontos para vender ou distribuir. O PDF é o formato padrão para ebooks, guias e lead magnets vendidos online.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-export-pdf browser [arquivo.html]\` | Conversão via navegador (sem instalação) |
| \`/dp-export-pdf [arquivo.html]\` | Conversão simples com opções padrão |
| \`/dp-export-pdf [arquivo.html] --cover\` | Com página de capa |
| \`/dp-export-pdf [arquivo.html] --toc\` | Com sumário clicável |
| \`/dp-export-pdf [arquivo.html] --full\` | Capa + TOC + headers/footers + números de página |
| \`/dp-export-pdf batch [pasta]\` | Converter todos os HTML de uma pasta |
| \`/dp-export-pdf check\` | Verificar se as ferramentas de conversão estão instaladas |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── exports/[slug].pdf
│   ├── PDF profissional alta qualidade
│   ├── Paginação automática
│   ├── Links internos e externos clicáveis
│   ├── Sumário clicável (opcional)
│   ├── Página de capa (opcional)
│   ├── Headers/footers com números de página (opcional)
│   └── Otimizado para impressão e tela
└── Pronto para upload no Hotmart, Kiwify, etc.
\`\`\`

---

## Processo

\`\`\`
1. Verificar as ferramentas   → Puppeteer, Playwright, ou wkhtmltopdf instalado?
2. Context intake              → Arquivo fonte, opções de formato
3. Preparar o HTML             → Injetar estilos print, capa, TOC
4. Converter                   → HTML → PDF via o motor disponível
5. Verificar                   → Páginas, tamanho, links, qualidade
6. Entregar                    → Arquivo PDF + resumo
\`\`\`

---

## Etapa 1 — Verificar as Ferramentas de Conversão

Testar nesta ordem de preferência:

\`\`\`bash
# Opção 1 (recomendada): Puppeteer / Playwright (via Node.js)
which node && npm list -g puppeteer 2>/dev/null || npm list puppeteer 2>/dev/null

# Opção 2: Playwright
which playwright 2>/dev/null

# Opção 3: wkhtmltopdf
which wkhtmltopdf 2>/dev/null

# Opção 4: Prince (comercial, alta qualidade)
which prince 2>/dev/null

# Opção 5: Chrome/Chromium headless
which google-chrome 2>/dev/null || which chromium 2>/dev/null || which chromium-browser 2>/dev/null
\`\`\`

### Se nenhuma ferramenta estiver instalada

Guiar a instalação:

\`\`\`
NENHUMA FERRAMENTA PDF DETECTADA

Opções de instalação (escolha a que preferir):

Opção 1 — Puppeteer (recomendado, Node.js necessário):
  npm install -g puppeteer

Opção 2 — wkhtmltopdf (standalone, sem Node necessário):
  macOS  : brew install wkhtmltopdf
  Ubuntu : sudo apt-get install wkhtmltopdf
  Windows: baixar em wkhtmltopdf.org

Opção 3 — Chrome headless (se Chrome já estiver instalado):
  Nenhuma instalação adicional necessária.

Qual ferramenta quer instalar? Ou já tem uma?
\`\`\`

---

## Etapa 2 — Context Intake

### 2a. Carregar o perfil de negócio (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: cores (primary_color, accent_color), nome de marca, logo, estilo visual
  → Pré-preencher as opções de capa (cores, nome do autor, marca)
  → NÃO fazer novamente as perguntas já cobertas pelo perfil
Read references/print-css-troubleshooting.md → para resolver problemas de impressão comuns

SENÃO:
  → Continuar sem. As perguntas do intake cobrem o mínimo.
\`\`\`

### 2b. Perguntas

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual **arquivo HTML** quer converter? (caminho ou "vou buscar") | Fonte |
| Q2 | Qual **formato de página**? \`a4\` (210×297mm, padrão EU) / \`letter\` (8.5×11in, padrão US) / \`ebook\` (6×9in, formato livro) | Layout |
| Q3 | Quer uma **página de capa**? (sim/não) | Aparência pro |
| Q4 | Quer **números de página** e headers/footers? (sim/não) | Navegação |

#### Se capa = sim

| # | Pergunta | Por quê |
|---|----------|---------|
| Q5 | **Título** a exibir na capa? (padrão: título do HTML) | Personalização |
| Q6 | **Subtítulo**? | Contexto |
| Q7 | **Nome do autor**? (padrão: de business-profile.md) | Atribuição |
| Q8 | Tem uma **imagem de capa**? (caminho ou URL) Se não, faço uma capa com suas cores de marca. | Visual |

---

## Etapa 3 — Preparar o HTML para o PDF

### 3a. Injetar os estilos print otimizados

Adicionar ou substituir o \`@media print\` no HTML:

\`\`\`css
@media print {
  /* --- Reset para PDF --- */
  body {
    max-width: 100%;
    padding: 0;
    margin: 0;
    font-size: 11pt;
    line-height: 1.6;
    color: #000;
  }

  /* --- Paginação --- */
  .section {
    page-break-inside: avoid;
  }
  h2 {
    page-break-after: avoid;
    page-break-before: always;
  }
  h2:first-of-type {
    page-break-before: avoid;
  }
  h3 {
    page-break-after: avoid;
  }
  .value-block, .tools-block, .recap-block {
    page-break-inside: avoid;
  }

  /* --- Blocos para impressão --- */
  .value-block {
    border-left: 3pt solid [accent_color];
    background: #f8f8f8 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .tools-block {
    border-left: 3pt solid #3b82f6;
    background: #f0f4ff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .recap-block {
    border-left: 3pt solid #eab308;
    background: #fffef0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* --- Links --- */
  a {
    color: [primary_color] !important;
    text-decoration: underline;
  }

  /* --- TOC --- */
  .sommaire {
    page-break-after: always;
  }

  /* --- Imagens --- */
  img {
    max-width: 100%;
    page-break-inside: avoid;
  }
}
\`\`\`

### 3b. Gerar a página de capa (se solicitada)

Inserir antes do conteúdo principal:

\`\`\`html
<div class="cover-page" style="
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background: [primary_color];
  color: white;
  padding: 3rem;
  page-break-after: always;
">
  <!-- Logo se disponível -->
  <img src="[logo_url]" alt="[brand_name]" style="max-width: 120px; margin-bottom: 2rem;" />

  <h1 style="
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
    color: white;
    border: none;
  ">[Título]</h1>

  <p style="
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 3rem;
    max-width: 500px;
  ">[Subtítulo]</p>

  <div style="
    width: 60px;
    height: 3px;
    background: [accent_color];
    margin-bottom: 3rem;
  "></div>

  <p style="
    font-size: 1rem;
    font-weight: 600;
  ">[Autor]</p>

  <p style="
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: auto;
  ">[brand_name] — [ano]</p>
</div>
\`\`\`

### 3c. Números de página e headers/footers

Para Puppeteer/Playwright, passar como opção:

\`\`\`javascript
{
  displayHeaderFooter: true,
  headerTemplate: \`
    <div style="font-size: 8pt; color: #999; width: 100%; text-align: center; padding: 5px 0;">
      [brand_name] — [Título do documento]
    </div>
  \`,
  footerTemplate: \`
    <div style="font-size: 8pt; color: #999; width: 100%; text-align: center; padding: 5px 0;">
      Página <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>
  \`,
  margin: {
    top: '20mm',
    bottom: '20mm',
    left: '15mm',
    right: '15mm'
  }
}
\`\`\`

---

## Etapa 4 — Converter

### Método 0: Navegador (sem instalação necessária)

O método mais simples — funciona em qualquer computador com Chrome, Edge ou Firefox.

**Etapas:**
1. Abrir o arquivo HTML no Chrome (duplo clique no arquivo)
2. Verificar que o render está correto (cores, layout, blocos)
3. \`Ctrl+P\` (ou \`Cmd+P\` no Mac) → Imprimir
4. Destino: **"Salvar como PDF"**
5. Configurações recomendadas:
   - Formato: A4
   - Margens: Padrão ou Nenhuma (depende do CSS)
   - Marcar **"Gráficos de fundo"** (CRÍTICO — sem isso os blocos coloridos desaparecem)
   - Desmarcar "Cabeçalhos e rodapés" (o CSS gerencia os números de página)
6. Clicar "Salvar" → escolher a pasta \`exports/\`

**Vantagens:** Sem instalação, funciona em qualquer lugar, resultado imediato
**Limites:** Sem números de página automáticos, sem header/footer customizado, sem batch

> **Este é o método recomendado se você não for desenvolvedor.** Os métodos abaixo (Puppeteer, wkhtmltopdf) oferecem mais controle mas exigem instalações técnicas.

### Método 1: Puppeteer (Node.js)

\`\`\`javascript
// Criar o script de conversão
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(\`file://\${__dirname}/[arquivo.html]\`, {
    waitUntil: 'networkidle0'
  });

  await page.pdf({
    path: 'exports/[slug].pdf',
    format: '[A4|Letter]',
    printBackground: true,
    displayHeaderFooter: [true|false],
    headerTemplate: '[header]',
    footerTemplate: '[footer]',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    preferCSSPageSize: false
  });

  await browser.close();
})();
\`\`\`

\`\`\`bash
node convert-pdf.js
\`\`\`

### Método 2: Chrome/Chromium Headless

\`\`\`bash
google-chrome --headless --disable-gpu \\
  --print-to-pdf="exports/[slug].pdf" \\
  --no-pdf-header-footer \\
  --print-to-pdf-no-header \\
  "file://\$(pwd)/[arquivo.html]"
\`\`\`

### Método 3: wkhtmltopdf

\`\`\`bash
wkhtmltopdf \\
  --page-size [A4|Letter] \\
  --margin-top 20mm \\
  --margin-bottom 20mm \\
  --margin-left 15mm \\
  --margin-right 15mm \\
  --enable-local-file-access \\
  --print-media-type \\
  --encoding UTF-8 \\
  --footer-center "Página [page] / [topage]" \\
  --footer-font-size 8 \\
  --footer-spacing 10 \\
  "[arquivo.html]" \\
  "exports/[slug].pdf"
\`\`\`

### Método 4: Playwright

\`\`\`bash
npx playwright pdf "[arquivo.html]" "exports/[slug].pdf" \\
  --format A4 \\
  --margin "20mm 15mm 20mm 15mm"
\`\`\`

---

## Etapa 5 — Verificação

Após a conversão, verificar:

\`\`\`bash
# Tamanho do arquivo
ls -lh exports/[slug].pdf

# Número de páginas (se pdfinfo disponível)
pdfinfo exports/[slug].pdf 2>/dev/null | grep Pages

# Ou via Python
python3 -c "
import subprocess
result = subprocess.run(['file', 'exports/[slug].pdf'], capture_output=True, text=True)
print(result.stdout)
"
\`\`\`

### Checklist de verificação

\`\`\`
[ ] O PDF abre corretamente
[ ] A capa está presente (se solicitada)
[ ] Os números de páginas estão corretos
[ ] O sumário é clicável
[ ] Os links internos funcionam
[ ] Os links externos funcionam
[ ] Os blocos coloridos (value/tools/recap) estão visíveis
[ ] O texto está legível (não cortado, não muito pequeno)
[ ] As imagens estão nítidas (se aplicável)
[ ] O arquivo pesa < 10 MB (senão otimizar)
\`\`\`

---

## Etapa 6 — Entrega

\`\`\`
PDF EXPORTADO

Arquivo   : exports/[slug].pdf
Formato   : [A4 / Letter / Ebook 6×9]
Páginas   : [N]
Tamanho   : [X] MB
Capa      : [Sim/Não]
TOC       : [Clicável/Não]
Numeração : [Sim/Não]

PRÓXIMOS PASSOS:
  → Upload no Hotmart/Kiwify para a venda
  → /dp-landing-page      — Criar a página de vendas
  → /dp-ebook-cover       — Criar um mockup 3D da capa
  → /dp-email-sequence    — Sequência de lançamento
  → /dp-ad-angles-meta    — Campanha de anúncios Facebook/Instagram
\`\`\`

---

## Otimização do PDF

### Se o arquivo estiver muito pesado (> 5 MB)

\`\`\`bash
# Comprimir com Ghostscript (se instalado)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \\
   -dPDFSETTINGS=/ebook \\
   -dNOPAUSE -dBATCH -dQUIET \\
   -sOutputFile="exports/[slug]-optimized.pdf" \\
   "exports/[slug].pdf"
\`\`\`

| Setting | Qualidade | Tamanho | Uso |
|---------|-----------|---------|-----|
| \`/screen\` | 72 dpi | Mínimo | Preview online |
| \`/ebook\` | 150 dpi | Bom | Distribuição digital (recomendado) |
| \`/printer\` | 300 dpi | Alto | Impressão profissional |
| \`/prepress\` | 300+ dpi | Máximo | Impressão alta qualidade |

### Formato Ebook (6×9 polegadas)

Para um formato livro clássico:

\`\`\`javascript
// Puppeteer
await page.pdf({
  width: '6in',
  height: '9in',
  margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' }
});
\`\`\`

\`\`\`bash
# wkhtmltopdf
wkhtmltopdf --page-width 152.4mm --page-height 228.6mm ...
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Pelo menos 1 ferramenta de conversão instalada e funcional | Critical |
| QG-02 | O arquivo HTML fonte existe e é válido | Critical |
| QG-03 | O PDF abre sem erro | Critical |
| QG-04 | O tamanho do PDF é < 10 MB | High |
| QG-05 | Os links do TOC são clicáveis | High |
| QG-06 | As cores dos blocos estão preservadas (print-color-adjust) | Medium |
| QG-07 | Sem texto cortado no final da página | High |
| QG-08 | Os números de página estão corretos | Medium |
| QG-09 | A capa usa as cores de marca | Medium |
| QG-10 | A pasta exports/ é criada se não existir | Low |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Nenhuma ferramenta PDF instalada | Guiar a instalação (Puppeteer ou wkhtmltopdf) |
| Nenhuma ferramenta técnica instalada | Usar o Método 0 (navegador). Abrir o HTML no Chrome → Ctrl+P → Salvar como PDF. Marcar "Gráficos de fundo". |
| Arquivo HTML não encontrado | Listar os arquivos disponíveis em ebook pt/, ebook en/, blog/ |
| Fonts Google não carregadas | Adicionar um delay (\`waitUntil: 'networkidle0'\`) ou baixar a fonte localmente |
| Cores não impressas | Verificar \`-webkit-print-color-adjust: exact\` no CSS |
| PDF muito pesado | Propor a compressão com Ghostscript |
| Links quebrados no PDF | Verificar as âncoras HTML (# → IDs existentes) |
| Página em branco extra | Verificar os \`page-break-before: always\` em excesso no CSS |
| Texto cortado entre páginas | Adicionar \`page-break-inside: avoid\` nas seções afetadas |
| Timeout de conversão | Aumentar o timeout, verificar que o HTML não está muito pesado |
| wkhtmltopdf não suporta CSS moderno | Migrar para Puppeteer/Playwright |

---

## Integração com Outros Skills

| Antes | Skill | Quando |
|-------|-------|--------|
| Criar o ebook | \`/dp-playbook-create\` | O HTML deve existir |
| Auditar o ebook | \`/dp-playbook-audit\` | Verificar a qualidade antes do export |
| Criar a capa | \`/dp-ebook-cover\` | Para ter a imagem de capa |
| Perfil de negócio | \`/dp-business-profile\` | Para as cores e o logo |

| Depois | Skill | Quando |
|--------|-------|--------|
| Página de vendas | \`/dp-landing-page\` | Para vender o PDF |
| Publicação | \`/dp-product-listing\` | Para preparar o upload |
| Sequência de email | \`/dp-email-sequence\` | Para o lançamento |
| Publicidade | \`/dp-ad-angles-meta\` \`/dp-ad-angles-google\` | Para a aquisição |

---

# Referência — Troubleshooting CSS de Impressão

> Referência para o skill \`/dp-export-pdf\`
> Produto exemplo: **O Playbook do Coach Fitness** (R$ 197)

---

## Problema 1 — As cores de fundo não imprimem

**Sintoma**: Os blocos \`value-block\`, \`tools-block\` e \`recap-block\` aparecem brancos no PDF enquanto têm um fundo colorido na tela.

**Causa**: Por padrão, os navegadores não imprimem as cores de fundo para economizar tinta.

**Solução**:

\`\`\`css
@media print {
  .value-block,
  .tools-block,
  .recap-block {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: #f8f8f8 !important; /* Forçar o fundo */
  }

  .value-block { border-left: 3pt solid var(--accent); }
  .tools-block { border-left: 3pt solid #3b82f6; }
  .recap-block { border-left: 3pt solid #eab308; }
}
\`\`\`

**Nota Puppeteer**: Adicionar \`printBackground: true\` nas opções \`page.pdf()\`.

---

## Problema 2 — Os saltos de página cortam os blocos ao meio

**Sintoma**: Um \`recap-block\` ou \`value-block\` começa no final de uma página e termina no início da seguinte. O conteúdo fica ilegível.

**Causa**: Sem regras \`page-break\` definidas para os blocos importantes.

**Solução**:

\`\`\`css
@media print {
  /* Evitar cortes nos blocos */
  .value-block,
  .tools-block,
  .recap-block,
  .section {
    page-break-inside: avoid;
  }

  /* Cada seção h2 começa em uma nova página */
  h2 {
    page-break-before: always;
    page-break-after: avoid;
  }

  /* Exceto o primeiro h2 (sem página em branco no início) */
  h2:first-of-type {
    page-break-before: avoid;
  }

  /* Um h3 não deve ficar sozinho no final da página */
  h3 {
    page-break-after: avoid;
  }
}
\`\`\`

---

## Problema 3 — As imagens transbordam da página

**Sintoma**: Uma imagem grande ultrapassa a margem direita ou é cortada no PDF.

**Causa**: A imagem tem uma largura fixa em pixels que excede a largura da área imprimível.

**Solução**:

\`\`\`css
@media print {
  img {
    max-width: 100%;
    height: auto;
    page-break-inside: avoid;
  }

  /* Se a imagem estiver em um container flex ou grid */
  figure,
  .image-container {
    max-width: 100%;
    page-break-inside: avoid;
  }
}
\`\`\`

**Conselho**: Para os ebooks DP Criador, evitar imagens (o design se baseia no texto e nos blocos CSS). Se uma imagem for indispensável, dimensioná-la em \`%\` ou em \`rem\`, nunca em \`px\` fixos.

---

## Problema 4 — O render das fontes é diferente no PDF

**Sintoma**: O texto aparece mais fino, mais grosso, ou em uma fonte diferente do que se vê na tela.

**Causa**: A Google Font não está carregada no momento da conversão PDF (problema de timing de rede) ou a fonte de fallback está sendo usada.

**Solução**:

\`\`\`css
/* Usar uma stack de fontes confiável com fallback */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, sans-serif;
}
\`\`\`

**Solução Puppeteer**:

\`\`\`javascript
// Aguardar que todos os recursos (incluindo as fonts) estejam carregados
await page.goto(\`file://\${filePath}\`, {
  waitUntil: 'networkidle0',
  timeout: 30000
});

// Aguardar um curto delay adicional para o render das fonts
await page.evaluate(() => document.fonts.ready);
\`\`\`

**Alternativa**: Baixar o arquivo \`.woff2\` da fonte e embutí-la em base64 no CSS para eliminar qualquer dependência de rede.

---

## Problema 5 — O header/footer sobrepõe o conteúdo

**Sintoma**: O header ("Academia FitPro — O Playbook do Coach Fitness") ou o footer ("Página 3 / 47") sobrepõe a primeira ou última linha de conteúdo de uma página.

**Causa**: As margens não são grandes o suficiente para acomodar o header/footer.

**Solução Puppeteer**:

\`\`\`javascript
await page.pdf({
  displayHeaderFooter: true,
  headerTemplate: \`
    <div style="font-size: 8pt; color: #999;
                width: 100%; text-align: center;
                padding: 5px 0;">
      Academia FitPro — O Playbook do Coach Fitness
    </div>
  \`,
  footerTemplate: \`
    <div style="font-size: 8pt; color: #999;
                width: 100%; text-align: center;
                padding: 5px 0;">
      Página <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>
  \`,
  margin: {
    top: '25mm',    /* Aumentar se o header sobrepõe */
    bottom: '25mm', /* Aumentar se o footer sobrepõe */
    left: '15mm',
    right: '15mm'
  }
});
\`\`\`

**Solução wkhtmltopdf**:

\`\`\`bash
wkhtmltopdf \\
  --margin-top 25mm \\
  --margin-bottom 25mm \\
  --header-spacing 10 \\
  --footer-spacing 10 \\
  ...
\`\`\`

---

## Problema 6 — As tabelas são cortadas entre duas páginas

**Sintoma**: Uma tabela começa em uma página e a linha seguinte aparece na página seguinte, sem cabeçalhos de colunas repetidos. O leitor perde o contexto.

**Causa**: Os navegadores não gerenciam bem a paginação de tabelas por padrão.

**Solução**:

\`\`\`css
@media print {
  /* Evitar o corte em tabelas pequenas */
  table {
    page-break-inside: avoid;
  }

  /* Para tabelas grandes: repetir os cabeçalhos */
  thead {
    display: table-header-group;
  }

  /* Evitar o corte no meio de uma linha */
  tr {
    page-break-inside: avoid;
  }

  /* Se a tabela for grande demais para uma página,
     aceitar o corte mas forçar a repetição do thead */
  table.allow-split {
    page-break-inside: auto;
  }
}
\`\`\`

**Conselho**: Nos playbooks DP Criador, preferir as listas (\`<ul>\`, \`<ol>\`) às tabelas quando possível. As listas se paginem muito melhor.

---

## Checklist Rápido Antes do Export

\`\`\`
[ ] @media print está presente no <style>
[ ] print-color-adjust: exact em todos os blocos coloridos
[ ] page-break-inside: avoid em value-block, tools-block, recap-block
[ ] page-break-before: always nos h2 (exceto o primeiro)
[ ] page-break-after: avoid nos h2 e h3
[ ] img { max-width: 100%; height: auto; }
[ ] Margens suficientes para header/footer (25mm mín se ativados)
[ ] Stack de fontes com fallback (sem dependência única do Google Fonts)
[ ] thead { display: table-header-group; } para tabelas grandes
[ ] Testar com Puppeteer printBackground: true
\`\`\`

---

## Comando de Teste Rápido

\`\`\`bash
# Verificar que o CSS print está presente no arquivo HTML
grep -c '@media print' arquivo.html
# Esperado: >= 1

# Verificar que print-color-adjust está definido
grep -c 'print-color-adjust' arquivo.html
# Esperado: >= 1

# Verificar que page-break está definido
grep -c 'page-break' arquivo.html
# Esperado: >= 3
\`\`\``,
};

export default skill;
