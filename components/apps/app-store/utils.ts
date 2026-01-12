export const handleStoreRedirect = (app: any) => {
  if (!app) return;

  const isAndroid = /Android/i.test(navigator.userAgent);
  const targetUrl = isAndroid ? app.playStoreUrl : app.appStoreUrl;

  if (targetUrl && targetUrl !== "#") {
    window.open(targetUrl, "_blank");
  } else {
    alert("Store link not available yet!");
  }
};
