import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProblemLines } from '@/components/ProblemLines';
import { BeatsSection } from '@/components/BeatsSection';
import { DemoSlot } from '@/components/DemoSlot';
import { ClosingBlock } from '@/components/ClosingBlock';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { HomeStructuredData } from '@/components/HomeStructuredData';

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <HomeStructuredData />
      <Header />
      <Hero />
      <DemoSlot />
      <ProblemLines />
      <BeatsSection />
      <FAQSection />
      <ClosingBlock />
      <Footer />
    </main>
  );
}
