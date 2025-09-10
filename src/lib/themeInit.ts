import { initUI, initTheme } from "./theme";

function init() {
  initUI();
}

export function initThemeScript() {
  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("astro:after-swap", init);
  // Call initTheme directly on script load for immediate effect before DOMContentLoaded
  initTheme();
}
