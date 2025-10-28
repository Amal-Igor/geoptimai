const animatedItems = document.querySelectorAll("[data-animate]");
let observer;

const reveal = (entry) => {
  const el = entry.target;
  const delay = el.dataset.animateDelay || "0s";
  el.style.transitionDelay = delay;
  el.classList.add("is-visible");
  if (observer) {
    observer.unobserve(el);
  }
};

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animatedItems.forEach((el) => {
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.transform = "none";
    el.classList.add("is-visible");
  });
} else {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => reveal(entry));
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animatedItems.forEach((el) => observer.observe(el));
}
