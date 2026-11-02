import { table } from "./core.mjs";
const sheets = [
  [
    {
      "type": "table",
      "rows": [
        [
          "01  /  RAW MATERIAL",
          "REV 0.1   |   02 NOV 2026"
        ]
      ]
    },
    {
      "text": "Used Lubricating Oil",
      "type": "text"
    },
    {
      "text": "Incoming used engine, gear, hydraulic and industrial oils for re-refining.",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "DOCUMENT  RRL-QC-UO-001",
          "STATUS  Proposed limits / laboratory validation pending"
        ]
      ]
    },
    {
      "text": "A. Preferred commercial / operating screen",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "TEST PARAMETER",
          "PROPOSED REROL ACCEPTANCE",
          "TEST METHOD"
        ],
        [
          "Appearance",
          "Oil phase; no visible foreign objects or free solvent layer",
          "Visual inspection"
        ],
        [
          "Water content, % v/v",
          "Preferred ≤2.0; 2.0-5.0: review & price adjustment",
          "ASTM D95"
        ],
        [
          "Pentane insolubles, % m/m",
          "Preferred ≤2.0; above this: technical review",
          "ASTM D893"
        ],
        [
          "Flash point, PMC, °C",
          "Preferred ≥65; low-flash loads: quarantine & assess",
          "ASTM D93"
        ],
        [
          "Kinematic viscosity @ 40 °C",
          "Report; 20-200 mm²/s indicative only",
          "ASTM D445"
        ],
        [
          "Density @ 15 °C",
          "Report, kg/m3",
          "ASTM D4052"
        ],
        [
          "Total acid number, mg KOH/g",
          "Report; preferred ≤5.0",
          "ASTM D664"
        ],
        [
          "Total halogens / chlorine",
          "Report; screen for chlorinated solvent contamination",
          "Accredited lab"
        ],
        [
          "Sulphur, % m/m",
          "Report for yield and product planning",
          "ASTM D4294"
        ]
      ]
    },
    {
      "text": "B. Statutory contaminant screen - Schedule V Part A",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "CONTAMINANT",
          "MAXIMUM PERMISSIBLE",
          "LAB METHOD"
        ],
        [
          "Polychlorinated biphenyls (PCBs)",
          "<2 mg/kg (ppm)",
          "Validated GC method"
        ],
        [
          "Lead (Pb)",
          "≤100 mg/kg",
          "Validated metals method"
        ],
        [
          "Arsenic (As)",
          "≤5 mg/kg",
          "Validated metals method"
        ],
        [
          "Cadmium + Chromium + Nickel",
          "≤500 mg/kg combined",
          "Validated metals method"
        ],
        [
          "Polyaromatic hydrocarbons (PAH)",
          "≤6%",
          "Accredited PAH assay"
        ]
      ]
    },
    {
      "text": "RECEIVING RULE  Hold and investigate any load suspected to contain petrol, chlorinated solvents, antifreeze/glycol, transformer oil or unknown chemicals. Accept only within authorised waste categories and approved receiving procedures.",
      "type": "text"
    },
    {
      "text": "CLASSIFICATION  Commercial limits in Section A are proposed Rerol targets, not limits in Schedule V. Schedule V values in Section B are the cited regulatory screening limits; verify current amendments and permit conditions.",
      "type": "text"
    },
    {
      "text": "REFERENCE BASIS  Hazardous and Other Wastes Rules, 2016 - Schedule V Part A; Rerol internal QC testing template.",
      "type": "text"
    }
  ],
  [
    {
      "type": "table",
      "rows": [
        [
          "02  /  FINISHED BASE OIL",
          "REV 0.1   |   02 NOV 2026"
        ]
      ]
    },
    {
      "text": "Re-Refined Base Oil (RRBO)",
      "type": "text"
    },
    {
      "text": "Proposed base-oil technical data by viscosity grade. Bulk supply / blending use.",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "DOCUMENT  RRL-QC-RRBO-002",
          "STATUS  Proposed limits / laboratory validation pending"
        ]
      ]
    },
    {
      "text": "A. Viscosity-grade quality targets",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "PROPERTY",
          "SN70",
          "SN150",
          "SN350",
          "SN500",
          "ASTM"
        ],
        [
          "Appearance",
          "Clear / bright",
          "Clear / bright",
          "Clear / bright",
          "Clear / bright",
          "Visual"
        ],
        [
          "Colour, ASTM, max",
          "1.5",
          "1.5",
          "2.0",
          "2.5",
          "D1500"
        ],
        [
          "Density @ 15 °C, kg/L",
          "0.845-0.860",
          "0.855-0.870",
          "0.865-0.880",
          "0.875-0.890",
          "D4052"
        ],
        [
          "KV @ 40 °C, mm²/s",
          "10-15",
          "28-35",
          "60-75",
          "90-110",
          "D445"
        ],
        [
          "KV @ 100 °C, mm²/s",
          "2.5-3.5",
          "5.0-6.0",
          "8.5-10.5",
          "10.5-12.5",
          "D445"
        ],
        [
          "Viscosity index, min",
          "95",
          "95",
          "95",
          "95",
          "D2270"
        ],
        [
          "Flash point COC, °C, min",
          "180",
          "210",
          "220",
          "230",
          "D92"
        ],
        [
          "Pour point, °C, max",
          "-6",
          "-6",
          "-6",
          "-6",
          "D97"
        ],
        [
          "Water, % m/m, max",
          "0.05",
          "0.05",
          "0.05",
          "0.05",
          "D6304"
        ],
        [
          "TAN, mg KOH/g, max",
          "0.05",
          "0.05",
          "0.05",
          "0.05",
          "D664"
        ],
        [
          "Total sulphur, % m/m, max",
          "0.10",
          "0.10",
          "0.10",
          "0.10",
          "D4294"
        ],
        [
          "Ash, % m/m, max",
          "0.01",
          "0.01",
          "0.01",
          "0.01",
          "D482"
        ]
      ]
    },
    {
      "text": "B. Release / market classification",
      "type": "text"
    },
    {
      "text": "QUALITY PRIORITY  Premium process-improvement goal: TAN ≤0.03 mg KOH/g and lighter colour where commercially achievable. Existing grade specifications above retain the earlier ≤0.05 TAN acceptance level until validation.",
      "type": "text"
    },
    {
      "text": "BASE-OIL GROUP  Do not label Group II solely on colour, viscosity or VI. Group II additionally requires saturates ≥90%, sulphur ≤0.03% and VI 80 to <120 under API base-stock definitions; test the relevant parameters before claiming any Group classification.",
      "type": "text"
    },
    {
      "text": "CUSTOMER RELEASE  Confirm grade using a representative batch COA. Add buyer-specific metals, oxidation stability and odour testing where the application requires it.",
      "type": "text"
    },
    {
      "text": "REFERENCE BASIS  Existing Rerol RRBO Product Specification (July 2026); ASTM base-oil tests; API base-stock classification guidance.",
      "type": "text"
    }
  ],
  [
    {
      "type": "table",
      "rows": [
        [
          "03  /  INDUSTRIAL HEATING FUEL",
          "REV 0.1   |   02 NOV 2026"
        ]
      ]
    },
    {
      "text": "Light Diesel Oil (LDO)",
      "type": "text"
    },
    {
      "text": "Indian standard reference, with tighter Rerol working targets for batch release.",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "DOCUMENT  RRL-QC-LDO-003",
          "STATUS  Proposed limits / laboratory validation pending"
        ]
      ]
    },
    {
      "text": "A. Applicable product standard: IS 15770:2021",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "CHARACTERISTIC",
          "IS 15770 REQUIREMENT",
          "REROL PROPOSED",
          "REFERENCE TEST"
        ],
        [
          "Acid number, mg KOH/g, max",
          "0.5",
          "≤0.5",
          "IS 1448 P:2"
        ],
        [
          "Ash, % mass, max",
          "0.02",
          "≤0.02",
          "IS 1448 P:4"
        ],
        [
          "Carbon residue, whole sample, % mass",
          "≤1.5",
          "≤1.0 (goal)",
          "IS 1448 P:8"
        ],
        [
          "Pour point, °C",
          "≤12 winter; ≤21 summer",
          "≤12 year-round (goal)",
          "IS 1448 P:10"
        ],
        [
          "Copper corrosion, 3h / 100 °C",
          "Not worse than No. 2",
          "No. 2 or better",
          "IS 1448 P:15"
        ],
        [
          "Flash point (PMC), °C, min",
          "66",
          "≥70 (goal)",
          "IS 1448 P:21"
        ],
        [
          "KV @ 40 °C, mm²/s",
          "2.5-15.0",
          "2.5-15.0",
          "IS 1448 P:25"
        ],
        [
          "Sediment, % mass, max",
          "0.10",
          "≤0.05 (goal)",
          "IS 1448 P:30"
        ],
        [
          "Density @ 15 °C, kg/m3",
          "Report",
          "Report on COA",
          "IS 1448 P:16"
        ],
        [
          "Water content, % vol, max",
          "0.25",
          "≤0.10 (goal)",
          "IS 1448 P:40"
        ],
        [
          "Total sulphur, % mass",
          "0.005-1.50*",
          "0.005-1.00 (goal)*",
          "ASTM D4294"
        ]
      ]
    },
    {
      "text": "SEASONAL RULE  Winter for the standard means November through February; summer is the remainder of the year.",
      "type": "text"
    },
    {
      "text": "SULPHUR  *Standard table shows 0.005-1.50% by mass. Lower sulphur levels or other emission-related limits may apply by purchaser, permit and location. Rerol ≤1.00% is a proposed tighter target, not a measured value.",
      "type": "text"
    },
    {
      "text": "USE / CLAIM  For authorised industrial heating applications, not automotive diesel. An LDO label or claim of conformity should follow complete batch testing to IS 15770 and confirmation that production, storage and sale are authorised.",
      "type": "text"
    },
    {
      "text": "REFERENCE BASIS  IndianOil-hosted IS 15770:2021 Table 1; BIS product manual PM/15770/01 (Dec 2024).",
      "type": "text"
    }
  ],
  [
    {
      "type": "table",
      "rows": [
        [
          "04  /  DISTILLATE INDUSTRIAL FUEL",
          "REV 0.1   |   02 NOV 2026"
        ]
      ]
    },
    {
      "text": "Distilled Fuel Oil (DFO)",
      "type": "text"
    },
    {
      "text": "Provisional Rerol grade for furnace / burner use; not an automotive fuel.",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "DOCUMENT  RRL-QC-DFO-004",
          "STATUS  Proposed limits / laboratory validation pending"
        ]
      ]
    },
    {
      "text": "A. Proposed industrial performance targets",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "PROPERTY",
          "REROL ENGINEERING TARGET",
          "TEST"
        ],
        [
          "Appearance",
          "Homogeneous; no free water or debris",
          "Visual"
        ],
        [
          "Density @ 15 °C",
          "850-950 kg/m3 (provisional)",
          "ASTM D4052"
        ],
        [
          "KV @ 50 °C",
          "5-60 mm²/s (provisional)",
          "ASTM D445"
        ],
        [
          "Flash point, PMC",
          "≥66 °C; ≥70 °C preferred",
          "ASTM D93"
        ],
        [
          "Pour point",
          "≤18 °C (application dependent)",
          "ASTM D97"
        ],
        [
          "Water",
          "≤0.20% by volume",
          "ASTM D95"
        ],
        [
          "Sediment",
          "≤0.10% by mass",
          "ASTM D473"
        ],
        [
          "Ash",
          "≤0.05% by mass",
          "ASTM D482"
        ],
        [
          "Total sulphur",
          "≤1.5% by mass; stricter if required",
          "ASTM D4294"
        ],
        [
          "Gross calorific value",
          "Report; 9,800-10,500 kcal/kg indicative",
          "ASTM D240"
        ],
        [
          "Carbon residue",
          "≤5% by mass, proposed target",
          "ASTM D4530"
        ]
      ]
    },
    {
      "text": "B. Waste-derived-fuel contaminant gate (where applicable)",
      "type": "text"
    },
    {
      "type": "table",
      "rows": [
        [
          "CONTAMINANT",
          "RELEVANT MAXIMUM",
          "BASIS"
        ],
        [
          "PCB",
          "<2 mg/kg",
          "Schedule V Part B"
        ],
        [
          "Lead / Arsenic",
          "≤100 / ≤5 mg/kg, respectively",
          "Schedule V Part B"
        ],
        [
          "Cd + Cr + Ni combined",
          "≤500 mg/kg",
          "Schedule V Part B"
        ],
        [
          "PAH / total halogens",
          "≤6% / ≤4,000 mg/kg",
          "Schedule V Part B"
        ],
        [
          "Sulphur / water / sediment",
          "≤4.5% / ≤1.0% v/v / ≤0.25% m/m",
          "Schedule V Part B"
        ]
      ]
    },
    {
      "text": "IMPORTANT  DFO is a working trade description, not itself an IS-grade certification. IS 1593:2018 is the reference for furnace/fuel-oil grades (LV grade has ≤80 cSt @ 50 °C and ≥66 °C flash point), but full conformance requires all applicable tests.",
      "type": "text"
    },
    {
      "text": "DISPATCH  Confirm fuel classification and permitted end use with TNPCB / the purchaser. Release only against the actual batch COA, including relevant contaminants; do not blend nonconforming hazardous material into fuel.",
      "type": "text"
    },
    {
      "text": "REFERENCE BASIS  IndianOil IS 1593:2018 fuel-oil table; Hazardous and Other Wastes Rules, 2016 Schedule V Part B.",
      "type": "text"
    }
  ]
];
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
export function specificationSection(index) {
  const blocks = sheets[index];
  return `<section class="page-section page-section--mist product-specifications" id="specifications" aria-label="Technical specifications">
    <p class="eyebrow">Technical specifications · Rev 0.1 · 02 Nov 2026</p>
    <h2>${escape(blocks[1].text)}</h2>
    <p class="specification-status"><strong>Proposed limits / laboratory validation pending.</strong> These are reference requirements and proposed targets, not certified or measured batch results. Confirm the actual batch COA, applicable standards and permit conditions before acceptance or use.</p>
    ${blocks.map((block, i) => {
      if (block.type === "table") {
        if (block.rows.length === 1) return `<p class="specification-meta">${block.rows[0].map(escape).join(" · ")}</p>`;
        return table(block.rows[0].map(escape), block.rows.slice(1).map(row => row.map(escape)));
      }
      if (i === 1) return "";
      if (/^[AB]\\. /.test(block.text)) return `<h3>${escape(block.text)}</h3>`;
      return `<p class="specification-note">${escape(block.text)}</p>`;
    }).join("\n")}
  </section>`;
}
export function specificationLinks() {
  return `<section class="page-section page-section--mist">
    <p class="eyebrow">Technical quality series</p>
    <h2>Review the proposed specifications.</h2>
    <p>Rev 0.1 · 02 Nov 2026. Laboratory validation is pending. Review the limits, test methods and release conditions for each material.</p>
    <ul class="specification-links">
      <li><a href="/services/used-oil-collection/#specifications">Used lubricating oil — incoming acceptance screens</a></li>
      <li><a href="/products/re-refined-base-oil/#specifications">RRBO — SN70, SN150, SN350 and SN500</a></li>
      <li><a href="/products/light-diesel-oil/#specifications">LDO — standard references and proposed targets</a></li>
      <li><a href="/products/distilled-fuel-oil/#specifications">DFO — provisional industrial fuel targets</a></li>
    </ul>
  </section>`;
}

