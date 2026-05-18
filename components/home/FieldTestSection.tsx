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
            description="Gerçek ortam koşullarında yapılan denemeler; farklı hız, mesafe ve arka planlarda modelin tutarlılığını ve operatör görünürlüğünü test etmek için kurgulandı. TRT Genel Müdürlüğü'nden özel izin alarak gerçekleştirdiğimiz bu saha testlerinde, profesyonel yayın ve çekim donanımlarıyla çalışma şansı yakaladık. Bu sayede, gerçek endüstriyel şartlarda otonom modelimizin nasıl tepki verdiğini tam anlamıyla deneyimledik."
          />

          <div className="overflow-hidden rounded-brand border border-[#1414131A] bg-white">
            <div className="relative aspect-video bg-[#1a1a18]">
              <video
                className="h-full w-full object-cover"
                controls
                muted
                playsInline
                poster="/images/field-test-poster.svg"
                aria-label="Drone tespit saha testi videosu"
              >
                <source
                  src="https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/WhatsApp%20Video%202026-05-18%20at%2002.41.41.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
