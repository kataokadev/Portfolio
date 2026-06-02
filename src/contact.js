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

// Fechar clicando no fundo escuro
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// Fechar com Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});
