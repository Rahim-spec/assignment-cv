gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scroll-container");
  const device = document.getElementById("device");
  const phoneContent = document.getElementById("phone-content");
  const desktopContent = document.getElementById("desktop-content");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=2500",
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  // 1. Revolve & flatten phone perspective
  tl.to(device, {
    rotateY: 0,
    rotateX: 0,
    scale: 0.85,
    borderRadius: "30px",
    duration: 1,
    ease: "power2.inOut"
  })
  
  // 2. Fade out phone content
  .to(phoneContent, {
    opacity: 0,
    duration: 0.3
  }, "-=0.2")

  // 3. Expand device into desktop layout
  .to(device, {
    width: "90vw",
    height: "82vh",
    borderRadius: "16px",
    scale: 1,
    duration: 1.5,
    ease: "power3.inOut"
  }, "-=0.1")

  // 4. Reveal semantic desktop layout
  .to(desktopContent, {
    opacity: 1,
    y: 0,
    duration: 0.5
  }, "-=0.3");
});