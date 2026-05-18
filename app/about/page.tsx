import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ProfileCard } from "@/components/about/ProfileCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamMembers } from "@/lib/data";

export default function AboutPage() {
  const imageUrls = [
    "https://picsum.photos/seed/developer1/600/800",
    "https://picsum.photos/seed/developer2/600/800"
  ];

  return (
    <main className="min-h-screen bg-primary py-12 sm:py-16 lg:py-20">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-slate-light transition-colors hover:text-slate-dark"
        >
          <ArrowLeft size={16} />
          Ana sayfaya dön
        </Link>

        <div className="mt-10">
          <SectionHeading
            eyebrow="Ekip"
            title="Biz Kimiz?"
            description="İki kişilik çekirdek ekip; yapay zekâ, bilgisayarlı görü, gömülü sistemler ve saha odaklı ürünleştirme disiplinlerini aynı projede buluşturuyor."
          />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {teamMembers.map((member, index) => (
            <ProfileCard
              key={member.name}
              {...member}
              imageUrl={imageUrls[index] ?? imageUrls[0]}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
