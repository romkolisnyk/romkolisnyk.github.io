"use strict"; // preloader

var preload = document.querySelector(".loader");

function fadeOut(el) {
  el.style.opacity = 1;
  var interval = setInterval(function () {
    el.style.opacity = el.style.opacity - 0.05;

    if (el.style.opacity <= 0.05) {
      clearInterval(interval);
      preload.style.display = "none";
    }
  }, 16);
}

window.onload = function () {
  setTimeout(function () {
    fadeOut(preload);
  }, 100);
};

document.addEventListener("DOMContentLoaded", function () {
  // typing animation
  var string = "Hi there! I am Roman Kolisnyk, web-developer from Kyiv.";
  var str = string.split("");
  var el = document.querySelector('.sidebar .info');

  (function animate() {
    str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
    var running = setTimeout(animate, 90);
  })(); // menu button


  var menuButton = document.querySelector('.sidebar__button');
  var sidebar = document.querySelector('.sidebar');
  menuButton.addEventListener('click', function () {
    menuButton.classList.toggle("open");
    sidebar.classList.toggle("open");
  }); // tabs switcher

  function onTabClick(event) {
    var activeTabs = document.querySelectorAll('.active');
    activeTabs.forEach(function (tab) {
      tab.className = tab.className.replace('active', '');
    });
    event.target.className += ' active';
    document.getElementById(event.target.href.split('#')[1]).className += ' active';
  }

  var element = document.querySelector('.tabs');
  element.addEventListener('click', onTabClick, false); // clock

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 1000);
  }

  ;

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }

    ;
    return i;
  }

  ;
  startTime(); // swipe

  var pageWidth = window.innerWidth || document.body.clientWidth;
  var treshold = Math.max(1, Math.floor(0.01 * pageWidth));
  var touchstartX = 0;
  var touchstartY = 0;
  var touchendX = 0;
  var touchendY = 0;
  var limit = Math.tan(45 * 1.5 / 180 * Math.PI);
  var gestureZone = document.querySelector('.main');
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
    var x = touchendX - touchstartX;
    var y = touchendY - touchstartY;
    var yx = Math.abs(y / x);

    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
      if (yx <= limit) {
        var tab = document.querySelector('.tabs .tab.active');
        var tabs = document.querySelectorAll('.tabs .tab');
        var section = document.querySelector('section.active');

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
  }

  ;
});