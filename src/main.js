import "./styles/main.scss";

const htmlNode = document.querySelector("html");
const themeSwitcherToggle = document.querySelector(".switcher");
const themeSwitcherCheckbox = document.querySelector(".switcher__checkbox");

const currentTheme = window.localStorage.getItem("theme");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

document.addEventListener("DOMContentLoaded", () => {
  if (
    currentTheme === DARK_THEME &&
    window.matchMedia("(prefers-color-scheme: dark)")?.matches
  ) {
    htmlNode.setAttribute("data-theme", DARK_THEME);
    themeSwitcherCheckbox.checked = true;
    themeSwitcherCheckbox.setAttribute("aria-checked", "true");
  }
});

themeSwitcherToggle.addEventListener("click", () => {
  if (themeSwitcherCheckbox.checked === false) {
    htmlNode.setAttribute("data-theme", LIGHT_THEME);
    themeSwitcherCheckbox.setAttribute("aria-checked", "false");
    window.localStorage.setItem("theme", LIGHT_THEME);
  } else {
    htmlNode.setAttribute("data-theme", DARK_THEME);
    themeSwitcherCheckbox.setAttribute("aria-checked", "true");
    window.localStorage.setItem("theme", DARK_THEME);
  }
});
