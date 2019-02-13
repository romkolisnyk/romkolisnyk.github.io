"use strict"

var preload = document.querySelector(".loader");

function fadeOut(el) {
  el.style.opacity = 1;
  var interval = setInterval( () => {
    el.style.opacity = el.style.opacity - 0.05;

    if (el.style.opacity <= 0.05) {
      clearInterval(interval);
      preload.style.display = "none";
    }
  }, 16);
}

window.onload = () => {
  setTimeout(function () {
    fadeOut(preload);
  }, 100);
};

document.addEventListener("DOMContentLoaded", () => {

  var string = "Hi there! I am Roman Kolisnyk, web-developer from Kyiv";
  var str = string.split("");
  var el = document.querySelector('.sidebar .info');
  (function animate() {
    str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
    var running = setTimeout(animate, 90);
  })();

  var menuButton = document.querySelector('.sidebar__button');
  var sidebar = document.querySelector('.sidebar');
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle("open");
    sidebar.classList.toggle("open");
  });

  function onTabClick(event) {
    var activeTabs = document.querySelectorAll('.active');
    activeTabs.forEach((tab) => {
      tab.className = tab.className.replace('active', '');
    });
    event.target.className += ' active';
    document.getElementById(event.target.href.split('#')[1]).className += ' active';
  }

  var element = document.querySelector('.tabs');
  element.addEventListener('click', onTabClick, false);

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 1000);
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    };
    return i;
  };
  startTime(); 
});