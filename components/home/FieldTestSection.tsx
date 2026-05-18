import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FieldTestSection() {
  return (
    <section className="section-frame bg-primary">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading
            eyebrow="Saha Doğrulaması"
            title="Saha Testi"
            description="Gerçek ortam koşullarında yapılan denemeler, farklı hız, mesafe ve arka planlarda modelin tutarlılığını ve operatör görünürlüğünü test etmek için kurgulandı."
          />

          <div className="card-surface overflow-hidden">
            <div className="relative aspect-video bg-[#1a1a18]">
              <video
                className="h-full w-full object-cover"
                controls
                poster="/images/field-test-poster.svg"
                aria-label="Drone tespit saha testi videosu"
              >
                <source src="/videos/field-test.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="border-t border-neutral-border bg-white px-5 py-4 sm:px-6">
              <p className="font-sans text-sm leading-6 text-slate-light">
                Yer tutucu video yolu: <span className="font-mono text-slate-dark">/videos/field-test.mp4</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
