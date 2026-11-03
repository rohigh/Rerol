import { articleAside, card, contactForm, cta, featureCard, heading, phoneHref, table, whatsappHref } from "./core.mjs";

export const mainPages = [
  {
    path: "about",
    active: "about",
    title: "About Rerol Refinery | Used Oil Re-Refiner in Tamil Nadu",
    description: "Rerol Refinery is a Chennai-based re-refiner turning used oil into tested furnace oil, LDO and base oil.",
    kicker: "About Rerol",
    headline: "We give used oil a second life, and industry a fuel it can trust.",
    intro: "Rerol Refinery Private Limited is a Chennai-based oil re-refining company founded in 2024. We collect used oil, re-refine it and supply tested industrial fuels and base oil to factories and lubricant makers.",
    heroImage: "/assets/why-plant.jpg",
    primaryLabel: "Visit or request a sample",
    body: `
      <section class="page-section">
        ${heading("Our story", "Built to close the industrial oil loop.", "We started Rerol to bring used oil back into a controlled, documented production cycle and give industrial buyers a more dependable source of fuel and base oil.")}
        <div class="split">
          <div class="split__media"><img src="/assets/hero-refinery-dusk.jpg" alt="Industrial refinery operating at dusk" loading="lazy" decoding="async" width="1200" height="800" /></div>
          <div class="split__copy">
            <p class="eyebrow">Why Rerol</p>
            <h2>A re-refiner, not simply a reseller.</h2>
            <p>Quality and supply become easier to manage when the source is closer to the customer. Rerol combines collection, re-refining, batch testing and industrial delivery under one team.</p>
            <ul class="check-list">
              <li>Every dispatched batch is checked and documented with a Certificate of Analysis.</li>
              <li>Used oil collection and finished oil supply can be coordinated through one team.</li>
              <li>Urgent supply support is available around the clock.</li>
            </ul>
          </div>
        </div>
      </section>
      <section class="page-section page-section--dark">
        ${heading("How we work", "A partner who owns your requirement.", "We help plant and procurement teams choose the right product, plan buying around production and respond quickly when the plan changes.")}
        <div class="card-grid">
          ${card("01", "Personal accountability", "One team follows the requirement from product selection through dispatch and documentation.")}
          ${card("02", "Direct decisions", "You speak with people who can coordinate product, testing and delivery without long approval chains.")}
          ${card("03", "Always available", "Our team is available 24×7 for urgent orders, supply disruptions and production changes.")}
          ${card("04", "Continual review", "As requirements change, we revisit product choice, order quantity and supply timing.")}
          ${card("05", "Quality we can prove", "Claims are supported by batch testing and the COA supplied with each order.")}
          ${card("06", "Compliance first", "Licence copies and supporting records are shared with verified customers on request.")}
        </div>
      </section>
      <section class="page-section page-section--mist">
        ${heading("Purpose", "Clear principles behind every batch.", "Rerol's direction is grounded in circular use, documented quality and practical service for industrial customers.")}
        <div class="editorial-grid">
          ${card("VISION", "Lead through circular practice", "To contribute to India's re-refining industry through responsible recovery and reuse of used oil.")}
          ${card("MISSION", "Turn used oil into useful products", "To produce industrial fuel and base oil under controlled conditions with consistent testing.")}
          ${card("VALUES", "Quality, safety and integrity", "Prove quality, handle oil safely, respond honestly and keep the required paperwork visible.")}
        </div>
      </section>
      ${cta("See the process or test a sample.", "Talk to our team about a plant visit or a product sample for your application.", "Request a sample", "/contact/", "Call our team", phoneHref)}
    `,
  },
  {
    path: "products",
    active: "products",
    title: "Industrial Fuel and Base Oil Products | Rerol Refinery Chennai",
    description: "Furnace oil, LDO and re-refined base oil from a Tamil Nadu re-refiner. Tested every batch with a COA.",
    kicker: "Products",
    headline: "Tested fuel and base oil, made at our own plant.",
    intro: "Every Rerol product leaves the plant as a tested, documented industrial input. Choose the one that fits your process, then share your monthly volume and location for today's rate.",
    heroImage: "/assets/product-furnace.jpg",
    primaryLabel: "Get today’s rate",
    primaryHref: whatsappHref,
    secondaryLabel: "Talk to our team",
    body: `
      <section class="page-section">
        ${heading("Choose by application", "The right oil for the heat, movement or blend.", "Start with the job the oil needs to do. Our team can help match product characteristics to your equipment and operating pattern.")}
        <div class="card-grid">
          ${featureCard({ image: "/assets/product-furnace.jpg", eyebrow: "01 / Industrial fuel", title: "Furnace oil", text: "Steady heat for boilers, furnaces, kilns and thermic fluid heaters.", href: "/products/furnace-oil/", label: "View furnace oil" })}
          ${featureCard({ image: "/assets/product-ldo.jpg", eyebrow: "02 / Industrial fuel", title: "Light diesel oil (LDO)", text: "For burners, heaters and process heating where steady combustion matters.", href: "/products/light-diesel-oil/", label: "View LDO" })}
          ${featureCard({ image: "/assets/product-base-oil.jpg", eyebrow: "03 / Raw material", title: "Re-refined base oil", text: "For lubricant, grease, hydraulic oil and industrial fluid makers.", href: "/products/re-refined-base-oil/", label: "View base oil" })}
          ${featureCard({ image: "/assets/product-furnace.jpg", eyebrow: "04 / Provisional grade", title: "Distilled fuel oil (DFO)", text: "Proposed furnace and burner fuel targets. Laboratory validation pending; confirm classification and permitted end use.", href: "/products/distilled-fuel-oil/", label: "Review DFO targets" })}
        </div>
      </section>
      <section class="page-section page-section--dark">
        ${heading("Quality system", "Every batch checked before dispatch.", "The product name is only the start. The batch result is what your team can verify.")}
        <div class="step-grid">
          <article class="step"><h3>Process</h3><p>Used oil is filtered, dehydrated and re-refined under controlled conditions.</p></article>
          <article class="step"><h3>Test</h3><p>Key product properties are checked before the batch is cleared.</p></article>
          <article class="step"><h3>Document</h3><p>A Certificate of Analysis and GST invoice accompany the order.</p></article>
          <article class="step"><h3>Deliver</h3><p>Tanker or barrel supply is planned around your operating requirement.</p></article>
        </div>
      </section>
      <section class="page-section page-section--mist">
        ${heading("Circular supply", "Need to move used oil out as well?", "Rerol also collects used oil from factories, workshops, fleets and industrial operators with the required pickup documentation.")}
        <a class="button button--orange" href="/services/used-oil-collection/">Explore used oil collection <span aria-hidden="true">↗</span></a>
      </section>
      ${cta("Not sure which product fits your equipment?", "Share the application, current fuel, monthly volume and delivery location. We'll help narrow the choice.", "Get a recommendation", "/contact/")}
    `,
  },
  {
    path: "services",
    active: "services",
    title: "Used Oil Collection, Supply Planning and Testing | Rerol Refinery",
    description: "Used oil collection, industrial oil cost planning, batch testing and tanker delivery from one Rerol team.",
    kicker: "Services",
    headline: "One partner for your oil, your supply plan and your used oil.",
    intro: "We collect used oil with documentation, re-refine it and deliver tested products back to industry. Each service can be used on its own or combined into a wider supply plan.",
    heroImage: "/assets/why-support.jpg",
    primaryLabel: "Plan your requirement",
    body: `
      <section class="page-section">
        ${heading("Service lines", "Practical support around every delivery.", "Choose a service below or speak to our team about a combined requirement.")}
        <div class="card-grid">
          ${card("01", "Cost and supply planning", "Review product fit, consumption, buying patterns, stock levels and delivery timing.", "/services/cost-and-supply-planning/", "Plan your supply")}
          ${card("02", "Used oil collection", "Arrange safe pickup, sample testing and documentation for used and waste oil.", "/services/used-oil-collection/", "Book a pickup")}
          ${card("03", "EPR support", "Discuss current used oil EPR requirements and the support Rerol can provide for your case.", "/services/epr-support/", "Discuss EPR")}
          ${card("04", "Testing and documentation", "Receive batch test results, COA, GST invoice and the applicable collection records.", "/services/testing-and-documentation/", "View documentation")}
          ${card("05", "Delivery and logistics", "Plan tanker or barrel delivery around production, storage capacity and consumption.", "/services/delivery-and-logistics/", "Plan delivery")}
          ${card("06", "24×7 urgent support", "Reach our team when an urgent order, disruption or production change needs a quick answer.", "/contact/", "Contact Rerol")}
        </div>
      </section>
      <section class="page-section page-section--dark">
        ${heading("How it works", "Share the setup. Build the plan. Keep reviewing.", "The process stays simple even when the operating requirement is not.")}
        <div class="step-grid">
          <article class="step"><h3>Share</h3><p>Current products, monthly volume, storage, delivery locations and buying pattern.</p></article>
          <article class="step"><h3>Review</h3><p>We check product fit, consumption, purchasing and delivery risk.</p></article>
          <article class="step"><h3>Plan</h3><p>Product choice, order quantity, timing, stock levels and reorder points.</p></article>
          <article class="step"><h3>Deliver</h3><p>Tested oil arrives with documents, and the plan evolves with production.</p></article>
        </div>
      </section>
      ${cta("Lower oil costs. Fewer supply surprises.", "Tell us how your plant currently buys and uses oil. We'll identify the next practical step.", "Book a cost review", "/contact/")}
    `,
  },
  {
    path: "industries",
    active: "industries",
    title: "Industries We Serve | Rerol Refinery",
    description: "Industrial fuel, base oil and used oil services for manufacturing, workshops, power, engineering and process plants.",
    kicker: "Industries",
    headline: "Built for the equipment that keeps industry moving.",
    intro: "Rerol supports operators that depend on steady heat, documented quality and reliable oil supply. Product selection starts with the equipment and operating pattern.",
    heroImage: "/assets/why-plant.jpg",
    body: `
      <section class="page-section">
        ${heading("Applications", "Five operating environments. One dependable supply chain.", "Every requirement is reviewed around process heat, consumption, storage and delivery risk.")}
        <div class="card-grid">
          ${card("01", "Manufacturing plants", "Fuel for boilers, furnaces and continuous production lines, with planned tanker supply.", "/products/furnace-oil/")}
          ${card("02", "Automotive and workshops", "Used oil collection through a documented channel, with pickup coordinated around workshop operations.", "/services/used-oil-collection/")}
          ${card("03", "Power and energy", "Tested industrial fuel, COA support and delivery planning around steam and heat demand.", "/products/")}
          ${card("04", "Heavy engineering", "Sustained heat for furnaces, kilns and heat-treatment applications.", "/products/furnace-oil/")}
          ${card("05", "Chemical and process", "Fuel matched to boilers, thermic fluid heaters and controlled process-heating duties.", "/products/light-diesel-oil/")}
          ${card("06", "Lubricant makers", "Re-refined base oil for lubricant, grease, hydraulic oil and industrial fluid formulations.", "/products/re-refined-base-oil/")}
        </div>
      </section>
      ${cta("Share the equipment, not just the product name.", "Tell us the burner, operating temperature, current fuel and monthly volume. We'll help match the requirement.", "Share your application", "/contact/")}
    `,
  },
  {
    path: "faq",
    active: "contact",
    title: "Frequently Asked Questions | Rerol Refinery",
    description: "Answers about Rerol product testing, delivery, used oil collection, GST invoices and urgent supply support.",
    kicker: "Questions answered",
    headline: "Straight answers before the first order.",
    intro: "The documents, delivery details and product checks plant and procurement teams usually confirm before the first tanker moves.",
    heroImage: "/assets/why-quality.jpg",
    secondaryLabel: "Call 24×7",
    body: `
      <section class="page-section">
        ${heading("FAQs", "What buyers ask first.", "If your question depends on equipment, quantity or location, call our team with those details and we'll answer directly.")}
        <div class="faq-list">
          <details open><summary><span>01</span>Can you help us reduce our oil costs?</summary><p>Yes. We review your current products, consumption and buying pattern, then recommend practical changes that protect the performance your plant needs.</p></details>
          <details><summary><span>02</span>What if we need oil urgently?</summary><p>Our team is available 24×7 for urgent orders and supply disruptions. Call ${phoneHref === "tel:+919176642399" ? "+91 91766 42399" : "our sales team"}.</p></details>
          <details><summary><span>03</span>Do I get a test report with every delivery?</summary><p>Yes. Every dispatched batch comes with a Certificate of Analysis showing the key tested properties.</p></details>
          <details><summary><span>04</span>Is re-refined fuel suitable for my boiler?</summary><p>Suitability depends on the burner and operating conditions. Share your burner make, current fuel and duty so the team can review the fit.</p></details>
          <details><summary><span>05</span>Do you buy used oil?</summary><p>Yes. We collect from factories, workshops, fleets and industrial operators. Quantity, oil condition and pickup location determine the collection plan.</p></details>
          <details><summary><span>06</span>Which areas do you deliver to?</summary><p>Delivery is planned case by case from Chennai across industrial locations in Tamil Nadu and South India. Share the destination for a confirmed schedule.</p></details>
          <details><summary><span>07</span>Do you provide GST invoices?</summary><p>Yes. Every order is documented with a GST invoice and the applicable delivery paperwork.</p></details>
          <details><summary><span>08</span>What is the minimum order?</summary><p>Minimum quantity depends on product, packaging and destination. Contact sales for the current tanker or barrel requirement.</p></details>
        </div>
      </section>
      ${cta("Still have a technical or delivery question?", "Call the Rerol team or send the essentials on WhatsApp for a direct answer.", "Ask on WhatsApp", whatsappHref)}
    `,
  },
  {
    path: "blog",
    active: "blog",
    title: "Industrial Fuel and Used Oil Guides | Rerol Refinery Blog",
    description: "Practical guides on furnace oil, LDO, re-refined base oil, used oil EPR and lawful used oil collection.",
    kicker: "Rerol guides",
    headline: "Guides for plant heads, buyers and lubricant makers.",
    intro: "Straight answers on industrial fuel, base oil and used oil rules, written around the questions buyers ask before they enquire.",
    heroImage: "/assets/product-base-oil.jpg",
    primaryLabel: "Explore products",
    primaryHref: "/products/",
    body: `
      <section class="page-section">
        ${heading("Latest guides", "Make the next oil decision with better questions.", "Each guide leads to the relevant product or service page when you are ready to discuss a live requirement.")}
        <div class="article-grid">
          ${card("INDUSTRIAL FUEL", "Furnace oil supplier in Chennai: 7 checks before you order", "A practical checklist covering source, COA, specifications, licences, delivery and trial orders.", "/blog/furnace-oil-supplier-chennai-checklist/", "Read the guide")}
          ${card("INDUSTRIAL FUEL", "LDO vs diesel for industrial heating", "Compare delivered price, heat value, burner needs, storage, quality and supply risk.", "/blog/ldo-vs-diesel-industrial-heating-cost/", "Read the guide")}
          ${card("BASE OIL", "Re-refined base oil in India", "Understand the standard, the properties that matter and the questions to ask a supplier.", "/blog/re-refined-base-oil-india-guide/", "Read the guide")}
          ${card("USED OIL & EPR", "Used oil EPR target for 2026-27", "Who the obligation applies to, how targets are calculated and why certificate source matters.", "/blog/used-oil-epr-target-2026-27/", "Read the guide")}
          ${card("USED OIL", "How to sell used oil legally in Tamil Nadu", "Authorisation, testing, safe storage, manifests and recordkeeping for generators.", "/blog/sell-used-oil-legally-tamil-nadu/", "Read the guide")}
        </div>
      </section>
      ${cta("Need an answer for a live requirement?", "Share the product, application, monthly volume and location with our team.", "Talk to Rerol", "/contact/")}
    `,
  },
  {
    path: "gallery",
    active: "gallery",
    title: "Inside Rerol Refinery | Plant, Lab and Fleet Photos",
    description: "A gallery framework for verified photos from Rerol's re-refining plant, testing lab, storage and delivery operations.",
    kicker: "Gallery",
    headline: "See where your fuel is made.",
    intro: "This page is reserved for verified photographs from Rerol's own plant, lab, collection operations, delivery fleet and team. Stock images are intentionally not presented as company facilities.",
    heroImage: "/assets/hero-refinery-dusk.jpg",
    primaryLabel: "Book a plant visit",
    body: `
      <section class="page-section">
        ${heading("Photo plan", "Real operations, documented honestly.", "These slots are ready for the client's own photographs. Each image should show a real Rerol facility, person, vehicle or event.")}
        <div class="gallery-grid">
          <article class="gallery-placeholder"><span>Plant</span><h3>Wide view of the re-refining plant</h3></article>
          <article class="gallery-placeholder"><span>Process</span><h3>Distillation or processing unit</h3></article>
          <article class="gallery-placeholder"><span>Storage</span><h3>Labelled storage and dispatch area</h3></article>
          <article class="gallery-placeholder"><span>Laboratory</span><h3>Technician testing a batch sample</h3></article>
          <article class="gallery-placeholder"><span>Quality</span><h3>Used oil and finished oil samples</h3></article>
          <article class="gallery-placeholder"><span>Documentation</span><h3>Certificate of Analysis preparation</h3></article>
          <article class="gallery-placeholder"><span>Collection</span><h3>Sealed used oil pickup</h3></article>
          <article class="gallery-placeholder"><span>Delivery</span><h3>Tanker dispatch to a customer</h3></article>
          <article class="gallery-placeholder"><span>Team</span><h3>The people behind Rerol</h3></article>
        </div>
      </section>
      ${cta("Want to see the process in person?", "Plant visits are arranged by appointment. Contact the team to discuss a suitable date.", "Book a plant visit", "/contact/")}
    `,
  },
  {
    path: "contact",
    active: "contact",
    title: "Contact Rerol Refinery | Get an Oil Quote in Chennai",
    description: "Call +91 91766 42399 or send an enquiry for furnace oil, LDO, base oil or used oil collection.",
    kicker: "Contact",
    headline: "Talk to our sales team.",
    intro: "Need a rate, a sample, a supply review or a used oil pickup? Call now or send the essential details and continue the enquiry on WhatsApp.",
    heroImage: "/assets/why-delivery.jpg",
    primaryLabel: "Call sales",
    primaryHref: phoneHref,
    secondaryLabel: "WhatsApp today’s rate",
    secondaryHref: whatsappHref,
    body: `
      <section class="page-section">
        ${heading("Get in touch", "Two direct ways to start.", "For urgent supply, call the team. For pricing or a planned requirement, send the product, quantity and location.")}
        <div class="contact-grid">
          <div class="contact-panel">
            <a href="${phoneHref}">Call sales<br /><strong>+91 91766 42399</strong></a>
            <a href="${whatsappHref}">WhatsApp<br /><strong>Chat for today's rate</strong></a>
            <a href="https://maps.google.com/?q=106+Santhome+High+Road+Chennai+600028" target="_blank" rel="noreferrer">Chennai office<br /><strong>106, Santhome High Road, Chennai 600028</strong></a>
            <p>Urgent supply support is available 24×7. Plant visits are by appointment.</p>
          </div>
          ${contactForm()}
        </div>
      </section>
    `,
  },
];
