# Requirements Document

## Introduction

Esta feature adapta a suite dp-createur (24 skills Claude Code para criação e venda de produtos digitais) para PT-BR e a integra ao projeto `docs-mcp` como um servidor MCP (Model Context Protocol) hospedado na Netlify via Edge Functions.

O resultado será um servidor MCP remoto acessível por ferramentas de IA (Claude Code, Cursor, VS Code, Windsurf, ChatGPT) que expõe os skills dp-createur como ferramentas MCP consultáveis em português do Brasil. O conteúdo dos skills (originalmente em francês) será traduzido e adaptado culturalmente para o mercado brasileiro.

## Glossary

- **Skill**: Arquivo SKILL.md com frontmatter YAML que define uma ferramenta Claude Code — contém nome, descrição, instruções e referências
- **MCP (Model Context Protocol)**: Protocolo padronizado para conectar LLMs a ferramentas externas, dados e APIs
- **Servidor_MCP**: Instância do servidor implementado como Netlify Edge Function que expõe ferramentas via protocolo MCP
- **dp-createur**: Suite de 24 skills Claude Code para criação, lançamento e venda de produtos digitais
- **Adaptador_PT-BR**: Componente responsável por converter o conteúdo dos skills de francês para PT-BR com adaptações culturais para o mercado brasileiro
- **Ferramenta_MCP**: Unidade funcional exposta pelo Servidor_MCP e acessível por clientes MCP; corresponde a um skill dp-createur
- **Cliente_MCP**: Ferramenta de IA que consome o Servidor_MCP (Claude Code, Cursor, VS Code, Windsurf, etc.)
- **Netlify_Edge_Function**: Função serverless executada na borda da rede Netlify usando Deno runtime
- **Transporte_HTTP**: Protocolo de comunicação streamable HTTP usado pelo SDK MCP para comunicação stateless
- **business-profile.md**: Arquivo gerado pelo skill `dp-business-profile` que armazena o perfil do negócio do usuário; lido por todos os demais skills

---

## Requirements

### Requirement 1: Servidor MCP Funcional

**User Story:** Como desenvolvedor ou criador de produtos digitais, quero acessar os skills dp-createur via protocolo MCP, para que minhas ferramentas de IA possam usá-los diretamente sem instalação local.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL expor exatamente 24 Ferramentas_MCP registradas, uma por skill dp-createur, de forma que o handshake MCP inicial retorne todas as 24 no campo `tools` da resposta
2. WHEN o Cliente_MCP enviar uma requisição POST para o endpoint `/mcp` com payload JSON-RPC válido, THE Servidor_MCP SHALL processar a requisição usando o SDK `@modelcontextprotocol/sdk` e retornar uma resposta JSON-RPC com campo `result`
3. THE Servidor_MCP SHALL operar em modo stateless de forma que duas requisições POST consecutivas idênticas produzam respostas funcionalmente equivalentes, sem dependência de estado de sessão entre elas
4. WHEN o Cliente_MCP enviar uma requisição GET para o endpoint `/mcp`, THE Servidor_MCP SHALL retornar resposta HTTP 405 com header `Allow: POST` e corpo de texto `Method Not Allowed`
5. WHEN o Cliente_MCP enviar uma requisição POST para o endpoint `/mcp` com corpo JSON-RPC cujo campo `method` não corresponde a nenhum método MCP registrado, THE Servidor_MCP SHALL retornar resposta HTTP 200 com payload JSON-RPC de erro conforme a especificação JSON-RPC 2.0 (código `-32601`)
6. IF ocorrer uma exceção não tratada durante o processamento da requisição MCP, THEN THE Servidor_MCP SHALL retornar resposta HTTP 500 com corpo JSON no formato `{"content": [{"type": "text", "text": "<mensagem de erro>"}]}`
7. THE Servidor_MCP SHALL exportar a função `handler` e o objeto `config` com `path: ["/mcp"]` e `method: ["POST", "GET"]` no formato esperado pelo `@netlify/edge-functions`, de forma que a Netlify_Edge_Function seja reconhecida e invocada corretamente no deploy

### Requirement 2: Tradução e Adaptação PT-BR dos Skills

**User Story:** Como criador de produtos digitais brasileiro, quero acessar os skills dp-createur em português do Brasil, para que eu possa trabalhar no idioma nativo sem barreira de linguagem.

#### Acceptance Criteria

1. THE Adaptador_PT-BR SHALL traduzir o campo `description` do frontmatter YAML de todos os 24 skills do francês para PT-BR, de forma que nenhum caractere em francês permaneça no campo `description` após a tradução
2. THE Adaptador_PT-BR SHALL traduzir o conteúdo em prosa do corpo dos SKILL.md (títulos, parágrafos, itens de lista, conteúdo de tabelas) do francês para PT-BR, preservando sem alteração: blocos de código delimitados por triple-backtick, código inline delimitado por backtick simples, nomes de campos YAML (ex: `name:`, `description:`), nomes técnicos de skills no formato `dp-[nome]`, e a hierarquia de títulos Markdown (níveis `#` a `######`)
3. WHEN um skill contiver qualquer um dos seguintes elementos específicos ao mercado francês: (a) valores monetários denominados em euros (€), (b) nomes de empresas, produtos ou personalidades francesas sem equivalente global, ou (c) nomes de plataformas digitais sem presença comercial ativa no Brasil, THE Adaptador_PT-BR SHALL substituir cada elemento identificado por um equivalente do mercado brasileiro — valores em reais (R$), empresas/produtos brasileiros equivalentes, e plataformas com presença no Brasil — registrando cada substituição
4. IF um elemento individual de um skill não puder ser adaptado culturalmente, THEN THE Adaptador_PT-BR SHALL preservar o conteúdo original daquele elemento sem tradução, registrar o elemento preservado por skill e continuar a adaptação dos demais elementos do mesmo skill e dos demais skills
5. THE Adaptador_PT-BR SHALL substituir todas as ocorrências do produto fictício "FitPro Academy" e de seu playbook de referência pelo equivalente brasileiro "Academia FitPro" com produto "Playbook do Coach Fitness" ao preço de R$ 197, mantendo a coerência narrativa em todos os skills que referenciam esse produto fictício
6. THE Adaptador_PT-BR SHALL preservar sem modificação a estrutura técnica dos skills: frontmatter YAML completo (todos os campos e valores técnicos), nomes de arquivos SKILL.md e references/*.md, caminhos de referência entre arquivos, e a hierarquia de títulos Markdown
7. WHEN um skill referenciar outro skill pelo nome no formato `/dp-[nome]` (ex: `/dp-landing-page`), THE Adaptador_PT-BR SHALL manter o nome técnico original do skill sem tradução em todas as ocorrências, tanto no frontmatter quanto no corpo do arquivo

### Requirement 3: Exposição dos Skills como Ferramentas MCP

**User Story:** Como ferramenta de IA (Claude Code, Cursor, VS Code), quero consultar o conteúdo completo de qualquer skill dp-createur, para que eu possa guiar o usuário através do workflow de criação de produtos digitais.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL registrar uma Ferramenta_MCP chamada `buscar_skill_dp` com parâmetro de entrada `nome_skill` (tipo string, obrigatório) que aceita o nome do skill no formato `dp-[nome]` (ex: `dp-playbook-create`)
2. WHEN o Cliente_MCP invocar `buscar_skill_dp` com um `nome_skill` que corresponde exatamente ao nome de um dos 24 skills registrados, THE Servidor_MCP SHALL retornar o conteúdo completo do SKILL.md correspondente traduzido para PT-BR no campo `content[0].text` da resposta MCP
3. WHEN o Cliente_MCP invocar `buscar_skill_dp` com um `nome_skill` que não corresponde a nenhum dos 24 skills registrados, THE Servidor_MCP SHALL retornar no campo `content[0].text` uma mensagem em PT-BR no formato: `"Skill '<nome_skill>' não encontrado. Skills disponíveis: <lista dos 24 nomes separados por vírgula>"`
4. THE Servidor_MCP SHALL registrar uma Ferramenta_MCP chamada `listar_skills_dp` sem parâmetros de entrada que retorna a lista completa dos 24 skills com nome, categoria e descrição em PT-BR
5. WHEN o Cliente_MCP invocar `listar_skills_dp`, THE Servidor_MCP SHALL retornar no campo `content[0].text` os 24 skills agrupados nas seis categorias: Fundação, Criação do Produto, Venda e Monetização, Conteúdo e SEO, Promoção, Análise e Qualidade — com cada skill listado sob exatamente uma categoria
6. IF o processo de agrupamento por categoria falhar em tempo de execução, THEN THE Servidor_MCP SHALL retornar resposta HTTP 500 com corpo JSON no formato `{"content": [{"type": "text", "text": "Erro ao agrupar skills por categoria: <detalhe do erro>"}]}` em vez de retornar uma lista parcialmente agrupada ou não agrupada
7. THE Servidor_MCP SHALL registrar uma Ferramenta_MCP chamada `buscar_skills_por_categoria` com parâmetro de entrada `categoria` (tipo string, obrigatório) que retorna todos os skills da categoria informada com nome e descrição em PT-BR
8. WHEN o Cliente_MCP invocar `buscar_skills_por_categoria` com uma `categoria` que não corresponde a nenhuma das seis categorias válidas, THE Servidor_MCP SHALL retornar no campo `content[0].text` uma mensagem em PT-BR listando as categorias válidas: `"Categoria não encontrada. Categorias disponíveis: Fundação, Criação do Produto, Venda e Monetização, Conteúdo e SEO, Promoção, Análise e Qualidade"`

### Requirement 4: Conteúdo dos Skills em PT-BR no Servidor

**User Story:** Como mantenedor do servidor MCP, quero que o conteúdo traduzido dos skills seja armazenado diretamente no repositório, para que o servidor possa servir o conteúdo sem dependência de arquivos externos em runtime.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL armazenar o conteúdo traduzido dos 24 skills como módulos TypeScript ou arquivos de dados estáticos no diretório `netlify/edge-functions/skills/`, de forma que nenhum acesso ao sistema de arquivos em runtime seja necessário para servir o conteúdo dos skills
2. WHEN o Servidor_MCP for deployado na Netlify, THE Servidor_MCP SHALL incluir o conteúdo de todos os 24 skills traduzidos no bundle da Netlify_Edge_Function de forma que todos os skills estejam disponíveis sem dependências externas em runtime
3. THE Servidor_MCP SHALL indexar os skills por nome em uma estrutura de mapa (objeto TypeScript ou Map) de forma que a busca de um skill pelo seu nome exato retorne o registro do skill diretamente, sem iterar sobre a lista completa
4. IF um skill contiver arquivos de referência adicionais em `references/*.md`, THEN THE Servidor_MCP SHALL incluir o conteúdo integral de todos os arquivos `references/*.md` desse skill no registro do skill armazenado no servidor
5. THE Servidor_MCP SHALL manter metadados estruturados tipados para cada skill com os campos obrigatórios: `nome` (string), `categoria` (string), `descricao` (string em PT-BR), `argumentHint` (string), `allowedTools` (string[]), e `conteudo` (string contendo o corpo completo do SKILL.md em PT-BR)

### Requirement 5: Compatibilidade com Clientes MCP

**User Story:** Como usuário do Claude Code, Cursor ou VS Code, quero conectar o servidor MCP dp-createur PT-BR às minhas ferramentas usando as instruções padrão, para que eu possa integrar os skills ao meu workflow sem configuração complexa.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL suportar o transporte Streamable HTTP conforme a especificação do `@modelcontextprotocol/sdk` versão `^1.15.1`, de forma que o handshake MCP inicial complete com sucesso e retorne a lista de ferramentas registradas
2. WHEN o Cliente_MCP for Claude Code e o usuário executar `claude mcp add --transport http "DP Criador PT-BR" https://[url-do-servidor]/mcp`, THE Servidor_MCP SHALL completar o handshake MCP com sucesso, retornando a lista das 24 Ferramentas_MCP no campo `tools` da resposta de inicialização
3. WHEN o Cliente_MCP for Cursor ou VS Code e a configuração `{"url": "https://[url-do-servidor]/mcp"}` for adicionada ao arquivo de configuração MCP da ferramenta, THE Servidor_MCP SHALL completar o handshake MCP com sucesso, retornando a lista das 24 Ferramentas_MCP no campo `tools` da resposta de inicialização
4. IF o Cliente_MCP não suportar Streamable HTTP (ex: Windsurf) e o usuário usar o proxy `npx mcp-remote https://[url-do-servidor]/mcp`, THEN THE Servidor_MCP SHALL completar o handshake MCP com sucesso através do proxy, retornando a lista das 24 Ferramentas_MCP
5. WHEN o Cliente_MCP invocar qualquer Ferramenta_MCP registrada, THE Servidor_MCP SHALL retornar a resposta no formato `{"content": [{"type": "text", "text": "<conteúdo>"}]}` compatível com a especificação MCP SDK `^1.15.1`
6. IF a conexão entre o Cliente_MCP e o Servidor_MCP falhar durante o handshake inicial, THEN THE Servidor_MCP SHALL retornar resposta HTTP com código de status 4xx ou 5xx e corpo JSON descrevendo o motivo da falha em PT-BR

### Requirement 6: Documentação PT-BR do Servidor

**User Story:** Como desenvolvedor ou usuário brasileiro, quero documentação clara em PT-BR sobre como usar o servidor MCP dp-createur, para que eu possa começar a usar rapidamente sem ler documentação em outros idiomas.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL ter um arquivo `README.md` em PT-BR no diretório raiz do projeto `docs-mcp`, substituindo o README.md existente em inglês
2. THE README.md SHALL documentar como conectar o servidor em Claude Code, Cursor, VS Code e Windsurf com pelo menos um exemplo completo de comando ou configuração por ferramenta (mínimo 4 exemplos no total), todos escritos em PT-BR
3. THE README.md SHALL listar todos os 24 skills disponíveis com suas descrições em PT-BR agrupados pelas seis categorias definidas (Fundação, Criação do Produto, Venda e Monetização, Conteúdo e SEO, Promoção, Análise e Qualidade)
4. THE README.md SHALL incluir pelo menos um exemplo de invocação para cada uma das três Ferramentas_MCP principais (`buscar_skill_dp`, `listar_skills_dp`, `buscar_skills_por_categoria`), totalizando mínimo 3 exemplos de uso
5. THE README.md SHALL incluir uma seção dedicada de variáveis de ambiente que descreva explicitamente quais variáveis de ambiente são necessárias para o deploy na Netlify — se nenhuma variável for requerida, a seção SHALL declarar explicitamente que nenhuma variável de ambiente é necessária

### Requirement 7: Workflow de Produtos Digitais via MCP

**User Story:** Como criador de conteúdo usando Claude Code, quero que o servidor MCP me guie pelo workflow completo de criação de produtos digitais, para que eu possa executar cada etapa do processo (validação → criação → venda → promoção) de forma estruturada.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL registrar uma Ferramenta_MCP chamada `obter_proximo_skill` com parâmetro de entrada `skill_atual` (tipo string, obrigatório) que retorna uma lista de objetos, cada um com os campos `skill` (nome no formato `dp-[nome]`) e `justificativa` (texto em PT-BR com no máximo 280 caracteres explicando quando usar esse próximo passo)
2. WHEN o Cliente_MCP invocar `obter_proximo_skill` com `skill_atual` igual a `"dp-business-profile"`, THE Servidor_MCP SHALL retornar uma lista contendo exatamente o objeto `{"skill": "dp-market-research", "justificativa": "<texto em PT-BR>"}` como próximo passo recomendado
3. WHEN o Cliente_MCP invocar `obter_proximo_skill` com `skill_atual` igual a `"dp-export-pdf"` (ou qualquer outro skill com múltiplos sucessores definidos no workflow), THE Servidor_MCP SHALL retornar uma lista com todos os próximos passos possíveis, cada um com campo `skill` e `justificativa` (máximo 280 caracteres) descrevendo a condição de uso em PT-BR
4. THE Servidor_MCP SHALL registrar uma Ferramenta_MCP chamada `buscar_skills_por_objetivo` com parâmetro de entrada `objetivo` (tipo string, obrigatório) que retorna uma lista de objetos, cada um com os campos `skill` (nome no formato `dp-[nome]`) e `descricao` (texto em PT-BR com no máximo 280 caracteres), correspondentes aos skills relevantes para o objetivo informado
5. WHEN o Cliente_MCP invocar `buscar_skills_por_objetivo` com `objetivo` igual a `"criar ebook"`, THE Servidor_MCP SHALL retornar uma lista contendo pelo menos os objetos com `skill` igual a `"dp-playbook-create"`, `"dp-ebook-cover"` e `"dp-export-pdf"`, cada um com campo `descricao` em PT-BR
6. IF o Cliente_MCP invocar `obter_proximo_skill` com um `skill_atual` que não corresponde a nenhum dos 24 skills registrados, OR IF o Cliente_MCP invocar `buscar_skills_por_objetivo` com um `objetivo` para o qual nenhum skill é relevante, THEN THE Servidor_MCP SHALL retornar no campo `content[0].text` uma lista vazia `[]` seguida de uma mensagem explicativa em PT-BR

### Requirement 8: Qualidade e Manutenibilidade do Código

**User Story:** Como mantenedor do projeto, quero que o código do servidor MCP seja tipado, testável e estruturado de forma consistente com o projeto docs-mcp existente, para que eu possa manter e evoluir o servidor ao longo do tempo.

#### Acceptance Criteria

1. THE Servidor_MCP SHALL ser implementado em TypeScript com a opção `"strict": true` ativada no arquivo de configuração TypeScript/Deno do projeto, de forma que nenhum erro de tipagem seja reportado pelo compilador TypeScript no modo estrito
2. THE Servidor_MCP SHALL usar o pacote `@modelcontextprotocol/sdk` na versão `^1.15.1` conforme especificado no `package.json` existente, sem introduzir dependências de versões diferentes ou conflitantes do mesmo pacote
3. THE Servidor_MCP SHALL separar a lógica de definição e registro das Ferramentas_MCP da lógica de dados dos skills em arquivos TypeScript fisicamente distintos — os dados dos skills em `netlify/edge-functions/skills/` e a lógica do servidor em `netlify/edge-functions/mcp-server.ts`
4. IF o conteúdo de um skill específico não puder ser carregado ou acessado em runtime, THEN THE Servidor_MCP SHALL registrar a falha no console com o nome do skill afetado e retornar ao Cliente_MCP uma mensagem de erro em PT-BR indicando qual skill não pôde ser carregado, de forma que as demais Ferramentas_MCP permaneçam acessíveis e responsivas
5. THE Servidor_MCP SHALL exportar a função `handler` com assinatura `(req: Request) => Promise<Response>` e o objeto `config` com campos `path` e `method` no formato esperado pelo `@netlify/edge-functions`, replicando o padrão de exportação do arquivo `mcp-server.ts` existente no projeto
