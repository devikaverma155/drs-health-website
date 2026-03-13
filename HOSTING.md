# Hosting & Security Checklist

Use this checklist when deploying (Vercel, Netlify, or other hosts).

## Environment variables (set on host, never commit)

- **`DATABASE_URL`** – PostgreSQL connection string (e.g. Supabase).
- **`NEXTAUTH_SECRET`** – Random string, e.g. `openssl rand -base64 32`.
- **`NEXTAUTH_URL`** – Full URL of your app, e.g. `https://yourdomain.com`.
- **`WC_CONSUMER_KEY`** – WooCommerce REST API key (server-only).
- **`WC_CONSUMER_SECRET`** – WooCommerce REST API secret (server-only).
- **`RAZORPAY_KEY_SECRET`** – Razorpay API secret (server-only).

Optional / public (safe to expose in client):

- **`NEXT_PUBLIC_SITE_URL`**, **`NEXT_PUBLIC_API_URL`** – Site/base URL.
- **`NEXT_PUBLIC_WC_API_URL`** – WooCommerce API base URL.
- **`NEXT_PUBLIC_WC_CHECKOUT_URL`** – Checkout page URL.
- **`NEXT_PUBLIC_RAZORPAY_KEY_ID`** – Razorpay key ID (used in browser).
- **`NEXT_PUBLIC_SUPABASE_URL`**, **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** – If using Supabase (anon key is designed for client use with RLS).

## Security

- **Never commit `.env` or `.env.local`** – They are in `.gitignore`. Use the host’s env UI or CLI.
- If `.env` was already committed: run `git rm --cached .env` and **rotate all secrets** (Razorpay keys, WooCommerce API keys, NEXTAUTH_SECRET); old values are in git history.
- Admin panel is protected by NextAuth (session) and middleware; only `/admin/login` is public.
- API error responses do not expose env var names or internal config.

## Build & runtime

- **Build**: `npm run build` (runs `prisma generate` then `next build`).
- **Database**: Ensure the host can reach your DB at build time if any pages need DB during SSG; otherwise runtime-only is fine.
- **WooCommerce**: Store (drshealth.in or your WC URL) must be reachable from the host for product/review/order APIs.

## After first deploy

1. Run `npm run db:seed` (or your migration/seed) against the production DB if needed.
2. Change the default admin password.
3. Confirm `NEXTAUTH_URL` matches the live URL (required for NextAuth).
