# Premium Furniture

Premium Furniture is a React e-commerce storefront for browsing and ordering curated furniture. It includes product discovery, product details, wishlist and cart management, checkout flows, customer account pages, order history, contact forms, and custom furniture requests.

## Features

- Browse products by category with product filters and detail pages.
- Add products to a persistent cart and wishlist.
- Review cart totals and complete the checkout and payment flow.
- View orders, order confirmation, and account pages.
- Submit contact messages and custom furniture requests through Supabase.
- Responsive interface built with Tailwind CSS and reusable React components.
- Local sample product, category, and testimonial data for development.

## Tech Stack

- React 18
- React Router 6
- Create React App and `react-scripts`
- Tailwind CSS and PostCSS
- Supabase JavaScript client
- Lucide React and React Icons

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Supabase is optional for browsing the storefront. Add a `.env` file in the project root to enable contact and custom furniture submissions:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

Do not expose a Supabase service-role key in the frontend. Only use the public anon key in `REACT_APP_SUPABASE_ANON_KEY`.

### Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor.
3. Create the private Storage buckets `product-images` and `custom-request-images` if those workflows are enabled.
4. Add the project URL and anon key to `.env`.

The schema includes profiles, products, categories, product images, delivery zones, orders, order items, contact messages, and custom furniture requests, along with row-level security policies.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm test` | Run the Create React App test runner. |
| `npm run eject` | Eject from Create React App. This is irreversible. |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/shop` | Product catalog |
| `/shop/:id` | Product details |
| `/custom-furniture` | Custom furniture request form |
| `/about` | About the business |
| `/contact` | Contact form |
| `/wishlist` | Saved products |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/payment` | Payment step |
| `/order-confirmation` | Confirmation page |
| `/orders` | Customer order history |
| `/account` | Customer account |

## Project Structure

```text
src/
  components/   Reusable UI grouped by feature
  context/      Cart and wishlist state providers
  data/         Local product, category, and testimonial data
  lib/          Supabase client configuration
  pages/        Route-level page components
  services/     Backend-facing services
  assets/       Local images and icons
supabase/
  schema.sql    Database schema and row-level security policies
```

Cart and wishlist items are persisted in `localStorage`, so they remain available after a browser refresh. Product and category content currently comes from the files in `src/data/`.

## Production Build

Build the application with:

```bash
npm run build
```

Deploy the generated `build/` directory to a static hosting provider. Configure the same Supabase environment variables in the hosting provider's build environment when backend-backed forms are required. Because this is a client-side React Router app, configure the host to serve `index.html` for unknown routes.
