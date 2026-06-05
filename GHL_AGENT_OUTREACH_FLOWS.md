# Keystone Operations Group — GHL Agent Outreach Flows

Last Updated: June 2026

---

## Overview

This document defines the full SMS outreach conversation flows for the
Keystone GHL agent. Every message is written to read like a real person
typed it from their phone. The agent has a persona name — set this before
activating any flows.

**Persona:** [AGENT FIRST NAME] from Keystone Operations Group
*(Choose a common, neutral first name — not "Keystone Bot" or anything
that signals automation. Example: Jordan, Marcus, Taylor, Alex.)*

---

## Ground Rules for the Agent

These rules govern how every message is written and timed.

**Voice**
- Short sentences. Two to four lines max per message.
- Contractions always — "I'll" not "I will", "don't" not "do not"
- Never use bullet points, numbered lists, or formal greetings in SMS
- "Hey" not "Hello" or "Hi there"
- Casual but sharp — sounds like someone who knows what they're talking
  about but isn't trying to impress anyone
- No exclamation points unless mirroring energy from their reply
- No emoji unless they use them first — then mirror sparingly
- Never say "I", "me", or anything that sounds scripted in response to
  a question about who this is — keep it natural

**Timing**
- Initial outreach: Monday–Friday, 9am–5pm only (prospect's local time)
- Never send on weekends for cold outreach
- Follow-up 1: 3 business days after initial, no response
- Follow-up 2: 5 business days after follow-up 1, no response
- After follow-up 2 with no response: stop. Do not contact again.
- Agent response time when they reply: 3–5 minutes
  *(Instant replies feel like a bot. 3–5 minutes feels like someone
  who picked up their phone between tasks.)*

**Handoff Rules**
- When a prospect shows clear interest, agent asks 1–2 qualifying
  questions, then tells them someone will reach out directly
- Agent immediately triggers an internal GHL notification to the owner
- Owner takes over the live conversation within 1 hour
- If owner hasn't responded in 1 hour, agent sends a single hold message:
  "Just wanted to make sure this didn't get lost — [Owner Name] will be
  reaching out to you shortly."
- Agent never discusses pricing. Ever. That's the owner's conversation.
- If the conversation goes off-script in a way the agent can't handle,
  flag immediately and go silent. Owner picks it up.

---

## The Outreach Sequences

Each industry tier has its own opener. All follow-ups are universal.

---

### SEQUENCE A — Emergency & After-Hours Trades
*(HVAC, Plumbing, Electrical, Garage Door, Locksmith, Restoration, Towing)*

**Message 1 — Initial Outreach**
> Hey [First Name], quick question — when someone calls [Business Name]
> after hours and hits voicemail, what happens to that lead? I help
> [industry] businesses set up a system that responds automatically so
> those calls don't just disappear. Worth a few minutes to talk through it?

**Message 2 — Follow-Up (Day 3, no response)**
> Hey [First Name], just following up on my last text. Didn't want it
> to get buried. Still happy to show you how it works if you're curious.

**Message 3 — Final Follow-Up (Day 8, no response)**
> No worries if the timing's off. I'll leave it here — if it's ever
> something you want to look at, just shoot me a text.

*(No further contact after Message 3.)*

---

### SEQUENCE B — Death, Injury & Trauma Businesses
*(Funeral Homes, Personal Injury Attorneys, Urgent Care, Bail Bondsmen,
Biohazard Cleanup, Grief Counselors)*

**Message 1 — Initial Outreach**
> Hey [First Name], I work with [industry] businesses on response time —
> specifically making sure no call or inquiry falls through the cracks,
> especially after hours. Most of the time it's a pretty quick fix.
> Worth a short conversation?

*Note: This tier gets a softer, less aggressive opener by design.
The industries are sensitive. No dramatic pain-point language.*

**Message 2 — Follow-Up (Day 3, no response)**
> Hey [First Name], just circling back on my last message. No pressure —
> just didn't want it to get lost. Happy to explain more if it's useful.

**Message 3 — Final Follow-Up (Day 8, no response)**
> I'll leave it here, [First Name]. If it's ever something worth
> looking at, you know where to find me.

*(No further contact after Message 3.)*

---

### SEQUENCE C — Appointment-Driven Businesses
*(Pest Control, Landscaping, Cleaning, Roofing, Salons, Real Estate,
Contractors, Chiropractors, Dental, Physical Therapy)*

**Message 1 — Initial Outreach**
> Hey [First Name], I help [industry] businesses stop losing leads to
> slow follow-ups and missed calls. Most of the owners I talk to don't
> even realize how many are slipping through until we map it out.
> Worth a quick conversation?

**Message 2 — Follow-Up (Day 3, no response)**
> Hey [First Name], just wanted to make sure this didn't get buried.
> Still happy to show you what I mean if you're curious.

**Message 3 — Final Follow-Up (Day 8, no response)**
> No worries at all. I'll leave it here — feel free to reach out
> anytime if it ever comes up.

*(No further contact after Message 3.)*

---

## Response Handling — Branches

These are the replies the agent is built to handle. Every branch ends
with either a graceful close or a handoff to the owner.

---

### Branch 1 — Positive / Interested
*Triggers: "yeah", "sure", "tell me more", "how does it work",
"interested", "what do you do", "what is it"*

**Agent Reply:**
> Appreciate you getting back to me. Real quick — how are you currently
> handling things when a call comes in after hours or you're tied up
> on a job? Just want to make sure what I show you actually fits.

**[They respond with their current situation]**

**Agent Reply:**
> Got it, that makes sense. Let me have [Owner Name] reach out to you
> directly — they can walk you through exactly what it looks like for
> a [industry] business. Should be in touch shortly.

**[Trigger internal notification to owner immediately]**
**[Owner takes over the conversation from here]**

---

### Branch 2 — Not Interested
*Triggers: "no thanks", "not interested", "we're good", "don't need it",
"remove me", "stop texting"*

**Agent Reply:**
> Totally fair, appreciate you getting back to me.
> Won't bother you again — good luck with everything.

**[End sequence. Remove from all future outreach lists.]**

*Note: If they say "remove me" or "stop" — that is an opt-out.
Treat it as a hard stop. No further contact, ever. GHL must be
configured to honor SMS opt-outs automatically.*

---

### Branch 3 — Who Are You / How'd You Get My Number
*Triggers: "who is this", "what is this", "how did you get my number",
"who are you"*

**Agent Reply:**
> Sorry for the out of nowhere text — [Agent Name] with Keystone
> Operations Group. We help service businesses set up automated
> response systems. Saw [Business Name] and thought it might be a fit.
> Happy to explain more or leave you alone — totally up to you.

**[Wait for response — branch from there based on their reply]**

---

### Branch 4 — How Much Does It Cost
*Triggers: "how much", "what's the price", "what does it cost",
"is it expensive"*

**Agent Reply:**
> Honestly depends on what you need — there's no set number without
> knowing your situation first. Before I throw any prices at you,
> worth making sure it even makes sense for your business. What does
> your current process look like when a new lead comes in?

**[They respond — qualify, then hand off to owner if interested]**

---

### Branch 5 — Already Have Something
*Triggers: "already have something", "we use [tool]", "we have a system",
"we're already set up"*

**Agent Reply:**
> That's good to hear — what are you using if you don't mind me asking?
> Not trying to pick it apart, genuinely curious if it's covering the
> after-hours piece too or if that's still a gap.

**[If they have a full solution:]**
> Makes sense, sounds like you're in good shape. I'll leave you to it —
> good luck with everything.

**[If they admit a gap:]**
> Yeah that's usually where it breaks down. Worth a quick conversation
> to see if we can fill that piece. Let me have [Owner Name] reach
> out to you directly.

**[Trigger handoff if gap confirmed]**

---

### Branch 6 — Off-Script / Unrecognized Reply
*Triggers: anything the agent can't clearly categorize*

**Action:** Flag conversation to owner immediately. Agent sends nothing.
Owner reviews and decides whether to respond personally.

*Never have the agent guess at a response when the message is unclear.
Silence is better than the wrong reply.*

---

## The Review Angle — Standalone Sequence

Use this as a separate outreach sequence when the prospect's Google
review count is visibly low or stagnant. Works across all tiers.

**Message 1:**
> Hey [First Name], noticed [Business Name] has [X] reviews on Google.
> Your closest competitor down the street has [Y]. Most customers
> decide who to call before they ever pick up the phone — just based
> on that number. I fix that automatically. Worth a quick conversation?

**Message 2 (Day 3, no response):**
> Hey [First Name], just following up. The review gap between you and
> [Competitor] is real — happy to show you how we close it automatically
> if you're curious.

**Message 3 (Day 8, no response):**
> I'll leave it here. If it ever becomes something worth looking at,
> feel free to reach out anytime.

---

## Internal Notification Template (Owner Alert)

When the agent triggers a handoff, this is the internal GHL notification
sent to the owner:

> **New Warm Lead — Take Over Now**
> Name: [Contact First Name] [Last Name]
> Business: [Business Name]
> Industry: [Tag]
> Last message from them: [Last Reply]
> Conversation thread: [Link to GHL conversation]
> Action needed: Jump into this thread and continue the conversation
> personally. They're expecting a follow-up from [Owner Name].

---

## Owner Closing Framework

This picks up the moment the agent hands off a warm lead.
Everything from here is the owner — not the agent.

---

### Step 1 — Take Over the Thread

Jump into the same SMS thread the agent started. Don't open a new
conversation, don't call out of nowhere. Continue naturally.

> "Hey [First Name], [Owner Name] here — [Agent Name] passed me your
> info. Quick 60 second video that shows exactly what I was talking
> about. [link] — let me know what you think."

Send the video. Then stop. Wait for them to respond.
Don't follow up in 10 minutes. Give it some room.

---

### Step 2 — They Watch It, They Respond

When they reply — even if it's just "interesting" or "not bad" —
that's your green light. Lead with the punchline.

**The Opener:**
> "Glad it made sense. Real question — what's a missed call or a
> lead that doesn't get followed up actually worth to your business?
> Like if you had to put a number on it."

Let them answer. Don't fill the silence. Whatever number they say,
it doesn't matter — the frame is already set. They just told you
what the problem costs them.

---

### Step 3 — Validate and Connect

Once they give you a number, tie it directly to what they just saw.

**If they give a specific number (e.g. "probably $300-400 a job"):**
> "Yeah that's exactly the range we hear. And if you're missing even
> 3 or 4 of those a month — that's over a thousand dollars just
> sitting on the table. What we set up makes sure that stops happening.
> Every call gets a response, every lead gets followed up, automatically.
> You don't touch it."

**If they're vague ("I don't know, hard to say"):**
> "Fair enough — even if it's one job a week slipping through, that
> adds up fast. The whole point of what we do is close that gap
> without adding work on your end. You stay on the tools, we make
> sure nothing falls through the cracks."

---

### Step 4 — Present the Right Plan

Don't list all three tiers. Read the conversation and lead with the
one that fits. If you're not sure, start with Growth — it's the
middle tier and covers the most common needs.

**Starter pitch** *(solo operator, low volume, just wants the basics)*
> "For where you're at, the Starter plan is probably the move —
> it's $99 to get set up and $297 a month. Covers missed call
> response, booking confirmations, and appointment reminders.
> You're covered on the stuff that costs you the most right now."

**Growth pitch** *(established business, wants reviews + follow-up)*
> "Based on what you're describing, Growth is probably the right
> fit — $159 setup, $497 a month. You get everything in Starter
> plus automatic review requests after every job, re-engagement
> for customers you haven't heard from in a while, and a monthly
> report. Most businesses I set this up for say the review piece
> alone pays for it."

**Enterprise pitch** *(multiple techs, needs full operation automation)*
> "Sounds like Enterprise makes the most sense for you — $209 to
> set up, $697 a month. Full operation covered — technician
> notifications, invoice reminders, seasonal campaigns, the whole
> thing. You basically stop managing the communication side of the
> business entirely."

---

### Step 5 — The Close

No pressure. No countdown. Just a clean, direct ask.

**Phone / Video Call Close:**
> "Want to jump on a quick call and I'll walk you through exactly
> what it looks like set up for your business? 15 minutes, I'll
> show you the whole thing live."

**Text / DM Close:**
> "Want to go ahead and get you set up? I can send you the link
> right now — takes about 5 minutes and we start building the
> same day."

Read the energy. If they're warm and moving fast, send the payment
link in the text. If they seem like they need to see it first, offer
the call. Don't force one path.

---

### Handling Objections

**"I need to think about it."**
> "Totally fair. What's the main thing giving you pause — is it
> the timing, the cost, or just want to make sure it actually works
> first?"
Wait for the real objection. That answer tells you what to address.
Don't move on until you know what's actually in the way.

---

### Flipping the No — By Persona

Not every No is permanent. These are the most common ones and how
to turn them without it feeling like pressure. The goal is never
to force it — it's to remove whatever's in the way of something
they already want.

---

**The Older Generation / Tech-Skeptic**

They're not against results. They're against complexity and being
sold something they don't understand.

Remove the tech entirely from the conversation. Never say
"automation," "AI," "workflow," or "system." Speak only in outcomes.

> "You don't log in. You don't learn anything. You don't touch it.
> It runs in the background and your phone just gets fewer missed
> calls. That's it."

If they're still not there, plant a seed and walk away clean:
> "Totally fair. A lot of the guys I work with felt the same way
> before they saw it. If you ever get curious, reach out."

That response alone converts some of them weeks later. Don't
underestimate it.

---

**Already Have Something**

This is the most convertible No. Most of what they have is
incomplete and they know it — they just haven't been asked the
right question.

Don't challenge what they have. Find the gap.

> "What are you using? I'm not here to replace it — genuinely just
> curious if it's handling the after-hours piece too, or if that's
> still falling through."

Almost nobody has the full picture covered. When they admit the
gap — and most will — you're no longer selling against their
current setup. You're filling what it's missing.

---

**Price-Sensitive**

These people understand ROI math better than most. Use it.

> "What does one job pay you on average?"
> [They answer]
> "Starter is $297 a month. If this captures one call that would've
> gone to voicemail and turned into a job — it paid for itself.
> Everything after that is money you weren't getting before."

If they're still hesitant, this is where the incentive structure
(see below) lands hardest. Zero setup removes the upfront risk
entirely. Now the only question is one month's commitment.

---

**Complacent / No Interest in Growth**

Some of them genuinely aren't your client right now — and that's
fine. But some are just comfortable and haven't thought about what's
quietly slipping away. Don't pitch growth to these people.
Pitch protection.

> "I'm not saying you need to grow. I'm saying the businesses
> around you that aren't paying attention to this are slowly losing
> customers to the ones that are. You've built something that works
> — this just makes sure it keeps working without you having to
> manage every piece of it."

That reframe lands differently. It's not "become a different kind
of business owner." It's "protect what you already built."

---

### Incentive Structure

Use these to lower the barrier to start — not as a desperation
move, but as a genuine way to remove the friction of the first step.
Frame every incentive as taking a risk off their plate.

**$0 Setup — Book Today**
Best for: price-sensitive, fence-sitters
> "I don't normally do this but I've got an opening today — if you
> want to move forward I'll waive the setup fee entirely. You just
> start on the monthly."

**Half Off First Month — Book By [Specific Date]**
Best for: anyone who needs a nudge but is genuinely interested
> "I'm in a stretch right now where I'm taking on a few new clients
> at a reduced rate to fill out the schedule. Through [day] I can
> do half off your first month. After that it goes back to full price."

Keep the date real and close. A week out at most. Vague deadlines
don't create urgency.

**First Flow Free**
Best for: skeptics, people who want to see it before committing
> "Tell you what — let me build your first flow at no charge. If
> you see it running and it's not doing what I said, you walk away
> and owe me nothing."

This removes all risk from the first step. Once they see it working,
the monthly plan is an easy yes.

**Founding Member Rate Lock**
Best for: people who respond to exclusivity over urgency
> "The pricing I'm offering right now is a founding rate — I have a
> set number of clients I'm locking in at this price before I raise
> it. Once those spots are filled, new clients pay more. This rate
> stays with you permanently as long as you're active."

Only use this one if you mean it. The founding rate is real —
honor it.

---

**The through-line on all of these:**
You're not pushing them toward something they don't want. You're
removing whatever's in the way of something they already want.
Nobody running a business wants to miss calls. Nobody wants a
competitor to get the job. You're just making it easier to say yes.

---

### When to Walk Away

If after two real conversations they're still stalling with no
clear reason, don't chase it. Leave the door open and move on.

> "No worries at all. If it ever becomes something you want to
> look at, just reach out — I'll still be here."

Then stop. The right clients close without being dragged across
the line.

---

- Never mentions GHL, automation software, or any tech stack
- Never says "as an AI" or anything that breaks the persona
- Never sends more than one message at a time
- Never double-texts if they haven't responded
- Never argues, defends, or pushes back if someone is rude
- Never gives pricing
- Never books a call — that's the owner's move
- Never contacts anyone who has opted out
