import { Suspense } from "react";

import { HardwareModel } from "@/components/home/HardwareModel";
import { Container } from "@/components/ui/Container";

export function CommunicationSection() {
  return (
    <section className="section-frame bg-secondary">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl md:w-[48%]">
            <span className="eyebrow">DONANIM VE HABERLEŞME</span>
            <h2 className="headline-section text-wrap-balance">
              Karargâh İletişimi: Prototipten Sahaya
            </h2>
            <p className="body-large mt-6 text-wrap-balance">
              Sistemimiz, tespit edilen asimetrik tehditleri anlık olarak komuta
              merkezine iletmektedir. Hızlı prototipleme ve konsept kanıtlama
              (PoC) aşamasında ESP32 donanımı ve MQTT protokolü kullanılarak düşük
              gecikmeli bir haberleşme ağı kurulmuştur. Gerçek operasyonel saha
              şartları göz önüne alınarak iletişim mimarimiz; uzun menzilli,
              parazitlere dayanıklı ve düşük güç tüketimli LoRa (Long Range)
              altyapısına doğrudan ölçeklenebilecek yapıda tasarlanmıştır.
            </p>
          </div>

          <div className="md:w-[46%]">
            <Suspense
              fallback={
                <div className="h-[20rem] w-full rounded-brand border border-neutral-border bg-white/60 sm:h-[24rem]" />
              }
            >
              <HardwareModel />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
