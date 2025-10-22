# 🚀 DocuCraft

A modern, collaborative document editor built with Next.js, TypeScript, and Tailwind CSS. DocuCraft brings powerful document editing capabilities with real-time collaboration features, beautiful UI, and seamless user experience.

## ✨ Features

- **Real-time Collaboration** - Work on documents simultaneously with others
- **Rich Text Editing** - Powerful WYSIWYG editor with formatting options
- **Dark/Light Mode** - Beautiful UI that respects user preferences
- **Document Management** - Create, edit, and organize your documents
- **Responsive Design** - Works on desktop and mobile devices
- **Secure Authentication** - Built-in user authentication and authorization
- **Version History** - Track changes and revert to previous versions

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Shadcn/ui, Radix UI
- **State Management**: React Query, Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Rich Text Editor**: Quill
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Real-time**: WebSockets (Socket.io)
- **API Routes**: Next.js API Routes

### Development & Deployment
- **Package Manager**: npm
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Docker**: Docker support for development and deployment
- **Hosting**: Vercel (Frontend), Vercel/Serverless (API), Supabase/Railway (Database)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 8.x
- PostgreSQL 14+
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MortadhaHouch/DocuCraft.git
   cd DocuCraft
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your configuration.

4. Set up the database:
   ```bash
   npm prisma migrate dev --name init
   ```

5. Generate Prisma client:
   ```bash
   npm prisma generate
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Support

DocuCraft comes with Docker support for easy development and deployment.

### Prerequisites
- Docker Desktop (or Docker Engine) installed
- Docker Compose (included with Docker Desktop)

### Development with Docker

1. Build and start the development containers:
   ```bash
   docker compose up --build
   ```
   This will:
   - Build the Next.js application
   - Set up the PostgreSQL database
   - Run database migrations
   - Start the development server

2. Access the application at [http://localhost:3000](http://localhost:3000)

### Production Build

1. Build the production image:
   ```bash
   docker build -t docucraft:latest .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 docucraft:latest
   ```

### Environment Variables

Make sure to set up the following environment variables in your `.env` file:

```env
DATABASE_URL="postgresql://user:password@db:5432/docucraft?schema=public"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## 🏗 Project Structure

```
src/
├── app/                    # App router pages and layouts
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn/ui components
│   ├── main/               # Main application components
├── lib/                    # Utility functions and hooks
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 📚 Documentation

For detailed documentation, please visit our [documentation website](https://docucraft-docs.vercel.app).

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework for the Web
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com) - Beautifully designed components
- [Prisma](https://prisma.io) - Next-generation Node.js and TypeScript ORM
- [Lexical](https://lexical.dev) - Extensible text editor framework
- [NextAuth.js](https://next-auth.js.org) - Authentication for Next.js

## 📬 Contact

Mortadha Houch - [@MortadhaHouch](https://twitter.com/MortadhaHouch) - mortahouch123@gmail.com

Project Link: [https://github.com/MortadhaHouch/DocuCraft](https://github.com/MortadhaHouch/DocuCraft)
