const s = ["Xin chào !", "Mình là Trần Kính Hoàng", "Mình là developer "];

const tE = document.querySelector(".typing");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 100;
const deleteSpeed = 25;
const pauseTime = 1000;

function getCommonPrefix(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return a.slice(0, i);
}

function typeEffect() {
  const currentText = s[textIndex];
  const nextText = s[(textIndex + 1) % s.length];
  const commonPrefix = getCommonPrefix(currentText, nextText);

  if (!isDeleting) {
    tE.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    if (charIndex > commonPrefix.length) {
      tE.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % s.length;
    }
  }

  const speed = isDeleting ? deleteSpeed : typeSpeed;
  setTimeout(typeEffect, speed);
}

typeEffect();

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach((r) => observer.observe(r));
