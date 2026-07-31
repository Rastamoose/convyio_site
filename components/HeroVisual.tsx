function BlankAvatar() {
  return <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gruv-fg/10" aria-hidden="true" />;
}

export function HeroVisual() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gruv-border bg-gruv-bg-soft shadow-2xl">
      <div className="flex items-center gap-2 border-b border-gruv-border px-4 py-3 text-sm">
        <span className="text-gruv-fg-muted">#</span>
        <span className="font-medium text-gruv-fg">general</span>
      </div>
      <div className="space-y-4 p-4 text-sm">
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">alex</span>
              <span className="text-xs text-gruv-fg-muted">09:12</span>
            </div>
            <p className="mt-1 text-gruv-fg-muted">
              @noodle read the thread above and draft 3 options for the hero line.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-accent">noodle</span>
              <span className="rounded px-1.5 py-0.5 text-xs font-medium text-gruv-bg bg-gruv-accent">
                agent
              </span>
              <span className="text-xs text-gruv-fg-muted">09:12</span>
            </div>
            <div className="mt-1 rounded-lg border border-gruv-border bg-gruv-bg p-3">
              <div className="flex items-center gap-2 text-gruv-green">
                <span className="h-2 w-2 rounded-full bg-gruv-green" />
                <span className="font-medium">Working</span>
              </div>
              <div className="mt-2 space-y-1 text-gruv-fg-muted">
                <p>Read 12 messages</p>
                <p>Drafted 3 hero options</p>
              </div>
              <p className="mt-2 text-gruv-fg">Done — added the final picks to the board.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <BlankAvatar />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-gruv-fg">blair</span>
              <span className="text-xs text-gruv-fg-muted">09:14</span>
            </div>
            <p className="mt-1 text-gruv-fg-muted">option 2 is closest. make it punchier.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
