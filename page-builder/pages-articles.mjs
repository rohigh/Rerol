import { articleAside, cta, heading, phoneHref, table, whatsappHref } from "./core.mjs";

const articleSection = (copy, asideLabel) => `<section class="page-section"><div class="article-layout"><article class="article-copy">${copy}</article>${articleAside(asideLabel)}</div></section>`;

export const articlePages = [
  {
    path: "blog/furnace-oil-supplier-chennai-checklist",
    active: "blog",
    title: "Furnace Oil Supplier in Chennai | 7 Checks Before You Order",
    description: "Seven checks covering source, COA, specifications, licences, delivery and trials before choosing a furnace oil supplier.",
    kicker: "Industrial fuel guide",
    headline: "Seven checks before choosing a furnace oil supplier.",
    intro: "A low quote can become expensive if the batch is off specification, the tanker arrives late or the supplier cannot document the source. Use these checks before the first order.",
    heroImage: "/assets/product-furnace.jpg",
    primaryLabel: "View furnace oil",
    primaryHref: "/products/furnace-oil/",
    body: `${articleSection(`
      <p class="lead-copy">The safest comparison starts with the fuel, the batch report and the supply capability - not the product name alone.</p>
      <h2>1. Maker or trader?</h2><p>Ask where the oil is processed and who controls the batch. A refiner or re-refiner with its own plant has more direct control over consistency than a trader buying from changing sources.</p>
      <h2>2. COA with every batch?</h2><p>A Certificate of Analysis shows what is in the tanker. Confirm that the report belongs to the dispatched batch and lists the properties relevant to your burner.</p>
      <h2>3. Do the values suit the system?</h2><p>Review viscosity, flash point, sulphur, water content and calorific value. The acceptable range depends on the burner, storage and operating duty.</p>
      <h2>4. Can the supplier prove its registration?</h2><p>Ask for GST details and the applicable pollution control authorisation when re-refined material is involved. Proper commercial and delivery documents should accompany the order.</p>
      <h2>5. Is the delivery plan credible?</h2><p>Confirm tanker size, lead time, route, unloading conditions and the response if a dispatch is delayed. Reliability can matter more than a small price difference.</p>
      <h2>6. Can you trial the product?</h2><p>Request a sample or a controlled first order so the operations team can review flame, heat output, deposits and handling in the actual system.</p>
      <h2>7. Does the price make sense?</h2><p>Compare quotations on the same specification, quantity, tax and delivery terms. A number far below comparable offers deserves extra scrutiny.</p>
    `, "Review a furnace oil requirement")}
    ${cta("Compare the batch, the documents and the delivery plan.", "Share your boiler, monthly volume and location for today's Rerol offer.", "Get today’s rate", whatsappHref)}`,
  },
  {
    path: "blog/ldo-vs-diesel-industrial-heating-cost",
    active: "blog",
    title: "LDO vs Diesel for Industrial Heating | Rerol Refinery",
    description: "Compare LDO and diesel for boilers and heaters using delivered cost, heat value, burner needs, storage and supply risk.",
    kicker: "Industrial fuel guide",
    headline: "LDO vs diesel: compare the real cost of heat.",
    intro: "The cheapest price per litre is not always the lowest operating cost. Compare delivered cost, usable heat, burner requirements and supply reliability on the same day.",
    heroImage: "/assets/product-ldo.jpg",
    primaryLabel: "View LDO",
    primaryHref: "/products/light-diesel-oil/",
    body: `${articleSection(`
      <p class="lead-copy">Use the COA and the delivered quote to compare cost per useful unit of heat, then add the operating factors that affect the plant.</p>
      <h2>Start with delivered cost</h2><p>Use the price at your gate, including applicable tax and transport. Compare both fuels on the same date and for the same delivery quantity.</p>
      <h2>Convert price into heat cost</h2>
      <ol><li>Take delivered price per litre.</li><li>Use the batch calorific value from the COA.</li><li>Calculate the cost per common unit of heat.</li><li>Adjust for the efficiency of the actual burner and process.</li></ol>
      <h2>Add the hidden operating costs</h2><ul><li>Burner nozzle, temperature or setting changes.</li><li>Storage, preheating, filters and fuel-line requirements.</li><li>Cleaning or downtime caused by inconsistent fuel.</li><li>Stock level and delivery reliability.</li></ul>
      <h2>When LDO may fit</h2><p>LDO can suit industrial plants with regular heating demand and equipment that can operate within the product's batch properties. Diesel may remain appropriate for other equipment and intermittent duties.</p>
      <h2>Make a same-day comparison</h2><p>Fuel prices move. Use current quotes, current batch data and your real monthly consumption rather than a historical saving claim.</p>
    `, "Compare your current fuel")}
    ${cta("Send your monthly usage for a live comparison.", "We'll compare the current Rerol offer with the operating information you provide.", "Compare today’s rate", whatsappHref)}`,
  },
  {
    path: "blog/re-refined-base-oil-india-guide",
    active: "blog",
    title: "Re-Refined Base Oil in India | Buyer Guide | Rerol",
    description: "A buyer guide to re-refined base oil, IS 18722, COA review, consistency and sample validation.",
    kicker: "Base oil guide",
    headline: "Re-refined base oil: the questions that protect a blend.",
    intro: "RRBO can be used in suitable lubricant, grease and industrial fluid formulations. The important decision is the verified grade and repeatability of the supplier's batches.",
    heroImage: "/assets/product-base-oil.jpg",
    primaryLabel: "View base oil",
    primaryHref: "/products/re-refined-base-oil/",
    body: `${articleSection(`
      <p class="lead-copy">The Indian standard covers virgin Group I to Group III base oils and re-refined Group I base oils. A marketing label should never replace the latest laboratory report.</p>
      <h2>Start with the applicable standard</h2><p>IS 18722 (Part 1):2024 defines requirements and test methods for mineral-origin base oils. It states that the re-refined base oils covered by the standard pertain to Group I.</p>
      <h2>Review the properties that matter</h2><ul><li>Kinematic viscosity and viscosity index.</li><li>Sulphur and saturates.</li><li>Flash point, colour and visible impurities.</li><li>Variation across more than one batch.</li></ul>
      <h2>Be careful with Group II claims</h2><p>The standard defines Group II using at least 90% saturates and no more than 0.03% sulphur. Ask for a report that proves both before accepting the label or price.</p>
      <h2>Five supplier questions</h2><ol><li>Which grade is this and can I see the current COA?</li><li>How do key results vary across batches?</li><li>Where and how is the oil re-refined?</li><li>What documentation accompanies the order?</li><li>Can I validate a sample in my own blend?</li></ol>
      <p class="source-list">Source: <a href="https://www.services.bis.gov.in/tmp/PCD34422088_25042024_1.pdf" target="_blank" rel="noreferrer">Bureau of Indian Standards, IS 18722 (Part 1):2024</a>.</p>
    `, "Request a base oil sample")}
    ${cta("Validate a sample before the first large order.", "Ask for a representative sample and current COA for technical review.", "Request a sample", "/contact/")}`,
  },
  {
    path: "blog/used-oil-epr-target-2026-27",
    active: "blog",
    title: "Used Oil EPR Target 2026-27 | Rerol Refinery",
    description: "CPCB's 2026-27 used oil EPR target is 20%. Understand the reference year, registration and certificate planning.",
    kicker: "Used oil EPR guide",
    headline: "The 2026-27 used oil EPR target is 20%.",
    intro: "CPCB's FAQ states that the obligation is based on base oil or lubricating oil sold or imported two years earlier. Producers should confirm registration, sales data and certificate planning early.",
    heroImage: "/assets/why-quality.jpg",
    primaryLabel: "Discuss EPR support",
    primaryHref: "/services/epr-support/",
    body: `${articleSection(`
      <p class="lead-copy">For 2026-27, the recycling target is 20% of the base oil or lubricating oil sold or imported in 2024-25.</p>
      <h2>Who should review the obligation?</h2><p>Entities selling or importing base oil or lubricating oil in India should verify whether they fall within the producer definition and confirm their portal registration position.</p>
      <h2>How the target is calculated</h2><p>The annual obligation is linked to the quantity placed on the market two years earlier. The reporting data and entity scope should be reconciled before certificates are planned.</p>
      ${table(["Compliance year", "Target", "Based on sales in"], [["2024-25", "5%", "2022-23"], ["2025-26", "10%", "2023-24"], ["2026-27", "20%", "2024-25"], ["2027-28", "20%", "2025-26"], ["2028-29", "40%", "2026-27"]])}
      <h2>Actions for this quarter</h2><ol><li>Confirm the sales volume used for the obligation.</li><li>Check registration and filing status on the used oil EPR portal.</li><li>Review registered recyclers and certificate history.</li><li>Compare the available compliance routes.</li><li>Keep transaction and certificate records aligned.</li></ol>
      <p class="source-list">Source: <a href="https://cpcb.nic.in/uploads/Projects/usedoil/Used_Oil_FAQ.pdf" target="_blank" rel="noreferrer">CPCB Frequently Asked Questions on EPR for Used Oil Management</a>. Obtain professional compliance advice for your entity.</p>
    `, "Review an EPR requirement")}
    ${cta("Confirm the requirement before committing.", "Share the entity type and compliance year for an initial discussion with Rerol.", "Talk to the team", "/contact/")}`,
  },
  {
    path: "blog/sell-used-oil-legally-tamil-nadu",
    active: "blog",
    title: "How to Sell Used Oil Legally in Tamil Nadu | Rerol Refinery",
    description: "A practical guide to authorisation, safe storage, testing, manifests and records when arranging used oil collection.",
    kicker: "Used oil guide",
    headline: "Sell used oil through the right channel.",
    intro: "Factories, fleets and workshops should verify the collector or recycler, store oil safely and keep the required movement records for each pickup.",
    heroImage: "/assets/why-delivery.jpg",
    primaryLabel: "Book a pickup",
    primaryHref: "/services/used-oil-collection/",
    body: `${articleSection(`
      <p class="lead-copy">Used oil is regulated hazardous material. The collection route and records matter as much as the commercial rate.</p>
      <h2>1. Verify the buyer</h2><p>TNPCB publishes information on registered used oil and waste oil recyclers. Check the current authorisation before handing over material.</p>
      <h2>2. Ask for the movement records</h2><p>Confirm the applicable manifest, transport and commercial documents before pickup. Keep copies with your waste records.</p>
      <h2>3. Test the oil</h2><p>Water, sediment and mixed contaminants affect recovery and the offered rate. A sample check helps both parties agree on the condition.</p>
      <h2>4. Store safely until pickup</h2><p>Use sealed, labelled drums or tanks, prevent water entry and avoid mixing oil with solvents, coolant or unrelated wastes.</p>
      <h2>5. Keep a complete file</h2><p>Retain the test result, manifest, invoice or payment record and the buyer's authorisation details for audit and inspection.</p>
      <p class="source-list">Reference: <a href="https://www.tnpcb.gov.in/hazardousWaste.php" target="_blank" rel="noreferrer">Tamil Nadu Pollution Control Board hazardous waste guidance</a> and its registered recycler resources.</p>
    `, "Arrange a used oil pickup")}
    ${cta("Tell us what is stored and where.", "Share the oil type, approximate quantity and pickup location for a collection review.", "Book a pickup", "/contact/", "Call collections", phoneHref)}`,
  },
];
