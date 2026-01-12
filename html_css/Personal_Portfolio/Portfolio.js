const btn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // לסגור אחרי לחיצה על לינק
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}


