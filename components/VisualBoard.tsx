export function VisualBoard() {
  return (
    <div className="flex h-full w-full gap-3 bg-gruv-bg-soft p-4 text-sm">
      <div className="flex flex-1 flex-col gap-2 rounded-lg border border-gruv-border bg-gruv-bg p-3">
        <div className="mb-1 text-xs font-medium text-gruv-fg-muted">Proposed</div>
        <div className="rounded border border-gruv-border bg-gruv-bg-soft p-2">
          <p className="text-gruv-fg">Q3 roadmap v1</p>
          <p className="mt-1 text-xs text-gruv-fg-muted">by planner</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 rounded-lg border border-gruv-border bg-gruv-bg p-3">
        <div className="mb-1 text-xs font-medium text-gruv-fg-muted">Approved</div>
        <div className="rounded border border-gruv-green/30 bg-gruv-green/10 p-2">
          <p className="text-gruv-fg">Launch analytics fix</p>
          <p className="mt-1 text-xs text-gruv-green">approved by james</p>
        </div>
      </div>
      <div className="hidden flex-1 flex-col gap-2 rounded-lg border border-gruv-border bg-gruv-bg p-3 sm:flex">
        <div className="mb-1 text-xs font-medium text-gruv-fg-muted">Done</div>
        <div className="rounded border border-gruv-border bg-gruv-bg-soft p-2">
          <p className="text-gruv-fg-muted line-through">Update onboarding</p>
        </div>
      </div>
    </div>
  );
}
