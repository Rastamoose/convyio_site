import { COPY } from '@/lib/copy';
import { EmailForm } from './EmailForm';

export function ClosingBlock() {
  return (
    <section id="closing" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-gruv-fg sm:text-4xl">
          {COPY.closing.lead}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gruv-fg-muted sm:text-xl">
          {COPY.closing.support}
        </p>
        <div className="max-w-md">
          <EmailForm location="closing" />
        </div>
      </div>
    </section>
  );
}
