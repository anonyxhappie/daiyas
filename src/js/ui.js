const WHATSAPP_NUMBER = "919462334899";

export function initUI() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  const form = document.getElementById("business-form");
  const status = document.getElementById("form-status");
  const details = document.querySelector(".business-details");

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("menu-open", !expanded);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  let requestedProduct = "";
  document.querySelectorAll("[data-product]").forEach((link) => {
    link.addEventListener("click", () => {
      requestedProduct = link.dataset.product || "";
      if (details) details.open = true;
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const messageLines = [
        "Hello Daiya’s team, I’m enquiring about a business partnership.",
        "",
        "Business type: " + data.get("businessType"),
        "Business name: " + (data.get("businessName") || "Not provided"),
        "City / district: " + data.get("city"),
        "Product interest: " + data.get("productInterest"),
        requestedProduct ? "Product requested: " + requestedProduct : "",
        "",
        "Please share relevant product and business details."
      ].filter(Boolean);
      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(messageLines.join("\n"));
      if (status) status.textContent = "WhatsApp is opening with your enquiry. Review the message and press Send to contact Daiya’s.";
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
}
