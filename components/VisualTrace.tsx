export function VisualTrace() {
  return (
    <div className="flex h-full w-full flex-col bg-gruv-bg p-4 text-[13px] leading-relaxed">
      <div className="mb-3 flex items-center gap-2 border-b border-gruv-border/60 pb-2 text-gruv-fg-muted">
        <span className="text-gruv-fg-muted">#</span>
        <span className="font-medium text-gruv-fg">general</span>
      </div>
      <div className="flex gap-3">
        <div
          className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-gruv-accent/40 to-gruv-accent/10"
          aria-hidden="true"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-gruv-accent">planner</span>
            <span className="rounded-full border border-gruv-accent/40 bg-gruv-accent/10 px-1.5 py-px text-[10px] font-medium text-gruv-accent">
              agent
            </span>
          </div>
          <div className="rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
            <div className="flex items-center gap-2 text-gruv-green">
              <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gruv-green" />
              <span className="text-xs font-medium">Working</span>
            </div>
            <div className="mt-2 space-y-1.5 border-l border-gruv-border/60 pl-3">
              <p className="text-gruv-fg-muted">Read notion-notes.md</p>
              <p className="text-gruv-fg-muted">Summarised 12 comments into 3 themes</p>
              <p className="text-gruv-fg-muted">Drafted roadmap-v1.md</p>
            </div>
            <p className="mt-2.5 text-gruv-fg">
              Done. I have a first draft in the board for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
