import "./styles/main.scss";

const htmlNode = document.querySelector("html");
const themeSwitcherToggle = document.querySelector(".switcher");
const themeSwitcherCheckbox = document.querySelector(".switcher__checkbox");

const currentTheme = window.localStorage.getItem("theme");

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

document.addEventListener("DOMContentLoaded", () => {
  if (currentTheme === DARK_THEME) {
    htmlNode.setAttribute("data-theme", DARK_THEME);
    themeSwitcherCheckbox.checked = true;
  }
});

themeSwitcherToggle.addEventListener("click", () => {
  if (themeSwitcherCheckbox.checked === false) {
    htmlNode.setAttribute("data-theme", LIGHT_THEME);
    window.localStorage.setItem("theme", LIGHT_THEME);
  } else {
    htmlNode.setAttribute("data-theme", DARK_THEME);
    window.localStorage.setItem("theme", DARK_THEME);
  }
});
