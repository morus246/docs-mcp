import type { SkillRecord } from "./index.ts";

const skill: SkillRecord = {
  nome: "dp-blog-publish",
  categoria: "Conteúdo e SEO",
  descricao: "Publica artigos no WordPress via API REST. Gerencia autenticação por senha de aplicativo, rascunho, categorias, tags, imagens em destaque e meta SEO (Yoast/RankMath). Pode publicar um artigo existente ou um lote de artigos. Gatilhos: publicar, wordpress, publish, wp, colocar blog no ar, postar artigo.",
  argumentHint: "[arquivo artigo] [url-wordpress]",
  allowedTools: ["Read", "Write", "Bash", "Glob"],
  conteudo: `# Blog Publish — Publicação no WordPress

<!-- v2.0.0 | 2026-04-13 | Criação: publicação WP REST API, autenticação senha de app, categorias, tags, meta SEO -->

Publica artigos de blog no WordPress via API REST. Gerencia autenticação segura, formatação, categorias/tags e meta SEO para Yoast ou RankMath.

## Referência Rápida

| Comando | Descrição |
|---------|-----------|
| \`/dp-blog-publish [arquivo]\` | Publicar um artigo existente no WordPress |
| \`/dp-blog-publish batch [pasta]\` | Publicar vários artigos de uma pasta |
| \`/dp-blog-publish test\` | Testar a conexão WordPress |
| \`/dp-blog-publish list\` | Listar os últimos artigos publicados |
| \`/dp-blog-publish update [post-id] [arquivo]\` | Atualizar um artigo existente |

## Formato do Entregável

\`\`\`
ENTREGÁVEL:
├── Artigo publicado em RASCUNHO no WordPress
├── URL admin para edição
├── Categorias e tags atribuídas
├── Meta SEO configurados (se Yoast/RankMath detectado)
└── Checklist de verificação antes da publicação final
\`\`\`

---

## Processo

\`\`\`
1. Coleta de contexto   → URL WordPress, credenciais, artigo fonte
2. Testar conexão       → Verificar a API REST e a autenticação
3. Preparar o post      → Extrair título, conteúdo, meta, categorias
4. Confirmar            → Pedir confirmação antes de enviar
5. Publicar (rascunho)  → Enviar via API REST em rascunho
6. Pós-publicação       → Link admin + checklist
\`\`\`

---

## Passo 1 — Coleta de Contexto

### 1a. Carregar a configuração (silencioso)

\`\`\`
SE um arquivo wp-config.md existir na raiz:
  → Ler URL WordPress e nome de usuário
  → NÃO armazenar senhas neste arquivo
  
SE business-profile.md existir:
  → Ler para o nome do autor e da marca
\`\`\`

### 1b. Perguntas

| # | Pergunta | Por quê |
|---|----------|---------|
| Q1 | Qual **artigo** você quer publicar? (caminho do arquivo ou "vou colar o conteúdo") | Fonte do conteúdo |
| Q2 | Qual é a **URL do seu site WordPress**? (ex: \`https://meusite.com\`) | Endpoint API |
| Q3 | Qual é o seu **nome de usuário** WordPress? | Autenticação |
| Q4 | Qual é a sua **senha de aplicativo**? | Autenticação API |

> **Como criar uma senha de aplicativo WordPress:**
> 1. Vá no WordPress → **Usuários** → **Perfil**
> 2. Role até **Senhas de aplicativo**
> 3. Digite um nome (ex: "DP Criador") e clique em **Adicionar**
> 4. Copie a senha gerada (formato: \`xxxx xxxx xxxx xxxx xxxx xxxx\`)
> 5. Esta senha não será mais visível depois — guarde-a em local seguro
>
> **Requisito**: WordPress 5.6+ (senhas de aplicativo são nativas desde esta versão)

---

## Passo 2 — Testar a Conexão

Antes de qualquer publicação, testar se a conexão funciona:

\`\`\`bash
# Teste 1: A API REST está ativa?
curl -s "[WP_URL]/wp-json/" | head -c 200

# Teste 2: A autenticação funciona?
curl -s -u "[username]:[app_password]" "[WP_URL]/wp-json/wp/v2/users/me"

# Teste 3: As permissões são suficientes?
# O usuário deve ter o papel de "Autor" ou superior
\`\`\`

### Diagnóstico em caso de erro

| Erro | Causa provável | Solução |
|------|----------------|---------|
| \`rest_no_route\` | API REST desativada | Ativar em Configurações > Links permanentes (re-salvar) |
| \`403 Forbidden\` | Plugin de segurança bloqueia a API | Colocar a API REST na whitelist do plugin (Wordfence, iThemes, etc.) |
| \`401 Unauthorized\` | Credenciais incorretas | Verificar nome de usuário + criar nova senha de aplicativo |
| \`invalid_username\` | Usuário inexistente | Verificar a ortografia do nome de usuário |
| \`application_passwords_disabled\` | Recurso desativado | WordPress < 5.6 ou desativado por plugin. Atualizar o WP. |
| Timeout | Servidor lento ou URL incorreta | Verificar a URL (https vs http, subpasta, etc.) |

**Se a conexão falhar**: Propor salvar em local e ajudar o usuário a resolver o problema.

---

## Passo 3 — Preparar o Post

### 3a. Extrair os dados do artigo

\`\`\`
SE o artigo for HTML:
  → Extrair o <title> → título do post
  → Extrair o <meta name="description"> → excerpt
  → Extrair o conteúdo do <body>/<article> → conteúdo
  → Extrair as keywords → tags

SE o artigo for Markdown com frontmatter:
  → Extrair title, description, slug, keywords do frontmatter
  → Converter o markdown em HTML para o conteúdo
\`\`\`

### 3b. Recuperar as categorias existentes

\`\`\`bash
# Listar as categorias WordPress
curl -s -u "[user]:[pass]" "[WP_URL]/wp-json/wp/v2/categories?per_page=100"
\`\`\`

Perguntar ao usuário: "Em qual categoria? Aqui estão as categorias existentes: [lista]. Você também pode criar uma nova."

### 3c. Preparar o payload

\`\`\`json
{
  "title": "[Título extraído]",
  "content": "[Conteúdo HTML limpo]",
  "status": "draft",
  "slug": "[slug]",
  "excerpt": "[Meta description]",
  "categories": [ID],
  "tags": [ID1, ID2],
  "meta": {}
}
\`\`\`

### 3d. Upload de imagens (opcional)

Se o artigo contiver imagens ou se o usuário quiser uma imagem em destaque:

\`\`\`bash
# Upload de uma imagem no WordPress
curl -X POST "[WP_URL]/wp-json/wp/v2/media" \\
  -u "[username]:[app_password]" \\
  -H "Content-Disposition: attachment; filename=[image.jpg]" \\
  -H "Content-Type: image/jpeg" \\
  --data-binary @[caminho/imagem.jpg]
\`\`\`

Após o upload, recuperar o ID da imagem e adicioná-lo ao payload do post:
\`\`\`json
{
  "featured_media": [IMAGE_ID]
}
\`\`\`

Perguntar ao usuário: "Você tem uma imagem em destaque? (caminho do arquivo ou URL)"

### 3e. Meta SEO (se Yoast ou RankMath detectado)

\`\`\`bash
# Detectar se Yoast está instalado
curl -s "[WP_URL]/wp-json/yoast/v1/get_head?url=[WP_URL]" 2>/dev/null

# Detectar se RankMath está instalado
curl -s "[WP_URL]/wp-json/rankmath/v1/getHead?url=[WP_URL]" 2>/dev/null
\`\`\`

**Se Yoast detectado**, adicionar ao payload:
\`\`\`json
{
  "meta": {
    "_yoast_wpseo_title": "[SEO Title]",
    "_yoast_wpseo_metadesc": "[Meta description]",
    "_yoast_wpseo_focuskw": "[Palavra-chave principal]"
  }
}
\`\`\`

**Se RankMath detectado**, adicionar:
\`\`\`json
{
  "meta": {
    "rank_math_title": "[SEO Title]",
    "rank_math_description": "[Meta description]",
    "rank_math_focus_keyword": "[Palavra-chave principal]"
  }
}
\`\`\`

---

## Passo 4 — Confirmação

**Hard gate**: SEMPRE pedir confirmação antes de enviar.

\`\`\`
📝 PRONTO PARA PUBLICAR EM RASCUNHO
════════════════════════════════════

Site       : [URL WordPress]
Título     : [título]
Slug       : /[slug]
Categoria  : [categoria]
Tags       : [tag1, tag2]
Palavras   : ~[N]
Plugin SEO : [Yoast/RankMath/Nenhum]
Status     : RASCUNHO (draft)

Você confirma o envio? (sim/não)
\`\`\`

---

## Passo 5 — Publicar

\`\`\`bash
# Criar o post em rascunho
curl -X POST "[WP_URL]/wp-json/wp/v2/posts" \\
  -u "[username]:[app_password]" \\
  -H "Content-Type: application/json" \\
  -d '[PAYLOAD JSON]'
\`\`\`

### Gerenciar a resposta

\`\`\`
SE status 201 (Created):
  → Extrair o ID do post e a URL de edição
  → Exibir o resumo de publicação

SE status 400 (Bad Request):
  → Exibir o erro, propor uma correção

SE status 401 (Unauthorized):
  → Senha expirada ou revogada. Orientar para criar uma nova.

SE status 403 (Forbidden):
  → Permissões insuficientes. O usuário deve ser Autor ou Admin.

SE status 500 (Server Error):
  → Problema no servidor. Salvar em local e tentar novamente depois.
\`\`\`

---

## Passo 6 — Pós-Publicação

\`\`\`
✅ ARTIGO PUBLICADO EM RASCUNHO

📄 URL admin    : [WP_URL]/wp-admin/post.php?post=[ID]&action=edit
📌 Título       : [título]
🔗 Permalink    : [WP_URL]/[slug]/ (visível após publicação)
📊 Status       : Rascunho
🏷️ Categoria    : [categoria]
🔖 Tags         : [tags]
🔍 SEO          : [Yoast/RankMath meta configurados / Sem plugin SEO]

CHECKLIST ANTES DA PUBLICAÇÃO FINAL:
  [ ] Revisar o artigo no WordPress
  [ ] Adicionar a imagem em destaque
  [ ] Verificar a exibição em mobile (preview)
  [ ] Verificar os links internos (clicáveis)
  [ ] Verificar o SEO (verde no Yoast/RankMath)
  [ ] Agendar ou publicar

APÓS A PUBLICAÇÃO:
  → Atualizar os links (adicionar links de outros artigos para este)
  → /dp-social-caption — Criar os posts de promoção
  → /dp-email-sequence — Enviar para a lista
\`\`\`

---

## Publicação em Lote

Para publicar vários artigos:

\`\`\`
1. Listar os arquivos na pasta blog/
2. Para cada arquivo:
   a. Extrair os dados
   b. Exibir um resumo compacto
3. Pedir confirmação global: "Vou publicar [N] artigos em rascunho. OK?"
4. Publicar um a um com intervalo de 2s entre cada
5. Resumo final com todos os links admin
\`\`\`

---

## Segurança

| Regra | Detalhe |
|-------|---------|
| **NUNCA armazenar a senha** | Sem arquivo, sem variável persistente. Apenas em memória. |
| **NUNCA publicar como "publish"** | Sempre "draft". O usuário publica manualmente. |
| **NUNCA modificar um post existente sem confirmação** | Pedir o ID e confirmar antes de atualizar. |
| **NUNCA excluir um post** | Fora do escopo. Redirecionar para o admin WordPress. |
| **NUNCA usar a senha WP principal** | Apenas as senhas de aplicativo. |
| **Testar antes de publicar** | Sempre testar a conexão primeiro. |

---

## Critérios de Qualidade

| ID | Critério | Severidade |
|----|----------|-----------|
| QG-01 | Conexão testada antes de qualquer publicação | Crítico |
| QG-02 | Confirmação explícita do usuário antes do envio | Crítico |
| QG-03 | Status = "draft" obrigatório (nunca "publish") | Crítico |
| QG-04 | Senha não escrita em arquivo | Crítico |
| QG-05 | Título e conteúdo não vazios | Crítico |
| QG-06 | Slug definido e válido | Alto |
| QG-07 | Meta SEO configurados se plugin detectado | Médio |
| QG-08 | Categoria atribuída | Médio |
| QG-09 | Intervalo entre publicações em lote (mín. 2s) | Médio |
| QG-10 | Conteúdo HTML limpo (sem scripts maliciosos) | Crítico |

---

## Tratamento de Erros

| Cenário | Ação |
|---------|------|
| API REST desativada | Orientar: "Configurações > Links permanentes, re-salvar" |
| Plugin de segurança bloqueia a API | Identificar o plugin, fornecer instruções de whitelist |
| Senha incorreta | Orientar para Perfil > Senhas de aplicativo |
| WordPress < 5.6 | App passwords não existem. Recomendar atualização. |
| Artigo sem título | Extrair o H1 do conteúdo ou perguntar |
| Artigo Markdown (não HTML) | Converter em HTML antes de enviar |
| Categoria inexistente | Propor criar via API ou escolher uma existente |
| Timeout de rede | Salvar em local, tentar novamente depois |
| Cota ou rate limit | Aguardar e tentar novamente com intervalo maior |
| O usuário quer publicar diretamente (não em rascunho) | Recusar educadamente. "Para sua segurança, publico sempre em rascunho. Você pode publicar em 1 clique pelo admin." |

---

## Integração com Outros Skills

| Antes | Skill | Quando |
|-------|-------|--------|
| Escrever o artigo | \`/dp-blog-article\` | O artigo deve existir antes da publicação |
| Estratégia do blog | \`/dp-blog-strategy\` | Para saber qual artigo publicar a seguir |

| Depois | Skill | Quando |
|--------|-------|--------|
| Promover | \`/dp-social-caption\` | Após a publicação |
| Email | \`/dp-email-sequence\` | Para notificar a lista |
| Links internos | \`/dp-blog-article update\` | Para adicionar links de entrada de outros artigos |`,
};

export default skill;
