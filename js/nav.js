const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
});

// close with the Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});
