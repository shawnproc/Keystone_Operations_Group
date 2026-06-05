# Keystone Operations Group — Go-Live Plan

Last Updated: June 2026

---

## The Goal
Be live and actively outreaching to prospects within one week.
Hermes runs the business while you're at your 9-5. You check in at lunch
and after work. Everything else is handled automatically.

---

## Why Hermes Is Day 1 Priority

You have a 9-5 job. The moment outreach starts, responses will come in
during business hours when you're unavailable. Without Hermes:
- A prospect responds at 2pm → sits cold until 6pm → they moved on
- A client has a question → no answer → trust erodes
- A payment comes in → intake form doesn't go out → bad first impression

With Hermes running:
- Every response handled instantly, 24/7
- Every inbound call answered by GHL Voice AI
- Every conversation moved forward while you're at your desk at work
- You check ops@ at lunch, see a summary, take action only if money is involved

**Hermes is not Phase 2. Hermes is the business.**

---

## What Hermes Needs To Know

Train Hermes on all of the following before go-live:

### Services & Pricing
- SERVICES_OVERVIEW.md — full service breakdown, flow types, pricing tiers
- PAYMENT_LINKS.md — which link to send for which plan
- Founding member rates and what they mean

### Client Journey
- CLIENT_ONBOARDING_SOP.md — full process from lead to live flows
- How to handle someone who wants to sign up
- How to handle someone who has questions about pricing
- How to handle someone who wants to cancel

### Brand & Voice
- BRAND_GUIDELINES.md — tone, language, what we say and don't say
- Never say "AI-powered" — say "automated"
- Never say "retainer" — say "Monthly Support Plan"
- Never say "workflow buildout" — say "Business Process Setup"

### Objection Handling
- "I already have a system" → acknowledge, ask what it does, find the gap
- "It's too expensive" → break down cost per day, compare to one lost job
- "I need to think about it" → follow up at 24hr and 48hr automatically
- "I want to talk to someone" → acknowledge, offer to schedule a call with Rashawn

### What Hermes Should Never Do
- Never quote a price that isn't in the documents
- Never promise a feature that isn't in the service overview
- Never process a refund or make billing exceptions
- Never discuss internal operations or tooling
- Always escalate to Rashawn when money is in dispute

---

## Day 1 — GHL Setup + Hermes Trained

One long focused session. Everything in GHL, Hermes trained before bed.

**GHL:**
- [ ] White-label GHL with Keystone branding and domain
- [ ] Build master client sub-account template
  - [ ] Default pipeline stages
  - [ ] Default tags
  - [ ] Test and ready to clone
- [ ] Build all 8 internal automation flows:
  - [ ] New lead → instant auto-reply SMS/email
  - [ ] No response 24hr → follow-up
  - [ ] No response 48hr → final follow-up
  - [ ] Payment confirmed → intake form sent
  - [ ] Intake form submitted → internal notification + client confirmation
  - [ ] Flow request submitted → internal task + client confirmation
  - [ ] Flow activated → client notification email
  - [ ] Cancellation → flows off + confirmation email
- [ ] Build client portal
  - [ ] Enable and brand with Keystone colors/logo
  - [ ] "My Flows" page
  - [ ] "Request a Flow" form connected to billing
- [ ] Build intake form (with Stripe payment embedded at the end)
  - [ ] Pre-tagged per plan (Starter / Growth / Enterprise)
  - [ ] Collects business info, software used, problems to solve
  - [ ] Stripe payment at the bottom
- [ ] Set up GHL Voice AI for inbound calls to Keystone
- [ ] Load outbound SMS agent and test sequences

**Hermes:**
- [ ] Train on SERVICES_OVERVIEW.md
- [ ] Train on CLIENT_ONBOARDING_SOP.md
- [ ] Train on BRAND_GUIDELINES.md
- [ ] Train on pricing, payment links, and flow library
- [ ] Train on objection handling (see above)
- [ ] Test on 10 common prospect questions
- [ ] Test on 5 common client questions
- [ ] Confirm handoff to Rashawn triggers correctly

---

## Day 2 — Website Final Connections + Full End-to-End Test

- [ ] Wire Stripe payment links to "Get Started" buttons on pricing page
- [ ] Add client portal link to website navigation
- [ ] Run full end-to-end test as a fake client:
  - [ ] Click Get Started → fill intake form → pay
  - [ ] Confirm intake form triggers internal notification
  - [ ] Confirm client confirmation email fires
  - [ ] Confirm flows activate correctly
  - [ ] Confirm portal access works
  - [ ] Test a flow request through the portal
  - [ ] Test cancellation flow
  - [ ] Test Hermes on inbound contact form submission
  - [ ] Test GHL Voice AI on inbound call to Keystone number
- [ ] Fix anything that breaks
- [ ] Everything fires clean → business is live

---

## Day 3 — Outreach Starts

- [ ] Pull first prospect list from OutScraper
  - [ ] Target: HVAC, Pest Control, Plumbing, Landscaping, Electricians
  - [ ] Filter: 10-75 reviews, 3.5-4.4 stars, phone present
  - [ ] Location: [your target area]
- [ ] Set outbound SMS agent persona and opening message
- [ ] Load prospect list into GHL
- [ ] Launch first outbound SMS sequence
- [ ] Confirm Hermes handles all responses automatically
- [ ] Confirm automation fires correctly on responses

---

## Days 4-7 — Selling

- [ ] Hermes and GHL handle all conversations 24/7
- [ ] You check ops@ at lunch and after work
- [ ] You only step in when money is involved
- [ ] First client signed → onboarding flow triggers automatically
- [ ] Iterate on outreach messaging based on response patterns

---

## What Is NOT Being Built Right Now

- Demo videos — nice to have, not blocking
- Testimonials and real stats — come after first clients
- Blog / resources section — Phase 4+

---

## The One Thing Not To Rush

The end-to-end test on Day 2. That's the one session where you want to
catch everything that breaks before a real client does. Don't skip steps.
Go through it as if you're a real customer seeing it for the first time.
