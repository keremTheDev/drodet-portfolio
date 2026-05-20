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
    title: "YOLOv26s-P2 Eğitim Boru Hattı",
    description:
      "Model, sınıf dengesizliği, küçük nesne algılama ve hareket bulanımı gibi zorlu koşullara göre optimize edildi. Deneyler, parametre kaydı ve sürümleme prensipleriyle yönetildi."
  },
  {
    title: "Saha Uyumlu Sistem Tasarımı",
    description:
      "Mimari, düşük gecikme, yüksek taşınabilirlik ve operatör farkındalığı ekseninde tasarlandı. Modüler yapı sayesinde görüntü kaynağı, algılama servisi ve görselleştirme katmanı birbirinden ayrıldı."
  }
] as const;

export const architectureFlow = [
  {
    title: "Kamera / Video",
    description:
      "Sistemin giriş katmanıdır. Canlı kamera, saha videosu veya test görüntüsü bu aşamada alınır ve analiz hattına aktarılır."
  },
  {
    title: "YOLOv26s-P2",
    description:
      "Drone, kuş, uçak ve helikopter gibi hava hedeflerini görüntü üzerinde tespit eden ana derin öğrenme modelidir. P2 katmanı sayesinde küçük nesne tespiti için daha uygun bir yapı kullanılır. Bu katman ham kutuları, sınıf tahminlerini ve güven skorlarını üretir."
  },
  {
    title: "Temperature Scaling",
    description:
      "Modelin ürettiği güven skorlarını daha kullanılabilir hale getiren kalibrasyon katmanıdır. Mikro drone hedeflerinde confidence değerleri bazen düşük veya kararsız görünebilir. Temperature scaling, bu skorların takip ve karar katmanında daha dengeli yorumlanmasına yardımcı olur."
  },
  {
    title: "Duplicate Merge",
    description:
      "Aynı hedef için oluşabilecek üst üste veya çok yakın tespit kutularını birleştirir. Özellikle NMS-free veya küçük hedef odaklı tespitlerde aynı drone için birden fazla kutu oluşabilir. Bu katman, takip sistemine daha temiz ve tekilleştirilmiş tespitler gönderir."
  },
  {
    title: "BIoUTracker",
    description:
      "Tespit edilen hedeflere kararlı takip kimliği atayan takip katmanıdır. Klasik IoU, çok küçük kutularda birkaç piksellik kaymaya karşı hassas kalabilir. BIoUTracker, kutuları sanal tamponla genişleterek mikro drone hedeflerinin video boyunca daha stabil takip edilmesini sağlar."
  },
  {
    title: "TrackBoost",
    description:
      "Sistemin en kritik karar stabilizasyon katmanıdır. Modelin tek karelik tahminine değil, aynı hedefin video boyunca biriken geçmişine bakar. Böylece bir drone bazı karelerde yanlışlıkla bird gibi sınıflandırılsa bile sistem hedefi hemen kaybetmez. TrackBoost, ham model çıktısını candidate, drone_suspect, confirmed_drone veya non_threat kararına dönüştürür."
  },
  {
    title: "UI + MQTT Alarm",
    description:
      "Son kararın operatöre ve dış sistemlere aktarıldığı katmandır. Arayüzde hedef kutusu, takip ID'si, güven skoru, kilit durumu ve FCS göstergeleri sunulur. MQTT alarm yapısı sayesinde onaylanmış drone tehdidi düşük bant genişlikli JSON mesajı olarak karargah veya mobil istemci tarafına iletilebilir."
  }
] as const;

export const metricsData = [
  {
    metrik: "Precision",
    oran: 92.8
  },
  {
    metrik: "Recall",
    oran: 88.7
  },
  {
    metrik: "mAP50",
    oran: 91.4
  },
  {
    metrik: "Stabilite",
    oran: 95.7
  }
] as const;

export const metricCards = [
  {
    label: "Dataset",
    value: "~88K",
    suffix: "görüntü"
  },
  {
    label: "Model",
    value: "YOLOv26s-P2"
  },
  {
    label: "Precision",
    value: 92.8,
    prefix: "%",
    decimals: 1
  },
  {
    label: "Recall",
    value: 88.7,
    prefix: "%",
    decimals: 1
  },
  {
    label: "mAP50",
    value: 91.4,
    prefix: "%",
    decimals: 1
  },
  {
    label: "Video Test",
    value: 30.4,
    suffix: " FPS",
    decimals: 1
  },
  {
    label: "TrackBoost Stabilite",
    value: 95.7,
    prefix: "%",
    decimals: 1,
    note: "drone-state görünürlük"
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
