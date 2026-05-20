import { ArchitectureFlow } from "@/components/home/ArchitectureFlow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ArchitectureSection() {
  return (
    <section className="section-frame bg-secondary">
      <Container>
        <SectionHeading
          eyebrow="Mimari"
          title="Geliştirme Süreci ve Mimari"
          description="Özel veri kümesinden arayüz ve alarm katmanına uzanan boru hattı, düşük gecikme ve kararlı takip için modüler olarak tasarlandı."
        />

        <ArchitectureFlow />
      </Container>
    </section>
  );
}
