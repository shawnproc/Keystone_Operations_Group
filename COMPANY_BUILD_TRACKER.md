# Keystone Operations Group — Company Build Tracker

Last Updated: June 2026

---

## Legend
- ✅ Complete
- 🔄 In Progress
- ⬜ Not Started
- 🔒 Blocked (waiting on something)

---

## PHASE 1 — Foundation

### Brand & Identity
- ✅ Company name decided — Keystone Operations Group
- ✅ Logo created
- ✅ Brand colors defined (teal #1a6b7c / navy #0d1f2d)
- ✅ Brand guidelines document created
- ✅ Email signature block defined (see BRAND_GUIDELINES.md)
- ✅ QR code created (qr-code.png — links to keystoneoperationsgroup.net)

### Legal & Business Setup
- ✅ Business entity formed (LLC)
- ✅ EIN obtained
- 🔄 Business bank account opened (Navy Federal) — submitted, pending review
- ✅ Business email set up:
  - ✅ Google Workspace account created ($6/mo)
  - ✅ ops@keystoneoperationsgroup.net — primary/internal (GHL, Stripe, GitHub, all ops)
  - ✅ info@keystoneoperationsgroup.net — customer facing (contact form only)
  - ✅ Formspree updated to send to info@
  - ✅ GHL notifications pointed to ops@
  - ✅ Stripe registered with ops@
- ✅ Terms of service written
- ✅ Privacy policy written
- ✅ Client service agreement / contract written
- ✅ Refund policy defined (setup fee non-refundable; monthly plan cancel anytime, no contract)
- ✅ Stripe dispute / chargeback policy documented

### Domain & Hosting
- ✅ Domain purchased (keystoneoperationsgroup.net)
- ✅ GitHub repo created
- ✅ GitHub Pages live
- ✅ Custom domain pointed to GitHub Pages (Cloudflare DNS)
- ✅ SSL certificate active (HTTPS / padlock confirmed)

---

## PHASE 2 — Website

### Core Pages & Sections
- ✅ Hero section (with video background)
- ✅ About section
- ✅ Services section
- ✅ Smarter Operations section (automation focused)
- ✅ Who We Help section (service industries)
- ✅ Our Process section (5-step flow)
- ✅ Pricing section (3 tiers + à la carte)
- ✅ Why Keystone section
- ✅ Contact section
- ✅ Footer
- ✅ Terms of Service page
- ✅ Privacy Policy page
- ✅ Terms & Privacy links added to footer

### Functionality
- ✅ Contact form connected to Formspree (emails to info@)
- ✅ Pricing hover tooltips explaining each feature
- ✅ Mobile responsive design
- ✅ Scrolling industry ticker
- ✅ Founding Member banner on pricing
- ⬜ Demo videos embedded on pricing page (1 per tier)
- ✅ AI chat widget installed (GHL powered)
- ✅ Checkout / payment flow connected (GHL + Stripe) — Get Started buttons live on website, payment links wired, Payment Received trigger active
- ✅ Client portal link added to navigation

### Content Still Needed
- ⬜ Real stats added back (once earned)
- ⬜ Testimonials section (once first clients are in)
- ⬜ Case studies (once results exist)
- ⬜ Blog / resources section (optional)

---

## PHASE 3 — Operations (GHL Setup)

### Account Setup
- ✅ GHL Agency account created (~$297/mo)
- ✅ GHL white-labeled with Keystone branding
- ✅ Agency domain connected (app.keystoneoperationsgroup.net)

### A2P & SMS Compliance
- ✅ A2P Brand registration — approved
- ✅ A2P Campaign registration — approved
- 🔄 CNAM registration — In Review
- 🔄 SHAKEN/STIR registration — In Review
- 🔄 Voice Integrity registration — submitted, pending review

### Intake Form
- ✅ Intake form built (fields complete)
- ✅ Payment section live (Stripe live mode active)
- ✅ SMS consent placeholders replaced with correct business name and use case
- ✅ Single intake form covers all plans (Plan dropdown captures Starter/Growth/Enterprise)

### Stripe & Billing
- ✅ Stripe account created
- ✅ Stripe connected to GHL
- ✅ All products created in Stripe (test mode)
- ✅ Recreate products in live mode — all 13 products and payment links created
  - ✅ Starter setup fee ($99)
  - ✅ Growth setup fee ($159)
  - ✅ Enterprise setup fee ($209)
  - ✅ Starter monthly ($297)
  - ✅ Growth monthly ($497)
  - ✅ Enterprise monthly ($697)
  - ✅ Simple flow ($49)
  - ✅ Medium flow ($79)
  - ✅ Complex flow ($99)
  - ✅ All à la carte add-ons
- ✅ À la carte products added to GHL Payments (for direct client invoicing)

### Client Portal
- ✅ GHL client portal enabled
- ✅ Portal branded with Keystone colors/logo
- ✅ Portal custom domain set (portal.keystoneoperationsgroup.net)
- ✅ App Permissions configured (Billing, Contracts, Shared Files enabled)
- ✅ Email notifications enabled (Invoice Created, Contract Created)
- ✅ Chat widget configured
- ✅ Copyright set
- ⬜ "My Flows" page built in portal
- ✅ "Request a Flow" form built (Sites → Forms)
- ✅ "Request a Flow" form link shared via welcome email (https://api.keystoneoperationsgroup.net/widget/form/FhEVJ2UO2nu9s2B1Wvjw)

### Master Template
- ✅ Master client sub-account template built (Keystone Client Pipeline)
- ✅ Template includes default pipeline stages (New Lead → Contacted → Proposal Sent → Payment Received → Onboarding → Active Client → Cancelled)
- ✅ Template includes default tags (new-lead, contacted, proposal-sent, payment-received, onboarding, active-client, flow-activated, cancelled, starter-plan, growth-plan, enterprise-plan, follow-up-needed)
- ✅ Template snapshot created (Keystone Client Template v1) — ready to apply to new sub-accounts

### Automation Flows (Internal — Keystone Operations)
- ✅ Payment confirmed → intake form sent (SMS + email) — confirmed working via GHL payment links
- ✅ Intake form submitted → internal notification + client confirmation
- ✅ Flow request submitted → internal task + client confirmation
- ✅ Flow activated → client notification email
- ✅ Cancellation → flows off + confirmation email
- 🔄 New lead → instant auto-reply SMS + email + 24hr/48hr follow-up — SMS blocked pending A2P full clearance
- ⬜ Chat widget → automated lead nurture workflow — needs rebuild; current workflows not triggering from Live Chat widget; goal is chatbot → email capture → payment link

### Payment Links
- ⬜ Recreate all 6 plan payment links inside GHL Payments (required for Payment Received trigger to fire)
- ✅ $1 test GHL payment link confirmed working — Payment Received trigger fires correctly

### Pre-Launch Checklist
- ⬜ Full end-to-end spot check of entire business before go-live — every workflow, every form, every email, every page, top to bottom

---

## PHASE 4 — AI & Training

### Hermes (Internal AI)
- ⬜ Hermes trained on SERVICES_OVERVIEW.md
- ⬜ Hermes trained on CLIENT_ONBOARDING_SOP.md
- ⬜ Hermes trained on GHL_SETUP_BLUEPRINT.md
- ⬜ Hermes trained on pricing and flow library
- ⬜ Hermes tested on common client questions

### GHL Chat Widget (Client-Facing AI)
- ✅ GHL AI chat widget installed on website (Live Chat widget — id: 6a28bf4a7b092d06b912a842)
- ✅ AI bot trained on services, pricing, objection handling, FAQs
- ✅ AI bot responding correctly to prospect questions
- ✅ Bot set to Auto-Pilot on all channels
- ⬜ Chat → automated email follow-up workflow — needs rebuild from scratch
- ⬜ Chat → payment link flow (goal: bot qualifies lead → sends GHL payment link directly in chat)

---

## PHASE 5 — Demo Videos

- ⬜ GHL test account set up with dummy flows
- ⬜ Starter demo recorded (demo-starter.mp4)
- ⬜ Growth demo recorded (demo-growth.mp4)
- ⬜ Enterprise demo recorded (demo-enterprise.mp4)
- ⬜ Videos uploaded to repo or hosting
- ⬜ Videos embedded on pricing page

---

## PHASE 6 — First Clients

- ⬜ Full end-to-end test run (sign up as fake client, go through entire process)
- ⬜ First real client onboarded
- ⬜ First flow built and activated for real client
- ⬜ First payment received
- ⬜ First flow request handled through portal
- ⬜ First testimonial collected
- ⬜ Real stats added back to website

---

## PHASE 7 — Growth & Marketing

- ⬜ Google Business Profile created
- ⬜ LinkedIn company page created
- ⬜ Referral program built (incentive for client referrals)
- ⬜ 5 active clients
- ⬜ 10 active clients
- ⬜ GHL cost covered by client revenue
- ⬜ Testimonials section live on website
- ⬜ Case studies written (1 per industry served)
- ⬜ Pricing increased for new clients (founding members stay locked)
- ⬜ Evaluate custom client portal build

---

## PHASE 8 — Business Administration

- ⬜ Bookkeeping system set up (Wave — free, or QuickBooks)
- ⬜ Separate business bank account actively used for all revenue/expenses
- ⬜ Monthly revenue tracked vs GHL overhead
- ⬜ Quarterly tax estimates set aside
- ⬜ Annual review — pricing, services, growth goals

---

## Documents in This Repo

| File | Purpose |
|---|---|
| SERVICES_OVERVIEW.md | What we sell, flow pricing, tier breakdown, policies |
| GHL_SETUP_BLUEPRINT.md | Step-by-step GHL + Stripe setup guide |
| CLIENT_ONBOARDING_SOP.md | Full client journey from lead to live flows |
| DEMO_VIDEO_GUIDE.md | Script and instructions for tier demo videos |
| BRAND_GUIDELINES.md | Logo usage, colors, fonts, voice, email signature |
| GROWTH_STRATEGY.md | Target industries, first outreach message, first client strategy, rank and rent model |
| GO_LIVE_PLAN.md | Day-by-day plan to go live within one week |

---

## What's Next Right Now

1. ✅ Form LLC and get EIN
2. ✅ Point domain to GitHub Pages (Cloudflare DNS fixed)
3. ✅ SSL certificate confirmed active
4. ⬜ Open business bank account (Navy Federal)
5. ✅ Write Terms of Service + Privacy Policy (website legal pages)
6. ✅ Write Client Service Agreement
7. ⬜ Set up GHL agency account
8. ⬜ Create Stripe account and connect to GHL
9. ⬜ Record demo videos
10. ⬜ Train Hermes and GHL AI on all documents
