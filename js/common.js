"use strict"

// preloader

var preload = document.querySelector(".loader");

function fadeOut(el) {
  el.style.opacity = 1;
  var interval = setInterval(() => {
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

  // typing animation

  var string = "Hi there! I am Roman Kolisnyk, web-developer from Kyiv.";
  var str = string.split("");
  var el = document.querySelector('.sidebar .info');
  (function animate() {
    str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
    var running = setTimeout(animate, 90);
  })();

  // menu button

  var menuButton = document.querySelector('.sidebar__button');
  var sidebar = document.querySelector('.sidebar');
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle("open");
    sidebar.classList.toggle("open");
  });

  // tabs switcher

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


  // clock

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



  // swipe

  let pageWidth = window.innerWidth || document.body.clientWidth;
  let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
  const gestureZone = document.querySelector('.main');

  gestureZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);

  gestureZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
  }, false);

  function handleGesture(e) {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
      if (yx <= limit) {

        const tab = document.querySelector('.tabs .tab.active');
        const tabs = document.querySelectorAll('.tabs .tab');
        const section = document.querySelector('section.active');

        if (x < 0 && tab != tabs[tabs.length - 1]) {

          tab.nextElementSibling.classList.add("active");
          tab.classList.remove("active");

          section.nextElementSibling.classList.add("active");
          section.classList.remove("active", "right");

        }
        if (x > 0 && tab != tabs[0]) {

          tab.previousElementSibling.classList.add("active");
          tab.classList.remove("active");

          section.previousElementSibling.classList.add("active", "right");
          section.classList.remove("active", "right");

        }
      }
    }


  };


});