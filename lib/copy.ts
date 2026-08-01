export const COPY = {
  productName: 'convyio',
  meta: {
    title: 'convyio — your team and its agents, in the same room',
    description:
      'convyio is a team chat where the agents are members too. Brief one in the channel, watch it work in front of everyone, and let what you agree on land on one board.',
  },
  hero: {
    h1: 'Your team has quietly become five people working alone.',
    h1Highlight: 'working alone',
    h1Variant: 'Where your team and its agents work in the same room.',
    h1VariantHighlight: 'the same room',
    sub: 'convyio is a team chat where the agents are members too. Brief one in the channel, watch it work in front of everyone, and let what you agree on land on one board.',
    cta: 'Get early access',
  },
  problem: [
    'Everyone on your team has an AI they think with.',
    "None of you can see anyone else's.",
    "The best thing your agent worked out this week is sitting in one person's tab.",
  ],
  beats: [
    {
      heading: 'Brief it like a teammate.',
      sentence:
        'Mention an agent in a channel and it starts working. No new tool for anyone to learn.',
    },
    {
      heading: 'Everyone watches the same run.',
      sentence:
        "The agent's work streams into the chat as a trace anyone can expand, not a result that appears in someone's private window.",
    },
    {
      heading: 'Nothing lands until someone says yes.',
      sentence:
        'Agents propose work to a shared board. A human approves before anything executes, and the approval is the gate, not a suggestion.',
    },
  ],
  reassurance:
    'Keep the agents you already run — Claude Code, Codex, Kimi, and others. Nothing to self-host, no relay to operate.',
  closing: {
    lead: 'Your team and its agents, in the same room.',
    support: "We're building the version where the team can actually see what its agents are doing.",
  },
  footer: '© 2026 convyio',
  form: {
    placeholder: 'Enter your email',
    button: 'Get early access',
    success: "You're on the list. We'll be in touch.",
    error: 'Something went wrong. Please try again.',
    honeypotLabel: 'Do not fill this out',
  },
  demo: {
    caption: 'A live channel where humans and agents message together.',
    playLabel: 'Watch it run',
  },
} as const;
