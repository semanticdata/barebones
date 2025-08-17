// Theme constants
export const THEME_VALUES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const CSS_CLASSES = {
  SCROLLED: "scrolled",
  DARK_MODE: "dark",
  ANIMATE: "animate",
  SHOW: "show",
  ACTIVE_THEME: ["bg-black/15", "dark:bg-white/5"],
} as const;

export const ELEMENT_IDS = {
  BACK_TO_TOP: "back-to-top",
  LIGHT_THEME_BUTTON: "light-theme-button",
  DARK_THEME_BUTTON: "dark-theme-button",
  SYSTEM_THEME_BUTTON: "system-theme-button",
} as const;

export const MEDIA_QUERIES = {
  PREFERS_DARK: "(prefers-color-scheme: dark)",
} as const;

export type ThemeValue = (typeof THEME_VALUES)[keyof typeof THEME_VALUES];

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
    .matchMedia(MEDIA_QUERIES.PREFERS_DARK)
    .addEventListener("change", (event) => {
      if (localStorage.theme === THEME_VALUES.SYSTEM) {
        toggleTheme(event.matches);
      }
    });
}

export function initScrollListener(): void {
  const onScroll = (): void => {
    if (window.scrollY > 0) {
      document.documentElement.classList.add(CSS_CLASSES.SCROLLED);
    } else {
      document.documentElement.classList.remove(CSS_CLASSES.SCROLLED);
    }
  };

  onScroll(); // Initial call
  document.addEventListener("scroll", debounce(onScroll, 100));
}

export function initAnimations(): void {
  const animateElements = document.querySelectorAll(`.${CSS_CLASSES.ANIMATE}`);

  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(CSS_CLASSES.SHOW);
    }, index * 100);
  });
}

export function initBackToTop(): void {
  const backToTop = document.getElementById(ELEMENT_IDS.BACK_TO_TOP);

  if (backToTop) {
    backToTop.addEventListener("click", (event) => scrollToTop(event));
  } else {
    console.warn(`Element with ID '${ELEMENT_IDS.BACK_TO_TOP}' not found.`);
  }
}

export function initThemeButtons(): void {
  const themeButtons = getThemeButtons();

  Object.entries(themeButtons).forEach(([theme, button]) => {
    if (button) {
      button.addEventListener("click", () => {
        localStorage.setItem("theme", theme);
        if (theme === THEME_VALUES.SYSTEM) {
          const isDark = window.matchMedia(MEDIA_QUERIES.PREFERS_DARK).matches;
          toggleTheme(isDark);
        } else {
          toggleTheme(theme === THEME_VALUES.DARK);
        }
        updateThemeButtons();
      });
    } else {
      console.warn(`Theme button element for '${theme}' not found.`);
    }
  });
}

function getThemeButtons(): Record<ThemeValue, HTMLElement | null> {
  return {
    [THEME_VALUES.LIGHT]: document.getElementById(
      ELEMENT_IDS.LIGHT_THEME_BUTTON,
    ),
    [THEME_VALUES.DARK]: document.getElementById(ELEMENT_IDS.DARK_THEME_BUTTON),
    [THEME_VALUES.SYSTEM]: document.getElementById(
      ELEMENT_IDS.SYSTEM_THEME_BUTTON,
    ),
  };
}

function updateThemeButtons(): void {
  const theme =
    (localStorage.getItem("theme") as ThemeValue) || THEME_VALUES.SYSTEM;
  const themeButtons = getThemeButtons();

  Object.values(themeButtons).forEach((button) => {
    if (button) {
      button.classList.remove(...CSS_CLASSES.ACTIVE_THEME);
    }
  });

  const activeButton = themeButtons[theme];
  if (activeButton) {
    activeButton.classList.add(...CSS_CLASSES.ACTIVE_THEME);
  } else {
    // Default to 'system' visually if the specific button isn't found
    const systemButton = themeButtons[THEME_VALUES.SYSTEM];
    if (systemButton) {
      systemButton.classList.add(...CSS_CLASSES.ACTIVE_THEME);
    }
    console.warn(
      `Active theme button element for stored theme '${theme}' not found.`,
    );
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
  document.documentElement.classList.toggle(CSS_CLASSES.DARK_MODE, dark);
  updateThemeButtons();
}

function preloadTheme(): void {
  const userTheme = localStorage.theme as ThemeValue;

  if (userTheme === THEME_VALUES.LIGHT || userTheme === THEME_VALUES.DARK) {
    toggleTheme(userTheme === THEME_VALUES.DARK);
  } else {
    // Includes 'system' or undefined/null
    const isDark = window.matchMedia(MEDIA_QUERIES.PREFERS_DARK).matches;
    toggleTheme(isDark);
    // If theme was undefined/null, set it to 'system' for consistency
    if (!userTheme) {
      localStorage.setItem("theme", THEME_VALUES.SYSTEM);
    }
  }
  updateThemeButtons();
}

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): T {
  let timeout: number;
  return ((...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  }) as T;
}
