const s = ["Xin chào !", "Mình là Trần Kính Hoàng", "Mình là một developer "];

const tE = document.querySelector(".typing");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 100;
const deleteSpeed = 25;
const pauseTime = 1000;

function typeEffect() {
  const currentText = s[textIndex];

  if (!isDeleting) {
    tE.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    tE.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % s.length;
    }
  }

  const speed = isDeleting ? deleteSpeed : typeSpeed;
  setTimeout(typeEffect, speed);
}

typeEffect();
