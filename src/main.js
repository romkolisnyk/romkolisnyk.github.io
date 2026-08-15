import './styles/main.scss';

const htmlNode = document.querySelector('html');
const themeSwitcherToggle = document.querySelector('.switcher');
const themeSwitcherCheckbox = document.querySelector('.switcher__checkbox');
const themeColorMeta = document.querySelector('#theme-color-meta');

const currentTheme = window.localStorage.getItem('theme');

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const setTheme = (theme) => {
  htmlNode.setAttribute('data-theme', theme);
  const canvasColor = getComputedStyle(htmlNode).getPropertyValue('--surface-canvas').trim();
  themeColorMeta.setAttribute('content', canvasColor);
};

document.addEventListener('DOMContentLoaded', () => {
  if (currentTheme === DARK_THEME) {
    setTheme(DARK_THEME);
    themeSwitcherCheckbox.checked = true;
  }
});

themeSwitcherToggle.addEventListener('click', () => {
  if (themeSwitcherCheckbox.checked === false) {
    setTheme(LIGHT_THEME);
    window.localStorage.setItem('theme', LIGHT_THEME);
  } else {
    setTheme(DARK_THEME);
    window.localStorage.setItem('theme', DARK_THEME);
  }
});
