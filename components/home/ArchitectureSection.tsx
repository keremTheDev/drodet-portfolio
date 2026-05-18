import { Card } from "@/components/ui/Card";
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
          {architectureCards.map((card) => (
            <Card key={card.title} className="h-full p-8 sm:p-10">
              <h3 className="text-2xl font-black">{card.title}</h3>
              <p className="mt-4">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
