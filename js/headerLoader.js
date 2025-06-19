document.addEventListener("DOMContentLoaded", () => {
  fetch("../header.html")
    .then(res => res.text())
    .then(html => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (!headerPlaceholder) return;

      headerPlaceholder.innerHTML = html;

      const darkModeToggle = document.getElementById("dark-mode-toggle");
      const body = document.body;

      // ✅ Dark mode saved mode apply
      if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.replace('light-mode', 'dark-mode');
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }

      // ✅ Dark mode toggle
      if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
          const isLight = body.classList.contains("light-mode");
          body.classList.replace(isLight ? "light-mode" : "dark-mode", isLight ? "dark-mode" : "light-mode");
          darkModeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
          localStorage.setItem("darkMode", isLight ? "enabled" : "disabled");
        });
      }

      // ✅ Hamburger full logic
      const hamburger = document.querySelector(".hamburger-menu");
      const navLinks = document.querySelector(".nav-links");
      const categoryDropdowns = document.querySelectorAll('.nav-links .dropdown');
      const navLinksMenuItems = navLinks ? navLinks.querySelectorAll('a') : [];

      if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
          hamburger.classList.toggle("active");
          if (!navLinks.classList.contains("active")) {
            categoryDropdowns.forEach(dd => dd.classList.remove("active"));
          }
        });

        // ✅ Close on link click
        navLinksMenuItems.forEach(link => {
          link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
              navLinks.classList.remove("active");
              hamburger.classList.remove("active");
              categoryDropdowns.forEach(dd => dd.classList.remove("active"));
            }
          });
        });
        // ✅ Dropdown menu link close fix
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 992 && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      categoryDropdowns.forEach(dd => dd.classList.remove("active"));
    }
  });
});
      }

      // ✅ Mobile dropdown toggle
      if (window.innerWidth <= 992) {
        categoryDropdowns.forEach(dropdown => {
          const button = dropdown.querySelector(".dropbtn");
          if (button) {
            button.addEventListener("click", (e) => {
              if (e.target.href && e.target.href.includes("javascript:void(0)")) {
                e.preventDefault();
              }
              const parentDropdown = e.target.closest(".dropdown");
              if (parentDropdown) {
                const wasActive = parentDropdown.classList.contains("active");
                categoryDropdowns.forEach(dd => dd.classList.remove("active"));
                if (!wasActive) {
                  parentDropdown.classList.add("active");
                }
              }
            });
          }
        });
      }
    })
    .catch(err => console.error("Header load error:", err));
});
