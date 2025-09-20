import { initTyping } from "./typing.js";

const langToggle = document.getElementById("language-toggle");
const langIcon = langToggle.querySelector("img");

let currentLang = localStorage.getItem("language") || "VN";

const textsVN = ["Giới thiệu", "Dự án", "Kỹ năng", "Liên hệ"];
const textsEN = ["About me", "Projects", "Skills", "Contact"];
const infoVN = [
  "Sinh viên ngành Mạng máy tính & truyền thông dữ liệu @ UNETI.",
  "Yêu thích công nghệ, lập trình và mạng máy tính.",
];
const infoEN = [
  "Computer Networks & Data Communications student @ UNETI.",
  "Passionate about technology, programming, and computer networks.",
];

const placeholdersVN = {
  name: "Tên của bạn",
  email: "Email của bạn",
  message: "Lời nhắn...",
  button: "Gửi",
  info: "Mở cơ hội thực tập / part-time. Hãy liên hệ với mình 👇",
};

const placeholdersEN = {
  name: "Your name",
  email: "Your email",
  message: "Your message...",
  button: "Send",
  info: "Open to internship / part-time opportunities. Feel free to reach out 👇",
};

const navLinks = document.querySelectorAll(".nav a");
const sectionLinks = document.querySelectorAll(".section-title");
const infoE = document.querySelectorAll(".info p");
const firstTwo = Array.from(infoE).slice(0, 2);
const contactInfo = document.querySelector(".contact-info p");
const desEN = [
  "Study bot built with discord.js in Node.js",
  "Web app for organizing notes & code in Python, Java",
  "Minimalist design with strong typography",
];

const desVN = [
  "Bot học tập viết bằng discord.js trong Node.js",
  "Web tổng hợp ghi chú & code Python, Java",
  "Thiết kế tối giản, typography mạnh mẽ",
];

const cardDes = document.querySelectorAll(".card p");
const cardH = document.querySelectorAll(".card h3");

langIcon.src = currentLang === "VN" ? "assets/img/VN.png" : "assets/img/EN.png";

function updateLanguage(lang) {
  const texts = lang === "VN" ? textsVN : textsEN;
  const infos = lang === "VN" ? infoVN : infoEN;
  const placeholders = lang === "VN" ? placeholdersVN : placeholdersEN;
  const descriptions = lang === "VN" ? desVN : desEN;

  langIcon.src = `./assets/img/${lang}.png`;

  navLinks.forEach((link, i) => {
    if (texts[i]) link.textContent = texts[i];
  });

  sectionLinks.forEach((link, i) => {
    if (texts[i]) link.textContent = texts[i].toUpperCase();
  });

  firstTwo.forEach((e, i) => {
    if (infos[i]) e.textContent = infos[i];
  });

  contactInfo.textContent = placeholders.info;

  document.querySelector('input[name="name"]').placeholder = placeholders.name;
  document.querySelector('input[name="email"]').placeholder =
    placeholders.email;
  document.querySelector('textarea[name="message"]').placeholder =
    placeholders.message;
  document.querySelector(".contact-form button").textContent =
    placeholders.button;

  cardDes.forEach((p, i) => {
    if (descriptions[i]) p.textContent = descriptions[i];
  });

  cardH[2].textContent = lang === "VN" ? "Portfolio này" : "This portfolio";
}

export function initLanguage() {
  updateLanguage(currentLang);

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "VN" ? "EN" : "VN";
    updateLanguage(currentLang);
    localStorage.setItem("language", currentLang);
    initTyping();
  });
}
