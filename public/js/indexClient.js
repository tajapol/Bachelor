(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    const backButtons = Array.from(document.getElementsByClassName("back"));
    backButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.history.back();
      });
    });

    const mobileButtons = Array.from(document.getElementsByClassName("mobile"));
    mobileButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/chooseUpload/mobile";
      });
    });

    const bothButtons = Array.from(document.getElementsByClassName("both"));
    bothButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/chooseUpload/mobileAndDesktop";
      });
    });

    const desktopButtons = Array.from(document.getElementsByClassName("desktop"));
    desktopButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/chooseUpload/desktop";
      });
    });

    const fileButtons = Array.from(document.getElementsByClassName("file"));
    fileButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/fileUpload";
      });
    });

    const inputButtons = Array.from(document.getElementsByClassName("input"));
    inputButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/directInput";
      });
    });

    document.getElementById("start").addEventListener("click", () => {
      window.location = "/chooseFormat";
    });
  }
})();
