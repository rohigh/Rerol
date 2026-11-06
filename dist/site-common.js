(() => {
  const desktopHover = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const groups = [...document.querySelectorAll('.primary-nav .nav-group, .inner-nav .nav-group')];
  groups.forEach(group => {
    let closeTimer;
    const cancelClose = () => clearTimeout(closeTimer);
    group.addEventListener('pointerenter', event => {
      if (!desktopHover.matches || event.pointerType !== 'mouse') return;
      cancelClose();
      groups.forEach(other => { if (other !== group) other.open = false; });
      group.open = true;
    });
    group.addEventListener('pointerleave', () => {
      if (!desktopHover.matches) return;
      closeTimer = setTimeout(() => {
        if (!group.contains(document.activeElement)) group.open = false;
      }, 150);
    });
    group.addEventListener('focusin', cancelClose);
    group.addEventListener('focusout', event => {
      if (!group.contains(event.relatedTarget) && !group.matches(':hover')) group.open = false;
    });
    group.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      cancelClose();
      group.open = false;
      group.querySelector('summary').focus();
      event.stopPropagation();
    });
  });
  document.addEventListener('click', event => {
    groups.forEach(group => { if (!group.contains(event.target)) group.open = false; });
  });
  desktopHover.addEventListener('change', () => groups.forEach(group => { group.open = false; }));
})();

(() => {
  const key = "rerol-analytics-preference";
  const tag = document.querySelector("script[data-ga-id]");
  const measurementId = tag?.dataset.gaId;
  const adsId = tag?.dataset.adsId;
  if (!/^G-[A-Z0-9]+$/.test(measurementId || "") || !/^AW-\d+$/.test(adsId || "")) return;
  let enabled = false;
  let adsConfigured = false;
  let panel;
  const readPreference = () => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = value => { try { localStorage.setItem(key, value); } catch {} };
  const consentState = choice => ({
    analytics_storage: choice === "essential" ? "denied" : "granted",
    ad_storage: choice === "all" ? "granted" : "denied",
    ad_user_data: choice === "all" ? "granted" : "denied",
    ad_personalization: choice === "all" ? "granted" : "denied"
  });
  const enableMeasurement = choice => {
    if (!["rerolrefinery.com", "www.rerolrefinery.com"].includes(location.hostname)) return;
    window["ga-disable-" + measurementId] = false;
    if (!enabled) {
      enabled = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag("consent", "default", consentState(choice));
      window.gtag("js", new Date());
      window.gtag("set", {
        page_location: location.origin + location.pathname,
        page_referrer: document.referrer ? new URL(document.referrer).origin + new URL(document.referrer).pathname : ""
      });
      window.gtag("set", "ads_data_redaction", true);
      window.gtag("config", measurementId, {
        allow_google_signals: false, allow_ad_personalization_signals: false, send_page_view: true
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
      document.head.appendChild(script);
    } else window.gtag("consent", "update", consentState(choice));
    if (choice === "all" && !adsConfigured) {
      window.gtag("config", adsId);
      adsConfigured = true;
    }
  };
  const disableMeasurement = () => {
    window["ga-disable-" + measurementId] = true;
    if (window.gtag) window.gtag("consent", "update", consentState("essential"));
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^_ga(?:_|$)|^_gcl_/.test(name)) continue;
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
    panel.setAttribute("aria-label", "Privacy preferences");
    panel.innerHTML = '<h2>Analytics and advertising</h2><p>Choose whether to allow optional analytics and advertising cookies. <a href="/privacy-policy/">Privacy notice</a></p><div class="analytics-choice__actions"><button type="button" data-choice="essential">Essential only</button><button type="button" data-choice="allow">Analytics only</button><button type="button" data-choice="all">Allow all</button></div>';
    panel.addEventListener("click", event => {
      const button = event.target.closest("[data-choice]");
      if (!button) return;
      savePreference(button.dataset.choice);
      if (button.dataset.choice === "essential") disableMeasurement();
      else enableMeasurement(button.dataset.choice);
      panel.remove();
      panel = null;
    });
    document.body.appendChild(panel);
  };
  document.querySelectorAll("[data-analytics-preferences]").forEach(button => button.addEventListener("click", showPreferences));
  const choice = readPreference();
  if (choice === "allow" || choice === "all") enableMeasurement(choice);
  else if (choice !== "essential") showPreferences();
  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!enabled || window["ga-disable-" + measurementId] || !link) return;
    if (link.href.startsWith("tel:")) window.gtag("event", "click_to_call", { send_to: measurementId });
    else if (link.href.startsWith("https://wa.me/")) window.gtag("event", "click_whatsapp", { send_to: measurementId });
  });
})();
