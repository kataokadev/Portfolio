const slider = document.getElementById("projectsSlider");
const track = document.getElementById("projectsTrack");
const boxes = document.querySelectorAll(".projects__box");
const nextBtn = document.getElementById("projectsNext");
const prevBtn = document.getElementById("projectsPrev");
const dotsContainer = document.getElementById("projectsDots");

const GAP = 24;
let currentPage = 0;

function getVisibleCount() {
  return window.innerWidth <= 640 ? 1 : 3;
}

function getTotalPages() {
  return Math.ceil(boxes.length / getVisibleCount());
}

function setBoxWidths() {
  const count = getVisibleCount();
  const gapTotal = GAP * (count - 1);
  const boxW = (slider.offsetWidth - gapTotal) / count;
  boxes.forEach((box) => (box.style.minWidth = `${boxW}px`));
}

function buildDots() {
  dotsContainer.innerHTML = "";
  const total = getTotalPages();
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.className =
      "projects__dot" + (i === currentPage ? " projects__dot--active" : "");
    dot.dataset.page = i;
    dot.addEventListener("click", () =>
      goToPage(parseInt(dot.dataset.page, 10)),
    );
    dotsContainer.appendChild(dot);
  }
}

function goToPage(page) {
  const totalPages = getTotalPages();
  page = Math.max(0, Math.min(page, totalPages - 1));

  const count = getVisibleCount();
  const gapTotal = GAP * (count - 1);
  const boxW = (slider.offsetWidth - gapTotal) / count;
  const offset = page * (boxW + GAP) * count;

  track.style.transform = `translateX(-${offset}px)`;
  currentPage = page;

  prevBtn.disabled = page === 0;
  nextBtn.disabled = page >= totalPages - 1;

  document.querySelectorAll(".projects__dot").forEach((dot, i) => {
    dot.classList.toggle("projects__dot--active", i === page);
  });
}

function init() {
  setBoxWidths();
  buildDots();
  goToPage(0);
}

init();

nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
prevBtn.addEventListener("click", () => goToPage(currentPage - 1));

let touchStartX = 0;
track.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);

track.addEventListener(
  "touchend",
  (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToPage(currentPage + 1) : goToPage(currentPage - 1);
    }
  },
  { passive: true },
);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const wasPage = currentPage;
    setBoxWidths();
    buildDots();
    goToPage(Math.min(wasPage, getTotalPages() - 1));
  }, 100);
});
