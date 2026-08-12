CONVYIO — NOTES ACCOMPANYING THE DRAFT PRIVACY POLICY AND TERMS OF SERVICE
==========================================================================

Prepared: 13 August 2026
For: reviewing solicitor
From: Harris Asif (hello@convyio.com)

These are polished drafts for review, not final documents. They were written
from the product's source code rather than from a template, so the factual
descriptions of what convyio does should be accurate. The legal framing needs
your judgement.

Files in this directory:
  privacy-policy.txt      — draft privacy notice (UK/EU GDPR-first)
  terms-of-service.txt    — draft terms of service (England & Wales)
  README-FOR-COUNSEL.txt  — this file

Conventions used in the drafts:
  [[double brackets]]  — a fact still to be supplied or verified
  [COUNSEL NOTE: ...]  — a question or risk for you; delete before publishing

What the drafting assumes:
  - Governing law England & Wales. No registered company: convyio is operated by
    Harris Asif personally, who is therefore both the data controller and the
    counterparty to the Terms.
  - A single hosted service that we run. No customer self-hosting yet, though it
    is planned.
  - Both the website and the application are publicly available.
  - Minimum age 16. Consumers and businesses both permitted.
  - No paid plans yet.
  - One contact address for everything: hello@convyio.com.


PRIORITY QUESTIONS
------------------

1. Incorporation. Operating unincorporated means the liability cap in clause 10
   of the Terms is the only thing between Harris personally and any claim
   arising from the Service — including claims arising from AI agent behaviour,
   which is the least predictable part of the product. We would value a direct
   view on whether to incorporate before promoting convyio further.

2. Controller identity details. Art. 13(1)(a)-(b) requires the controller's
   identity and contact details. We have published the name and email. Do we
   also need a postal address, and if so, is a correspondence-only address
   acceptable in place of a home address? Also: does ICO registration and the
   data protection fee apply, and is an Art. 27 representative needed given we
   accept both UK and EEA users?

3. Controller vs processor for customer content. We are clearly controller for
   account data. For messages and board items created by a customer's team, we
   may be their processor. We do not offer a data processing agreement. Is one
   needed before onboarding UK or EEA business customers?

4. AI providers' data handling. Agents send message text, board context and
   images to Google Gemini or Anthropic Claude. We have not verified which API
   tier we use, or its retention and model-training defaults. This determines
   whether clause 4.3 of the Terms ("we do not use Your Content to train AI
   models") can stand unqualified.

5. Liability cap figure (Terms 10.3), left bracketed deliberately. While the
   Service is free, the paid-fees limb is nil, so the fixed figure is the whole
   cap. What is defensible against a consumer under the CRA 2015, and should
   business users have a different cap?

6. Erasure vs the append-only board audit log — see item C below.

7. Terms 6(e), the competing-product restriction — keep or drop? Our users are
   developers, who tend to react badly to it.


FACTS STILL TO BE SUPPLIED
--------------------------

  - Postal address for data protection correspondence, if required.
  - ICO registration number, if applicable.
  - Whether an Art. 27 representative is needed.
  - Supabase and Railway data regions, and their server-log retention periods.
    If both can be pinned to the EU, the international transfers section becomes
    materially simpler; worth doing before launch.
  - Whether data processing agreements with Supabase, Railway, Vercel, PostHog
    and Formspree are actually executed.
  - PostHog project data-retention setting.
  - Provider backup window: how long deleted data survives in backups.
  - Whether any part of convyio is open-source, and whether dependency licences
    require an attribution notice (Terms 11.2).
  - The liability cap figure.


STATEMENTS NOT YET TRUE, OR NOT YET VERIFIED
--------------------------------------------

These are our problems to fix rather than yours to draft around, but you should
know which parts of the drafts describe intended rather than confirmed
behaviour.

A. What account deletion actually removes. Self-service account deletion is
   implemented, and the drafts describe it as a live feature. What we have not
   yet pinned down is the cascade: which of a departing user's messages,
   reactions, uploaded files, board items and board events are deleted outright,
   which remain in shared channels, and which remain but are detached from their
   name. Privacy Policy 8.1 carries a bracket for exactly this, and it is the
   one substantive gap left in the document. It matters because an Art. 17 claim
   we cannot substantiate is worse than a narrower one we can.

B. No self-service data export. Portability (Art. 20) is handled manually by
   email. Workable at this scale; should be built.

C. The board audit log is append-only by design. Board events attributable to a
   user may therefore survive that user's account deletion. If so, it needs
   disclosing in Privacy Policy 8.1 and justifying, most likely under Art. 17(3)
   or as a record we have a legitimate interest in keeping intact. This is a
   design decision as much as a drafting one.

D. Abandoned accounts. Deletion existing does not solve storage limitation: an
   account nobody deletes is currently retained indefinitely. We need a
   defensible dormancy period to state in Privacy Policy 8.2.

E. No cookie consent mechanism on the website. PostHog loads on page load and
   sets an identifier. Privacy Policy section 7 says we only set it with
   consent, which is not true today. Either the consent banner ships or that
   paragraph is wrong. This is the likeliest thing to attract a complaint,
   because anyone can verify it from outside.

F. PostHog autocapture is at its default, so it may capture clicks and element
   text beyond the six named events we list in 2.5. Disable it, or broaden the
   description.

G. Upload URLs act as bearer tokens. Files sit in a private bucket but are
   served at /api/uploads/<random-uuid>/<filename>, and anyone with the URL can
   fetch the file unauthenticated, because <img> tags cannot send authorisation
   headers. Disclosed in Privacy Policy 2.3 and Terms 4.6. Worth surfacing in
   the interface at upload time, and worth fixing with short-lived signed URLs.

H. Board approval is not a complete gate. With the Claude agent provider, that
   provider's native shell, write and edit tools run alongside the board tools
   and are not subject to board approval — an accepted gap recorded in the
   project's own architecture decision log. This contradicts the
   "board is the permission boundary" model the rest of the product relies on.
   Disclosed prominently in Terms 5.4. Our own view is that the Claude
   configuration should stay disabled for external users until those tools are
   gated, and we would like to know whether you agree.

I. No documented incident response process. One is needed to support the breach
   notification commitment in Privacy Policy section 10.

J. Nothing is published or accepted yet. The website has no /legal routes and no
   footer links, and there is no acceptance step at sign-up. Whatever we publish
   also needs a record of which version each user accepted and when, or the
   change-of-terms clause in Terms 12 is unenforceable in practice.


WHAT WE ARE CONFIDENT IS FACTUALLY ACCURATE
-------------------------------------------

Taken from source, not assumed: authentication via Supabase Auth, with no
password or Google credential ever reaching our server, and every request's token
re-verified; the data model (actors, messages, reactions, board items,
append-only board events, channels, attachment metadata, agent invites); session
storage behaviour (localStorage vs sessionStorage, 30-day remember-me, 60-second
server-side token verification cache, 12-hour in-memory API tokens revoked when
the last connection closes); the one-hour cleanup of uploads never attached to a
message; row-level security enabled with no policies on every table, with the
server connecting directly as the table-owning role; the board's scope-path
authorisation model, its fail-closed treatment of unknown tools, and its Claude
exception; and the subprocessor list.
