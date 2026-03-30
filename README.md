# Boheme Café JF ☕

Bem-vindo ao repositório do **Boheme Café JF**, um projeto de site moderno, elegante e responsivo para uma cafeteria, desenvolvido com as tecnologias mais recentes do ecossistema React.

## 📌 Sobre o Projeto

O Boheme Café JF é uma landing page imersiva que apresenta a essência, o cardápio e o ambiente de uma cafeteria moderna e acolhedora. O site foi projetado com foco na experiência do usuário (UX) e em uma interface do usuário (UI) premium, utilizando animações suaves e um design responsivo.

O layout é composto por várias seções estratégicas:
- **Hero:** Uma introdução impactante, com possibilidade de vídeo de fundo.
- **A Essência:** A história e os valores do café.
- **Destaques do Chef:** Os produtos e criações mais especiais.
- **Menu:** O cardápio digital do estabelecimento.
- **O Ambiente & Galeria:** Uma visão imersiva do espaço físico.
- **Arte do Café:** Destaque para a especialidade barista.
- **Avaliações:** Prova social através do depoimento de clientes.
- **Eventos:** Experiências que acontecem no local.
- **Localização & Contato:** Como chegar à cafeteria.
- **Reserva:** Um formulário moderno e validado para agendamento de mesas.

## 🚀 Tecnologias e Ferramentas

Este projeto foi construído utilizando as seguintes tecnologias principais:

- **[Next.js 16](https://nextjs.org/):** Framework React para renderização e roteamento.
- **[React 19](https://react.dev/):** Biblioteca JavaScript para construção da interface.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Framework CSS utilitário para estilização rápida e responsiva.
- **[Framer Motion](https://motion.dev/):** Biblioteca principal para marcação e animações suaves na interface.
- **[Shadcn UI / Radix primitives]:** Componentes acessíveis como base de UI (`clsx`, `tailwind-merge`, `class-variance-authority`).
- **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/):** Para gerenciamento e validação no frontend do formulário de reservas.
- **[Lucide React](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/):** Iconografia.
- **[Embla Carousel](https://www.embla-carousel.com/):** Para criação dos sliders e carrosséis.

## 📦 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente na sua máquina:

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- Gerenciador de pacotes da sua preferência (npm, yarn, pnpm, bun)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd boheme-cafe-jf
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Acesse o site:**
   Abra [http://localhost:3000](http://localhost:3000) com o seu navegador para ver o resultado.

## 🏗️ Estrutura do Projeto

A estrutura de diretórios do projeto segue os padrões recomendados do Next.js (App Router):

- `/app`: Configurações de rotas (`page.tsx`, `layout.tsx`), estilos globais e outras convenções do Next.js.
- `/components`: Componentes reutilizáveis da interface da aplicação agrupados por seções (Hero, Menu, Environment, Reservation, etc).
- `/public`: Arquivos estáticos como imagens, vídeos, ícones e fontes.
- `/lib`: Utilitários e funções de suporte (ex: validações, formatação).
- `/data`: Dados estáticos da aplicação (mocks de itens de menu, avaliações, etc).
- `/docs`: Documentação adicional e anotações.

## 📜 Licença

Este projeto foi desenvolvido para fins de demonstração, aprendizado e portfólio. Estrutura baseada e gerada sob o ecossistema Next.js.
