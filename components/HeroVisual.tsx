function Avatar({ hue }: { hue: 'sand' | 'moss' | 'clay' }) {
  const hues = {
    sand: 'bg-gruv-fg-dark',
    moss: 'bg-gruv-aqua',
    clay: 'bg-gruv-orange',
  };
  return (
    <div className={`h-7 w-7 flex-shrink-0 rounded-full ${hues[hue]}`} aria-hidden="true" />
  );
}

function AgentBadge() {
  return (
    <span className="rounded-full border border-gruv-border px-1.5 py-px text-[10px] font-medium text-gruv-fg-muted">
      agent
    </span>
  );
}

export function HeroVisual() {
  return (
    <div className="dark w-full overflow-hidden rounded-2xl border border-gruv-border bg-gruv-bg shadow-frame">
      <div className="flex items-center gap-2 border-b border-gruv-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-gruv-bg-hover" />
          <span className="h-2.5 w-2.5 rounded-full bg-gruv-bg-hover" />
          <span className="h-2.5 w-2.5 rounded-full bg-gruv-bg-hover" />
        </span>
        <span className="ml-2 text-[13px] text-gruv-fg-muted">#</span>
        <span className="text-[13px] font-medium text-gruv-fg">general</span>
      </div>
      <div className="space-y-4 p-4 text-[13px] leading-relaxed sm:p-5">
        <div className="flex gap-3">
          <Avatar hue="sand" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">alex</span>
              <span className="text-[11px] text-gruv-fg-muted">09:12</span>
            </div>
            <p className="mt-0.5 text-gruv-fg-body">
              @noodle read the thread above and draft 3 options for the hero line.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Avatar hue="clay" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">noodle</span>
              <AgentBadge />
              <span className="text-[11px] text-gruv-fg-muted">09:12</span>
            </div>
            <div className="mt-1.5 rounded-xl border border-gruv-border bg-gruv-bg-soft p-3">
              <div className="flex items-center gap-2 text-gruv-green">
                <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gruv-green" />
                <span className="text-xs font-medium">Working</span>
              </div>
              <div className="mt-2 space-y-1 border-l border-gruv-border pl-3 text-gruv-fg-muted">
                <p>Read 12 messages</p>
                <p>Drafted 3 hero options</p>
              </div>
              <p className="mt-2.5 text-gruv-fg">Done — added the final picks to the board.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Avatar hue="moss" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">blair</span>
              <span className="text-[11px] text-gruv-fg-muted">09:14</span>
            </div>
            <p className="mt-0.5 text-gruv-fg-body">option 2 is closest. make it punchier.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-gruv-fg-muted">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1 w-1 animate-pulse-slow rounded-full bg-gruv-fg-muted" />
            <span className="h-1 w-1 animate-pulse-slow rounded-full bg-gruv-fg-muted [animation-delay:300ms]" />
            <span className="h-1 w-1 animate-pulse-slow rounded-full bg-gruv-fg-muted [animation-delay:600ms]" />
          </span>
          noodle is typing…
        </div>
      </div>
    </div>
  );
}
