'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const AVATAR_HUES: Record<string, string> = {
  alex: 'bg-gruv-accent',
  blair: 'bg-gruv-aqua',
  harris: 'bg-gruv-purple',
  noodle: 'bg-gruv-green',
};

function Avatar({ name }: { name?: string }) {
  const hue = (name && AVATAR_HUES[name]) || 'bg-gruv-fg-dark';
  return (
    <div className={`h-7 w-7 flex-shrink-0 rounded-full ${hue}`} aria-hidden="true" />
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
          <span className="font-medium text-gruv-fg">{name}</span>
          {agent && (
            <span className="rounded-full bg-gruv-green px-1.5 py-px text-[10px] font-medium text-gruv-bg-hard">
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
      <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gruv-fg-dark" />
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
      <div className="rounded-xl border border-gruv-border bg-gruv-bg-soft p-3">
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
      <div className="rounded-xl border border-gruv-border bg-gruv-bg-soft p-3">
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
      <div className="rounded-xl border border-gruv-border bg-gruv-bg-soft p-3">
        <p className="text-gruv-fg">Hero: One space for your team and its agents.</p>
        <p className="text-gruv-fg">One-liner: The shared room for your people and your agents.</p>
      </div>
    ),
  },
];

const MESSAGE_INTERVAL_MS = 1800;
const AGENT_TYPING_MS = 3200;
const LOOP_PAUSE_MS = 5000;

/**
 * Drives the transcript reveal. A single instance of this hook lives in
 * DemoSlot so the inline frame and the lightbox always show the same
 * progress — opening the lightbox continues the run in place, and looping
 * back to the start restarts both at once.
 */
export function useDemoPlayback(active: boolean) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisibleCount(MESSAGES.length);
      return;
    }

    if (visibleCount >= MESSAGES.length) {
      const timer = setTimeout(() => setVisibleCount(0), LOOP_PAUSE_MS);
      return () => clearTimeout(timer);
    }

    const delay = MESSAGES[visibleCount].agent ? AGENT_TYPING_MS : MESSAGE_INTERVAL_MS;
    const timer = setTimeout(() => setVisibleCount((count) => count + 1), delay);
    return () => clearTimeout(timer);
  }, [active, visibleCount]);

  const restart = useCallback(() => setVisibleCount(0), []);
  const playing = active && visibleCount < MESSAGES.length;

  return { visibleCount, playing, restart };
}

export function DemoChat({
  visibleCount = MESSAGES.length,
  playing = false,
}: {
  visibleCount?: number;
  playing?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animate = playing || visibleCount < MESSAGES.length;

  useEffect(() => {
    // Keep the newest message in view. The frame itself never changes size
    // (the parent owns a fixed height) — only this container's scroll moves.
    const node = scrollRef.current;
    if (!node) return;
    if (visibleCount === 0) {
      node.scrollTop = 0;
    } else if (animate) {
      node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
    } else {
      node.scrollTop = node.scrollHeight;
    }
  }, [animate, visibleCount]);

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden w-14 flex-col items-center gap-3 border-r border-gruv-border bg-gruv-bg-soft py-4 md:flex">
        <Avatar name="alex" />
        <Avatar name="blair" />
        <Avatar name="harris" />
        <Avatar name="noodle" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-gruv-border px-4 py-3 text-[13px]">
          <span className="text-gruv-fg-muted">#</span>
          <span className="font-medium text-gruv-fg">general</span>
        </div>
        <div
          ref={scrollRef}
          className={`min-h-0 flex-1 space-y-4 overflow-y-auto p-4 text-[13px] leading-relaxed ${
            animate ? '' : 'overflow-y-hidden'
          }`}
          aria-live={animate ? 'polite' : undefined}
        >
          {MESSAGES.slice(0, visibleCount).map((message, index) => (
            <div key={index} className={animate ? 'animate-fade-in' : undefined}>
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
