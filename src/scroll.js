const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show__scroll", entry.isIntersecting);
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".hidden__scroll").forEach((el) => {
  revealObserver.observe(el);
});

const progressBar = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
  backToTop.classList.toggle("visible", scrolled > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navLinks = document.querySelectorAll(".header__menu-link");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      const active = document.querySelector(
        `.header__menu-link[href="#${entry.target.id}"]`,
      );
      if (active) active.classList.add("active");
    });
  },
  { threshold: 0.4 },
);

document.querySelectorAll("section[id]").forEach((section) => {
  navObserver.observe(section);
});

const hamburgerBtn = document.getElementById("hamburgerBtn");
const headerMenu = document.getElementById("headerMenu");

hamburgerBtn.addEventListener("click", () => {
  const isOpen = headerMenu.classList.toggle("open");
  hamburgerBtn.classList.toggle("open", isOpen);
  hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    headerMenu.classList.remove("open");
    hamburgerBtn.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  });
});

(function () {
  const homeTitle = document.querySelector(".home__title");
  if (!homeTitle) return;

  const fullText = homeTitle.textContent.trim();
  homeTitle.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "|";
  homeTitle.appendChild(cursor);

  let i = 0;

  function type() {
    if (i < fullText.length) {
      homeTitle.insertBefore(document.createTextNode(fullText[i]), cursor);
      i++;

      const delay = fullText[i - 1] === "." ? 350 : 75 + Math.random() * 40;
      setTimeout(type, delay);
    } else {
      setTimeout(() => {
        cursor.style.animation = "cursorFadeOut 0.4s ease forwards";
      }, 2200);
    }
  }

  setTimeout(type, 500);
})();
