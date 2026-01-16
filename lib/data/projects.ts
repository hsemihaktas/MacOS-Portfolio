import { Project } from "../types";

// Project Items - Turkish
const projectItemsTr: Project[] = [
  {
    id: 1,
    title: "EFFEASE - AI Fotoğraf Editörü",
    description:
      "Google'ın Gemini AI'ını kullanarak sıradan fotoğrafları olağanüstü sanat eserlerine dönüştüren güçlü bir yapay zeka destekli mobil fotoğraf düzenleme uygulaması.",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Google Gemini AI",
    ],
    image: "/images/Effease/Cover.jpeg",
    features: [
      "Google Gemini 2.5 Flash Image API ile yapay zeka destekli görüntü dönüşümü",
      "Kategorilere ayrılmış zengin efekt kütüphanesi",
      "Firebase Authentication ile Google Sign-In entegrasyonu",
      "Token tabanlı kullanım sistemi ve kullanıcı profil yönetimi",
    ],
    appStoreLink:
      "https://apps.apple.com/us/app/effease-ai-photo-studio/id6756782812",
    androidStoreLink:
      "https://play.google.com/store/apps/details?id=com.repackstudio.effease",
    platform: "mobile",
  },
  {
    id: 2,
    title: "Güzellik Merkezi Uygulaması",
    description:
      "React Native & Expo ile geliştirilmiş, güzellik hizmetleri için randevu alma ve yönetme uygulaması.",
    tags: ["React Native", "Expo", "TypeScript", "Push Notifications"],
    image: "/images/BeautyCenter/Cover.png",
    features: [
      "Güzellik merkezlerini detaylı bilgiler ve yorumlarla keşfedin",
      "Hizmetler ve çalışanlar için gerçek zamanlı uygunluk ile randevu alın",
      "Tamamlanan randevuları fotoğraf yüklemeleriyle puanlayın",
      "Hatırlatmalar ve güncellemeler için anlık bildirimler",
    ],
    githubLink: "https://github.com/hsemihaktas/BeautyCenterApp",
    platform: "mobile",
  },
  {
    id: 3,
    title: "Şifreli Günlük",
    description:
      "AES şifreleme ile güvenli not tutma uygulaması, React Native & Expo ile geliştirildi.",
    tags: ["React Native", "Expo", "expo-crypto", "AES"],
    image: "/images/EncryptDiary/Cover.png",
    features: [
      "Kişisel notları AES tabanlı şifreleme ile güvenli bir şekilde saklar",
      "Notları kolayca ekleyin, okuyun, güncelleyin ve silin",
      "Sadece doğru anahtarla erişilebilen expo-crypto şifreleme",
      "Minimal ve kullanıcı dostu arayüz tasarımı",
    ],
    githubLink: "https://github.com/hsemihaktas/EncryptDiary",
    platform: "mobile",
  },
  {
    id: 4,
    title: "Kelime Uygulaması - Lexicon",
    description:
      "Kelime çeviri, eşanlamlı ve etkileşimli öğrenim için mobil uygulama.",
    tags: ["React Native", "Expo", "MyMemory API", "Datamuse API"],
    image: "/images/Lexicon/Cover.png",
    features: [
      "Kelime çeviri ve eşanlamlı gösterimi (MyMemory & Datamuse API ile)",
      "Favorilere ekleme/çıkarma ve oyun moduyla etkileşimli kelime öğrenimi",
      "Context API ile durum yönetimi",
      "Material Icons ile modern arayüz",
    ],
    githubLink: "https://github.com/hsemihaktas/Lexicon-WordApplication",
    platform: "mobile",
  },
  {
    id: 5,
    title: "Loki History Web Sitesi",
    description:
      "İskandinav mitolojisinin kaos tanrısı Loki'nin gerçek hikayesini anlatan sinematik bir web deneyimi. Mitoloji, soy ağacı ve efsanevi hikayeleri keşfedin.",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Lucide React"],
    image: "/images/Loki-History/cover.png",
    features: [
      "Loki'nin kökenlerinden Ragnarök'e kadar tüm mitolojik hikayelerini interaktif olarak sunar",
      "Next.js 16 ve TailwindCSS 4 ile modern, responsive ve sinematik tasarım",
      "Özel animasyonlar, custom cursor ve parallax efektleriyle immersive kullanıcı deneyimi",
      "Soy ağacı (Genealogy Tree), eserler (Artifacts) ve dönüşüm hikayeleri gibi zengin içerik bölümleri",
      "Karanlık tema ve mitolojik estetiğe uygun görsel tasarım",
    ],
    websiteLink: "https://loki-history.vercel.app/",
    platform: "web",
  },
  {
    id: 6,
    title: "The Void - Cosmic Experience",
    description:
      "Kozmik boşluğun derinliklerine inen, karanlık uzay temalı sinematik bir web deneyimi. Vakum enerjisi, zaman genişlemesi ve evrenin en büyük gizemlerini interaktif olarak keşfedin.",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/The-Void/cover.png",
    features: [
      "Kozmik boşluk, vakum enerjisi ve zaman genişlemesi gibi uzay fenomenlerini interaktif seksiyonlarla sunar",
      "Next.js 16 ve TailwindCSS 4 ile modern, responsive ve immersive tasarım",
      "Framer Motion ile smooth animasyonlar ve parallax efektleri",
      "Boötes Void, Cold Spot ve Vacuum Energy gibi bilimsel içerikler",
      "Karanlık, sinematik uzay temalı estetik ve görsel tasarım",
    ],
    websiteLink: "https://the-void-v1.vercel.app/",
    platform: "web",
  },
  {
    id: 7,
    title: "Effease - AI Photo Editor Website",
    description:
      "Effease yapay zeka destekli fotoğraf düzenleme uygulaması için premium pazarlama web sitesi. Anime, Cyberpunk ve Artistik dönüşüm efektlerini karanlık, modern bir estetikle sergiler.",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/EffeaseWebsite/cover.png",
    features: [
      "Karanlık mod native OLED uyumlu şık uygulama vitrini",
      "AI dönüşüm efektlerini gösteren interaktif öncesi/sonrası slider",
      "Adım adım onboarding akışı: Yükle, Stil Seç, Paylaş",
      "App Store ve Google Play indirme entegrasyonu",
      "Yaratıcı ve influencer yorumlarıyla testimonial bölümü",
      "Smooth scroll animasyonlarıyla modern glassmorphism UI",
    ],
    websiteLink: "https://effease.vercel.app/",
    platform: "web",
  },
  {
    id: 8,
    title: "RepackStudio Web Sitesi",
    description:
      "Repack Studio mobil uygulama ajansının kurumsal web sitesi, ürünlerini ve hizmetlerini sergiler.",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    image: "/images/RepackStudio/cover.png",
    features: [
      "Mobil uygulama ajansının ürün vitrini ve portföyünü sergiler",
      "Modern ve duyarlı tasarım için Next.js ve TailwindCSS ile geliştirildi",
      "Framer Motion ile akıcı animasyonlar ve geçiş efektleri",
      "FaceRateMax, Effease ve Hydra gibi ürünleri tanıtır",
    ],
    websiteLink: "https://repackstudio.tech/",
    platform: "web",
  },
  {
    id: 9,
    title: "FaceRateMax Web Sitesi",
    description:
      "FaceRateMax uygulaması için bir web sitesi, özelliklerini sergiler ve mobil kullanıcılar için bilgi sağlar.",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
    image: "/images/FaceRateMaxWebsite/Cover.png",
    features: [
      "FaceRateMax yapay zeka destekli yüz analizi uygulamasını sergiler",
      "Modern ve duyarlı bir tasarım için Next.js ve TailwindCSS ile oluşturuldu",
      "Mobil cihazlarda kullanılabilen uygulama hakkında bilgi sağlar",
    ],
    websiteLink: "https://face-rate-max.vercel.app/",
    platform: "web",
  },
  {
    id: 10,
    title: "Task Flow - Görev Yönetim Uygulaması",
    description:
      "Next.js, Supabase ve TypeScript kullanılarak geliştirilmiş modern ve güvenli bir görev yönetim sistemi.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "TailwindCSS"],
    image: "/images/TaskFlow/Cover.png",
    features: [
      "Rol tabanlı organizasyon yapısı (Owner, Admin, Member)",
      "Sürükle-bırak destekli interaktif Kanban görev tahtası",
      "Optimize edilmiş polling yöntemiyle gerçek zamanlı güncellemeler",
      "Temiz, duyarlı ve kullanıcı dostu arayüz tasarımı",
    ],
    websiteLink: "https://demo-taskflow.vercel.app/",
    platform: "web",
  },
  {
    id: 11,
    title: "E-Ticaret Web Sitesi",
    description:
      "Next.js ve Firebase ile geliştirilmiş, kullanıcıların mağaza oluşturup ürün ve sipariş yönetimi yapabildiği tam kapsamlı bir e-ticaret platformu.",
    tags: ["Next.js", "TypeScript", "Firebase", "Firestore", "TailwindCSS"],
    image: "/images/E-Commerce/Cover.png",
    features: [
      "Çok-satıcılı e-ticaret platformu ile kendi mağazanızı oluşturun",
      "Gerçek zamanlı analitikler, ürün yönetimi ve sipariş takibi",
      "Gerçek zamanlı envanter takibi ve düşük stok uyarıları",
      "Türk kullanıcıları için telefon numarası formatlaması",
    ],
    websiteLink: "https://demo-e-ticaret.vercel.app/",
    platform: "web",
  },
  {
    id: 12,
    title: "IMDB Dizi Sıralama Listesi",
    description:
      "Sürükle bırak işlevselliği ve Python scraper ile veri çekme özellikli dizi sıralama web uygulaması.",
    tags: ["ReactJS", "TailwindCSS", "Python", "Web Scraping"],
    image: "/images/IMDBTierlist/Cover.jpeg",
    features: [
      "IMDB puanlarına göre dizileri sıralamak için web uygulaması",
      "Tier listeleri oluşturmak için sürükle bırak işlevselliği",
      "Python script tabanlı scraper ile IMDB dizi verileri",
      "React.js ve TailwindCSS ile duyarlı arayüz",
    ],
    websiteLink: "https://imdb-series-tierlist.vercel.app/",
    platform: "web",
  },
  {
    id: 13,
    title: "Oyun Web Sitesi",
    description:
      "Mock veriler kullanarak tasarım ve geliştirme becerilerini sergilemek için Next.js ile inşa edilmiş front-end odaklı bir oyun web sitesi.",
    tags: ["Next.js", "ReactJS", "TailwindCSS", "TypeScript"],
    image: "/images/GamingWebsite/Cover.png",
    features: [
      "Hikaye, oynanış ve özellikler içeren dinamik oyun sayfaları",
      "Masaüstü ve mobil cihazlar için tamamen duyarlı tasarım",
      "Hover efektleri ve animasyonlarla etkileşimli UI",
      "Next.js ile dinamik yönlendirme ve SSR",
    ],
    websiteLink: "https://hgamepulse.vercel.app/",
    platform: "web",
  },
  {
    id: 14,
    title: "Emlak Web Sitesi",
    description:
      "React, Node.js ve MySQL kullanılarak inşa edilen, güvenli kimlik doğrulama ile emlak listelemelerini yönetmek için bir platform.",
    tags: ["ReactJS", "NodeJS", "MySQL", "TailwindCSS"],
    image: "/images/Estate/Cover.png",
    features: [
      "React.js, Node.js ve MySQL ile tam yığın web uygulaması",
      "CRUD işlemleri ile ilan yönetimi",
      "Güvenli kullanıcı kimlik doğrulama sistemi",
      "Kapsamlı emlak detayları ve kullanıcı dostu arayüz",
    ],
    githubLink: "https://github.com/hsemihaktas/EstateWebsite",
    platform: "web",
  },
  {
    id: 15,
    title: "Doğum Günü Organizasyon Web Sitesi",
    description:
      "EmailJS ile iletişim formu ve online rezervasyon özellikli doğum günü organizasyon web sitesi.",
    tags: ["Next.js", "EmailJS", "TailwindCSS"],
    image: "/images/Organization/Cover.jpeg",
    features: [
      "Doğum günü partisi planlaması için canlı ve kullanıcı dostu web sitesi",
      "EmailJS entegrasyonu ile iletişim formu işlevselliği",
      "Kişiye özel doğum günü paketleri",
      "Online rezervasyon özellikleri",
    ],
    websiteLink: "https://birthday-organization.vercel.app/",
    platform: "web",
  },
  {
    id: 16,
    title: "Blurface - Fotoğraf Bulanıklaştırma",
    description:
      "Python ve OpenCV ile geliştirilen, görüntü ve videolarda yüz bulanıklaştırma için yapay zeka destekli bir uygulama.",
    tags: ["Django", "Python", "OpenCV", "AI"],
    image: "/images/BlurFace/Cover.png",
    features: [
      "Gizlilik koruması için yapay zeka destekli yüz bulanıklaştırma",
      "Gerçek zamanlı yüz algılama ve bulanıklaştırma",
      "Hem görüntü hem de video işleme desteği",
      "Bulanıklık yoğunluğu ve bölgelerini seçmek için kullanıcı dostu arayüz",
    ],
    githubLink: "https://github.com/hsemihaktas/BlurryFace",
    platform: "web",
  },
];

// Project Items - English
const projectItemsEn: Project[] = [
  {
    id: 1,
    title: "EFFEASE - AI Photo Editor",
    description:
      "A powerful AI-powered mobile photo editing application that transforms ordinary photos into extraordinary works of art using Google's Gemini AI.",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Google Gemini AI",
    ],
    image: "/images/Effease/Cover.jpeg",
    features: [
      "AI-powered image transformation using Google Gemini 2.5 Flash Image API",
      "Rich effect library organized by categories",
      "Google Sign-In integration with Firebase Authentication",
      "Token-based credit system and user profile management",
    ],
    appStoreLink:
      "https://apps.apple.com/us/app/effease-ai-photo-studio/id6756782812",
    androidStoreLink:
      "https://play.google.com/store/apps/details?id=com.repackstudio.effease",
    platform: "mobile",
  },
  {
    id: 2,
    title: "Beauty Center App",
    description:
      "A modern mobile app for booking beauty services and managing appointments, built with React Native & Expo.",
    tags: ["React Native", "Expo", "TypeScript", "Push Notifications"],
    image: "/images/BeautyCenter/Cover.png",
    features: [
      "Discover beauty centers with detailed information and reviews",
      "Book appointments with real-time availability for services and staff",
      "Rate and review completed appointments with photo uploads",
      "Push notifications for reminders and updates",
    ],
    githubLink: "https://github.com/hsemihaktas/BeautyCenterApp",
    platform: "mobile",
  },
  {
    id: 3,
    title: "Encrypt Diary",
    description:
      "A secure note taking app with AES encryption, built using React Native & Expo.",
    tags: ["React Native", "Expo", "expo-crypto", "AES"],
    image: "/images/EncryptDiary/Cover.png",
    features: [
      "Stores personal notes securely with AES based encryption",
      "Add, read, update, and delete notes easily",
      "Encryption powered by expo-crypto, accessible only with the correct key",
      "Minimal and user-friendly interface design",
    ],
    githubLink: "https://github.com/hsemihaktas/EncryptDiary",
    platform: "mobile",
  },
  {
    id: 4,
    title: "Word Application - Lexicon",
    description:
      "A mobile app for word translation, synonyms, and interactive learning.",
    tags: ["React Native", "Expo", "MyMemory API", "Datamuse API"],
    image: "/images/Lexicon/Cover.png",
    features: [
      "Word translation and synonym display (with MyMemory & Datamuse API)",
      "Add/remove favorites and interactive word learning with game mode",
      "State management with Context API",
      "Modern interface with Material Icons",
    ],
    githubLink: "https://github.com/hsemihaktas/Lexicon-WordApplication",
    platform: "mobile",
  },
  {
    id: 5,
    title: "Loki History Website",
    description:
      "A cinematic web experience telling the true story of Loki, the Norse god of chaos. Explore mythology, genealogy tree, and legendary tales.",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Lucide React"],
    image: "/images/Loki-History/cover.png",
    features: [
      "Interactive presentation of all mythological stories from Loki's origins to Ragnarök",
      "Modern, responsive and cinematic design with Next.js 16 and TailwindCSS 4",
      "Immersive user experience with custom animations, custom cursor and parallax effects",
      "Rich content sections like Genealogy Tree, Artifacts and transformation stories",
      "Visual design appropriate for dark theme and mythological aesthetics",
    ],
    websiteLink: "https://loki-history.vercel.app/",
    platform: "web",
  },
  {
    id: 6,
    title: "The Void - Cosmic Experience",
    description:
      "A cinematic web experience diving into the depths of cosmic void. Interactively explore vacuum energy, time dilation, and the universe's greatest mysteries.",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/The-Void/cover.png",
    features: [
      "Interactive sections presenting space phenomena like cosmic void, vacuum energy, and time dilation",
      "Modern, responsive and immersive design with Next.js 16 and TailwindCSS 4",
      "Smooth animations and parallax effects with Framer Motion",
      "Scientific content including Boötes Void, Cold Spot, and Vacuum Energy",
      "Dark, cinematic space-themed aesthetic and visual design",
    ],
    websiteLink: "https://the-void-v1.vercel.app/",
    platform: "web",
  },
  {
    id: 7,
    title: "Effease - AI Photo Editor Website",
    description:
      "A premium marketing website for Effease, an AI-powered photo editing app. Showcases Anime, Cyberpunk, and Artistic transformation effects with a dark, modern aesthetic.",
    tags: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Framer Motion",
      "Lucide React",
    ],
    image: "/images/EffeaseWebsite/cover.png",
    features: [
      "Sleek app showcase with dark mode native OLED-friendly design",
      "Interactive before/after slider demonstrating AI transformation effects",
      "Step-by-step onboarding flow: Upload, Pick Style, Share Magic",
      "App Store and Google Play download integration",
      "Testimonials section with user reviews from creators and influencers",
      "Modern glassmorphism UI with smooth scroll animations",
    ],
    websiteLink: "https://effease.vercel.app/",
    platform: "web",
  },
  {
    id: 8,
    title: "RepackStudio Website",
    description:
      "Corporate website for Repack Studio mobile app agency, showcasing their products and services.",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    image: "/images/RepackStudio/cover.png",
    features: [
      "Showcases the mobile app agency's product portfolio",
      "Built with Next.js and TailwindCSS for modern and responsive design",
      "Smooth animations and transition effects with Framer Motion",
      "Introduces products like FaceRateMax, Effease, and Hydra",
    ],
    websiteLink: "https://repackstudio.tech/",
    platform: "web",
  },
  {
    id: 9,
    title: "FaceRateMax Website",
    description:
      "A website for the FaceRateMax app, showcasing its features and providing information for mobile users.",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
    image: "/images/FaceRateMaxWebsite/Cover.png",
    features: [
      "Showcases the FaceRateMax AI-powered face analysis application",
      "Built with Next.js and TailwindCSS for a modern and responsive design",
      "Provides information about the app, exclusively available on mobile devices",
    ],
    websiteLink: "https://face-rate-max.vercel.app/",
    platform: "web",
  },
  {
    id: 10,
    title: "Task Flow - Task Management App",
    description:
      "A modern and secure task management system built with Next.js, Supabase, and TypeScript.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "TailwindCSS"],
    image: "/images/TaskFlow/Cover.png",
    features: [
      "Role-based organization structure (Owner, Admin, Member)",
      "Interactive Kanban board with drag-and-drop task management",
      "Real-time updates through optimized polling",
      "Clean, responsive, and user-friendly UI design",
    ],
    websiteLink: "https://demo-taskflow.vercel.app/",
    platform: "web",
  },
  {
    id: 11,
    title: "E-Commerce Website",
    description:
      "A full-stack e-commerce platform with Next.js and Firebase, allowing users to create stores, manage products, and track orders.",
    tags: ["Next.js", "TypeScript", "Firebase", "Firestore", "TailwindCSS"],
    image: "/images/E-Commerce/Cover.png",
    features: [
      "Multi-vendor e-commerce platform to create your own store",
      "Real-time analytics, product management, and order tracking",
      "Real-time inventory tracking and low stock alerts",
      "Phone number formatting for Turkish users",
    ],
    websiteLink: "https://demo-e-ticaret.vercel.app/",
    platform: "web",
  },
  {
    id: 12,
    title: "IMDB Series Tierlist",
    description:
      "A web app for ranking TV series with drag-and-drop functionality and data fetched via Python scraper.",
    tags: ["ReactJS", "TailwindCSS", "Python", "Web Scraping"],
    image: "/images/IMDBTierlist/Cover.jpeg",
    features: [
      "Web application to rank TV series based on IMDB ratings",
      "Drag and drop functionality for creating tier lists",
      "Data fetched using Python script based scraper for IMDB series",
      "Responsive interface with React.js and TailwindCSS",
    ],
    websiteLink: "https://imdb-series-tierlist.vercel.app/",
    platform: "web",
  },
  {
    id: 13,
    title: "Gaming Website",
    description:
      "A front-end focused gaming website built with Next.js to demonstrate design and development skills using mock data.",
    tags: ["Next.js", "ReactJS", "TailwindCSS", "TypeScript"],
    image: "/images/GamingWebsite/Cover.png",
    features: [
      "Dynamic game pages with story, gameplay, and features",
      "Fully responsive design optimized for desktop and mobile devices",
      "Interactive UI with hover effects and animations",
      "Dynamic routing and SSR with Next.js",
    ],
    websiteLink: "https://hgamepulse.vercel.app/",
    platform: "web",
  },
  {
    id: 14,
    title: "Property Website",
    description:
      "A platform for managing property listings with secure authentication, built using React, Node.js, and MySQL.",
    tags: ["ReactJS", "NodeJS", "MySQL", "TailwindCSS"],
    image: "/images/Estate/Cover.png",
    features: [
      "Full stack web application with React.js, Node.js, and MySQL",
      "Listing management through CRUD operations",
      "Secure user authentication system",
      "Comprehensive property details and user-friendly interface",
    ],
    githubLink: "https://github.com/hsemihaktas/EstateWebsite",
    platform: "web",
  },
  {
    id: 15,
    title: "Birthday Organization Website",
    description:
      "A birthday party organization website with online reservation and contact form via EmailJS.",
    tags: ["Next.js", "EmailJS", "TailwindCSS"],
    image: "/images/Organization/Cover.jpeg",
    features: [
      "Vibrant and user friendly website for birthday party planning",
      "EmailJS integration for seamless contact form functionality",
      "Customized birthday packages",
      "Online reservation features",
    ],
    websiteLink: "https://birthday-organization.vercel.app/",
    platform: "web",
  },
  {
    id: 16,
    title: "Blurface - Photo Blurring",
    description:
      "An AI-powered application for face blurring in images and videos, built with Python and OpenCV.",
    tags: ["Django", "Python", "OpenCV", "AI"],
    image: "/images/BlurFace/Cover.png",
    features: [
      "AI-powered face blurring for privacy protection",
      "Real-time face detection and blurring",
      "Supports both image and video processing",
      "User-friendly interface for selecting blur intensity and regions",
    ],
    githubLink: "https://github.com/hsemihaktas/BlurryFace",
    platform: "web",
  },
];

// Projects Data with labels
export const projectsData = {
  tr: {
    title: "Projelerim",
    viewProject: "İncele",
    liveDemo: "Canlı Demo",
    repo: "Kaynak Kod",
    back: "Geri Dön",
    stack: "Teknolojiler",
    featuresTitle: "Öne Çıkanlar",
    items: projectItemsTr,
  },
  en: {
    title: "My Projects",
    viewProject: "View",
    liveDemo: "Live Demo",
    repo: "Source Code",
    back: "Go Back",
    stack: "Stack",
    featuresTitle: "Highlights",
    items: projectItemsEn,
  },
};
