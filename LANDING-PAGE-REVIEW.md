# convyio landing page — review & change brief

**Status: analysis only. No files were modified.** This document is written to be handed to another agent as a work order.

Companion research: `/home/harris/landing-page-playbook.md` (synthesis of 5 research passes — structure, copy, proof, CRO data, teardowns of 25 live best-in-class pages, Aug 2026). Section references below like *(playbook §3)* point there.

---

## 0. Context the executing agent needs

**What this is:** a single-route static Next.js 14 marketing site for **convyio** — a team chat where AI agents are channel members. Pre-launch. Static export to `dist/`. Deployed to Vercel.

**The conversion goal is one email address.** Formspree endpoint, two placements (hero + closing). There is no signup, no pricing, no trial, no product to log into.

**This changes which playbook rules apply.** Read this before acting on anything:

| Playbook area | Applies here? |
|---|---|
| Section order, above-fold anatomy, attention data | **Yes, fully** |
| Copy/headline/CTA language | **Yes, fully** |
| LCP / forms / accessibility | **Yes, fully — and this is where the real damage is** |
| Logo bars, testimonials, case studies, review scores | **No — there are no customers yet.** See §4. |
| Pricing presentation, tier count, annual toggle, trials | **Out of scope entirely** |
| Benchmarks (6.6% median CR etc.) | **Not comparable.** Those measure paid-traffic pages selling a live product. A pre-launch waitlist has a different denominator and a different offer. Don't set targets from them. |

**Audience awareness stage: unaware → problem-aware.** Nobody is searching for "team chat where agents are members." That fact drives several recommendations below and is the reason the current problem-first headline is the right call, not a mistake.

---

## 1. What is already right — do not "fix" these

Listing these explicitly so the next agent doesn't regress them while doing the work in §2.

1. **Section order matches the canon almost exactly.** `Header → Hero → ProblemLines → BeatsSection → DemoSlot → ClosingBlock → Footer` (`app/page.tsx:12-18`). Problem-agitate before solution is correct for problem-aware traffic (playbook §3, Schwartz staging).

2. **The beat headings pass the layer-cake test — this is the single most under-implemented rule in the whole playbook and this page nails it.** `lib/copy.ts:21,25,31`:
   > "Brief it like a teammate." / "Everyone watches the same run." / "Nothing lands until someone says yes."

   A visitor who reads *only* the H1 and the three section headings gets the entire product. NN/g eyetracking says heading-only scanning is the actual reading behavior (playbook §2). Do not replace these with "Features", "How it works", or anything generic.

3. **The copy is genuinely good and needs almost no rewriting.** Short sentences, concrete nouns, zero buzzwords — no *seamless / empower / scalable / unlock / next-generation / end-to-end*, none of the 2026 "agentic" saturation that afflicts 17 of the 25 pages teardown-fetched (playbook §9). Reading level is low, which is the strongest single copy correlate of conversion (playbook §0). "Nothing lands until someone says yes." passes all three of Dry's tests — visualizable, falsifiable, nobody else could say it.

4. **The email form is better than ~95% of production forms.** `components/EmailForm.tsx`: real `<label>` (sr-only), `autoComplete="email"`, `type="email"`, `aria-invalid`, `aria-describedby` wired to the error, `role="alert"` + `aria-live` on the error, honeypot, single field. Playbook §5 ranks correct labels + autocomplete as the highest ROI-per-hour item on the web; it's already done. **Leave the field count at one.**

5. **Two hero CTAs, filled primary + ghost secondary** (`components/Hero.tsx:41-57`) — matches 23/25 of the teardown set.

6. **`prefers-reduced-motion` is respected** (`app/globals.css:65-77`, `208`).

7. **Closing CTA block exists and repeats the email form** (`components/ClosingBlock.tsx`) — correct slot, catches the highest-intent non-converters.

---

## 2. Findings, ranked

### P0-1 — The page hides its own LCP element until JavaScript finishes

**Files:** `app/globals.css:207-225`, `components/Reveal.tsx`, `components/Hero.tsx:24-88`

**What's happening.** Every meaningful element on the page is wrapped in `<Reveal>`. `.reveal` sets:
```css
opacity: 0;
transform: translateY(16px);
filter: blur(4px);
transition: … 0.6s …;
transition-delay: var(--reveal-delay, 0ms);
```
The `is-visible` class that undoes this is added by a client-side `IntersectionObserver` inside a `useEffect`. The H1 is the LCP element and it is wrapped at `Hero.tsx:30` with `delay={80}`.

So the real LCP chain is: HTML arrives (H1 already in it, invisible) → download ~900KB of chunks → parse → hydrate → observer registers → callback fires → 80ms delay → 600ms transition. On a mid-range Android that is trivially 3–5s **for text that was present in the first byte of HTML.**

**Why it matters.** This is the exact failure mode the playbook flags as self-inflicted — the equivalent of `loading="lazy"` on your hero image, which 16–17% of pages do, except applied to the entire page. The only clean causal experiment in the CRO literature (Vodafone, true 50/50 RCT, ~100k clicks/day/arm) measured **+8% sales from a 31% LCP improvement** (playbook §0). Google's LCP budget allows ~0.25s of render delay against a 2.5s target; this design spends multiples of that on purpose.

Secondary damage: with JS disabled or failed, **the page is completely blank** — not degraded, blank. And `filter: blur()` forces GPU layer promotion on ~15 simultaneous elements.

**The fix (laziest version that works):** stop wrapping above-the-fold content. Render the hero eyebrow, H1, subhead, CTA row and trust line as plain markup with no `Reveal`. Keep `Reveal` for `ProblemLines`, `BeatsSection`, `DemoSlot`, `ClosingBlock` — everything below the fold, where it's a genuine progressive-enhancement flourish and costs nothing.

If the entrance animation on the hero is wanted for aesthetic reasons, the correct pattern is a **CSS-only** animation that runs on paint (`animation: fade-up 0.6s both` with staggered `animation-delay`) — no JS, no observer, no hydration dependency, and it still respects the existing `prefers-reduced-motion` block. Do **not** solve this by adding a `is-visible`-by-default class that JS removes; that reintroduces a flash.

**Also worth doing while in here:** the 400ms cumulative stagger (`delay={0,80,160,240,320,400}`) means the CTA is the last thing to appear. Even after fixing LCP, don't stagger the primary CTA behind a third of a second of choreography.

---

### P0-2 — The `?v=2` headline test cannot produce a result

**Files:** `components/Hero.tsx:10-18`, `lib/copy.ts:9-10`, `lib/analytics.ts`, `lib/posthog.ts`

Three independent reasons it's non-functional:

1. **Nothing records which variant was shown.** I checked `lib/analytics.ts` and `lib/posthog.ts` end to end — there is no `headline_variant` property, no super-property, no register call. `email_submitted` carries only `{location, success}` (`EmailForm.tsx:43-46`). Even with perfect traffic splitting, the data to analyse does not exist.
2. **The swap happens after paint.** `useState(COPY.hero.h1)` then a `useEffect` replaces it, so the static HTML always ships variant A and variant-B visitors see A flash first. Combined with P0-1, they see a blurred A, then a resolved A, then B.
3. **No randomisation.** It's URL-driven, so "the test" is really two campaigns, which confounds variant with traffic source.

**And even if all three were fixed, it wouldn't reach significance.** Median A/B test success rate is ~10%, and at that base rate ~22% of nominally-significant wins are false positives (Kohavi). A pre-launch waitlist does not have the traffic to detect a headline effect (playbook §0, §7).

**The reframe worth acting on — these two lines are not A/B variants, they're awareness-stage variants:**

| Line | Stage | Right traffic |
|---|---|---|
| "Your team has quietly become five people working alone." | **Problem-aware** — mirrors the pain, names no product | Cold social, content, HN, newsletter |
| "Where your team and its agents work in the same room." | **Solution-aware** — states the category | Anyone who already knows they want this; direct/referral/branded |

Playbook §3: running the wrong one on the wrong traffic is the most common single failure, and message match between ad and headline is worth more than headline quality in isolation (+144% form submissions in the one clean test).

**Recommended change:** keep both lines, keep the `?v=` mechanism, but (a) register the variant as a PostHog super-property so every subsequent event carries it, (b) treat the output as qualitative signal, not a test — do not wait for significance, and (c) if the flash matters, read the param in a tiny inline script before paint rather than in `useEffect`. Lowest-effort acceptable outcome: just add the super-property. That alone converts an unmeasurable thing into a measurable one.

---

### P1-1 — The play button promises something that doesn't exist

**Files:** `components/DemoSlot.tsx:57-110`, `components/DemoChat.tsx`

`DemoSlot` renders `<DemoChat />`, covers it with a full-bleed button labelled **"Watch the loop"** with a play triangle, and on click opens a lightbox containing… `<DemoChat />` again. I read `DemoChat.tsx` in full: **it is entirely static.** No state, no timers, no sequencing — one `animate-pulse-slow` dot. The lightbox shows the identical component at a larger size.

So the strongest affordance on the page (a play button, centred, accent-coloured, glowing) resolves to "the same picture, bigger." `demo_played` and `demo_completed` are firing on that.

**Why this is the biggest missed opportunity, not just a bug.** For a pre-launch product with no customers, no logos and no metrics, **the demo is the only proof you have.** Playbook §9: Claude's primary CTA is a working input, OpenAI's hero is a prompt box, Cursor and Attio lead with live product demos — "let them use it" has replaced "show a screenshot" at the top of the market. This page has the right instinct and an empty box behind it.

**Options, in order of lazy-to-good:**
- **Cheapest honest fix:** drop the play triangle and the "Watch the loop" label, label the button "Expand", keep the lightbox. Costs nothing, removes the broken promise.
- **Right fix:** make `DemoChat` actually sequence — messages appearing on a timer, the agent trace expanding, the board card landing. It's a static component today; adding a `useState` index + `setInterval` that walks a message array is maybe 30 lines. Gate it behind `prefers-reduced-motion` and start it when the section enters the viewport (the `IntersectionObserver` at `DemoSlot.tsx:18` is already there and already fires at 50%).
- Either way the caption "A live channel where humans and agents message together" (`copy.ts:51`) currently overstates a still image.

---

### P1-2 — Two contrast failures, both trivial to fix

**File:** `app/globals.css:13, 17`

Computed against the actual token values:

| Pair | Ratio | AA needs | Where it's used |
|---|---|---|---|
| `--gruv-fg-muted` `#7c6f64` on page bg `#f9f5d7` (light) | **4.42:1** | 4.5:1 | Hero trust line (`Hero.tsx:60`), demo caption (`DemoSlot.tsx:82`), footer (`Footer.tsx:11`) — all at 12px |
| `--gruv-accent-deep` `#b57614` on pill bg `#fbf1c7` (light) | **3.32:1** | 4.5:1 | The eyebrow product-name pill (`Hero.tsx:25-28`), 12px uppercase |

Dark theme passes (muted = 4.95:1). It's only the light default, which is the default.

Playbook §5: only **30% of sites pass contrast**, 83.9% of pages have low-contrast text, and this is the failure that affects everyone reading a phone in sunlight — it's a mainstream legibility issue misfiled as an accessibility one.

**Fix:** darken `--gruv-fg-muted` in `:root` to roughly `#6f6357` (≈5.2:1) and `--gruv-accent-deep` to about `#95610f` (≈4.6:1 on the pill). Both are within the Gruvbox family; verify with a contrast checker rather than trusting my arithmetic. Don't change the dark-theme values.

---

### P1-3 — The most valuable proof element on the page is also the least visible

**File:** `components/Hero.tsx:59-66`

> works with the agents you already run — Claude Code · Codex · Kimi

This is rendered at `font-mono text-xs` in `text-gruv-fg-muted` — 12px, and at the 4.42:1 contrast that fails AA (P1-2). It is the **quietest element in the hero**.

It is also the only real proof this page has. For a developer-adjacent audience it's exactly the pattern PostHog uses ("Supports Next.js, React, Python, and 22 more") and playbook §3 identifies as the dev-tool friction-reducer: the objection being defused isn't payment, it's **"do I have to abandon the setup I already have."** That's the #1 objection for this product and it's currently in fine print.

**Fix:** promote it. Larger (14px), body-colour not muted, and give it the slot directly under the CTA row where a logo bar would go — the 600–1000px band that Chartbeat's 2B-pageview analysis identifies as the highest combined viewership+engagement zone (playbook §2). Optionally set the three agent names in the accent colour. This is a styling change, not a copy change; the sentence is already right.

---

### P1-4 — README documents an env var the code never reads

**Files:** `README.md` (env table), `components/EmailForm.tsx:9`

README says email capture is configured via `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. `EmailForm.tsx:9` hardcodes:
```ts
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meeywyjy';
```
The env var is never referenced anywhere in the codebase. Anyone deploying by following the README will set it, see no error, and assume it took effect.

**Fix:** one line — `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/meeywyjy'`. (Next inlines `NEXT_PUBLIC_*` at build time, so this works under static export.)

---

### P1-5 — The demo lightbox fails three of the four modal requirements

**File:** `components/DemoSlot.tsx:86-110`

It declares `role="dialog" aria-modal="true"` and handles Escape (good). Missing:
- **Focus is never moved into the dialog** on open — a keyboard user presses the play button and focus stays on a now-hidden element behind an overlay.
- **No focus trap** — Tab walks out of the modal into the page underneath.
- **Focus is not restored** to the trigger button on close.
- **Background scroll is not locked** — scrolling the overlay scrolls the page behind it.

Playbook §6: these four are exactly what most modal implementations fail. On a page with one modal, the lazy fix is ~15 lines in the existing `useEffect` at `DemoSlot.tsx:35-46`: on open, store `document.activeElement`, focus the close button, set `document.body.style.overflow = 'hidden'`; on close, reverse it. A focus trap can be a simple keydown handler on the dialog that cycles between the first and last focusable element — no library, and adding one for a single modal would be over-engineering.

---

### P2-1 — The closing headline is the weakest copy on the page

**File:** `lib/copy.ts:39`

> "Every company is about to need a place where its people and its agents work together."

This is a claim about the market, not about the reader, and it's unfalsifiable — it fails Dry's test (can you visualize it? can you falsify it? could nobody else say it?) on all three counts, and it's the one place the page drifts into the abstract-outcome register the rest of it avoids. The support line beneath it (`copy.ts:40`) is much stronger and more specific.

Teardown data: **16 of 25** best-in-class pages close by restating the hero promise. Ramp repeats its H1 verbatim as the closing block. The pattern works because the closing CTA's job is to re-land the promise at the moment of decision, not to open a new argument about market timing.

**Suggested direction** (not final copy — worth a pass by whoever owns voice): close on the product promise, e.g. a restatement of "your team and its agents, in the same room" or a callback to "Nothing lands until someone says yes." Keep the existing support line, or promote it to lead.

---

### P2-2 — Header CTA scrolls away from the form instead of into it

**File:** `components/Header.tsx:11-13`

`<a href="#closing">Get early access</a>` sends the visitor to the bottom of the page, where they then have to find and click into the email input. The hero already contains an identical form.

Minor, but the sticky nav CTA should be the shortest path to conversion. Cheapest improvement: point it at the hero form and focus the input (`#email-hero`), or keep the anchor and add `autofocus`-on-hash behaviour in `ClosingBlock`. Playbook §1: repeating the *same* CTA is correct and this page does that; the issue is only that this instance costs an extra click.

---

### P2-3 — `metadataBase` is a placeholder domain

**File:** `app/layout.tsx:10`

`new URL('https://convyio.example.com')` — OG and Twitter card image URLs will resolve against a domain that doesn't exist, so social previews will be broken wherever the card is unfurled. `NEXT_PUBLIC_SITE_URL` is already defined in `lib/posthog.ts:3` and documented in the README but unused here.

**Fix:** `new URL(SITE_URL || 'https://convyio.com')`.

---

### P3 — Minor, batch these

- **Duplicate `getUtmParams`** defined identically in `lib/posthog.ts:13-22` and `lib/analytics.ts:51-60`. The one in `posthog.ts` is dead. Delete it.
- **Two PostHog init paths** — `PostHogProvider` inits on `load`, and the nested `PostHogPageView` inits again in its own effect (`components/PostHogProvider.tsx:7-25`). It's idempotent via `initPromise` so it's harmless, but the `PostHogPageView` component is doing the real work and the outer effect is redundant.
- **No `email_form_focused` / `cta_clicked` events.** For a page whose entire funnel is one input, knowing how many people focused the field and abandoned versus never touched it is the difference between a copy problem and a form problem. `scroll_to_demo` and `demo_played` are already instrumented; the form is not, beyond submission.
- **`dist/` is committed** alongside source. Intentional for manual Vercel deploys per the README, but worth confirming it isn't drifting from source.

---

## 3. Suggested execution order

Grouped so a single agent can work in coherent passes.

**Pass 1 — performance & correctness (highest value, lowest risk):**
1. P0-1 unwrap above-the-fold `Reveal` (or convert to CSS-only entrance)
2. P1-4 Formspree env var
3. P2-3 `metadataBase`
4. P3 delete duplicate `getUtmParams`

**Pass 2 — accessibility & legibility:**
5. P1-2 contrast tokens
6. P1-5 modal focus management + scroll lock

**Pass 3 — conversion:**
7. P1-3 promote the "works with the agents you already run" line
8. P0-2 register the headline variant as a PostHog super-property
9. P3 add form-focus / CTA-click events
10. P2-2 header CTA target

**Pass 4 — content (needs a human decision first):**
11. P1-1 the demo — decide between "relabel honestly" and "make it actually animate" before building
12. P2-1 closing headline rewrite — needs whoever owns the voice

**Verification for pass 1:** build, serve `dist/`, and check that the H1 is painted before JS executes (throttle to Slow 3G + 4x CPU in DevTools, or disable JS entirely — the hero should be fully legible either way). That single check is what P0-1 is about; if it doesn't pass, nothing else in pass 1 matters.

---

## 4. Explicitly out of scope — do not add these

The playbook contains a lot of proof and pricing guidance that **actively should not be applied to this page**, and it's the kind of thing an agent reading the playbook cold would helpfully add. Flagging so it doesn't happen:

- **No logo bar.** There are no customers. NN/g's threshold finding is that weak social proof is *worse than none* — a participant dismissed an article with 1,000 shares as "not popular enough, so maybe it wasn't good." A row of unrecognisable logos signals "nobody recognisable uses this."
- **No fabricated counters** ("join 500+ teams", "1,200 on the waitlist") unless the number is real, large, and verifiable. Same finding, plus the FTC's Rule on Consumer Reviews (effective Oct 2024, up to $51,744 per violation) covers invented endorsements including AI-generated ones.
- **No testimonials.** Nobody has used it.
- **No countdown timers, "spots remaining", or urgency framing.** ICPEN's 2024 sweep found 75.7% of 642 sites used at least one dark pattern; Amazon was fined ~$8M in Poland for false urgency. This is legal exposure now, not a taste question.
- **No pricing section, no tiers, no "most popular" badge.** Nothing to price.
- **No trust badges.** SOC 2 / GDPR badges as hero decoration have zero independent evidence, and Inflow measured **+5.3% conversion from *removing* a BBB badge** because clicking it took visitors off-site. There's nothing to certify pre-launch anyway.
- **Don't add form fields.** One email is correct. Playbook §5: "fewer fields" is oversold as a rule generally, but there is no qualification value to capture on a waitlist, and every added field is pure loss here.
- **Don't add a chat widget.** Measured cost is 259–1000ms of main thread (Zendesk 991ms, Intercom 514ms) paid by 100% of visitors for the ~1% who open it. The claimed conversion lift is pure selection effect — no study randomises widget exposure.
- **Don't add scroll-jacking or parallax.** NN/g: the majority of participants experienced disorientation, and task-oriented users — which is all landing-page traffic — showed significantly less tolerance than exploratory ones. The page's existing scroll-reveal is already at the edge of this; P0-1 reduces it rather than extending it.
