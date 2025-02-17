# Template Admin

    É um template padrão de um painel de administração que pode ser usado como base para construção futura de diversos paineis administrativos.
    A ideia foi praticar o uso de Next.js, Tailwind e integração com firebase.

O painel estará disponivel em 

**Login**: padrao@teste.com
**Senha**: teste

## Como Rodar o Projeto

Para rodar o projeto, basta seguir esses passos:

1. **Clone o repositório:**

   ```bash
    git clone https://github.com/1mateusbarbozamartins/admin-template-next.git

2. **Instalar dependências e iniciar servidor:**

    npm install

    Você precisará criar um .env.local e passar para ele as suas variaveis do firebase

    ```bash
    NEXT_PUBLIC_FIREBASE_APIKEY=
    NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECTId=

    npm run dev

    O projeto estará disponivel em http://localhost:3000

## Sobre o projeto

- **Objetivo**: Ter um template reutilizavel no futuro para construção de qualquer painel administrativo de empresa,
    e praticar a utilização de Next.js, Tailwind e integração com Firebase.

## Tecnologias Usadas

Este projeto foi criado com:

- **Next.js**: Framework para a construção da aplicação web.
- **React**: Biblioteca para construção da interface de usuário.
- **Typescript**: Linguagem principal utilizada no projeto.
- **Tailwind**: Framework de design CSS
- **Firebase**: Utilizado para autenticação de usuarios