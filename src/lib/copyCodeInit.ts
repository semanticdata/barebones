import { initCopyCodeButtons } from "./copyCode";

function init() {
  initCopyCodeButtons();
}

export function initCopyCode() {
  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("astro:after-swap", init);
}
