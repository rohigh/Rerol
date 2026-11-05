const yearTarget = document.querySelector("[data-current-year]");
if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());

document.querySelectorAll(".mobile-nav__panel a").forEach((link) => {
  link.addEventListener("click", () => {
    const details = link.closest(".mobile-nav");
    if (details) details.open = false;
  });
});
