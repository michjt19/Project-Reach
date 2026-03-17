/**
 * Purpose: Shared nav — mobile toggle, dropdown, aria-expanded, keyboard nav, click-outside.
 */
function initNav() {
  const navBar = document.querySelector('.nav-bar');
  const toggle = navBar && navBar.querySelector('.nav-toggle');
  const dropdownToggle = navBar && navBar.querySelector('.dropdown-toggle');
  const dropdown = document.getElementById('volunteerDropdown');

  // Mobile nav toggle
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Dropdown toggle
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Escape key: close both
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dropdown) {
        dropdown.classList.remove('open');
        if (dropdownToggle) {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          dropdownToggle.focus();
        }
      }
      document.body.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Click outside: close both
  document.addEventListener('click', (e) => {
    if (dropdown && !e.target.closest('.has-dropdown')) {
      dropdown.classList.remove('open');
      if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
    }
    if (toggle && !e.target.closest('.nav-bar')) {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
