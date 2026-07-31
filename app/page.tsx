import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProblemLines } from '@/components/ProblemLines';
import { BeatsSection } from '@/components/BeatsSection';
import { DemoSlot } from '@/components/DemoSlot';
import { ClosingBlock } from '@/components/ClosingBlock';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <ProblemLines />
      <BeatsSection />
      <DemoSlot />
      <ClosingBlock />
      <Footer />
    </main>
  );
}
