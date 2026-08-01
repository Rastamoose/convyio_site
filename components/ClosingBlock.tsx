import { COPY } from '@/lib/copy';
import { EmailForm } from './EmailForm';

export function ClosingBlock() {
  return (
    <section
      id="closing"
      className="dark relative overflow-hidden bg-gruv-bg-soft px-4 py-24 text-gruv-fg sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-gruv-fg sm:text-4xl lg:text-5xl">
          {COPY.closing.lead}
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-gruv-fg-body sm:text-xl">
          {COPY.closing.support}
        </p>
        <div className="mx-auto max-w-3xl">
          <EmailForm location="closing" />
        </div>
      </div>
    </section>
  );
}
