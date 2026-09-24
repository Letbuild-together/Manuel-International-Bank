# Manuel International Bank

A production-oriented digital banking platform built with a Next.js frontend, NestJS backend, PostgreSQL, and Docker.

## Features

- Secure customer registration and login
- JWT-based authentication with password hashing
- Transaction and account management APIs
- Customer portal with dashboard, account list, transfers, and statements
- PostgreSQL + Prisma data model for users, accounts, and transactions
- Docker Compose setup for local development

## Stack

- Frontend: Next.js 14, TypeScript, Tailwind
- Backend: NestJS, Prisma, PostgreSQL
- Database: PostgreSQL
- Runtime: Docker Compose

## Local Setup

1. Install project dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start database and application services:

```bash
docker compose up --build
```

4. For local app development:

```bash
npm run dev:web
npm run dev:api
```

## Demo Credentials

- Email: demo@manuelbank.com
- Password: P@ssword123

## API Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/accounts
- GET /api/transactions
- GET /api/users
