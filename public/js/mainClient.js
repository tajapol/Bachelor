(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    const homeButtons = Array.from(document.getElementsByClassName("home"));
    homeButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/";
      });
    });

    const mobileButtons = Array.from(document.getElementsByClassName("mobile"));
    mobileButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/mobile";
      });
    });

    const bothButtons = Array.from(document.getElementsByClassName("both"));
    bothButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/mobileAndDesktop";
      });
    });

    const desktopButtons = Array.from(document.getElementsByClassName("desktop"));
    desktopButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/desktop";
      });
    });
  }
})();
