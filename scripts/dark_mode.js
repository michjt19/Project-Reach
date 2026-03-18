/**
 * Purpose: Provide persistent dark-mode toggle.
 * Inputs: localStorage 'theme' and button clicks.
 * Outputs: Applies 'dark' class to the document root.
 * Complexity: O(1) per toggle.
 */
function initDarkModeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  // Sync icon with current theme (FOUC inline script already applied theme at load)
  btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    btn.textContent = dark ? '☀️' : '🌙';
  });
}
