# Keystone Operations Group — GHL Setup Blueprint

## Overview
This document outlines how to set up GoHighLevel (GHL) as the operational
backbone for Keystone Operations Group — covering client onboarding, portal
setup, flow management, and automated billing via Stripe.

---

## Step 1 — GHL Agency Account Setup

1. Sign up at gohighlevel.com for the **Agency Unlimited Plan** (~$297/mo)
2. Set your agency name to **Keystone Operations Group**
3. Upload your logo and set brand colors (teal #1a6b7c / navy #0d1f2d)
4. Set your agency domain (once you have keystoneoperationsgroup.net pointed)
5. Turn on white-label mode so clients never see "GoHighLevel"

---

## Step 2 — Connect Stripe for Billing

1. Inside GHL go to: Settings → Payments → Stripe
2. Connect your Stripe account (create one at stripe.com if not done)
3. Set up your recurring products:
   - Starter Monthly Support Plan — $297/mo
   - Growth Monthly Support Plan — $497/mo
   - Enterprise Monthly Support Plan — $697/mo
4. Set up one-time products:
   - Starter Setup Fee — $99
   - Growth Setup Fee — $159
   - Enterprise Setup Fee — $209
5. Set up à la carte products:
   - Simple Flow — $49
   - Medium Flow — $79
   - Complex Flow — $99
   - Software Integration — $199
   - Custom Reporting Dashboard — $149
   - Review Generation Campaign — $79
   - Re-engagement Campaign — $79

---

## Step 3 — Create a Sub-Account Template

Each client gets their own GHL sub-account. Build one master template
you clone for every new client so setup is consistent and fast.

**Template should include:**
- Welcome email/SMS sequence (day 1, day 3, day 7)
- Empty flow library (ready to populate per client)
- Client portal page (see Step 4)
- Default pipeline stages:
  - Lead → Contacted → Proposal Sent → Active Client → Churned
- Default tags:
  - starter-plan / growth-plan / enterprise-plan
  - flow-requested / flow-active / flow-paused

**When a new client signs up:**
1. Clone the master template
2. Rename the sub-account to their business name
3. Assign their plan tag
4. Activate their Stripe subscription
5. Send their portal login credentials

---

## Step 4 — Client Portal Setup

GHL's client portal gives each client a branded login page.

**What each client sees in their portal:**
- Active Flows (list of what's running for them)
- Request a Flow button (see Step 5)
- Current monthly total
- Billing history
- Support/contact button

**How to set it up:**
1. In GHL go to: Sites → Client Portal
2. Enable the portal for the sub-account
3. Brand it with Keystone logo and colors
4. Create a custom page called "My Flows" using GHL's page builder
5. List their active flows manually (update when new ones are added)
6. Add a "Request a Flow" button that links to a GHL form (see Step 5)

---

## Step 5 — Flow Request → Approval → Billing Workflow

This is the core operational loop. Here's how it works:

### Client Side
1. Client logs into portal
2. Clicks "Request a Flow"
3. Fills out a simple form:
   - What do you need automated? (dropdown of flow library options)
   - Any specific details?
   - Submit
4. Client sees confirmation: "We'll review your request and add it to
   your next invoice once complete."

### Keystone Side (You)
1. GHL sends you an internal notification — new flow requested
2. You review the request, determine complexity (simple/medium/complex)
3. Build the flow inside their sub-account
4. Once built and tested:
   - Add the flow to their "My Flows" page in the portal
   - In Stripe, add the flow as a recurring line item on their subscription
   - Send the client a confirmation: "Your new flow is live. It has been
     added to your Monthly Support Plan at $XX/mo."
5. Client's next invoice automatically reflects the new total

### Automation to Build Inside GHL
Trigger: Flow Request Form submitted
→ Send internal notification to you (email + SMS)
→ Send client confirmation email ("We received your request...")
→ Create a task assigned to you inside GHL with request details
→ Tag the client contact as "flow-requested"

When you mark the task complete:
→ Tag changes from "flow-requested" to "flow-active"
→ Send client a "Your flow is now live" email automatically

---

## Step 6 — Monthly Billing Logic

Each client's monthly charge is made up of:
- Base plan (Starter $297 / Growth $497 / Enterprise $697)
- + Any additional flows added (recurring per flow per month)

**Example:**
- Client on Growth plan ($497/mo)
- Requested 2 additional flows after signup ($79 + $49 = $128/mo added)
- Monthly total: $625/mo (automatically charged by Stripe)

Stripe handles this automatically once you add line items to their
subscription. No manual invoicing needed.

---

## Step 7 — Cancellation Process

When a client cancels:
1. Cancel their Stripe subscription immediately
2. Pause all active flows inside their GHL sub-account
3. Send a cancellation confirmation email (automated)
4. Archive their sub-account (do not delete — keep records)
5. Remove their portal access

GHL automation to build:
Trigger: Tag "cancelled" added to contact
→ Send cancellation confirmation email
→ Pause all workflows in their sub-account
→ Internal notification to you

---

## Step 8 — Reporting & Oversight

Inside your GHL agency dashboard you can see:
- All active client sub-accounts
- Which flows are running per client
- Any failed automations (so you can fix proactively)

In Stripe you can see:
- Monthly recurring revenue (MRR)
- Per-client billing breakdown
- Upcoming charges
- Failed payments (with automatic retry built in)

**Recommended: Check GHL dashboard weekly**
- Any failed flows → fix immediately (covered under support plan)
- Any flow requests pending → address within 48hrs

---

## Cost Summary (Your Side)

| Item | Cost |
|---|---|
| GHL Agency Unlimited | ~$297/mo |
| Stripe processing fee | 2.9% + $0.30 per transaction |
| Your domain (keystoneoperationsgroup.net) | ~$12/yr |
| Total fixed monthly overhead | ~$297/mo |

**Break-even:** 1 Growth client covers your GHL cost.
Every client after that is near-pure margin on the base plan.

---

## Quick Reference — Plan Limits

| Plan | Flows Included | Setup Fee | Monthly |
|---|---|---|---|
| Starter | 1 | $99 | $297 |
| Growth | 3 | $159 | $497 |
| Enterprise | 8 | $209 | $697 |

Additional flows (à la carte, added to monthly bill):
- Simple — $49/mo
- Medium — $79/mo
- Complex — $99/mo
