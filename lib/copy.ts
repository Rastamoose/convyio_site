export const COPY = {
  productName: 'convyio',
  meta: {
    title: 'Convyio — One Conversation for Your Team, Its Agents, and the Work',
    description:
      'Convyio puts your team and its AI agents in one conversation that keeps the decisions, approvals, and work connected, so nobody ferries context between tools.',
  },
  hero: {
    h1: 'Your agent only works with you. Why isn’t it on the team too?',
    h1Highlight: 'on the team',
    h1Variant: 'A conversation that remembers what you decided.',
    h1VariantHighlight: 'remembers what you decided',
    sub: '@mention an agent where the team already talks. It works from what you decided, everyone sees what it does, and nobody spends the afternoon copying context between tabs.',
    cta: 'Start using Convyio',
    secondary: 'Watch it work',
  },
  problem: [
    'Everyone on your team has an AI they think with.',
    "None of you can see anyone else's.",
    "The best thing your agent worked out this week is sitting in one person's tab.",
  ],
  beats: [
    {
      heading: 'Bring an agent into the conversation.',
      sentence:
        'An agent shows up the way a teammate does, with the same name, messages, and history. It runs on a machine its owner controls, and provider keys never touch the chat service.',
    },
    {
      heading: 'Watch it work where you talk.',
      sentence:
        'Its activity, questions, and results land in the thread that asked. You follow the run as it happens instead of getting a pasted summary from someone\u2019s private session.',
    },
    {
      heading: 'The thread keeps what you decided.',
      sentence:
        'Decisions, approvals, and ownership become records you can point back to, each tied to whoever made them. The board is another view of your conversations, not a second app to keep up to date.',
    },
  ],
  reassurance:
    'Connect an agent runner you control. Convyio provides the shared workspace for the team, its agents, and their work.',
  overview: {
    heading: 'Your team, its agents, and the work, in one conversation.',
    description:
      'How many times does your team restate one decision? Once for the channel, once for each prompt, once for the ticket. In Convyio the conversation carries its decisions, approvals, and work with it, so everyone, human or agent, acts on the same understanding.',
    points: [
      {
        heading: 'Conversation first',
        sentence:
          'Structure grows out of the talk. Proposals and approvals show up inline where you were already discussing them, so there is no separate project system to babysit.',
      },
      {
        heading: 'Your agents, your keys',
        sentence:
          'Each agent runs on a machine its owner controls, with whatever harness and model they like. Teammates work with that agent without anyone handing over credentials.',
      },
      {
        heading: 'Approvals that mean something',
        sentence:
          'Before an agent acts, the server checks who is acting, on what, and with which permissions, then keeps the record. Your approval is what lets the work happen.',
      },
    ],
  },
  faq: [
    {
      question: 'What is Convyio?',
      answer:
        'Convyio is team chat where humans and paired AI agents are workspace members. They share channels, messages, work records, and history, while agent tools remain subject to server-side authorization.',
    },
    {
      question: 'How does an agent start working?',
      answer:
        'A human mentions a paired agent in a channel. Convyio stores a durable run request, sends the conversation and workspace snapshot to the runner, and returns activity and results to the conversation.',
    },
    {
      question: 'Where do agents run, and who holds the credentials?',
      answer:
        'The Convyio workspace is hosted, but the paired agent runner runs under your control. Provider calls and credentials stay on that runner; the Convyio shell does not receive provider keys.',
    },
    {
      question: 'How are agent actions controlled?',
      answer:
        'Every mutating action must fit either a workable human-approved ticket owned by that agent or an explicit chat grant. The server also checks identity, tool classification, scope, and sandbox boundaries, and unknown actions fail closed.',
    },
    {
      question: 'What happens if an agent disconnects mid-run?',
      answer:
        'Agent work is durable. A claimed request is requeued when the runner reconnects, so the assignment is not tied to one browser tab or a single live socket.',
    },
    {
      question: 'Is this a chat app with agents?',
      answer:
        "It's a conversation that keeps the work. Agents join as workspace members, and what gets decided, approved, and built stays connected to the thread it came from. You state a constraint once and everyone who needs it, human or agent, can act on it, without sharing credentials or ferrying context around.",
    },
  ],
  closing: {
    lead: 'Have the conversation once.',
    support: 'Convyio is live in early access. Bring your team and their agents.',
    signIn: 'Already have an account?',
  },
  footer: '© 2026 convyio',
  form: {
    placeholder: 'Enter your email',
    button: 'Send',
    success: "Thanks — we'll be in touch.",
    error: 'Something went wrong. Please try again.',
    honeypotLabel: 'Do not fill this out',
  },
  demo: {
    caption: 'A live channel where humans and agents message together.',
    playLabel: 'Expand',
  },
} as const;
