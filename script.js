(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  const setTheme = (mode) => {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    themeBtn.textContent = mode === "dark" ? "☾ dark" : "☀ light";
  };
  const current = () => {
    if (root.getAttribute("data-theme")) return root.getAttribute("data-theme");
    return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };
  setTheme(current());
  themeBtn.addEventListener("click", () => {
    setTheme(current() === "dark" ? "light" : "dark");
  });

  // Scroll-spy nav
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Copy email
  const copyBtn = document.getElementById("copyEmail");
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = "✓ copied";
      setTimeout(() => (copyBtn.textContent = original), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

  // Download / print
  document.getElementById("downloadPdf").addEventListener("click", () => window.print());
})();
