Projeto React com IA para Posts

Este projeto foi desenvolvido utilizando React e conta com aprimoramento de IA para a criação de posts. Além disso, ele está integrado a um banco de dados PostgreSQL via Supabase e utiliza NextAuth para autenticação com o Google.

Tecnologias Utilizadas

- React.js

- Next.js

- Tailwind CSS

- Prisma ORM

- Supabase (PostgreSQL)

- OpenAI API

- NextAuth.js (Autenticação com Google)

Configuração do Ambiente

1. Instalar as dependências

yarn install
# ou
npm install

3. Configurar variáveis de ambiente

Crie um arquivo .env.local na raiz do projeto e adicione as seguintes chaves:

DATABASE_URL="sua_url_do_postgresql"
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
OPENAI_API_KEY="sua_chave_openai"
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
NEXTAUTH_SECRET="uma_chave_segura"

4. Rodar as migrações do banco de dados

npx prisma migrate dev

5. Executar o projeto

yarn dev
# ou
npm run dev

O projeto estará disponível em http://localhost:3000.

Página de Posts com IA

A página de posts permite aos usuários criarem postagens utilizando um aprimoramento de IA baseado na API da OpenAI. A IA pode sugerir melhorias para os textos inseridos.

Funcionalidades:

Criação e edição de posts

Sugestões e aprimoramento de texto com IA

Autenticação com Google

Listagem de posts