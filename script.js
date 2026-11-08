gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scroll-container");
  const device = document.getElementById("device");
  const phoneContent = document.getElementById("phone-content");
  const desktopContent = document.getElementById("desktop-content");
  const heroHeader = document.querySelector(".hero-header");
  const navBtns = document.querySelectorAll(".nav-btn");

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

  // 1. Fade out the "Scroll down to expand profile" text early on scroll
  tl.to(heroHeader, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power1.out"
  })

  // 2. Straighten phone perspective completely to flat (0deg on all axes)
  .to(device, {
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 0.85,
    borderRadius: "28px",
    duration: 0.8,
    ease: "power2.inOut"
  }, "-=0.2")

  // 3. Fade out mobile screen view
  .to(phoneContent, {
    opacity: 0,
    duration: 0.3
  }, "-=0.2")

  // 4. Expand into a perfectly straight, flat rectangular desktop screen
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

  // 5. Reveal desktop layout content cleanly
  .to(desktopContent, {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "-=0.3");

  // Navigation Button Handlers
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (window.scrollY < 1000) {
        gsap.to(window, {
          scrollTo: { y: 2200 },
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => scrollToCard(btn.dataset.target)
        });
      } else {
        scrollToCard(btn.dataset.target);
      }
    });
  });

  function scrollToCard(targetId) {
    const targetEl = document.querySelector(targetId);
    if (targetEl && desktopContent) {
      desktopContent.scrollTo({
        top: targetEl.offsetTop - 70,
        behavior: "smooth"
      });
    }
  }
});