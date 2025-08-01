export function initUI(): void {
  initTheme();
  initScrollListener();
  initAnimations();
  initBackToTop();
  initThemeButtons();
}

export function initTheme(): void {
  preloadTheme();
  updateThemeButtons();
  
  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (localStorage.theme === "system") {
        toggleTheme(event.matches);
      }
    });
}

export function initScrollListener(): void {
  const onScroll = (): void => {
    if (window.scrollY > 0) {
      document.documentElement.classList.add("scrolled");
    } else {
      document.documentElement.classList.remove("scrolled");
    }
  };

  onScroll(); // Initial call
  document.addEventListener("scroll", debounce(onScroll, 100));
}

export function initAnimations(): void {
  const animateElements = document.querySelectorAll(".animate");

  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("show");
    }, index * 100);
  });
}

export function initBackToTop(): void {
  const backToTop = document.getElementById("back-to-top");
  
  if (backToTop) {
    backToTop.addEventListener("click", (event) => scrollToTop(event));
  } else {
    console.warn("Element with ID 'back-to-top' not found.");
  }
}

export function initThemeButtons(): void {
  const themeButtons = getThemeButtons();

  Object.entries(themeButtons).forEach(([theme, button]) => {
    if (button) {
      button.addEventListener("click", () => {
        localStorage.setItem("theme", theme);
        if (theme === "system") {
          const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          toggleTheme(isDark);
        } else {
          toggleTheme(theme === "dark");
        }
        updateThemeButtons();
      });
    } else {
      console.warn(`Theme button element for '${theme}' not found.`);
    }
  });
}

function getThemeButtons(): Record<string, HTMLElement | null> {
  return {
    light: document.getElementById("light-theme-button"),
    dark: document.getElementById("dark-theme-button"),
    system: document.getElementById("system-theme-button"),
  };
}

function updateThemeButtons(): void {
  const theme = localStorage.getItem("theme") || "system";
  const themeButtons = getThemeButtons();

  Object.values(themeButtons).forEach((button) => {
    if (button) {
      button.classList.remove("bg-black/15", "dark:bg-white/5");
    }
  });

  const activeButton = themeButtons[theme];
  if (activeButton) {
    activeButton.classList.add("bg-black/15", "dark:bg-white/5");
  } else {
    // Default to 'system' visually if the specific button isn't found
    if (themeButtons.system) {
      themeButtons.system.classList.add("bg-black/15", "dark:bg-white/5");
    }
    console.warn(`Active theme button element for stored theme '${theme}' not found.`);
  }
}

function scrollToTop(event: Event): void {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function toggleTheme(dark: boolean): void {
  document.documentElement.classList.toggle("dark", dark);
  updateThemeButtons();
}

function preloadTheme(): void {
  const userTheme = localStorage.theme;

  if (userTheme === "light" || userTheme === "dark") {
    toggleTheme(userTheme === "dark");
  } else {
    // Includes 'system' or undefined/null
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    toggleTheme(isDark);
    // If theme was undefined/null, set it to 'system' for consistency
    if (!userTheme) {
      localStorage.setItem("theme", "system");
    }
  }
  updateThemeButtons();
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }) as T;
}