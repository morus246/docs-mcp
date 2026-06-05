import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-landing-page",
  categoria: "Venda e Monetização",
  descricao: "Gerador de landing pages profissionais com Thank You page, Política de Privacidade e Termos integrados em modais. Responsivo, HTML standalone, CSS custom properties. Gera 2 arquivos: a landing page + a thank you page (slug único não adivinhável). Gatilhos: landing page, página de vendas, sales page, página de produto, criar página, squeeze page, thank you page.",
  argumentHint: "[produto] [url_destino] [idioma: pt|en]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Landing Page — Gerador de Páginas de Venda

<!-- v2.2.0 | 2026-04-18 | Adição: Thank You page (slug único), Política de Privacidade + Termos em modais popup, bilíngue PT/EN -->

Expert em conversão e web design para DP Criador. Gera **2 arquivos HTML**: a landing page de venda + a thank you page pós-compra. As páginas legais (Política de Privacidade, Termos de Uso) abrem em popup sem sair da página. Tudo bilíngue (PT ou EN conforme o projeto).

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-landing-page [produto]\` | Criar landing page + thank you page (guiado) |
| \`/dp-landing-page express [produto]\` | Modo rápido — 5 perguntas e geração |
| \`/dp-landing-page lead-magnet [produto]\` | Versão captura de emails (sem preço) |
| \`/dp-landing-page from [arquivo]\` | Gerar a partir de conteúdo ou playbook existente |
| \`/dp-landing-page thank-you [landing.html]\` | Criar uma thank you page para uma landing existente |

## Formato do Entregável

\`\`\`
ENTREGÁVEIS (2 arquivos):
│
├── 1. Landing Page: landing-pages/[product-slug].html
│   ├── CSS embutido com custom properties
│   ├── Design responsivo (mobile-first)
│   ├── SEO meta tags + Open Graph
│   ├── Seções: Hero → Trust → Promessas → Detalhes → FAQ → CTA → Footer
│   ├── Footer: Política de Privacidade + Termos em modais popup (sem sair da página)
│   ├── Todos os CTAs apontam para a mesma URL de destino
│   └── Zero dependência JS (exceto modais leves)
│
├── 2. Thank You Page: landing-pages/ty-[hash-único].html
│   ├── Mesmo design system (cores, tipografia, estilo)
│   ├── Mensagem de agradecimento + confirmação
│   ├── Link de download (opcional)
│   ├── Slug único não adivinhável (hash aleatório)
│   └── Não indexável (meta robots noindex)
│
└── Bilíngue: conteúdo PT ou EN conforme a língua do projeto
\`\`\`

---

## Processo

\`\`\`
1. Context intake      → Coletar produto, brand identity, conteúdo (OBRIGATÓRIO)
2. Ler referências     → Carregar business-profile.md se disponível
   Ler references/copy-templates.md → para exemplos de copy por faixa de preço
3. Montar o card da página → Síntese validada pelo usuário
4. Gerar HTML          → Página completa com CSS custom properties
5. Quality check       → Responsivo, compliance, SEO, performance
6. Entregar            → Arquivo HTML + resumo + próximos passos
\`\`\`

---

## Etapa 1 — Context Intake (Obrigatório: Faça Isso Primeiro)

### 1a. Carregar o perfil de negócio (silencioso)

\`\`\`
SE business-profile.md existe na raiz do projeto:
  → Ler e extrair: nome, nicho, produto(s), audiência, tom, cores, logo
  → NÃO repetir as perguntas já cobertas pelo perfil

SENÃO:
  → Continuar sem. As perguntas do intake cobrem o mínimo.
\`\`\`

### 1b. Fazer as perguntas em blocos

**Regra absoluta**: NUNCA fazer todas as perguntas de uma vez. Agrupar por 2-3, aguardar as respostas, depois continuar.

#### Bloco 1 — O produto (fazer primeiro)

| # | Pergunta | Por que |
|---|----------|---------|
| Q1 | Qual produto ou serviço você quer vender nessa página? Nome + descrição curta. | Define o conteúdo |
| Q2 | Qual é o preço? (ou "gratuito" se lead magnet) | Hero + CTA |
| Q3 | Qual é a URL de destino do botão CTA? (Hotmart, Kiwify, Eduzz, Calendly, outro link) | Todos os botões CTA apontam para lá |

**Após as respostas**: Reformular. "Página de venda para [X] a [preço], CTA para [URL]. Correto?"

**Hard gate**: NÃO continuar sem ao mínimo o nome do produto e a URL de destino.

#### Bloco 2 — A identidade visual (OBRIGATÓRIO)

| # | Pergunta | Por que |
|---|----------|---------|
| Q4 | Qual é a sua **cor primária**? (hex, ex: \`#059669\`, ou nome como "verde esmeralda") | CSS \`--primary\` |
| Q5 | Qual é a sua **cor de destaque**? (hex, ex: \`#10b981\`, ou nome como "verde claro") | CSS \`--accent\` |
| Q6 | Qual **estilo visual**? \`minimalista\` (clean, muito espaço branco) / \`bold\` (contrastes fortes, cores vivas) / \`premium\` (sóbrio, tons escuros, elegante) / \`warm\` (tons quentes, acolhedor) | Clima CSS global |

> **Se o usuário não tiver cores**: Propor 3 paletas adaptadas ao nicho:
> - Cada paleta = cor primária + cor de destaque
> - Mostrar preview: "Paleta 1: Azul profundo (#1e3a5f) + Dourado (#d4a853) — estilo premium/confiança"
> - Pedir para escolher ou combinar

**Após as respostas**: Registrar as escolhas visuais. Elas serão aplicadas às CSS custom properties.

#### Bloco 3 — O conteúdo

| # | Pergunta | Por que |
|---|----------|---------|
| Q7 | Você tem imagens do produto? (URLs ou arquivos locais — 1 a 3 no máximo) | Hero e seções de detalhes |
| Q8 | Quais são os 3-4 benefícios principais do seu produto? | Seção de Promessas |
| Q9 | Você tem depoimentos, resultados ou números de credibilidade? | Trust bar + prova social |

**Após as respostas**: Síntese de conteúdo.

#### Bloco 4 — Idioma e Thank You Page

| # | Pergunta | Por que |
|---|----------|---------|
| Q10 | **Qual idioma** para a página? \`pt\` (português) ou \`en\` (inglês) | Texto das modais legais, labels, footer |
| Q11 | Para a **Thank You Page**: você quer adicionar um **link de download**? Se sim, dê a URL do arquivo (PDF, ZIP…). Se não, a página exibirá apenas a confirmação. | Página pós-compra |

**Após as respostas**: Registrar idioma e opções da thank you page.

#### Bloco 5 — FAQ e SEO

| # | Pergunta | Por que |
|---|----------|---------|
| Q12 | Quais são as 3-5 perguntas que seus clientes mais fazem? | Seção FAQ |
| Q13 | Você tem um título SEO em mente? E uma meta description? (senão eu gero) | Meta tags |

**Após as respostas**: Partir para a geração.

---

## Etapa 2 — Design System (CSS Custom Properties)

### Variáveis CSS obrigatórias

Todas as cores e estilos passam por CSS custom properties. NUNCA cores hardcoded nos componentes.

\`\`\`css
:root {
  /* Cores da marca — vêm do context intake */
  --primary: [primary_color do Q4];
  --accent: [accent_color do Q5];

  /* Cores derivadas automaticamente */
  --primary-light: [primary + transparência 10%];
  --primary-dark: [primary escurecido 20%];
  --accent-light: [accent + transparência 10%];

  /* Cores do sistema */
  --text: #1a1a1a;
  --muted: #666666;
  --bg: #ffffff;
  --surface: #f9fafb;
  --border: #e5e7eb;

  /* Layout */
  --radius: 12px;
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
  --max-width: 720px;
}
\`\`\`

### Estilos por clima visual

| Estilo | Modificações CSS |
|--------|-----------------|
| \`minimalista\` | \`--bg: #ffffff\`, \`--surface: #fafafa\`, sombras muito leves, muito espaço branco, \`--radius: 8px\` |
| \`bold\` | Contrastes fortes, \`--bg: #ffffff\`, botões maiores, títulos maiores, \`--radius: 16px\`, sombras marcadas |
| \`premium\` | \`--bg: #0a0a0a\`, \`--text: #f5f5f5\`, \`--surface: #1a1a1a\`, \`--muted: #999\`, fundo escuro, tipografia elegante |
| \`warm\` | \`--bg: #fffbf5\`, \`--surface: #fff5eb\`, \`--border: #f0d9b5\`, tons quentes, \`--radius: 16px\`, sombras suaves |

### Tipografia
- Font: \`'Inter', system-ui, -apple-system, sans-serif\` (Google Fonts import para Inter)
- Body: 16px, line-height 1.6
- H1: 2.5rem (mobile: 1.75rem)
- H2: 1.75rem (mobile: 1.35rem)
- H3: 1.2rem

### Breakpoints Responsivos
- Mobile: < 640px (1 coluna, touch targets largos)
- Tablet: 640-1024px (2 colunas se aplicável)
- Desktop: > 1024px (layout completo)

---

## Etapa 3 — Estrutura da Página (ordem obrigatória)

### 1. Hero / Header

\`\`\`html
<section class="hero">
  <!-- Imagem(ns) do produto se fornecidas -->
  <h1>[product_name]</h1>
  <p class="subtitle">[product_description]</p>
  <div class="price">[product_price]</div>
  <a href="[destination_url]" class="cta-button">[cta_button_text]</a>
</section>
\`\`\`

Design:
- Full-width, padding generoso
- Título grande e bold
- Preço exibido com \`var(--primary)\`
- CTA: \`background: var(--primary)\`, texto branco, arredondado, animação hover
- Sem imagens: gradient derivado de \`var(--primary)\` + \`var(--accent)\`

### 2. Trust Bar

\`\`\`html
<section class="trust-bar">
  <div class="badge"><span class="icon">[icon]</span><span>[text]</span></div>
  <!-- 3-5 badges -->
</section>
\`\`\`

Design: Faixa horizontal, fundo claro, flex + wrap mobile, ícones + texto curto

### 3. Promessas

\`\`\`html
<section class="promises">
  <h2>O que você obtém</h2>
  <div class="promise-grid">
    <div class="promise-card">
      <span class="promise-icon">[emoji]</span>
      <h3>[title]</h3>
      <p>[description]</p>
    </div>
    <!-- 2-4 cards -->
  </div>
</section>
\`\`\`

Design: Grade 2 colunas desktop / 1 coluna mobile, cards brancos com sombra sutil, \`var(--accent)\` para ícones

### 4. Detalhes e Características

\`\`\`html
<section class="details">
  <div class="detail-block">
    <img src="[image_url]" alt="[title]">
    <div class="detail-content">
      <h3>[title]</h3>
      <ul><li>[point]</li></ul>
    </div>
  </div>
  <!-- Alternar imagem esquerda/direita -->
</section>
\`\`\`

Design: Layout alternado, empilhado no mobile, parsear \`**bold**\` em \`<strong>\`, sem imagens = blocos de texto full-width

### 5. Info Cards (opcional)

\`\`\`html
<section class="info-cards">
  <div class="info-card info-card--green"><h4>[title]</h4><p>[text]</p></div>
  <!-- Tipos: green (positivo), red (negativo), blue (info), amber (atenção) -->
</section>
\`\`\`

### 6. FAQ

\`\`\`html
<section class="faq">
  <h2>Perguntas frequentes</h2>
  <div class="faq-list">
    <details class="faq-item"><summary>[question]</summary><p>[answer]</p></details>
  </div>
</section>
\`\`\`

Design: Accordion nativo \`<details>/<summary>\`, sem JS, animação CSS

### 7. Call to Action (meio da página)

\`\`\`html
<section class="cta-section">
  <h2>[cta_title]</h2>
  <p>[cta_subtitle]</p>
  <a href="[destination_url]" class="cta-button">[cta_button_text]</a>
</section>
\`\`\`

### Modo Lead Magnet (página de captura de email)

Se o modo \`lead-magnet\` for escolhido, adaptar a página:
- **Hero**: Gancho + promessa do lead magnet gratuito (sem preço)
- **CTA**: "Baixar gratuitamente" / "Receber o guia" em vez de "Comprar"
- **Formulário**: Campo email + botão (link para Brevo, MailerLite, etc.)
- **Sem seção de preço** — substituir pelos benefícios do lead magnet
- **Prova social**: "Já [N] downloads" em vez de "Já [N] clientes"
- **Footer CTA**: Lembrete de que é gratuito + urgência suave ("vagas limitadas" ou "edição limitada")

### 8. Footer (com links legais em modais)

\`\`\`html
<footer class="footer footer--dark">
  <h2>[footer_title]</h2>
  <p>[footer_subtitle]</p>
  <a href="[destination_url]" class="cta-button">[cta_button_text]</a>
  <div class="footer-legal">
    <p class="copyright">&copy; [year] [brand_name]. Todos os direitos reservados.</p>
    <nav class="legal-links">
      <!-- PT -->
      <a href="#" onclick="document.getElementById('modal-privacy').showModal(); return false;">Política de Privacidade</a>
      <span class="separator">|</span>
      <a href="#" onclick="document.getElementById('modal-terms').showModal(); return false;">Termos de Uso</a>
      <!-- EN -->
      <!-- <a href="#" onclick="document.getElementById('modal-privacy').showModal(); return false;">Privacy Policy</a> -->
      <!-- <span class="separator">|</span> -->
      <!-- <a href="#" onclick="document.getElementById('modal-terms').showModal(); return false;">Terms & Conditions</a> -->
    </nav>
  </div>
</footer>
\`\`\`

**Regras**:
- Usar labels PT se \`lang="pt"\`, EN se \`lang="en"\`
- Os links abrem modais \`<dialog>\`, NÃO novas páginas
- O visitante NUNCA sai da landing page

### 8b. Modais — Páginas Legais (Política de Privacidade + Termos)

Inserir as modais ANTES do fechamento de \`</body>\`:

\`\`\`html
<!-- === MODAL: POLÍTICA DE PRIVACIDADE === -->
<dialog id="modal-privacy" class="legal-modal">
  <div class="modal-content">
    <button class="modal-close" onclick="this.closest('dialog').close()">&times;</button>
    <!-- PT -->
    <h2>Política de Privacidade</h2>
    <!-- EN: <h2>Privacy Policy</h2> -->

    <p><strong>Última atualização:</strong> [data]</p>

    <h3>1. Coleta de dados</h3>
    <p>[brand_name] coleta os seguintes dados pessoais no ato da compra: nome, endereço de email, dados de pagamento (processados por [Hotmart/Kiwify/Eduzz — nunca armazenados em nossos servidores]). Esses dados são necessários para processar o pedido e entregar o produto digital.</p>

    <h3>2. Uso dos dados</h3>
    <p>Seus dados são usados para: entrega do produto comprado, envio de emails relacionados à sua compra, melhoria dos nossos serviços. Não vendemos nem compartilhamos seus dados com terceiros, exceto por obrigação legal.</p>

    <h3>3. Cookies</h3>
    <p>Este site usa cookies de análise de audiência (Google Analytics / Meta Pixel) e cookies funcionais. Você pode desativar os cookies nas configurações do seu navegador.</p>

    <h3>4. Seus direitos</h3>
    <p>De acordo com a LGPD, você tem direito de acesso, retificação, exclusão e portabilidade dos seus dados. Para exercer esses direitos: [email de contato].</p>

    <h3>5. Contato</h3>
    <p>Para qualquer dúvida: [email] — [brand_name], [endereço se aplicável].</p>
  </div>
</dialog>

<!-- === MODAL: TERMOS DE USO === -->
<dialog id="modal-terms" class="legal-modal">
  <div class="modal-content">
    <button class="modal-close" onclick="this.closest('dialog').close()">&times;</button>
    <!-- PT -->
    <h2>Termos de Uso</h2>
    <!-- EN: <h2>Terms & Conditions</h2> -->

    <p><strong>Última atualização:</strong> [data]</p>

    <h3>1. Objeto</h3>
    <p>Os presentes termos regem a venda do produto digital "[product_name]" por [brand_name].</p>

    <h3>2. Produto</h3>
    <p>O produto "[product_name]" é um [ebook/playbook/guia] no formato [PDF/HTML]. É entregue por download imediato após o pagamento. O conteúdo é fornecido no estado atual e não constitui conselho [profissional/médico/financeiro — adaptar conforme o nicho].</p>

    <h3>3. Preço e pagamento</h3>
    <p>O preço é de [preço]. O pagamento é seguro e processado por [Hotmart/Kiwify/Eduzz]. [brand_name] não armazena nenhum dado bancário.</p>

    <h3>4. Entrega</h3>
    <p>O produto é entregue imediatamente por email e/ou página de download após confirmação do pagamento. Em caso de problema na entrega, entrar em contato com [email].</p>

    <h3>5. Política de reembolso</h3>
    <p>De acordo com o Código de Defesa do Consumidor, [brand_name] oferece garantia de satisfação ou reembolso de [14/30] dias. Para qualquer solicitação: [email].</p>

    <h3>6. Propriedade intelectual</h3>
    <p>O conteúdo do produto é protegido por direitos autorais. A compra confere direito de uso pessoal e intransferível. Toda reprodução, revenda ou distribuição é proibida.</p>

    <h3>7. Responsabilidade</h3>
    <p>[brand_name] não garante resultados específicos. Os resultados dependem da aplicação individual do conteúdo. Os depoimentos apresentados não são representativos de todos os usuários.</p>

    <h3>8. Contato</h3>
    <p>[brand_name] — [email] — [endereço se aplicável].</p>
  </div>
</dialog>
\`\`\`

### CSS das modais (adicionar no \`<style>\`)

\`\`\`css
/* === Modais legais (Privacidade + Termos) === */
.legal-modal {
  border: none;
  border-radius: var(--radius);
  max-width: 680px;
  width: 90%;
  max-height: 80vh;
  padding: 0;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.legal-modal::backdrop {
  background: rgba(0,0,0,0.6);
}
.modal-content {
  padding: 2rem 2.5rem;
  overflow-y: auto;
  max-height: 80vh;
}
.modal-content h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--primary);
}
.modal-content h3 {
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}
.modal-content p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--muted);
  margin-bottom: 0.75rem;
}
.modal-close {
  position: sticky;
  top: 0;
  float: right;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--muted);
  padding: 0.5rem;
  line-height: 1;
  z-index: 10;
}
.modal-close:hover { color: var(--text); }

/* Links legais do footer */
.footer-legal { margin-top: 1.5rem; }
.legal-links { font-size: 0.8rem; margin-top: 0.5rem; }
.legal-links a { color: rgba(255,255,255,0.6); text-decoration: none; }
.legal-links a:hover { color: #fff; text-decoration: underline; }
.legal-links .separator { margin: 0 0.5rem; color: rgba(255,255,255,0.3); }

/* Se estilo premium (dark), adaptar as modais */
@media (prefers-color-scheme: dark) {
  .legal-modal { background: var(--surface, #1a1a1a); }
  .modal-content h2 { color: var(--accent); }
  .modal-content p { color: #ccc; }
}
\`\`\`

### Adaptação bilíngue das modais

| Elemento | Português (lang="pt") | Inglês (lang="en") |
|----------|----------------------|-------------------|
| Link footer 1 | "Política de Privacidade" | "Privacy Policy" |
| Link footer 2 | "Termos de Uso" | "Terms & Conditions" |
| Título modal 1 | "Política de Privacidade" | "Privacy Policy" |
| Título modal 2 | "Termos de Uso" | "Terms & Conditions" |
| Seções Privacidade | Coleta, Uso, Cookies, Direitos, Contato | Collection, Usage, Cookies, Your Rights, Contact |
| Seções Termos | Objeto, Produto, Preço, Entrega, Reembolso, PI, Responsabilidade, Contato | Purpose, Product, Price, Delivery, Refund Policy, IP, Liability, Contact |
| Fechar | &times; (universal) | &times; (universal) |

**Regra**: Usar o idioma definido em Q10 (ou detectado pelo \`<html lang="...">\`). NUNCA misturar idiomas numa mesma modal.

---

### 9. Thank You Page (gerada automaticamente)

A thank you page é um **arquivo HTML separado** com:
- O mesmo design system (cores, tipografia, estilo)
- Um **slug único não adivinhável** (hash aleatório)
- Uma meta \`noindex\` (não indexável pelo Google)

#### Geração do slug único

\`\`\`bash
# Gerar um hash aleatório de 12 caracteres
HASH=\$(openssl rand -hex 6)
# Resultado: ty-a3f7b2c91e04.html
FILENAME="ty-\${HASH}.html"
\`\`\`

O arquivo é salvo em \`landing-pages/ty-[hash].html\`.

#### Estrutura da Thank You Page

\`\`\`html
<!DOCTYPE html>
<html lang="[pt/en]">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Obrigado — [product_name]</title>
  <!-- EN: <title>Thank You — [product_name]</title> -->
  <style>
    /* MESMO CSS da landing page (copiar integralmente) */
  </style>
</head>
<body>
  <main class="thank-you">

    <!-- Seção 1: Confirmação -->
    <section class="hero thank-you-hero">
      <div class="checkmark">✓</div>
      <!-- PT -->
      <h1>Obrigado pela sua compra!</h1>
      <p class="subtitle">Seu acesso a "[product_name]" está confirmado.</p>
      <!-- EN -->
      <!-- <h1>Thank you for your purchase!</h1> -->
      <!-- <p class="subtitle">Your access to "[product_name]" is confirmed.</p> -->
    </section>

    <!-- Seção 2: Download (se link fornecido) -->
    <!-- CONDICIONAL: exibir somente se Q11 tiver link de download -->
    <section class="download-section">
      <!-- PT -->
      <h2>Baixe seu [ebook/playbook/guia]</h2>
      <p>Clique no botão abaixo para baixar seu arquivo. Você também receberá um email de confirmação com o link.</p>
      <a href="[download_url]" class="cta-button download-button">Baixar agora</a>
      <!-- EN -->
      <!-- <h2>Download your [ebook/playbook/guide]</h2> -->
      <!-- <p>Click the button below to download your file. You'll also receive a confirmation email with the link.</p> -->
      <!-- <a href="[download_url]" class="cta-button download-button">Download Now</a> -->
    </section>

    <!-- Seção 3: Próximos passos -->
    <section class="next-steps">
      <!-- PT -->
      <h2>E agora?</h2>
      <div class="steps-list">
        <div class="step">
          <span class="step-number">1</span>
          <div>
            <h3>Abra seu [ebook/playbook]</h3>
            <p>Leia a seção "Leia isso primeiro" para saber por onde começar.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div>
            <h3>Aplique ainda hoje</h3>
            <p>Comece pela primeira ação da Seção 1. Não amanhã — agora.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div>
            <h3>Precisa de ajuda?</h3>
            <p>Responda ao email de confirmação. Lemos tudo.</p>
          </div>
        </div>
      </div>
      <!-- EN: adaptar os textos -->
    </section>

    <!-- Seção 4: Prova social / compartilhamento (opcional) -->
    <section class="share-section">
      <!-- PT -->
      <p>Conhece alguém que precisa disso? Compartilhe:</p>
      <!-- EN: <p>Know someone who needs this? Share:</p> -->
      <div class="share-buttons">
        <a href="https://twitter.com/intent/tweet?text=[encoded_text]&url=[landing_page_url]" target="_blank" class="share-btn">Twitter</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=[landing_page_url]" target="_blank" class="share-btn">LinkedIn</a>
      </div>
    </section>

  </main>

  <!-- Footer idêntico à landing page -->
  <footer class="footer footer--dark">
    <p class="copyright">&copy; [year] [brand_name]</p>
    <nav class="legal-links">
      <a href="#" onclick="document.getElementById('modal-privacy').showModal(); return false;">[Política de Privacidade / Privacy Policy]</a>
      <span class="separator">|</span>
      <a href="#" onclick="document.getElementById('modal-terms').showModal(); return false;">[Termos / Terms]</a>
    </nav>
  </footer>

  <!-- Mesmas modais legais da landing page -->
  <!-- COPIAR os <dialog> modal-privacy e modal-terms da landing page -->

</body>
</html>
\`\`\`

#### CSS específico da Thank You Page (adicionar ao estilo existente)

\`\`\`css
/* Thank You Page */
.thank-you-hero { text-align: center; padding: 4rem 2rem; }
.checkmark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px; height: 80px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.download-section {
  text-align: center;
  padding: 2rem;
  background: var(--surface);
  border-radius: var(--radius);
  margin: 2rem auto;
  max-width: 500px;
}
.download-button { margin-top: 1rem; }
.next-steps { max-width: 600px; margin: 3rem auto; }
.step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.share-section { text-align: center; padding: 2rem; }
.share-buttons { display: flex; gap: 0.75rem; justify-content: center; margin-top: 1rem; }
.share-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 50px;
  text-decoration: none;
  color: var(--text);
  font-size: 0.85rem;
  transition: background 0.2s;
}
.share-btn:hover { background: var(--surface); }
\`\`\`

### 10. SEO (no \`<head>\`)

**Regra**: Apenas a landing page é indexável. A thank you page tem \`noindex\`.

\`\`\`html
<!-- Landing Page <head> -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[seo_title]</title>
  <meta name="description" content="[seo_description]">
  <meta property="og:title" content="[seo_title]">
  <meta property="og:description" content="[seo_description]">
  <meta property="og:type" content="product">
  <meta property="og:image" content="[primeira product_image ou vazio]">
  <meta name="twitter:card" content="summary_large_image">
</head>

<!-- Thank You Page <head> -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Obrigado — [product_name]</title>
</head>
\`\`\`

---

## Estilo do Botão CTA (obrigatório)

\`\`\`css
.cta-button {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
}
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  background: var(--primary-dark);
}
\`\`\`

---

## Quality Gates

| ID | Gate | Severidade |
|----|------|------------|
| QG-01 | Nenhum placeholder [TODO], [INSERT], Lorem ipsum | Crítico |
| QG-02 | CSS embutido — nenhum arquivo externo (exceto Google Fonts) | Crítico |
| QG-03 | Todos os botões CTA apontam para a MESMA destination_url | Crítico |
| QG-04 | Todas as cores usam \`var(--primary)\`, \`var(--accent)\` — nunca hex hardcoded | Crítico |
| QG-05 | Página responsiva e profissional no mobile | Crítico |
| QG-06 | Sem texto placeholder — se falta conteúdo, gerar a partir do contexto do produto | Crítico |
| QG-07 | Meta tags SEO completas (title, description, OG tags) | Alto |
| QG-08 | HTML válido (tags fechadas, estrutura correta) | Crítico |
| QG-09 | **Política de Privacidade E Termos de Uso** presentes em modais \`<dialog>\` no footer | Crítico |
| QG-10 | **As modais legais estão no MESMO idioma** que a página (sem misturar PT/EN) | Crítico |
| QG-11 | **Thank You Page** gerada com slug único (\`ty-[hash].html\`) e \`noindex\` | Crítico |
| QG-12 | Thank You Page usa o **mesmo design system** (cores, tipografia, estilo) | Alto |
| QG-13 | Atributo \`lang\` correto no \`<html>\` (landing E thank you) | Alto |
| QG-14 | O estilo visual escolhido (minimalista/bold/premium/warm) corretamente aplicado às 2 páginas | Alto |
| QG-15 | O slug da thank you page é **não adivinhável** (hash aleatório, não o nome do produto) | Alto |
| QG-16 | As modais fecham com o botão ✕ e com clique fora (backdrop) | Médio |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| Sem nome de produto | Perguntar: "Qual produto você quer vender?" — não continuar sem |
| Sem URL de destino | Perguntar: "Para onde o botão CTA deve redirecionar?" — não continuar sem |
| Sem cores fornecidas | Propor 3 paletas adaptadas ao nicho, pedir para escolher |
| Sem imagens | Usar um hero gradient (\`var(--primary)\` → \`var(--accent)\`), sem imagem placeholder |
| Sem FAQ | Gerar 5 FAQ pertinentes a partir do contexto do produto |
| Sem trust badges | Gerar 3 badges genéricos (ex: "Acesso imediato", "Satisfeito ou reembolsado", "Suporte por email") |
| Produto gratuito (lead magnet) | Adaptar: sem preço exibido, CTA = "Baixar gratuitamente", adicionar campo email se possível |
| business-profile.md ausente | Continuar com as respostas do context intake apenas |
| Conteúdo muito curto | Completar com conteúdo gerado a partir da descrição do produto |
| Estilo "premium" solicitado | Mudar todo o design para dark mode via CSS custom properties |
| Idioma não especificado | Detectar pelo business-profile.md ou perguntar. Padrão: PT |
| Sem link de download para a thank you page | Exibir a confirmação sem botão de download |
| Usuário quer thank you page para landing existente | Ler o HTML da landing existente, extrair cores e conteúdo, gerar thank you page coerente |
| Modais \`<dialog>\` não suportadas pelo navegador | Adicionar polyfill CSS mínimo: \`dialog[open] { display: block; }\` para navegadores antigos |

---

## Integração com Outros Skills

| Antes da landing-page | Skill anterior | Quando |
|-----------------------|----------------|--------|
| Produto criado | \`/dp-playbook-create\` | Se está vendendo um ebook / playbook |
| Funnel desenhado | \`/dp-sales-funnel\` | Para conhecer o papel da página no funil |
| Perfil de negócio | \`business-profile.md\` | Para cores e informações da marca |

| Após a landing-page | Skill seguinte | Quando |
|---------------------|----------------|--------|
| Anúncio Meta | \`/dp-ad-angles-meta\` | Para gerar os anúncios que apontam para a página |
| Anúncio Google | \`/dp-ad-angles-google\` | Para campanhas Search + Display |
| Sequência de email | \`/dp-email-sequence\` | Para enviar tráfego de email para a página |
| Conteúdo social | \`/dp-social-caption\` \`/dp-mediaplan\` | Para promoção orgânica |
| Lead magnet | \`/lead-magnet-create\` | Se a página é um lead magnet, criar o conteúdo |

---

# Templates de Copy Landing Page — 3 Faixas de Preço

> **Universo:** Academia FitPro
> **Nicho:** Coaching fitness
> **Audiência:** Coaches fitness iniciantes
> **Voz:** Direta, motivadora, sem enrolação, segunda pessoa
> **Cores:** #059669 (primária) / #10b981 (destaque)

---

## FAIXA 1 — R$ 57: Pequeno Guia

**Produto:** "Os 7 Erros Fatais do Coach Fitness Iniciante"

---

### Hero

**Headline:**
Você provavelmente comete 5 desses 7 erros. E eles custam clientes toda semana.

**Subtitle:**
O mini-guia que te poupa 6 meses de dificuldades e muito dinheiro perdido. 47 páginas. Zero enrolação. Só conteúdo concreto testado em +200 coaches.

**Botão CTA:**
Baixar o guia — R$ 57

---

### Trust Badges

1. **+200 coaches** já leram este guia
2. **Satisfeito ou reembolsado** em 14 dias, sem condições
3. **Acesso imediato** — download em 30 segundos após o pagamento

---

### Promise Cards

**Card 1**
Emoji: 🎯
**Título:** Pare de coachear de graça
Descubra por que "faço sessões de teste gratuitas" é a pior estratégia para um iniciante — e o que fazer no lugar.

**Card 2**
Emoji: 📈
**Título:** Encontre seu primeiro cliente esta semana
O script exato (copiar e colar) que gerou +150 chamadas de descoberta para coaches iniciantes sem audiência.

**Card 3**
Emoji: 💡
**Título:** Defina um preço que não afasta ninguém
A fórmula em 3 etapas para calcular um valor que seus clientes aceitam e que permite você viver bem.

---

### FAQ

**Q1: É mais um guia genérico sobre coaching?**
Não. Cada erro é ilustrado por um caso real (anonimizado) com os números antes/depois. Você verá exatamente quanto cada erro custa em clientes perdidos e dinheiro não ganho.

**Q2: Sou um iniciante de verdade, é adequado para mim?**
Foi feito para você. Este guia foi escrito especificamente para coaches com 0 a 10 clientes. Se você já tem 50 clientes, provavelmente já conhece tudo isso.

**Q3: É um PDF ou uma formação em vídeo?**
Um PDF de 47 páginas. Sem vídeos de 4 horas. Você lê em 45 minutos e aplica na sequência. Ação, não procrastinação.

**Q4: E se não me trouxer nada?**
Mande um email nos 14 dias e eu reembolso. Sem formulário, sem justificativa. Um email, um reembolso.

**Q5: O que recebo exatamente após a compra?**
Um email com seu link de download em menos de 2 minutos. O PDF funciona em celular, tablet e computador.

---

### Footer CTA

**Headline:** R$ 57 para evitar 6 meses de erros.
**Subtitle:** O preço de um shake de proteína. Só que esse pode mudar sua carreira.
**Botão:** Baixar agora — R$ 57

---
---

## FAIXA 2 — R$ 197: O Playbook do Coach Fitness (produto principal)

**Produto:** "O Playbook do Coach Fitness — Do zero a 10 clientes em 30 dias"

---

### Hero

**Headline:**
O plano de ação completo para fechar seus 10 primeiros clientes em coaching fitness. Sem anúncio. Sem audiência. Sem enrolação.

**Subtitle:**
147 páginas de estratégias testadas em +300 coaches iniciantes. Scripts, templates, checklists — está tudo aqui. Você abre, aplica, fecha.

**Exibição de Preço:**
R$ 197 — pagamento único, acesso vitalício

**Botão CTA:**
Obter o Playbook — R$ 197

---

### Trust Badges

1. **+300 coaches** já usam o Playbook
2. **Resultados em 30 dias** ou reembolso, sem discussão
3. **Atualizações gratuitas** vitalícias
4. **Suporte por email** — resposta em até 24h

---

### Promise Cards

**Card 1**
Emoji: 🔍
**Título:** Encontre prospects sem anúncio
O método completo para identificar 50 prospects qualificados em 2 horas, de graça, com só o seu celular e as redes sociais.

**Card 2**
Emoji: 💬
**Título:** Scripts de DM que convertem
4 scripts de prospecção testados em +300 mensagens com taxa de conversão de 15-20%. Você copia, adapta 3 palavras, envia.

**Card 3**
Emoji: 💰
**Título:** Um pricing que te sustenta
A fórmula exata para definir um valor de lançamento atrativo sem desvalorizar seu trabalho. Com plano de aumento de preço cliente a cliente.

**Card 4**
Emoji: 🔄
**Título:** Um sistema de acompanhamento automatizado
O CRM gratuito + o sistema de retomada 3-7-14 que transforma os "vou pensar" em clientes que pagam. 80% das vendas acontecem após o 2º contato.

---

### Seção de Detalhes

**Bloco 1 — Estratégia de prospecção orgânica**

Título: Encha sua agenda sem gastar R$ 1 em anúncio

- O método das 4 fontes para encontrar 50 prospects qualificados em uma tarde (grupos Facebook, comentários Instagram, hashtags locais, rede pessoal)
- O template Google Sheet CRM com as 6 colunas essenciais — pronto para copiar
- O calendário de prospecção dia a dia em 30 dias com objetivos diários claros

**Bloco 2 — Scripts e templates de conversão**

Título: Palavras que fecham clientes

- 4 variações de scripts DM adaptadas a cada situação (comentário, cold DM, oferta de lançamento, conteúdo gratuito)
- O script de chamada de descoberta de 15 minutos com as 7 perguntas que revelam se o prospect está pronto para comprar
- As respostas às 5 objeções mais frequentes ("é caro demais", "vou pensar", "já tenho um coach", "vou me virar sozinho", "não é o momento")

**Bloco 3 — Sistema de fidelização e upsell**

Título: Transforme 10 clientes em 30 clientes

- O protocolo de onboarding em 3 etapas que reduz cancelamentos em 60% no primeiro mês
- A estratégia de indicação: como cada cliente satisfeito te traz 1 a 2 novos clientes sem que você peça
- O plano de aumento de preço: quando aumentar, quanto, e como comunicar sem perder clientes

---

### FAQ

**Q1: Em que isso é diferente de todos os outros guias para coaches?**
Sem teoria. Sem "você precisa encontrar sua paixão" ou "desenvolva seu personal branding". Aqui, você abre o Playbook, segue o plano dia a dia e fecha clientes. É um manual de uso, não um livro de desenvolvimento pessoal.

**Q2: Funciona se eu não tenho nenhum seguidor no Instagram?**
Sim. A estratégia de prospecção é 100% baseada na busca ativa de prospects, não na criação de conteúdo. Você não precisa de audiência. Precisa de 50 pessoas e de uma boa mensagem. Só isso.

**Q3: Quanto tempo leva por dia?**
1 a 2 horas por dia durante 30 dias. É indispensável. Se você busca uma solução mágica de 10 minutos, este não é para você. O Playbook é honesto: é preciso trabalhar. Mas te diz exatamente em quê.

**Q4: Posso usar os scripts para nichos além do fitness?**
Os princípios funcionam para qualquer tipo de coaching (nutrição, bem-estar, negócios). Mas os exemplos, scripts e templates são calibrados para coaching fitness. É mais eficaz ter exemplos do seu próprio nicho.

**Q5: E se eu não obtiver resultados?**
Se você seguir o plano por 30 dias e não fechar nenhum cliente, me mande um email com sua planilha de acompanhamento. Ou te reembolso, ou identificamos juntos o que está travando. Nos dois casos, você não perde nada.

**Q6: É compra única ou assinatura?**
Compra única. R$ 197, uma vez. Sem taxas escondidas, sem assinatura, sem "módulo premium" para desbloquear. Você paga, recebe tudo. As atualizações futuras estão incluídas, gratuitamente.

---

### Seção CTA

**Headline:** 10 clientes em 30 dias. R$ 197. Sem desculpas.
**Subtitle:** Em 30 dias, você terá 10 clientes ou desculpas. O Playbook elimina as desculpas.
**Botão:** Quero meus 10 primeiros clientes — R$ 197

---

### Footer CTA

**Headline:** Ainda está lendo? Então você sabe que precisa disso.
**Botão:** Obter o Playbook agora — R$ 197

---
---

## FAIXA 3 — R$ 997: Programa Acelerador

**Produto:** "O Acelerador FitPro — De 0 a 30 clientes em 90 dias"

---

### Hero (ângulo autoridade)

**Headline:**
Ajudei +300 coaches fitness a fechar seus primeiros clientes. Agora, te acompanho pessoalmente durante 90 dias.

**Subtitle:**
O Acelerador FitPro é o Playbook em versão turbo: coaching de grupo semanal, templates premium, comunidade privada e acompanhamento personalizado. Para coaches que querem avançar rápido e bem.

**Exibição de Preço:**
R$ 997 — pagamento único (ou 3x R$ 350)

**Botão CTA:**
Entrar no Acelerador — R$ 997

---

### Trust Badges

1. **+120 coaches** concluíram o programa
2. **87%** fecharam 10+ clientes nos primeiros 60 dias
3. **Garantia de 90 dias** — resultados ou reembolso
4. **Coaching ao vivo** toda semana durante 12 semanas
5. **Comunidade privada** ativa com +300 coaches

---

### Prova Social

**Depoimento 1 — Sarah, coach fitness em São Paulo**
"Antes do Acelerador, tinha 2 clientes e cobrava R$ 80 por sessão. Depois de 8 semanas, tinha 14 a R$ 160 por sessão. O script de DM sozinho me trouxe 6 clientes. O ROI é absurdo."

**Depoimento 2 — Karim, coach a domicílio no Rio**
"Hesitei por causa do preço. R$ 997 quando você ganha R$ 1.200 por mês assusta. Mas já no 3º cliente fechado (semana 2), o programa estava pago. Hoje tenho 22 clientes e uma lista de espera."

**Depoimento 3 — Julie, coach online (100% online)**
"O game-changer para mim foi a comunidade. Quando você batalha sozinha na frente da tela, ter 300 coaches vivendo a mesma coisa e te incentivando muda tudo. Fechei meus 10 primeiros clientes em 18 dias."

---

### Promise Cards

**Card 1**
Emoji: 🚀
**Título:** Um plano de ação semana a semana
12 semanas, 12 módulos, 12 objetivos. Você sabe exatamente o que fazer toda segunda-feira. Chega de "o que faço hoje?".

**Card 2**
Emoji: 👥
**Título:** Coaching de grupo semanal
Toda quarta-feira, 1h de coaching ao vivo em grupo pequeno (máx. 15 pessoas). Você faz suas perguntas, recebe respostas. Sem replay de 3h. Ao vivo, concreto.

**Card 3**
Emoji: 💼
**Título:** A caixa de ferramentas completa
+40 templates premium: scripts de venda, emails de acompanhamento, contratos de clientes, modelos de programa de treino, posts para Instagram, stories de conversão. Você não começa do zero.

**Card 4**
Emoji: 🤝
**Título:** Uma comunidade que te impulsiona
Acesso vitalício ao grupo privado de +300 coaches fitness. Compartilhamento de resultados, feedback mútuo, oportunidades de colaboração. Você não está mais sozinho.

---

### Tabela comparativa (Antes / Depois)

| Situação | ANTES do Acelerador | DEPOIS do Acelerador |
|----------|--------------------|--------------------|
| **Número de clientes** | 0 a 3 clientes, encontrados por acaso | 15 a 30 clientes, encontrados sistematicamente |
| **Renda mensal** | R$ 0 a R$ 1.500, irregular | R$ 6.000 a R$ 12.000, previsível |
| **Prospecção** | Você posta conteúdo e reza | Você contata 10 prospects/dia com script que converte |
| **Pricing** | Cobra R$ 60-100 por sessão | Cobra R$ 600-1.200/mês por cliente |
| **Confiança** | Síndrome do impostor permanente | Você sabe que seu método funciona, com provas |

---

### FAQ

**Q1: Qual é a diferença entre o Playbook a R$ 197 e o Acelerador a R$ 997?**
O Playbook é o plano. O Acelerador é o plano + um coach + uma comunidade + 40 templates premium + 12 sessões ao vivo. É a diferença entre um livro de receitas e uma aula de culinária com um chef.

**Q2: Estou mesmo sem nenhum cliente, é avançado demais para mim?**
Pelo contrário. O programa foi desenhado para coaches com 0-5 clientes. 78% dos participantes começam do zero. Você não está atrasado, está no lugar certo.

**Q3: Quanto tempo isso leva por semana?**
5 a 7 horas por semana: 1h de coaching ao vivo + 1h de módulo + 3-5h de execução (prospecção, chamadas, etc.). Se você não consegue dedicar 5h/semana ao seu negócio, você ainda não está pronto para viver disso.

**Q4: As sessões de coaching são gravadas?**
Sim, cada sessão é gravada e disponível em replay em 24h. Mas honestamente, o ao vivo é 10x mais eficaz. É onde você faz suas perguntas e recebe feedback personalizado.

**Q5: Por quanto tempo acesso os recursos?**
Vitalício. Os módulos, templates, replays, comunidade — você mantém tudo. Mesmo quando tiver 50 clientes e não precisar mais.

**Q6: Funciona para coaching online?**
Sim. 40% dos participantes fazem coaching 100% online. Os scripts e estratégias são adaptados para coaching por videoconferência. Julie (depoimento acima) fechou 10 clientes em 18 dias em full online.

**Q7: Posso pagar em parcelas?**
Sim. 3 parcelas de R$ 350. O primeiro pagamento te dá acesso imediato a todo o programa.

**Q8: E se eu quiser reembolso?**
Você tem 90 dias. Se após seguir o programa e executar as ações você não fechar pelo menos 5 clientes, eu te reembolso integralmente. Só peço que mostre que fez o trabalho (planilha de acompanhamento, mensagens enviadas). Sem trabalho, sem reembolso — é justo para os dois lados.

---

### Seção de Garantia

**Headline:** A garantia "Resultados ou Reembolso" — 90 dias

Você tem 90 dias para testar o Acelerador. Se seguir o programa, executar as ações semana a semana e não fechar pelo menos 5 clientes pagantes: me manda um email com sua planilha de acompanhamento e eu te reembolso 100%. Sem perguntas, sem formulário em 12 etapas.

Por que faço isso? Porque funciona. 87% dos participantes chegam a 10 clientes. Assumo o risco porque as estatísticas estão do meu lado.

---

### Double CTA

**CTA principal:**
**Headline:** R$ 997 para construir um negócio de coaching rentável em 90 dias.
**Subtitle:** Seus futuros clientes já existem. Estão esperando você os contatar com a mensagem certa.
**Botão:** Começar o Acelerador agora — R$ 997

**CTA footer:**
**Headline:** Última chance. Sua carreira de coach começa aqui.
**Subtitle:** Em 90 dias, você será um coach com 30 clientes ou um coach que pensa "devia ter começado há 3 meses".
**Botão:** Entrar no Acelerador — R$ 997 (ou 3x R$ 350)

---

## Notas de uso para o skill

- Cada faixa segue uma estrutura específica adaptada ao seu nível de preço
- A faixa R$ 57 é curta, direta, baixo risco — o objetivo é conversão rápida
- A faixa R$ 197 detalha mais para justificar o preço — 4 feature blocks, 6 FAQ
- A faixa R$ 997 aposta em autoridade, prova social e garantia para superar objeções de uma compra mais importante
- A voz é constante: segunda pessoa, números precisos, honestidade sobre os limites
- Os CTAs usam a primeira pessoa ("Quero...") ou o imperativo direto`,
};

export default skill;
