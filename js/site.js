/* Kooli Pani marketing site — progressive enhancement only.
   The page is fully readable with JS disabled. */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── Header shadow on scroll ─────────────────────────────── */
  const header = $(".site-header");
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Mobile menu ─────────────────────────────────────────── */
  const toggle = $(".nav-toggle");
  const menu = $("#mobile-menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
  });

  /* ── Scroll reveals ──────────────────────────────────────── */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ── Screen gallery: arrows + button state ───────────────── */
  const viewport = $(".gallery__viewport");
  if (viewport) {
    const buttons = $$(".gbtn");
    const step = () => {
      const slide = $(".slide", viewport);
      return slide ? slide.getBoundingClientRect().width + 40 : 320;
    };
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => {
        viewport.scrollBy({
          left: step() * Number(btn.dataset.dir),
          behavior: "smooth",
        });
      }),
    );
    const syncButtons = () => {
      const max = viewport.scrollWidth - viewport.clientWidth - 4;
      buttons.forEach((btn) => {
        const dir = Number(btn.dataset.dir);
        btn.disabled =
          dir < 0 ? viewport.scrollLeft <= 4 : viewport.scrollLeft >= max;
      });
    };
    syncButtons();
    viewport.addEventListener("scroll", syncButtons, { passive: true });
    window.addEventListener("resize", syncButtons, { passive: true });
    // Keyboard support when the viewport is focused
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        viewport.scrollBy({
          left: step() * (e.key === "ArrowRight" ? 1 : -1),
          behavior: "smooth",
        });
      }
    });
  }

  /* ── Store links ─────────────────────────────────────────────
     Update these when the real listing / APK URL goes live.
     A link pointing at "#top" is treated as "not yet published"
     and gets a friendly note instead of a dead click. */
  const STORE_LINKS = {
    android: "/downloads/app.apk",
    apk: "https://api.bestapp.live/api/v1/apk/download",
  };
  $$("[data-store]").forEach((a) => {
    const url = STORE_LINKS[a.dataset.store];
    if (url) {
      a.href = url;
    } else if (a.dataset.store === "apk") {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        a.querySelector("strong").textContent = "Coming soon";
      });
    }
  });

  /* ── Footer year ─────────────────────────────────────────── */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
