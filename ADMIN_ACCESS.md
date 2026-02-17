# Admin dashboard access

## How to access

1. **URL:** Open your site and go to:
   ```
   https://your-domain.com/admin
   ```
   For local development:
   ```
   http://localhost:3000/admin
   ```

2. **Login:** If you’re not logged in, you’ll be redirected to:
   ```
   /admin/login
   ```

3. **Default credentials (after seeding):**
   - **Email:** `admin@drshealth.com`
   - **Password:** `admin123`

   **Important:** Change this password after first login (e.g. via Settings when implemented, or by updating the database).

## First-time setup

1. Set environment variables (e.g. in `.env`):
   - `DATABASE_URL` – PostgreSQL connection string (Supabase works)
   - `NEXTAUTH_SECRET` – random string for session signing (e.g. `openssl rand -base64 32`)
   - `NEXTAUTH_URL` – full URL of your app (e.g. `http://localhost:3000` for dev)

2. Apply the database schema:
   ```bash
   npx prisma db push
   ```

3. Seed the admin user:
   ```bash
   npm run db:seed
   ```

4. Start the app and go to `/admin` (or `/admin/login`).

## Dashboard sections

- **Dashboard** – Lead analytics, recent leads, conversion.
- **Leads** – List, filters, search; **Add lead** (manual entry with source & category); open a lead for notes, status, WhatsApp, and **sample tracking**.
- **Automations** – Rules to send WhatsApp when new leads are created.
- **Products** – Product list (mock; ready for Shopify).
- **Content** – Hero banners, best sellers.
- **Settings** – Placeholder for integrations.

## Sample tracking (leads)

On a lead’s detail page you can:

- **Add sample** – Record a sample sent to that lead.
- **Update status** – Pending → Sent → In transit → Delivered / Failed.
- **Tracking ref** – Store courier/tracking ID.
- **Notify on WhatsApp** – Send the lead a message with current sample status and tracking (e.g. “Your sample has been dispatched” / “delivered”).
