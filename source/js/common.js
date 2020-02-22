// preloader

const preloader = document.querySelector(".preloader");

const fadeOut = element => {
  element.style.opacity = 1;
  const interval = setInterval(() => {
    element.style.opacity = element.style.opacity - 0.05;

    if (element.style.opacity <= 0.05) {
      clearInterval(interval);
      preloader.style.display = "none";
    }
  }, 16);
};

window.onload = () => {
  setTimeout(() => {
    fadeOut(preloader);
  }, 100);
};

document.addEventListener("DOMContentLoaded", () => {

  // typing animation

  const string = "Hi there and dobriy den\'! I am Roman, wed-developer from Kyiv.";
  const letters = string.split("");
  const typingContainer = document.querySelector('.sidebar .info');

  (function animate() {
    const running = setTimeout(animate, 90);

    letters.length > 0 ? typingContainer.innerHTML += letters.shift() : clearTimeout(running);
  })();

  // mobile menu

  const menuButton = document.querySelector('.sidebar__menu-button');
  const sidebar = document.querySelector('.sidebar');

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle("open");
    sidebar.classList.toggle("open");
  });

  // tabs switcher

  const onTabClick = event => {
    const tabs = document.querySelectorAll('.tabs__item');
    const index = [...event.target.parentElement.children].indexOf(event.target);
    const sections = document.querySelectorAll('section');

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    sections.forEach(section => {
      section.classList.remove('active');
    });

    event.target.classList.add('active');
    sections[index].classList.add('active');

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const tabs = document.querySelector('.tabs');

  tabs.addEventListener('click', onTabClick);

  // clock

  const startTime = () => {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    minutes = checkTime(minutes);
    setTimeout(startTime, 1000);

    document.getElementById('clock').innerHTML = hours + ":" + minutes;
  };

  const checkTime = i => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  startTime();


  // swipe

  const pageWidth = window.innerWidth || document.body.clientWidth;
  const treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
  const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
  const gestureZone = document.querySelector('.main');
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  gestureZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);

  gestureZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
  }, false);

  const handleGesture = e => {
    const x = touchendX - touchstartX;
    const y = touchendY - touchstartY;
    const yx = Math.abs(y / x);

    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
      if (yx <= limit) {

        const tab = document.querySelector('.tabs .tabs__item.active');
        const tabs = document.querySelectorAll('.tabs .tabs__item');
        const section = document.querySelector('section.active');

        if (x < 0 && tab != tabs[tabs.length - 1]) {

          tab.nextElementSibling.classList.add("active");
          tab.classList.remove("active");

          section.nextElementSibling.classList.add("active", "left");
          section.classList.remove("active", "right", "left");

        }
        if (x > 0 && tab != tabs[0]) {

          tab.previousElementSibling.classList.add("active");
          tab.classList.remove("active");

          section.previousElementSibling.classList.add("active", "right");
          section.classList.remove("active", "right", "left");

        }
      }
    }
  }
});