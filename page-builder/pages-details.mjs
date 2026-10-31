import { card, cta, heading, phoneHref, table, whatsappHref } from "./core.mjs";

const coaRows = (properties) => properties.map((property) => [property, "Recorded for each batch", "Shown on the supplied COA"]);

export const detailPages = [
  {
    path: "products/furnace-oil",
    active: "products",
    title: "Furnace Oil Supplier in Chennai | Tested Every Batch | Rerol",
    description: "Industrial furnace oil for boilers, furnaces and kilns. Batch-tested with COA and planned tanker supply.",
    kicker: "Furnace oil",
    headline: "Furnace oil for steady, high heat.",
    intro: "A heavy industrial fuel for plants that need continuous, high-temperature heat. Rerol processes and tests each batch so your team can review the result before it reaches the burner.",
    heroImage: "/assets/product-furnace.jpg",
    primaryLabel: "Get today’s rate",
    primaryHref: whatsappHref,
    secondaryLabel: "Call sales",
    body: `
      <section class="page-section">
        ${heading("Applications", "Where furnace oil works.", "Suitability depends on the burner, temperature and operating pattern. Share the current setup before switching products.")}
        <div class="card-grid">
          ${card("01", "Steam boilers", "Steady steam for processing, plant heating and continuous production.")}
          ${card("02", "Industrial furnaces", "Sustained heat for metal treatment and heavy manufacturing.")}
          ${card("03", "Rotary and vertical kilns", "Continuous high heat for cement, ceramics and process industries.")}
          ${card("04", "Thermic fluid heaters", "Controlled heat for processes that need stable operating temperatures.")}
          ${card("05", "Process heating", "Fuel for drying, curing, melting and other industrial heat duties.")}
          ${card("06", "Planned bulk supply", "Tanker or barrel delivery coordinated with storage and production demand.")}
        </div>
      </section>
      <section class="page-section page-section--mist">
        ${heading("Batch proof", "The key values are documented, not assumed.", "Exact results vary by batch and are shown on the COA supplied with the order.")}
        ${table(["Property", "Control", "Where to verify"], coaRows(["Kinematic viscosity", "Flash point", "Sulphur", "Water content", "Gross calorific value", "Density", "Pour point"]))}
      </section>
      <section class="page-section page-section--dark">
        ${heading("Before switching", "Confirm the burner and consent conditions.", "The team reviews the application before recommending a product or any burner adjustment.")}
        <div class="card-grid">
          ${card("A", "Will it suit my burner?", "Share the burner make, current fuel and operating duty so the product fit can be reviewed.")}
          ${card("B", "What documents arrive?", "A COA, GST invoice and the applicable delivery paperwork accompany the order.")}
          ${card("C", "How is supply planned?", "Quantity, packaging, delivery area and lead time are confirmed for the live requirement.")}
        </div>
      </section>
      ${cta("Share the boiler, volume and location.", "We will confirm product fit, current rate and the practical delivery plan.", "Get today’s rate", whatsappHref, "Call sales", phoneHref)}
    `,
  },
  {
    path: "products/light-diesel-oil",
    active: "products",
    title: "LDO Supplier in Chennai | Light Diesel Oil for Boilers | Rerol",
    description: "Industrial light diesel oil for boilers, heaters and process heating, batch-tested with a Certificate of Analysis.",
    kicker: "Light diesel oil",
    headline: "LDO for controlled industrial heating.",
    intro: "Rerol's industrial LDO is supplied for heating applications that need stable combustion and documented batch quality. The team can compare the operating requirement with your current fuel.",
    heroImage: "/assets/product-ldo.jpg",
    primaryLabel: "Get today’s rate",
    primaryHref: whatsappHref,
    body: `
      <section class="page-section">
        ${heading("Applications", "A versatile fuel for burners and heaters.", "Product fit depends on the burner, required heat output, storage arrangement and duty cycle.")}
        <div class="card-grid">
          ${card("01", "Steam boilers", "Industrial heating where steady flame and repeatable operation matter.")}
          ${card("02", "Industrial furnaces", "Process heat for manufacturing and treatment applications.")}
          ${card("03", "Kilns", "Sustained firing for continuous high-temperature duties.")}
          ${card("04", "Thermic fluid heaters", "Controlled heat transfer for temperature-sensitive processes.")}
          ${card("05", "Process heating", "Burners and heaters used for drying, curing and production support.")}
          ${card("06", "Diesel comparisons", "Compare cost per unit of heat, not only the delivered price per litre.")}
        </div>
      </section>
      <section class="page-section page-section--mist">
        ${heading("Batch proof", "Ask for the result that reaches your tank.", "Exact batch values are documented on the COA. Applicable product standards must be confirmed against the supplied test report.")}
        ${table(["Property", "Control", "Where to verify"], coaRows(["Sulphur", "Flash point", "Kinematic viscosity", "Water and sediment", "Gross calorific value"]))}
      </section>
      <section class="page-section page-section--dark">
        ${heading("Compare properly", "Delivered price is only one part of operating cost.", "Include heat value, burner settings, storage, filtration, downtime risk and delivery reliability.")}
        <div class="card-grid">
          ${card("01", "Heat value", "Compare the cost per useful unit of heat using the batch COA.")}
          ${card("02", "Burner fit", "Check nozzle, temperature and operating settings with the burner supplier.")}
          ${card("03", "Supply risk", "A reliable schedule protects the plant from production stoppages.")}
        </div>
      </section>
      ${cta("Compare your current industrial fuel.", "Send the monthly volume, current fuel and application for a same-day commercial comparison.", "Compare today’s rate", whatsappHref)}
    `,
  },
  {
    path: "products/re-refined-base-oil",
    active: "products",
    title: "Re-Refined Base Oil Supplier in India | Rerol Refinery",
    description: "Re-refined base oil for lubricant, grease, hydraulic oil and industrial fluid makers with a COA for every batch.",
    kicker: "Re-refined base oil",
    headline: "Consistent base oil, batch after batch.",
    intro: "A raw material for lubricants, greases and industrial fluids, produced under controlled conditions and supported by a Certificate of Analysis for each batch.",
    heroImage: "/assets/product-base-oil.jpg",
    primaryLabel: "Request a sample",
    body: `
      <section class="page-section">
        ${heading("Applications", "Built for blenders and industrial fluid makers.", "Grade and formulation fit must be confirmed from the latest COA and your own product requirements.")}
        <div class="card-grid">
          ${card("01", "Lubricant making", "Base stock for automotive, industrial and marine lubricant formulations.")}
          ${card("02", "Grease", "Base oil input for industrial and automotive grease products.")}
          ${card("03", "Hydraulic oils", "Raw material for fluids that require controlled viscosity and stability.")}
          ${card("04", "Gear oils", "Base stock for industrial formulations subject to load and heat.")}
          ${card("05", "Industrial fluids", "A re-refined input for suitable process and maintenance formulations.")}
          ${card("06", "Sample validation", "Test a sample in your own blend before confirming a larger supply plan.")}
        </div>
      </section>
      <section class="page-section page-section--mist">
        ${heading("COA review", "Buy the batch result, not the marketing label.", "The applicable grade and standard are confirmed against the latest test report. Rerol does not publish unverified Group II claims.")}
        ${table(["Property", "Control", "Where to verify"], coaRows(["Viscosity index", "Saturates", "Kinematic viscosity", "Sulphur", "Flash point", "Colour"]))}
      </section>
      <section class="page-section page-section--dark">
        ${heading("Buyer questions", "Three checks before a trial batch.", "Consistency matters more than a generic grade name.")}
        <div class="card-grid">
          ${card("01", "Which grade is supplied?", "Confirm the applicable grade and review the complete COA for the offered batch.")}
          ${card("02", "How repeatable is it?", "Compare viscosity, sulphur and other key results across more than one batch.")}
          ${card("03", "Can I test it first?", "Request a sample for laboratory and blend validation before placing a larger order.")}
        </div>
      </section>
      ${cta("Test it in your own formulation.", "Request a sample and the latest COA for technical review.", "Request a sample", "/contact/", "Talk to the technical team", phoneHref)}
    `,
  },
  {
    path: "services/cost-and-supply-planning",
    active: "services",
    title: "Industrial Oil Cost Reduction and Supply Planning | Rerol Refinery",
    description: "Review oil use, choose suitable products and plan deliveries around production, storage and consumption.",
    kicker: "Cost and supply planning",
    headline: "Lower oil costs. No surprise shortages.",
    intro: "We work with plant and procurement teams to review product fit, buying patterns, storage and consumption, then shape a dependable supply plan.",
    heroImage: "/assets/why-support.jpg",
    primaryLabel: "Book a cost review",
    body: `
      <section class="page-section">
        ${heading("What we review", "Eight controls around one operating requirement.", "The aim is not the lowest headline price. It is a better total operating result with fewer supply surprises.")}
        <div class="card-grid">
          ${card("01", "Strategic cost reduction", "Review product selection, consumption and buying patterns for practical savings.")}
          ${card("02", "Application fit", "Match products to the actual burner, process and duty rather than an over-specified label.")}
          ${card("03", "Planned procurement", "Align order quantities and timing with production and storage capacity.")}
          ${card("04", "Shortage prevention", "Set stock levels, reorder points and buffer quantities around real consumption.")}
          ${card("05", "Faster decisions", "Coordinate directly with the team responsible for product and dispatch.")}
          ${card("06", "Personal accountability", "Keep one team responsible for the requirement from review to delivery.")}
          ${card("07", "24×7 support", "Respond to urgent requirements, disruptions and production changes.")}
          ${card("08", "Continuous improvement", "Revisit product choice and supply timing as operations change.")}
        </div>
      </section>
      <section class="page-section page-section--dark">
        ${heading("Process", "From current setup to working supply plan.", "The review uses your current oils, monthly volumes, storage, locations and buying pattern.")}
        <div class="step-grid">
          <article class="step"><h3>Share</h3><p>Current product, monthly use, storage, delivery point and buying pattern.</p></article>
          <article class="step"><h3>Review</h3><p>Product fit, consumption and procurement are checked for avoidable cost and risk.</p></article>
          <article class="step"><h3>Plan</h3><p>Product choice, quantity, schedule, stock level and reorder points are proposed.</p></article>
          <article class="step"><h3>Refine</h3><p>The plan is revisited as production and consumption change.</p></article>
        </div>
      </section>
      ${cta("Start with the oil you use today.", "Share the current product, volume and delivery pattern for a focused review.", "Book a review", "/contact/")}
    `,
  },
  {
    path: "services/used-oil-collection",
    active: "services",
    title: "Used Oil Collection in Chennai | Rerol Refinery",
    description: "Arrange used oil pickup from factories, workshops, fleets and industrial sites with sample testing and documentation.",
    kicker: "Used oil collection",
    headline: "Sell your used oil through a documented channel.",
    intro: "We collect used and waste oil from factories, workshops, power plants and fleets. Pickup is planned around oil condition, quantity, location and the paperwork required for your records.",
    heroImage: "/assets/why-delivery.jpg",
    primaryLabel: "Book a pickup",
    body: `
      <section class="page-section">
        ${heading("Collection process", "Four steps from stored oil to documented pickup.", "Used oil condition and contamination affect recovery and commercial value, so every enquiry starts with the essentials.")}
        <div class="step-grid" style="color:white;background:var(--carbon);padding:1rem;border-radius:28px">
          <article class="step"><h3>Tell us the volume</h3><p>Share oil type, approximate quantity, storage method and pickup location.</p></article>
          <article class="step"><h3>Test a sample</h3><p>Density, viscosity, water, sediment and other relevant properties are reviewed.</p></article>
          <article class="step"><h3>Plan collection</h3><p>Pickup date, vehicle, containers and site coordination are confirmed.</p></article>
          <article class="step"><h3>Document the movement</h3><p>The applicable collection and transport records are provided for the transaction.</p></article>
        </div>
      </section>
      <section class="page-section page-section--mist">
        ${heading("Generators", "Who the service is designed for.", "Collection scope is confirmed against quantity, oil condition and location.")}
        <div class="card-grid">
          ${card("01", "Factories", "Maintenance oil and industrial used oil stored for authorised removal.")}
          ${card("02", "Workshops", "Used engine and gear oil from regular service operations.")}
          ${card("03", "Transport fleets", "Consolidated pickup from depots, bus fleets and vehicle operators.")}
          ${card("04", "Power and DG operators", "Used lubricating oil from generator and plant maintenance.")}
          ${card("05", "Industrial maintenance teams", "Hydraulic, turbine, compressor and gear oil streams.")}
          ${card("06", "Large generators", "Planned collection with the applicable authorisation and record checks.")}
        </div>
      </section>
      ${cta("Tell us what is in storage.", "Send the oil type, approximate volume and pickup location for a collection review.", "Sell your used oil", "/contact/", "Call for pickup", phoneHref)}
    `,
  },
  {
    path: "services/epr-support",
    active: "services",
    title: "Used Oil EPR Support for Lubricant Brands | Rerol Refinery",
    description: "Discuss used oil EPR obligations, re-refined base oil and the current support available from Rerol.",
    kicker: "EPR support",
    headline: "Plan for the used oil obligation before the deadline.",
    intro: "India's used oil EPR framework sets recycling obligations for producers of base oil and lubricating oil. Rerol can discuss the current product and documentation options relevant to your case.",
    heroImage: "/assets/product-base-oil.jpg",
    primaryLabel: "Discuss your requirement",
    body: `
      <section class="page-section">
        ${heading("Current framework", "The 2026-27 target is 20%.", "CPCB's used oil EPR FAQ states that the 2026-27 obligation is 20% of the base oil or lubricating oil sold or imported in 2024-25. Confirm the calculation and registration position for your entity before acting.")}
        ${table(["Compliance year", "Recycling target", "Reference sales year"], [
          ["2024-25", "5%", "2022-23"],
          ["2025-26", "10%", "2023-24"],
          ["2026-27", "20%", "2024-25"],
          ["2027-28", "20%", "2025-26"],
          ["2028-29", "40%", "2026-27"],
        ])}
      </section>
      <section class="page-section page-section--dark">
        ${heading("Before committing", "Verify the registration and certificate path.", "EPR is a compliance requirement. The exact service Rerol can provide must be confirmed for the live transaction.")}
        <div class="card-grid">
          ${card("01", "Confirm the obligation", "Use the CPCB portal and your prior-year sales data to establish the applicable target.")}
          ${card("02", "Check registration", "Confirm the producer, recycler and certificate status on the official used oil EPR system.")}
          ${card("03", "Review the supply route", "Compare certificates alone with a re-refined base oil purchase where appropriate.")}
        </div>
      </section>
      <section class="page-section"><p class="source-list">Reference: <a href="https://cpcb.nic.in/uploads/Projects/usedoil/Used_Oil_FAQ.pdf" target="_blank" rel="noreferrer">CPCB Frequently Asked Questions on EPR for Used Oil Management</a>. This page is general information, not legal advice.</p></section>
      ${cta("Confirm the scope for your company.", "Share the entity type, product category and compliance year for an initial discussion.", "Talk to the team", "/contact/")}
    `,
  },
  {
    path: "services/testing-and-documentation",
    active: "services",
    title: "Industrial Oil Testing and Documentation | Rerol Refinery",
    description: "Certificate of Analysis, batch testing, GST invoice and supporting collection documentation for Rerol oil supply.",
    kicker: "Testing and documentation",
    headline: "Every batch tested. Every order documented.",
    intro: "The team checks each batch before dispatch and provides the documents your plant, procurement and audit teams need to review the order.",
    heroImage: "/assets/why-quality.jpg",
    body: `
      <section class="page-section">
        ${heading("Document set", "Proof that travels with the product.", "The exact test list and transport documents depend on the product and transaction.")}
        <div class="card-grid">
          ${card("01", "Certificate of Analysis", "Key tested properties for the dispatched batch, including the applicable methods and results.")}
          ${card("02", "GST invoice", "Commercial documentation for every order.")}
          ${card("03", "Delivery paperwork", "The applicable dispatch and receipt records for tanker or barrel supply.")}
          ${card("04", "Used oil testing", "Condition checks for used oil collection, including water and sediment where relevant.")}
          ${card("05", "Collection records", "The applicable manifest and movement documents for used oil pickup.")}
          ${card("06", "Licence copies", "Authorisation details are shared with verified buyers on request.")}
        </div>
      </section>
      ${cta("Need a sample COA before ordering?", "Ask the team for the latest representative document for the product you are reviewing.", "Request documentation", "/contact/")}
    `,
  },
  {
    path: "services/delivery-and-logistics",
    active: "services",
    title: "Industrial Oil Delivery and Logistics | Rerol Refinery",
    description: "Plan tanker or barrel delivery around production, storage capacity and consumption with Rerol's supply team.",
    kicker: "Delivery and logistics",
    headline: "Fuel at your gate, on your schedule.",
    intro: "Supply planning starts with the product, monthly consumption, storage capacity, delivery point and the operating risk of running short.",
    heroImage: "/assets/why-delivery.jpg",
    primaryLabel: "Plan your supply",
    body: `
      <section class="page-section">
        ${heading("Delivery controls", "A schedule built around the plant, not the calendar alone.", "Current tanker sizes, barrel availability, minimum quantities and lead times are confirmed with the live quote.")}
        <div class="card-grid">
          ${card("01", "Tanker supply", "Bulk dispatch for plants with suitable storage and unloading arrangements.")}
          ${card("02", "Barrel supply", "Packaging options for smaller requirements, subject to product and availability.")}
          ${card("03", "Delivery location", "Route, access and unloading conditions are reviewed before dispatch.")}
          ${card("04", "Consumption plan", "Weekly or monthly schedules can be aligned with expected use.")}
          ${card("05", "Stock protection", "Reorder points and buffer quantities help reduce the chance of running dry.")}
          ${card("06", "Urgent support", "The team is available 24×7 when production changes or supply is disrupted.")}
        </div>
      </section>
      ${cta("Build the delivery plan before the tank runs low.", "Share monthly use, storage capacity and location for a supply discussion.", "Plan your supply", "/contact/", "Call 24×7", phoneHref)}
    `,
  },
];
