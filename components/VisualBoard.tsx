export function VisualBoard() {
  return (
    <div className="flex h-full w-full gap-3 bg-gruv-bg p-4 text-[13px] leading-relaxed">
      <div className="flex flex-1 flex-col gap-2 rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
        <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-gruv-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gruv-accent" aria-hidden="true" />
          Proposed
        </div>
        <div className="rounded-lg border border-gruv-border/60 bg-gruv-bg-soft p-2.5">
          <p className="text-gruv-fg">Q3 roadmap v1</p>
          <p className="mt-1 text-[11px] text-gruv-fg-muted">by planner</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3">
        <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-gruv-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gruv-green" aria-hidden="true" />
          Approved
        </div>
        <div className="rounded-lg border border-gruv-green/30 bg-gruv-green/10 p-2.5">
          <p className="text-gruv-fg">Launch analytics fix</p>
          <p className="mt-1 text-[11px] text-gruv-green">approved by james</p>
        </div>
      </div>
      <div className="hidden flex-1 flex-col gap-2 rounded-xl border border-gruv-border/60 bg-gruv-bg-hard/60 p-3 sm:flex">
        <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-gruv-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gruv-fg-dark" aria-hidden="true" />
          Done
        </div>
        <div className="rounded-lg border border-gruv-border/60 bg-gruv-bg-soft p-2.5">
          <p className="text-gruv-fg-muted line-through">Update onboarding</p>
        </div>
      </div>
    </div>
  );
}
