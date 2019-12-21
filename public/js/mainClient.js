(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    const mobileButtons = Array.from(document.getElementsByClassName("mobile"));
    mobileButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/upload/mobile";
      });
    });

    const bothButtons = Array.from(document.getElementsByClassName("both"));
    bothButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/upload/mobileAndDesktop";
      });
    });

    const desktopButtons = Array.from(document.getElementsByClassName("desktop"));
    desktopButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/upload/desktop";
      });
    });
  }
})();
