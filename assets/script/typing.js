let s = [];
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

let timeoutId;

function typeEffect() {
  if (!s.length) return;

  const currentText = s[textIndex];
  const nextText = s[(textIndex + 1) % s.length];
  const commonPrefix = getCommonPrefix(currentText, nextText);

  if (!isDeleting) {
    tE.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      timeoutId = setTimeout(typeEffect, pauseTime);
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

  timeoutId = setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
}

function resetTyping() {
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;
  tE.textContent = "";

  clearTimeout(timeoutId);
}

export function initTyping() {
  const currentLang = localStorage.getItem("language") || "VN";

  if (currentLang === "VN") {
    s = ["Xin chào!", "Mình là Trần Kính Hoàng", "Mình là một developer"];
  } else {
    s = ["Hello!", "I'm Trần Kính Hoàng", "I'm a developer"];
  }

  resetTyping();
  typeEffect();
}
