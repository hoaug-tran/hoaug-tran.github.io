export function initDarkMode() {
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
}
