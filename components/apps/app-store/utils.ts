export const handleStoreRedirect = (
  app: {
    appStoreUrl?: string;
    playStoreUrl?: string;
  },
  lang: "tr" | "en" = "tr",
) => {
  if (!app) return;

  const isAndroid =
    typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
  const targetUrl = isAndroid ? app.playStoreUrl : app.appStoreUrl;

  if (targetUrl && targetUrl !== "#") {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  } else {
    alert(
      lang === "tr"
        ? "Mağaza bağlantısı henüz mevcut değil."
        : "Store link is not available yet.",
    );
  }
};
