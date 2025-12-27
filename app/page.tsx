'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import MenuBar from '@/components/MenuBar';
import Desktop from '@/components/Desktop';
import Dock from '@/components/Dock';
import Window from '@/components/Window';
import Spotlight from '@/components/Spotlight';
import ControlCenter from '@/components/ControlCenter';

import AboutApp from '@/components/apps/About';
import ProjectsApp from '@/components/apps/Projects';
import SkillsApp from '@/components/apps/Skills';
import ContactApp from '@/components/apps/Contact';
import SettingsApp from '@/components/apps/Settings';
import ActivityMonitorApp from '@/components/apps/ActivityMonitor';
import { WindowState, AppID, Language } from '@/lib/types';
import { INITIAL_Z_INDEX, APPS } from '@/lib/constants';
import { DATA } from '@/lib/data';
import { WifiOff } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<Language>('tr');
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  const [isDarkMode, setDarkMode] = useState(false);
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [brightness, setBrightness] = useState(100);

  const [width, setWidth] = useState<number | null>(null);
  const isMobile = width ? width < 768 : false; // Default to desktop (false) for initial render to match server
  const isTablet = width ? width >= 768 && width < 1024 : false;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [windows, setWindows] = useState<WindowState[]>(
    APPS.map(app => ({
      id: app.id as AppID,
      title: app.title,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: INITIAL_Z_INDEX,
      params: null
    }))
  );

  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [topZ, setTopZ] = useState(INITIAL_Z_INDEX + 1);
  const [wallpaper, setWallpaper] = useState("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop");

  const getAppTitle = useCallback((id: AppID): string => {
    const appMap: Record<AppID, string> = {
      'about': DATA[lang].apps.about,
      'projects': DATA[lang].apps.projects,
      'skills': DATA[lang].apps.skills,
      'settings': DATA[lang].apps.settings,
      'contact': DATA[lang].apps.contact,
      'activity-monitor': DATA[lang].apps.system
    };
    return appMap[id] || id;
  }, [lang]);

  const openWindow = useCallback((id: AppID, params?: any) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          isOpen: true,
          isMinimized: false,
          zIndex: topZ + 1,
          params: params || null
        };
      }
      return w;
    }));
    setTopZ(prev => prev + 2);
    setActiveApp(id);

    setIsSpotlightOpen(false);
    setIsControlCenterOpen(false);
  }, [topZ]);

  const closeWindow = useCallback((id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, params: null } : w));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const minimizeWindow = useCallback((id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const focusWindow = useCallback((id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: topZ + 1 } : w));
    setTopZ(prev => prev + 1);
    setActiveApp(id);
  }, [topZ]);

  const toggleMaximize = useCallback((id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const renderAppContent = (win: WindowState) => {
    switch (win.id) {
      case 'about': return <AboutApp lang={lang} isDarkMode={isDarkMode} />;
      case 'projects': return <ProjectsApp lang={lang} isDarkMode={isDarkMode} initialFilter={win.params?.filterTag} initialProjectId={win.params?.projectId} />;
      case 'skills': return <SkillsApp lang={lang} isDarkMode={isDarkMode} />;
      case 'contact': return <ContactApp lang={lang} isDarkMode={isDarkMode} />;
      case 'settings':
        return (
          <SettingsApp
            lang={lang}
            setLang={setLang}
            isDarkMode={isDarkMode}
            setDarkMode={setDarkMode}
            brightness={brightness}
            setBrightness={setBrightness}
            isWifiEnabled={isWifiEnabled}
            setIsWifiEnabled={setIsWifiEnabled}
          />
        );
      case 'activity-monitor': return <ActivityMonitorApp lang={lang} isDarkMode={isDarkMode} />;
      default: return null;
    }
  };

  const currentActiveTitle = useMemo(() => {
    if (!activeApp) return DATA[lang].menu.finder;
    return getAppTitle(activeApp);
  }, [activeApp, lang, getAppTitle]);

  return (
    <div
      className={`w-full h-full relative flex flex-col overflow-hidden no-select transition-all duration-700`}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000'
      }}
    >
      <div
        className="fixed inset-0 bg-black pointer-events-none z-[10020] transition-opacity duration-300"
        style={{ opacity: (1 - brightness / 100) * 0.65 }}
      ></div>

      {isControlCenterOpen && !isMobile && (
        <div
          className="fixed inset-0 z-[10005]"
          onClick={() => setIsControlCenterOpen(false)}
        />
      )}

      <MenuBar
        lang={lang}
        isMobile={isMobile}
        isTablet={isTablet}
        isWifiEnabled={isWifiEnabled}
        isDarkMode={isDarkMode}
        activeAppTitle={currentActiveTitle}
        onSearchClick={() => setIsSpotlightOpen(true)}
        onControlClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
      />

      {!isWifiEnabled ? (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl animate-in fade-in duration-500 p-8">
          <div className="flex flex-col items-center text-center max-w-sm">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20">
              <WifiOff size={40} className="text-white/40" />
            </div>
            <h2 className="text-white text-2xl font-black mb-4 tracking-tight">
              {lang === 'tr' ? 'Bağlantı Kesildi' : 'Connection Lost'}
            </h2>
            <p className="text-white/50 text-[15px] font-medium leading-relaxed mb-10">
              {lang === 'tr'
                ? 'Sistem özelliklerine erişmek için lütfen denetim masasından Wi-Fi özelliğini etkinleştirin.'
                : 'Please enable Wi-Fi in the control center to access system features.'}
            </p>
            <button
              onClick={() => setIsWifiEnabled(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-3.5 rounded-full font-black text-[15px] shadow-2xl transition-all active:scale-95"
            >
              {lang === 'tr' ? 'Hızlı Bağlan' : 'Quick Connect'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <Desktop
            onIconClick={openWindow}
            isMobile={isMobile}
            isTablet={isTablet}
            lang={lang}
            getAppTitle={getAppTitle}
          />
          <div className="absolute inset-0 pointer-events-none z-40">
            {windows.map((win) => win.isOpen && !win.isMinimized && (
              <div key={win.id} className="pointer-events-auto contents">
                <Window
                  window={{ ...win, title: getAppTitle(win.id) }}
                  lang={lang}
                  isMobile={isMobile || isTablet}
                  isDarkMode={isDarkMode}
                  onClose={() => closeWindow(win.id)}
                  onMinimize={() => minimizeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                  onMaximize={() => toggleMaximize(win.id)}
                >
                  {renderAppContent(win)}
                </Window>
              </div>
            ))}
          </div>
        </>
      )}


      <Spotlight isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} onSelectApp={openWindow} lang={lang} />

      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        lang={lang} setLang={setLang}
        isDarkMode={isDarkMode} setDarkMode={setDarkMode}
        isWifiEnabled={isWifiEnabled} setIsWifiEnabled={setIsWifiEnabled}
        brightness={brightness} setBrightness={setBrightness}
        isMobile={isMobile}
      />

      <Dock
        onAppClick={openWindow}
        activeApp={activeApp}
        windows={windows}
        isMobile={isMobile}
        isTablet={isTablet}

        lang={lang}
        getAppTitle={getAppTitle}
      />

      <div className="absolute inset-0 glossy-reflection z-[50]"></div>
    </div>
  );
}
