<div align="center">

# 🎓 Smart Student Onboarding Agent

### AI-Powered Personalized Guidance for Engineering Students

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*Making onboarding effortless, one conversation at a time*

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## 🎯 About The Project

**Smart Student Onboarding Agent** is an intelligent, AI-powered conversational assistant designed to revolutionize the student onboarding experience at engineering colleges. Built for **InnovGenius 2026**, this solution provides personalized, timely, and context-aware guidance to students throughout their entire onboarding lifecycle—from admission to the end of their first academic year.


## ❗ Problem Statement

Engineering colleges face significant challenges in student onboarding:

| Challenge | Impact |
|-----------|--------|
| **Fragmented Information** | Students navigate 5-7 different portals for various tasks |
| **Manual Processes** | Document verification, fee payment, course registration handled separately |
| **Communication Delays** | 25% of students miss critical deadlines due to poor notification systems |
| **High Administrative Load** | Staff overwhelmed with 100+ repetitive queries daily |
| **Poor Student Experience** | Only 65% onboarding completion rate; average time: 3+ weeks |

---

## 💡 Solution

An AI-powered conversational agent that transforms the onboarding experience:

```
┌─────────────────────────────────────────────────────────────────┐
│                    BEFORE vs AFTER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   BEFORE                          AFTER                         │
│   ──────                          ─────                         │
│   📱 5-7 Different Portals   →   📱 Single Unified Interface    │
│   ⏰ 3 Weeks Onboarding      →   ⏰ 1 Week Onboarding           │
│   📞 48hr Query Response     →   📞 Instant AI Response         │
│   📊 65% Completion Rate     →   📊 90% Completion Rate         │
│   😟 Confused Students       →   😊 Guided Journey              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🤖 AI Conversational Agent
- Natural language chat interface
- Context-aware responses using **RAG (Retrieval Augmented Generation)**
- Multi-turn conversation support with memory
- Personalized answers based on student profile (hosteler/day scholar, branch, quota)
- Human escalation for complex queries

### 📋 Smart Task Tracker
- Personalized onboarding checklist
- Visual progress tracking with percentage completion
- Task dependencies (e.g., fee payment → course registration)
- Status management: Pending → In Progress → Completed
- Deadline warnings and reminders

### 📄 Document Management
- Comprehensive document checklist with requirements
- Drag-and-drop file upload
- Real-time verification status tracking
- Rejection feedback with re-upload workflow
- Secure encrypted storage (AES-256)

### 🔔 Proactive Notifications
- Smart deadline reminders (3 days, 1 day, same day)
- Multi-channel delivery: In-app + Email
- Task completion confirmations
- Important announcements
- Configurable notification preferences

### 📊 Admin Dashboard
- Onboarding completion analytics
- Common query insights
- Document verification queue
- Escalated query management
- Student progress tracking

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────────┐     ┌─────────────────────────────────────────────────────┐   │
│   │   CLIENTS   │     │                   FRONTEND                           │   │
│   │  ─────────  │     │   Next.js 14 (App Router) + TypeScript              │   │
│   │  • Web App  │────▶│   Tailwind CSS + shadcn/ui                          │   │
│   │  • Mobile   │     │   Deployed on Vercel                                │   │
│   └─────────────┘     └─────────────────────────────────────────────────────┘   │
│                                          │                                       │
│                                          ▼                                       │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                           API LAYER                                      │   │
│   │   Next.js API Routes + tRPC (Type-safe APIs)                            │   │
│   │   Authentication: NextAuth.js / Clerk                                    │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                          │                                       │
│         ┌────────────────────────────────┼────────────────────────────────┐     │
│         ▼                                ▼                                ▼     │
│   ┌───────────────┐           ┌───────────────────┐           ┌───────────────┐ │
│   │   DATABASE    │           │    AI/RAG LAYER   │           │   STORAGE     │ │
│   │  ───────────  │           │   ─────────────   │           │  ───────────  │ │
│   │  PostgreSQL   │           │  Claude 3.5 API   │           │  Supabase     │ │
│   │  (Supabase)   │           │  Pinecone Vector  │           │  Storage      │ │
│   │  + Prisma ORM │           │  LangChain.js     │           │               │ │
│   └───────────────┘           └───────────────────┘           └───────────────┘ │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### RAG Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    User      │    │   Embedding  │    │   Vector     │    │   Context    │
│    Query     │───▶│  Generation  │───▶│   Search     │───▶│   Builder    │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                               │                    │
                                               ▼                    ▼
                                        ┌──────────────┐    ┌──────────────┐
                                        │  Knowledge   │    │   Claude     │
                                        │    Base      │    │  3.5 Sonnet  │
                                        └──────────────┘    └──────────────┘
                                                                   │
                                                                   ▼
                                                           ┌──────────────┐
                                                           │ Personalized │
                                                           │   Response   │
                                                           └──────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Beautiful, accessible components |
| **Zustand** | Lightweight state management |
| **React Hook Form + Zod** | Form handling & validation |
| **Framer Motion** | Smooth animations |

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | Serverless API endpoints |
| **tRPC** | End-to-end type-safe APIs |
| **Prisma** | Type-safe ORM |
| **NextAuth.js / Clerk** | Authentication |

### AI/ML
| Technology | Purpose |
|------------|---------|
| **Claude 3.5 Sonnet** | Primary LLM for responses |
| **LangChain.js** | RAG orchestration |
| **OpenAI Embeddings** | Text vectorization |
| **Pinecone** | Vector database |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **Vercel** | Frontend hosting & serverless |
| **Supabase** | PostgreSQL database & storage |
| **Upstash Redis** | Caching & rate limiting |
| **Resend** | Email notifications |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Git
- Supabase account
- Pinecone account
- Anthropic API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vibe-coders/smart-onboarding-agent.git
   cd smart-onboarding-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Ingest knowledge base** (for RAG)
   ```bash
   npm run ingest-knowledge
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
smart-onboarding-agent/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth routes (login, register)
│   │   ├── (dashboard)/          # Protected routes
│   │   │   ├── chat/             # AI Chat interface
│   │   │   ├── tasks/            # Onboarding tasks
│   │   │   ├── documents/        # Document upload
│   │   │   └── profile/          # Student profile
│   │   ├── admin/                # Admin dashboard
│   │   ├── api/                  # API routes
│   │   │   ├── chat/             # Chat endpoints
│   │   │   ├── tasks/            # Task CRUD
│   │   │   ├── documents/        # Upload handling
│   │   │   └── trpc/             # tRPC router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── chat/                 # Chat components
│   │   ├── tasks/                # Task components
│   │   └── shared/               # Common components
│   ├── lib/
│   │   ├── ai/                   # LangChain, RAG logic
│   │   │   ├── chains.ts
│   │   │   ├── prompts.ts
│   │   │   └── retriever.ts
│   │   ├── db/                   # Prisma client
│   │   ├── auth/                 # Auth utilities
│   │   └── utils/                # Helper functions
│   ├── server/
│   │   ├── routers/              # tRPC routers
│   │   └── trpc.ts               # tRPC setup
│   └── stores/                   # Zustand stores
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data
├── knowledge-base/               # RAG source documents
│   ├── policies/
│   ├── faqs/
│   └── procedures/
├── public/
├── docs/                         # Documentation
│   ├── 01_PRD_Smart_Student_Onboarding_Agent.md
│   ├── 02_Tech_Stack_Document.md
│   └── 03_Design_Document.md
├── tests/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📡 API Reference

### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI agent |
| GET | `/api/chat/history` | Get conversation history |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get user's task list |
| PATCH | `/api/tasks/:id` | Update task status |

### Document Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/documents/upload` | Upload document |
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id/status` | Check verification status |

---

## 🗺️ Roadmap

### Phase 1: MVP (Current) ✅
- [x] AI Chatbot with RAG
- [x] Student authentication
- [x] Onboarding task checklist
- [x] Document upload
- [x] In-app notifications
- [x] Basic admin dashboard

### Phase 2: Pilot (Q2 2026)
- [ ] Real ERP/LMS integrations
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Email/SMS notifications
- [ ] Mentor assignment module

### Phase 3: Scale (Q3 2026)
- [ ] Multi-tenant architecture
- [ ] Voice interface (Hindi + regional languages)
- [ ] Mobile app (React Native)
- [ ] Compliance training module
- [ ] White-label solution

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by **Vibe Coders** for **InnovGenius 2026**

[Report Bug](https://github.com/vibe-coders/smart-onboarding-agent/issues) • [Request Feature](https://github.com/vibe-coders/smart-onboarding-agent/issues)

</div>
