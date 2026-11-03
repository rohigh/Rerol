(() => {
  const key = "rerol-analytics-preference";
  const measurementId = "G-61WBSGCH0W";
  let enabled = false;
  let panel;
  const readPreference = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = value => { try { localStorage.setItem(key, value); } catch {} };
  const enableAnalytics = () => {
    if (!["rerolrefinery.com", "www.rerolrefinery.com"].includes(location.hostname)) return;
    if (enabled) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      page_location: location.origin + location.pathname,
      page_referrer: document.referrer ? new URL(document.referrer).origin + new URL(document.referrer).pathname : "",
      allow_google_signals: false, allow_ad_personalization_signals: false,
      send_page_view: true
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);
  };
  const disableAnalytics = () => {
    window["ga-disable-" + measurementId] = true;
    if (window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of [location.hostname, "." + location.hostname, ".rerolrefinery.com"]) {
        document.cookie = name + "=; Max-Age=0; path=/; domain=" + domain;
      }
      document.cookie = name + "=; Max-Age=0; path=/";
    }
  };
  const showPreferences = () => {
    if (panel) { panel.querySelector("button").focus(); return; }
    panel = document.createElement("section");
    panel.className = "analytics-choice";
    panel.setAttribute("aria-label", "Analytics preferences");
    panel.innerHTML = '<h2>Optional analytics</h2><p>May we use Google Analytics to understand visits? Enquiry form details are not sent to Analytics. <a href="/privacy-policy/">Privacy notice</a></p><div class="analytics-choice__actions"><button type="button" data-choice="essential">Essential only</button><button type="button" data-choice="allow">Allow analytics</button></div>';
    panel.addEventListener("click", event => {
      const button = event.target.closest("[data-choice]");
      if (!button) return;
      savePreference(button.dataset.choice);
      if (button.dataset.choice === "allow") {
        window["ga-disable-" + measurementId] = false;
        if (enabled && window.gtag) window.gtag("consent", "update", { analytics_storage: "granted" });
        enableAnalytics();
      } else disableAnalytics();
      panel.remove();
      panel = null;
    });
    document.body.appendChild(panel);
  };
  document.querySelectorAll("[data-analytics-preferences]").forEach(button => button.addEventListener("click", showPreferences));
  const choice = readPreference();
  if (choice === "allow") enableAnalytics();
  else if (!choice) showPreferences();
  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!enabled || window["ga-disable-" + measurementId] || !link) return;
    if (link.href.startsWith("tel:")) window.gtag("event", "click_to_call");
    else if (link.href.startsWith("https://wa.me/")) window.gtag("event", "click_whatsapp");
  });
})();
