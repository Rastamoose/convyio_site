# Convyio landing-page product direction

Status: canonical landing-page translation of the product direction approved 2026-08-19.

The complete product direction is maintained in the sibling app repository at `../app/AGENTS/PRODUCT_DIRECTION.md`. The detailed app onboarding and canonical demo scenario are in `../app/AGENTS/onboarding.txt`. Read both before changing landing-page positioning, story structure, copy or the demo.

This file defines how that direction applies to the marketing site.

## Landing-page job

The landing page must teach and prove a category that many visitors do not yet understand.

It must prevent these incorrect conclusions:

- Slack or Discord with bots;
- another coding agent;
- an agent swarm/orchestration framework;
- a project-management product with AI;
- an all-in-one replacement for the team's existing stack.

The page succeeds when an ICP visitor understands:

> Convyio is where a small technical team turns shared context into approved agent work and gets back a result everyone can review.

The page should make the visitor want to run one piece of real agent-involved work in Convyio without asking them to move their whole team or abandon their current agents.

## Narrow audience

Primary wedge:

> A 2–10 person technical team running several independently owned coding agents against the same product under deadline.

Examples:

- AI-native startup squads shipping releases;
- software agencies delivering client work;
- incident/hotfix teams;
- launch and tiger teams;
- recurring product teams using mixed Claude, Codex, Cursor, Copilot, Devin or similar tooling.

Hackathons are a useful acquisition and demonstration environment, not the assumed durable paid customer.

The recurring job is:

> Keep human and agent workstreams aligned and shippable without making one person manually relay prompts, constraints, decisions, status and files between every tool.

## Positioning

Category POV:

> AI made execution fast. It did not make the work shared.

Concrete status quo:

```text
Slack/Teams holds the discussion.
Linear/Jira holds the task.
A private coding-agent session holds the execution.
GitHub reveals the result at review.
One person ferries context between all four.
```

Core problem:

> Agent work starts privately and becomes team work at review. That is too late.

New system:

> Convyio starts it shared: align the context, decide the plan, grant authority, watch the work and review the proof in one thread.

Working category descriptor:

> A shared execution workroom for software teams and their agents.

Core contrast:

> Same agents. Different system of work.

## Current-page assessment

The current site already has several strong foundations:

- it recognizes private agent sessions as the status quo problem;
- it emphasizes conversation first;
- it explains independently owned agent runtimes and credentials;
- it says Board is another view of conversation;
- it places the demo directly after the hero;
- the demo is data-driven and respects reduced motion;
- the visual language is distinctive and restrained.

The remaining positioning problem is that the hero and demo still center `an agent in team chat` and collaborative copywriting. Slack, Teams and Linear now occupy that mental frame too.

The current demo proves that an agent can read a conversation and respond to shared constraints. It does not yet prove the full differentiated loop:

```text
shared context
  -> inline PlanCard
  -> new constraint changes the plan
  -> human approval
  -> bounded assignment and execution
  -> ResultCard with evidence
```

The landing rework should preserve the existing strengths while changing the proof.

## Required story order

Recommended page sequence:

1. Header with one clear CTA.
2. Hero category POV and low-risk promise.
3. Canonical demo/video as immediate proof.
4. Concrete old workflow and the late-coordination failure.
5. The differentiated causal loop.
6. Independently owned agents and credential reassurance.
7. Conversation-first architecture: other planes are projections/resource controls.
8. Narrow ICP examples.
9. FAQ addressing category confusion and switching anxiety.
10. Closing CTA that restates the hero promise.

The demo should remain near the top. The visitor should see the product prove the claim before reading a long feature explanation.

## Hero direction

Provisional headline:

> Agent work should start shared.

Provisional support:

> Turn team context into approved work and get back a result everyone can review—without ferrying prompts, decisions and files between chat, tickets, private agent sessions and GitHub.

Reassurance directly below the CTA:

> Use the agents your team already runs. Their credentials stay with their owners.

CTA while early access is gated:

- Primary: `Get early access`
- Secondary: `Watch the full loop`

CTA when direct signup is the desired motion:

- Primary: `Run one piece of work`
- Secondary: `Watch the full loop`

Do not lead with `agents as teammates`, `AI workspace`, channels, Board, model support or agent counts.

## Canonical demo/video

Replace the collaborative-copy demo as the primary product proof with the canonical billing scenario defined in `../app/AGENTS/onboarding.txt`.

The demo must show:

1. A real billing inconsistency is raised in conversation.
2. Noodle investigates read-only.
3. An inline PlanCard appears.
4. A second human adds the ledger constraint.
5. The Plan visibly changes before execution.
6. A human approves the corrected bounded work.
7. Convyio routes and displays the work in the same thread.
8. A ResultCard proves invoice/PDF agreement while ledger behavior remains unchanged.
9. The demo closes on `Same agents. Different system of work.`

The visitor should remember the prevented review/rework loop, not the number of chat messages.

### Implementation relationship

The app's polished onboarding/product scenario is the source of truth.

The landing page may use:

- an optimized recording of the real app flow;
- the existing lightweight data-driven playback as an accessible transcript/interactive alternative;
- a reduced-motion poster sequence;
- captions and playback controls;
- no autoplay audio.

Do not independently animate capabilities that the app cannot perform. Record the proper demo video only after the canonical PlanCard, human decision, work progression and ResultCard exist in the app.

## Concrete problem section

Avoid generic claims such as `silos`, `lost context` or `lack of visibility` without showing the workflow.

Use a specific sequence:

```text
The decision is in Slack.
The task is in Linear.
The prompt is in one person's Claude session.
The output reaches GitHub.
The missing constraint arrives in review.
```

Explain the cost in human terms:

- the implementing person becomes the manual router;
- the team sees assumptions late;
- approval is inferred rather than explicit;
- agent work cannot be understood without private transcripts;
- rework is found after execution.

Do not attack the existing tools. Explain that they are each organized around a different object and were not designed to preserve one causal human-agent work thread.

## Differentiated loop section

Teach the new causal sequence with the same visual and words used in the product:

- Shared request.
- Work Brief / PlanCard.
- Constraint changes the work.
- Human decision.
- Assigned and bounded execution.
- Visible progress/checkpoints.
- ResultCard and evidence.

These are outcomes, not feature tiles.

## Independently owned agents

This is a major reassurance and differentiator, but not the opening claim.

Explain:

- Alice can own a local Claude runtime.
- Bob can own Codex or another harness.
- The team can use managed noodle or a reviewer/CI agent.
- Credentials remain with the runtime owner.
- Agents may use different models and harnesses.
- Convyio coordinates the shared mission, authority and records.

Recommended sentence:

> Coordinate the work without centralizing the agents.

Avoid implying that Convyio currently performs autonomous agent-to-agent delegation or skill routing.

## Conversation-first explanation

The site should state:

> The conversation is the work surface. Plans, approvals, agent activity and results appear in the thread that caused them.

Then explain the other planes:

- Board is another view of the same Plans and Tickets by state.
- The approval queue points to the same inline decisions.
- Projects organize the same work and results by repository.
- Resources configure which agents may use which owned folders.

Do not depict separate chat and workflow products joined by arrows. Depict one canonical thread with projections.

## Switching-anxiety reduction

The visitor should understand:

- Do not move the whole team.
- Start with one workroom and one piece of work.
- Use noodle before installing anything.
- Bring existing agents later.
- Provider credentials stay with their owners.
- Only selected projects/folders are exposed.
- Consequential work receives human approval.
- Small read-only asks stay lightweight.

This is essential for a new category. Attraction alone will not beat the habit of Slack/Linear/GitHub/private agents.

## FAQ direction

The FAQ should directly answer:

- Is this Slack with agents?
- Is this a multi-agent orchestration framework?
- Does Convyio replace Claude Code, Cursor, Codex or GitHub?
- Do we have to move our whole team?
- Can one person start alone?
- Where do agents run?
- Who holds provider credentials?
- What exactly can an agent change?
- How are Plans, approvals and results connected to conversation?
- What happens when an agent or owner disconnects?

Answers must describe implemented current behavior. Target workflow claims must be withheld until shipped.

## Proof strategy before customer logos

While customer proof is limited, use product proof:

- the canonical real-system demo;
- the exact constraint that changed the Plan;
- the human approval;
- the bounded scope;
- the ResultCard and verification;
- the dogfooding story of developing Convyio from inside Convyio when achieved;
- usability/comprehension evidence from the narrow ICP, reported honestly.

Do not invent performance percentages or generic productivity claims.

## Analytics

Keep the existing landing events and add/adjust events around the new proof:

- hero CTA clicked;
- demo started;
- demo reached PlanCard;
- demo reached constraint change;
- demo reached approval;
- demo reached ResultCard;
- demo completed;
- demo replayed;
- email form focused;
- email submitted;
- app signup clicked;
- traffic source and message variant.

Demo completion alone is not success. Compare demo depth with signup/email conversion and later product activation where identity linkage is lawful and available.

## Copy constraints

- Lead with a concrete workflow difference.
- Prefer verbs and causal sequences over category jargon.
- Do not say `seamless`, `agentic platform`, `unlock`, `revolutionize`, `all-in-one` or `operating system`.
- Do not claim the model is smarter.
- Do not claim autonomous multi-agent orchestration.
- Do not describe navigation as value.
- Keep the voice direct enough for engineers.
- Preserve the flat Gruvbox visual language in `AGENTS.md`.

## Acceptance criteria for the landing rework

- An ICP visitor sees the category POV and demo in the first meaningful scroll.
- The demo shows the complete differentiated loop rather than only chat/Q&A.
- The page does not lead with `agents in a room` as the differentiator.
- The visitor can understand why the status quo fails without seeing competitor logos.
- Independently owned runtimes and credentials are explained accurately.
- The page reduces the fear of replacing the whole stack.
- Board, Projects and Resources are described as projections/resource controls around the canonical thread.
- Claims match current implementation.
- Demo playback is controllable, captioned and reduced-motion safe.
- The hero and closing CTA express the same promise.
- Observed ICP users can explain Convyio accurately after viewing the page and demo.
