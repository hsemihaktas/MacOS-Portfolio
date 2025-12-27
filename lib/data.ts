
export const DATA = {
    tr: {
        menu: {
            finder: "Finder",
            help: "Yardım"
        },
        apps: {
            about: "Finder",
            projects: "Projeler",
            skills: "Yetenekler",
            settings: "Ayarlar",
            contact: "Mail",
            ai: "Siri AI",
            system: "Etkinlik Monitörü"
        },
        about: {
            name: "Enes Şahin",
            role: "Senior Frontend Engineer & UI Designer",
            summary: "Apple estetiğine ve kullanıcı deneyimine aşık bir yazılım geliştiricisi. Karmaşık problemleri basit, zarif ve performanslı çözümlere dönüştürmeyi seviyorum. Son 5 yılımı modern web teknolojileri üzerine çalışarak geçirdim.",
            experience: [
                {
                    company: "Tech Solutions",
                    role: "Senior Web Developer",
                    period: "2021 - Günümüz",
                    desc: "E-ticaret platformlarının frontend mimarisini yönetiyorum."
                },
                {
                    company: "Design Studio",
                    role: "UI/UX Specialist",
                    period: "2019 - 2021",
                    desc: "Mobil ve web arayüz tasarımları geliştirdim."
                }
            ],
            education: "YTÜ • Bilgisayar Mühendisliği (2020)",
            location: "İstanbul, Türkiye",
            email: "enes@shn.dev"
        },
        skills: {
            title: "Sistem Kaynakları",
            subtitle: "Geliştirme sürecinde kullanılan çekirdek teknolojiler.",
            categories: [
                { name: "Frontend Core", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
                { name: "Backend Layer", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"] },
                { name: "Creative Engine", items: ["Figma", "UI/UX", "Adobe Suite", "Prototyping"] }
            ]
        },
        projects: {
            title: "Projelerim",
            viewProject: "İncele",
            liveDemo: "Canlı Demo",
            repo: "Kaynak Kod",
            back: "Geri Dön",
            stack: "Teknolojiler",
            featuresTitle: "Öne Çıkanlar",
            items: [
                {
                    id: 1,
                    title: "EFFEASE - AI Fotoğraf Editörü",
                    description: "Google'ın Gemini AI'ını kullanarak sıradan fotoğrafları olağanüstü sanat eserlerine dönüştüren güçlü bir yapay zeka destekli mobil fotoğraf düzenleme uygulaması.",
                    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Google Gemini AI"],
                    image: "/images/Effease/Cover.jpeg",
                    features: [
                        "Google Gemini 2.5 Flash Image API ile yapay zeka destekli görüntü dönüşümü",
                        "Kategorilere ayrılmış zengin efekt kütüphanesi",
                        "Firebase Authentication ile Google Sign-In entegrasyonu",
                        "Token tabanlı kullanım sistemi ve kullanıcı profil yönetimi"
                    ],
                    link: ""
                },
                {
                    id: 2,
                    title: "Güzellik Merkezi Uygulaması",
                    description: "React Native & Expo ile geliştirilmiş, güzellik hizmetleri için randevu alma ve yönetme uygulaması.",
                    tags: ["React Native", "Expo", "TypeScript", "Push Notifications"],
                    image: "/images/BeautyCenter/Cover.png",
                    features: [
                        "Güzellik merkezlerini detaylı bilgiler ve yorumlarla keşfedin",
                        "Hizmetler ve çalışanlar için gerçek zamanlı uygunluk ile randevu alın",
                        "Tamamlanan randevuları fotoğraf yüklemeleriyle puanlayın",
                        "Hatırlatmalar ve güncellemeler için anlık bildirimler"
                    ],
                    link: "https://github.com/hsemihaktas/BeautyCenterApp"
                },
                {
                    id: 3,
                    title: "Şifreli Günlük",
                    description: "AES şifreleme ile güvenli not tutma uygulaması, React Native & Expo ile geliştirildi.",
                    tags: ["React Native", "Expo", "expo-crypto", "AES"],
                    image: "/images/EncryptDiary/Cover.png",
                    features: [
                        "Kişisel notları AES tabanlı şifreleme ile güvenli bir şekilde saklar",
                        "Notları kolayca ekleyin, okuyun, güncelleyin ve silin",
                        "Sadece doğru anahtarla erişilebilen expo-crypto şifreleme",
                        "Minimal ve kullanıcı dostu arayüz tasarımı"
                    ],
                    link: "https://github.com/hsemihaktas/EncryptDiary"
                },
                {
                    id: 4,
                    title: "Kelime Uygulaması - Lexicon",
                    description: "Kelime çeviri, eşanlamlı ve etkileşimli öğrenim için mobil uygulama.",
                    tags: ["React Native", "Expo", "MyMemory API", "Datamuse API"],
                    image: "/images/Lexicon/Cover.png",
                    features: [
                        "Kelime çeviri ve eşanlamlı gösterimi (MyMemory & Datamuse API ile)",
                        "Favorilere ekleme/çıkarma ve oyun moduyla etkileşimli kelime öğrenimi",
                        "Context API ile durum yönetimi",
                        "Material Icons ile modern arayüz"
                    ],
                    link: "https://github.com/hsemihaktas/Lexicon-WordApplication"
                },
                {
                    id: 5,
                    title: "FaceRateMax Web Sitesi",
                    description: "FaceRateMax uygulaması için bir web sitesi, özelliklerini sergiler ve mobil kullanıcılar için bilgi sağlar.",
                    tags: ["Next.js", "TailwindCSS", "TypeScript"],
                    image: "/images/FaceRateMaxWebsite/Cover.png",
                    features: [
                        "FaceRateMax yapay zeka destekli yüz analizi uygulamasını sergiler",
                        "Modern ve duyarlı bir tasarım için Next.js ve TailwindCSS ile oluşturuldu",
                        "Mobil cihazlarda kullanılabilen uygulama hakkında bilgi sağlar"
                    ],
                    link: "https://face-rate-max.vercel.app/"
                },
                {
                    id: 6,
                    title: "Task Flow - Görev Yönetim Uygulaması",
                    description: "Next.js, Supabase ve TypeScript kullanılarak geliştirilmiş modern ve güvenli bir görev yönetim sistemi.",
                    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "TailwindCSS"],
                    image: "/images/TaskFlow/Cover.png",
                    features: [
                        "Rol tabanlı organizasyon yapısı (Owner, Admin, Member)",
                        "Sürükle-bırak destekli interaktif Kanban görev tahtası",
                        "Optimize edilmiş polling yöntemiyle gerçek zamanlı güncellemeler",
                        "Temiz, duyarlı ve kullanıcı dostu arayüz tasarımı"
                    ],
                    link: "https://demo-taskflow.vercel.app/"
                },
                {
                    id: 7,
                    title: "E-Ticaret Web Sitesi",
                    description: "Next.js ve Firebase ile geliştirilmiş, kullanıcıların mağaza oluşturup ürün ve sipariş yönetimi yapabildiği tam kapsamlı bir e-ticaret platformu.",
                    tags: ["Next.js", "TypeScript", "Firebase", "Firestore", "TailwindCSS"],
                    image: "/images/E-Commerce/Cover.png",
                    features: [
                        "Çok-satıcılı e-ticaret platformu ile kendi mağazanızı oluşturun",
                        "Gerçek zamanlı analitikler, ürün yönetimi ve sipariş takibi",
                        "Gerçek zamanlı envanter takibi ve düşük stok uyarıları",
                        "Türk kullanıcıları için telefon numarası formatlaması"
                    ],
                    link: "https://demo-e-ticaret.vercel.app/"
                },
                {
                    id: 8,
                    title: "IMDB Dizi Sıralama Listesi",
                    description: "Sürükle bırak işlevselliği ve Python scraper ile veri çekme özellikli dizi sıralama web uygulaması.",
                    tags: ["ReactJS", "TailwindCSS", "Python", "Web Scraping"],
                    image: "/images/IMDBTierlist/Cover.jpeg",
                    features: [
                        "IMDB puanlarına göre dizileri sıralamak için web uygulaması",
                        "Tier listeleri oluşturmak için sürükle bırak işlevselliği",
                        "Python script tabanlı scraper ile IMDB dizi verileri",
                        "React.js ve TailwindCSS ile duyarlı arayüz"
                    ],
                    link: "https://imdb-series-tierlist.vercel.app/"
                },
                {
                    id: 9,
                    title: "Oyun Web Sitesi",
                    description: "Mock veriler kullanarak tasarım ve geliştirme becerilerini sergilemek için Next.js ile inşa edilmiş front-end odaklı bir oyun web sitesi.",
                    tags: ["Next.js", "ReactJS", "TailwindCSS", "TypeScript"],
                    image: "/images/GamingWebsite/Cover.png",
                    features: [
                        "Hikaye, oynanış ve özellikler içeren dinamik oyun sayfaları",
                        "Masaüstü ve mobil cihazlar için tamamen duyarlı tasarım",
                        "Hover efektleri ve animasyonlarla etkileşimli UI",
                        "Next.js ile dinamik yönlendirme ve SSR"
                    ],
                    link: "https://hgamepulse.vercel.app/"
                },
                {
                    id: 10,
                    title: "Emlak Web Sitesi",
                    description: "React, Node.js ve MySQL kullanılarak inşa edilen, güvenli kimlik doğrulama ile emlak listelemelerini yönetmek için bir platform.",
                    tags: ["ReactJS", "NodeJS", "MySQL", "TailwindCSS"],
                    image: "/images/Estate/Cover.png",
                    features: [
                        "React.js, Node.js ve MySQL ile tam yığın web uygulaması",
                        "CRUD işlemleri ile ilan yönetimi",
                        "Güvenli kullanıcı kimlik doğrulama sistemi",
                        "Kapsamlı emlak detayları ve kullanıcı dostu arayüz"
                    ],
                    link: "https://github.com/hsemihaktas/EstateWebsite"
                },
                {
                    id: 11,
                    title: "Doğum Günü Organizasyon Web Sitesi",
                    description: "EmailJS ile iletişim formu ve online rezervasyon özellikli doğum günü organizasyon web sitesi.",
                    tags: ["Next.js", "EmailJS", "TailwindCSS"],
                    image: "/images/Organization/Cover.jpeg",
                    features: [
                        "Doğum günü partisi planlaması için canlı ve kullanıcı dostu web sitesi",
                        "EmailJS entegrasyonu ile iletişim formu işlevselliği",
                        "Kişiye özel doğum günü paketleri",
                        "Online rezervasyon özellikleri"
                    ],
                    link: "https://birthday-organization.vercel.app/"
                },
                {
                    id: 12,
                    title: "Blurface - Fotoğraf Bulanıklaştırma",
                    description: "Python ve OpenCV ile geliştirilen, görüntü ve videolarda yüz bulanıklaştırma için yapay zeka destekli bir uygulama.",
                    tags: ["Django", "Python", "OpenCV", "AI"],
                    image: "/images/BlurFace/Cover.png",
                    features: [
                        "Gizlilik koruması için yapay zeka destekli yüz bulanıklaştırma",
                        "Gerçek zamanlı yüz algılama ve bulanıklaştırma",
                        "Hem görüntü hem de video işleme desteği",
                        "Bulanıklık yoğunluğu ve bölgelerini seçmek için kullanıcı dostu arayüz"
                    ],
                    link: "https://github.com/hsemihaktas/BlurryFace"
                }
            ]
        },
        settings: {
            title: "Sistem Ayarları",
            language: "Dil Seçimi",
            wallpaper: "Masaüstü Resmi",
            appearance: "Görünüm"
        },
        contact: {
            title: "Mail",
            to: "Alıcı",
            subject: "Konu",
            placeholder: "Mesajınızı buraya yazın...",
            send: "Gönder",
            sentTitle: "Mesaj Hazır!",
            sentDesc: "Mail uygulamanız üzerinden gönderim yapabilirsiniz.",
            inbox: "Gelen Kutusu",
            sent: "Gönderilenler",
            drafts: "Taslaklar",
            trash: "Çöp"
        },
        notes: [
            {
                title: "Gelecek Planları",
                date: "21 Eylül 2024",
                content: "Yeni bir portfolyo tasarlamam gerekiyor.\\n\\n- macOS Sequoia estetiği\\n- Gemini AI asistanı\\n- Apple-like animasyonlar"
            }
        ]
    },
    en: {
        menu: {
            finder: "Finder",
            help: "Help"
        },
        apps: {
            about: "Finder",
            projects: "Projects",
            skills: "Skills",
            settings: "Settings",
            contact: "Mail",
            ai: "Siri AI",
            system: "Activity Monitor"
        },
        about: {
            name: "Enes Sahin",
            role: "Senior Frontend Engineer & UI Designer",
            summary: "Software developer in love with Apple aesthetics and UX. I love transforming complex problems into simple, elegant, and performant solutions.",
            experience: [
                {
                    company: "Tech Solutions",
                    role: "Senior Web Developer",
                    period: "2021 - Present",
                    desc: "Managing frontend architecture of e-commerce platforms."
                }
            ],
            education: "YTU • Computer Engineering (2020)",
            location: "Istanbul, Turkey",
            email: "enes@shn.dev"
        },
        skills: {
            title: "System Resources",
            subtitle: "Core technologies used in the development pipeline.",
            categories: [
                { name: "Frontend Core", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                { name: "Backend Layer", items: ["Node.js", "Express", "PostgreSQL", "MongoDB"] }
            ]
        },
        projects: {
            title: "My Projects",
            viewProject: "View",
            liveDemo: "Live Demo",
            repo: "Source Code",
            back: "Go Back",
            stack: "Stack",
            featuresTitle: "Highlights",
            items: [
                {
                    id: 1,
                    title: "EFFEASE - AI Photo Editor",
                    description: "A powerful AI-powered mobile photo editing application that transforms ordinary photos into extraordinary works of art using Google's Gemini AI.",
                    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Google Gemini AI"],
                    image: "/images/Effease/Cover.jpeg",
                    features: [
                        "AI-powered image transformation using Google Gemini 2.5 Flash Image API",
                        "Rich effect library organized by categories",
                        "Google Sign-In integration with Firebase Authentication",
                        "Token-based credit system and user profile management"
                    ],
                    link: ""
                },
                {
                    id: 2,
                    title: "Beauty Center App",
                    description: "A modern mobile app for booking beauty services and managing appointments, built with React Native & Expo.",
                    tags: ["React Native", "Expo", "TypeScript", "Push Notifications"],
                    image: "/images/BeautyCenter/Cover.png",
                    features: [
                        "Discover beauty centers with detailed information and reviews",
                        "Book appointments with real-time availability for services and staff",
                        "Rate and review completed appointments with photo uploads",
                        "Push notifications for reminders and updates"
                    ],
                    link: "https://github.com/hsemihaktas/BeautyCenterApp"
                },
                {
                    id: 3,
                    title: "Encrypt Diary",
                    description: "A secure note taking app with AES encryption, built using React Native & Expo.",
                    tags: ["React Native", "Expo", "expo-crypto", "AES"],
                    image: "/images/EncryptDiary/Cover.png",
                    features: [
                        "Stores personal notes securely with AES based encryption",
                        "Add, read, update, and delete notes easily",
                        "Encryption powered by expo-crypto, accessible only with the correct key",
                        "Minimal and user-friendly interface design"
                    ],
                    link: "https://github.com/hsemihaktas/EncryptDiary"
                },
                {
                    id: 4,
                    title: "Word Application - Lexicon",
                    description: "A mobile app for word translation, synonyms, and interactive learning.",
                    tags: ["React Native", "Expo", "MyMemory API", "Datamuse API"],
                    image: "/images/Lexicon/Cover.png",
                    features: [
                        "Word translation and synonym display (with MyMemory & Datamuse API)",
                        "Add/remove favorites and interactive word learning with game mode",
                        "State management with Context API",
                        "Modern interface with Material Icons"
                    ],
                    link: "https://github.com/hsemihaktas/Lexicon-WordApplication"
                },
                {
                    id: 5,
                    title: "FaceRateMax Website",
                    description: "A website for the FaceRateMax app, showcasing its features and providing information for mobile users.",
                    tags: ["Next.js", "TailwindCSS", "TypeScript"],
                    image: "/images/FaceRateMaxWebsite/Cover.png",
                    features: [
                        "Showcases the FaceRateMax AI-powered face analysis application",
                        "Built with Next.js and TailwindCSS for a modern and responsive design",
                        "Provides information about the app, exclusively available on mobile devices"
                    ],
                    link: "https://face-rate-max.vercel.app/"
                },
                {
                    id: 6,
                    title: "Task Flow - Task Management App",
                    description: "A modern and secure task management system built with Next.js, Supabase, and TypeScript.",
                    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "TailwindCSS"],
                    image: "/images/TaskFlow/Cover.png",
                    features: [
                        "Role-based organization structure (Owner, Admin, Member)",
                        "Interactive Kanban board with drag-and-drop task management",
                        "Real-time updates through optimized polling",
                        "Clean, responsive, and user-friendly UI design"
                    ],
                    link: "https://demo-taskflow.vercel.app/"
                },
                {
                    id: 7,
                    title: "E-Commerce Website",
                    description: "A full-stack e-commerce platform with Next.js and Firebase, allowing users to create stores, manage products, and track orders.",
                    tags: ["Next.js", "TypeScript", "Firebase", "Firestore", "TailwindCSS"],
                    image: "/images/E-Commerce/Cover.png",
                    features: [
                        "Multi-vendor e-commerce platform to create your own store",
                        "Real-time analytics, product management, and order tracking",
                        "Real-time inventory tracking and low stock alerts",
                        "Phone number formatting for Turkish users"
                    ],
                    link: "https://demo-e-ticaret.vercel.app/"
                },
                {
                    id: 8,
                    title: "IMDB Series Tierlist",
                    description: "A web app for ranking TV series with drag-and-drop functionality and data fetched via Python scraper.",
                    tags: ["ReactJS", "TailwindCSS", "Python", "Web Scraping"],
                    image: "/images/IMDBTierlist/Cover.jpeg",
                    features: [
                        "Web application to rank TV series based on IMDB ratings",
                        "Drag and drop functionality for creating tier lists",
                        "Data fetched using Python script based scraper for IMDB series",
                        "Responsive interface with React.js and TailwindCSS"
                    ],
                    link: "https://imdb-series-tierlist.vercel.app/"
                },
                {
                    id: 9,
                    title: "Gaming Website",
                    description: "A front-end focused gaming website built with Next.js to demonstrate design and development skills using mock data.",
                    tags: ["Next.js", "ReactJS", "TailwindCSS", "TypeScript"],
                    image: "/images/GamingWebsite/Cover.png",
                    features: [
                        "Dynamic game pages with story, gameplay, and features",
                        "Fully responsive design optimized for desktop and mobile devices",
                        "Interactive UI with hover effects and animations",
                        "Dynamic routing and SSR with Next.js"
                    ],
                    link: "https://hgamepulse.vercel.app/"
                },
                {
                    id: 10,
                    title: "Property Website",
                    description: "A platform for managing property listings with secure authentication, built using React, Node.js, and MySQL.",
                    tags: ["ReactJS", "NodeJS", "MySQL", "TailwindCSS"],
                    image: "/images/Estate/Cover.png",
                    features: [
                        "Full stack web application with React.js, Node.js, and MySQL",
                        "Listing management through CRUD operations",
                        "Secure user authentication system",
                        "Comprehensive property details and user-friendly interface"
                    ],
                    link: "https://github.com/hsemihaktas/EstateWebsite"
                },
                {
                    id: 11,
                    title: "Birthday Organization Website",
                    description: "A birthday party organization website with online reservation and contact form via EmailJS.",
                    tags: ["Next.js", "EmailJS", "TailwindCSS"],
                    image: "/images/Organization/Cover.jpeg",
                    features: [
                        "Vibrant and user friendly website for birthday party planning",
                        "EmailJS integration for seamless contact form functionality",
                        "Customized birthday packages",
                        "Online reservation features"
                    ],
                    link: "https://birthday-organization.vercel.app/"
                },
                {
                    id: 12,
                    title: "Blurface - Photo Blurring",
                    description: "An AI-powered application for face blurring in images and videos, built with Python and OpenCV.",
                    tags: ["Django", "Python", "OpenCV", "AI"],
                    image: "/images/BlurFace/Cover.png",
                    features: [
                        "AI-powered face blurring for privacy protection",
                        "Real-time face detection and blurring",
                        "Supports both image and video processing",
                        "User-friendly interface for selecting blur intensity and regions"
                    ],
                    link: "https://github.com/hsemihaktas/BlurryFace"
                }
            ]
        },
        settings: {
            title: "System Settings",
            language: "Language",
            wallpaper: "Wallpaper",
            appearance: "Appearance"
        },
        contact: {
            title: "Mail",
            to: "To",
            subject: "Subject",
            placeholder: "Write your message here...",
            send: "Send",
            sentTitle: "Ready to Send!",
            sentDesc: "You can send the message via your mail application.",
            inbox: "Inbox",
            sent: "Sent",
            drafts: "Drafts",
            trash: "Trash"
        },
        notes: [
            {
                title: "Future Plans",
                date: "Sept 21, 2024",
                content: "I need to design a new portfolio.\\n\\n- macOS Sequoia aesthetic\\n- Gemini AI assistant\\n- Apple-like animations"
            }
        ]
    }
};
