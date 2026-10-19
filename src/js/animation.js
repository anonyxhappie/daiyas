import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Motion is progressive enhancement. Main content no longer waits for image frames.
export function initAnimation() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const items = document.querySelectorAll(".product-card, .process-copy, .partner-points > div, .trust-items > div");
  items.forEach((element) => {
    gsap.fromTo(element, { y: 14, opacity: 0.01 }, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power2.out",
      clearProps: "transform",
      scrollTrigger: { trigger: element, start: "top 92%", once: true }
    });
  });
}
