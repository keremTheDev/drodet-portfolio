import { DecryptText } from "@/components/ui/DecryptText";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/ui/Container";
import { HudOverlay } from "@/components/home/HudOverlay";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full transform-gpu object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.svg"
        aria-label="Muharebe sahası arka plan videosu"
      >
        <source
          src="https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/videos/hero-combat.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,19,0.32)_0%,rgba(20,20,19,0.72)_58%,rgba(20,20,19,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,119,87,0.18),transparent_34%)]" />
      <div className="hud-grid absolute inset-0 opacity-[0.18] mix-blend-soft-light" />
      <HudOverlay />

      <Container className="relative z-10 flex w-full pb-16 pt-32 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <span className="eyebrow border-white/20 bg-white/10 text-white backdrop-blur-md">
            Dost - Düşman Drone Tespit Sistemi
          </span>
          <h1 className="headline-display max-w-4xl text-white text-wrap-balance">
            <DecryptText text="Asimetrik Tehditlere Karşı Çevik Çözümler." />
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.45] text-white/78 sm:text-xl">
            Savaş alanındaki fiber ve kompakt dron tehdidine karşı yapay zekâ
            destekli otonom tespit sistemi.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <PrimaryButton href="/about">Geliştirici Ekibi Tanıyın</PrimaryButton>
            <a
              href="#hikaye"
              className="button-target group inline-flex items-center justify-center rounded-brand border border-white/24 bg-white/8 px-6 py-3.5 font-sans text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/14"
            >
              <span aria-hidden="true" className="button-corner button-corner-top-left">
                +
              </span>
              <span aria-hidden="true" className="button-corner button-corner-top-right">
                +
              </span>
              <span aria-hidden="true" className="button-corner button-corner-bottom-left">
                +
              </span>
              <span aria-hidden="true" className="button-corner button-corner-bottom-right">
                +
              </span>
              <span className="button-label">Hikâyeyi Keşfedin</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
