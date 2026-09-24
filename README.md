# Manuel International Bank

A production-oriented digital banking platform built with a Next.js frontend, a NestJS API, PostgreSQL, and Docker.

## Overview

Manuel International Bank is a banking application template designed for robust customer onboarding, account management, transaction processing, and the foundation for digital finance experiences.

## Tech Stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS, App Router
- Backend: NestJS, TypeScript, Prisma ORM
- Database: PostgreSQL
- Infra: Docker Compose
- Security: environment validation, CORS, structured error handling, auth-ready architecture

## Repository Structure

```text
.
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   └── src/
│   └── web/
│       ├── app/
│       ├── components/
│       └── public/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

## Quickstart

### 1. Install root dependencies

```bash
npm install
```

### 2. Environment setup

Copy the example environment and update credentials:

```bash
cp .env.example .env
```

### 3. Run with Docker

```bash
docker compose up --build
```

This starts:

- PostgreSQL on port 5432
- NestJS API on port 3001
- Next.js frontend on port 3000

### 4. Manual setup

Frontend:

```bash
cd apps/web
npm install
npm run dev
```

Backend:

```bash
cd apps/api
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

## Default Credentials

A seeded demo account is included for local development.

- Email: demo@manuelbank.com
- Password: P@ssword123

## Production Considerations

- Use managed PostgreSQL in production
- Rotate secrets and JWT signing keys
- Add RBAC and MFA for staff/admin flows
- Add bank-grade rate limiting and audit logging
- Secure payment workflows with HSM-backed integrations
- Use transaction monitoring and fraud rules

## License

This project is provided as a starter platform for digital banking workflows.
