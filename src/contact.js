const contactBtn = document.querySelector(".contact__btn");
const closeBtn = document.querySelector(".contact__box-btn");
const overlay = document.getElementById("contactOverlay");

function openModal() {
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  contactBtn.focus();
}

contactBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});
