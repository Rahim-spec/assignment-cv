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

  // 1. Fade out header text when scrolling down
  tl.to(heroHeader, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power1.out"
  })

  // 2. Straighten phone perspective to 0deg flat
  .to(device, {
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 0.85,
    margin-top: "0px",
    borderRadius: "28px",
    duration: 0.8,
    ease: "power2.inOut"
  }, "-=0.2")

  // 3. Fade out mobile content
  .to(phoneContent, {
    opacity: 0,
    duration: 0.3
  }, "-=0.2")

  // 4. Expand shell into a clean straight desktop rectangle
  .to(device, {
    width: "90vw",
    height: "85vh",
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

  // Navigation click handler
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