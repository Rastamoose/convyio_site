/**
 * Guide page content for /agents, /keys, /approvals, and /changelog.
 *
 * Same split as lib/legal.ts: prose lives here as structured data, layout
 * lives in components/GuideDoc.tsx. Everything stated here traces back to
 * DOCS/CURRENT_*.md — when the product changes, change the guide and bump
 * `revised`.
 */

export type GuideBlock =
  | { kind: 'text'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'steps'; items: string[] }
  | { kind: 'notice'; tone: 'warn' | 'note'; label: string; text: string };

export type GuideSection = {
  id: string;
  heading: string;
  blocks: GuideBlock[];
};

export type Guide = {
  slug: 'agents' | 'keys' | 'approvals' | 'changelog';
  /** Short name for breadcrumbs, footer links, and keep-reading cards. */
  label: string;
  /** Page H1. */
  title: string;
  /** Phrase inside `title` that gets the marker highlight. */
  highlight: string;
  /** One-line hint under the label in nav menus. */
  navHint: string;
  metaTitle: string;
  metaDescription: string;
  standfirst: string;
  /** One-line summary used in keep-reading cards. */
  teaser: string;
  revised: string;
  sections: GuideSection[];
};

export const AGENTS: Guide = {
  slug: 'agents',
  label: 'Agents as members',
  title: 'An agent on the team, not in a tab.',
  highlight: 'on the team',
  navHint: 'Pairing, mentions, durable runs',
  metaTitle: 'Agents as team members | Convyio',
  metaDescription:
    'How AI agents join a Convyio workspace as members: pair a runner you control, @mention the agent to start durable work, and get results back in the thread.',
  standfirst:
    'In Convyio an agent is a workspace member with its own name, messages, and history. It thinks on a runner you operate, and it starts working when a person asks.',
  teaser: 'How an agent joins the workspace, picks up work, and reports back in the thread.',
  revised: 'August 2026',
  sections: [
    {
      id: 'member',
      heading: 'A member, not a plugin',
      blocks: [
        {
          kind: 'text',
          text: 'Humans and agents in a workspace share the same identity, message, ownership, and event records. An agent appears in the roster like anyone else, and its history stays put when it goes offline. Two things set it apart from a human member: a paired runner that does the thinking, and a set of controlled tools.',
        },
        {
          kind: 'text',
          text: 'Because the records are shared, anything an agent says or does is attributed to it. You can open its profile, read its messages, and see which board items it owns.',
        },
      ],
    },
    {
      id: 'pairing',
      heading: 'Pairing a runner',
      blocks: [
        {
          kind: 'text',
          text: 'The runner is a process you run on a machine you control. You pair it with the workspace using a pairing code. The server resolves that code to one workspace; a presented credential cannot pick a different workspace or widen its own access.',
        },
        {
          kind: 'text',
          text: 'The runner picks its own harness and model — Gemini, the Claude SDK, or an ACP harness. The workspace does not care which one an agent runs on.',
        },
      ],
    },
    {
      id: 'starting-work',
      heading: 'Starting work',
      blocks: [
        {
          kind: 'steps',
          items: [
            '@mention the agent in a channel, the way you would ask a person.',
            'The server writes your message and a durable run request in the same transaction. If one fails, neither exists.',
            'An online, ready runner gets a work-available signal and claims the request.',
            'The runner receives the conversation and the message that triggered it, then reports activity and a result back into the thread.',
          ],
        },
      ],
    },
    {
      id: 'context',
      heading: 'What the agent sees',
      blocks: [
        {
          kind: 'text',
          text: 'On join, the runner loads a workspace snapshot and a prompt envelope: the policy, who asked, plans, live tickets, members, and context. It also keeps a rolling transcript of the last fifty messages.',
        },
        {
          kind: 'text',
          text: 'The envelope is compiled when the snapshot is taken, not rebuilt for every run.',
        },
      ],
    },
    {
      id: 'disconnects',
      heading: 'When the runner disconnects',
      blocks: [
        {
          kind: 'text',
          text: 'Claimed work is requeued when the agent reconnects. The assignment lives on the server, not in a browser tab, so a closed laptop pauses a run instead of losing it.',
        },
      ],
    },
    {
      id: 'limits',
      heading: 'Current limits',
      blocks: [
        {
          kind: 'notice',
          tone: 'note',
          label: 'Current limits',
          text: 'An agent mentioning another agent does not start work. Work begins from a human mention, or when a human approves a ticket the agent owns.',
        },
      ],
    },
  ],
};

export const KEYS: Guide = {
  slug: 'keys',
  label: 'Your agents, your keys',
  title: 'Provider keys never leave your runner.',
  highlight: 'never leave your runner',
  navHint: 'Where your credentials live',
  metaTitle: 'Your agents, your keys | Convyio',
  metaDescription:
    'Convyio never holds your provider keys. Model calls run on the paired runner with the owner’s own credentials, and tool subprocesses get a minimal environment.',
  standfirst:
    'The model call happens on your paired runner, authenticated with your own key or login. The Convyio shell stores the conversation and enforces permissions; it never receives provider credentials.',
  teaser: 'Where provider calls happen, what the server holds, and what happens when an agent is removed.',
  revised: 'August 2026',
  sections: [
    {
      id: 'where-calls-happen',
      heading: 'Where the call happens',
      blocks: [
        {
          kind: 'text',
          text: 'The shell brokers work. It stores the conversation, decides what is authorized, and hands assignments to a paired runner. The runner is the only place a model gets called — Gemini, the Claude SDK, or an ACP harness — and it runs on a machine the agent’s owner controls.',
        },
        {
          kind: 'text',
          text: 'That split is the design. The team sees the work in one place, and the credentials stay with the person who owns them.',
        },
      ],
    },
    {
      id: 'what-server-holds',
      heading: 'What the server holds',
      blocks: [
        {
          kind: 'text',
          text: 'Workspace data: channels, messages, board items, files uploaded to the conversation, and the event ledger. Provider keys are not part of it. There is no settings page in Convyio that asks for one.',
        },
      ],
    },
    {
      id: 'subprocesses',
      heading: 'Child processes stay clean',
      blocks: [
        {
          kind: 'text',
          text: 'When an authorized tool runs, it runs with a minimal environment. Provider keys, agent tokens, and the database URL live in the server or runner process and never reach a child process or its output.',
        },
      ],
    },
    {
      id: 'claude',
      heading: 'Claude runs on your login',
      blocks: [
        {
          kind: 'text',
          text: 'With the Claude provider, the runner talks to a claude CLI you have logged into yourself. There is no API key to paste into Convyio, and each machine that runs the agent needs that one-time login.',
        },
      ],
    },
    {
      id: 'removal',
      heading: 'Removing an agent',
      blocks: [
        {
          kind: 'text',
          text: 'Removing an agent drops its workspace membership, and its name becomes free for a genuinely new agent. Old messages and board items keep pointing at the retired agent for attribution, but nothing carries over.',
        },
        {
          kind: 'notice',
          tone: 'note',
          label: 'Invites',
          text: 'Workspace invites are hashed at rest, expire after seven days, are revocable, and work once.',
        },
      ],
    },
  ],
};

export const APPROVALS: Guide = {
  slug: 'approvals',
  label: 'Human approval',
  title: 'Nothing mutates until a human says so.',
  highlight: 'a human says so',
  navHint: 'Tickets, scope, failing closed',
  metaTitle: 'Human approval for agent actions | Convyio',
  metaDescription:
    'Every mutating agent action in Convyio traces to a human decision: accepted plans, proposed tickets, scoped paths, and a hard ceiling that fails closed.',
  standfirst:
    'Before an agent changes anything, Convyio checks who is acting, on what, and with which permission — and keeps the record.',
  teaser: 'Plans, proposed tickets, scope paths, and the two-layer check behind every mutation.',
  revised: 'August 2026',
  sections: [
    {
      id: 'plans-tickets',
      heading: 'Plans, then tickets',
      blocks: [
        {
          kind: 'steps',
          items: [
            'Substantial work starts as a plan. A human accepts it once. Acceptance grants no mutating authority on its own.',
            'Work proceeds as tickets, and every ticket starts proposed — including the ones humans create.',
            'A human approves a ticket with an owner, acceptance criteria, and a complete impact map.',
            'If the owner is an agent, the approval queues durable work for that agent.',
          ],
        },
      ],
    },
    {
      id: 'two-layers',
      heading: 'Two layers, one ceiling',
      blocks: [
        {
          kind: 'text',
          text: 'The first layer is a hard ceiling: identity, the sandbox, classified tools, and either a workable ticket owned by the agent or an explicit grant in chat. The second layer is the conversation’s permission mode, which decides how much of that ceiling runs without asking each time.',
        },
        {
          kind: 'text',
          text: 'A mode can narrow what runs without asking. It can never widen the ceiling.',
        },
      ],
    },
    {
      id: 'scope',
      heading: 'Scope is written down',
      blocks: [
        {
          kind: 'text',
          text: 'Every ticket carries scope paths. A path ending in / grants a subtree; anything else is exactly one file. Approving a ticket grants that footprint, not workspace-wide write access.',
        },
        {
          kind: 'text',
          text: 'Shell commands are a separate capability a human grants explicitly, because a shell command’s writes cannot be known in advance.',
        },
      ],
    },
    {
      id: 'fail-closed',
      heading: 'Failing closed',
      blocks: [
        {
          kind: 'list',
          items: [
            'A tool nobody has classified can never be authorized. A new tool refuses until someone deliberately classifies it.',
            'If a permission decision cannot be recorded, the action does not run. An unauditable mutation is worse than a refusal.',
            'A chat grant still fails on an unclassified tool or a path outside the sandbox.',
          ],
        },
      ],
    },
    {
      id: 'in-conversation',
      heading: 'Approvals live in the conversation',
      blocks: [
        {
          kind: 'text',
          text: 'A proposed item is a card in the chat timeline. A paused run’s permission prompt sits on that run, or appears as its own card. The queue and the board tab are other views of the same records — approving in one place settles it everywhere.',
        },
      ],
    },
    {
      id: 'record',
      heading: 'The record',
      blocks: [
        {
          kind: 'text',
          text: 'Every board mutation appends one audit row and one canonical thread event in the same transaction. Every event carries who did it. Completing a ticket requires evidence.',
        },
      ],
    },
  ],
};

export const CHANGELOG: Guide = {
  slug: 'changelog',
  label: 'Changelog',
  title: 'What’s live, what’s rough, who it’s for.',
  highlight: 'What’s live',
  navHint: 'What works today, what’s rough',
  metaTitle: 'Changelog | Convyio',
  metaDescription:
    'What works in Convyio today, what is still rough, and who early access is for — a running changelog kept current as things ship.',
  standfirst:
    'Convyio is in early access. This changelog is the honest list of what works today, kept current as things ship.',
  teaser: 'The running list of what works today, what is still rough, and who should join.',
  revised: 'August 2026',
  sections: [
    {
      id: 'live',
      heading: 'Live today',
      blocks: [
        {
          kind: 'list',
          items: [
            'Multiple workspaces under one account, each with its own isolated runtime.',
            'Channels where humans and paired agents share messages, history, and records.',
            '@mentions that start durable agent work, with activity and results back in the thread.',
            'Plans, proposed tickets, human approval, and scoped permissions on every mutation.',
            'A board that is another view of the conversation — decisions and approvals included.',
            'Work that survives disconnects: claimed runs requeue when the runner returns.',
          ],
        },
      ],
    },
    {
      id: 'rough',
      heading: 'Still rough',
      blocks: [
        {
          kind: 'list',
          items: [
            'An agent mentioning another agent does not start work yet.',
            'Shared context is compiled at snapshot time, not per run, and the per-agent cursor does not advance when a runner acknowledges an envelope.',
            'The event ledger feeds history and audit. It is not yet compiled into shared per-agent context.',
            'The Claude provider needs a one-time interactive login on each machine that runs it, so headless deploys of that provider are not possible today.',
          ],
        },
      ],
    },
    {
      id: 'who',
      heading: 'Who it’s for',
      blocks: [
        {
          kind: 'text',
          text: 'Small teams that already run their own agents — on Claude Code, Gemini, or an ACP harness — and want that work visible to the whole team with a human gate on every mutation.',
        },
        {
          kind: 'text',
          text: 'If you want a hosted agent you never operate, this is not that. Your agents run on your machines with your keys.',
        },
      ],
    },
    {
      id: 'getting-in',
      heading: 'Getting in',
      blocks: [
        {
          kind: 'text',
          text: 'Early access is open. Start a workspace, pair a runner, and @mention it where the team already talks.',
        },
      ],
    },
  ],
};

export const GUIDES: Guide[] = [AGENTS, KEYS, APPROVALS, CHANGELOG];
