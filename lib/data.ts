export const storyBlocks = [
  {
    title: "Tehdidin Doğası Değişti",
    description:
      "Geleneksel radarlar, düşük radar kesit alanına sahip fiber dronlara karşı istenen tutarlılığı sağlayamıyor. Tehditler daha küçük, daha sessiz ve daha çevik hale geliyor."
  },
  {
    title: "Mobilite Artık Zorunlu",
    description:
      "Modern savaş sahası, ağır ve sabit altyapılar yerine aynı mobiliteye sahip, hızlı konumlanabilen ve görev odaklı karar verebilen tespit sistemleri gerektiriyor."
  },
  {
    title: "Yapay Zekâ ile Hedefe Yakın Karar",
    description:
      "Görüntü tabanlı algılama, sınıflandırma ve izleme kabiliyetlerini sahaya taşıyarak hem erken uyarı hem de doğrulanmış hedef tespiti için güçlü bir temel oluşturuyor."
  }
] as const;

export const architectureCards = [
  {
    title: "Veri Toplama ve Etiketleme",
    description:
      "Özel veri kümesi, farklı irtifa, aydınlatma, arka plan ve manevra senaryolarını kapsayacak şekilde oluşturuldu. Etiketleme süreci, savunma projelerinde gerekli izlenebilirlik ve tekrar üretilebilirlik ilkeleriyle yürütüldü."
  },
  {
    title: "YOLOv8 Eğitim Boru Hattı",
    description:
      "Model, sınıf dengesizliği, küçük nesne algılama ve hareket bulanımı gibi zorlu koşullara göre optimize edildi. Deneyler, parametre kaydı ve sürümleme prensipleriyle yönetildi."
  },
  {
    title: "Saha Uyumlu Sistem Tasarımı",
    description:
      "Mimari, düşük gecikme, yüksek taşınabilirlik ve operatör farkındalığı ekseninde tasarlandı. Modüler yapı sayesinde görüntü kaynağı, algılama servisi ve görselleştirme katmanı birbirinden ayrıldı."
  }
] as const;

export const metricsData = [
  {
    metrik: "Doğruluk",
    oran: 93.6
  },
  {
    metrik: "Hassasiyet",
    oran: 89.4
  },
  {
    metrik: "Duyarlılık",
    oran: 91.8
  },
  {
    metrik: "mAP50",
    oran: 94.8
  }
] as const;

export const teamMembers = [
  {
    name: "İrem Arslan",
    role: "Yapay Zekâ ve Bilgisayarlı Görü Mühendisi",
    bio: "Özel veri kümesi tasarımı, model eğitimi ve saha senaryolarına uygun algılama performansı iyileştirmeleri üzerine çalışıyor.",
    initials: "IA",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    cvHref: "/cv/irem-arslan-ozgecmis.pdf"
  },
  {
    name: "Mert Demir",
    role: "Gömülü Sistemler ve Savunma Yazılımı Mühendisi",
    bio: "Gerçek zamanlı görüntü akışı, sistem entegrasyonu ve saha koşullarına uygun operatif arayüz tasarımından sorumlu.",
    initials: "MD",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    cvHref: "/cv/mert-demir-ozgecmis.pdf"
  }
] as const;
