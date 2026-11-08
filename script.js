gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scroll-container");
  const device = document.getElementById("device");
  const phoneContent = document.getElementById("phone-content");
  const desktopContent = document.getElementById("desktop-content");
  const navBtns = document.querySelectorAll(".nav-btn");

  // GSAP Scroll Timeline
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

  // 1. Subtle revolution to flat 0deg (Clean perspective)
  tl.to(device, {
    rotateY: 0,
    rotateX: 0,
    scale: 0.9,
    borderRadius: "28px",
    duration: 1,
    ease: "power2.inOut"
  })
  
  // 2. Seamlessly fade out phone screen
  .to(phoneContent, {
    opacity: 0,
    duration: 0.3
  }, "-=0.2")

  // 3. Expand outer device frame to desktop screen size
  .to(device, {
    width: "90vw",
    height: "82vh",
    borderRadius: "16px",
    scale: 1,
    duration: 1.5,
    ease: "power3.inOut"
  }, "-=0.1")

  // 4. Reveal inner desktop content cleanly
  .to(desktopContent, {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "-=0.3");

  // Clickable Navigation Handler
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Highlight active button
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Auto scroll page to expanded desktop phase if still on phone state
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
        top: targetEl.offsetTop - 80,
        behavior: "smooth"
      });
    }
  }
});