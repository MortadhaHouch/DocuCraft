# 🚀 DocuCraft

DocuCraft is a modern, collaborative document workspace built with Next.js and TypeScript. It provides real-time co-editing, a powerful rich-text editor, document management, and integrations to help teams create, share, and manage content seamlessly.

## ✨ Key Features

- Real-time collaboration (Yjs / Hocuspocus provider)
- Rich text editing with Tiptap (extensions for images, tables, links, code blocks)
- Document management: create, organize, archive, and permanently delete documents (Trash)
- Access controls and sharing (team invites, document sharing links)
- Version history and conflict-free editing
- Responsive UI with light/dark themes
- Export / download documents (PDF, DOCX)
- Live presence and cursor indicators
- WebSocket-backed synchronization and optional Redis support

## 🛠 Tech Stack

- ### Frontend

- Next.js (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Shadcn/ui + Radix primitives for accessible UI
- Tiptap (rich text editor) and Lexical utilities
- Framer Motion for UI animations
- Lucide React / Tabler Icons for icons

- ### Real-time & Collaboration

- Yjs for CRDT-based document syncing
- Hocuspocus (provider / server) and y-websocket / y-webrtc for peers
- WebSocket server for presence and real-time events

- ### Backend & Data

- Node.js runtime
- PostgreSQL with Prisma ORM
- Prisma migrations (schema and migration files are in `prisma/migrations`)
- Optional Redis integration (present in `redis/`)

- ### Auth & Security

- NextAuth.js (or custom JWT-based auth per repo utilities)

- ### Dev / Build Tools

- Vite/Turbopack (Next dev/build with Turbopack flags)
- ESLint, Prettier, TypeScript
- Docker + Docker Compose for local development

## ⚙️ Project Scripts

Key scripts (see `package.json`):

- `npm run dev` — run Next.js dev server
- `npm run dev:all` — starts WebSocket server and Next dev in parallel
- `npm run build` — production build
- `npm run start` — run production server
- `npm run migrate` — run Prisma migrations
- `npm run studio` — open Prisma Studio

## 🚀 Getting Started (Local)

Prerequisites:

- Node.js 18+ (LTS recommended)
- npm
- PostgreSQL (or a hosted provider)

Quick start:

1. Clone the repo

   ```bash
   git clone https://github.com/MortadhaHouch/DocuCraft.git
   cd DocuCraft
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Copy environment variables and edit `.env.local` (or use `.env`)

   ```bash
   cp .env.example .env.local
   ```

   Required variables (examples):

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/docucraft?schema=public"
   NEXTAUTH_SECRET="replace-with-a-secure-secret"
   NEXTAUTH_URL="http://localhost:3000"
   # Optional: REDIS_URL, HOCUSPOCUS_* settings
   ```

4. Run migrations & generate Prisma client

   ```bash
   npm run migrate
   npm run studio # optional to inspect data
   ```

5. Start the app (and WebSocket server if needed):

   ```bash
   npm run dev:all
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

There is Docker support for spinning up the app and a Postgres instance via compose. Use:

```bash
docker compose up --build
```

This will build the app image and start required services.

## 📁 Project Structure (high level)

```text
src/
├── app/                # Next.js App Router pages & layouts
├── auth/               # Authentication actions and components
├── components/         # Reusable UI components (shadcn/ui wrappers)
├── lib/                # Utilities, helpers, and server utilities
├── prisma/             # Prisma schema & migrations
├── redis/              # Redis helpers/config
└── styles/             # Global styles and theme
```

## 🧭 Where to look

- Realtime server: `src/lib/ws-server.ts` and the `redis/` utilities
- Editor integrations: `src/lib/tiptap-utils.ts`, `@tiptap` extensions in `package.json`
- Auth: `src/auth/actions`

## 🤝 Contributing

Contributions welcome — please open issues or PRs. See `CONTRIBUTING.md` for guidelines.

## 📄 License

MIT — see the `LICENSE` file.

## 📬 Contact

Project maintainer: Mortadha Houch — [mortahouch123@gmail.com](mailto:mortahouch123@gmail.com)

Repository: [https://github.com/MortadhaHouch/DocuCraft](https://github.com/MortadhaHouch/DocuCraft)

