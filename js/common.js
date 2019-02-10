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

  var hash = document.querySelectorAll(".tab");

  for (var i = 0; i < hash.length; i++) {
    hash[i].addEventListener("click", function (event) {
      event.preventDefault();
    });
  }

  var menuButton = document.querySelector('.sidebar__button');
  var sidebar = document.querySelector('.sidebar');
  menuButton.addEventListener('click', function(){
    menuButton.classList.toggle("open");
    sidebar.classList.toggle("open");
  });

  function onTabClick(event) {
    var activeTabs = document.querySelectorAll('.active');

    activeTabs.forEach(function (tab) {
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
      i = "0" + i
    };
    return i;
  };
  startTime();


})