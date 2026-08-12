/**
 * Legal document content for /privacy and /terms.
 *
 * These pages are prose, so the content lives here as structured data and the
 * rendering lives in components/LegalDoc.tsx. Keep the two concerns separate:
 * editing wording should never require touching layout, and vice versa.
 *
 * legal/privacy-policy.txt and legal/terms-of-service.txt hold the plain-text
 * record of the same documents. When a clause changes, change it in both places
 * and bump `revised`.
 */

export const LEGAL_CONTACT = 'hello@convyio.com';

export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'terms'; items: { term: string; text: string }[] }
  | { kind: 'notice'; tone: 'warn' | 'note'; label: string; text: string }
  | { kind: 'table'; caption?: string; head: string[]; rows: string[][] };

export type Section = {
  id: string;
  heading: string;
  blocks: Block[];
};

export type LegalDocument = {
  slug: 'privacy' | 'terms';
  title: string;
  standfirst: string;
  revised: string;
  counterpart: { href: string; label: string };
  sections: Section[];
};

const OPERATOR = 'Harris Asif, operating as convyio';

export const PRIVACY: LegalDocument = {
  slug: 'privacy',
  title: 'Privacy Policy',
  standfirst:
    'What convyio collects, why, who else sees it, and what you can ask us to do about it. convyio puts AI agents in your channels, so section 3 is the one most people will not expect — please read it.',
  revised: '13 August 2026',
  counterpart: { href: '/terms', label: 'Terms of Service' },
  sections: [
    {
      id: 'who-we-are',
      heading: '1. Who we are',
      blocks: [
        {
          kind: 'text',
          text: 'convyio is a team chat product in which AI agents participate as members of a channel alongside people. This policy explains what personal data we collect when you use the convyio application and this website, why we collect it, who we share it with, and what rights you have.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Data controller',
              text: `${OPERATOR}. convyio is not yet a registered company, so the controller is an individual.`,
            },
            { term: 'Contact', text: LEGAL_CONTACT },
          ],
        },
        {
          kind: 'text',
          text: 'In this policy, “the Service” means the convyio application, and “the Site” means this website. They collect different data, and we say which is which wherever it matters.',
        },
      ],
    },
    {
      id: 'what-we-collect',
      heading: '2. What we collect',
      blocks: [
        { kind: 'lead', text: 'Account and identity data' },
        {
          kind: 'text',
          text: 'We use Supabase Auth for authentication. You can sign up with an email address and password, or, where enabled, sign in with your Google account. We store:',
        },
        {
          kind: 'list',
          items: [
            'Your email address.',
            'Your Supabase Auth user ID, which we use as your identifier in our database.',
            'Your display name, chosen when you first sign in — 1 to 32 characters of letters, digits, spaces, hyphens and underscores. It is permanent once set.',
            'Optionally, a “desired username” hint you may supply during email sign-up.',
          ],
        },
        {
          kind: 'text',
          text: 'We do not store your password, and we never receive your Google credentials. Authentication happens entirely through Supabase Auth; our server only ever receives the resulting signed token and re-verifies it on every request. If you sign in with Google, Google sees your email address and basic profile information as part of that sign-in.',
        },
        { kind: 'lead', text: 'Content you create' },
        {
          kind: 'text',
          text: 'Everything you create in convyio is stored in our database, hosted by Supabase, and, for files, in Supabase Storage:',
        },
        {
          kind: 'list',
          items: [
            'Messages — the text, the channel, the author’s name, identifier and kind (human or agent), timestamps, any edits, and reply relationships.',
            'Reactions — the emoji and who reacted.',
            'Board items — proposals, approvals, descriptions, status changes, and the scope paths each item covers.',
            'Board events — an append-only audit log of every change made to the board.',
            'Channels — the name, who created it, and whether it is archived or pinned.',
            'File uploads — the original filename, MIME type, size, image dimensions where applicable, and the file itself.',
          ],
        },
        {
          kind: 'text',
          text: 'Messages, board items and the board audit log are shared workspace records. Other members can see them, and they are not removed when you stop using the Service or delete your account. Section 8 explains exactly what deletion does.',
        },
        { kind: 'lead', text: 'Uploaded files, and a limitation you should know about' },
        {
          kind: 'text',
          text: 'Files you upload go into a private storage bucket and are served back to your browser through our own server, at a URL of the form /api/uploads/<random-id>/<filename>.',
        },
        {
          kind: 'notice',
          tone: 'warn',
          label: 'Treat upload URLs as secrets',
          text: 'You must be signed in to upload a file, but once a file exists the URL itself is the key to it. The identifier is a random UUID, and anyone holding the full URL can fetch the file without signing in. This follows from how browsers display images: an <img> tag cannot send an authorisation header, so the unguessability of the URL is what protects the file. Sharing an upload URL shares access to it. Do not upload anything through convyio that would cause harm if the URL were forwarded, pasted into another tool, or captured in a browser history.',
        },
        {
          kind: 'text',
          text: 'Files uploaded but never attached to a message are deleted automatically about an hour after upload.',
        },
        { kind: 'lead', text: 'Session and technical data' },
        {
          kind: 'list',
          items: [
            'Supabase authentication tokens are stored in your browser. With “Remember me” left ticked (the default) they go in localStorage and persist between visits; untick it and they go in sessionStorage, discarded when you close the tab.',
            'A “remember me until” timestamp is stored in your browser. A remembered session expires after 30 days of inactivity.',
            'Our server caches verified tokens for up to 60 seconds, so reconnections and bursts of API calls do not each require re-verification against Supabase.',
            'The bearer tokens used for our own API exist only in server memory, expire after 12 hours, and are revoked when your last connection closes.',
            'Our infrastructure providers process standard connection data — IP address, timestamps, user agent, request paths — in server logs, in order to run and secure the Service.',
          ],
        },
        { kind: 'lead', text: 'On this website' },
        {
          kind: 'list',
          items: [
            'If you submit the early-access form, we collect your email address, which AI agents your team uses, where your team currently talks, and your free-text answer about agent visibility. These reach us through Formspree.',
            'We use PostHog to understand how this site is used: page views, whether the demo was scrolled to, played or completed, focus and submission of the email form, and clicks on calls to action, along with the page URL, the referring URL and any UTM campaign parameters in the link you arrived through. PostHog also gives your browser a pseudonymous identifier so repeat visits can be recognised.',
          ],
        },
        { kind: 'lead', text: 'What we do not collect' },
        {
          kind: 'text',
          text: 'We do not collect special category data, government identifiers, payment card details or precise location data. We do not use advertising trackers. We do not sell personal data, and we do not share it for cross-context behavioural advertising.',
        },
      ],
    },
    {
      id: 'agents',
      heading: '3. How AI agents use your data',
      blocks: [
        {
          kind: 'text',
          text: 'The thing that makes convyio different is that AI agents are members of channels. That has consequences for your data, and they are worth being explicit about.',
        },
        {
          kind: 'text',
          text: 'When an agent is active in your workspace it can read the chat context of the channel it is in and the contents of the board. If a message containing images is routed to the agent, those images go to the agent’s underlying AI provider. The agent keeps a rolling “memory” and a record of its pending proposals, and its proposals are recorded as board items and board events.',
        },
        {
          kind: 'notice',
          tone: 'warn',
          label: 'What you send to a channel, you send to an AI provider',
          text: 'Text and images routed to an agent are transmitted to a third-party AI provider to generate the response — Google (Gemini) or Anthropic (Claude), depending on how the workspace is configured. Do not put anything in a channel where an agent is present that you are not willing to send to that provider. That includes credentials, client confidential information you are not permitted to disclose to subprocessors, and other people’s personal data you have no lawful basis to share.',
        },
        {
          kind: 'text',
          text: 'Agents do not make automated decisions about you that produce legal or similarly significant effects, within the meaning of Article 22. Agent actions that change the board or files are subject to the approval model in our Terms of Service — including the limitation disclosed there, that the Claude provider’s own file and shell tools are not gated by board approval.',
        },
      ],
    },
    {
      id: 'lawful-basis',
      heading: '4. Why we use it, and our lawful basis',
      blocks: [
        {
          kind: 'table',
          head: ['Purpose', 'Data used', 'Lawful basis'],
          rows: [
            [
              'Creating and authenticating your account',
              'Email, auth user ID, display name',
              'Performance of a contract',
            ],
            [
              'Providing chat, channels, the board and uploads',
              'The content data in section 2',
              'Performance of a contract',
            ],
            [
              'Generating agent responses and proposals',
              'Message text, board context, uploaded images',
              'Performance of a contract',
            ],
            [
              'Maintaining the board audit log',
              'Board events, actor IDs',
              'Legitimate interests — integrity and accountability of a shared record',
            ],
            [
              'Securing the Service, preventing abuse, diagnosing faults',
              'Session and technical data, server logs',
              'Legitimate interests',
            ],
            [
              'Answering your enquiry and telling you when access opens',
              'Early-access form submissions',
              'Legitimate interests, or consent where required',
            ],
            ['Website analytics', 'PostHog data in section 2', 'Consent'],
            [
              'Meeting legal obligations and lawful requests',
              'As required',
              'Legal obligation',
            ],
          ],
        },
      ],
    },
    {
      id: 'sharing',
      heading: '5. Who else sees it',
      blocks: [
        {
          kind: 'text',
          text: 'We do not sell your personal data. We share it with the following providers, who process it on our behalf except where noted:',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Supabase',
              text: 'Authentication, the Postgres database and file storage. All account and content data lives here.',
            },
            { term: 'Railway', text: 'Hosting and running the application.' },
            { term: 'Vercel', text: 'Hosting this website.' },
            {
              term: 'Google',
              text: 'Google Sign-In, where enabled, for which Google acts as an independent controller; and the Gemini API, where a workspace uses Gemini as its agent provider.',
            },
            {
              term: 'Anthropic',
              text: 'The Claude service, where a workspace uses Claude as its agent provider.',
            },
            { term: 'PostHog', text: 'Product analytics on this website.' },
            { term: 'Formspree', text: 'Delivering this website’s form submissions to us.' },
          ],
        },
        {
          kind: 'text',
          text: 'We may also disclose data where we are legally required to, to establish or defend legal claims, or to a buyer or successor if convyio is sold or transferred — in which case we will tell you before your data becomes subject to a different privacy policy.',
        },
      ],
    },
    {
      id: 'transfers',
      heading: '6. International transfers',
      blocks: [
        {
          kind: 'text',
          text: 'Several of these providers are established in, or process data in, the United States and other countries outside the UK and EEA. Where we transfer personal data outside the UK or EEA we rely on the UK International Data Transfer Agreement, the UK Addendum to the European Commission’s Standard Contractual Clauses, or the EU Standard Contractual Clauses, as applicable — or on an adequacy decision where one covers the receiving country.',
        },
        {
          kind: 'text',
          text: `You can ask us for a copy of the relevant safeguards at ${LEGAL_CONTACT}.`,
        },
      ],
    },
    {
      id: 'cookies',
      heading: '7. Cookies and browser storage',
      blocks: [
        {
          kind: 'text',
          text: 'The Service uses no advertising or analytics cookies. The only persistent data it puts in your browser is your Supabase authentication token and the “remember me” expiry timestamp described in section 2. Both are strictly necessary to keep you signed in, and cannot be turned off without making the Service unusable.',
        },
        {
          kind: 'text',
          text: 'This website uses PostHog analytics, which stores a pseudonymous identifier in your browser. Analytics loads for visitors who have not sent a “Do Not Track” or Global Privacy Control signal, rather than waiting for an explicit opt-in. We honour both signals: if your browser sends one, we do not capture analytics at all. You can also block it with any content blocker, and you can email us to have analytics data associated with your browser deleted.',
        },
      ],
    },
    {
      id: 'retention',
      heading: '8. Retention, and what deleting your account does',
      blocks: [
        { kind: 'lead', text: 'Deleting your account' },
        {
          kind: 'text',
          text: 'You can delete your account yourself, at any time, from within the application. Deletion is permanent — we cannot restore a deleted account. It removes your account record and your sign-in credentials, so you can no longer access the Service and we no longer hold your email address.',
        },
        {
          kind: 'notice',
          tone: 'warn',
          label: 'Deleting your account does not delete what you posted',
          text: 'Your messages stay in the channels where you posted them, and the board audit log keeps its record of the board actions you took. Both remain visible to the other members of that workspace. We work this way because these are shared records: pulling one person’s messages out of a channel tears holes in conversations other people are still relying on, and an audit log that can be rewritten after the fact is not an audit log. So post with that in mind — deleting your account ends your relationship with us, but it does not retract what you said. If you want particular content gone, delete it yourself before you delete your account, or ask us.',
        },
        { kind: 'lead', text: 'How long we keep everything else' },
        {
          kind: 'list',
          items: [
            'Messages, reactions, board items, board events, channels and account records are kept until deleted. Some are shared records and are not removed when you leave.',
            'Uploaded files are kept for as long as the message they are attached to exists.',
            'Files uploaded but never attached to a message are deleted after about an hour.',
            '“Remember me” sessions expire after 30 days of inactivity.',
            'Server-side API tokens expire after 12 hours, or when your last connection closes.',
            'Early-access form submissions are kept for 24 months, or until you ask us to delete them, whichever comes first.',
            'Server logs and website analytics are kept for a limited period by the providers named in section 5, and we do not keep them longer than we need them.',
          ],
        },
        { kind: 'lead', text: 'Getting a copy of your data' },
        {
          kind: 'text',
          text: `There is not yet a self-service export. Email ${LEGAL_CONTACT} and we will provide your data in a portable format within one month, as the law requires.`,
        },
      ],
    },
    {
      id: 'your-rights',
      heading: '9. Your rights',
      blocks: [
        { kind: 'text', text: 'Under UK and EU data protection law you have the right to:' },
        {
          kind: 'list',
          items: [
            'access a copy of the personal data we hold about you;',
            'have inaccurate data corrected;',
            'have your data erased, in certain circumstances;',
            'restrict how we process your data, in certain circumstances;',
            'receive your data in a portable format;',
            'object to processing based on our legitimate interests;',
            'withdraw consent at any time, where we rely on consent; and',
            'not be subject to solely automated decisions producing legal or similarly significant effects. We do not make such decisions.',
          ],
        },
        {
          kind: 'text',
          text: `You can delete your account yourself in the application at any time. For anything else, including erasure of specific content, email ${LEGAL_CONTACT}. We will respond within one month. We may need to verify your identity first, and we will explain if a legal exemption means we cannot fully comply.`,
        },
        {
          kind: 'text',
          text: 'We should be direct about one limit on erasure. As section 8 explains, deleting your account does not delete your messages or the board audit log, because those are shared records other members of the workspace rely on and, in the case of the audit log, are append-only by design. If you ask us to erase specific content we will consider it on its facts and tell you what we did and why. Where we can, we prefer removing or de-identifying content to refusing outright. Where we conclude we are entitled to keep it, we will say so plainly and explain how you can challenge that.',
        },
        {
          kind: 'text',
          text: 'If you are unhappy with how we have handled your data you can complain to the Information Commissioner’s Office at ico.org.uk, or, if you are in the EEA, to your local supervisory authority. We would appreciate the chance to put it right first.',
        },
      ],
    },
    {
      id: 'security',
      heading: '10. Security',
      blocks: [
        { kind: 'text', text: 'Our measures include:' },
        {
          kind: 'list',
          items: [
            'Every database table has row-level security enabled with no permissive policies, so access through the database’s public data API is denied outright. The application server connects directly with a privileged credential and is the only route to the data.',
            'Reaching a workspace requires a verified Supabase session for people; agents need an agent token or an invite, and invites can be revoked.',
            'File storage is a private bucket, served only through our own authenticated endpoint — subject to the URL limitation in section 2.',
            'The board acts as a permission boundary for agent actions: a mutating action must correspond to an approved or in-progress board item whose declared scope covers the path being changed, and anything not known to be read-only is refused. See the Claude exception in our Terms of Service.',
            'Data is encrypted in transit, and encrypted at rest by our infrastructure providers.',
          ],
        },
        {
          kind: 'text',
          text: 'No system is perfectly secure. If we become aware of a personal data breach that presents a risk to you, we will notify the relevant supervisory authority within 72 hours where required, and notify you where the law requires it.',
        },
      ],
    },
    {
      id: 'children',
      heading: '11. Children',
      blocks: [
        {
          kind: 'text',
          text: `The Service is not intended for anyone under 16, and you must be at least 16 to create an account. We do not knowingly collect personal data from children under 16. If you believe a child under 16 has given us personal data, email ${LEGAL_CONTACT} and we will delete it.`,
        },
      ],
    },
    {
      id: 'changes',
      heading: '12. Changes to this policy',
      blocks: [
        {
          kind: 'text',
          text: 'We may update this policy. If a change materially affects how we use your personal data we will tell you by email or in the Service before it takes effect. The revision date at the top of this page shows when it last changed, and we will provide earlier versions on request.',
        },
      ],
    },
    {
      id: 'contact',
      heading: '13. Contact',
      blocks: [
        {
          kind: 'terms',
          items: [
            { term: 'Responsible for your data', text: OPERATOR },
            { term: 'Email', text: LEGAL_CONTACT },
          ],
        },
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  slug: 'terms',
  title: 'Terms of Service',
  standfirst:
    'The agreement between you and convyio. Section 5, on AI agents, contains the limits you most need to understand before you let an agent loose on your work — including one place where our approval model does not hold.',
  revised: '13 August 2026',
  counterpart: { href: '/privacy', label: 'Privacy Policy' },
  sections: [
    {
      id: 'who-we-are',
      heading: '1. Who we are, and what these terms cover',
      blocks: [
        { kind: 'text', text: 'These terms are a contract between you and:' },
        {
          kind: 'terms',
          items: [
            { term: 'convyio', text: `${OPERATOR} (“convyio”, “we”, “us”)` },
            { term: 'Contact', text: LEGAL_CONTACT },
          ],
        },
        {
          kind: 'text',
          text: 'They govern your use of the convyio application and this website (together, “the Service”). convyio is a team chat product in which AI agents participate as members of channels alongside people.',
        },
        {
          kind: 'text',
          text: 'By creating an account or using the Service, you agree to these terms. If you do not agree, do not use the Service. Our Privacy Policy explains how we handle personal data and forms part of these terms.',
        },
        {
          kind: 'text',
          text: 'We run convyio as a single hosted service. These terms do not cover any deployment of the software that you run yourself.',
        },
      ],
    },
    {
      id: 'early-stage',
      heading: '2. The Service is early-stage',
      blocks: [
        {
          kind: 'text',
          text: 'convyio is new. Features will change, occasionally break, and sometimes be removed. We may modify or discontinue any part of the Service. We will give you reasonable notice of changes that materially reduce functionality you rely on, and at least 30 days’ notice before discontinuing the Service entirely, so you can retrieve your content.',
        },
        {
          kind: 'text',
          text: 'We do not currently offer a service level agreement, an uptime guarantee or a backup guarantee. Keep your own copies of anything you cannot afford to lose.',
        },
      ],
    },
    {
      id: 'your-account',
      heading: '3. Eligibility and your account',
      blocks: [
        { kind: 'text', text: 'You must be at least 16 years old to use the Service.' },
        {
          kind: 'text',
          text: 'You must give accurate account information and keep it current. You sign in with an email address and password, or with a Google account where that option is enabled; authentication is provided by Supabase Auth and we never receive your password.',
        },
        {
          kind: 'text',
          text: `You are responsible for activity under your account and for keeping your credentials secure. Tell us promptly at ${LEGAL_CONTACT} if you think your account has been compromised.`,
        },
        {
          kind: 'text',
          text: 'If you use the Service on behalf of an organisation, you confirm you have authority to bind that organisation to these terms, and “you” means both you and that organisation.',
        },
        {
          kind: 'text',
          text: 'One person, one account. Do not share your account or transfer it without our consent. Your display name is permanent once set, and is visible to other members of any workspace you join.',
        },
      ],
    },
    {
      id: 'your-content',
      heading: '4. Your content',
      blocks: [
        {
          kind: 'text',
          text: 'You keep all rights in the messages, files, board items and other material you submit (“Your Content”). We claim no ownership of it.',
        },
        {
          kind: 'text',
          text: 'You grant us a worldwide, non-exclusive, royalty-free licence to host, store, copy, transmit, display and adapt Your Content, solely as far as necessary to operate, secure and support the Service for you — including transmitting it to the providers listed in the Privacy Policy. The licence ends when Your Content is deleted, except for copies held in routine backups for a limited period.',
        },
        {
          kind: 'text',
          text: 'We do not use Your Content to train AI models, and we do not licence it to anyone else for that purpose.',
        },
        {
          kind: 'text',
          text: 'You confirm you have the rights necessary to submit Your Content, and that submitting it — and having it processed by our providers and by AI agents — does not breach anyone’s rights, any duty of confidence, or any law that applies to you. If you handle regulated information, such as health or financial data, or material covered by a confidentiality obligation to a client, it is your responsibility to decide whether convyio is an appropriate place for it. The Service is not designed or certified for regulated data of that kind.',
        },
        {
          kind: 'notice',
          tone: 'warn',
          label: 'Shared records outlast your account',
          text: 'Messages, board items and the board audit log are shared records. Other members of a workspace can see them, and they remain visible after you leave and after you delete your account — see section 8. The board keeps an append-only audit log of every change, so your board actions are attributable to you and are not silently reversible. Post accordingly.',
        },
        {
          kind: 'text',
          text: 'An uploaded file is served from a URL containing a random identifier, and anyone holding the full URL can retrieve the file without signing in. Uploading requires an account; sharing the URL shares access. Do not upload material where that would be unacceptable to you, or to anyone else whose information is in the file. Files not attached to a message within about an hour are deleted.',
        },
      ],
    },
    {
      id: 'agents',
      heading: '5. AI agents — read this section',
      blocks: [
        {
          kind: 'text',
          text: 'An agent is an AI participant in a channel. It reads chat context and the board, and it can propose and carry out actions such as creating and updating board items and, depending on configuration, changing files.',
        },
        {
          kind: 'text',
          text: 'Agents are powered by third-party AI services — Google’s Gemini or Anthropic’s Claude, depending on configuration. Message text, board context and any images routed to an agent are sent to that provider, so your use of agents is also subject to that provider’s acceptable use policy. We may have to suspend or change agent features if a provider changes its terms, pricing or availability.',
        },
        { kind: 'lead', text: 'Agent output is not reliable' },
        {
          kind: 'text',
          text: 'Agent output may be wrong, incomplete, out of date or fabricated, and may be stated confidently while being wrong. It is not professional, legal, financial, medical or engineering advice. Review agent output before relying on it or acting on it. You remain responsible for decisions you or your team take, whether or not an agent suggested them.',
        },
        { kind: 'lead', text: 'The approval model, and where it does not hold' },
        {
          kind: 'text',
          text: 'convyio is designed so an agent’s changes are gated: a mutating action must correspond to a board item a human has approved, whose declared scope covers the thing being changed, and anything not known to be read-only is refused by default.',
        },
        {
          kind: 'notice',
          tone: 'warn',
          label: 'Important limitation — the Claude provider',
          text: 'Where a workspace is configured to use the Claude provider, that provider’s own file-writing, file-editing and shell command tools operate alongside the board tools and are NOT gated by board approval. In that configuration an agent can change files and run commands without a human approving a board item first. We would rather tell you this plainly than let you infer a guarantee we do not currently give.',
        },
        {
          kind: 'text',
          text: 'If you enable an agent, you accept this. Assume the agent may modify or delete files and run commands in the environment you have given it access to, and act accordingly:',
        },
        {
          kind: 'list',
          items: [
            'Only give an agent access to an environment where that is acceptable.',
            'Keep version control and independent backups of anything it can reach.',
            'Never put credentials, secrets or production access in an agent-accessible environment.',
            'Supervise agent activity rather than leaving it unattended.',
          ],
        },
        {
          kind: 'text',
          text: 'To the fullest extent permitted by law, we are not liable for loss, corruption or unintended disclosure of data, or other consequences, arising from actions taken by an agent you enabled. This does not limit our liability for the matters listed in section 10.',
        },
        {
          kind: 'text',
          text: 'An agent is not a legal person, cannot enter agreements on your behalf, and its statements in a channel are not representations by us.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: '6. Acceptable use',
      blocks: [
        { kind: 'text', text: 'You must not:' },
        {
          kind: 'list',
          items: [
            'break the law, infringe intellectual property, or breach anyone’s privacy or confidentiality;',
            'upload malware, or use the Service to attack, probe or gain unauthorised access to any system, including ours;',
            'attempt to bypass authentication, reach another user’s account or workspace, or read data you have not been granted access to, including by guessing or enumerating upload URLs;',
            'use agents to generate content that is unlawful, harassing, hateful, sexually exploitative or designed to deceive or defraud, or to circumvent an AI provider’s safety measures;',
            'reverse engineer, scrape or resell the Service, or use it to build a competing product;',
            'place unreasonable load on the Service, or evade rate limits, quotas or usage restrictions;',
            'use the Service for automated bulk messaging, spam, or financial or crypto promotion; or',
            'misrepresent yourself or impersonate another person, including by choosing a display name intended to deceive.',
          ],
        },
        {
          kind: 'text',
          text: 'We may investigate suspected breaches and cooperate with law enforcement where legally required.',
        },
      ],
    },
    {
      id: 'fees',
      heading: '7. Fees',
      blocks: [
        {
          kind: 'text',
          text: 'The Service is currently free. We may introduce charges in future; if we do, we will give you at least 30 days’ notice, and you will not be charged unless you choose a paid plan.',
        },
      ],
    },
    {
      id: 'termination',
      heading: '8. Suspension and termination',
      blocks: [
        {
          kind: 'text',
          text: 'You may stop using the Service at any time, and you can delete your account yourself from within the application. Deletion is permanent and cannot be undone.',
        },
        {
          kind: 'notice',
          tone: 'warn',
          label: 'Deleting your account removes the account, not what you posted',
          text: 'Your messages remain in the channels where you posted them, and the board audit log keeps its record of your board actions, both visible to the other members of that workspace. Delete anything you want gone before you delete your account, and export anything you want to keep. The Privacy Policy explains why we work this way.',
        },
        {
          kind: 'text',
          text: 'We may suspend or terminate your access if you materially breach these terms, if your use creates a legal or security risk to us or other users, or if we are required to by law or by one of our providers. Except where the breach is serious or unlawful, or where notice would increase the risk, we will tell you what the problem is and give you a reasonable opportunity to fix it first.',
        },
        {
          kind: 'text',
          text: 'On termination by us, your right to use the Service ends and you may ask us for a copy of Your Content within 30 days, after which we may delete it, subject to the retention practices in the Privacy Policy. If you delete your own account, deletion takes effect immediately and this grace period does not apply. Either way, shared workspace records may be retained by the remaining members of that workspace.',
        },
        {
          kind: 'text',
          text: 'Clauses that by their nature should survive termination do so, including those on ownership of Your Content, your responsibilities, disclaimers, liability, intellectual property, and governing law.',
        },
      ],
    },
    {
      id: 'disclaimers',
      heading: '9. Disclaimers',
      blocks: [
        {
          kind: 'text',
          text: 'The Service is provided “as is”. To the fullest extent permitted by law we exclude all implied warranties, including fitness for a particular purpose, and any warranty that the Service will be uninterrupted, error-free or secure, or that agent output will be accurate.',
        },
        {
          kind: 'text',
          text: 'Nothing in these terms excludes or limits rights you have as a consumer under the Consumer Rights Act 2015, or under any other law that cannot be excluded — including the right to have services supplied with reasonable care and skill.',
        },
      ],
    },
    {
      id: 'liability',
      heading: '10. Liability',
      blocks: [
        {
          kind: 'text',
          text: 'We do not exclude or limit our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be excluded or limited.',
        },
        {
          kind: 'text',
          text: 'Subject to that, and to the fullest extent permitted by law, we are not liable for loss of profits, revenue, business, goodwill or anticipated savings; loss or corruption of data, except where caused by our failure to exercise reasonable care and skill; business interruption; or any indirect or consequential loss.',
        },
        {
          kind: 'text',
          text: 'Subject to the same, our total liability arising out of or in connection with these terms is limited to the greater of the total amount you paid us for the Service in the 12 months before the claim arose, and £100.',
        },
        {
          kind: 'text',
          text: 'If you are a business user, you will indemnify us against claims, liabilities and reasonable costs arising from Your Content, from your breach of section 6, or from your use of agents in breach of section 5. This does not apply to consumers.',
        },
      ],
    },
    {
      id: 'ip',
      heading: '11. Intellectual property',
      blocks: [
        {
          kind: 'text',
          text: 'We own the Service, including its software, design and branding, and nothing in these terms transfers those rights to you. We grant you a limited, revocable, non-transferable right to use the Service in accordance with these terms.',
        },
        {
          kind: 'text',
          text: 'If you send us suggestions, we may use them without obligation or payment to you. We will not identify you as the source without your permission.',
        },
      ],
    },
    {
      id: 'changes',
      heading: '12. Changes to these terms',
      blocks: [
        {
          kind: 'text',
          text: 'We may change these terms. For material changes we will give you at least 30 days’ notice, by email or in the Service. If you do not accept a change you may stop using the Service and delete your account before it takes effect. Continuing to use the Service after a change takes effect means you accept the new terms.',
        },
      ],
    },
    {
      id: 'general',
      heading: '13. General and governing law',
      blocks: [
        { kind: 'text', text: 'These terms are governed by the law of England and Wales.' },
        {
          kind: 'text',
          text: 'The courts of England and Wales have exclusive jurisdiction, except that if you are a consumer resident elsewhere in the UK or in the EEA you may also bring proceedings in the courts of your country of residence, and you keep the benefit of any mandatory consumer protections there.',
        },
        {
          kind: 'text',
          text: `We will try to resolve any dispute informally first — please contact ${LEGAL_CONTACT} before starting proceedings.`,
        },
        {
          kind: 'text',
          text: 'If a provision is found unenforceable, the rest remains in force and that provision is modified to the minimum extent necessary. We may transfer our rights and obligations under these terms to another person or organisation, including on incorporation of a company to operate convyio, and we will tell you if we do; you may not transfer yours without our written consent.',
        },
        {
          kind: 'text',
          text: 'These terms, together with the Privacy Policy, are the entire agreement between us about the Service and supersede any prior arrangements — which does not limit liability for fraudulent misrepresentation. No one other than you and us may enforce them, and a delay in enforcing a term is not a waiver of it.',
        },
      ],
    },
    {
      id: 'contact',
      heading: '14. Contact',
      blocks: [
        {
          kind: 'terms',
          items: [
            { term: 'convyio', text: OPERATOR },
            { term: 'Email', text: `${LEGAL_CONTACT} — for all enquiries, including privacy and security` },
          ],
        },
      ],
    },
  ],
};
