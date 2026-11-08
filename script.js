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

  tl.to(heroHeader, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power1.out"
  })
  .to(device, {
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 0.85,
    borderRadius: "28px",
    duration: 0.8,
    ease: "power2.inOut"
  }, "-=0.2")
  .to(phoneContent, {
    opacity: 0,
    duration: 0.3
  }, "-=0.2")
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
  .to(desktopContent, {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "-=0.3");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetCard = document.querySelector(targetId);

      if (targetCard) {
        navBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        modalBody.innerHTML = targetCard.outerHTML;
        modalOverlay.classList.add("active");
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove("active");
    navBtns.forEach((b) => b.classList.remove("active"));
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});