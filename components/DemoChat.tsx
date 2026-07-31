function BlankAvatar() {
  return <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gruv-fg/10" aria-hidden="true" />;
}

function Message({
  name,
  time,
  children,
  agent,
}: {
  name: string;
  time: string;
  children: React.ReactNode;
  agent?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <BlankAvatar />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`font-medium ${agent ? 'text-gruv-accent' : 'text-gruv-fg'}`}>{name}</span>
          {agent && (
            <span className="rounded px-1.5 py-0.5 text-xs font-medium text-gruv-bg bg-gruv-accent">
              agent
            </span>
          )}
          <span className="text-xs text-gruv-fg-muted">{time}</span>
        </div>
        <div className="mt-1 text-gruv-fg-muted">{children}</div>
      </div>
    </div>
  );
}

export function DemoChat() {
  return (
    <div className="flex h-full min-h-[420px] flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden w-14 flex-col items-center gap-3 border-r border-gruv-border bg-gruv-bg py-4 md:flex">
        <BlankAvatar />
        <BlankAvatar />
        <BlankAvatar />
        <BlankAvatar />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-gruv-border px-4 py-3">
          <span className="text-gruv-fg-muted">#</span>
          <span className="font-medium text-gruv-fg">general</span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
          <Message name="alex" time="09:12">
            team — launch is Friday. the hero still says “AI workspace beta” and it reads flat.
          </Message>
          <Message name="blair" time="09:13">
            yeah and we still don’t have a one-liner for the post. we agreed the angle is “your team and your agents in one room” but nothing is written.
          </Message>
          <Message name="alex" time="09:14">
            constraints: no buzzwords, under 10 words, and don’t use the word “platform”. we keep sounding like everyone else.
          </Message>
          <Message name="blair" time="09:15">
            also the crowd hates marketing speak. it should sound like it was written by an engineer.
          </Message>
          <Message name="harris" time="09:16">
            @noodle read the thread above and draft 3 options for the hero and 3 for the post one-liner. respect the constraints.
          </Message>
          <Message name="noodle" time="09:16" agent>
            <div className="rounded-lg border border-gruv-border bg-gruv-bg p-3">
              <div className="flex items-center gap-2 text-gruv-green">
                <span className="h-2 w-2 rounded-full bg-gruv-green" />
                <span className="font-medium">Working</span>
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
          </Message>
          <Message name="blair" time="09:18">
            @noodle option 2 is closest for the hero. make it punchier and drop any mention of AI — the product is the room, not the model.
          </Message>
          <Message name="noodle" time="09:18" agent>
            <div className="rounded-lg border border-gruv-border bg-gruv-bg p-3">
              <p className="text-gruv-fg">Revised hero:</p>
              <p className="mt-1 text-gruv-fg-muted">One space for your team and its agents.</p>
            </div>
          </Message>
          <Message name="alex" time="09:19">
            give me the final picks: one hero line, one post one-liner, nothing else.
          </Message>
          <Message name="noodle" time="09:19" agent>
            <div className="rounded-lg border border-gruv-border bg-gruv-bg p-3">
              <p className="text-gruv-fg">Hero: One space for your team and its agents.</p>
              <p className="text-gruv-fg">One-liner: The shared room for your people and your agents.</p>
            </div>
          </Message>
        </div>
      </div>
    </div>
  );
}
