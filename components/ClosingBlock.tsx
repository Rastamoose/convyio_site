import { COPY } from '@/lib/copy';
import { SignInLink, StartUsingLink } from './AppLink';

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
        <StartUsingLink location="closing" className="btn-3d px-6 py-3">
          {COPY.hero.cta}
        </StartUsingLink>
        <p className="mt-6 text-sm text-gruv-fg-body">
          {COPY.closing.signIn}{' '}
          <SignInLink
            location="closing"
            className="font-medium text-gruv-accent underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gruv-accent"
          >
            Sign in
          </SignInLink>
        </p>
      </div>
    </section>
  );
}
