
# Quikdev Project

## Stack Utilizada

Este projeto foi desenvolvido utilizando tecnologias modernas e práticas recomendadas no desenvolvimento de aplicações web, com foco em performance, segurança e escalabilidade.

### Linguagem e Framework
- **Node.js**: Versão 18.17.1 - Uma plataforma robusta para desenvolvimento de aplicações JavaScript no servidor, escolhida pela sua performance e vasto ecossistema.
- Utilizamos Node.js puro sem frameworks adicionais para demonstrar proficiência e conhecimento profundo em JavaScript e Node.js, alinhando-se aos princípios de clean architecture e S.O.L.I.D.
- **TypeScript**: Versão 4.x - Um superset de JavaScript que adiciona tipagem estática, escolhido para melhorar a qualidade do código e facilitar a manutenção.
- **Express**: Versão 4.18.3 - Um framework web para Node.js, escolhido por sua simplicidade, flexibilidade e vasta documentação.

### Banco de Dados
- **SQLite**: Um sistema de gerenciamento de banco de dados relacional leve, escolhido pela simplicidade e eficácia em projetos de teste ou desenvolvimento. Para produção ou sistemas mais robustos, recomenda-se a migração para sistemas como PostgreSQL para melhor desempenho e escalabilidade.

### Pacotes Adicionais
- **bcryptjs**: Para criptografia de senhas.
- **dotenv**: Para gerenciamento de variáveis de ambiente.
- **jsonwebtoken**: Para implementação de autenticação JWT.
- **multer**: Para upload de arquivos.
- **nodemailer**: Para envio de e-mails.
- **Swagger**: Para documentação da API.
- 
## Como Executar o Sistema
Siga estes passos para configurar e executar o sistema:

1. Certifique-se de ter o Node.js (versão 18.17.1) instalado.
2. Clone o repositório e acesse o diretório do projeto.
3. Execute `npm install` para instalar as dependências.
4. Configure o arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias (substitua os valores de exemplo pelos reais):
   ```
   ACCESS_TOKEN_SECRET='your_access_token_secret'
   MAIL_USER='your_email_username'
   MAIL_PASS='your_email_password'
   MAIL_SERVICE='your_email_service'
   MAIL_FROM='your_email_from_address'
   ```
6. Antes de iniciar o servidor, rode as migrations para criação do banco de dados `npm run migration:run`.
   ```
   Você poderá alterar o usuário e senha dentro do arquivo /migrations/1710685992283-SeedAdminUser.ts, caso não por padrão será gerado um admin sendo o email 'admin@example.com' e a senha '123'
   ```
7. Inicie o servidor de desenvolvimento com `npm run dev`.
8. (opcional) Caso queira compilar o projeto e rodar a versão de produção basta executar `npm run build` seguido de `npm start`.

## Acessando o Swagger
A documentação da API está disponível via Swagger UI:

- **URL**: `/docs` (acessível após iniciar o servidor)

Esta interface permite visualizar todas as rotas, parâmetros e testar a API diretamente pelo navegador.

### Motivação e Escolhas

O projeto foi desenvolvido como parte do processo seletivo para a posição de Tech Lead, visando demonstrar conhecimento técnico aprofundado, capacidade de tomar decisões de arquitetura e implementar melhores práticas de desenvolvimento.

A escolha da stack, incluindo o uso de Node.js puro e SQLite, foi estratégica para mostrar habilidade em trabalhar com a base da tecnologia, além de adotar uma abordagem que facilita a execução e avaliação do teste por revisores.

Seguindo os princípios de Clean Architecture e S.O.L.I.D, o projeto foi estruturado em camadas de entity, services, etc., visando um código organizado, modular e de fácil manutenção.

