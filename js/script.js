// script.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const searchInput = document.getElementById('search-input');
  const letterGrid = document.getElementById('letter-grid');
  const letterCards = letterGrid ? Array.from(letterGrid.getElementsByClassName('card')) : [];
  const categoryDropdowns = document.querySelectorAll('.nav-links .dropdown');
  const navLinksMenuItems = navLinks ? navLinks.querySelectorAll('a') : [];

  // Hamburger menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      if (!navLinks.classList.contains('active')) {
        categoryDropdowns.forEach(dd => dd.classList.remove('active'));
      }
    });

    navLinksMenuItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          categoryDropdowns.forEach(dd => dd.classList.remove('active'));
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

  // Dark mode toggle
  if (darkModeToggle && body) {
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.replace('light-mode', 'dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        body.classList.replace('dark-mode', 'light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // Search functionality
  if (searchInput && letterGrid) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      letterCards.forEach(card => {
        const cardTitle = card.textContent.toLowerCase();
        const cardDescription = card.dataset.description ? card.dataset.description.toLowerCase() : '';
        if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());
  }

  // Mobile dropdowns
  if (window.innerWidth <= 992) {
    categoryDropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropbtn');
      button.addEventListener('click', (e) => {
        if (e.target.href && e.target.href.includes('javascript:void(0)')) {
          e.preventDefault();
        }
        const parentDropdown = e.target.closest('.dropdown');
        if (parentDropdown) {
          const wasActive = parentDropdown.classList.contains('active');
          categoryDropdowns.forEach(dd => dd.classList.remove('active'));
          if (!wasActive) {
            parentDropdown.classList.add('active');
          }
        }
      });
    });
  }
});

// PDF download
// function downloadLetter(fileName = "Letter.pdf") {
//   const text = document.getElementById("letterContent").value;
//   const element = document.createElement("div");
//   element.innerHTML = "<pre>" + text + "</pre>";
//   if (typeof html2pdf !== 'undefined') {
//     html2pdf().from(element).save(fileName);
//   } else {
//     console.error('html2pdf library not found.');
//     alert('Could not download PDF. Library missing.');
//   }
// }
function downloadLetter(fileName = "Letter.pdf") {
  const text = document.getElementById("letterContent").value;
  //  add for text not written in A4 page that means blank 
    if (!text) {
    alert("Letter content is empty!");
    return;
  }

  const element = document.createElement("div");
  // element.innerHTML = "<pre style='font-family:Arial, sans-serif; font-size: 14px; white-space: pre-wrap;'>" + text + "</pre>";
element.innerHTML = "<pre style='font-family: Arial, sans-serif; font-size: 14px; white-space: pre-wrap; color: #000;'>" + text + "</pre>";

  if ( typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       15,               // 15mm margin on all sides
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  } else {
    console.error('html2pdf library not found.');
    alert('Could not download PDF. Library missing.');
  }
}
