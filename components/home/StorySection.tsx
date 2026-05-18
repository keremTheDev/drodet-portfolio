"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { storyBlocks } from "@/lib/data";

export function StorySection() {
  return (
    <section id="hikaye" className="section-frame bg-primary">
      <Container>
        <SectionHeading
          eyebrow="Motivasyon"
          title="Tehdit profili değişirken tespit altyapısının da aynı hızla evrilmesi gerekiyor."
          description="Geleneksel radarlar düşük radar kesit alanına sahip fiber dronlara karşı yetersiz kalıyor. Modern savaş sahası, aynı mobiliteye sahip kompakt ve akıllı karşı tedbirler gerektiriyor."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {storyBlocks.map((block, index) => (
            <motion.article
              key={block.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="card-surface flex flex-col justify-between p-8 sm:p-10"
            >
              <span className="font-mono text-sm text-accent-primary">
                0{index + 1}
              </span>
              <div className="mt-10">
                <h3 className="text-2xl font-black sm:text-[2rem]">{block.title}</h3>
                <p className="mt-4">{block.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
