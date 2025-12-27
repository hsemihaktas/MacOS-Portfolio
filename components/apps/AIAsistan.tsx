'use client';


import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Sparkles, WifiOff } from 'lucide-react';
import { Language } from '@/lib/types';
import { DATA } from '@/lib/data';

interface AIAsistanProps {
  lang: Language;
  isWifiEnabled: boolean;
  isDarkMode?: boolean;
}

const AIAsistan: React.FC<AIAsistanProps> = ({ lang, isWifiEnabled, isDarkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cvContent, setCvContent] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const d = DATA[lang].about;
  const p = DATA[lang].projects.items;

  // Fetch CV content on mount
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await fetch('/api/cv');
        const data = await response.json();
        if (data.success) {
          setCvContent(data.text);
        }
      } catch (error) {
        console.error('Failed to fetch CV:', error);
      }
    };
    fetchCV();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isWifiEnabled) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const systemPrompt = `Sen Hasan Semih Aktaş'ın portfolyosundaki Siri asistanısın. 
      
      KİŞİSEL BİLGİLER:
      - İsim: Hasan Semih Aktaş
      - Rol: ${d.role}
      - Konum: İstanbul, Türkiye
      - Email: hsemihaktas@outlook.com.tr
      - LinkedIn: linkedin.com/in/hsemihaktas
      - Portfolio: hsemihaktas.vercel.app
      
      EĞİTİM:
      - İstanbul Medeniyet Üniversitesi, Bilgisayar Mühendisliği (Ekim 2019 - Haziran 2023)
      
      DENEYİM:
      - Strajedi - Yazılım Geliştirici Stajyeri (Temmuz 2023 - Ağustos 2023): React.js ile responsive UI'lar, DOM optimizasyonu, SASS/SCSS, component-driven architecture
      - hub.studio - Frontend Geliştirici Stajyeri (Temmuz 2022 - Ağustos 2022): React.js, Redux, Tailwind CSS, RESTful API entegrasyonu
      
      YETENEKLER:
      - Frontend: React.js, React Native, Redux, Tailwind CSS, SASS/SCSS, HTML5, CSS3
      - Backend: Node.js, REST APIs
      - Araçlar: Git, Agile/Scrum
      - Diller: Türkçe (ana dil), İngilizce (B2)
      
      SERTİFİKALAR:
      - Applied React.js, Redux Training (2023), Frontend Web Development, Java Programming, English Certificate (B2)
      
      PROJELER: ${p.map(x => x.title).join(', ')}
      
      KURALLAR: 
      1. Sadece düz metin kullan, markdown veya özel karakterler kullanma
      2. Kısa, cana yakın ve profesyonel konuş
      3. Hasan Semih hakkında sorulara yukarıdaki bilgilerle cevap ver
      4. Bilmediğin bir şey sorulursa dürüstçe söyle`;
      const result = await model.generateContent([systemPrompt, userMsg]);
      const response = await result.response;
      const aiText = response.text() || (lang === 'tr' ? 'Şu an yanıt veremiyorum.' : 'I cannot respond right now.');
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'tr' ? 'Bağlantı hatası.' : 'Connection error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const appBg = isDarkMode ? 'bg-[#121212]' : 'bg-[#FBFBFE]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textSecondary = isDarkMode ? 'text-white/40' : 'text-black/40';

  // Çevrimdışı Durumu - Uygulamanın tamamını kapatır
  if (!isWifiEnabled) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500 ${appBg}`}>
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} shadow-2xl`}>
          <WifiOff size={56} className={textSecondary} />
        </div>
        <h2 className={`text-2xl font-black tracking-tight mb-4 ${textColor}`}>
          {lang === 'tr' ? 'İnternet Bağlantısı Yok' : 'No Internet Connection'}
        </h2>
        <p className={`text-[15px] font-medium max-w-sm leading-relaxed ${textSecondary}`}>
          {lang === 'tr'
            ? 'Siri Intelligence için aktif bir Wi-Fi bağlantısı gereklidir. Lütfen denetim merkezinden bağlantıyı açın.'
            : 'Siri Intelligence requires an active Wi-Fi connection. Please enable Wi-Fi in the control center.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col font-sans overflow-hidden ${appBg}`}>
      <div className="h-28 bg-[#050505] relative flex flex-col items-center justify-center shrink-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center mb-1.5 border border-white/20 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-500 animate-spin duration-[3000ms] opacity-80"></div>
            <div className="absolute w-4 h-4 bg-white rounded-full blur-[2px]"></div>
          </div>
          <h2 className="text-white text-[11px] font-black tracking-[0.4em] uppercase opacity-70">Siri Intelligence</h2>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-5 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-12">
            <Sparkles className="mb-4 text-blue-500" size={32} />
            <p className={`text-[15px] font-bold leading-relaxed italic ${textColor}`}>
              {lang === 'tr' ? "Size nasıl yardımcı olabilirim?" : "How can I help you?"}
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[14px] font-medium shadow-sm animate-in fade-in slide-in-from-bottom-2 ${msg.role === 'user'
              ? 'bg-[#007AFF] text-white rounded-tr-none'
              : isDarkMode ? 'bg-[#1E1E1E] text-white border border-white/5 rounded-tl-none' : 'bg-white text-black border border-black/[0.05] rounded-tl-none'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm`}>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 border-t pb-10 ${isDarkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-black/[0.05]'}`}>
        <form onSubmit={handleSend} className={`max-w-xl mx-auto flex items-center gap-2 rounded-2xl p-1.5 border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F2F2F7] border-black/[0.05]'}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'tr' ? "Siri'ye bir şey sor..." : "Ask Siri anything..."}
            className={`flex-1 bg-transparent px-3 py-2 text-[15px] outline-none font-semibold ${isDarkMode ? 'text-white placeholder:text-white/20' : 'text-black/80 placeholder:text-black/20'}`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-[#007AFF] text-white rounded-xl flex items-center justify-center disabled:opacity-30 shadow-lg active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAsistan;
