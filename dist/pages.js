const yearTarget = document.querySelector("[data-current-year]");
if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());

document.querySelectorAll(".mobile-nav__panel a").forEach((link) => {
  link.addEventListener("click", () => {
    const details = link.closest("details");
    if (details) details.open = false;
  });
});

const enquiryForm = document.querySelector("[data-whatsapp-form]");
if (enquiryForm instanceof HTMLFormElement) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = enquiryForm.querySelector("[data-form-status]");
    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      if (status) status.textContent = "Please complete the required fields.";
      return;
    }

    const data = new FormData(enquiryForm);
    const lines = [
      "Hi Rerol, I would like to discuss an enquiry.",
      `Name: ${data.get("name") || ""}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Phone: ${data.get("phone") || ""}`,
      `Requirement: ${data.get("requirement") || ""}`,
      `Monthly quantity: ${data.get("quantity") || "Not provided"}`,
      `Location: ${data.get("location") || "Not provided"}`,
      `Message: ${data.get("message") || "Not provided"}`,
    ];

    const destination = `https://wa.me/919176642399?text=${encodeURIComponent(lines.join("\n"))}`;
    if (status) status.textContent = "Opening WhatsApp with your enquiry…";
    window.open(destination, "_blank", "noopener,noreferrer");
  });
}
