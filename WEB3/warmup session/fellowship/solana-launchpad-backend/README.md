# Solana Token Launchpad Backend

This is a backend REST API for a Solana token launchpad, built with **Express.js**, **PostgreSQL**, and **Prisma**.

## Features

- User registration + JWT auth
- Launch creation + computed status (`UPCOMING`, `ACTIVE`, `ENDED`, `SOLD_OUT`)
- Whitelist management (creator-only)
- Referral codes with discount tracking
- Token purchases with tiered pricing, referral discounts, and per-user limits
- Vesting schedule calculations

## Setup

1. Copy `.env.example` to `.env` and fill in database values:

   ```sh
   cp .env.example .env
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Generate Prisma client and push schema to the database:

   ```sh
   npx prisma generate
   npx prisma db push
   ```

4. Start the server:

   ```sh
   npm start
   ```

By default, the server runs on `http://localhost:3000`.

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `POST /api/launches` — Create launch (auth)
- `GET /api/launches` — List launches (public)
- `GET /api/launches/:id` — Get launch (public)
- `PUT /api/launches/:id` — Update launch (creator)
- `POST /api/launches/:id/whitelist` — Add whitelist addresses (creator)
- `GET /api/launches/:id/whitelist` — Get whitelist (creator)
- `DELETE /api/launches/:id/whitelist/:address` — Remove address (creator)
- `POST /api/launches/:id/referrals` — Create referral code (creator)
- `GET /api/launches/:id/referrals` — List referral codes (creator)
- `POST /api/launches/:id/purchase` — Purchase tokens (auth)
- `GET /api/launches/:id/purchases` — List purchases
- `GET /api/launches/:id/vesting?walletAddress=...` — Vesting schedule
