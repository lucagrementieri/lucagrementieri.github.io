// Color scheme selection: "auto" follows the system preference (handled in
// CSS with prefers-color-scheme), "light" and "dark" force a scheme.
// This script is inlined in <head> so that a stored choice is applied before
// the first paint.
(function () {
  var KEY = 'color-scheme';
  var MODES = ['auto', 'light', 'dark'];
  var root = document.documentElement;

  function stored() {
    try {
      var mode = localStorage.getItem(KEY);
      return MODES.indexOf(mode) > 0 ? mode : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  function apply(mode) {
    if (mode === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    var button = document.querySelector('.theme-toggle');
    if (button) {
      button.setAttribute('aria-label', button.getAttribute('data-label-' + mode));
      button.setAttribute('title', button.getAttribute('data-label-' + mode));
    }
  }

  function save(mode) {
    try {
      if (mode === 'auto') {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, mode);
      }
    } catch (e) {}
  }

  root.classList.add('js');
  apply(stored());

  document.addEventListener('DOMContentLoaded', function () {
    apply(stored());
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.theme-toggle')) {
      return;
    }
    var mode = MODES[(MODES.indexOf(stored()) + 1) % MODES.length];
    save(mode);
    apply(mode);
  });

  // Keep several open tabs in sync.
  window.addEventListener('storage', function (event) {
    if (event.key === KEY) {
      apply(stored());
    }
  });
})();
