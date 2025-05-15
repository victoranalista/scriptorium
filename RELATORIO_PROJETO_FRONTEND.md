# Relatório do Projeto Scriptorium Front-End: Sistema de Cartório

Este documento resume a estrutura, arquitetura e as decisões tomadas para o desenvolvimento do frontend do sistema de cartório, utilizando Next.js 15.3.2, Server Actions, arquitetura em camadas, princípios SOLID e Shadcn/UI.

## 1. Visão Geral e Objetivos

O objetivo foi criar uma base sólida e performática para o frontend, seguindo as diretrizes do usuário para um desenvolvimento moderno e de alta qualidade. As principais tecnologias e conceitos adotados incluem:

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

## 4. Boas Práticas e Considerações

*   **Server Components por Padrão:** A página (`page.tsx`) é um Server Component. O formulário (`CadastroForm.tsx`) é um Client Component (`"use client"`) devido à necessidade de interatividade e uso de hooks como `useActionState`.
*   **Performance:** Server Actions e a arquitetura do App Router são projetadas para performance. A revalidação de cache é utilizada para manter os dados atualizados.
*   **Acessibilidade:** Os componentes Shadcn/UI são construídos com acessibilidade em mente. Atributos `aria-*` foram usados no formulário para melhorar a experiência de leitores de tela.
*   **Responsividade:** O Tailwind CSS facilita a criação de layouts responsivos. O formulário de exemplo é responsivo.
*   **Manutenibilidade e Escalabilidade:** A arquitetura em camadas e a organização por features visam facilitar a manutenção e a adição de novas funcionalidades.
*   **Princípios SOLID:** Foram a base para a separação de responsabilidades entre os diferentes arquivos e módulos da feature de exemplo.

## 5. Como Executar o Projeto e Ver o Exemplo

1.  **Clone o repositório (se aplicável) ou navegue até o diretório do projeto:** 
2.  **Instale as dependências (se ainda não o fez):** `pnpm install`
3.  **Execute o servidor de desenvolvimento:** `pnpm dev`
4.  **Acesse no navegador:** Abra `http://localhost:3000/dashboard` 

## 6. Próximos Passos Sugeridos

*   Implementar a camada de persistência real (ex: com Prisma e um banco de dados PostgreSQL).
*   Desenvolver os formulários específicos do sistema de cartório (Nascimento, Casamento, Óbito, etc.) seguindo a arquitetura e o exemplo fornecido.
*   Implementar autenticação e controle de acesso (RBAC).
*   Adicionar testes unitários, de integração e E2E.
*   Refinar o design e a UX conforme necessário.

Este esqueleto de projeto e o exemplo prático fornecem uma fundação robusta e alinhada com as melhores práticas sênior para o desenvolvimento contínuo do sistema de cartório.

---

*Este relatório foi gerado como parte do processo de desenvolvimento e pode ser expandido e detalhado conforme o projeto evolui.*

