import { readFileSync } from 'node:fs';
import { enquiryAccessKey, captureEnabled } from './enquiries.mjs';
const responsiveImages = JSON.parse(readFileSync(new URL('../dist/assets/responsive-images.json', import.meta.url), 'utf8'));
export const origin = "https://rerolrefinery.com";
export const verification = "jzJ5uVwFka5NfSJA4w-tgWqlqWCULB3LrJ0dDtIQHaI";
export const analyticsId = "G-GN2M85TE4F";
export const adsId = "AW-18532404050";
export const escapeHtml = value => String(value).replaceAll("&amp;", "&").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const labels = {
  about: "About", products: "Products", services: "Services", industries: "Industries Served",
  blog: "Blog", gallery: "Gallery", contact: "Contact", faq: "FAQs", "privacy-policy": "Privacy notice",
  "furnace-oil": "Furnace oil", "light-diesel-oil": "Light diesel oil", "re-refined-base-oil": "Re-refined base oil",
  "distilled-fuel-oil": "Distilled fuel oil", "used-oil-collection": "Used Oil Collection",
  "testing-and-documentation": "Quality and Testing", "epr-support": "EPR support",
  "cost-and-supply-planning": "Cost and supply planning", "delivery-and-logistics": "Delivery and logistics"
};
export function breadcrumbItems(page) {
  const parts = page.path.split("/").filter(Boolean);
  return [{ name: "Home", url: "/" }, ...parts.map((part, i) => ({
    name: labels[part] || page.title.split("|")[0].trim(),
    url: "/" + parts.slice(0, i + 1).join("/") + "/"
  }))];
}
export function breadcrumbs(page) {
  if (!page.path || page.noindex) return "";
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${breadcrumbItems(page).map((item, i, all) =>
    `<li>${i === all.length - 1 ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${item.url}">${escapeHtml(item.name)}</a>`}</li>`
  ).join("")}</ol></nav>`;
}
export function metadataHead(page) {
  const url = origin + (page.path ? "/" + page.path + "/" : "/");
  const organization = {
    "@type": "Organization", "@id": origin + "/#organization",
    name: "Rerol Refinery Private Limited", alternateName: "Rerol Refinery",
    url: origin + "/", logo: origin + "/assets/rerol-logo.png",
    telephone: "+91-91766-42399", email: "rerolrefinery@gmail.com",
    address: { "@type": "PostalAddress", streetAddress: "106, Santhome High Road", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "600028", addressCountry: "IN" },
    sameAs: ["https://www.instagram.com/rerolrefinery/"]
  };
  const graph = [organization, { "@type": "WebSite", "@id": origin + "/#website", name: "Rerol Refinery", url: origin + "/", publisher: { "@id": organization["@id"] } },
    { "@type": "WebPage", "@id": url + "#webpage", url, name: page.title, description: page.description, isPartOf: { "@id": origin + "/#website" }, about: { "@id": organization["@id"] } }];
  if (page.path && !page.noindex) graph.push({
    "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
    itemListElement: breadcrumbItems(page).map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: origin + item.url }))
  });
  return `<!-- SEO:start -->
    <meta name="rerol-enquiry-access-key" content="${escapeHtml(enquiryAccessKey)}" />
    <script src="/enquiries.js?v=2" defer></script>
    <script src="/navigation.js?v=1" defer></script>
    ${page.noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${url}" />`}
    <meta name="google-site-verification" content="${verification}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Rerol Refinery" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/assets/social-card.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Rerol Refinery — tested industrial oil supply" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${origin}/assets/social-card.png" />
    <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>
    <link rel="stylesheet" href="/site-common.css?v=7" />
    <script src="/site-common.js?v=4" data-ga-id="${analyticsId}" data-ads-id="${adsId}" defer></script>
    <!-- SEO:end -->`;
}
export function enhanceHtml(html) {
  return html.replace(/(<form\b[^>]*data-(?:quote|whatsapp)-form[^>]*>)(?:<!-- enquiry-fields -->[\s\S]*?<!-- \/enquiry-fields -->)?/g, (_match, formTag) => {
    let tag = captureEnabled ? formTag.replace(/\snovalidate\b/, '') : formTag;
    if (captureEnabled && !/\smethod=/.test(tag)) tag = tag.replace('>', ' method="POST">');
    if (captureEnabled && !/\saction=/.test(tag)) tag = tag.replace('>', ' action="https://api.web3forms.com/submit">');
    const keyField = captureEnabled ? `<input type="hidden" name="access_key" value="${escapeHtml(enquiryAccessKey)}" />` : '';
    return `${tag}<!-- enquiry-fields -->${keyField}<label class="enquiry-honeypot" aria-hidden="true">Leave this field empty<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" /></label><p class="enquiry-disclosure">${captureEnabled ? 'Submitting sends your details to Rerol through Web3Forms. You can then continue on WhatsApp.' : 'Continuing prepares a WhatsApp draft for you to review and send.'} <a href="/privacy-policy/">Privacy notice</a>.</p><!-- /enquiry-fields -->`;
  })
    .replaceAll(/\/assets\/([a-z0-9-]+)\.(jpg|png)(\?[^"'\s)]*)?/g, (match, name, extension, query = "") =>
    name === "social-card" ? match : "/assets/" + name + ".webp" + query)
    .replace(/<img\b[^>]*rerol-logo-footer[^>]*>/g, tag => tag.includes('loading=') ? tag : tag.replace("<img", '<img loading="lazy" decoding="async"'))
    .replace(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*>\s*/g, '')
    .replace('</head>', '<link rel="icon" href="/favicon.ico" sizes="32x32" />\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />\n<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n</head>')
    .replace(/<img\b[^>]*>/g, tag => {
      const stem = tag.match(/src="(?:\.\/|\/)assets\/([a-z0-9-]+)\.webp/)?.[1];
      const image = responsiveImages[stem];
      if (!image) return tag;
      let updated = tag.replace(/\s(?:srcset|sizes|width|height)="[^"]*"/g, '');
      const sizes = stem === 'hero-refinery-dusk' ? '100vw' : '(max-width: 860px) 100vw, (max-width: 1400px) 60vw, 840px';
      return updated.replace('<img', `<img width="${image.width}" height="${image.height}" srcset="${image.variants.map(v => `${v.src} ${v.width}w`).join(', ')}" sizes="${sizes}"`);
    })
    .replaceAll('>Analytics preferences</button>', '>Privacy preferences</button>');
}
