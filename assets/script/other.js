export function initOther() {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");

  const cursorInner = document.createElement("div");
  cursorInner.classList.add("cursor-inner");

  const circle = document.createElement("div");
  circle.classList.add("circle");

  const star = document.createElement("div");
  star.classList.add("star");

  const glow = document.createElement("div");
  glow.classList.add("glow");

  cursorInner.appendChild(glow);
  cursorInner.appendChild(circle);
  cursorInner.appendChild(star);
  cursor.appendChild(cursorInner);
  document.body.appendChild(cursor);

  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;
  let rafId = null;

  function updateMousePosition(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  document.addEventListener("mousemove", updateMousePosition, {
    passive: true,
  });

  function animate() {
    const lerp = 0.35;
    currentX += (mouseX - currentX) * lerp;
    currentY += (mouseY - currentY) * lerp;

    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    rafId = requestAnimationFrame(animate);
  }
  animate();

  let hoverTimeout = null;
  function addHover() {
    clearTimeout(hoverTimeout);
    cursorInner.classList.add("hover");
  }
  function removeHover() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      cursorInner.classList.remove("hover");
    }, 50);
  }

  const hoverElements = document.querySelectorAll(`
    a, button, input[type="submit"], input[type="button"], 
    [role="button"], [data-cursor-hover], .clickable,
    .btn, .button
  `);

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", addHover, { passive: true });
    el.addEventListener("mouseleave", removeHover, { passive: true });
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerHeight / 2 - target.offsetHeight / 2;
        window.scrollTo({ top: y - offset, behavior: "smooth" });
      }
    });
  });

  document.addEventListener("mouseleave", () => (cursor.style.opacity = "0"));
  document.addEventListener("mouseenter", () => (cursor.style.opacity = "1"));

  return function cleanup() {
    if (rafId) cancelAnimationFrame(rafId);
    document.removeEventListener("mousemove", updateMousePosition);
    cursor.remove();
  };
}
