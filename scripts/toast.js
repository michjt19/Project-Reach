/**
 * Purpose: showToast(message, type) — displays a brief notification.
 * Types: 'success' (teal), 'error' (amber)
 */
function showToast(message, type) {
  type = type || 'success';
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      toast.classList.add('toast-visible');
    });
  });

  setTimeout(function () {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', function () { toast.remove(); }, { once: true });
  }, 4000);
}
