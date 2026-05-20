import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ProfileCard } from "@/components/about/ProfileCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const teamMembers = [
  {
    name: "Emirhan Zileli",
    role: "Bilgisayar Mühendisliği 4. Sınıf Öğrencisi",
    imageUrl:
      "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/emo_linkedin_pp.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/emirhan-zileli/",
    githubUrl: "https://github.com/Emirhannz",
    bio: "Projenin yapay zeka omurgasını oluşturan özel veri setinin (dataset) hazırlanması ve YOLOv26s-P2 modelinin eğitilmesinden sorumludur. Sadece makine öğrenmesi süreçleriyle kalmayıp, yazılım katmanlarında performans optimizasyonları gerçekleştirmiş ve kullanıcı arayüzünün (UI) geliştirilmesinde kritik rol oynamıştır.",
    cvLinks: [
      {
        label: "Özgeçmiş (TR)",
        url: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/cv/CV%20-%20Emirhan%20Zileli.pdf"
      },
      {
        label: "Özgeçmiş (EN)",
        url: "/cv/CV-Emirhan_Zileli_ENG.pdf"
      }
    ]
  },
  {
    name: "Kerem Bozkurt",
    role: "Bilgisayar Mühendisliği 4. Sınıf Öğrencisi",
    imageUrl:
      "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/pictures/kero_email_pp.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/kerem-bozkurt333/",
    githubUrl: "https://github.com/keremTheDev",
    bio: "Geliştirilen yapay zeka modelinin yazılım sistemlerine entegrasyonu (MLOps) ve genel yazılım mimarisinin uçtan uca tasarlanmasından sorumludur. Yazılım katmanlarının kodlanması, kapsamlı test süreçlerinin yönetilmesi ve modern kullanıcı arayüzünün (UI) hayata geçirilmesi süreçlerine liderlik etmiştir.",
    cvLinks: [
      {
        label: "Özgeçmiş (TR)",
        url: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/cv/Kerem_Bozkurt_CV_%5BTR%5D.pdf"
      },
      {
        label: "Özgeçmiş (EN)",
        url: "https://ou5njzgsjxvfuoex.public.blob.vercel-storage.com/cv/Kerem_Bozkurt_CV_%5BENG%5D.pdf"
      }
    ]
  }
] as const;

export default function AboutPage() {
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
          {teamMembers.map((member) => (
            <ProfileCard key={member.name} {...member} />
          ))}
        </div>
      </Container>
    </main>
  );
}
