import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProblemLines } from '@/components/ProblemLines';
import { BeatsSection } from '@/components/BeatsSection';
import { DemoSlot } from '@/components/DemoSlot';
import { ClosingBlock } from '@/components/ClosingBlock';
import { Footer } from '@/components/Footer';

// Campaign entry for solution-aware traffic (visitors who already know they
// want agents working alongside the team). Not an A/B test — route ads here.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomeSolutionAware() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero variant="solution-aware" />
      <DemoSlot />
      <ProblemLines />
      <BeatsSection />
      <ClosingBlock />
      <Footer />
    </main>
  );
}
