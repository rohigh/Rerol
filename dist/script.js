window.requestAnimationFrame(() => {
  document.documentElement.classList.add("hero-ready");
});

(() => {
  const loadPatternWaves = () => {
    const start = () => {
      import("./pattern-waves.js").catch(() => {
        const layer = document.querySelector("[data-pattern-waves]");
        if (layer) layer.dataset.patternWaves = "unsupported";
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(start, { timeout: 900 });
    } else {
      window.setTimeout(start, 180);
    }
  };

  if (document.readyState === "complete") loadPatternWaves();
  else window.addEventListener("load", loadPatternWaves, { once: true });
})();

(() => {
  const showcase = document.querySelector("[data-why-showcase]");
  if (!showcase) return;

  const tabs = [...showcase.querySelectorAll("[data-why-tab]")];
  const panels = [...showcase.querySelectorAll("[data-why-panel]")];
  const images = [...showcase.querySelectorAll("[data-why-image]")];
  const previous = showcase.querySelector("[data-why-previous]");
  const next = showcase.querySelector("[data-why-next]");
  const counter = showcase.querySelector("[data-why-current]");
  let activeIndex = 0;

  const setActive = (nextIndex, { focus = false } = {}) => {
    const total = tabs.length;
    activeIndex = (nextIndex + total) % total;

    tabs.forEach((tab, index) => {
      const active = index === activeIndex;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    panels.forEach((panel, index) => {
      const active = index === activeIndex;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", String(!active));
    });

    images.forEach((image, index) => {
      const active = index === activeIndex;
      image.classList.toggle("is-active", active);
      image.setAttribute("aria-hidden", String(!active));
    });

    counter.textContent = String(activeIndex + 1).padStart(2, "0");
    if (focus) tabs[activeIndex].focus({ preventScroll: true });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setActive(index));
    tab.addEventListener("keydown", (event) => {
      const keyActions = {
        ArrowLeft: activeIndex - 1,
        ArrowRight: activeIndex + 1,
        Home: 0,
        End: tabs.length - 1,
      };

      if (!(event.key in keyActions)) return;
      event.preventDefault();
      setActive(keyActions[event.key], { focus: true });
    });
  });

  previous.addEventListener("click", () => setActive(activeIndex - 1));
  next.addEventListener("click", () => setActive(activeIndex + 1));
})();

(() => {
  const section = document.querySelector("[data-process-journey]");
  if (!section) return;

  const stage = section.querySelector(".process-journey__stage");
  const desktopClip = section.querySelector("[data-process-clip]");
  const steps = section.querySelectorAll("[data-process-step]");
  const counter = section.querySelector("[data-process-counter]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 901px)");
  let activeIndex = -1;
  let ticking = false;

  const clamp = (value) => Math.min(1, Math.max(0, value));

  const setActive = (nextIndex) => {
    if (nextIndex === activeIndex) return;
    activeIndex = nextIndex;

    for (let index = 0; index < steps.length; index += 1) {
      const step = steps[index];
      const isActive = index === activeIndex;
      step.classList.toggle("is-active", isActive);
      step.classList.toggle("is-complete", index < activeIndex);

      if (isActive) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    }

    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 04`;
  };

  const update = () => {
    ticking = false;

    let progress;
      if (desktop.matches) {
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        progress = clamp(-rect.top / distance);
      } else {
        const rect = stage.getBoundingClientRect();
        const start = window.innerHeight * 0.72;
        const end = window.innerHeight * 0.28;
        progress = clamp((start - rect.top) / (rect.height + start - end));
      }
    section.style.setProperty("--process-progress", progress.toFixed(4));
    desktopClip.setAttribute("width", String(1200 * progress));
    setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener("change", requestUpdate);
  desktop.addEventListener("change", requestUpdate);
})();

(() => {
  const section = document.querySelector("[data-card-stack]");
  if (!section) return;

  const stack = section.querySelector("[data-stack-list]");
  const cards = [...section.querySelectorAll("[data-stack-card]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 700px)");
  let ticking = false;

  const update = () => {
    ticking = false;

    if (reducedMotion.matches || mobile.matches) {
      for (let index = 0; index < cards.length; index += 1) {
        cards[index].style.setProperty("--stack-scale", "1");
      }
      return;
    }

    const stackTop = -stack.getBoundingClientRect().top;
    const viewport = window.innerHeight;
    const cardDistance = viewport * 0.86;

    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index];
      const target = Number(card.dataset.stackTarget);
      const start = index * cardDistance;
      const duration = Math.max(viewport, (cards.length - index - 1) * cardDistance);
      const progress = Math.min(1, Math.max(0, (stackTop - start) / duration));
      const scale = 1 - progress * (1 - target);
      card.style.setProperty("--stack-scale", scale.toFixed(4));
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  const handleChange = () => {
    requestUpdate();
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", handleChange);
  reducedMotion.addEventListener("change", handleChange);
  mobile.addEventListener("change", handleChange);
})();

(() => {
  const faq = document.querySelector("[data-faq]");
  if (!faq) return;

  const items = [...faq.querySelectorAll(".faq-item")];
  const buttons = [...faq.querySelectorAll(".faq-item button")];

  const setOpen = (activeIndex, shouldOpen) => {
    for (let index = 0; index < items.length; index += 1) {
      const open = shouldOpen && index === activeIndex;
      const panel = items[index].querySelector(".faq-answer");
      items[index].classList.toggle("is-open", open);
      buttons[index].setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
    }
  };

  for (let index = 0; index < buttons.length; index += 1) {
    const button = buttons[index];

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      setOpen(index, !isOpen);
    });

    button.addEventListener("keydown", (event) => {
      let nextIndex = -1;

      if (event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowUp") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex < 0) return;

      event.preventDefault();
      buttons[nextIndex].focus();
    });
  }
})();

(() => {
  const particles = document.querySelector("[data-footer-particles]");
  if (!particles) return;

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 28; index += 1) {
    const particle = document.createElement("span");
    particle.className = "footer-particle";
    particle.style.setProperty("--particle-x", `${(index * 37 + 9) % 98}%`);
    particle.style.setProperty("--particle-y", `${(index * 53 + 7) % 92}%`);
    particle.style.setProperty("--particle-size", `${1 + (index % 3)}px`);
    particle.style.setProperty("--particle-opacity", `${0.2 + (index % 5) * 0.1}`);
    particle.style.setProperty("--particle-duration", `${5 + (index % 6)}s`);
    particle.style.setProperty("--particle-delay", `${-(index % 7)}s`);
    fragment.appendChild(particle);
  }

  particles.appendChild(fragment);
})();

(() => {
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector("[data-quote-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("is-error", "is-success");

    if (!form.checkValidity()) {
      status.textContent = "Please fill in your name, phone and what you need.";
      status.classList.add("is-error");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const lines = [
      "Hi Rerol, I'd like to send an enquiry.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Requirement: ${data.get("requirement")}`,
      `Monthly quantity: ${data.get("quantity") || "Not specified"}`,
      `Location: ${data.get("location") || "Not specified"}`,
      `Message: ${data.get("message") || "No additional message"}`,
    ];
    const url = `https://wa.me/919176642399?text=${encodeURIComponent(lines.join("\n"))}`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.click();

    status.textContent = "Your WhatsApp enquiry is ready to send.";
    status.classList.add("is-success");
  });
})();
