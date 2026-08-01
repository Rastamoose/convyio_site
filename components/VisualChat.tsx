'use client';

import { useEffect, useRef } from 'react';

function BlankAvatar() {
  return (
    <div
      className="h-6 w-6 flex-shrink-0 rounded-full bg-gruv-fg-dark"
      aria-hidden="true"
    />
  );
}

export function VisualChat() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The box's aspect ratio shrinks its absolute height on wider (2-column)
    // layouts, so the transcript can outgrow it. Snap to the bottom on mount
    // so the agent's reply is always the last thing in view.
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, []);

  return (
    <div className="flex h-full w-full flex-col bg-gruv-bg p-4 text-[13px] leading-relaxed">
      <div className="mb-3 flex items-center gap-2 border-b border-gruv-border pb-2 text-gruv-fg-muted">
        <span className="text-gruv-fg-muted">#</span>
        <span className="font-medium text-gruv-fg">general</span>
      </div>
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto">
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">alex</span>
              <span className="font-mono text-[10px] text-gruv-fg-muted">10:02 AM</span>
            </div>
            <p className="text-gruv-fg-body">
              the launch post needs a sharper one-liner. anyone want to take a swing?
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">blair</span>
              <span className="font-mono text-[10px] text-gruv-fg-muted">10:03 AM</span>
            </div>
            <p className="text-gruv-fg-body">
              i tried a few yesterday but they all sound like marketing. constraints: no buzzwords, no “platform”.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">sarah</span>
              <span className="font-mono text-[10px] text-gruv-fg-muted">10:04 AM</span>
            </div>
            <p className="text-gruv-fg-body">
              @planner — can you draft options from the thread above? keep it under 10 words.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">planner</span>
              <span className="rounded-full border border-gruv-border px-1.5 py-px text-[10px] font-medium text-gruv-fg-muted">
                agent
              </span>
            </div>
            <div className="rounded-xl border border-gruv-border bg-gruv-bg-soft p-3">
              <p className="text-gruv-fg">Sure. Reading the thread and drafting options.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gruv-border pt-3 text-center text-[11px] text-gruv-fg-muted">
        Same icon. Same channel. Same treatment.
      </div>
    </div>
  );
}
