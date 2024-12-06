# React Hook Form Project

Este projeto é uma aplicação utilizando **React**, **React Hook Form**, **Zod** e **ZodResolver** para gerenciar formulários de cadastro e login. Ele permite o cadastro de novos usuários, login e acesso a um dashboard.

## Funcionalidades

- **Cadastro de Usuário**: Permite que o usuário crie uma conta fornecendo nome, e-mail e senha. O nome é formatado automaticamente para que a primeira letra de cada palavra seja maiúscula.
  
- **Validação de Formulário com Zod**: Utiliza a biblioteca Zod para validar e garantir que os dados inseridos nos formulários atendam aos requisitos especificados (por exemplo, e-mail válido, senha com mínimo de 6 caracteres, etc.).
  
- **Login de Usuário**: Permite que o usuário faça login com e-mail e senha. A autenticação é feita com base em dados simulados armazenados em uma API de mock. O login só é bem-sucedido se as credenciais corresponderem aos dados da API.

- **Redirecionamento após Login**: Após um login bem-sucedido, o usuário é redirecionado para a página do **Dashboard**, indicando que a autenticação foi bem-sucedida.

- **Navegação entre Páginas**: O sistema inclui navegação entre três páginas principais:
  - **Cadastro de usuário** (`/signup`): Página onde o usuário pode se cadastrar.
  - **Login** (`/react-hook-form`): Página onde o usuário insere suas credenciais para fazer login.
  - **Dashboard** (`/dashboard`): Página exibida após login bem-sucedido.

Essas funcionalidades garantem um fluxo básico de autenticação e gerenciamento de usuários dentro do sistema.

## Páginas

- `/signup`: Página para cadastro de novo usuário.
- `/react-hook-form`: Página para login de usuário existente.
- `/dashboard`: Página exibida após login bem-sucedido.

## Exemplo de Uso

1. Acesse a página de cadastro (`/signup`).
2. Preencha os campos de nome, e-mail e senha e clique em "Salvar".
3. Acesse a página de login (`/react-hook-form`), insira seu e-mail e senha.
4. Se o login for bem-sucedido, você será redirecionado para o dashboard.
