## Scriptorium

# Relatório do Projeto Scriptorium Front-End: Sistema de Cartório

Este documento resume a estrutura, arquitetura e as decisões tomadas para o desenvolvimento do frontend do sistema de cartório, utilizando Next.js 15.3.2, Server Actions, arquitetura em camadas, princípios SOLID e Shadcn/UI.

## 1. Visão Geral e Objetivos

O objetivo foi criar uma base sólida e performático.

*   **Next.js 15.3.2 (App Router):** Para renderização no servidor, Server Components, Server Actions e otimizações de build.
*   **React 19:** Para aproveitar as features mais recentes, como `useActionState`.
*   **TypeScript:** Para tipagem estática e maior manutenibilidade.
*   **Tailwind CSS & Shadcn/UI:** Para uma UI customizável, acessível e consistente, com foco no tema escuro e design minimalista solicitado.
*   **Arquitetura em Camadas:** Para separação de responsabilidades e escalabilidade (Apresentação, Aplicação/Features, Domínio (conceitual), Infraestrutura/Lib).
*   **Princípios SOLID:** Aplicados para guiar o design de componentes, serviços e actions.
*   **Server Actions:** Para mutações de dados e lógica de backend diretamente no servidor, simplificando a comunicação cliente-servidor.
*   **Validação com Zod:** Para garantir a integridade dos dados de entrada.

## 2. Estrutura do Projeto

*   `src/app/`: Contém as rotas (App Router), layouts e Server Actions globais.
*   `src/components/`: Componentes de UI reutilizáveis.
    *   `ui/`: Componentes Shadcn/UI.
*   `src/features/`: Módulos de funcionalidades de negócio (ex: `exemplo-cadastro`).
    *   `[feature_name]/components/`: Componentes React específicos da feature.
    *   `[feature_name]/actions.ts`: Server Actions da feature.
    *   `[feature_name]/services.ts`: Lógica de aplicação/casos de uso.
    *   `[feature_name]/validation.ts`: Esquemas de validação Zod.
    *   `[feature_name]/types.ts`: Tipos e interfaces da feature.
*   `src/lib/`: Utilitários, configurações, clientes de API, etc.
*   `src/domain/` e `src/infrastructure/`: Para lógica de domínio e implementações de persistência.

**Fluxo do Exemplo:**

1.  **UI (Client Component):** 
    *   Utiliza componentes Shadcn/UI (`Card`, `Input`, `Button`, `Label`).
    *   Emprega o hook `useActionState` (React 19) para gerenciar o estado da submissão do formulário (pendente, sucesso, erro) e exibir feedback ao usuário.
    *   Chama a Server Action.
2.  **Server Action:** `src/features/actions.ts`
    *   Recebe os dados do formulário.
    *   Valida os dados usando o schema Zod de `validation.ts`.
    *   Chama o `CadastroService` para processar a lógica de negócio.
    *   Retorna o estado atualizado para o Client Component.
    *   Utiliza `revalidatePath` para limpar o cache do Next.js, se necessário.
3.  **Serviço de Aplicação:** `src/features/services.ts`
    *   Encapsula a lógica de "negócio" 
    *   Demonstra a separação da lógica de orquestração da Server Action.
4.  **Validação:** `src/features/exemplo-cadastro/validation.ts`
    *   Define o schema de validação com Zod para os dados do formulário.
5.  **Tipos:** `src/features/exemplo-cadastro/types.ts`
    *   Define as interfaces e tipos para os dados do formulário, entidade e estado da action.

## 3. Boas Práticas e Considerações

*   **Server Components por Padrão:** A página (`page.tsx`) é um Server Component. O formulário (`CadastroForm.tsx`) é um Client Component (`"use client"`) devido à necessidade de interatividade e uso de hooks como `useActionState`.
*   **Performance:** Server Actions e a arquitetura do App Router são projetadas para performance. A revalidação de cache é utilizada para manter os dados atualizados.
*   **Acessibilidade:** Os componentes Shadcn/UI são construídos com acessibilidade em mente. Atributos `aria-*` foram usados no formulário para melhorar a experiência de leitores de tela.
*   **Responsividade:** O Tailwind CSS facilita a criação de layouts responsivos. O formulário de exemplo é responsivo.
*   **Manutenibilidade e Escalabilidade:** A arquitetura em camadas e a organização por features visam facilitar a manutenção e a adição de novas funcionalidades.
*   **Princípios SOLID:** Foram a base para a separação de responsabilidades entre os diferentes arquivos e módulos da feature de exemplo.

# Stack Tecnológica e Dependências Essenciais

Este documento define a stack tecnológica e as dependências principais para o projeto sênior do sistema de cartório, utilizando Next.js 15.3.2, Server Actions, arquitetura em camadas, princípios SOLID e Shadcn/UI.

## 4. Framework Principal e Linguagem

*   **Next.js:** `15.3.2` (App Router)
*   **React:** `19 RC` 
*   **React DOM:** `19 RC` 
*   **Linguagem:** TypeScript

## 5. Estilização e UI

*   **Tailwind CSS:** `v4.x` (Recomendado para as versões mais recentes do Next.js e Shadcn/UI)
    *   Dependências associadas: `postcss`, `autoprefixer`.
*   **Shadcn/UI:** Versão mais recente (`latest`). Os componentes serão adicionados individualmente via CLI (`pnpm dlx shadcn-ui@latest add [component]`).
*   **Ícones:** `lucide-react` (Biblioteca de ícones SVG leves, comumente usada com Shadcn/UI).
*   **Utilitários de Classe CSS:**
    *   `clsx`: Para construir strings de nomes de classe condicionalmente.
    *   `tailwind-merge`: Para mesclar classes Tailwind CSS sem conflitos de estilo (instalado automaticamente pelo Shadcn/UI).

## 6. Gerenciamento de Estado e Dados

*   **Server Actions:** Para mutações de dados e lógica do lado do servidor invocada pelo cliente.
*   **React `useActionState`:** (React 19) Para gerenciar o estado de transições de formulário com Server Actions (substitui `useFormState` experimental).
*   **React `useFormStatus`:** (React 19) Para obter informações de estado pendente de um formulário pai.
*   **SWR / React Query (TanStack Query):** Opcional para data fetching complexo no lado do cliente, mas com Server Actions e o cache do App Router, pode não ser estritamente necessário para todos os casos. A ser avaliado conforme a necessidade de estados de cache globais no cliente.

## 7. Validação de Dados

*   **Zod:** Para validação de esquemas de dados (ex: formulários, payloads de API, variáveis de ambiente).

## 8. Banco de Dados e ORM (Para Camada de Persistência)

*   **Prisma:** ORM para interagir com o banco de dados. Facilita a modelagem de dados e as queries.
*   **Driver de Banco de Dados:** Dependerá da escolha do banco (ex: `pg` para PostgreSQL, `mysql2` para MySQL, ou `sqlite3` para SQLite em desenvolvimento).

## 9. Ferramentas de Desenvolvimento e Qualidade de Código

*   **Gerenciador de Pacotes:** `pnpm` (Recomendado por sua eficiência e usado nos exemplos do Shadcn/UI).
*   **ESLint:** Para linting de código TypeScript e React, com configurações específicas para Next.js (`eslint-config-next`).
*   **Prettier:** Para formatação automática de código, garantindo consistência.
*   **Husky / lint-staged (Opcional):** Para executar linters e formatadores automaticamente antes dos commits.

## 10. Outras Dependências Potenciais (a serem consideradas conforme necessidade)

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


## 11. Como Executar o Projeto e Ver o Exemplo

1.  **Clone o repositório (se aplicável) ou navegue até o diretório do projeto:** 
2.  **Instale as dependências (se ainda não o fez):** `pnpm install`
3.  **Execute o servidor de desenvolvimento:** `pnpm dev`
4.  **Acesse no navegador:** Abra `http://localhost:3000/dashboard` 