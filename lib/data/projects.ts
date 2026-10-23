import { Language, Project, ProjectDefinition } from "../types";

// ─────────────────────────────────────────────────────────────
// Tek kaynak: tüm projeler bilingual + App Store metadata
// Kural: image yolları → /images/{Klasör}/cover.ext (küçük harf)
//        store ekranları → /images/{Klasör}/store/1.ext
// ─────────────────────────────────────────────────────────────
export const projectDefinitions: ProjectDefinition[] = [
  // ── 1 ───────────────────────────────────────────────────────
  {
    id: 1,
    platform: "mobile",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Firebase",
      "i18n",
    ],
    image: "/images/Liblify/cover.png",
    appStore: {
      icon: "/images/Liblify/icon.png",
      screenshots: [
        "/images/Liblify/store/1.png",
        "/images/Liblify/store/2.png",
        "/images/Liblify/store/3.png",
        "/images/Liblify/store/4.png",
        "/images/Liblify/store/5.png",
      ],
      rating: 4.9,
      age: "4+",
      version: "1.0.0",
      size: "38.2 MB",
      tr: {
        subtitle: "Okuma Alışkanlıklarını Takip Et",
        category: "Kitaplar",
        chart: "#1 Kitaplar",
      },
      en: {
        subtitle: "Track Your Reading Habits",
        category: "Books",
        chart: "#1 Books",
      },
    },
    tr: {
      title: "Liblify — Büyüyen Kitaplık",
      description:
        "Okuma alışkanlığını geliştirmek ve takip etmek için tasarlanmış mobil uygulama. El çizimi illüstrasyonlar ve sıcak bir not defteri estetiğiyle okumayı keyifli bir ritüele dönüştürür.",
      features: [
        "Kitaplık yönetimi: kitap ekleme, özel raflar oluşturma, sayfa ve puan takibi",
        "Zamanlayıcılı odak modu: okuma seansı boyunca canlandırılan el çizimi kitap animasyonu",
        "Haftalık, aylık ve yıllık okuma istatistikleri ile kişiselleştirilmiş hedefler",
        "Supabase ile opsiyonel bulut senkronizasyonu, misafir modunda tam çevrimdışı destek",
        "12 dil desteği (Türkçe, İngilizce, Almanca, Fransızca, İspanyolca ve daha fazlası)",
        "Caveat el yazısı fontu ve özgün SVG illüstrasyonlarla tasarlanmış sıcak arayüz",
      ],
    },
    en: {
      title: "Liblify — Growing Library",
      description:
        "A mobile app designed to build and track reading habits. Hand-drawn illustrations and a warm notebook aesthetic turn reading into an enjoyable daily ritual.",
      features: [
        "Library management: add books, create custom shelves, track pages and ratings",
        "Timed focus mode with a hand-drawn book animation that comes to life during each reading session",
        "Weekly, monthly, and yearly reading statistics with personalized daily and annual goals",
        "Optional cloud sync via Supabase; full offline support in guest mode with AsyncStorage",
        "12 language support (Turkish, English, German, French, Spanish, and more)",
        "Warm interface built with Caveat handwriting font and original hand-drawn SVG illustrations",
      ],
    },
  },

  // ── 2 ───────────────────────────────────────────────────────
  {
    id: 2,
    platform: "web",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "Firebase",
      "next-intl",
    ],
    image: "/images/LiblifyWeb/cover.png",
    websiteLink: "https://liblify.vercel.app/",
    tr: {
      title: "Liblify — Büyüyen Kitaplık (Web)",
      description:
        "Liblify mobil uygulamasının resmi web platformu. Kullanıcılar kendilerine özel profil sayfası aracılığıyla okuma kitaplıklarını tek bir linkle arkadaşlarıyla paylaşabilir.",
      features: [
        "Herkese açık profil sayfaları: Kitaplığını benzersiz bir linkle paylaş (liblify.vercel.app/u/kullanıcıadın)",
        "next-intl ile 12 dil desteği (Türkçe, İngilizce, Almanca, Fransızca, İspanyolca ve daha fazlası)",
        "Kitap bileşenleri: Şu an okunanlar ve tamamlananlar için özel shelf görünümü",
        "Profil görüntülenme takibi ve Firebase Analytics entegrasyonu",
        "Supabase ile gerçek zamanlı kullanıcı verileri ve profil senkronizasyonu",
        "Çok dilli hukuki sayfalar: Gizlilik politikası, kullanım koşulları ve iletişim",
      ],
    },
    en: {
      title: "Liblify — Growing Library (Web)",
      description:
        "The official web platform for the Liblify mobile app. Users get a personalized public profile page to share their reading library with friends via a single link.",
      features: [
        "Public profile pages: Share your library with a unique link (liblify.vercel.app/u/username)",
        "12-language support via next-intl (Turkish, English, German, French, Spanish, and more)",
        "Book components: Dedicated shelf view for currently reading and completed books",
        "Profile view tracking and Firebase Analytics integration",
        "Real-time user data and profile sync powered by Supabase",
        "Multilingual legal pages: Privacy policy, terms of service, and contact",
      ],
    },
  },

  // ── 3 ───────────────────────────────────────────────────────
  {
    id: 3,
    platform: "mobile",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Google Gemini AI",
    ],
    image: "/images/Effease/cover.jpeg",
    appStoreLink:
      "https://apps.apple.com/us/app/effease-ai-photo-studio/id6756782812",
    androidStoreLink:
      "https://play.google.com/store/apps/details?id=com.repackstudio.effease",
    appStore: {
      icon: "/images/Effease/icon.jpeg",
      screenshots: [
        "/images/Effease/store/1.png",
        "/images/Effease/store/2.png",
        "/images/Effease/store/3.png",
        "/images/Effease/store/4.png",
        "/images/Effease/store/5.png",
      ],
      rating: 4.8,
      age: "4+",
      version: "2.5.0",
      size: "86.4 MB",
      tr: {
        subtitle: "Yapay Zeka ile Sanat",
        category: "Fotoğraf & Video",
        chart: "#1 Fotoğraf ve Video",
      },
      en: {
        subtitle: "Art with AI",
        category: "Photo & Video",
        chart: "#1 Photo & Video",
      },
    },
    tr: {
      title: "EFFEASE - AI Fotoğraf Editörü",
      description:
        "Google'ın Gemini AI'ını kullanarak sıradan fotoğrafları olağanüstü sanat eserlerine dönüştüren güçlü bir yapay zeka destekli mobil fotoğraf düzenleme uygulaması.",
      features: [
        "Google Gemini 2.5 Flash Image API ile yapay zeka destekli görüntü dönüşümü",
        "Kategorilere ayrılmış zengin efekt kütüphanesi",
        "Firebase Authentication ile Google Sign-In entegrasyonu",
        "Token tabanlı kullanım sistemi ve kullanıcı profil yönetimi",
      ],
    },
    en: {
      title: "EFFEASE - AI Photo Editor",
      description:
        "A powerful AI-powered mobile photo editing application that transforms ordinary photos into extraordinary works of art using Google's Gemini AI.",
      features: [
        "AI-powered image transformation using Google Gemini 2.5 Flash Image API",
        "Rich effect library organized by categories",
        "Google Sign-In integration with Firebase Authentication",
        "Token-based credit system and user profile management",
      ],
    },
  },

  // ── 4 ───────────────────────────────────────────────────────
  {
    id: 4,
    platform: "mobile",
    tags: ["React Native", "Expo", "TypeScript", "Push Notifications"],
    image: "/images/BeautyCenter/cover.png",
    gallery: [
      "/images/BeautyCenter/store/1.png",
      "/images/BeautyCenter/store/2.png",
      "/images/BeautyCenter/store/3.png",
      "/images/BeautyCenter/store/4.png",
      "/images/BeautyCenter/store/5.png",
      "/images/BeautyCenter/store/6.png",
      "/images/BeautyCenter/store/7.png",
    ],
    githubLink: "https://github.com/hsemihaktas/BeautyCenterApp",
    tr: {
      title: "Güzellik Merkezi Uygulaması",
      description:
        "React Native & Expo ile geliştirilmiş, güzellik hizmetleri için randevu alma ve yönetme uygulaması.",
      features: [
        "Güzellik merkezlerini detaylı bilgiler ve yorumlarla keşfedin",
        "Hizmetler ve çalışanlar için gerçek zamanlı uygunluk ile randevu alın",
        "Tamamlanan randevuları fotoğraf yüklemeleriyle puanlayın",
        "Hatırlatmalar ve güncellemeler için anlık bildirimler",
      ],
    },
    en: {
      title: "Beauty Center App",
      description:
        "A modern mobile app for booking beauty services and managing appointments, built with React Native & Expo.",
      features: [
        "Discover beauty centers with detailed information and reviews",
        "Book appointments with real-time availability for services and staff",
        "Rate and review completed appointments with photo uploads",
        "Push notifications for reminders and updates",
      ],
    },
  },

  // ── 5 ───────────────────────────────────────────────────────
  {
    id: 5,
    platform: "mobile",
    tags: ["React Native", "Expo", "expo-crypto", "AES"],
    image: "/images/EncryptDiary/cover.png",
    githubLink: "https://github.com/hsemihaktas/EncryptDiary",
    tr: {
      title: "Şifreli Günlük",
      description:
        "AES şifreleme ile güvenli not tutma uygulaması, React Native & Expo ile geliştirildi.",
      features: [
        "Kişisel notları AES tabanlı şifreleme ile güvenli bir şekilde saklar",
        "Notları kolayca ekleyin, okuyun, güncelleyin ve silin",
        "Sadece doğru anahtarla erişilebilen expo-crypto şifreleme",
        "Minimal ve kullanıcı dostu arayüz tasarımı",
      ],
    },
    en: {
      title: "Encrypt Diary",
      description:
        "A secure note taking app with AES encryption, built using React Native & Expo.",
      features: [
        "Stores personal notes securely with AES based encryption",
        "Add, read, update, and delete notes easily",
        "Encryption powered by expo-crypto, accessible only with the correct key",
        "Minimal and user-friendly interface design",
      ],
    },
  },

  // ── 6 ───────────────────────────────────────────────────────
  {
    id: 6,
    platform: "mobile",
    tags: ["React Native", "Expo", "MyMemory API", "Datamuse API"],
    image: "/images/Lexicon/cover.png",
    githubLink: "https://github.com/hsemihaktas/Lexicon-WordApplication",
    tr: {
      title: "Kelime Uygulaması - Lexicon",
      description:
        "Kelime çeviri, eşanlamlı ve etkileşimli öğrenim için mobil uygulama.",
      features: [
        "Kelime çeviri ve eşanlamlı gösterimi (MyMemory & Datamuse API ile)",
        "Favorilere ekleme/çıkarma ve oyun moduyla etkileşimli kelime öğrenimi",
        "Context API ile durum yönetimi",
        "Material Icons ile modern arayüz",
      ],
    },
    en: {
      title: "Word Application - Lexicon",
      description:
        "A mobile app for word translation, synonyms, and interactive learning.",
      features: [
        "Word translation and synonym display (with MyMemory & Datamuse API)",
        "Add/remove favorites and interactive word learning with game mode",
        "State management with Context API",
        "Modern interface with Material Icons",
      ],
    },
  },

  // ── 7 ───────────────────────────────────────────────────────
  {
    id: 7,
    platform: "web",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Lucide React",
    ],
    image: "/images/Rewound/cover.png",
    websiteLink: "https://rewound.vercel.app/",
    tr: {
      title: "Retro Portfolio | Developer Showcase",
      description:
        "Brütalist, retro tarzı kişisel portföy web sitesi. Sert gölgeler, neon vurgular ve proje ile deneyim sergilemek için dashboard benzeri düzen sunuyor.",
      features: [
        "Brütalist tasarım: Sert gölgeler, kalın çerçeveler, keskin köşeler ve neon sarı (#ccff00) vurgular",
        "Retro film grenajı efekti için noise overlay dokusu ve nokta desen arka planı",
        "Responsive dashboard düzeni: Profil ile kenar çubuğu, proje grid'li ana içerik alanı",
        "Proje filtreleme: Mobil/web türüne göre animasyonlu geçişlerle proje filtreleme",
        "Beceri ticker: Teknoloji yığınını sergileyen sonsuz marquee animasyonu",
        "Deneyim zaman çizelgesi: Görsel zaman çizelgesi bileşeniyle iş ve eğitim geçmişi",
      ],
    },
    en: {
      title: "Retro Portfolio | Developer Showcase",
      description:
        "A brutalist, retro-styled personal portfolio website. Features a unique design aesthetic with hard shadows, neon accents, and a dashboard-like layout for showcasing projects and experience.",
      features: [
        "Brutalist design: Hard shadows, thick borders, sharp corners with neon yellow (#ccff00) accents",
        "Noise overlay texture and dot pattern background for retro film grain effect",
        "Responsive dashboard layout: Sidebar with profile, main content area with project grid",
        "Project filtering: Filter projects by type (mobile/web) with animated transitions",
        "Skills ticker: Infinite marquee animation showcasing tech stack",
        "Experience timeline: Work and education history with visual timeline component",
      ],
    },
  },

  // ── 8 ───────────────────────────────────────────────────────
  {
    id: 8,
    platform: "web",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Lucide React"],
    image: "/images/Loki-History/cover.png",
    websiteLink: "https://loki-history.vercel.app/",
    tr: {
      title: "Loki History Web Sitesi",
      description:
        "İskandinav mitolojisinin kaos tanrısı Loki'nin gerçek hikayesini anlatan sinematik bir web deneyimi. Mitoloji, soy ağacı ve efsanevi hikayeleri keşfedin.",
      features: [
        "Loki'nin kökenlerinden Ragnarök'e kadar tüm mitolojik hikayelerini interaktif olarak sunar",
        "Next.js 16 ve TailwindCSS 4 ile modern, responsive ve sinematik tasarım",
        "Özel animasyonlar, custom cursor ve parallax efektleriyle immersive kullanıcı deneyimi",
        "Soy ağacı (Genealogy Tree), eserler (Artifacts) ve dönüşüm hikayeleri gibi zengin içerik bölümleri",
      ],
    },
    en: {
      title: "Loki History Website",
      description:
        "A cinematic web experience telling the true story of Loki, the Norse god of chaos. Explore mythology, genealogy tree, and legendary tales.",
      features: [
        "Interactive presentation of all mythological stories from Loki's origins to Ragnarök",
        "Modern, responsive and cinematic design with Next.js 16 and TailwindCSS 4",
        "Immersive user experience with custom animations, custom cursor and parallax effects",
        "Rich content sections like Genealogy Tree, Artifacts and transformation stories",
      ],
    },
  },

  // ── 9 ───────────────────────────────────────────────────────
  {
    id: 9,
    platform: "web",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/The-Void/cover.png",
    websiteLink: "https://the-void-v1.vercel.app/",
    tr: {
      title: "The Void - Cosmic Experience",
      description:
        "Kozmik boşluğun derinliklerine inen, karanlık uzay temalı sinematik bir web deneyimi. Vakum enerjisi, zaman genişlemesi ve evrenin en büyük gizemlerini interaktif olarak keşfedin.",
      features: [
        "Kozmik boşluk, vakum enerjisi ve zaman genişlemesi gibi uzay fenomenlerini interaktif seksiyonlarla sunar",
        "Next.js 16 ve TailwindCSS 4 ile modern, responsive ve immersive tasarım",
        "Framer Motion ile smooth animasyonlar ve parallax efektleri",
        "Boötes Void, Cold Spot ve Vacuum Energy gibi bilimsel içerikler",
      ],
    },
    en: {
      title: "The Void - Cosmic Experience",
      description:
        "A cinematic web experience diving into the depths of cosmic void. Interactively explore vacuum energy, time dilation, and the universe's greatest mysteries.",
      features: [
        "Interactive sections presenting space phenomena like cosmic void, vacuum energy, and time dilation",
        "Modern, responsive and immersive design with Next.js 16 and TailwindCSS 4",
        "Smooth animations and parallax effects with Framer Motion",
        "Scientific content including Boötes Void, Cold Spot, and Vacuum Energy",
      ],
    },
  },

  // ── 10 ───────────────────────────────────────────────────────
  {
    id: 10,
    platform: "web",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/EffeaseWebsite/cover.png",
    websiteLink: "https://effease.vercel.app/",
    tr: {
      title: "Effease - AI Photo Editor Website",
      description:
        "Effease yapay zeka destekli fotoğraf düzenleme uygulaması için premium pazarlama web sitesi.",
      features: [
        "Karanlık mod native OLED uyumlu şık uygulama vitrini",
        "AI dönüşüm efektlerini gösteren interaktif öncesi/sonrası slider",
        "Adım adım onboarding akışı: Yükle, Stil Seç, Paylaş",
        "App Store ve Google Play indirme entegrasyonu",
        "Smooth scroll animasyonlarıyla modern glassmorphism UI",
      ],
    },
    en: {
      title: "Effease - AI Photo Editor Website",
      description:
        "A premium marketing website for Effease, an AI-powered photo editing app.",
      features: [
        "Sleek app showcase with dark mode native OLED-friendly design",
        "Interactive before/after slider demonstrating AI transformation effects",
        "Step-by-step onboarding flow: Upload, Pick Style, Share Magic",
        "App Store and Google Play download integration",
        "Modern glassmorphism UI with smooth scroll animations",
      ],
    },
  },

  // ── 11 ──────────────────────────────────────────────────────
  {
    id: 11,
    platform: "web",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Zustand",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/AltF5/cover.png",
    websiteLink: "https://alt-f5.vercel.app/",
    tr: {
      title: "ALT F5 | Digital Collective",
      description:
        "Dijital hikaye anlatımının geleceğini inşa eden bir kolektif. Orijinal çizgi romanları, podcast'leri ve indie oyunları tek bir cyberpunk estetikli platformda bir araya getirir.",
      features: [
        "Cyberpunk estetik: Neon yeşil vurgular, karanlık temalar ve retro-futuristik tasarım",
        "Tam ekran çizgi roman okuyucu: Keyboard navigation, touch swipe ve page progress bar",
        "Podcast Hub: Sesli içerikler için özel oynatıcı arayüzü",
        "Indie Arcade: Oyun vitrini, screenshots, system specs ve satın alma linkleri",
        "Framer Motion ile parallax scroll efektleri ve akıcı animasyonlar",
      ],
    },
    en: {
      title: "ALT F5 | Digital Collective",
      description:
        "A collective building the future of digital storytelling. Brings together original comics, podcasts, and indie games on a single cyberpunk aesthetic platform.",
      features: [
        "Cyberpunk aesthetic: Neon green accents, dark themes, and retro-futuristic design",
        "Full-screen comic reader: Keyboard navigation, touch swipe, and page progress bar",
        "Podcast Hub: Custom player interface for audio content",
        "Indie Arcade: Game showcase, screenshots, system specs, and purchase links",
        "Parallax scroll effects and smooth animations with Framer Motion",
      ],
    },
  },

  // ── 12 ──────────────────────────────────────────────────────
  {
    id: 12,
    platform: "web",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    image: "/images/RepackStudio/cover.png",
    websiteLink: "https://repackstudio.tech/",
    tr: {
      title: "RepackStudio Web Sitesi",
      description:
        "Repack Studio mobil uygulama ajansının kurumsal web sitesi, ürünlerini ve hizmetlerini sergiler.",
      features: [
        "Mobil uygulama ajansının ürün vitrini ve portföyünü sergiler",
        "Modern ve duyarlı tasarım için Next.js ve TailwindCSS ile geliştirildi",
        "Framer Motion ile akıcı animasyonlar ve geçiş efektleri",
        "FaceRateMax, Effease ve Hydra gibi ürünleri tanıtır",
      ],
    },
    en: {
      title: "RepackStudio Website",
      description:
        "Corporate website for Repack Studio mobile app agency, showcasing their products and services.",
      features: [
        "Showcases the mobile app agency's product portfolio",
        "Built with Next.js and TailwindCSS for modern and responsive design",
        "Smooth animations and transition effects with Framer Motion",
        "Introduces products like FaceRateMax, Effease, and Hydra",
      ],
    },
  },

  // ── 13 ──────────────────────────────────────────────────────
  {
    id: 13,
    platform: "web",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
    image: "/images/FaceRateMaxWebsite/cover.png",
    websiteLink: "https://face-rate-max.vercel.app/",
    tr: {
      title: "FaceRateMax Web Sitesi",
      description:
        "FaceRateMax uygulaması için bir web sitesi, özelliklerini sergiler ve mobil kullanıcılar için bilgi sağlar.",
      features: [
        "FaceRateMax yapay zeka destekli yüz analizi uygulamasını sergiler",
        "Modern ve duyarlı bir tasarım için Next.js ve TailwindCSS ile oluşturuldu",
        "Mobil cihazlarda kullanılabilen uygulama hakkında bilgi sağlar",
      ],
    },
    en: {
      title: "FaceRateMax Website",
      description:
        "A website for the FaceRateMax app, showcasing its features and providing information for mobile users.",
      features: [
        "Showcases the FaceRateMax AI-powered face analysis application",
        "Built with Next.js and TailwindCSS for a modern and responsive design",
        "Provides information about the app, exclusively available on mobile devices",
      ],
    },
  },

  // ── 14 ──────────────────────────────────────────────────────
  {
    id: 14,
    platform: "web",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "TailwindCSS"],
    image: "/images/TaskFlow/cover.png",
    websiteLink: "https://demo-taskflow.vercel.app/",
    tr: {
      title: "Task Flow - Görev Yönetim Uygulaması",
      description:
        "Next.js, Supabase ve TypeScript kullanılarak geliştirilmiş modern ve güvenli bir görev yönetim sistemi.",
      features: [
        "Rol tabanlı organizasyon yapısı (Owner, Admin, Member)",
        "Sürükle-bırak destekli interaktif Kanban görev tahtası",
        "Optimize edilmiş polling yöntemiyle gerçek zamanlı güncellemeler",
        "Temiz, duyarlı ve kullanıcı dostu arayüz tasarımı",
      ],
    },
    en: {
      title: "Task Flow - Task Management App",
      description:
        "A modern and secure task management system built with Next.js, Supabase, and TypeScript.",
      features: [
        "Role-based organization structure (Owner, Admin, Member)",
        "Interactive Kanban board with drag-and-drop task management",
        "Real-time updates through optimized polling",
        "Clean, responsive, and user-friendly UI design",
      ],
    },
  },

  // ── 15 ──────────────────────────────────────────────────────
  {
    id: 15,
    platform: "web",
    tags: ["Next.js", "TypeScript", "Firebase", "Firestore", "TailwindCSS"],
    image: "/images/E-Commerce/cover.png",
    websiteLink: "https://demo-e-ticaret.vercel.app/",
    tr: {
      title: "E-Ticaret Web Sitesi",
      description:
        "Next.js ve Firebase ile geliştirilmiş, kullanıcıların mağaza oluşturup ürün ve sipariş yönetimi yapabildiği tam kapsamlı bir e-ticaret platformu.",
      features: [
        "Çok-satıcılı e-ticaret platformu ile kendi mağazanızı oluşturun",
        "Gerçek zamanlı analitikler, ürün yönetimi ve sipariş takibi",
        "Gerçek zamanlı envanter takibi ve düşük stok uyarıları",
        "Türk kullanıcıları için telefon numarası formatlaması",
      ],
    },
    en: {
      title: "E-Commerce Website",
      description:
        "A full-stack e-commerce platform with Next.js and Firebase, allowing users to create stores, manage products, and track orders.",
      features: [
        "Multi-vendor e-commerce platform to create your own store",
        "Real-time analytics, product management, and order tracking",
        "Real-time inventory tracking and low stock alerts",
        "Phone number formatting for Turkish users",
      ],
    },
  },

  // ── 16 ──────────────────────────────────────────────────────
  {
    id: 16,
    platform: "web",
    tags: ["ReactJS", "TailwindCSS", "Python", "Web Scraping"],
    image: "/images/IMDBTierlist/cover.jpeg",
    websiteLink: "https://imdb-series-tierlist.vercel.app/",
    tr: {
      title: "IMDB Dizi Sıralama Listesi",
      description:
        "Sürükle bırak işlevselliği ve Python scraper ile veri çekme özellikli dizi sıralama web uygulaması.",
      features: [
        "IMDB puanlarına göre dizileri sıralamak için web uygulaması",
        "Tier listeleri oluşturmak için sürükle bırak işlevselliği",
        "Python script tabanlı scraper ile IMDB dizi verileri",
        "React.js ve TailwindCSS ile duyarlı arayüz",
      ],
    },
    en: {
      title: "IMDB Series Tierlist",
      description:
        "A web app for ranking TV series with drag-and-drop functionality and data fetched via Python scraper.",
      features: [
        "Web application to rank TV series based on IMDB ratings",
        "Drag and drop functionality for creating tier lists",
        "Data fetched using Python script based scraper for IMDB series",
        "Responsive interface with React.js and TailwindCSS",
      ],
    },
  },

  // ── 17 ──────────────────────────────────────────────────────
  {
    id: 17,
    platform: "web",
    tags: ["Next.js", "ReactJS", "TailwindCSS", "TypeScript"],
    image: "/images/GamingWebsite/cover.png",
    websiteLink: "https://hgamepulse.vercel.app/",
    tr: {
      title: "Oyun Web Sitesi",
      description:
        "Mock veriler kullanarak tasarım ve geliştirme becerilerini sergilemek için Next.js ile inşa edilmiş front-end odaklı bir oyun web sitesi.",
      features: [
        "Hikaye, oynanış ve özellikler içeren dinamik oyun sayfaları",
        "Masaüstü ve mobil cihazlar için tamamen duyarlı tasarım",
        "Hover efektleri ve animasyonlarla etkileşimli UI",
        "Next.js ile dinamik yönlendirme ve SSR",
      ],
    },
    en: {
      title: "Gaming Website",
      description:
        "A front-end focused gaming website built with Next.js to demonstrate design and development skills using mock data.",
      features: [
        "Dynamic game pages with story, gameplay, and features",
        "Fully responsive design optimized for desktop and mobile devices",
        "Interactive UI with hover effects and animations",
        "Dynamic routing and SSR with Next.js",
      ],
    },
  },

  // ── 18 ──────────────────────────────────────────────────────
  {
    id: 18,
    platform: "web",
    tags: ["ReactJS", "NodeJS", "MySQL", "TailwindCSS"],
    image: "/images/Estate/cover.png",
    githubLink: "https://github.com/hsemihaktas/EstateWebsite",
    tr: {
      title: "Emlak Web Sitesi",
      description:
        "React, Node.js ve MySQL kullanılarak inşa edilen, güvenli kimlik doğrulama ile emlak listelemelerini yönetmek için bir platform.",
      features: [
        "React.js, Node.js ve MySQL ile tam yığın web uygulaması",
        "CRUD işlemleri ile ilan yönetimi",
        "Güvenli kullanıcı kimlik doğrulama sistemi",
        "Kapsamlı emlak detayları ve kullanıcı dostu arayüz",
      ],
    },
    en: {
      title: "Property Website",
      description:
        "A platform for managing property listings with secure authentication, built using React, Node.js, and MySQL.",
      features: [
        "Full stack web application with React.js, Node.js, and MySQL",
        "Listing management through CRUD operations",
        "Secure user authentication system",
        "Comprehensive property details and user-friendly interface",
      ],
    },
  },

  // ── 19 ──────────────────────────────────────────────────────
  {
    id: 19,
    platform: "web",
    tags: ["Next.js", "EmailJS", "TailwindCSS"],
    image: "/images/Organization/cover.jpeg",
    websiteLink: "https://birthday-organization.vercel.app/",
    tr: {
      title: "Doğum Günü Organizasyon Web Sitesi",
      description:
        "EmailJS ile iletişim formu ve online rezervasyon özellikli doğum günü organizasyon web sitesi.",
      features: [
        "Doğum günü partisi planlaması için canlı ve kullanıcı dostu web sitesi",
        "EmailJS entegrasyonu ile iletişim formu işlevselliği",
        "Kişiye özel doğum günü paketleri",
        "Online rezervasyon özellikleri",
      ],
    },
    en: {
      title: "Birthday Organization Website",
      description:
        "A birthday party organization website with online reservation and contact form via EmailJS.",
      features: [
        "Vibrant and user friendly website for birthday party planning",
        "EmailJS integration for seamless contact form functionality",
        "Customized birthday packages",
        "Online reservation features",
      ],
    },
  },

  // ── 20 ──────────────────────────────────────────────────────
  {
    id: 20,
    platform: "web",
    tags: ["Django", "Python", "OpenCV", "AI"],
    image: "/images/BlurFace/cover.png",
    githubLink: "https://github.com/hsemihaktas/BlurryFace",
    tr: {
      title: "Blurface - Fotoğraf Bulanıklaştırma",
      description:
        "Python ve OpenCV ile geliştirilen, görüntü ve videolarda yüz bulanıklaştırma için yapay zeka destekli bir uygulama.",
      features: [
        "Gizlilik koruması için yapay zeka destekli yüz bulanıklaştırma",
        "Gerçek zamanlı yüz algılama ve bulanıklaştırma",
        "Hem görüntü hem de video işleme desteği",
        "Bulanıklık yoğunluğu ve bölgelerini seçmek için kullanıcı dostu arayüz",
      ],
    },
    en: {
      title: "Blurface - Photo Blurring",
      description:
        "An AI-powered application for face blurring in images and videos, built with Python and OpenCV.",
      features: [
        "AI-powered face blurring for privacy protection",
        "Real-time face detection and blurring",
        "Supports both image and video processing",
        "User-friendly interface for selecting blur intensity and regions",
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────
// Helper: ProjectDefinition → component-facing Project (tek dil)
// gallery yoksa appStore.screenshots otomatik kullanılır
// ─────────────────────────────────────────────────────────────
export function getProjectItems(lang: Language): Project[] {
  return projectDefinitions.map((def) => ({
    id: def.id,
    title: def[lang].title,
    description: def[lang].description,
    tags: def.tags,
    image: def.image,
    gallery: def.gallery ?? def.appStore?.screenshots,
    features: def[lang].features,
    githubLink: def.githubLink,
    websiteLink: def.websiteLink,
    appStoreLink: def.appStoreLink,
    androidStoreLink: def.androidStoreLink,
    platform: def.platform,
  }));
}

// ─────────────────────────────────────────────────────────────
// Backward-compatible export (DATA[lang].projects kullanımı)
// ─────────────────────────────────────────────────────────────
export const projectsData = {
  tr: {
    title: "Projelerim",
    viewProject: "İncele",
    liveDemo: "Canlı Demo",
    repo: "Kaynak Kod",
    back: "Geri Dön",
    stack: "Teknolojiler",
    featuresTitle: "Öne Çıkanlar",
    screenshotsTitle: "Ekran Görüntüleri",
    items: getProjectItems("tr"),
  },
  en: {
    title: "My Projects",
    viewProject: "View",
    liveDemo: "Live Demo",
    repo: "Source Code",
    back: "Go Back",
    stack: "Stack",
    featuresTitle: "Highlights",
    screenshotsTitle: "Screenshots",
    items: getProjectItems("en"),
  },
};
