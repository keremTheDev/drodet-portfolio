"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { SplitRevealText } from "@/components/ui/SplitRevealText";
import { storyBlocks } from "@/lib/data";

export function StorySection() {
  return (
    <section id="hikaye" className="section-frame bg-primary">
      <Container>
        <div className="max-w-4xl">
          <span className="eyebrow">Motivasyon</span>
          <h2 className="headline-section text-wrap-balance">
            <SplitRevealText
              text="Tehdit profili değişirken tespit altyapısının da aynı hızla evrilmesi gerekiyor."
              className="block"
            />
          </h2>
          <p className="body-large mt-6 text-wrap-balance">
            <SplitRevealText
              text="Geleneksel radarlar düşük radar kesit alanına sahip fiber dronlara karşı yetersiz kalıyor. Modern savaş sahası, aynı mobiliteye sahip kompakt ve akıllı karşı tedbirler gerektiriyor."
              className="block"
              delay={0.12}
            />
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {storyBlocks.map((block, index) => (
            <motion.article
              key={block.title}
              initial={{ opacity: 0, y: 48, skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: "spring", stiffness: 50, damping: 18, delay: index * 0.1 }}
              className="card-surface flex transform-gpu flex-col justify-between p-8 will-change-transform sm:p-10"
            >
              <span className="font-mono text-sm text-accent-primary">
                0{index + 1}
              </span>
              <div className="mt-10">
                <h3 className="text-2xl font-black sm:text-[2rem]">
                  <SplitRevealText text={block.title} className="block" delay={0.06 * index} />
                </h3>
                <p className="mt-4">
                  <SplitRevealText
                    text={block.description}
                    className="block"
                    delay={0.08 + index * 0.06}
                  />
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
