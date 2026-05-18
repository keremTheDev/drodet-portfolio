import { ArchitectureCard } from "@/components/home/ArchitectureCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { architectureCards } from "@/lib/data";

export function ArchitectureSection() {
  return (
    <section className="section-frame bg-secondary">
      <Container>
        <SectionHeading
          eyebrow="Mimari"
          title="Geliştirme Süreci ve Mimari"
          description="Özel veri kümesinden saha validasyonuna uzanan süreç, savunma projelerinde gerekli disiplin, izlenebilirlik ve modüler entegrasyon anlayışıyla tasarlandı."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {architectureCards.map((card, index) => (
            <ArchitectureCard
              key={card.title}
              index={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
