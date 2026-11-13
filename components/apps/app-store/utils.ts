export const handleStoreRedirect = (app: {
  appStoreUrl?: string;
  playStoreUrl?: string;
}) => {
  if (!app) return;

  const isAndroid = /Android/i.test(navigator.userAgent);
  const targetUrl = isAndroid ? app.playStoreUrl : app.appStoreUrl;

  if (targetUrl && targetUrl !== "#") {
    window.open(targetUrl, "_blank");
  } else {
    alert("Store link not available yet!");
  }
};
