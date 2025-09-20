import { initDarkMode } from "./darkmode.js";
import { initLanguage } from "./language.js";
import { initTyping } from "./typing.js";

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

initDarkMode();
initLanguage();
initTyping();
