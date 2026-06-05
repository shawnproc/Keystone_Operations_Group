# Keystone Operations Group — Go-Live Plan

Last Updated: June 2026

---

## The Goal
Be live and actively outreaching to prospects within one week.

---

## Day 1 — GHL Everything

One long focused session. Get it all done.

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
- [ ] Confirm automation fires correctly on responses

---

## Days 4-7 — Selling

- [ ] Monitor responses coming in
- [ ] GHL AI handles all conversations
- [ ] You only step in when money is involved
- [ ] First client signed → onboarding flow triggers automatically
- [ ] Iterate on outreach messaging based on responses

---

## What Is NOT Being Built Right Now

- Hermes (internal AI) — build after first clients create real patterns to train on
- Demo videos — nice to have, not blocking
- Testimonials and real stats — come after first clients
- Blog / resources section — Phase 4+

---

## The One Thing Not To Rush

The end-to-end test on Day 2. That's the one session where you want to
catch everything that breaks before a real client does. Don't skip steps.
Go through it as if you're a real customer seeing it for the first time.
