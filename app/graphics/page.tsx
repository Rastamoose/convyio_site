import { VisualChat } from '@/components/VisualChat';
import { VisualTrace } from '@/components/VisualTrace';
import { VisualBoard } from '@/components/VisualBoard';
import { COPY } from '@/lib/copy';

export const metadata = { robots: 'noindex' };

// ponytail: screenshot scratch page. Frame styling copied from ProductBeat so
// what you capture matches what ships.
const visuals = [
  <VisualChat key="chat" />,
  <VisualTrace key="trace" />,
  <VisualBoard key="board" />,
];

export default function GraphicsPage() {
  return (
    <main className="min-h-screen p-12" style={{ backgroundColor: '#f9f5d7' }}>
      {/* ponytail: auto-rows-fr makes every row as tall as the tallest, so the
          three frames come out the same size without a hardcoded height. */}
      <div className="mx-auto grid max-w-2xl auto-rows-fr gap-16">
        {COPY.beats.map((beat, i) => (
          <div key={beat.heading} className="flex flex-col">
            <p className="mb-3 text-sm font-semibold" style={{ color: '#7c6f64' }}>
              <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="ml-3" style={{ color: '#3c3836' }}>
                {beat.heading}
              </span>
            </p>
            {/* ponytail: zoom scales text with the box; transform would leave a gap.
                No aspect ratio here (unlike ProductBeat) so the frame hugs content. */}
            <div
              className="dark relative w-[600px] flex-1 overflow-hidden rounded-2xl border border-gruv-border bg-gruv-bg shadow-frame"
              style={{ zoom: 0.65 }}
            >
              {visuals[i]}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
