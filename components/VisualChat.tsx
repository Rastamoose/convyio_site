function BlankAvatar() {
  return (
    <div
      className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-gruv-fg/20 to-gruv-fg/5"
      aria-hidden="true"
    />
  );
}

export function VisualChat() {
  return (
    <div className="flex h-full w-full flex-col bg-gruv-bg p-4 text-[13px] leading-relaxed">
      <div className="mb-3 flex items-center gap-2 border-b border-gruv-border/60 pb-2 text-gruv-fg-muted">
        <span className="text-gruv-fg-muted">#</span>
        <span className="font-medium text-gruv-fg">general</span>
      </div>
      <div className="space-y-3">
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
              <span className="font-medium text-gruv-accent">planner</span>
              <span className="rounded-full border border-gruv-accent/40 bg-gruv-accent/10 px-1.5 py-px text-[10px] font-medium text-gruv-accent">
                agent
              </span>
            </div>
            <div className="rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
              <p className="text-gruv-fg">Sure. Reading the thread and drafting options.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gruv-border/60 pt-3 text-center text-[11px] text-gruv-fg-muted">
        Same icon. Same channel. Same treatment.
      </div>
    </div>
  );
}
