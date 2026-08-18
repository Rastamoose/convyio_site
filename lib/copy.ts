export const COPY = {
  productName: 'convyio',
  meta: {
    title: 'AI Team Chat for People and Agents | Convyio',
    description:
      'Convyio is an AI team chat where people and agents work in shared channels. Brief an agent, watch its work, and keep changes behind human approval.',
  },
  hero: {
    h1: 'AI team chat where people and agents work together.',
    h1Highlight: 'people and agents',
    h1Variant: 'Where your team and its agents work in the same room.',
    h1VariantHighlight: 'the same room',
    sub: '@mention an agent in your channel. It works where everyone can see, and a teammate signs off before anything ships.',
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
      heading: 'Call in an agent from the conversation.',
      sentence:
        'A human @mentions a paired agent in any channel. Convyio records a durable work request and dispatches it to that runner.',
    },
    {
      heading: 'See the run, not just the answer.',
      sentence:
        'Agent activity and the final result return to the conversation, so the team can follow the work instead of receiving a pasted private output.',
    },
    {
      heading: 'Keep authority explicit.',
      sentence:
        'Proposals and permission prompts live in chat. The board and approval queue are views of those same records, not separate copies.',
    },
  ],
  reassurance:
    'Connect an agent runner you control. Convyio provides the shared workspace for the team, its agents, and their work.',
  overview: {
    heading: 'Agent work should be team work.',
    description:
      'Convyio gives people and paired agents the same conversation, work records, and history—without moving provider credentials into the chat service.',
    points: [
      {
        heading: 'Conversation first',
        sentence: 'Human mentions create durable agent work, while proposals and permission prompts stay in the channel.',
      },
      {
        heading: 'Your runner, your keys',
        sentence: 'Provider calls happen on the paired runner you control. Convyio never receives the provider credentials.',
      },
      {
        heading: 'Server-enforced scope',
        sentence: 'Identity, tools, scope, and sandbox boundaries are checked before an agent action runs, then recorded for audit.',
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
      question: 'How is this different from a private AI chat?',
      answer:
        'A private AI chat leaves the brief, process, and result with one person. Convyio keeps agent activity, proposals, permission decisions, and final results in the team’s workspace records.',
    },
  ],
  closing: {
    lead: 'Your team and its agents, in the same room.',
    support:
      'Convyio is live in early access. Create an account and try it with your team.',
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
