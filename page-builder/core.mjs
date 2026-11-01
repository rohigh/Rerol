export const phone = "+91 91766 42399";
export const phoneHref = "tel:+919176642399";
export const whatsappHref = "https://wa.me/919176642399?text=Hi%20Rerol%2C%20I%27d%20like%20today%27s%20rate.%20Product%3A%20___%20Quantity%3A%20___%20Delivery%20location%3A%20___";

const navItems = [
  ["home","Home","/"],
  ["about","About Rerol","/about/"],
  ["products","Products","/products/"],
  ["industries","Industries Served","/industries/"],
  ["collection","Used Oil Collection","/services/used-oil-collection/"],
  ["quality","Quality &amp; Testing","/services/testing-and-documentation/"],
  ["contact","Contact / Request Quote","/contact/"],
];

const linkMarkup = (active) => navItems
  .map(([key, label, href]) => `<a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a>`)
  .join("\n");

export function card(index, title, text, href = "", label = "Learn more") {
  return `<article class="card">
    <span class="card__index">${index}</span>
    <h3>${title}</h3>
    <p>${text}</p>
    ${href ? `<a class="card__link" href="${href}">${label} <span aria-hidden="true">↗</span></a>` : ""}
  </article>`;
}

export function featureCard({ image, eyebrow, title, text, href, label = "Explore" }) {
  return `<article class="card card--feature" style="background-image:url('${image}')">
    <span class="card__index">${eyebrow}</span>
    <h3>${title}</h3>
    <p>${text}</p>
    <a class="card__link" href="${href}">${label} <span aria-hidden="true">↗</span></a>
  </article>`;
}

export function heading(eyebrow, title, text = "") {
  return `<header class="section-heading">
    <div>
      <p class="eyebrow">${eyebrow}</p>
      <h2>${title}</h2>
    </div>
    ${text ? `<div><p>${text}</p></div>` : ""}
  </header>`;
}

export function cta(title, text, primaryLabel = "Get a quote", primaryHref = "/contact/", secondaryLabel = "Call sales", secondaryHref = phoneHref) {
  return `<section class="page-section">
    <div class="cta-band">
      <div>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <div class="hero-actions">
        <a class="button button--sky" href="${primaryHref}">${primaryLabel} <span aria-hidden="true">↗</span></a>
        <a class="button button--ghost" href="${secondaryHref}">${secondaryLabel}</a>
      </div>
    </div>
  </section>`;
}

export function table(headers, rows) {
  return `<div class="data-table-wrap">
    <table class="data-table">
      <thead><tr>${headers.map((item) => `<th scope="col">${item}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((item) => `<td>${item}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

export function contactForm() {
  return `<form class="page-form" data-whatsapp-form>
    <label>Name *<input name="name" autocomplete="name" required /></label>
    <label>Company<input name="company" autocomplete="organization" /></label>
    <label>Phone *<input name="phone" type="tel" autocomplete="tel" required /></label>
    <label>What do you need? *
      <select name="requirement" required>
        <option value="">Select a requirement</option>
        <option>Furnace oil</option>
        <option>Light diesel oil (LDO)</option>
        <option>Re-refined base oil</option>
        <option>Sell my used oil</option>
        <option>EPR support</option>
        <option>Cost and supply planning</option>
        <option>Something else</option>
      </select>
    </label>
    <label>Monthly quantity
      <select name="quantity">
        <option value="">Choose a range</option>
        <option>Under 5 KL</option>
        <option>5 to 20 KL</option>
        <option>20 to 50 KL</option>
        <option>Over 50 KL</option>
      </select>
    </label>
    <label>Delivery or pickup location<input name="location" autocomplete="address-level2" /></label>
    <label class="page-form__full">Message<textarea name="message"></textarea></label>
    <button class="button button--orange" type="submit">Continue on WhatsApp <span aria-hidden="true">↗</span></button>
    <p class="page-form__status" data-form-status aria-live="polite">Required fields are marked *</p>
  </form>`;
}

export function articleAside(label = "Discuss your requirement") {
  return `<aside class="article-aside">
    <p class="eyebrow">Rerol sales</p>
    <h3>${label}</h3>
    <p>Share the product, monthly quantity and delivery location. Our team will help you choose the next step.</p>
    <a class="button button--orange" href="${whatsappHref}">WhatsApp today’s rate</a>
  </aside>`;
}

function header(active) {
  return `<header class="inner-header">
    <a class="inner-brand" href="/" aria-label="Rerol Refinery home">
      <img src="/assets/rerol-logo.png" alt="" width="40" height="40" />
      <span>Rerol Refinery</span>
    </a>
    <nav class="inner-nav" aria-label="Primary navigation">${linkMarkup(active)}</nav>
    <div class="inner-header__actions">
      <a class="quote-link" href="/contact/">Get a quote</a>
      <details class="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <nav class="mobile-nav__panel" aria-label="Mobile navigation">${linkMarkup(active)}</nav>
      </details>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="inner-footer">
    <div class="inner-footer__top">
      <div class="inner-footer__brand">
        <img src="/assets/rerol-logo-footer.png" alt="" width="56" height="56" />
        <p>Smarter cost planning, responsive service and dependable oil supply.</p>
      </div>
      <nav class="footer-column" aria-label="Company links">
        <strong>Company</strong>
        <a href="/about/">About</a>
        <a href="/industries/">Industries</a>
        <a href="/blog/">Blog</a>
        <a href="/gallery/">Gallery</a>
        <a href="/faq/">FAQs</a>
      </nav>
      <nav class="footer-column" aria-label="Product links">
        <strong>Products</strong>
        <a href="/products/furnace-oil/">Furnace oil</a>
        <a href="/products/light-diesel-oil/">LDO</a>
        <a href="/products/re-refined-base-oil/">Base oil</a>
        <a href="/services/used-oil-collection/">Used oil collection</a>
      </nav>
      <div class="footer-column">
        <strong>Chennai office</strong>
        <span>106, Santhome High Road</span>
        <span>Chennai 600028</span>
        <a href="${phoneHref}">${phone}</a>
        <span>24×7 for urgent supply</span>
      </div>
    </div>
    <div class="inner-footer__bottom">
      <span>© <span data-current-year></span> Rerol Refinery Private Limited</span>
      <a href="/contact/">Contact our team <span aria-hidden="true">↗</span></a>
    </div>
    <nav class="mobile-contact-bar" aria-label="Quick contact">
      <a href="${phoneHref}">Call now</a>
      <a href="${whatsappHref}">WhatsApp</a>
    </nav>
  </footer>`;
}

export function renderPage(page) {
  const heroImage = page.heroImage || "/assets/hero-refinery-dusk.jpg";
  const canonicalPath = page.path === "" ? "/" : `/${page.path}/`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${page.description}" />
    <title>${page.title}</title>
    <link rel="canonical" href="https://rerolrefinery.com${canonicalPath}" />
    <link rel="icon" type="image/png" href="/assets/rerol-logo.png" />
    <link rel="prefetch" href="/" />
    <link rel="prefetch" as="image" href="/assets/hero-refinery-dusk.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/pages.css?v=7" />
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    ${header(page.active)}
    <main class="page-main" id="main-content">
      <section class="page-hero" style="--hero-image:url('${heroImage}')">
        <div class="page-hero__dots" aria-hidden="true"></div>
        <div class="page-hero__inner">
          <p class="eyebrow">${page.kicker}</p>
          <h1>${page.headline}</h1>
          <div class="page-hero__lower">
            <p>${page.intro}</p>
            <div class="hero-actions">
              <a class="button button--sky" href="${page.primaryHref || "/contact/"}">${page.primaryLabel || "Get a quote"} <span aria-hidden="true">↗</span></a>
              <a class="button button--ghost" href="${page.secondaryHref || phoneHref}">${page.secondaryLabel || "Call sales"}</a>
            </div>
          </div>
        </div>
      </section>
      ${page.body}
    </main>
    ${footer()}
    <script src="/pages.js?v=1" defer></script>
  </body>
</html>`;
}
