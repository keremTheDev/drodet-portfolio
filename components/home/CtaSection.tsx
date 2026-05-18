import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/ui/Container";

export function CtaSection() {
  return (
    <section className="section-frame bg-primary">
      <Container>
        <div className="card-surface overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.12),transparent_40%),linear-gradient(180deg,#ffffff_0%,#fcfbf7_100%)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="max-w-3xl">
            <span className="eyebrow">Sonraki Adım</span>
            <h2 className="headline-section text-wrap-balance">
              Projenin arkasındaki mühendislik ekibini ve uzmanlık alanlarını yakından inceleyin.
            </h2>
            <p className="body-large mt-6">
              QR deneyimini tamamlayan dijital kart yapısıyla ekip rollerini,
              uzmanlık alanlarını ve iletişim kanallarını tek ekranda sunuyoruz.
            </p>
            <div className="mt-10">
              <PrimaryButton href="/about">Geliştirici Ekibi Tanıyın</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
