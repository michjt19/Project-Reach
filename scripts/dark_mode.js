/**
 * Purpose: Provide persistent dark-mode toggle.
 * Inputs: localStorage 'theme' and button clicks.
 * Outputs: Applies 'dark' class to the document root.
 * Complexity: O(1) per toggle.
 */
function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function initDarkModeToggle() {
  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
}
