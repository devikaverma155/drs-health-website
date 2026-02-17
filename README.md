# DRS Health – Frontend

Production-grade healthcare ecommerce frontend for **DRS Health**, an Indian wellness brand. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, ready for Shopify headless integration.

## Tech stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Server Components by default, SEO-first
- Mobile-first responsive layout

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

- `app/(marketing)/` – Home, About, Services, Manufacturing & Quality, Blog, Contact
- `app/(shop)/` – Shop listing, Product dynamic route
- `app/api/` – API routes (e.g. `/api/consultation`)
- `components/` – UI and product components
- `layout/` – Header, Footer, Announcement bar
- `sections/` – Reusable homepage/content sections
- `lib/shopify/` – Shopify abstraction (mock data; swap for Storefront API later)
- `styles/` – Global CSS and design tokens

## SEO

- Metadata and OpenGraph via `generateMetadata`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- JSON-LD: Organization (global), Product (product pages)

## Shopify integration (planned)

`lib/shopify/` exposes:

- `getProducts()`, `getProduct(handle)` – products
- `createCart()`, `addToCart()` – cart (mock for now)

Replace the mock implementations with Shopify Storefront API calls when ready.

## Consultation form

POST `/api/consultation` with JSON body: `name`, `email`, `phone`, `message`. Validates and returns success (persist to CRM/email in production).

## Design

- Background: `#FFFFFF`
- Headings/body: `#000000` / `#000000CF`
- Primary CTA: black background, white text
- Secondary: outlined black
- Borders: `#0000000F`

---

© DRS Health
