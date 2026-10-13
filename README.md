# HabitFlow ⚡ — Painel de Produtividade & Hábitos

> Uma aplicação moderna de gestão de hábitos e tarefas desenvolvida com **Next.js (App Router)**, **Prisma ORM**, **Neon PostgreSQL** e **Tailwind CSS**.

🔗 **Live Demo:** [https://dashboar-habitos.vercel.app/](https://dashboar-habitos.vercel.app/)

---

## 🚀 Sobre o Projeto

O **HabitFlow** é um centro de produtividade pessoal desenhado para ajudar os utilizadores a manterem o foco nos seus objetivos diários. Permite criar, gerir e acompanhar o progresso de hábitos e tarefas pendentes através de uma interface limpa, responsiva e em tempo real.

---

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Linguagem:** TypeScript / JavaScript
- **Base de Dados:** PostgreSQL hospedada na [Neon](https://neon.tech/)
- **ORM:** [Prisma ORM](https://www.prisma.io/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Deploy:** [Vercel](https://vercel.com/)

---

## ✨ Funcionalidades Principais

- **Dashboard Interativo:** Painel de controlo principal com barra lateral (`Sidebar`), cabeçalho responsivo e grelha de conteúdo otimizada.
- **Gestão de Hábitos:** Criação de novos hábitos diários e registo de conclusão em tempo real.
- **Gestão de Tarefas:** Adição e controlo de tarefas pendentes do dia a dia.
- **Estatísticas Avançadas:** Cartões de métricas visuais com cálculo automático de percentagens de conclusão e barras de progresso dinâmicas.
- **Arquitetura Moderna:** Uso de Server Actions para mutações de dados diretas e eficientes sem APIs externas complexas.

---

## 📂 Estrutura do Projeto

```text
├── app/
│   ├── actions/          # Server Actions (hábitos e tarefas)
│   ├── globals.css       # Estilos globais e Tailwind
│   ├── layout.tsx        # Layout raiz da aplicação
│   └── page.tsx          # Página principal do Dashboard
├── components/           # Componentes UI reutilizáveis (Sidebar, Cards, Stats)
├── prisma/
│   └── schema.prisma     # Esquema da Base de Dados (Prisma)
└── lib/
    └── prisma.ts         # Instância global do Prisma Client
```

---

## ⚙️ Como Executar Localmente

Se quiseres clonar e correr este projeto no teu computador, segue estes passos:

### 1. Clonar o repositório
```bash
git clone https://github.com/o-teu-utilizador/dashboard-habitos.git
cd dashboard-habitos
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Cria um ficheiro chamado `.env` na raiz do projeto e adiciona a tua string de ligação à base de dados PostgreSQL (ex: Neon):
```env
DATABASE_URL="postgresql://utilizador:password@host/database?sslmode=require"
```

### 4. Sincronizar a Base de Dados (Prisma)
```bash
npx prisma db push
```

### 5. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Acede a `http://localhost:3000` no teu browser para veres a aplicação a funcionar.

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um programa intensivo de desenvolvimento web full-stack.