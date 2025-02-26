export type Theme = 'dark' | 'light' | 'system';

export const getInitialTheme = (
  storageKey: string,
  defaultTheme: Theme,
): Theme => {
  return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
};

export const setThemeInLocalStorage = (storageKey: string, theme: Theme) => {
  localStorage.setItem(storageKey, theme);
};
