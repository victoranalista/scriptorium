# Stack Tecnológica e Dependências Essenciais

Este documento define a stack tecnológica e as dependências principais para o projeto sênior do sistema de cartório, utilizando Next.js 15.3.2, Server Actions, arquitetura em camadas, princípios SOLID e Shadcn/UI.

## 1. Framework Principal e Linguagem

*   **Next.js:** `15.3.2` (App Router)
*   **React:** `19 RC` 
*   **React DOM:** `19 RC` 
*   **Linguagem:** TypeScript

## 2. Estilização e UI

*   **Tailwind CSS:** `v4.x` (Recomendado para as versões mais recentes do Next.js e Shadcn/UI)
    *   Dependências associadas: `postcss`, `autoprefixer`.
*   **Shadcn/UI:** Versão mais recente (`latest`). Os componentes serão adicionados individualmente via CLI (`pnpm dlx shadcn-ui@latest add [component]`).
*   **Ícones:** `lucide-react` (Biblioteca de ícones SVG leves, comumente usada com Shadcn/UI).
*   **Utilitários de Classe CSS:**
    *   `clsx`: Para construir strings de nomes de classe condicionalmente.
    *   `tailwind-merge`: Para mesclar classes Tailwind CSS sem conflitos de estilo (instalado automaticamente pelo Shadcn/UI).

## 3. Gerenciamento de Estado e Dados

*   **Server Actions:** Para mutações de dados e lógica do lado do servidor invocada pelo cliente.
*   **React `useActionState`:** (React 19) Para gerenciar o estado de transições de formulário com Server Actions (substitui `useFormState` experimental).
*   **React `useFormStatus`:** (React 19) Para obter informações de estado pendente de um formulário pai.
*   **SWR / React Query (TanStack Query):** Opcional para data fetching complexo no lado do cliente, mas com Server Actions e o cache do App Router, pode não ser estritamente necessário para todos os casos. A ser avaliado conforme a necessidade de estados de cache globais no cliente.

## 4. Validação de Dados

*   **Zod:** Para validação de esquemas de dados (ex: formulários, payloads de API, variáveis de ambiente).

## 5. Banco de Dados e ORM (Para Camada de Persistência)

*   **Prisma:** ORM para interagir com o banco de dados. Facilita a modelagem de dados e as queries.
*   **Driver de Banco de Dados:** Dependerá da escolha do banco (ex: `pg` para PostgreSQL, `mysql2` para MySQL, ou `sqlite3` para SQLite em desenvolvimento).

## 6. Ferramentas de Desenvolvimento e Qualidade de Código

*   **Gerenciador de Pacotes:** `pnpm` (Recomendado por sua eficiência e usado nos exemplos do Shadcn/UI).
*   **ESLint:** Para linting de código TypeScript e React, com configurações específicas para Next.js (`eslint-config-next`).
*   **Prettier:** Para formatação automática de código, garantindo consistência.
*   **Husky / lint-staged (Opcional):** Para executar linters e formatadores automaticamente antes dos commits.

## 7. Outras Dependências Potenciais (a serem consideradas conforme necessidade)

*   **`date-fns`** Para manipulação avançada de datas e horários.
*   **Bibliotecas de Logging:** (ex: Pino, Winston) para logging estruturado no backend.
*   **Bibliotecas de Teste:**
    *   Jest / Vitest: Para testes unitários e de integração.
    *   React Testing Library: Para testar componentes React.
    *   Playwright / Cypress: Para testes End-to-End (E2E).

## Justificativa da Stack

*   **Next.js 15.3.2 e React 19:** Utilização das versões mais recentes para aproveitar as últimas features, otimizações de performance (incluindo o React Compiler experimental quando estável) e melhorias em Server Actions e no App Router.
*   **TypeScript:** Essencial para desenvolvimento em larga escala, garantindo tipagem forte, melhor manutenibilidade e detecção de erros em tempo de desenvolvimento.
*   **Tailwind CSS + Shadcn/UI:** Proporcionam um desenvolvimento de UI rápido, customizável e consistente, com foco na acessibilidade e na propriedade do código dos componentes.
*   **Server Actions + Zod:** Simplificam a lógica de mutação de dados e validação, reduzindo a necessidade de APIs dedicadas para muitas operações CRUD e melhorando a co-localização da lógica de backend com os componentes que a utilizam.
*   **Prisma:** Oferece uma camada de abstração robusta e type-safe para o banco de dados, alinhando-se bem com TypeScript.
*   **pnpm, ESLint, Prettier:** Ferramentas padrão para um fluxo de trabalho de desenvolvimento moderno, eficiente e com alta qualidade de código.

A escolha dessas tecnologias e ferramentas visa construir uma aplicação performática, escalável, manutenível e alinhada com as melhores práticas de desenvolvimento no ecossistema Next.js atual.
