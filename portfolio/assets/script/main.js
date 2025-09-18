const s = ["Xin chào!", "Mình là Trần Kính Hoàng", "Mình là một developer"];
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
      charIndex = commonPrefix.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
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

const toggle = document.getElementById("darkToggle");
const icon = toggle.querySelector(".icon");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  icon.textContent = "🌙";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  icon.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
