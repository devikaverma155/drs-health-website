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

## Fixing WooCommerce 403 Forbidden when deployed (e.g. on Vercel)

If you see `WooCommerce API error 403: Forbidden` in logs and products/categories don’t load:

1. **Use the correct API URL**
   - If your WordPress site is at **https://www.drshealth.in**, set:
     - `NEXT_PUBLIC_WC_API_URL=https://www.drshealth.in/wp-json/wc/v3`
   - If it’s at **https://drshealth.in** (no www), use:
     - `NEXT_PUBLIC_WC_API_URL=https://drshealth.in/wp-json/wc/v3`
   - No trailing slash. Must match the domain WordPress uses.

2. **WooCommerce REST API key**
   - In WordPress: **WooCommerce → Settings → Advanced → REST API**.
   - Create an API key with **Read** permission.
   - Copy **Consumer key** and **Consumer secret** into Vercel (or your host) as `WC_CONSUMER_KEY` and `WC_CONSUMER_SECRET` (same as in your local `.env`).

3. **Permalinks**
   - **Settings → Permalinks**: use any “pretty” structure (e.g. Post name). Plain permalinks can break the REST API.

4. **Security / firewall (WordPress or host)**
   - If you use a security plugin (Wordfence, Sucuri, etc.), it may block server requests from Vercel.
   - Allow the REST API path (e.g. `/wp-json/`) or allowlist Vercel’s IPs / disable “block server/bot” for that path.
   - On the WordPress host, ensure the server allows inbound requests to `https://yourdomain.com/wp-json/wc/v3/...` from the internet (no firewall blocking by IP for that path).

5. **Vercel**
   - In **Project → Settings → Environment Variables**, confirm `NEXT_PUBLIC_WC_API_URL`, `WC_CONSUMER_KEY`, and `WC_CONSUMER_SECRET` are set for **Production** (and Preview if you need products there).
   - Redeploy after changing env vars.
   - If your host has a “Firewall” or “Attack Challenge Mode”, allow outbound requests from your project to your WooCommerce domain.

6. **Quick test**
   - From your machine:  
     `curl -u "CONSUMER_KEY:CONSUMER_SECRET" "https://yourdomain.com/wp-json/wc/v3/products?per_page=1"`  
     (use the same URL as `NEXT_PUBLIC_WC_API_URL` and your key/secret). If this returns JSON, the block is likely between Vercel and WordPress (firewall/plugin).

## After first deploy

1. Run `npm run db:seed` (or your migration/seed) against the production DB if needed.
2. Change the default admin password.
3. Confirm `NEXTAUTH_URL` matches the live URL (required for NextAuth).
