# Compliance Vault — Setup Guide

## Prerequisites
- Node.js 20+
- A Supabase account (free tier works): https://supabase.com
- A Stripe account: https://dashboard.stripe.com

## 1. Install Dependencies
```bash
cd compliance-vault
npm install
```

## 2. Set Up Supabase
1. Create a new project at https://supabase.com
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_initial_schema.sql`
3. Go to **Settings → API** and copy your Project URL and anon key

## 3. Set Up Stripe
1. Go to https://dashboard.stripe.com/products
2. Create 3 products with monthly prices:
   - **Starter** — $299/month
   - **Growth** — $699/month
   - **Enterprise** — $1,499/month
3. Copy the Price IDs for each (they start with `price_...`)
4. Set up a webhook endpoint pointing to `https://yourapp.com/api/webhooks/stripe`
   - Events to listen for:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `checkout.session.completed`

## 4. Configure Environment Variables
```bash
cp .env.local.example .env.local
```
Fill in all values in `.env.local` — see `.env.local.example` for required fields.

## 5. Run Locally
```bash
npm run dev
```
Open http://localhost:3000

## 6. Deploy (Railway recommended)
1. Push code to GitHub
2. Create new project at https://railway.app
3. Connect your GitHub repo, select the `compliance-vault` directory
4. Add all environment variables from `.env.local`
5. Railway auto-detects Next.js and deploys

## Domain
Point `app.compliancevault.io` to your Railway deployment URL.

## Architecture Notes
- **Auth**: Supabase Auth — signup triggers auto-create of `organizations` row
- **Data isolation**: Row Level Security (RLS) ensures customers only see their own data
- **Billing**: Stripe webhooks update `organizations.subscription_tier` automatically
- **AI layer**: Wire `ANTHROPIC_API_KEY` to enable AI report generation (Phase 2)
- **Alerts**: Wire `TWILIO_*` + `SENDGRID_*` for SMS and email deadline alerts
