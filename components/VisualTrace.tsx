export function VisualTrace() {
  return (
    <div className="flex h-full w-full flex-col bg-gruv-bg-soft p-4 text-sm">
      <div className="mb-3 flex items-center gap-2 border-b border-gruv-border pb-2 text-gruv-fg-muted">
        <span className="text-gruv-fg">#</span>
        <span className="font-medium text-gruv-fg">general</span>
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gruv-accent/30" aria-hidden="true" />
        <div className="flex-1 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-gruv-accent">planner</span>
            <span className="rounded px-1.5 py-0.5 text-xs font-medium text-gruv-bg bg-gruv-accent">
              agent
            </span>
          </div>
          <div className="rounded-lg border border-gruv-border bg-gruv-bg p-3">
            <div className="flex items-center gap-2 text-gruv-green">
              <span className="h-2 w-2 rounded-full bg-gruv-green" />
              <span className="font-medium">Working</span>
            </div>
            <div className="mt-2 space-y-1.5 border-l-2 border-gruv-border pl-3">
              <p className="text-gruv-fg-muted">Read notion-notes.md</p>
              <p className="text-gruv-fg-muted">Summarised 12 comments into 3 themes</p>
              <p className="text-gruv-fg-muted">Drafted roadmap-v1.md</p>
            </div>
            <p className="mt-2 text-gruv-fg">
              Done. I have a first draft in the board for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
