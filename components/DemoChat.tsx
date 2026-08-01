'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

const AVATAR_HUES: Record<string, string> = {
  alex: 'from-gruv-accent/40 to-gruv-accent/10',
  blair: 'from-gruv-aqua/40 to-gruv-aqua/10',
  harris: 'from-gruv-purple/40 to-gruv-purple/10',
  noodle: 'from-gruv-green/40 to-gruv-green/10',
};

function Avatar({ name }: { name?: string }) {
  const hue = (name && AVATAR_HUES[name]) || 'from-gruv-fg/20 to-gruv-fg/5';
  return (
    <div
      className={`h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br ${hue}`}
      aria-hidden="true"
    />
  );
}

function Message({
  name,
  time,
  children,
  agent,
}: {
  name: string;
  time: string;
  children: ReactNode;
  agent?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <Avatar name={name} />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`font-medium ${agent ? 'text-gruv-accent' : 'text-gruv-fg'}`}>{name}</span>
          {agent && (
            <span className="rounded-full border border-gruv-accent/40 bg-gruv-accent/10 px-1.5 py-px text-[10px] font-medium text-gruv-accent">
              agent
            </span>
          )}
          <span className="font-mono text-[10px] text-gruv-fg-muted">{time}</span>
        </div>
        <div className="mt-1 text-gruv-fg-body">{children}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3" aria-hidden="true">
      <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-gruv-fg/10 to-gruv-fg/5" />
      <span className="flex items-center gap-1 pt-2">
        <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gruv-fg-muted" />
        <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gruv-fg-muted [animation-delay:300ms]" />
        <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gruv-fg-muted [animation-delay:600ms]" />
      </span>
    </div>
  );
}

interface DemoMessage {
  name: string;
  time: string;
  agent?: boolean;
  body: ReactNode;
}

const MESSAGES: DemoMessage[] = [
  {
    name: 'alex',
    time: '09:12',
    body: 'team — launch is Friday. the hero still says “AI workspace beta” and it reads flat.',
  },
  {
    name: 'blair',
    time: '09:13',
    body: 'yeah and we still don’t have a one-liner for the post. we agreed the angle is “your team and your agents in one room” but nothing is written.',
  },
  {
    name: 'alex',
    time: '09:14',
    body: 'constraints: no buzzwords, under 10 words, and don’t use the word “platform”. we keep sounding like everyone else.',
  },
  {
    name: 'blair',
    time: '09:15',
    body: 'also the crowd hates marketing speak. it should sound like it was written by an engineer.',
  },
  {
    name: 'harris',
    time: '09:16',
    body: '@noodle read the thread above and draft 3 options for the hero and 3 for the post one-liner. respect the constraints.',
  },
  {
    name: 'noodle',
    time: '09:16',
    agent: true,
    body: (
      <div className="rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
        <div className="flex items-center gap-2 text-gruv-green">
          <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gruv-green" />
          <span className="text-xs font-medium">Working</span>
        </div>
        <div className="mt-2 space-y-1 text-gruv-fg-muted">
          <p>Read 12 messages above</p>
          <p>Filtered constraints: no buzzwords, no “platform”, under 10 words</p>
          <p>Drafted 3 hero options + 3 one-liners</p>
        </div>
        <div className="mt-3 space-y-1.5 text-gruv-fg">
          <p className="font-medium text-gruv-fg">Hero options:</p>
          <p>1. Your team and agents, in one room.</p>
          <p>2. One space for your team and its agents.</p>
          <p>3. Work with your team and agents together.</p>
          <p className="mt-2 font-medium text-gruv-fg">One-liner options:</p>
          <p>1. The shared room for your people and your agents.</p>
          <p>2. Where your team and its agents ship work.</p>
          <p>3. One workspace for your team and its agents.</p>
        </div>
      </div>
    ),
  },
  {
    name: 'blair',
    time: '09:18',
    body: '@noodle option 2 is closest for the hero. make it punchier and drop any mention of AI — the product is the room, not the model.',
  },
  {
    name: 'noodle',
    time: '09:18',
    agent: true,
    body: (
      <div className="rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
        <p className="text-gruv-fg">Revised hero:</p>
        <p className="mt-1 text-gruv-fg-muted">One space for your team and its agents.</p>
      </div>
    ),
  },
  {
    name: 'alex',
    time: '09:19',
    body: 'give me the final picks: one hero line, one post one-liner, nothing else.',
  },
  {
    name: 'noodle',
    time: '09:19',
    agent: true,
    body: (
      <div className="rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
        <p className="text-gruv-fg">Hero: One space for your team and its agents.</p>
        <p className="text-gruv-fg">One-liner: The shared room for your people and your agents.</p>
      </div>
    ),
  },
];

const MESSAGE_INTERVAL_MS = 1400;

export function DemoChat({ animate = false }: { animate?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : MESSAGES.length);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    // Reduced motion: show the full transcript immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCount(MESSAGES.length);
      return;
    }

    const interval = setInterval(() => {
      setVisibleCount((count) => {
        if (count >= MESSAGES.length) {
          clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [animate]);

  useEffect(() => {
    if (!animate || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [animate, visibleCount]);

  const playing = animate && visibleCount < MESSAGES.length;

  return (
    <div className="flex h-full min-h-[420px] flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden w-14 flex-col items-center gap-3 border-r border-gruv-border/60 bg-gruv-bg-hard/60 py-4 md:flex">
        <Avatar name="alex" />
        <Avatar name="blair" />
        <Avatar name="harris" />
        <Avatar name="noodle" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-gruv-border/60 px-4 py-3 text-[13px]">
          <span className="text-gruv-fg-muted">#</span>
          <span className="font-medium text-gruv-fg">general</span>
        </div>
        <div
          ref={scrollRef}
          className={`flex-1 space-y-4 overflow-y-auto p-4 text-[13px] leading-relaxed ${
            animate ? 'max-h-[70vh]' : ''
          }`}
          aria-live={animate ? 'polite' : undefined}
        >
          {MESSAGES.slice(0, visibleCount).map((message, index) => (
            <div key={index} className={animate ? 'animate-fade-up' : undefined}>
              <Message name={message.name} time={message.time} agent={message.agent}>
                {message.body}
              </Message>
            </div>
          ))}
          {playing && <TypingIndicator />}
        </div>
      </div>
    </div>
  );
}
