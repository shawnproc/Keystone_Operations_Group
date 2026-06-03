# Keystone Operations Group — Client Onboarding SOP

## Overview
This document covers the full process from first contact to first flow
going live. The goal is a fully digital, self-serve experience — no
phone calls, no back and forth. Client signs up, pays, and we build.

---

## Stage 1 — Lead Acquisition

### How Leads Come In
- **Website form** — client fills out the contact form on keystoneoperationsgroup.net
- **AI outreach** — AI agent contacts a prospect and drives them to the website
  to book or sign up directly
- **Direct link** — website shared manually, prospect signs up on their own

### What Happens Immediately (Automated)
The moment a form is submitted:
1. GHL sends the prospect an instant email:
   - Subject: "We got your message — here's what happens next"
   - Body: Brief intro to Keystone, link to pricing page, link to a short
     demo video showing what their automation could look like
   - Sets the expectation: fully digital process, no calls needed
2. GHL creates a contact record for them in the pipeline
3. Internal notification sent to you

### If No Response in 24 Hours (Automated)
- Follow-up email: "Still thinking it over? Here's what our clients
  typically automate first..."
- Link back to pricing and demo

### If No Response in 48 Hours (Automated)
- Final follow-up: "We'd hate for you to keep missing leads.
  Here's how easy it is to get started..."
- Link to sign up directly

---

## Stage 2 — AI Handles Questions

### Goal
Any question a prospect asks before signing up should be answered
automatically by the AI — no waiting on you.

### Questions the AI Must Be Able to Answer

**About the service:**
- What exactly do you do?
- What is a Business Process Setup / flow?
- How long does setup take?
- Will this work for my type of business?
- What software do you use?
- Do I need any technical knowledge?
- Can I see an example of what this looks like?

**About pricing:**
- How much does it cost?
- What's included in each plan?
- What is the setup fee for?
- What is the Monthly Support Plan?
- What happens if I need more flows than my plan includes?
- What are the à la carte options?
- Are these prices going up?

**About the founding member rate:**
- What is a founding member rate?
- How long is my rate locked in?
- What will the price be for future clients?

**About billing:**
- When do I get charged?
- How does billing work?
- Can I add flows later and how does that affect my bill?
- What payment methods do you accept?

**About cancellation/support:**
- What happens if I cancel?
- Do I keep my flows if I cancel?
- What if something breaks?
- How do I get support?

**About results:**
- How fast will I see results?
- What kind of businesses do you work with?
- Can I see a demo?

### How to Set This Up in GHL
- Build a chat widget on the website powered by GHL's AI conversation feature
- Train it on this SOP, the SERVICES_OVERVIEW.md, and the pricing page
- Set fallback: if AI cannot answer → send email to info@keystoneoperationsgroup.net
  and notify prospect that a human will respond within 24hrs

---

## Stage 3 — Signup & Payment

### How It Works (Fully Digital)
1. Prospect visits the pricing page
2. They watch the demo video (embedded on website — shows what a live
   automation looks like for a service business)
3. They click "Get Started" on their chosen plan
4. They are taken to a GHL checkout page (white-labeled, Keystone branded)
5. They pay:
   - Setup fee (one-time): $99 / $159 / $209
   - First month of Monthly Support Plan: $297 / $497 / $697
6. Stripe processes payment
7. Confirmation email sent automatically

### What the Confirmation Email Includes
- Receipt of payment
- Welcome to Keystone Operations Group
- Link to the onboarding intake form (see Stage 4)
- Timeline: "We'll have your first flow live within X business days"
- Support email: info@keystoneoperationsgroup.net

---

## Stage 4 — Onboarding Intake Form

### Purpose
Collect everything needed to build the client's flows before touching
anything in GHL. No assumptions, no back and forth.

### Form Fields (sent via GHL after payment confirmed)

**Who Are They**
- Business name
- Owner / primary contact name
- Contact email
- Business type (dropdown: Pest Control / HVAC / Plumbing /
  Property Management / Landscaping / Other)
- How long have they been in business?
- Number of employees / technicians

**What They Have**
- What software are they currently using?
  (Jobber / ServiceTitan / QuickBooks / Google Calendar / None / Other)
- How are they currently handling leads? (phone, email, nothing)
- How are they currently scheduling jobs? (software, manually, other)
- Do they have an existing CRM? (yes/no — if yes, which one)

**What They Want**
- Which plan did they sign up for? (auto-filled from payment)
- What is their biggest operational pain point right now?
  (open text — this is gold for writing their flows)
- What does a typical customer journey look like for them?
  (new lead → booked → job done → follow-up)
- Are there specific moments where leads or customers fall through the cracks?
- What flow do they want set up first? (dropdown of flow library options)

**When They Need It**
- Is there a specific date they need to be operational by?
- Are there any upcoming busy seasons we should know about?

**Additional Notes**
- Anything else we should know about how your business runs?

### What Happens After Form Is Submitted
1. You receive the completed intake form via GHL notification + email
2. GHL tags the client as "onboarding-in-progress"
3. Client receives an automatic email:
   - "We received your intake form. We're now building your setup.
     You'll hear from us within [X] business days when your first
     flow is live."

---

## Stage 5 — Flow Build & Activation

### Your Process (Internal)
1. Review the intake form
2. Open the client's GHL sub-account (cloned from master template)
3. Build their first flow(s) based on their plan and intake answers
4. Test each flow end-to-end before activating
5. Activate flows
6. Update their portal "My Flows" page with what is now live

### Build Time Targets
- Starter (1 flow): 1 business day
- Growth (3 flows): 2-3 business days
- Enterprise (8 flows): 5-7 business days

### When Everything Is Live
Client receives an automatic email:
- Subject: "Your automation is live — here's what's running"
- Body:
  - List of every flow now active with a plain-English description
    of what each one does
  - How to log into their portal
  - How to request additional flows
  - Support contact: info@keystoneoperationsgroup.net
  - Reminder: "If anything ever stops working, we fix it — just
    email us and we'll handle it."

---

## Stage 6 — Ongoing Client Management

### Monthly
- Stripe automatically charges the client on their billing date
- If a new flow was added during the month, it is already reflected
  as a recurring line item on their Stripe subscription
- Client receives an automatic receipt from Stripe

### If a Flow Breaks
1. You are notified via GHL internal alert
2. Fix the flow inside their sub-account
3. Send the client an email: "We noticed one of your automations
   needed attention — it's been fixed. No action needed on your end."
4. No charge to the client

### If a Client Requests a New Flow
1. Client clicks "Request a Flow" inside their portal
2. They select from the flow library and submit
3. You receive a GHL notification + task
4. Build and activate within stated build time
5. Add the flow as a recurring line item in Stripe
6. Send activation email to client with updated monthly total

---

## Stage 7 — Cancellation

### If a Client Cancels
1. Cancel their Stripe subscription immediately
2. Send cancellation confirmation email:
   - "Your Keystone Monthly Support Plan has been cancelled.
     Your automations will be deactivated as of [date].
     If you ever want to return, your founding member rate
     will be honored within 30 days."
3. Deactivate all flows in their GHL sub-account
4. Archive their sub-account (do not delete)
5. Remove portal access

### Note on Founding Member Rate Grace Period
If a founding member cancels and wants to return within 30 days,
reinstate them at their original locked rate. After 30 days they
are treated as a new client at current pricing.

---

## Summary — Full Client Timeline

| Step | Action | Who | Timing |
|---|---|---|---|
| Lead comes in | Instant auto-reply sent | GHL (automated) | Immediate |
| No response | Follow-up emails | GHL (automated) | 24hr / 48hr |
| Questions | AI answers in chat | AI / GHL | Real-time |
| Signs up | Pays setup + first month | Client (self-serve) | On their timeline |
| Confirms payment | Intake form sent | GHL (automated) | Immediate |
| Completes intake | Build begins | You | Within 24hrs |
| Build complete | Flows activated, client notified | You + GHL | Per build targets |
| Monthly | Auto-billed, flows running | Stripe (automated) | Monthly |
| Flow request | Build + add to bill | You + Stripe | Within build targets |
| Cancellation | Flows off, access removed | You + GHL | Immediate |
