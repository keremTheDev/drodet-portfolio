import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FieldTestSection } from "@/components/home/FieldTestSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MetricsSection } from "@/components/home/MetricsSection";
import { StorySection } from "@/components/home/StorySection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <ArchitectureSection />
      <FieldTestSection />
      <MetricsSection />
      <CtaSection />
    </main>
  );
}
