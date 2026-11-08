gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scroll-container");
  const device = document.getElementById("device");
  const phoneContent = document.getElementById("phone-content");
  const desktopContent = document.getElementById("desktop-content");
  const heroHeader = document.querySelector(".hero-header");
  const navBtns = document.querySelectorAll(".nav-btn");

  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  // GSAP Scroll Animation Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=2200",
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  // 1. Fade out hero text
  tl.to(heroHeader, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power1.out"
  })

  // 2. Straighten 3D perspective to 0deg
  .to(device, {
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 0.85,
    borderRadius: "28px",
    duration: 0.8,
    ease: "power2.inOut"
  }, "-=0.2")

  // 3. Hide phone content
  .to(phoneContent, {
    opacity: 0,
    duration: 0.3
  }, "-=0.2")

  // 4. Expand into flat desktop rectangle
  .to(device, {
    width: "90vw",
    height: "82vh",
    borderRadius: "12px",
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    duration: 1.5,
    ease: "power3.inOut"
  }, "-=0.1")

  // 5. Reveal desktop layout
  .to(desktopContent, {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "-=0.3");

  // Floating Section Modal Handler
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetCard = document.querySelector(targetId);

      if (targetCard) {
        // Highlight active navbar pill
        navBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Clone target card content into the modal container
        modalBody.innerHTML = targetCard.outerHTML;

        // Open floating overlay
        modalOverlay.classList.add("active");
      }
    });
  });

  // Close modal function
  function closeModal() {
    modalOverlay.classList.remove("active");
    navBtns.forEach((b) => b.classList.remove("active"));
  }

  // Close triggers
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});